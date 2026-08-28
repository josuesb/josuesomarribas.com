import WritingIndex from "./WritingIndex";
import type { ArticleMeta } from "../../lib/content";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import CopyEmailButton from "../../components/CopyEmailButton";
import Image from "next/image";

const mailchimpAction = "https://josuesomarribas.us10.list-manage.com/subscribe/post?u=a0e13242fe65e96acc0169bef&id=b6eb284256&f_id=00addce1f0";

const C={
  en:{work:"Work",experiments:"Experiments",writing:"Writing",about:"About",resume:"Résumé",talk:"Let's talk",label:"WRITING · NOTES FROM THE WORK",h1a:"Things I’m learning,",h1b:"building and",h1em:"questioning.",lead:"Field notes on UX, experimentation, front-end craft and the messy thinking behind better digital products.",by:"Written by Josue Somarribas　·　Costa Rica → Spain",featured:"FEATURED NOTE",title:"The Cost of FOUC: How Flicker Kills A/B Test Validity",desc:"When an experiment flashes the original experience before the variant, the damage is more than visual. It changes behavior—and the validity of what you measure.",read:"Read the note",quote:"Not everything worth publishing begins as a case study.",quote2:"Some ideas start as a bug, a failed test, a browser quirk or a question I couldn’t leave alone.",follow:"Follow the rabbit hole.",follow2:"Occasional notes. No content calendar. No growth-hack theatre.",email:"Email address",send:"Get new notes",rss:"RSS feed",compare:"Want to compare notes?",start:"Start a conversation",base:"Based in Spain　·　CET　·　English + Spanish"},
  es:{work:"Proyectos",experiments:"Experimentos",writing:"Artículos",about:"Sobre mí",resume:"Currículum",talk:"Hablemos",label:"ARTÍCULOS · NOTAS DESDE EL TRABAJO",h1a:"Cosas que estoy aprendiendo,",h1b:"construyendo y",h1em:"cuestionando.",lead:"Notas sobre UX, experimentación, desarrollo front-end y las ideas desordenadas que hay detrás de mejores productos digitales.",by:"Escrito por Josue Somarribas　·　Costa Rica → España",featured:"NOTA DESTACADA",title:"El coste del FOUC: cómo el parpadeo invalida un test A/B",desc:"Cuando un experimento muestra la experiencia original antes de la variante, el daño es más que visual. Cambia el comportamiento y la validez de lo que medimos.",read:"Leer la nota",quote:"No todo lo que merece publicarse comienza como un caso de estudio.",quote2:"Algunas ideas empiezan como un bug, un test fallido, una rareza del navegador o una pregunta que no pude abandonar.",follow:"Sigue la madriguera.",follow2:"Notas ocasionales. Sin calendario editorial. Sin trucos de growth.",email:"Dirección de email",send:"Recibir nuevas notas",rss:"Feed RSS",compare:"¿Comparamos notas?",start:"Iniciar una conversación",base:"Desde España　·　CET　·　Español + Inglés"}
};

export default function WritingPage({locale,articles}:{locale:"en"|"es";articles:ArticleMeta[]}){const t=C[locale];return <main className="writing-page" lang={locale}>
  <section className="writing-hero"><SiteNav locale={locale} current="writing"/>
    <div className="writing-hero-grid shell"><div><p className="writing-label">{t.label}</p><h1>{t.h1a}<br/>{t.h1b}<br/><em>{t.h1em}</em></h1><p className="writing-lead">{t.lead}</p><small>{t.by}</small></div><div className="notebook-art" role="img" aria-label={locale === "es" ? "Cuaderno editorial con wireframes, código y una comparación A/B" : "Editorial notebook with wireframes, code and an A/B comparison"}>
      <span className="notebook-layer notebook-halo" aria-hidden="true"/>
      <span className="notebook-layer notebook-blueprint" aria-hidden="true"/>
      <Image className="writing-art-editorial" src="/assets/writing-hero/editorial-notebook-v2.webp" alt="" aria-hidden="true" width={1392} height={830} priority unoptimized sizes="(max-width: 760px) 100vw, 52vw"/>
      <span className="notebook-layer notebook-orbit" aria-hidden="true"/>
      <Image className="notebook-layer notebook-cursor" src="/assets/writing-hero/cursor-accent.svg" alt="" aria-hidden="true" width={130} height={175} unoptimized/>
    </div></div>
  </section>
  <section className="writing-body"><div className="shell"><WritingIndex locale={locale} articles={articles}/></div>
  </section>
  <section className="newsletter"><div className="shell"><div><h2>{t.follow}</h2><p>{t.follow2}</p></div><form action={mailchimpAction} method="post" target="_blank"><div><input type="email" name="EMAIL" id={`newsletter-email-${locale}`} placeholder={t.email} aria-label={t.email} autoComplete="email" required/><button type="submit" name="subscribe">{t.send}</button></div><div className="newsletter-honeypot" aria-hidden="true"><input type="text" name="b_a0e13242fe65e96acc0169bef_b6eb284256" tabIndex={-1} defaultValue="" autoComplete="off"/></div><a href="/rss.xml">{t.rss} ↗</a></form><div className="newsletter-art"><i/><b>≋</b></div></div></section>
  <section className="writing-contact"><div className="shell"><h2>{t.compare}</h2><a className="btn btn-light" href="mailto:josuesomarribasb@gmail.com">{t.start} ↗</a><CopyEmailButton label={locale === "es" ? "Copiar email" : "Copy email"} copiedLabel={locale === "es" ? "Copiado" : "Copied"}/><p>{t.base}</p></div></section>
  <SiteFooter locale={locale} current="writing"/>
  </main>}
