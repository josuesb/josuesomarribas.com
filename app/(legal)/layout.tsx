import type { Metadata } from "next";
import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "../../components/SiteHeader";
import { getAllArticles } from "../../lib/content";
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.josuesomarribas.com"),
};

export default function LegalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${geist.variable} ${mono.variable}`}><SiteHeader locale="es" spanishArticleSlugs={getAllArticles({ locale:"es" }).map(article => article.slug)}/>{children}</body></html>;
}
