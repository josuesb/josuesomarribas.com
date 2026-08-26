const Arrow = () => <span aria-hidden="true">↗</span>;

const Heatmap = () => (
  <div className="heatmap" aria-label="Illustrative attention heatmap">
    <i /><i /><i /><i />
  </div>
);

const BrowserDots = () => <div className="browser-dots"><i /><i /><i /></div>;

export default function Home() {
  return (
    <main>
      <section className="hero" id="about">
        <nav className="nav shell" aria-label="Primary navigation">
          <a className="logo" href="#top" aria-label="Josue Somarribas home">JS.</a>
          <div className="nav-links">
            <a href="#work">Work</a><a href="#process">Experiments</a><a href="/writing">Writing</a><a href="#about">About</a><a href="#footer">Résumé</a>
          </div>
          <div className="language-switcher" aria-label="Language selector"><a className="active" href="/" lang="en">EN</a><span>/</span><a href="/es" lang="es">ES</a></div>
          <a className="btn btn-red nav-cta" href="mailto:hello@josuesomarribas.com">Let&apos;s talk <Arrow /></a>
        </nav>

        <div className="hero-grid shell" id="top">
          <div className="hero-copy">
            <p className="name">Josue Somarribas</p>
            <p className="eyebrow">UX ENGINEER × CRO DEVELOPER</p>
            <h1>I find why people<br />hesitate—then design<br />and <em>build the fix.</em></h1>
            <p className="lead">Research, interface design, front-end implementation and experimentation—from first signal to shipped experience.</p>
            <div className="actions">
              <a className="btn btn-red" href="#work">View selected work <span>↓</span></a>
              <a className="btn btn-outline" href="mailto:hello@josuesomarribas.com">Discuss a project <Arrow /></a>
            </div>
          </div>

          <div className="experiment" aria-label="Experiment workflow illustration">
            <div className="sun" /><div className="waves"><i /><i /><i /></div>
            <div className="lab-window">
              <BrowserDots />
              <div className="lab-nav"><span>OBSERVE</span><b>→</b><span>HYPOTHESIZE</span><b>→</b><span>SHIP</span><b>→</b><span>LEARN</span></div>
              <div className="lab-cards">
                <div className="observe"><small>OBSERVE</small><Heatmap /><p /><p /><p /></div>
                <div className="ab-card"><small>A / B test</small><button>A</button><button>B</button><p /><p /><p /></div>
                <div className="code-card"><code><b>button.cta</b> {'{'}<br />&nbsp; background: <mark>#FF5830</mark>;<br />&nbsp; color: #FFF;<br />&nbsp; font-weight: 600;<br />&nbsp; border-radius: 8px;<br />{'}'}<br /><br /><span>trackEvent</span>(&apos;cta_click&apos;);</code></div>
              </div>
            </div>
            <div className="chart-card"><b>Illustrative<br />experiment</b><div className="mini-chart">⌁╱⌁╱</div><p /><p /><small>Illustrative only.<br />Not performance data.</small></div>
          </div>
        </div>
        <p className="meta shell">8+ years across UX and web development <b>·</b> Costa Rica → Spain <b>·</b> Working globally</p>
      </section>

      <section className="capabilities">
        <div className="shell capability-grid">
          {[
            ['◉','User research','Uncover real user needs with clear, actionable insights.'],
            ['♙','Experiment design','Formulate hypotheses, test quickly, learn what matters.'],
            ['‹/›','Production front-end','Accessible, performant interfaces built to ship and scale.'],
            ['↗','Analytics & QA','Reliable instrumentation and quality that protect learning.']
          ].map(([icon,title,text],i)=><article key={title} className={`cap cap-${i}`}><span className="cap-icon">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
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
              <div className="project-preview tester"><BrowserDots /><h4>5 Seconds Tester</h4><label>Enter your value proposition</label><div className="fake-input">We help teams ship better products.</div><label>What&apos;s the main benefit in 5 seconds?</label><div className="fake-input">Type what you think is the main benefit...</div><button>Start test</button><aside><span>Responses</span><b>24</b><span>Clarity</span><strong>Good ✓</strong></aside></div>
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
              <div className="pitch-preview"><div className="pitch-nav"><b>PITCHCR</b><small>Events　 Community　 Resources</small><i>Join</i></div><h4>Where founders<br />connect and grow.</h4><button>See upcoming events</button><div className="pitch-sun" /><div className="steps">▰<br />▰▰<br />▰▰▰</div><div className="palm">✦</div></div>
              <dl><div><dt>Role:</dt><dd>Design implementation</dd></div><div><dt>Platform:</dt><dd>Squarespace</dd></div><div><dt>Focus:</dt><dd>Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="mailto:hello@josuesomarribas.com">Visit live site <Arrow /></a>
            </article>
            <article className="project project-cream project-wide">
              <header><span className="number">04</span><small>CLIENT WORK · WEB DESIGN + DEVELOPMENT</small></header>
              <h3>Rofka Projects</h3><p>A digital presence for a Costa Rican construction company—from planning and design to finished spaces.</p>
              <div className="rofka-preview"><div className="rofka-nav"><b>ROFKA</b><small>PROJECTS　 SERVICES　 ABOUT</small></div><div className="rofka-copy"><small>DESIGN · PLAN · BUILD</small><h4>Spaces built<br />with purpose.</h4><span>View our projects　↗</span></div><div className="rofka-building"><i/><i/><i/><i/></div></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Platform:</dt><dd>Framer</dd></div><div><dt>Focus:</dt><dd>Brand presence · Responsive UI</dd></div></dl>
              <a className="btn btn-red" href="https://rofkaproyectos.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
            <article className="project project-blue project-wide">
              <header><span className="number">05</span><small>CLIENT WORK · CREATIVE WEB DEVELOPMENT</small></header>
              <h3>Andrés Tenor</h3><p>A distinctive artist website for opera and bolero tenor Andrés Rodríguez, based in Barcelona.</p>
              <div className="tenor-preview"><div className="tenor-nav"><b>ANDRÉS</b><small>ABOUT　 MUSIC　 CONTACT</small></div><div className="tenor-copy"><small>OPERA · BOLERO</small><h4>A voice that<br />crosses borders.</h4><span>Listen now　↗</span></div><div className="tenor-stage"><i/><i/><b>♪</b></div></div>
              <dl><div><dt>Role:</dt><dd>Web design & development</dd></div><div><dt>Location:</dt><dd>Barcelona · Europe</dd></div><div><dt>Focus:</dt><dd>Artist identity · Performance</dd></div></dl>
              <a className="btn btn-red" href="https://andrestenor.com/" target="_blank" rel="noreferrer">Visit live site <Arrow /></a>
            </article>
          </div>

          <aside className="nda"><div className="lock">♙</div><div><small>NDA-PROTECTED</small><h3>Enterprise work, selected details</h3><p>Airlines　·　Finance　·　Health devices　·　Legal</p></div><div className="nda-copy"><p>I can walk through responsibilities,<br />constraints and outcomes in conversation.</p><a className="btn btn-outline" href="mailto:hello@josuesomarribas.com">Ask about this work <Arrow /></a></div></aside>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell">
          <h2>From signal to shipped experiment</h2>
          <div className="process-grid">
            <article><header><b>01</b> Observe</header><p>Heatmap shows low engagement on primary CTA above the fold.</p><Heatmap /></article>
            <article><header><b>02</b> Frame</header><p>Hypothesis:<br />Clarifying the CTA label will increase clicks.</p><p>Decision:<br />Test clearer, benefit-led CTA copy.</p></article>
            <article><header><b>03</b> Prototype</header><p>Accessible component variants for A/B test.</p><div className="prototype"><span>A　 Learn more</span><span>B　 <b>See how it works</b></span></div><small>WCAG AA · Keyboard focus visible</small></article>
            <article><header><b>04</b> Instrument & ship</header><p>Track event and ship behind experiment flag.</p><div className="code-mini">trackEvent(&apos;cta_click&apos;, {'{'}<br />&nbsp; variant: &apos;A&apos;,<br />&nbsp; location: &apos;hero&apos;<br />{'}'});</div><small>Analytics: event in place before ship.</small></article>
            <article><header><b>05</b> Learn</header><p>Analyze behavior by variant and segment. Decide what to keep, iterate or drop.</p><p>QA checklist<br />☑ Events firing<br />☑ Exposure balanced<br />☑ No console errors</p></article>
          </div>
        </div>
      </section>

      <section className="quote" id="writing"><div className="shell quote-inner"><span>“</span><blockquote>Josue bridges design decisions<br />and production constraints<br />exceptionally well.<cite>Product collaborator</cite></blockquote><a href="#footer">Read 14 recommendations <Arrow /></a></div></section>

      <section className="contact"><div className="contact-art"><div className="contact-sun" /><div className="contact-waves"><i /><i /><i /></div></div><div className="shell contact-grid"><div><h2>Have a stubborn<br />product problem?</h2><p>Send me the messy version. No pitch deck required.</p></div><div><div className="actions"><a className="btn btn-light" href="mailto:hello@josuesomarribas.com">Start a conversation <Arrow /></a><button className="btn btn-outline" type="button">✉ Copy email</button></div><p>Based in Spain　·　CET　·　English + Spanish</p></div></div></section>
      <footer id="footer"><div className="shell"><a className="logo" href="#top">JS.</a><p>© 2026 Josue Somarribas. All rights reserved.</p><div><a href="#" aria-label="GitHub">◉</a><a href="#" aria-label="LinkedIn">in</a><a href="mailto:hello@josuesomarribas.com" aria-label="Email">✉</a></div></div></footer>
    </main>
  );
}
