import type { Metadata } from "next";
import Hangover from "./Hangover";
import { experienceInstructions } from "./experience";
import HangoverStructuredData, { hangoverUrl } from "./HangoverStructuredData";
import "./hangover.css";

export const metadata: Metadata = {
  title: "AI HANGOVER™ — Digital hangover relief by JS.",
  description: "Your AI had too many prompts last night. One fictional cure. A little self-reflection. Give your conversation a fresh start.",
  alternates: { canonical: hangoverUrl },
  openGraph: { title: "AI HANGOVER™", description: "Your AI had too many prompts last night. Give it a cure.", url: hangoverUrl, images: [{ url: "/hangover/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/hangover/og.png"] },
};

export default function Page() { return <><div id="experience" className="modal_hide">{experienceInstructions}</div><HangoverStructuredData /><Hangover /></>; }
