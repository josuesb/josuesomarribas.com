import type { Metadata } from "next";
import Home from "../../(en)/page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Josue Somarribas — Ingeniero UX y desarrollador CRO",
  description: "Investigación, experimentación y desarrollo front-end de producción, desde la primera señal hasta una experiencia publicada.",
  alternates: { canonical: "/es", languages: { en: "/", es: "/es", "x-default": "/" } },
  openGraph: { title: "Josue Somarribas — Ingeniero UX y desarrollador CRO", description: "Detecto dónde dudan las personas, diseño la experiencia y construyo la solución.", url: "/es", locale: "es_ES", alternateLocale: ["en_US"] },
};

export default function SpanishHome() { return <Home locale="es"/>; }
