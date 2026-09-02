import {createReadStream} from "node:fs";
import {access, readdir, readFile, stat} from "node:fs/promises";
import path from "node:path";
import {getCliClient} from "sanity/cli";

const commit = process.env.SANITY_MEDIA_COMMIT === "1";
const root = process.cwd();
const publicRoot = path.join(root, "public");
const articlesRoot = path.join(root, "content", "articles");
const client = getCliClient({apiVersion: "2026-09-01"}).withConfig({perspective: "raw"});
const articles = await client.fetch(`*[_type == "article"]{
  _id, title, "slug": slug.current, locale, imagePath, imageAlt, mainImage, audioPath, audioFile, body
}`);

async function localMetadata() {
  const entries = new Map();
  for (const directory of await readdir(articlesRoot, {withFileTypes: true})) {
    if (!directory.isDirectory()) continue;
    for (const locale of ["en", "es"]) {
      try {
        const source = await readFile(path.join(articlesRoot, directory.name, `${locale}.md`), "utf8");
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1];
        if (!frontmatter) continue;
        const metadata = Object.fromEntries(frontmatter.split("\n").filter(Boolean).map(line => {
          const separator = line.indexOf(":");
          return [line.slice(0, separator), JSON.parse(line.slice(separator + 1).trim())];
        }));
        entries.set(`${metadata.slug}:${metadata.locale}`, metadata);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
    }
  }
  return entries;
}

const localArticles = await localMetadata();

function publicFile(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return null;
  const cleanPath = decodeURIComponent(value.split(/[?#]/, 1)[0]);
  const absolutePath = path.resolve(publicRoot, `.${cleanPath}`);
  return absolutePath.startsWith(`${publicRoot}${path.sep}`) ? absolutePath : null;
}

async function fileInfo(value) {
  const absolutePath = publicFile(value);
  if (!absolutePath) return {kind: "remote"};
  try {
    await access(absolutePath);
    const details = await stat(absolutePath);
    return {kind: "local", absolutePath, bytes: details.size};
  } catch {
    return {kind: "missing", absolutePath};
  }
}

const jobs = new Map();
const patches = new Map();
const missing = [];
const ensurePatch = article => {
  if (!patches.has(article._id)) patches.set(article._id, {article, cover: null, audio: null, inline: []});
  return patches.get(article._id);
};

async function registerJob(value, assetType, context) {
  const info = await fileInfo(value);
  if (info.kind === "missing") missing.push({value, context});
  if (info.kind !== "local") return null;
  const key = `${assetType}:${info.absolutePath}`;
  if (!jobs.has(key)) jobs.set(key, {...info, key, assetType, sourcePath: value, contexts: []});
  jobs.get(key).contexts.push(context);
  return key;
}

for (const article of articles) {
  const local = localArticles.get(`${article.slug}:${article.locale}`);
  const imagePath = article.imagePath || local?.image;
  const inferredAudioPath = `/audio/blog/${article.locale}/${article.slug}.mp3`;
  const inferredAudio = await fileInfo(inferredAudioPath);
  const audioPath = inferredAudio.kind === "local" ? inferredAudioPath : article.audioPath || local?.audio;
  if (!article.mainImage?.asset?._ref && imagePath) {
    const key = await registerJob(imagePath, "image", `${article._id}:cover`);
    if (key) ensurePatch(article).cover = key;
  }
  if (!article.audioFile?.asset?._ref && audioPath) {
    const key = await registerJob(audioPath, "file", `${article._id}:audio`);
    if (key) ensurePatch(article).audio = key;
  }
  for (const [index, block] of (article.body ?? []).entries()) {
    if (!["externalImage", "editorialFigure"].includes(block?._type)) continue;
    const key = await registerJob(block.src, "image", `${article._id}:body[${index}]`);
    if (key) ensurePatch(article).inline.push({index, key, block});
  }
}

const totalBytes = [...jobs.values()].reduce((sum, job) => sum + job.bytes, 0);
const byType = type => [...jobs.values()].filter(job => job.assetType === type);
console.log(`Articles scanned: ${articles.length}`);
console.log(`Documents to patch: ${patches.size}`);
console.log(`Unique images to upload: ${byType("image").length}`);
console.log(`Unique audio/files to upload: ${byType("file").length}`);
console.log(`Upload size: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`Missing local files: ${missing.length}`);
for (const item of missing.slice(0, 30)) console.log(`MISSING ${item.value} (${item.context})`);

if (!commit) {
  console.log("Dry run only. Set SANITY_MEDIA_COMMIT=1 to upload assets and patch documents.");
  process.exit(missing.length ? 2 : 0);
}
if (missing.length) throw new Error("Refusing to migrate while referenced local media files are missing.");

const uploaded = new Map();
let uploadedCount = 0;
for (const job of jobs.values()) {
  const asset = await client.assets.upload(job.assetType, createReadStream(job.absolutePath), {
    filename: path.basename(job.absolutePath),
    source: {id: job.sourcePath, name: "josuesomarribas.com local media"},
  });
  uploaded.set(job.key, asset._id);
  uploadedCount += 1;
  if (uploadedCount % 10 === 0 || uploadedCount === jobs.size) console.log(`Uploaded ${uploadedCount}/${jobs.size}`);
}

const transaction = client.transaction();
for (const {article, cover, audio, inline} of patches.values()) {
  const values = {};
  if (cover) values.mainImage = {_type: "image", asset: {_type: "reference", _ref: uploaded.get(cover)}, alt: article.imageAlt || localArticles.get(`${article.slug}:${article.locale}`)?.imageAlt || ""};
  if (audio) values.audioFile = {_type: "file", asset: {_type: "reference", _ref: uploaded.get(audio)}};
  if (inline.length) {
    const replacements = new Map(inline.map(item => [item.index, item]));
    values.body = article.body.map((block, index) => {
      const item = replacements.get(index);
      if (!item) return block;
      return {
        _key: block._key,
        _type: "image",
        asset: {_type: "reference", _ref: uploaded.get(item.key)},
        alt: block.alt ?? "",
        ...(block.caption ? {caption: block.caption} : {}),
      };
    });
  }
  transaction.patch(article._id, patch => patch.set(values));
}
await transaction.commit({visibility: "async"});
console.log(`Patched ${patches.size} documents in one transaction.`);
