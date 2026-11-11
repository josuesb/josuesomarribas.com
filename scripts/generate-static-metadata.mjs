import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://www.josuesomarribas.com";
const articlesRoot = path.join(process.cwd(), "content", "articles");
const outputRoot = path.join(process.cwd(), "dist", "client");
const sanitySnapshot = path.join(process.cwd(), "work", "sanity-content.json");

async function remoteArticles() {
  if (process.env.SANITY_CONTENT_SOURCE !== "remote") return null;
  const snapshot = JSON.parse(await readFile(sanitySnapshot, "utf8"));
  return snapshot.articles;
}

const escapeXml = (value) => value.replace(/[<>&'"]/g, (character) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
})[character]);

async function publishedArticles() {
  const remote = await remoteArticles();
  if (remote) return remote.filter(article => article.locale === "en").sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
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
    if (!metadata.draft && Date.parse(metadata.date) <= Date.now()) articles.push(metadata);
  }
  return articles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

async function translatedSlugs() {
  const remote = await remoteArticles();
  if (remote) return new Set(remote.filter(article => article.locale === "es").map(article => article.slug));
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
    ? Object.entries(alternates).map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${href}"/>`).join("\n")
    : "";
  return [
    "  <url>",
    `    <loc>${url}</loc>`,
    ...(lastModified ? [`    <lastmod>${new Date(lastModified).toISOString()}</lastmod>`] : []),
    `    <changefreq>${lastModified ? "yearly" : "weekly"}</changefreq>`,
    `    <priority>${priority}</priority>`,
    ...(alternateLinks ? [alternateLinks] : []),
    "  </url>",
  ].join("\n");
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
const labToolSlugs = ["five-seconds-tester","font-tester","local-blog-audio","experiment-preflight","fouc-simulator","url-concat","utm-builder","browser-debug"];
const sitemapEntries = [
  { url: origin, priority: "1.0", alternates: homeAlternates },
  { url: `${origin}/es`, priority: "1.0", alternates: homeAlternates },
  { url: `${origin}/about`, priority: "0.8", alternates: { en: `${origin}/about`, es: `${origin}/es/about` } },
  { url: `${origin}/es/about`, priority: "0.8", alternates: { en: `${origin}/about`, es: `${origin}/es/about` } },
  { url: `${origin}/hangover`, priority: "0.8" },
  { url: `${origin}/jira-tools/privacy`, priority: "0.3" },
  { url: `${origin}/now`, priority: "0.7", alternates: { en: `${origin}/now`, es: `${origin}/es/now` } },
  { url: `${origin}/es/now`, priority: "0.7", alternates: { en: `${origin}/now`, es: `${origin}/es/now` } },
  { url: `${origin}/lab`, priority: "0.8", alternates: labAlternates },
  { url: `${origin}/es/lab`, priority: "0.7", alternates: labAlternates },
  ...labToolSlugs.flatMap((slug) => {
    const alternates = {en:`${origin}/lab/${slug}`,es:`${origin}/es/lab/${slug}`,"x-default":`${origin}/lab/${slug}`};
    return [
      {url:`${origin}/lab/${slug}`,priority:"0.7",alternates},
      {url:`${origin}/es/lab/${slug}`,priority:"0.6",alternates},
    ];
  }),
  { url: `${origin}/blog`, priority: "0.8", alternates: blogAlternates },
  { url: `${origin}/es/blog`, priority: "0.7", alternates: blogAlternates },
  ...articles.map((article) => ({ url: `${origin}/blog/${article.slug}`, lastModified: article.date, priority: "0.6", alternates: spanishSlugs.has(article.slug) ? { en:`${origin}/blog/${article.slug}`, es:`${origin}/es/blog/${article.slug}` } : undefined })),
  ...articles.filter((article) => spanishSlugs.has(article.slug)).map((article) => ({ url: `${origin}/es/blog/${article.slug}`, lastModified: article.date, priority: "0.6", alternates:{ en:`${origin}/blog/${article.slug}`, es:`${origin}/es/blog/${article.slug}` } })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.map(sitemapEntry).join("\n")}
</urlset>\n`;
const sitemapStylesheet = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — Josue Somarribas</title>
        <style>
          *{box-sizing:border-box}body{margin:0;background:#f7f0df;color:#101920;font-family:Arial,sans-serif}header{padding:48px max(24px,calc((100% - 1120px)/2));background:#101920;color:#f7f0df}h1{margin:0 0 8px;font-family:Georgia,serif;font-size:clamp(2.4rem,6vw,5rem);font-weight:500;letter-spacing:-.05em}header p{margin:0;color:#c9c4b9}main{width:min(1120px,calc(100% - 48px));margin:32px auto 64px}.summary{margin:0 0 18px;color:#0849b6;font-family:monospace;font-size:.78rem;font-weight:700;text-transform:uppercase}table{width:100%;border-collapse:collapse;background:#fffaf0;border:1px solid #c8c0b2}th,td{padding:14px 16px;border-bottom:1px solid #d8d0c2;text-align:left;vertical-align:top}th{background:#ebe4d7;font-family:monospace;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase}td{font-size:.86rem}a{color:#0849b6;overflow-wrap:anywhere}tr:hover td{background:#f3ecdf}.priority{font-family:monospace}@media(max-width:680px){header{padding:32px 20px}main{width:calc(100% - 24px)}th:nth-child(2),td:nth-child(2),th:nth-child(3),td:nth-child(3){display:none}th,td{padding:12px 10px}}
        </style>
      </head>
      <body>
        <header><h1>Sitemap</h1><p>josuesomarribas.com · Índice de páginas públicas</p></header>
        <main>
          <p class="summary"><xsl:value-of select="count(s:urlset/s:url)"/> URLs indexables</p>
          <table>
            <thead><tr><th>URL</th><th>Última modificación</th><th>Prioridad</th></tr></thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                  <td><xsl:choose><xsl:when test="s:lastmod"><xsl:value-of select="substring(s:lastmod,1,10)"/></xsl:when><xsl:otherwise>—</xsl:otherwise></xsl:choose></td>
                  <td class="priority"><xsl:value-of select="s:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>\n`;
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
  writeFile(path.join(outputRoot, "sitemap.xsl"), sitemapStylesheet),
  writeFile(path.join(outputRoot, "rss.xml"), rss),
]);
