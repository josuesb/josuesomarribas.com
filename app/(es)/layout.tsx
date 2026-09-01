import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { MotionObserver } from "../MotionObserver";
import AnalyticsTracker from "../../components/AnalyticsTracker";
import DeferredThirdPartyScripts from "../../components/DeferredThirdPartyScripts";
import SiteStructuredData from "../../components/SiteStructuredData";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.josuesomarribas.com"),
  title: "Josue Somarribas — Ingeniero UX y desarrollador CRO",
  description: "Investigación, experimentación y desarrollo front-end de producción, desde la primera señal hasta una experiencia publicada.",
  alternates: { canonical: "/es", languages: { en: "/", es: "/es", "x-default": "/" } },
  openGraph: {
    title: "Josue Somarribas — Ingeniero UX y desarrollador CRO",
    description: "Detecto dónde dudan las personas, diseño la experiencia y construyo la solución.",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: [{ url: "/og.png", width: 1792, height: 933, alt: "Portfolio de Josue Somarribas" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es">
    <body className={`${geist.variable} ${mono.variable}`}><SiteStructuredData locale="es"/><DeferredThirdPartyScripts/><AnalyticsTracker/><MotionObserver />{children}</body>
  </html>;
}
