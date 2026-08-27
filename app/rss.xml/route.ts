import { getAllArticles } from "../../lib/content";

const escapeXml = (value:string) => value.replace(/[<>&'"]/g, character => ({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[character]!);
export const dynamic = "force-static";
export function GET(){
  const items = getAllArticles().map(article => `<item><title>${escapeXml(article.title)}</title><link>https://josuesomarribas.com/blog/${article.slug}</link><guid isPermaLink="true">https://josuesomarribas.com/blog/${article.slug}</guid><pubDate>${new Date(article.date).toUTCString()}</pubDate><description>${escapeXml(article.description)}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Josue Somarribas — Blog</title><link>https://josuesomarribas.com/blog</link><description>Field notes on UX, experimentation, CRO and front-end engineering.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers:{ "Content-Type":"application/rss+xml; charset=utf-8", "Cache-Control":"public, max-age=3600" } });
}
