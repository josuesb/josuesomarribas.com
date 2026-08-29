import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { MotionObserver } from "../MotionObserver";
import AnalyticsTracker from "../../components/AnalyticsTracker";
import DeferredThirdPartyScripts from "../../components/DeferredThirdPartyScripts";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.josuesomarribas.com"),
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
    <body className={`${geist.variable} ${mono.variable}`}><DeferredThirdPartyScripts/><AnalyticsTracker/><MotionObserver />{children}</body>
  </html>;
}
