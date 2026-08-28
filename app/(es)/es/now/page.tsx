import type { Metadata } from "next";
import NowEditorialPage from "../../../../components/NowEditorialPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ahora — Josue Somarribas",
  description: "Lo que Josue Somarribas está construyendo, aprendiendo, explorando y leyendo ahora mismo.",
  alternates: { canonical: "/es/now", languages: { en: "/now", es: "/es/now", "x-default": "/now" } },
};

export default function NowPage() {
  return <NowEditorialPage locale="es"/>;
}
