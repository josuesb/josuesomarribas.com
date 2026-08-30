import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://www.josuesomarribas.com";
const articlesRoot = path.join(process.cwd(), "content", "articles");
const outputRoot = path.join(process.cwd(), "dist", "client");

const escapeXml = (value) => value.replace(/[<>&'"]/g, (character) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
})[character]);

async function publishedArticles() {
  const directories = (await readdir(articlesRoot, { withFileTypes:true }))
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  const articles = [];
  for (const directory of directories) {
    const source = await readFile(path.join(articlesRoot, directory, "en.md"), "utf8");
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1];
    if (!frontmatter) throw new Error(`Invalid article frontmatter: ${directory}/en.md`);
    const metadata = Object.fromEntries(frontmatter.split("\n").filter(Boolean).map((line) => {
      const separator = line.indexOf(":");
      return [line.slice(0, separator), JSON.parse(line.slice(separator + 1).trim())];
    }));
    if (!metadata.draft) articles.push(metadata);
  }
  return articles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

async function translatedSlugs() {
  const directories = (await readdir(articlesRoot, { withFileTypes:true }))
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  const slugs = [];
  for (const directory of directories) {
    const file = path.join(articlesRoot, directory, "es.md");
    try {
      await access(file);
      const source = await readFile(file, "utf8");
      if (!source.match(/^---\n[\s\S]*?\ndraft: false\n[\s\S]*?\n---/)) continue;
      slugs.push(directory);
    } catch {
      // This article has no published Spanish translation yet.
    }
  }
  return new Set(slugs);
}

function sitemapEntry({ url, lastModified, priority, alternates }) {
  const alternateLinks = alternates
    ? Object.entries(alternates).map(([language, href]) => `<xhtml:link rel="alternate" hreflang="${language}" href="${href}"/>`).join("")
    : "";
  return `<url><loc>${url}</loc>${lastModified ? `<lastmod>${new Date(lastModified).toISOString()}</lastmod>` : ""}<changefreq>${lastModified ? "yearly" : "weekly"}</changefreq><priority>${priority}</priority>${alternateLinks}</url>`;
}

function assertValidArticleDate(article) {
  const timestamp = Date.parse(article.date);
  const year = new Date(timestamp).getUTCFullYear();
  if (!Number.isFinite(timestamp) || year < 2000 || year > new Date().getUTCFullYear()) {
    throw new Error(`Invalid sitemap date for ${article.slug}: ${article.date}`);
  }
}

const articles = await publishedArticles();
articles.forEach(assertValidArticleDate);
const spanishSlugs = await translatedSlugs();
const homeAlternates = { en: origin, es: `${origin}/es`, "x-default": origin };
const blogAlternates = { en: `${origin}/blog`, es: `${origin}/es/blog`, "x-default": `${origin}/blog` };
const labAlternates = { en: `${origin}/lab`, es: `${origin}/es/lab`, "x-default": `${origin}/lab` };
const sitemapEntries = [
  { url: origin, priority: "1.0", alternates: homeAlternates },
  { url: `${origin}/es`, priority: "1.0", alternates: homeAlternates },
  { url: `${origin}/about`, priority: "0.8" },
  { url: `${origin}/now`, priority: "0.7", alternates: { en: `${origin}/now`, es: `${origin}/es/now` } },
  { url: `${origin}/es/now`, priority: "0.7", alternates: { en: `${origin}/now`, es: `${origin}/es/now` } },
  { url: `${origin}/lab`, priority: "0.8", alternates: labAlternates },
  { url: `${origin}/es/lab`, priority: "0.7", alternates: labAlternates },
  { url: `${origin}/blog`, priority: "0.8", alternates: blogAlternates },
  { url: `${origin}/es/blog`, priority: "0.7", alternates: blogAlternates },
  ...articles.map((article) => ({ url: `${origin}/blog/${article.slug}`, lastModified: article.date, priority: "0.6", alternates: spanishSlugs.has(article.slug) ? { en:`${origin}/blog/${article.slug}`, es:`${origin}/es/blog/${article.slug}` } : undefined })),
  ...articles.filter((article) => spanishSlugs.has(article.slug)).map((article) => ({ url: `${origin}/es/blog/${article.slug}`, lastModified: article.date, priority: "0.6", alternates:{ en:`${origin}/blog/${article.slug}`, es:`${origin}/es/blog/${article.slug}` } })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapEntries.map(sitemapEntry).join("")}</urlset>\n`;
const rssItems = articles.map((article) => {
  const url = `${origin}/blog/${article.slug}`;
  return `<item><title>${escapeXml(article.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(article.date).toUTCString()}</pubDate><description>${escapeXml(article.description)}</description></item>`;
}).join("");
const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Josue Somarribas — Blog</title><link>${origin}/blog</link><description>Field notes on UX, experimentation, CRO and front-end engineering.</description><language>en</language>${rssItems}</channel></rss>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

await mkdir(outputRoot, { recursive: true });
await Promise.all([
  writeFile(path.join(outputRoot, "robots.txt"), robots),
  writeFile(path.join(outputRoot, "sitemap.xml"), sitemap),
  writeFile(path.join(outputRoot, "rss.xml"), rss),
]);
