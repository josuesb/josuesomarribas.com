type Locale = "en" | "es";
type Current = "home" | "writing" | "about" | "now";

const labels = {
  en:{ work:"Work", experiments:"Experiments", writing:"Writing", about:"About", now:"Now", resume:"Résumé", talk:"Let's talk" },
  es:{ work:"Proyectos", experiments:"Experimentos", writing:"Artículos", about:"Sobre mí", now:"Ahora", resume:"Currículum", talk:"Hablemos" },
};

const resumeHref = "/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf";

export default function SiteNav({ locale="en", current="home", articleSlug, hasSpanishTranslation=false }:{ locale?:Locale; current?:Current; articleSlug?:string; hasSpanishTranslation?:boolean }) {
  const t = labels[locale];
  const home = locale === "es" ? "/es" : "/";
  const writing = locale === "es" ? "/es/blog" : "/blog";
  const navigationLinks = () => <>
    <a href={`${home}#work`}>{t.work}</a>
    <a href={`${home}#process`}>{t.experiments}</a>
    <a className={current === "writing" ? "current" : undefined} href={writing}>{t.writing}</a>
    <a className={current === "about" ? "current" : undefined} href="/about">{t.about}</a>
    <a className={current === "now" ? "current" : undefined} href="/now">{t.now}</a>
    <a href={resumeHref} target="_blank" rel="noreferrer">{t.resume}</a>
  </>;
  const englishLanguageHref = articleSlug ? `/blog/${articleSlug}` : current === "writing" ? "/blog" : current === "about" ? "/about" : current === "now" ? "/now" : "/";
  const spanishLanguageHref = articleSlug && hasSpanishTranslation ? `/es/blog/${articleSlug}` : current === "writing" ? "/es/blog" : current === "now" ? "/now" : "/es";
  const language = <div className="language-switcher" aria-label="Language selector">
    <a className={locale === "en" ? "active" : undefined} href={englishLanguageHref} lang="en">EN</a><span>/</span>
    <a className={locale === "es" ? "active" : undefined} href={spanishLanguageHref} lang="es" title={articleSlug && !hasSpanishTranslation ? "This article is not yet available in Spanish; view translated articles" : undefined}>ES</a>
  </div>;
  return <nav className="nav shell" aria-label="Primary navigation">
    <a className="logo" href={home} aria-label="JS. — Josue Somarribas home">JS.</a><div className="nav-links">{navigationLinks()}</div>{language}
    <a className="btn btn-red nav-cta" href="mailto:josuesomarribasb@gmail.com">{t.talk} <span aria-hidden="true">↗</span></a>
    <details className="mobile-nav">
      <summary aria-label={locale === "es" ? "Abrir menú" : "Open menu"}><span aria-hidden="true" className="mobile-nav-icon"/></summary>
      <div className="mobile-nav-panel">{navigationLinks()}<a className="btn btn-red mobile-talk" href="mailto:josuesomarribasb@gmail.com">{t.talk} <span aria-hidden="true">↗</span></a></div>
    </details>
  </nav>;
}
