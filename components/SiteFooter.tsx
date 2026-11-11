import styles from "./SiteFooter.module.css";

export default function SiteFooter({ locale="en", current }:{ locale?:"en"|"es"; current?:"writing"|"about"|"lab" }) {
  const home = locale === "es" ? "/es" : "/";
  const prefix = locale === "es" ? "/es" : "";
  const t = locale === "es" ? { work:"Proyectos", experiments:"CRO", writing:"Artículos", about:"Sobre mí", lab:"Lab", now:"Ahora" } : { work:"Work", experiments:"CRO", writing:"Writing", about:"About", lab:"Lab", now:"Now" };
  return <footer className={styles.footer} data-site-footer><div className={styles.inner}>
    <a className={styles.logo} href={home} aria-label={locale === "es" ? "Josue Somarribas, inicio" : "Josue Somarribas home"}>JS.</a>
    <p className={styles.copyright}>© 2026 Josue Somarribas.</p><a className={styles.url} href="https://www.josuesomarribas.com">josuesomarribas.com</a>
    <nav className={styles.links} aria-label={locale === "es" ? "Navegación del pie" : "Footer navigation"}>
      <a href={`${home}#work`}>{t.work}</a><a href={`${home}#process`}>{t.experiments}</a>
      <a aria-current={current === "writing" ? "page" : undefined} href={`${prefix}/blog`}>{t.writing}</a>
      <a aria-current={current === "about" ? "page" : undefined} href={`${prefix}/about`}>{t.about}</a>
      <a aria-current={current === "lab" ? "page" : undefined} href={`${prefix}/lab`}>{t.lab}</a>
      <a href={`${prefix}/now`}>{t.now}</a>
      <a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
      <a href="mailto:josuesomarribasb@gmail.com" aria-label={locale === "es" ? "Enviar email" : "Send email"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg></a>
    </nav>
  </div></footer>;
}
