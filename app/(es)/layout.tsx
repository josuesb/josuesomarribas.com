import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { MotionObserver } from "../MotionObserver";
import AnalyticsTracker from "../../components/AnalyticsTracker";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://josuesomarribas.com"),
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
    <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-65JN3HEB8W"/>
      <script dangerouslySetInnerHTML={{ __html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-65JN3HEB8W');` }}/>
      <script dangerouslySetInnerHTML={{ __html:`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6693862,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');` }}/>
    </head>
    <body className={`${geist.variable} ${mono.variable}`}><AnalyticsTracker/><MotionObserver />{children}</body>
  </html>;
}
