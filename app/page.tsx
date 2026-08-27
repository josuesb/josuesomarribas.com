import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import CopyEmailButton from "../components/CopyEmailButton";
import Image from "next/image";

const Arrow = () => <span aria-hidden="true">↗</span>;

export const dynamic = "force-static";

const Heatmap = () => (
  <div className="heatmap" aria-label="Illustrative attention heatmap">
    <i /><i /><i /><i />
  </div>
);

const BrowserDots = () => <div className="browser-dots"><i /><i /><i /></div>;

const CapabilityIcon = ({ type }: { type: "research" | "experiment" | "code" | "analytics" }) => {
  const paths = {
    research: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></>,
    experiment: <><path d="M9 3h6M10 3v5l-4.5 8.2A2 2 0 0 0 7.3 19h9.4a2 2 0 0 0 1.8-2.8L14 8V3"/><path d="M8 14h8"/></>,
    code: <><path d="m8.5 6-5 6 5 6M15.5 6l5 6-5 6M14 3l-4 18"/></>,
    analytics: <><path d="M4 19V9M10 19V5M16 19v-8M22 19H2"/><path d="m4 12 6-5 6 3 5-6"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
};

const experimentLayers = [
  ["01-sol", "experiment-sun"],
  ["02-ondas", "experiment-waves"],
  ["03-marco-navegador", "experiment-window"],
  ["04-heatmap", "experiment-heatmap"],
  ["05-ab-test", "experiment-ab"],
  ["06-codigo", "experiment-code"],
  ["07-reporte", "experiment-report"],
] as const;

const ExperimentArtwork = () => (
  <div className="experiment" role="img" aria-label="Experiment workflow: observe, hypothesize, ship and learn">
    {experimentLayers.map(([file, className]) => (
      <Image key={file} className={`experiment-layer ${className}`} src={`/assets/hero-experimentacion/${file}.svg`} alt="" aria-hidden="true" width={1800} height={1100} priority />
    ))}
  </div>
);

export default function Home({ locale="en" }:{ locale?:"en"|"es" } = {}) {
  return (
    <main>
      <section className="hero" id="about">
        <SiteNav locale={locale}/>

        <div className="hero-grid shell" id="top">
          <div className="hero-copy">
            <p className="name">Josue Somarribas</p>
            <p className="eyebrow">UX ENGINEER × CRO DEVELOPER</p>
            <h1>I find why people<br />hesitate—then design<br />and <em>build the fix.</em></h1>
            <p className="lead">Research, interface design, front-end implementation and experimentation—from first signal to a measurable, shipped experience.</p>
            <div className="actions">
              <a className="btn btn-red" href="#work">View selected work <span>↓</span></a>
              <a className="btn btn-outline" href="mailto:josuesomarribasb@gmail.com">Discuss a project <Arrow /></a>
            </div>
          </div>

          <ExperimentArtwork />
        </div>
        <p className="meta shell">8+ years across UX and web development <b>·</b> Costa Rica → Spain <b>·</b> Available for remote collaboration</p>
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
            <article className="project project-cream">
              <header><span className="number">01</span><small>INDEPENDENT PRODUCT · RESEARCH + FRONT-END</small></header>
              <h3>5 Seconds Tester</h3><p>A live tool for testing whether a value proposition is understood in five seconds.</p>
              <div className="project-preview tester"><BrowserDots /><h4>5 Seconds Tester</h4><span className="fake-label">Enter your value proposition</span><div className="fake-input">We help teams ship better products.</div><span className="fake-label">What&apos;s the main benefit in 5 seconds?</span><div className="fake-input">Type what you think is the main benefit...</div><button>Start test</button><aside><span>Responses</span><b>24</b><span>Clarity</span><strong>Good ✓</strong></aside></div>
              <div className="tags"><span>Live product</span><span>Built end-to-end</span><span>Research workflow</span></div>
              <div className="card-actions"><a className="btn btn-red" href="#process">Try the tool <Arrow /></a><a href="#process">Read the story →</a></div>
            </article>
            <article className="project project-blue">
              <header><span className="number">02</span><small>EXPERIMENT · UX ENGINEERING</small></header>
              <h3>Font Tester</h3><p>A browser-based experiment exploring how typography changes perception and trust.</p>
              <div className="font-preview"><h4>Which design feels more<br />trustworthy?</h4><small>Choose one option.</small><div className="font-options"><div><b>A</b><strong>Modern Grotesk</strong><p>We help teams make better decisions.</p><button>Choose A</button></div><div><b>B</b><strong>Humanist Serif</strong><p>We help teams make better decisions.</p><button>Choose B</button></div></div></div>
              <div className="tags"><span>Interactive prototype</span><span>Behavioral comparison</span><span>Front-end build</span></div>
              <a className="bottom-link" href="#process">Explore prototype <Arrow /></a>
            </article>
            <article className="project project-cream">
              <header><span className="number">03</span><small>CLIENT WORK · WEB DEVELOPMENT</small></header>
              <h3>PitchCR</h3><p>A digital home for Costa Rica&apos;s startup and pitch community.</p>
              <div className="pitch-preview"><div className="pitch-nav"><b>PITCHCR</b><small>Events  Community  Resources</small><i>Join</i></div><h4>Where founders<br />connect and grow.</h4><button>See upcoming events</button><Image className="pitch-asset" src="/assets/summer-complementarios/02-pitchcr-ilustracion-costera.svg" alt="" aria-hidden="true" width={1800} height={1100} /></div>
              <dl><div><dt>Role:</dt><dd>Design implementation</dd></div><div><dt>Platform:</dt><dd>Squarespace</dd></div><div><dt>Focus:</dt><dd>Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="mailto:josuesomarribasb@gmail.com">Visit live site <Arrow /></a>
            </article>
          </div>

          <div className="more-work-heading"><p>More selected work</p><span>Client websites built with the same attention to clarity, performance and craft.</span></div>
          <div className="more-projects">
            <article className="project project-cream project-secondary">
              <header><span className="number">04</span><small>CLIENT WORK · WEB DESIGN + DEVELOPMENT</small></header>
              <h3>Rofka Projects</h3><p>A digital presence for a Costa Rican construction company—from planning and design to finished spaces.</p>
              <div className="rofka-preview"><div className="rofka-nav"><b>ROFKA</b><small>PROJECTS  SERVICES  ABOUT</small></div><div className="rofka-copy"><small>DESIGN · PLAN · BUILD</small><h4>Spaces built<br />with purpose.</h4><span>View our projects ↗</span></div><div className="rofka-building"><i/><i/><i/><i/></div></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Platform:</dt><dd>Framer</dd></div><div><dt>Focus:</dt><dd>Brand presence · Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="https://rofkaproyectos.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
            <article className="project project-blue project-secondary">
              <header><span className="number">05</span><small>CLIENT WORK · CREATIVE WEB DEVELOPMENT</small></header>
              <h3>Andrés Tenor</h3><p>A distinctive artist website for opera and bolero tenor Andrés Rodríguez, based in Barcelona.</p>
              <div className="tenor-preview"><div className="tenor-nav"><b>ANDRÉS</b><small>ABOUT  MUSIC  CONTACT</small></div><div className="tenor-copy"><small>OPERA · BOLERO</small><h4>A voice that<br />crosses borders.</h4><span>Listen now ↗</span></div><div className="tenor-stage"><i/><i/><b>♪</b></div></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Location:</dt><dd>Barcelona · Europe</dd></div><div><dt>Focus:</dt><dd>Artist identity · Performance</dd></div></dl>
              <a className="btn btn-red" href="https://andrestenor.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
          </div>

          <aside className="nda"><div className="lock"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div><div><small>NDA-PROTECTED</small><h3>Selected enterprise work under NDA</h3><p>Airlines · Finance · Health devices · Legal</p></div><div className="nda-copy"><p>I can walk through responsibilities,<br />constraints and outcomes in conversation.</p><a className="btn btn-outline" href="mailto:josuesomarribasb@gmail.com">Ask for a private walkthrough <Arrow /></a></div></aside>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell">
          <h2>From signal to shipped experiment</h2>
          <p className="process-intro">A continuous loop from behavioral signal to an evidence-backed product decision.</p>
          <div className="process-grid">
            <article><header><b>01</b> Observe</header><p>Heatmap shows low engagement on primary CTA above the fold.</p><Heatmap /></article>
            <article><header><b>02</b> Frame</header><p>Hypothesis:<br />Clarifying the CTA label will increase clicks.</p><p>Decision:<br />Test clearer, benefit-led CTA copy.</p></article>
            <article><header><b>03</b> Prototype</header><p>Accessible component variants for A/B test.</p><div className="prototype"><span>A  Learn more</span><span>B  <b>See how it works</b></span></div><small>WCAG AA · Keyboard focus visible</small></article>
            <article><header><b>04</b> Instrument & ship</header><p>Track event and ship behind experiment flag.</p><div className="code-mini">trackEvent(&apos;cta_click&apos;, {'{'}<br />&nbsp; variant: &apos;A&apos;,<br />&nbsp; location: &apos;hero&apos;<br />{'}'});</div><small>Analytics: event in place before ship.</small></article>
            <article><header><b>05</b> Learn</header><p>Segment the result and decide what to keep, iterate or drop.</p><p className="qa-list"><span>✓ Events firing</span><span>✓ Exposure balanced</span><span>✓ No console errors</span></p></article>
          </div>
          <div className="process-loop" aria-hidden="true"><span>Observe again</span><i/><span>Learn</span></div>
        </div>
      </section>

      <section className="quote" id="writing"><div className="shell quote-inner"><span>“</span><blockquote>Josue bridges design decisions<br />and production constraints<br />exceptionally well.<cite>Product collaborator · Enterprise project</cite></blockquote><a href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer">Read 14 recommendations <Arrow /></a></div></section>

      <section className="contact"><div className="contact-art" aria-hidden="true"><Image className="contact-sun" src="/assets/global/sol-rojo-texturizado.svg" alt="" width={1024} height={1024} /><Image className="contact-waves" src="/assets/global/ondas-blancas-3-lineas.svg" alt="" width={1400} height={360} /></div><div className="shell contact-grid"><div><h2>Have a stubborn<br />product problem?</h2><p>Send me the messy version. No pitch deck required.</p></div><div><div className="actions"><a className="btn btn-light" href="mailto:josuesomarribasb@gmail.com">Start a conversation <Arrow /></a><CopyEmailButton label={locale === "es" ? "Copiar email" : "Copy email"} copiedLabel={locale === "es" ? "Copiado" : "Copied"}/></div><p>Based in Spain · CET · English + Spanish</p></div></div></section>
      <div id="footer"><SiteFooter locale={locale}/></div>
    </main>
  );
}
