export default function SiteFooter({ locale="en", current }:{ locale?:"en"|"es"; current?:"writing"|"about"|"lab" }) {
  const home = locale === "es" ? "/es" : "/";
  const writing = locale === "es" ? "/es/blog" : "/blog";
  const t = locale === "es" ? { work:"Proyectos", experiments:"Experimentos", writing:"Artículos", about:"Sobre mí", lab:"Lab" } : { work:"Work", experiments:"Experiments", writing:"Writing", about:"About", lab:"Lab" };
  return <footer><div className="shell">
    <a className="logo" href={home}>JS.</a>
    <p>© 2026 Josue Somarribas.</p><a className="footer-url" href="https://www.josuesomarribas.com">josuesomarribas.com</a><a className="footer-email" href="mailto:josuesomarribasb@gmail.com">josuesomarribasb@gmail.com</a>
    <div><a href={`${home}#work`}>{t.work}</a><a href={`${home}#process`}>{t.experiments}</a><a className={current === "writing" ? "current" : undefined} href={writing}>{t.writing}</a><a className={current === "about" ? "current" : undefined} href="/about">{t.about}</a><a className={current === "lab" ? "current" : undefined} href={locale === "es" ? "/es/lab" : "/lab"}>{t.lab}</a><a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="mailto:josuesomarribasb@gmail.com" className="footer-email-icon" aria-label={locale === "es" ? "Enviar email" : "Send email"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg></a></div>
  </div></footer>;
}
