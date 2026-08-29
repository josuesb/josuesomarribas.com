import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const articlesCsv = path.join(root, "backup", "Articles (4).csv");
const clustersCsv = path.join(root, "backup", "Clusters (1).csv");
const articlesDir = path.join(root, "content", "articles");
const topicsDir = path.join(root, "content", "topics");

function parseCsv(source) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"' && source[i + 1] === '"') { field += '"'; i++; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(field); field = ""; }
    else if (char === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (char !== "\r") field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [headers, ...values] = rows;
  return values.filter(row => row.some(Boolean)).map(row => Object.fromEntries(headers.map((key, index) => [key, row[index] ?? ""])));
}

function frontmatter(data) {
  return `---\n${Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n")}\n---\n\n`;
}

function cleanHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+=("[^"]*"|'[^']*')/gi, "")
    .trim();
}

function safeSlug(value) {
  return value.normalize("NFKD").replace(/[’']/g, "").replace(/[^a-zA-Z0-9-]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}

fs.mkdirSync(articlesDir, { recursive: true });
fs.mkdirSync(topicsDir, { recursive: true });

const articles = parseCsv(fs.readFileSync(articlesCsv, "utf8"));
for (const article of articles) {
  const slug = safeSlug(article.Slug);
  const dir = path.join(articlesDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  const metadata = {
    slug,
    legacySlug: article.Slug === slug ? "" : article.Slug,
    locale: "en",
    title: article["Meta title"],
    description: article["Meta description"],
    date: article["Published date"],
    draft: article[":draft"] === "true",
    type: article["Blog Post Type"] || "Blog",
    cluster: article.Cluster,
    tags: article.Tags ? article.Tags.split(",").map(value => value.trim()).filter(Boolean) : [],
    audio: article.Audio,
    sourceImage: article.Image,
    imageAlt: article["Image:alt"] || "Abstract editorial illustration about digital product design and experimentation",
    image: "/images/blog/default-cover-1400.webp",
    canonical: article["Canonical URL"],
    featured: Boolean(article["Featured image"]),
    downloadUrl: article["File (s)"],
    downloadText: article["File Download Text"],
  };
  fs.writeFileSync(path.join(dir, "en.md"), frontmatter(metadata) + cleanHtml(article.Content) + "\n");
}

const clusters = parseCsv(fs.readFileSync(clustersCsv, "utf8"));
for (const cluster of clusters) {
  fs.writeFileSync(path.join(topicsDir, `${cluster.Slug}.json`), JSON.stringify({
    slug: cluster.Slug,
    name: cluster["Cluster Name"],
    description: cluster.Description,
    pillarPost: cluster["Pillar Post"],
    featuredPosts: cluster["Featured Posts"].split(",").map(value => value.trim()).filter(Boolean),
    seoTitle: cluster["SEO Title"],
    seoDescription: cluster["SEO Description"],
  }, null, 2) + "\n");
}

console.log(`Migrated ${articles.length} articles and ${clusters.length} topics.`);
