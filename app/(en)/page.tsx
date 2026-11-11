import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import CopyEmailButton from "../../components/CopyEmailButton";
import ExperienceDuration from "../../components/ExperienceDuration";
import HomeProducts from "../../components/HomeProducts";
import HomeClientWork from "../../components/HomeClientWork";
import HomeExperimentPanel from "../../components/HomeExperimentPanel";
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
  const steps=es?[
    ["Observar","Partir del comportamiento y las señales de fricción."],
    ["Enmarcar","Convertir la observación en una decisión comprobable."],
    ["Prototipar","Preparar variantes accesibles y una interfaz coherente."],
    ["Instrumentar y publicar","Implementar eventos, revisar el comportamiento y publicar."],
    ["Aprender","Revisar resultados, segmentos y métricas de protección."],
  ]:[
    ["Observe","Start with user behaviour and evidence of friction."],
    ["Frame","Turn the observation into a testable decision."],
    ["Prototype","Prepare accessible variants and a coherent UI."],
    ["Instrument & ship","Implement events, check behaviour and deploy."],
    ["Learn","Review results, segments and guardrail metrics."],
  ];
  return <div className={styles.page}>
    <a className={styles.skip} href="#main">{es?"Saltar al contenido":"Skip to content"}</a>
    <header className={styles.header}><SiteNav locale={locale}/></header>
    <main id="main">
      <section className={styles.hero} aria-labelledby="home-title"><div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Josue Somarribas / {es?"Ingeniero UX y desarrollador CRO":"UX Engineer & CRO Developer"}</p>
          <h1 id="home-title">{es?"Diseño la experiencia.":"I design the experience."}<br/><em>{es?"Y la construyo.":"Then I build it."}</em></h1>
          <p className={styles.lead}>{es?"Investigación, diseño de interfaces, front-end de producción y experimentación. Conecto las decisiones de producto con el código que las hace posibles.":"Research, interface design, production front-end and experimentation. I work where product decisions become code."}</p>
          <div className={styles.actions}><a className="btn btn-red" href="#work">{es?"Ver proyectos":"Explore my work"} <span aria-hidden="true">↗</span></a><a className="btn btn-outline" href="mailto:josuesomarribasb@gmail.com">{es?"Cuéntame tu proyecto":"Discuss a project"} <span aria-hidden="true">↗</span></a></div>
          <p className={styles.heroMeta}>{es?"Desde España · Trabajo globalmente":"Based in Spain · Working globally"} · <ExperienceDuration locale={locale}/></p>
        </div>
        <HomeExperimentPanel locale={locale}/>
      </div></section>
      <section className={styles.disciplines} aria-label={es?"Áreas de trabajo":"Core disciplines"}><div className={`${styles.wrap} ${styles.disciplineGrid}`}>{disciplines.map(([title,description])=><div key={title}><h2>{title}</h2><p>{description}</p></div>)}</div></section>
      <HomeClientWork locale={locale}/>
      <HomeProducts locale={locale}/>
      <section className={styles.methodSection} id="process" aria-labelledby="method-title"><div className={`${styles.wrap} ${styles.methodGrid}`}>
        <div><p className={styles.kicker}>{es?"03 / Cómo trabajo":"03 / How I work"}</p><h2 id="method-title">{es?"De la hipótesis a producción.":"From hypothesis to production."}</h2><p className={styles.methodLead}>{es?"Construyo la variante, preparo la instrumentación y reviso el comportamiento en QA y UAT antes de publicar.":"I build the variant, prepare the tracking and check behaviour in QA and UAT before release."}</p>
          <dl className={styles.experienceGrid}><div><dt>{es?"Experimentación":"Testing platforms"}</dt><dd>Adobe Target</dd></div><div><dt>{es?"Experimentación":"Testing platforms"}</dt><dd>Monetate</dd></div><div><dt>{es?"Entrega":"Delivery"}</dt><dd>{es?"QA · UAT · Producción":"QA · UAT · Production"}</dd></div><div><dt>{es?"Práctica":"Practice"}</dt><dd>{es?"Analítica · Front-end":"Analytics · Front-end"}</dd></div></dl>
          <a className={styles.textLink} href="/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf" target="_blank" rel="noreferrer">{es?"Ver experiencia en el CV":"View experience in my résumé"} <span aria-hidden="true">↗</span></a>
        </div>
        <ol className={styles.methodSteps}>{steps.map(([title,description],index)=><li key={title}><span className={styles.stepNumber}>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </div></section>
      <section className={styles.writingSection} id="journal" aria-labelledby="writing-title"><div className={styles.wrap}>
        <header className={styles.sectionIntro}><div><p className={styles.kicker}>{es?"04 / Artículos":"04 / Writing"}</p><h2 id="writing-title">{es?"Notas desde el trabajo.":"Notes from the work."}</h2></div><a className={styles.textLink} href={blogPath}>{es?"Todos los artículos":"All articles"} <span aria-hidden="true">↗</span></a></header>
        <div className={styles.articleList}>{latestArticles.map(article=><a className={styles.articleRow} href={`${blogPath}/${article.slug}`} key={article.slug}><time dateTime={article.date}>{new Intl.DateTimeFormat(es?"es-ES":"en-GB",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(article.date))}</time><div><h3>{article.title}</h3><p>{article.description}</p></div><span className={styles.articleArrow} aria-hidden="true">↗</span></a>)}</div>
        <figure className={styles.quote}><blockquote>{es?"Josue conecta las decisiones de diseño y las limitaciones de producción de forma excepcional.":"Josue bridges design decisions and production constraints exceptionally well."}</blockquote><figcaption>{es?"Colaborador de producto · Proyecto enterprise":"Product collaborator · Enterprise project"} · <a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer">{es?"Leer recomendaciones":"Read recommendations"} <span aria-hidden="true">↗</span></a></figcaption></figure>
      </div></section>
      <section className={styles.contact} id="contact"><div className={styles.wrap}><p className={styles.eyebrow}>{es?"Disponible para conversar":"Available for a conversation"}</p><h2>{es?<>¿Tienes un problema<br/>de producto que se resiste?</>:<>Have a stubborn<br/>product problem?</>}</h2><p>{es?"Envíame la versión desordenada. No hace falta una presentación.":"Send me the messy version. No pitch deck required."}</p><div className={styles.actions}><a className="btn btn-light" href="mailto:josuesomarribasb@gmail.com">{es?"Iniciar una conversación":"Start a conversation"} <span aria-hidden="true">↗</span></a><CopyEmailButton label={es?"Copiar email":"Copy email"} copiedLabel={es?"Copiado":"Copied"}/></div><p className={styles.contactMeta}>{es?"Desde España · CET · Español + Inglés":"Based in Spain · CET · English + Spanish"}</p></div></section>
    </main>
    <SiteFooter locale={locale}/>
  </div>;
}
