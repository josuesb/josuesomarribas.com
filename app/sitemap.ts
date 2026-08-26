import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return [
  { url:"https://josuesomarribas.com", changeFrequency:"monthly", priority:1, alternates:{languages:{en:"https://josuesomarribas.com",es:"https://josuesomarribas.com/es"}} },
  { url:"https://josuesomarribas.com/es", changeFrequency:"monthly", priority:1, alternates:{languages:{en:"https://josuesomarribas.com",es:"https://josuesomarribas.com/es"}} },
]; }
