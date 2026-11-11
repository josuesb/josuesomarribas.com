import ContactArtwork3D from "../../components/ContactArtwork3D";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import CopyEmailButton from "../../components/CopyEmailButton";
import Image from "next/image";
import ExperienceDuration from "../../components/ExperienceDuration";
import { getAllArticles } from "../../lib/content";
import CroExperienceSection from "../../components/CroExperienceSection";
import HeroExperimentArtwork from "../../components/HeroExperimentArtwork";


export const dynamic = "force-static";

const CapabilityIcon = ({ type }: { type: "research" | "experiment" | "code" | "analytics" }) => {
  const paths = {
    research: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></>,
    experiment: <><path d="M9 3h6M10 3v5l-4.5 8.2A2 2 0 0 0 7.3 19h9.4a2 2 0 0 0 1.8-2.8L14 8V3"/><path d="M8 14h8"/></>,
    code: <><path d="m8.5 6-5 6 5 6M15.5 6l5 6-5 6M14 3l-4 18"/></>,
    analytics: <><path d="M4 19V9M10 19V5M16 19v-8M22 19H2"/><path d="m4 12 6-5 6 3 5-6"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
};

export default function Home({ locale="en" }:{ locale?:"en"|"es" } = {}) {
  const latestArticles = getAllArticles({ locale }).slice(0, 3);
  const blogPath = locale === "es" ? "/es/blog" : "/blog";
  const formatDate = (date:string) => new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", { day:"2-digit", month:"short", year:"numeric" }).format(new Date(date));
  return (
    <main>
      <section className="hero" id="about">
        <SiteNav locale={locale}/>

        <div className="hero-grid shell" id="top">
          <div className="hero-copy">
            <div className="hero-identity"><p className="name">Josue Somarribas</p><p className="eyebrow">UX ENGINEER × CRO DEVELOPER</p></div>
            <h1>I turn hesitation into<br /><em>experiences that ship.</em></h1>
            <p className="lead">Research, interface design, front-end implementation and experimentation—from signal to measurable outcome.</p>
            <div className="actions">
              <a className="btn btn-red" href="#work">View selected work </a>
              <a className="btn btn-outline" href="mailto:josuesomarribasb@gmail.com">Discuss a project </a>
            </div>
          </div>

          <HeroExperimentArtwork locale={locale} />
        </div>
        <p className="meta shell"><i aria-hidden="true" /><ExperienceDuration locale={locale}/> <b>·</b> {locale === "es" ? "España" : "Spain"} <b>·</b> {locale === "es" ? "Trabajo globalmente" : "Working globally"}</p>
      </section>

      <section className="capabilities">
        <div className="shell capability-grid">
          {[
            ['research','User research','Uncover real user needs with clear, actionable insights.'],
            ['experiment','Experiment design','Turn signals into hypotheses, test quickly and learn what matters.'],
            ['code','Production front-end','Build accessible, performant interfaces ready to ship and scale.'],
            ['analytics','Analytics & QA','Instrument clean events, validate releases and protect the learning.']
          ].map(([icon,title,text],i)=><article key={title} className={`cap cap-${i}`}><span className="cap-icon"><CapabilityIcon type={icon as "research"|"experiment"|"code"|"analytics"}/></span><div><h2>{title}</h2><p>{text}</p></div></article>)}
        </div>
      </section>

      <CroExperienceSection locale={locale}/>

      <section className="work-section" id="work">
        <div className="shell">
          <h2>Selected work</h2>
          <p className="section-intro">Different problems. Different roles. The same obsession with clarity.</p>
          <div className="projects">
            <article className="project project-blue">
              <header><span className="number">01</span><small>PUBLIC-INTEREST CAMPAIGN · WEB DEVELOPMENT</small></header>
              <h3>What You Carry</h3><p>An immersive bilingual campaign exposing the hidden cost of wildlife trafficking in Costa Rica.</p>
              <div className="project-preview-frame"><Image className="project-preview-image project-preview-wyc" src="/assets/project-previews/what-you-carry.webp" alt="What You Carry wildlife conservation campaign homepage" fill sizes="(max-width: 700px) 100vw, 50vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Web development</dd></div><div><dt>Location:</dt><dd>Costa Rica</dd></div><div><dt>Focus:</dt><dd>Storytelling · Conservation</dd></div></dl>
              <a className="btn btn-red" href="https://whatyoucarrycr.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="What You Carry">Visit live site </a>
            </article>
            <article className="project project-cream">
              <header><span className="number">02</span><small>CLIENT WORK · CREATIVE WEB DEVELOPMENT</small></header>
              <h3>Andrés Tenor</h3><p>A distinctive artist website for opera and bolero tenor Andrés Rodríguez, based in Barcelona.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/andres-tenor.webp" alt="Andrés Rodríguez tenor website homepage" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Location:</dt><dd>Barcelona · Europe</dd></div><div><dt>Focus:</dt><dd>Artist identity · Performance</dd></div></dl>
              <a className="btn btn-red" href="https://andrestenor.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="Andrés Tenor">Visit live site </a>
            </article>
            <article className="project project-cream">
              <header><span className="number">03</span><small>CLIENT WORK · WEB DESIGN + DEVELOPMENT</small></header>
              <h3>Rofka Projects</h3><p>A digital presence for a Costa Rican construction company—from planning and design to finished spaces.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/rofka-projects.webp" alt="Rofka Projects homepage featuring its construction portfolio" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Platform:</dt><dd>Framer</dd></div><div><dt>Focus:</dt><dd>Brand presence · Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="https://rofkaproyectos.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="Rofka Projects">Visit live site </a>
            </article>
            <article className="project project-cream">
              <header><span className="number">04</span><small>CLIENT WORK · WEB DEVELOPMENT</small></header>
              <h3>PitchCR</h3><p>A digital home for Costa Rica&apos;s startup and pitch community.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/pitchcr.webp" alt="Current homepage displayed at pitchcr.com" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Design implementation</dd></div><div><dt>Platform:</dt><dd>Squarespace</dd></div><div><dt>Focus:</dt><dd>Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="https://www.pitchcr.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="PitchCR">Visit live site </a>
            </article>
          </div>

          <div className="more-work-heading"><p>Products & experiments</p><span>Independent tools built to test ideas, behavior and clarity.</span></div>
          <div className="more-projects">
            <article className="project project-cream project-secondary">
              <header><span className="number">05</span><small>INDEPENDENT PRODUCT · RESEARCH + FRONT-END</small></header>
              <h3>5 Seconds Tester</h3><p>A live tool for testing whether a value proposition is understood in five seconds.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/5-seconds-tester.webp" alt="5 Seconds Tester upload and test interface" fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized /></div>
              <div className="tags"><span>Live product</span><span>Built end-to-end</span><span>Research workflow</span></div>
              <div className="card-actions"><a className="btn btn-red" href="https://www.fivesecondtester.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="5 Seconds Tester">Try the tool </a><a href="#process">See how I work </a></div>
            </article>
            <article className="project project-blue project-secondary">
              <header><span className="number">06</span><small>EXPERIMENT · UX ENGINEERING</small></header>
              <h3>Font Tester</h3><p>A browser-based experiment exploring how typography changes perception and trust.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/font-tester.webp" alt="Font Tester typography controls and live preview" fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized /></div>
              <div className="tags"><span>Interactive prototype</span><span>Behavioral comparison</span><span>Front-end build</span></div>
              <a className="bottom-link" href="https://fonts.josuesomarribas.com/?color=%23111111&amp;bgColor=%23ffffff" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="Font Tester">Explore prototype </a>
            </article>
            <article className="project project-cream project-secondary">
              <header><span className="number">07</span><small>INDEPENDENT PRODUCT · RESEARCH + FRONT-END</small></header>
              <h3>Sitemap Explorer</h3><p>{locale === "es" ? "Una herramienta visual para explorar la estructura de un sitio web a partir de sus sitemaps." : "A visual tool for exploring a website’s structure from its sitemaps."}</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/sitemap-explorer.webp" alt={locale === "es" ? "Interfaz de Sitemap Explorer con un mapa de carpetas e idiomas" : "Sitemap Explorer interface showing a map of folders and languages"} fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized /></div>
              <div className="tags"><span>Live product</span><span>Built end-to-end</span><span>{locale === "es" ? "Arquitectura de información" : "Information architecture"}</span></div>
              <div className="card-actions"><a className="btn btn-red" href="https://sitemap.josuesomarribas.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="Sitemap Explorer">{locale === "es" ? "Prueba la herramienta" : "Try the tool"} </a><a href={`${locale === "es" ? "/es" : ""}/blog/sitemap-explorer-visual-website-map`}>{locale === "es" ? "Lee el artículo" : "Read the article"} </a></div>
            </article>
            <article className="project project-cream project-secondary">
              <header><span className="number">08</span><small>{locale === "es" ? "PRODUCTO INDEPENDIENTE · DISEÑO + DESARROLLO" : "INDEPENDENT PRODUCT · DESIGN + DEVELOPMENT"}</small></header>
              <h3>Comparte el Momento</h3><p>{locale === "es" ? "Un gestor de invitaciones digitales para compartir y organizar momentos especiales." : "A digital invitation manager for sharing and organizing special moments."}</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/comparte-el-momento.webp" alt={locale === "es" ? "Invitación de boda de Comparte el Momento con los nombres y la fotografía de la pareja" : "Comparte el Momento wedding invitation featuring the couple’s names and photograph"} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized /></div>
              <div className="tags"><span>Live product</span><span>{locale === "es" ? "Invitaciones digitales" : "Digital invitations"}</span><span>{locale === "es" ? "Gestión de eventos" : "Event management"}</span></div>
              <a className="btn btn-red" href="https://www.comparteelmomento.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="Comparte el Momento">Visit live site </a>
            </article>
            <article className="project project-cream project-secondary">
              <header><span className="number">09</span><small>{locale === "es" ? "PRODUCTO INDEPENDIENTE · ANALÍTICA + CRO" : "INDEPENDENT PRODUCT · ANALYTICS + CRO"}</small></header>
              <h3>UTM Builder &amp; Validator</h3><p>{locale === "es" ? "Una herramienta para crear enlaces UTM y detectar errores de seguimiento antes de lanzar una campaña." : "A tool for building UTM links and catching tracking errors before launching a campaign."}</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/utm-builder.webp" alt={locale === "es" ? "Generador y validador de UTMs con campos de URL, fuente, medio y campaña" : "UTM builder and validator with URL, source, medium and campaign fields"} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized /></div>
              <div className="tags"><span>Live product</span><span>{locale === "es" ? "Seguimiento de campañas" : "Campaign tracking"}</span><span>{locale === "es" ? "Validación de UTMs" : "UTM validation"}</span></div>
              <a className="btn btn-red" href="https://utm.josuesomarribas.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="UTM Builder & Validator">Try the tool </a>
            </article>
            <article className="project project-blue project-secondary">
              <header><span className="number">10</span><small>{locale === "es" ? "PRODUCTO INDEPENDIENTE · AUTOMATIZACIÓN" : "INDEPENDENT PRODUCT · AUTOMATION"}</small></header>
              <h3>URL Concat Tool</h3><p>{locale === "es" ? "Genera URLs en lote combinando una plantilla con los datos de un archivo Excel o CSV." : "Generate URLs in bulk by combining a template with data from an Excel or CSV file."}</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/url-concat-tool.webp" alt={locale === "es" ? "URL Concat Tool con una plantilla de URL y carga de archivos Excel o CSV" : "URL Concat Tool with a URL template and Excel or CSV file upload"} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized /></div>
              <div className="tags"><span>Live product</span><span>Excel / CSV</span><span>{locale === "es" ? "Generación de URLs" : "Bulk URL generation"}</span></div>
              <a className="btn btn-red" href="https://concat.josuesomarribas.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="URL Concat Tool">Try the tool </a>
            </article>
            <article className="project project-cream project-secondary">
              <header><span className="number">11</span><small>{locale === "es" ? "PRODUCTO INDEPENDIENTE · IA + ANALÍTICA" : "INDEPENDENT PRODUCT · AI + ANALYTICS"}</small></header>
              <h3>AI Visibility Benchmark</h3><p>{locale === "es" ? "Explora cómo los asistentes de IA mencionan, recomiendan y citan una marca, con una demo de datos simulados." : "Explore how AI assistants mention, recommend and cite a brand, with a demo using simulated data."}</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/ai-visibility-benchmark.webp" alt={locale === "es" ? "Demo de AI Visibility Benchmark con métricas de descubrimiento, recomendación y citas oficiales" : "AI Visibility Benchmark demo showing discovery, recommendation and official citation metrics"} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized /></div>
              <div className="tags"><span>{locale === "es" ? "Demo interactiva" : "Interactive demo"}</span><span>{locale === "es" ? "Visibilidad en IA" : "AI visibility"}</span><span>{locale === "es" ? "Análisis de marca" : "Brand analysis"}</span></div>
              <div className="card-actions"><a className="btn btn-red" href="https://bench.josuesomarribas.com/demo" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="AI Visibility Benchmark">{locale === "es" ? "Explorar demo " : "Explore demo "}</a><a href={`${locale === "es" ? "/es" : ""}/blog/ai-visibility-benchmark-brand-presence`}>{locale === "es" ? "Lee el artículo" : "Read the article"} </a></div>
            </article>
            <article className="project project-blue project-secondary">
              <header><span className="number">12</span><small>{locale === "es" ? "PRODUCTO INDEPENDIENTE · EXPERIMENTACIÓN + CRO" : "INDEPENDENT PRODUCT · EXPERIMENTATION + CRO"}</small></header>
              <h3>CRO Lab · {locale === "es" ? "Calculadora A/B" : "A/B Calculator"}</h3><p>{locale === "es" ? "Compara los resultados de tus tests A/B importando informes CSV de GA4 o introduciendo los datos manualmente." : "Compare A/B test results by importing GA4 CSV reports or entering data manually."}</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/cro-lab.png" alt={locale === "es" ? "Calculadora A/B de CRO Lab con importación de informes CSV de GA4" : "CRO Lab A/B Calculator with GA4 CSV report import"} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized /></div>
              <div className="tags"><span>Live product</span><span>A/B testing</span><span>GA4 / CSV</span></div>
              <a className="btn btn-red" href="https://ab.josuesomarribas.com/" target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label="CRO Lab">Try the tool </a>
            </article>
            <article className="project project-cream project-secondary">
              <header><span className="number">13</span><small>{locale === "es" ? "PRODUCTO INDEPENDIENTE · EXTENSIÓN PARA CHROME" : "INDEPENDENT PRODUCT · CHROME EXTENSION"}</small></header>
              <h3>Jira Tools</h3><p>{locale === "es" ? "Copia y organiza tickets de Jira con plantillas, bandeja e historial local. Abre cualquier ticket por ID con Spotlight." : "Copy and organize Jira tickets with templates, a tray and local history. Open any ticket by ID with Spotlight."}</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/jira-tools/04-bandeja-e-informes-1280x800.png" alt={locale === "es" ? "Bandeja de Jira Tools con tickets y una actualización agrupada por estado" : "Jira Tools tray with tickets and an update grouped by status"} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" unoptimized /></div>
              <div className="tags"><span>{locale === "es" ? "En revisión en Chrome Web Store" : "Under review in Chrome Web Store"}</span><span>Spotlight</span><span>{locale === "es" ? "Datos locales" : "Local data"}</span></div>
              <a className="btn btn-red" href="/jira-tools" data-analytics-event="project_click" data-analytics-label="Jira Tools">{locale === "es" ? "Descubrir Jira Tools" : "Discover Jira Tools"} </a>
            </article>
          </div>

        </div>
      </section>

      <section className="home-journal" id="journal">
        <div className="shell">
          <header className="home-journal-head">
            <div><p>{locale === "es" ? "NOTAS DESDE EL TRABAJO" : "NOTES FROM THE WORK"}</p><h2>{locale === "es" ? "Ideas que vale la pena conservar." : "Ideas worth keeping."}</h2></div>
            <a href={blogPath}>{locale === "es" ? "Ver todos los artículos" : "Read all articles"} </a>
          </header>
          <div className="home-journal-grid">
            {latestArticles.map((article,index) => <article className="home-journal-card" key={article.slug}>
              <a className="home-journal-cover" href={`${blogPath}/${article.slug}`} aria-label={article.title} data-index={String(index + 1).padStart(2,"0")}>
                {article.image && <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized />}
              </a>
              <div className="home-journal-copy"><p><span>{article.type}</span><time dateTime={article.date}>{formatDate(article.date)}</time></p><h3><a href={`${blogPath}/${article.slug}`}>{article.title}</a></h3><p>{article.description}</p><a href={`${blogPath}/${article.slug}`}>{locale === "es" ? "Leer artículo" : "Read article"} </a></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell">
          <h2>From signal to shipped experiment</h2>
          <p className="process-intro">How I bridge design decisions and production constraints.</p>
          <div className="process-grid">
            <article><div className="process-panel"><header><b>01</b><span>Observe</span></header><Image src="/assets/process/01-observe.svg" alt="Heatmap showing low attention on a primary action" width={240} height={140}/></div><div className="process-copy"><h3>Observe</h3><p>Heatmap shows low engagement on primary CTA above the fold.</p></div></article>
            <article><div className="process-panel"><header><b>02</b><span>Frame</span></header><Image src="/assets/process/02-frame.svg" alt="A question reframed as a testable decision" width={240} height={140}/></div><div className="process-copy"><h3>Frame</h3><p><strong>Hypothesis:</strong> Clarifying the CTA label will increase clicks.</p><p><strong>Decision:</strong> Test clearer, benefit-led CTA copy.</p></div></article>
            <article><div className="process-panel"><header><b>03</b><span>Prototype</span></header><Image src="/assets/process/03-prototype.svg" alt="Accessible A and B component variants" width={240} height={140}/></div><div className="process-copy"><h3>Prototype</h3><p>Accessible component variants for A/B test. WCAG AA · Keyboard focus visible.</p></div></article>
            <article><div className="process-panel"><header><b>04</b><span>Instrument</span></header><Image src="/assets/process/04-instrument.svg" alt="Event tracking code for the CTA experiment" width={240} height={140}/></div><div className="process-copy"><h3>Instrument & ship</h3><p>Track event and ship behind experiment flag. Analytics event in place before ship.</p></div></article>
            <article><div className="process-panel"><header><b>05</b><span>Learn</span></header><Image src="/assets/process/05-learn.svg" alt="Experiment quality assurance checklist" width={240} height={140}/></div><div className="process-copy"><h3>Learn</h3><p>Analyze behavior by variant and segment. Decide what to keep, iterate or drop.</p></div></article>
          </div>
          <section className="process-quote" id="writing"><span aria-hidden="true">“</span><blockquote>Josue bridges design decisions and<br />production constraints exceptionally well.<cite>Product collaborator · Enterprise project</cite></blockquote><a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer">Read 14 recommendations </a></section>
        </div>
      </section>

      <section className="contact"><ContactArtwork3D /><div className="shell contact-grid"><div><h2>Have a stubborn<br />product problem?</h2><p>Send me the messy version. No pitch deck required.</p></div><div><div className="actions"><a className="btn btn-light" href="mailto:josuesomarribasb@gmail.com">Start a conversation </a><CopyEmailButton label={locale === "es" ? "Copiar email" : "Copy email"} copiedLabel={locale === "es" ? "Copiado" : "Copied"}/></div><p>Based in Spain · CET · English + Spanish</p></div></div></section>
      <div id="footer"><SiteFooter locale={locale}/></div>
    </main>
  );
}
