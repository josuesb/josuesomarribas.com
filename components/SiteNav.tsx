type Locale = "en" | "es";
type Current = "home" | "writing" | "about" | "now" | "lab";

const labels = {
  en:{ work:"Work", experiments:"Experiments", writing:"Writing", about:"About", now:"Now", lab:"Lab", resume:"Résumé", talk:"Let's talk" },
  es:{ work:"Proyectos", experiments:"Experimentos", writing:"Artículos", about:"Sobre mí", now:"Ahora", lab:"Lab", resume:"Currículum", talk:"Hablemos" },
};

const resumeHref = "/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf";

export default function SiteNav({ locale="en", current="home", articleSlug, hasSpanishTranslation=false }:{ locale?:Locale; current?:Current; articleSlug?:string; hasSpanishTranslation?:boolean }) {
  const t = labels[locale];
  const home = locale === "es" ? "/es" : "/";
  const writing = locale === "es" ? "/es/blog" : "/blog";
  const navigationLinks = (secondary = false) => <>
    <a href={`${home}#work`}>{t.work}</a>
    <a href={`${home}#process`}>{t.experiments}</a>
    <a className={current === "writing" ? "current" : undefined} href={writing}>{t.writing}</a>
    <a className={current === "about" ? "current" : undefined} href={locale === "es" ? "/es/about" : "/about"}>{t.about}</a>
    {secondary && <a className={current === "lab" ? "current" : undefined} href={locale === "es" ? "/es/lab" : "/lab"}>{t.lab}</a>}
  </>;
  const englishLanguageHref = articleSlug ? `/blog/${articleSlug}` : current === "writing" ? "/blog" : current === "about" ? "/about" : current === "now" ? "/now" : current === "lab" ? "/lab" : "/";
  const spanishLanguageHref = articleSlug && hasSpanishTranslation ? `/es/blog/${articleSlug}` : current === "about" ? "/es/about" : current === "writing" ? "/es/blog" : current === "now" ? "/es/now" : current === "lab" ? "/es/lab" : "/es";
  const language = <div className="language-switcher" aria-label="Language selector">
    <a className={locale === "en" ? "active" : undefined} href={englishLanguageHref} lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</a><span>/</span>
    <a className={locale === "es" ? "active" : undefined} href={spanishLanguageHref} lang="es" aria-current={locale === "es" ? "page" : undefined} title={articleSlug && !hasSpanishTranslation ? "This article is not yet available in Spanish; view translated articles" : undefined}>ES</a>
  </div>;
  return <nav className="nav shell" aria-label="Primary navigation">
    <a className="logo" href={home} aria-label="JS. — Josue Somarribas home">JS.</a><div className="nav-links">{navigationLinks()}</div>{language}
    <a className="nav-resume" href={resumeHref} target="_blank" rel="noreferrer">{t.resume}</a>
    <a className="btn btn-red nav-cta" href="mailto:josuesomarribasb@gmail.com">{t.talk} </a>
    <details className="mobile-nav">
      <summary aria-label={locale === "es" ? "Abrir menú" : "Open menu"}><span aria-hidden="true" className="mobile-nav-icon"/></summary>
      <div className="mobile-nav-panel">{navigationLinks(true)}<a href={resumeHref} target="_blank" rel="noreferrer">{t.resume}</a><a className="btn btn-red mobile-talk" href="mailto:josuesomarribasb@gmail.com">{t.talk} </a></div>
    </details>
  </nav>;
}
