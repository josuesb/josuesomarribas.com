type Locale = "en" | "es";
type Current = "home" | "writing" | "about";

const labels = {
  en:{ work:"Work", experiments:"Experiments", writing:"Writing", about:"About", resume:"Résumé", talk:"Let's talk" },
  es:{ work:"Proyectos", experiments:"Experimentos", writing:"Artículos", about:"Sobre mí", resume:"Currículum", talk:"Hablemos" },
};

export default function SiteNav({ locale="en", current="home" }:{ locale?:Locale; current?:Current }) {
  const t = labels[locale];
  const home = locale === "es" ? "/es" : "/";
  const writing = locale === "es" ? "/es/blog" : "/blog";
  const links = <>
    <a href={`${home}#work`}>{t.work}</a>
    <a href={`${home}#process`}>{t.experiments}</a>
    <a className={current === "writing" ? "current" : undefined} href={writing}>{t.writing}</a>
    <a className={current === "about" ? "current" : undefined} href="/about">{t.about}</a>
    <a href="/about#route">{t.resume}</a>
  </>;
  const language = <div className="language-switcher" aria-label="Language selector">
    <a className={locale === "en" ? "active" : undefined} href={current === "writing" ? "/blog" : current === "about" ? "/about" : "/"} lang="en">EN</a><span>/</span>
    <a className={locale === "es" ? "active" : undefined} href={current === "writing" ? "/es/blog" : "/es"} lang="es">ES</a>
  </div>;
  return <nav className="nav shell" aria-label="Primary navigation">
    <a className="logo" href={home} aria-label="JS. — Josue Somarribas home">JS.</a><div className="nav-links">{links}</div>{language}
    <a className="btn btn-red nav-cta" href="mailto:josuesomarribasb@gmail.com">{t.talk} <span aria-hidden="true">↗</span></a>
  </nav>;
}
