import type { MetadataRoute } from "next";
import { getAllArticles } from "../lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const spanishSlugs = new Set(getAllArticles({ locale:"es" }).map(article => article.slug));
  return [
  { url:"https://josuesomarribas.com", changeFrequency:"monthly", priority:1, alternates:{languages:{en:"https://josuesomarribas.com",es:"https://josuesomarribas.com/es"}} },
  { url:"https://josuesomarribas.com/es", changeFrequency:"monthly", priority:1, alternates:{languages:{en:"https://josuesomarribas.com",es:"https://josuesomarribas.com/es"}} },
  { url:"https://josuesomarribas.com/about", changeFrequency:"monthly", priority:.8 },
  { url:"https://josuesomarribas.com/blog", changeFrequency:"weekly", priority:.8, alternates:{languages:{en:"https://josuesomarribas.com/blog",es:"https://josuesomarribas.com/es/blog"}} },
  { url:"https://josuesomarribas.com/es/blog", changeFrequency:"weekly", priority:.7, alternates:{languages:{en:"https://josuesomarribas.com/blog",es:"https://josuesomarribas.com/es/blog"}} },
  ...getAllArticles().map(article => ({ url:`https://josuesomarribas.com/blog/${article.slug}`, lastModified:new Date(article.date), changeFrequency:"yearly" as const, priority:.6, ...(spanishSlugs.has(article.slug) ? { alternates:{ languages:{ en:`https://josuesomarribas.com/blog/${article.slug}`, es:`https://josuesomarribas.com/es/blog/${article.slug}` } } } : {}) })),
  ...getAllArticles({ locale:"es" }).map(article => ({ url:`https://josuesomarribas.com/es/blog/${article.slug}`, lastModified:new Date(article.date), changeFrequency:"yearly" as const, priority:.6, alternates:{ languages:{ en:`https://josuesomarribas.com/blog/${article.slug}`, es:`https://josuesomarribas.com/es/blog/${article.slug}` } } })),
]; }
