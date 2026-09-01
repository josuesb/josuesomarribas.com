import fs from "node:fs";
import path from "node:path";

export type ArticleMeta = {
  slug: string; locale: "en" | "es"; title: string; description: string; date: string;
  draft: boolean; type: string; cluster: string; tags: string[]; audio: string;
  sourceImage: string; imageAlt: string; image: string; canonical: string; featured: boolean;
  downloadUrl: string; downloadText: string;
  legacySlug?: string;
};
export type Article = ArticleMeta & { body: string };

const articlesRoot = path.join(process.cwd(), "content", "articles");
const sanitySnapshot = path.join(process.cwd(), "work", "sanity-content.json");

function sanityArticles(): Article[] | null {
  if (process.env.SANITY_CONTENT_SOURCE !== "remote" || !fs.existsSync(sanitySnapshot)) return null;
  const snapshot = JSON.parse(fs.readFileSync(sanitySnapshot, "utf8")) as {articles: Article[]};
  return snapshot.articles;
}

function readArticleFile(file: string): Article {
  const source = fs.readFileSync(file, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Invalid article frontmatter: ${file}`);
  const metadata = Object.fromEntries(match[1].split("\n").filter(Boolean).map(line => {
    const separator = line.indexOf(":");
    const key = line.slice(0, separator);
    const raw = line.slice(separator + 1).trim();
    return [key, JSON.parse(raw)];
  })) as ArticleMeta;
  return { ...metadata, body: match[2].trim() };
}

export function getAllArticles({ includeDrafts = false, locale = "en" as "en" | "es" } = {}): ArticleMeta[] {
  const remoteArticles = sanityArticles();
  if (remoteArticles) return remoteArticles.filter(article => article.locale === locale && (includeDrafts || !article.draft))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map(article => { const metadata = { ...article } as Article & { body?:string }; delete metadata.body; return metadata; });
  if (!fs.existsSync(articlesRoot)) return [];
  return fs.readdirSync(articlesRoot).flatMap(slug => {
    const file = path.join(articlesRoot, slug, `${locale}.md`);
    return fs.existsSync(file) ? [readArticleFile(file)] : [];
  }).filter(article => includeDrafts || !article.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map(article => { const metadata = { ...article } as Article & { body?:string }; delete metadata.body; return metadata; });
}

export function getArticle(slug: string, locale: "en" | "es" = "en"): Article | null {
  const remoteArticles = sanityArticles();
  if (remoteArticles) return remoteArticles.find(article => article.slug === slug && article.locale === locale) ?? null;
  const file = path.join(articlesRoot, slug, `${locale}.md`);
  return fs.existsSync(file) ? readArticleFile(file) : null;
}
