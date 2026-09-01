import {createClient} from "@sanity/client";
import {mkdir, writeFile} from "node:fs/promises";
import {existsSync} from "node:fs";
import path from "node:path";

const projectId = "uui9v8rf";
const dataset = "production";
const outputFile = path.join(process.cwd(), "work", "sanity-content.json");
if (!process.env.SANITY_API_READ_TOKEN && existsSync(path.join(process.cwd(), ".env.local"))) process.loadEnvFile(path.join(process.cwd(), ".env.local"));
const token = process.env.SANITY_API_READ_TOKEN;
const client = createClient({projectId, dataset, apiVersion: "2026-09-01", useCdn: false, perspective: "published", token});

const query = `*[_type == "article" && publicationDate <= now()] | order(publicationDate desc) {
  "slug": slug.current,
  locale,
  title,
  description,
  "date": publicationDate,
  "draft": false,
  "type": coalesce(contentType, "Blog"),
  "cluster": topic->slug.current,
  "tags": coalesce(tags, []),
  "audio": coalesce(audioPath, ""),
  "sourceImage": coalesce(sourceImagePath, ""),
  "imageAlt": coalesce(imageAlt, ""),
  "image": coalesce(imagePath, ""),
  "canonical": coalesce(canonical, ""),
  "featured": coalesce(featured, false),
  "downloadUrl": coalesce(downloadUrl, ""),
  "downloadText": coalesce(downloadText, ""),
  legacySlug,
  "body": bodyHtml.code
}`;

const articles = await client.fetch(query);
if (!Array.isArray(articles) || articles.length === 0) throw new Error("Sanity returned no published articles; refusing to build an empty site.");
for (const article of articles) {
  if (!article.slug || !article.locale || !article.title || !article.body) throw new Error(`Incomplete Sanity article: ${article.slug ?? "unknown slug"}`);
}

await mkdir(path.dirname(outputFile), {recursive: true});
await writeFile(outputFile, `${JSON.stringify({projectId, dataset, syncedAt: new Date().toISOString(), articles}, null, 2)}\n`);
console.log(`Synced ${articles.length} published article translations from Sanity.`);
