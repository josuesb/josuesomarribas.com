import type { MetadataRoute } from "next";
import { getAllArticles } from "../lib/content";
import { labTools } from "../lib/lab-tools";

const origin = "https://www.josuesomarribas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const spanishSlugs = new Set(getAllArticles({ locale:"es" }).map(article => article.slug));
  return [
  { url:origin, changeFrequency:"monthly", priority:1, alternates:{languages:{en:origin,es:`${origin}/es`}} },
  { url:`${origin}/es`, changeFrequency:"monthly", priority:1, alternates:{languages:{en:origin,es:`${origin}/es`}} },
  { url:`${origin}/about`, changeFrequency:"monthly", priority:.8, alternates:{languages:{en:`${origin}/about`,es:`${origin}/es/about`}} },
  { url:`${origin}/es/about`, changeFrequency:"monthly", priority:.8, alternates:{languages:{en:`${origin}/about`,es:`${origin}/es/about`}} },
  { url:`${origin}/hangover`, changeFrequency:"monthly", priority:.8 },
  { url:`${origin}/jira-tools`, changeFrequency:"monthly", priority:.7, alternates:{languages:{en:`${origin}/jira-tools`,es:`${origin}/es/jira-tools`}} },
  { url:`${origin}/es/jira-tools`, changeFrequency:"monthly", priority:.7, alternates:{languages:{en:`${origin}/jira-tools`,es:`${origin}/es/jira-tools`}} },
  { url:`${origin}/jira-tools/privacy`, changeFrequency:"yearly", priority:.3 },
  { url:`${origin}/now`, changeFrequency:"monthly", priority:.7, alternates:{languages:{en:`${origin}/now`,es:`${origin}/es/now`}} },
  { url:`${origin}/es/now`, changeFrequency:"monthly", priority:.7, alternates:{languages:{en:`${origin}/now`,es:`${origin}/es/now`}} },
  { url:`${origin}/lab`, changeFrequency:"monthly", priority:.8, alternates:{languages:{en:`${origin}/lab`,es:`${origin}/es/lab`}} },
  { url:`${origin}/es/lab`, changeFrequency:"monthly", priority:.7, alternates:{languages:{en:`${origin}/lab`,es:`${origin}/es/lab`}} },
  ...labTools.flatMap(tool => {
    const languages = {en:`${origin}/lab/${tool.slug}`,es:`${origin}/es/lab/${tool.slug}`};
    return [
      {url:languages.en,changeFrequency:"monthly" as const,priority:.7,alternates:{languages}},
      {url:languages.es,changeFrequency:"monthly" as const,priority:.6,alternates:{languages}},
    ];
  }),
  { url:`${origin}/blog`, changeFrequency:"weekly", priority:.8, alternates:{languages:{en:`${origin}/blog`,es:`${origin}/es/blog`}} },
  { url:`${origin}/es/blog`, changeFrequency:"weekly", priority:.7, alternates:{languages:{en:`${origin}/blog`,es:`${origin}/es/blog`}} },
  ...getAllArticles().map(article => ({ url:`${origin}/blog/${article.slug}`, lastModified:new Date(article.date), changeFrequency:"yearly" as const, priority:.6, ...(spanishSlugs.has(article.slug) ? { alternates:{ languages:{ en:`${origin}/blog/${article.slug}`, es:`${origin}/es/blog/${article.slug}` } } } : {}) })),
  ...getAllArticles({ locale:"es" }).map(article => ({ url:`${origin}/es/blog/${article.slug}`, lastModified:new Date(article.date), changeFrequency:"yearly" as const, priority:.6, alternates:{ languages:{ en:`${origin}/blog/${article.slug}`, es:`${origin}/es/blog/${article.slug}` } } })),
]; }
