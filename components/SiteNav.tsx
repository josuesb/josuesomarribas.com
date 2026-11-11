"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "./ui/Action";
import styles from "./SiteNav.module.css";

type Locale = "en" | "es";
type Current = "home" | "writing" | "about" | "now" | "lab";
const labels = {
  en: { work:"Work", experiments:"CRO", writing:"Writing", about:"About", lab:"Lab", resume:"Résumé", talk:"Let's talk" },
  es: { work:"Proyectos", experiments:"CRO", writing:"Artículos", about:"Sobre mí", lab:"Lab", resume:"Currículum", talk:"Hablemos" },
};
const resumeHref = "/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf";

export default function SiteNav({ locale, current, languageHrefs }: { locale: Locale; current: Current; languageHrefs: Record<Locale, string> }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const closeOnLink = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a")) menu.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    menu.addEventListener("click", closeOnLink);
    document.addEventListener("keydown", closeOnEscape);
    return () => { menu.removeEventListener("click", closeOnLink); document.removeEventListener("keydown", closeOnEscape); };
  }, []);
  const t = labels[locale];
  const home = locale === "es" ? "/es" : "/";
  const prefix = locale === "es" ? "/es" : "";
  const links = <>
    <a href={`${home}#work`}>{t.work}</a>
    <a href={`${home}#process`}>{t.experiments}</a>
    <a href={`${prefix}/blog`} aria-current={current === "writing" ? "page" : undefined}>{t.writing}</a>
    <a href={`${prefix}/about`} aria-current={current === "about" ? "page" : undefined}>{t.about}</a>
    <a href={`${prefix}/lab`} aria-current={current === "lab" ? "page" : undefined}>{t.lab}</a>
  </>;
  return <header className={styles.header} data-site-header>
    <nav className={styles.nav} aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}>
      <a className={styles.logo} href={home} aria-label={locale === "es" ? "Josue Somarribas, inicio" : "Josue Somarribas home"}>JS.</a>
      <div className={styles.links}>{links}</div>
      <div className={styles.languages} aria-label={locale === "es" ? "Selector de idioma" : "Language selector"}>
        <a href={languageHrefs.en} lang="en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>EN</a><span aria-hidden="true">/</span>
        <a href={languageHrefs.es} lang="es" hrefLang="es" aria-current={locale === "es" ? "page" : undefined}>ES</a>
      </div>
      <a className={styles.resume} href={resumeHref} target="_blank" rel="noreferrer">{t.resume}</a>
      <div className={styles.desktopAction}><ButtonLink size="small" href="mailto:josuesomarribasb@gmail.com">{t.talk}</ButtonLink></div>
      <details className={styles.mobile} ref={menuRef}>
        <summary aria-label={locale === "es" ? "Abrir menú" : "Open menu"}><span className={styles.menuIcon} aria-hidden="true"/></summary>
        <div className={styles.panel}>{links}<a href={resumeHref} target="_blank" rel="noreferrer">{t.resume}</a><ButtonLink href="mailto:josuesomarribasb@gmail.com">{t.talk}</ButtonLink></div>
      </details>
    </nav>
  </header>;
}
