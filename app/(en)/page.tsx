import { ButtonLink, TextLink } from "../../components/ui/Action";
import SiteFooter from "../../components/SiteFooter";
import CopyEmailButton from "../../components/CopyEmailButton";
import ExperienceDuration from "../../components/ExperienceDuration";
import HomeProducts from "../../components/HomeProducts";
import HomeClientWork from "../../components/HomeClientWork";
import HeroExperimentArtwork from "../../components/HeroExperimentArtwork";
import CroExperienceSection from "../../components/CroExperienceSection";
import ContactArtwork3D from "../../components/ContactArtwork3D";
import {getAllArticles} from "../../lib/content";
import styles from "../home.module.css";

export const dynamic = "force-static";

export default function Home({locale="en"}:{locale?:"en"|"es"} = {}) {
  const es=locale==="es";
  const latestArticles=getAllArticles({locale}).slice(0,3);
  const blogPath=es?"/es/blog":"/blog";
  const disciplines=es?[
    ["Investigación de usuarios","Identificar qué se interpone en el recorrido."],
    ["Diseño de experimentos","Convertir señales en decisiones comprobables."],
    ["Front-end de producción","Construir interfaces listas para publicar."],
    ["Analítica y QA","Proteger el lanzamiento y el aprendizaje."],
  ]:[
    ["User research","Identify what gets in the way."],
    ["Experiment design","Turn signals into testable decisions."],
    ["Production front-end","Build interfaces ready to ship."],
    ["Analytics & QA","Protect the release and the learning."],
  ];
  return <div className={styles.page}>
    <a className={styles.skip} href="#main">{es?"Saltar al contenido":"Skip to content"}</a>
    
    <main id="main">
      <section className={styles.hero} aria-labelledby="home-title"><div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Josue Somarribas / {es?"Ingeniero UX y desarrollador CRO":"UX Engineer & CRO Developer"}</p>
          <h1 id="home-title">{es?"Diseño la experiencia.":"I design the experience."}<br/><em>{es?"Y la construyo.":"Then I build it."}</em></h1>
          <p className={styles.lead}>{es?"Investigación, diseño de interfaces, front-end de producción y experimentación. Conecto las decisiones de producto con el código que las hace posibles.":"Research, interface design, production front-end and experimentation. I work where product decisions become code."}</p>
          <div className={styles.actions}><ButtonLink  href="#work">{es?"Ver proyectos":"Explore my work"} </ButtonLink><ButtonLink variant="secondary" href="mailto:josuesomarribasb@gmail.com">{es?"Cuéntame tu proyecto":"Discuss a project"} </ButtonLink></div>
          <p className={styles.heroMeta}>{es?"Desde España · Trabajo globalmente":"Based in Spain · Working globally"} · <ExperienceDuration locale={locale}/></p>
        </div>
        <div className={styles.heroArt}><HeroExperimentArtwork locale={locale}/></div>
      </div></section>
      <section className={styles.disciplines} aria-label={es?"Áreas de trabajo":"Core disciplines"}><div className={`${styles.wrap} ${styles.disciplineGrid}`}>{disciplines.map(([title,description])=><div key={title}><h2>{title}</h2><p>{description}</p></div>)}</div></section>
      <HomeClientWork locale={locale}/>
      <HomeProducts locale={locale}/>
      <div className={styles.delivery} id="process"><CroExperienceSection locale={locale}/></div>
      <section className={styles.writingSection} id="journal" aria-labelledby="writing-title"><div className={styles.wrap}>
        <header className={styles.sectionIntro}><div><p className={styles.kicker}>{es?"04 / Artículos":"04 / Writing"}</p><h2 id="writing-title">{es?"Notas desde el trabajo.":"Notes from the work."}</h2></div><TextLink className={styles.textLink} href={blogPath}>{es?"Todos los artículos":"All articles"} </TextLink></header>
        <div className={styles.articleList}>{latestArticles.map(article=><a className={styles.articleRow} href={`${blogPath}/${article.slug}`} key={article.slug}><time dateTime={article.date}>{new Intl.DateTimeFormat(es?"es-ES":"en-GB",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(article.date))}</time><div><h3>{article.title}</h3><p>{article.description}</p></div></a>)}</div>
        <figure className={styles.quote}><blockquote>{es?"Josue conecta las decisiones de diseño y las limitaciones de producción de forma excepcional.":"Josue bridges design decisions and production constraints exceptionally well."}</blockquote><figcaption>{es?"Colaborador de producto · Proyecto enterprise":"Product collaborator · Enterprise project"} · <a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer">{es?"Leer recomendaciones":"Read recommendations"} </a></figcaption></figure>
      </div></section>
      <section className={`contact ${styles.contactRestored}`} id="contact">
        <ContactArtwork3D/>
        <div className="shell contact-grid">
          <div><h2>{es?<>¿Tienes un problema<br/>de producto que se resiste?</>:<>Have a stubborn<br/>product problem?</>}</h2><p>{es?"Envíame la versión desordenada. No hace falta una presentación.":"Send me the messy version. No pitch deck required."}</p></div>
          <div><div className="actions"><ButtonLink variant="light" href="mailto:josuesomarribasb@gmail.com">{es?"Iniciar una conversación":"Start a conversation"}</ButtonLink><CopyEmailButton label={es?"Copiar email":"Copy email"} copiedLabel={es?"Copiado":"Copied"}/></div><p>{es?"Desde España · CET · Español + Inglés":"Based in Spain · CET · English + Spanish"}</p></div>
        </div>
      </section>
    </main>
    <SiteFooter locale={locale}/>
  </div>;
}
