import type { Metadata } from "next";

export function jiraToolsMetadata(locale: "en" | "es"): Metadata {
  const es = locale === "es";
  const title = es ? "Jira Tools — Copia, organiza y abre tickets" : "Jira Tools — Copy, organize and open tickets";
  const description = es
    ? "Plantillas de copia, bandeja, informes por estado e historial local. Abre tickets de Jira por ID con Spotlight. Una extensión para Chrome."
    : "Copy templates, a ticket tray, status reports and local history. Open Jira tickets by ID with Spotlight. A Chrome extension.";
  const canonical = es ? "/es/jira-tools" : "/jira-tools";
  return {
    title, description,
    alternates: { canonical, languages: { en: "/jira-tools", es: "/es/jira-tools", "x-default": "/jira-tools" } },
    openGraph: {
      title, description, url: canonical,
      locale: es ? "es_ES" : "en_US", alternateLocale: [es ? "en_US" : "es_ES"],
      images: [{ url: "/assets/jira-tools/04-bandeja-e-informes-1280x800.png", width: 1280, height: 800, alt: es ? "Bandeja y actualizaciones por estado de Jira Tools" : "Jira Tools tray and updates grouped by status" }],
    },
  };
}
