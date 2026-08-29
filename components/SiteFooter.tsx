export default function SiteFooter({ locale="en", current }:{ locale?:"en"|"es"; current?:"writing"|"about" }) {
  const home = locale === "es" ? "/es" : "/";
  const writing = locale === "es" ? "/es/blog" : "/blog";
  const t = locale === "es" ? { work:"Proyectos", experiments:"Experimentos", writing:"Artículos", about:"Sobre mí" } : { work:"Work", experiments:"Experiments", writing:"Writing", about:"About" };
  return <footer><div className="shell">
    <a className="logo" href={home}>JS.</a>
    <p>© 2026 Josue Somarribas.</p><a className="footer-url" href="https://www.josuesomarribas.com">josuesomarribas.com</a><a className="footer-email" href="mailto:josuesomarribasb@gmail.com">josuesomarribasb@gmail.com</a>
    <div><a href={`${home}#work`}>{t.work}</a><a href={`${home}#process`}>{t.experiments}</a><a className={current === "writing" ? "current" : undefined} href={writing}>{t.writing}</a><a className={current === "about" ? "current" : undefined} href="/about">{t.about}</a><a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="mailto:josuesomarribasb@gmail.com" aria-label="Email">✉</a></div>
  </div></footer>;
}
