import {mkdir, readdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const articlesRoot = path.join(root, "content", "articles");
const topicsRoot = path.join(root, "content", "topics");
const outputFile = path.join(root, "work", "sanity-import.ndjson");

function parseArticle(source, file) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Invalid article frontmatter: ${file}`);
  const metadata = Object.fromEntries(match[1].split("\n").filter(Boolean).map(line => {
    const separator = line.indexOf(":");
    return [line.slice(0, separator), JSON.parse(line.slice(separator + 1).trim())];
  }));
  return {...metadata, body: match[2].trim()};
}

const documents = [];
for (const file of (await readdir(topicsRoot)).filter(name => name.endsWith(".json")).sort()) {
  const topic = JSON.parse(await readFile(path.join(topicsRoot, file), "utf8"));
  documents.push({
    _id: `topic.${topic.slug}`,
    _type: "topic",
    name: topic.name,
    slug: {_type: "slug", current: topic.slug},
    description: topic.description,
    pillarPost: topic.pillarPost,
    featuredPosts: topic.featuredPosts,
    seoTitle: topic.seoTitle,
    seoDescription: topic.seoDescription,
  });
}

const now = Date.now();
for (const directory of (await readdir(articlesRoot, {withFileTypes: true})).filter(entry => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  for (const locale of ["en", "es"]) {
    const file = path.join(articlesRoot, directory.name, `${locale}.md`);
    let article;
    try {
      article = parseArticle(await readFile(file, "utf8"), file);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    const isDraft = article.draft || Date.parse(article.date) > now;
    const baseId = `article.${article.slug}.${locale}`;
    documents.push({
      _id: isDraft ? `drafts.${baseId}` : baseId,
      _type: "article",
      title: article.title,
      slug: {_type: "slug", current: article.slug},
      locale,
      translationKey: article.slug,
      description: article.description,
      bodyHtml: {_type: "code", language: "html", code: article.body},
      publicationDate: article.date,
      contentType: article.type,
      topic: article.cluster ? {_type: "reference", _ref: `topic.${article.cluster}`} : undefined,
      tags: article.tags,
      featured: article.featured,
      imagePath: article.image,
      sourceImagePath: article.sourceImage,
      imageAlt: article.imageAlt,
      audioPath: article.audio,
      canonical: article.canonical || undefined,
      legacySlug: article.legacySlug,
      downloadUrl: article.downloadUrl,
      downloadText: article.downloadText,
    });
  }
}

await mkdir(path.dirname(outputFile), {recursive: true});
await writeFile(outputFile, `${documents.map(document => JSON.stringify(document)).join("\n")}\n`);
console.log(`Prepared ${documents.length} documents at ${path.relative(root, outputFile)}`);
console.log(`Published: ${documents.filter(document => !document._id.startsWith("drafts.")).length}; drafts or scheduled: ${documents.filter(document => document._id.startsWith("drafts.")).length}`);
