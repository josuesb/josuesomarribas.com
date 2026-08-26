import type { MetadataRoute } from "next";
import { getAllArticles } from "../lib/content";
export default function sitemap(): MetadataRoute.Sitemap { return [
  { url:"https://josuesomarribas.com", changeFrequency:"monthly", priority:1, alternates:{languages:{en:"https://josuesomarribas.com",es:"https://josuesomarribas.com/es"}} },
  { url:"https://josuesomarribas.com/es", changeFrequency:"monthly", priority:1, alternates:{languages:{en:"https://josuesomarribas.com",es:"https://josuesomarribas.com/es"}} },
  { url:"https://josuesomarribas.com/writing", changeFrequency:"weekly", priority:.8, alternates:{languages:{en:"https://josuesomarribas.com/writing",es:"https://josuesomarribas.com/es/writing"}} },
  { url:"https://josuesomarribas.com/es/writing", changeFrequency:"weekly", priority:.8, alternates:{languages:{en:"https://josuesomarribas.com/writing",es:"https://josuesomarribas.com/es/writing"}} },
  ...getAllArticles().map(article => ({ url:`https://josuesomarribas.com/writing/${article.slug}`, lastModified:new Date(article.date), changeFrequency:"yearly" as const, priority:.6 })),
]; }
