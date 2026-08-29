import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const backupRoot = path.join(root, "backup", "framer-images");
const publicRoot = path.join(root, "public", "images", "framer-migrated");
const skippedDirectories = new Set([".git", ".next", ".venv-tts", "backup", "dist", "node_modules", "public"]);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".jsx", ".md", ".mjs", ".ts", ".tsx", ".txt"]);
const imageUrl = /https:\/\/framerusercontent\.com\/(?:images|assets)\/[^"'()<>\s]+?\.(?:avif|gif|jpe?g|png|webp)(?:\?[^"'()<>\s]*)?/gi;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes:true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else if (textExtensions.has(path.extname(entry.name).toLowerCase())) files.push(target);
  }
  return files;
}

function normalizedUrl(raw) {
  return raw.replaceAll("&amp;", "&").replace(/[.,;:]$/, "");
}

function assetName(url) {
  const pathname = new URL(url).pathname;
  return path.basename(pathname).replace(/[^a-zA-Z0-9._-]/g, "-");
}

async function downloadOriginal(url, destination) {
  try { await fs.access(destination); return; } catch { /* Download when the backup is missing. */ }
  const response = await fetch(new URL(url).origin + new URL(url).pathname);
  if (!response.ok) throw new Error(`${response.status} downloading ${url}`);
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

async function createPublicAsset(original, publicFile, extension) {
  try { await fs.access(publicFile); return; } catch { /* Generate when the public asset is missing. */ }
  if (extension === ".gif") {
    await fs.copyFile(original, publicFile);
    return;
  }
  await sharp(original, { animated:true })
    .rotate()
    .resize({ width:2400, height:2400, fit:"inside", withoutEnlargement:true })
    .webp({ quality:86, effort:6, alphaQuality:90 })
    .toFile(publicFile);
}

await fs.mkdir(backupRoot, { recursive:true });
await fs.mkdir(publicRoot, { recursive:true });

const files = await walk(root);
const references = new Map();
for (const file of files) {
  const source = await fs.readFile(file, "utf8");
  for (const match of source.matchAll(imageUrl)) {
    const raw = match[0];
    const url = normalizedUrl(raw);
    if (!references.has(url)) references.set(url, new Set());
    references.get(url).add(file);
  }
}

if (references.size === 0) {
  console.log("No Framer-hosted image references found. Nothing to migrate.");
  process.exit(0);
}

const mapping = new Map();
const manifest = [];
let completed = 0;
for (const [url, usedBy] of [...references].sort(([a],[b]) => a.localeCompare(b))) {
  const originalName = assetName(url);
  const extension = path.extname(originalName).toLowerCase();
  const publicName = extension === ".gif" ? originalName : `${path.parse(originalName).name}.webp`;
  const original = path.join(backupRoot, originalName);
  const publicFile = path.join(publicRoot, publicName);
  await downloadOriginal(url, original);
  await createPublicAsset(original, publicFile, extension);
  const localUrl = `/images/framer-migrated/${publicName}`;
  mapping.set(url, localUrl);
  const [originalStat, publicStat] = await Promise.all([fs.stat(original), fs.stat(publicFile)]);
  manifest.push({ source:url, original:`backup/framer-images/${originalName}`, public:localUrl, originalBytes:originalStat.size, publicBytes:publicStat.size, references:usedBy.size });
  completed += 1;
  console.log(`[${completed}/${references.size}] ${originalName} -> ${publicName}`);
}

let changedFiles = 0;
for (const file of files) {
  const source = await fs.readFile(file, "utf8");
  const updated = source.replace(imageUrl, raw => mapping.get(normalizedUrl(raw)) ?? raw);
  if (updated !== source) {
    await fs.writeFile(file, updated);
    changedFiles += 1;
  }
}

await fs.writeFile(path.join(backupRoot, "manifest.json"), JSON.stringify({ generatedAt:new Date().toISOString(), assets:manifest }, null, 2) + "\n");
const originalBytes = manifest.reduce((sum,item) => sum + item.originalBytes, 0);
const publicBytes = manifest.reduce((sum,item) => sum + item.publicBytes, 0);
console.log(`Migrated ${manifest.length} images across ${changedFiles} files.`);
console.log(`Originals: ${(originalBytes / 1024 / 1024).toFixed(1)} MB; public assets: ${(publicBytes / 1024 / 1024).toFixed(1)} MB.`);
