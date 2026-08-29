import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import CopyEmailButton from "../../components/CopyEmailButton";
import Image from "next/image";
import type { CSSProperties } from "react";
import { getAllArticles } from "../../lib/content";

const Arrow = () => <span aria-hidden="true">↗</span>;

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

const ExperimentArtwork = () => (
  <div className="hero-signal-flow" role="img" aria-label="Experiment workflow from signal to measurable result">
    <div className="hero-flow-line" aria-hidden="true" />
    {[
      { label:"SIGNAL", number:"01", className:"flow-signal", content:<><small>Conversion rate</small><strong>+18.7%</strong><span className="flow-chart"><i/><i/><i/><i/><i/></span></> },
      { label:"HYPOTHESIS", number:"02", className:"flow-hypothesis", content:<p>If we <b>reduce friction</b> in the pricing section, more users will complete the upgrade.</p> },
      { label:"BUILD", number:"03", className:"flow-build", content:<code><span><b>const</b> test = {'{'}</span><span>&nbsp;&nbsp;variant: <i>&apos;B&apos;</i>,</span><span>&nbsp;&nbsp;change: <i>&apos;clarity&apos;</i></span><span>{'}'};</span><em>deploy(test);</em></code> },
      { label:"MEASURE", number:"04", className:"flow-measure", content:<><small>Result</small><strong>+18.7%</strong><span>Lift</span><hr/><span>Stat. Sig. <b>99%</b></span></> },
    ].map((step,index)=><section className={`hero-flow-step ${step.className}`} key={step.label} style={{ "--flow-index":index } as CSSProperties}>
      <header><b>{step.label}</b><span>{step.number}</span><i aria-hidden="true" /></header>
      <div>{step.content}</div>
    </section>)}
  </div>
);

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
              <a className="btn btn-red" href="#work">View selected work <span>↓</span></a>
              <a className="btn btn-outline" href="mailto:josuesomarribasb@gmail.com">Discuss a project <Arrow /></a>
            </div>
          </div>

          <ExperimentArtwork />
        </div>
        <p className="meta shell"><i aria-hidden="true" />8+ years <b>·</b> Spain <b>·</b> Working globally</p>
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

      <section className="work-section" id="work">
        <div className="shell">
          <h2>Selected work</h2>
          <p className="section-intro">Different problems. Different roles. The same obsession with clarity.</p>
          <div className="projects">
            <article className="project project-blue">
              <header><span className="number">01</span><small>PUBLIC-INTEREST CAMPAIGN · WEB DEVELOPMENT</small></header>
              <h3>What You Carry</h3><p>An immersive bilingual campaign exposing the hidden cost of wildlife trafficking in Costa Rica.</p>
              <div className="project-preview-frame"><Image className="project-preview-image project-preview-wyc" src="/assets/project-previews/what-you-carry.png" alt="What You Carry wildlife conservation campaign homepage" fill sizes="(max-width: 700px) 100vw, 50vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Web development</dd></div><div><dt>Location:</dt><dd>Costa Rica</dd></div><div><dt>Focus:</dt><dd>Storytelling · Conservation</dd></div></dl>
              <a className="btn btn-red" href="https://whatyoucarrycr.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
            <article className="project project-cream">
              <header><span className="number">02</span><small>CLIENT WORK · CREATIVE WEB DEVELOPMENT</small></header>
              <h3>Andrés Tenor</h3><p>A distinctive artist website for opera and bolero tenor Andrés Rodríguez, based in Barcelona.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/andres-tenor.png" alt="Andrés Rodríguez tenor website homepage" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Location:</dt><dd>Barcelona · Europe</dd></div><div><dt>Focus:</dt><dd>Artist identity · Performance</dd></div></dl>
              <a className="btn btn-red" href="https://andrestenor.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
            <article className="project project-cream">
              <header><span className="number">03</span><small>CLIENT WORK · WEB DESIGN + DEVELOPMENT</small></header>
              <h3>Rofka Projects</h3><p>A digital presence for a Costa Rican construction company—from planning and design to finished spaces.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/rofka-projects.png" alt="Rofka Projects homepage featuring its construction portfolio" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Platform:</dt><dd>Framer</dd></div><div><dt>Focus:</dt><dd>Brand presence · Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="https://rofkaproyectos.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
            <article className="project project-cream">
              <header><span className="number">04</span><small>CLIENT WORK · WEB DEVELOPMENT</small></header>
              <h3>PitchCR</h3><p>A digital home for Costa Rica&apos;s startup and pitch community.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/pitchcr.png" alt="Current homepage displayed at pitchcr.com" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div>
              <dl><div><dt>Role:</dt><dd>Design implementation</dd></div><div><dt>Platform:</dt><dd>Squarespace</dd></div><div><dt>Focus:</dt><dd>Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="https://www.pitchcr.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
          </div>

          <div className="more-work-heading"><p>Products & experiments</p><span>Independent tools built to test ideas, behavior and clarity.</span></div>
          <div className="more-projects">
            <article className="project project-cream project-secondary">
              <header><span className="number">05</span><small>INDEPENDENT PRODUCT · RESEARCH + FRONT-END</small></header>
              <h3>5 Seconds Tester</h3><p>A live tool for testing whether a value proposition is understood in five seconds.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/5-seconds-tester.png" alt="5 Seconds Tester upload and test interface" fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized /></div>
              <div className="tags"><span>Live product</span><span>Built end-to-end</span><span>Research workflow</span></div>
              <div className="card-actions"><a className="btn btn-red" href="https://www.fivesecondtester.com/" target="_blank" rel="noreferrer">Try the tool <Arrow /></a><a href="#process">See how I work →</a></div>
            </article>
            <article className="project project-blue project-secondary">
              <header><span className="number">06</span><small>EXPERIMENT · UX ENGINEERING</small></header>
              <h3>Font Tester</h3><p>A browser-based experiment exploring how typography changes perception and trust.</p>
              <div className="project-preview-frame"><Image className="project-preview-image" src="/assets/project-previews/font-tester.png" alt="Font Tester typography controls and live preview" fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized /></div>
              <div className="tags"><span>Interactive prototype</span><span>Behavioral comparison</span><span>Front-end build</span></div>
              <a className="bottom-link" href="https://fonts.josuesomarribas.com/?color=%23111111&amp;bgColor=%23ffffff" target="_blank" rel="noreferrer">Explore prototype <Arrow /></a>
            </article>
          </div>

        </div>
      </section>

      <section className="home-journal" id="journal">
        <div className="shell">
          <header className="home-journal-head">
            <div><p>{locale === "es" ? "NOTAS DESDE EL TRABAJO" : "NOTES FROM THE WORK"}</p><h2>{locale === "es" ? "Ideas que vale la pena conservar." : "Ideas worth keeping."}</h2></div>
            <a href={blogPath}>{locale === "es" ? "Ver todos los artículos" : "Read all articles"} <Arrow /></a>
          </header>
          <div className="home-journal-grid">
            {latestArticles.map((article,index) => <article className="home-journal-card" key={article.slug}>
              <a className="home-journal-cover" href={`${blogPath}/${article.slug}`} aria-label={article.title}>
                {article.image && <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized />}
                <span>{String(index + 1).padStart(2,"0")}</span>
              </a>
              <div className="home-journal-copy"><p><span>{article.type}</span><time dateTime={article.date}>{formatDate(article.date)}</time></p><h3><a href={`${blogPath}/${article.slug}`}>{article.title}</a></h3><p>{article.description}</p><a href={`${blogPath}/${article.slug}`}>{locale === "es" ? "Leer artículo" : "Read article"} <Arrow /></a></div>
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
          <section className="process-quote" id="writing"><span aria-hidden="true">“</span><blockquote>Josue bridges design decisions and<br />production constraints exceptionally well.<cite>Product collaborator · Enterprise project</cite></blockquote><a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer">Read 14 recommendations <Arrow /></a></section>
        </div>
      </section>

      <section className="contact"><div className="contact-art" aria-hidden="true"><Image className="contact-sun" src="/assets/global/sol-rojo-texturizado.svg" alt="" width={1024} height={1024} /><Image className="contact-waves" src="/assets/global/ondas-blancas-3-lineas.svg" alt="" width={1400} height={360} /></div><div className="shell contact-grid"><div><h2>Have a stubborn<br />product problem?</h2><p>Send me the messy version. No pitch deck required.</p></div><div><div className="actions"><a className="btn btn-light" href="mailto:josuesomarribasb@gmail.com">Start a conversation <Arrow /></a><CopyEmailButton label={locale === "es" ? "Copiar email" : "Copy email"} copiedLabel={locale === "es" ? "Copiado" : "Copied"}/></div><p>Based in Spain · CET · English + Spanish</p></div></div></section>
      <div id="footer"><SiteFooter locale={locale}/></div>
    </main>
  );
}
