import WritingIndex from "./WritingIndex";
import type { ArticleMeta } from "../../lib/content";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import Image from "next/image";

const writingArtwork = ["01-libro-base", "02-pagina-codigo", "03-pagina-notas", "04-marcador-rojo", "05-cursor"];

const C={
  en:{work:"Work",experiments:"Experiments",writing:"Writing",about:"About",resume:"Résumé",talk:"Let's talk",label:"WRITING · NOTES FROM THE WORK",h1a:"Things I’m learning,",h1b:"building and",h1em:"questioning.",lead:"Field notes on UX, experimentation, front-end craft and the messy thinking behind better digital products.",by:"Written by Josue Somarribas　·　Costa Rica → Spain",featured:"FEATURED NOTE",title:"The Cost of FOUC: How Flicker Kills A/B Test Validity",desc:"When an experiment flashes the original experience before the variant, the damage is more than visual. It changes behavior—and the validity of what you measure.",read:"Read the note",quote:"Not everything worth publishing begins as a case study.",quote2:"Some ideas start as a bug, a failed test, a browser quirk or a question I couldn’t leave alone.",follow:"Follow the rabbit hole.",follow2:"Occasional notes. No content calendar. No growth-hack theatre.",email:"Email address",send:"Send me new notes",rss:"RSS feed",compare:"Want to compare notes?",start:"Start a conversation",base:"Based in Spain　·　CET　·　English + Spanish"},
  es:{work:"Proyectos",experiments:"Experimentos",writing:"Artículos",about:"Sobre mí",resume:"Currículum",talk:"Hablemos",label:"ARTÍCULOS · NOTAS DESDE EL TRABAJO",h1a:"Cosas que estoy aprendiendo,",h1b:"construyendo y",h1em:"cuestionando.",lead:"Notas sobre UX, experimentación, desarrollo front-end y las ideas desordenadas que hay detrás de mejores productos digitales.",by:"Escrito por Josue Somarribas　·　Costa Rica → España",featured:"NOTA DESTACADA",title:"El coste del FOUC: cómo el parpadeo invalida un test A/B",desc:"Cuando un experimento muestra la experiencia original antes de la variante, el daño es más que visual. Cambia el comportamiento y la validez de lo que medimos.",read:"Leer la nota",quote:"No todo lo que merece publicarse comienza como un caso de estudio.",quote2:"Algunas ideas empiezan como un bug, un test fallido, una rareza del navegador o una pregunta que no pude abandonar.",follow:"Sigue la madriguera.",follow2:"Notas ocasionales. Sin calendario editorial. Sin trucos de growth.",email:"Dirección de email",send:"Envíame nuevas notas",rss:"Feed RSS",compare:"¿Comparamos notas?",start:"Iniciar una conversación",base:"Desde España　·　CET　·　Español + Inglés"}
};

export default function WritingPage({locale,articles}:{locale:"en"|"es";articles:ArticleMeta[]}){const t=C[locale];return <main className="writing-page" lang={locale}>
  <section className="writing-hero"><SiteNav locale={locale} current="writing"/>
    <div className="writing-hero-grid shell"><div><p className="writing-label">{t.label}</p><h1>{t.h1a}<br/>{t.h1b}<br/><em>{t.h1em}</em></h1><p className="writing-lead">{t.lead}</p><small>{t.by}</small></div><div className="notebook-art" role="img" aria-label="Open notebook with code and experiment notes"><Image className="writing-decor writing-sun-asset" src="/assets/global/sol-rojo-texturizado.svg" alt="" aria-hidden="true" width={1024} height={1024}/><Image className="writing-decor writing-waves-asset" src="/assets/global/ondas-marfil-3-lineas.svg" alt="" aria-hidden="true" width={1400} height={360}/>{writingArtwork.map((file,index)=><Image key={file} className={`writing-art-layer writing-art-${index+1}`} src={`/assets/writing-hero/${file}.png`} alt="" aria-hidden="true" width={3600} height={2200} priority={index<2}/>)}</div></div>
  </section>
  <section className="writing-body"><div className="shell"><WritingIndex locale={locale} articles={articles}/></div>
  </section>
  <section className="writing-quote"><div className="shell"><b>“</b><h2>{t.quote}</h2><p>{t.quote2}</p><i>⟶</i></div></section>
  <section className="newsletter"><div className="shell"><div><h2>{t.follow}</h2><p>{t.follow2}</p></div><form><div><input type="email" placeholder={t.email} aria-label={t.email}/><button type="submit">{t.send}</button></div><a href="/rss.xml">{t.rss} ↗</a></form><div className="newsletter-art"><i/><b>≋</b></div></div></section>
  <section className="writing-contact"><div className="shell"><h2>{t.compare}</h2><a className="btn btn-light" href="mailto:hello@josuesomarribas.com">{t.start} ↗</a><button className="btn btn-outline">✉ Copy email</button><p>{t.base}</p></div></section>
  <SiteFooter locale={locale} current="writing"/>
  </main>}
