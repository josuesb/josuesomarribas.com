import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionObserver } from "./MotionObserver";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://josuesomarribas.com"),
  title: "Josue Somarribas — UX Engineer & CRO Developer",
  description: "UX engineering, experimentation and production front-end—from first signal to shipped experience.",
  openGraph: {
    title: "Josue Somarribas — UX Engineer & CRO Developer",
    description: "I find why people hesitate—then design and build the fix.",
    images: [{ url: "/og.png", width: 1792, height: 933, alt: "Josue Somarribas portfolio" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}><MotionObserver />{children}</body></html>;
}
