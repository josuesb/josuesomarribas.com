"use client";

import { usePathname } from "next/navigation";
import SiteNav from "./SiteNav";

export default function SiteHeader({ locale, spanishArticleSlugs }: { locale: "en" | "es"; spanishArticleSlugs: string[] }) {
  const pathname = usePathname() || (locale === "es" ? "/es" : "/");
  const path = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  const articleSlug = path.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const current = path.startsWith("/blog") ? "writing" : path.startsWith("/about") ? "about" : path.startsWith("/lab") ? "lab" : path.startsWith("/now") ? "now" : "home";
  const englishHref = path === "/jira-tools/privacy" ? "/jira-tools" : path;
  const spanishHref = articleSlug && !spanishArticleSlugs.includes(articleSlug) ? "/es/blog" : path === "/" ? "/es" : path.startsWith("/hangover") ? "/es" : path === "/jira-tools/privacy" ? path : `/es${path}`;
  return <SiteNav locale={locale} current={current} languageHrefs={{ en: englishHref, es: spanishHref }}/>;
}
