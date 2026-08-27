import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { MotionObserver } from "../MotionObserver";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://josuesomarribas.com"),
  title: "Josue Somarribas — UX Engineer & CRO Developer",
  description: "UX engineering, experimentation and production front-end—from first signal to shipped experience.",
  alternates: { canonical: "/", languages: { en: "/", es: "/es", "x-default": "/" } },
  openGraph: {
    title: "Josue Somarribas — UX Engineer & CRO Developer",
    description: "I find why people hesitate—then design and build the fix.",
    images: [{ url: "/og.png", width: 1792, height: 933, alt: "Josue Somarribas portfolio" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-65JN3HEB8W"/>
      <script dangerouslySetInnerHTML={{ __html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-65JN3HEB8W');` }}/>
      <script dangerouslySetInnerHTML={{ __html:`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6693862,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');` }}/>
    </head>
    <body className={`${geist.variable} ${mono.variable}`}><MotionObserver />{children}</body>
  </html>;
}
