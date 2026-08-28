import type { Metadata } from "next";
import NowEditorialPage from "../../../components/NowEditorialPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Now — Josue Somarribas",
  description: "What Josue Somarribas is building, learning, exploring and reading right now.",
  alternates: { canonical: "/now", languages: { en: "/now", es: "/es/now", "x-default": "/now" } },
};

export default function NowPage() {
  return <NowEditorialPage/>;
}
