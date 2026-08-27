import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";

export const metadata: Metadata = {
  title: "About — Josue Somarribas",
  description: "UX Engineer and CRO Developer connecting human behavior, interface craft and production code.",
};

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function AboutPage() {
  const beliefs = [
    ["01", "Clarity is a feature.", "If people cannot understand it, the interface is not finished.", "clarity"],
    ["02", "Shipping changes the conversation.", "A working interface reveals constraints a static screen cannot.", "ship"],
    ["03", "Flat results are still results.", "Experiments are for learning, not decorating roadmaps with wins.", "results"],
    ["04", "Details are where trust lives.", "Spacing, performance, accessibility and copy all shape the experience.", "details"],
  ];
  const route = [
    ["✎", "Design foundations", "Curiosity, structure and the basics that never stop mattering."],
    ["‹/›", "Web development", "Turning designs into working interfaces. Learning the web."],
    ["◇", "Product & UX", "Understanding users, problems and how products create value."],
    ["▣", "UX engineering", "Bridging design and code. Building with performance in mind."],
    ["♙", "Experimentation & CRO", "Testing assumptions. Learning from behavior, not opinions."],
    ["↻", "Now: building across the full loop", "From question to ship to learning. And repeat."],
  ];

  return <main className="about-page">
    <section className="about-hero">
      <SiteNav current="about" />
      <div className="shell about-hero-grid">
        <div>
          <p className="about-label">ABOUT × THE PERSON BETWEEN THE PIXELS</p>
          <h1>Designer by instinct.<br />Engineer by practice.<br />Experimenter by <em>curiosity.</em></h1>
          <p className="about-lead">I&apos;m Josue Somarribas, a UX Engineer and CRO Developer connecting human behavior, interface craft and production code.</p>
          <div className="actions"><a className="btn btn-red" href="#route">Download résumé ↓</a><a className="btn btn-outline" href="mailto:hello@josuesomarribas.com">Start a conversation <Arrow /></a></div>
          <p className="about-meta">8+ years across UX and web development　·　Based in Spain　·　Born in Costa Rica</p>
        </div>
        <div className="about-collage" aria-label="Illustration of research, experimentation and a journey from Costa Rica to Spain">
          <i className="about-sun" /><div className="about-waves"><i/><i/><i/></div>
          <div className="field-kit"><b>FIELD KIT</b><span>Questions,<br/>observations &<br/>small bets.</span><i/></div>
          <div className="map-card"><b>COSTA RICA　→　SPAIN</b><div>◆ · · · · · · ↗ ◆</div><small>curious<br/>by default</small></div>
          <div className="code-note"><span>● ● ●</span><code>experiment {'{'}<br/>　hypothesis: &apos;Make it clearer&apos;,<br/>　variant: &apos;B&apos;,<br/>　track(&apos;cta_click&apos;);<br/>{'}'}</code></div>
          <div className="ab-note"><b>A/B TEST</b><span>A</span><strong>B</strong></div>
          <div className="research-note"><b>RESEARCH NOTE</b><p>Why do people hesitate<br/>right before they act?</p></div>
        </div>
      </div>
    </section>

    <section className="about-overlap shell">
      <div><h2>I work in the overlap.</h2><p>The most interesting product problems rarely belong to one discipline. I like following them across boundaries—from the first awkward question to the production details that decide whether an idea survives.</p></div>
      <div className="venn" aria-label="People, interfaces and systems overlap to create useful things that ship">
        <i className="venn-interface">Interfaces</i><i className="venn-people">People</i><i className="venn-systems">Systems</i><b>Useful<br/>things that<br/>actually ship.</b>
      </div>
    </section>

    <section className="beliefs shell"><h2>A few things I believe</h2><div className="belief-grid">{beliefs.map(([n,t,d,c])=><article className={c === "ship" ? "featured" : ""} key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p><div className={`belief-art ${c}`} aria-hidden="true" /></article>)}</div></section>

    <section className="route shell" id="route"><div className="route-head"><h2>The route so far</h2><a className="btn btn-dark" href="mailto:hello@josuesomarribas.com?subject=Résumé">View résumé <Arrow /></a></div><div className="route-line">{route.map(([icon,title,text])=><article key={title}><i>{icon}</i><span/><h3>{title}</h3><p>{text}</p></article>)}</div><p className="industries">Enterprise software　·　Education　·　E-commerce　·　Finance　·　Health　·　Travel</p></section>

    <section className="team"><div className="shell"><h2>What I bring to a team</h2><div className="team-grid"><article><i>⌕</i><div><h3>See the problem</h3><p>Research, synthesis, journey friction, hypothesis framing.</p></div></article><article><i>✎</i><div><h3>Shape the experience</h3><p>Flows, interaction design, prototypes, design systems.</p></div></article><article><i>‹/›</i><div><h3>Make it real</h3><p>Front-end, responsive behavior, accessibility, analytics and experiment QA.</p></div></article></div><p className="team-flow">OBSERVE　 ⟶　 FRAME　 ⟶　 PROTOTYPE　 ⟶　 INSTRUMENT　 ⟶　 SHIP　 ⟶　 LEARN</p></div></section>

    <section className="hospitality"><div className="shell hospitality-grid"><div><h2>UX does not stop at the screen.</h2><p>Alongside digital products, I host travellers from around the world in Costa Rica. More than 70 guest reviews have taught me the same lesson as product work: comfort lives in anticipation, clear communication and the small details people should never have to ask for.</p><a href="https://www.airbnb.com/" target="_blank" rel="noreferrer">Read the guest reviews <Arrow /></a></div><div className="welcome-card">Welcome!<br/><span>Que disfrutes tu estancia.</span> ♡</div><div className="speech">Thanks for the tips,<br/>it made our day.<br/><br/><b>Everything was<br/>thought through.</b></div></div></section>

    <section className="recommendations shell"><h2>People I&apos;ve worked with say it better.</h2><div><blockquote>“Josue bridges design decisions and production constraints exceptionally well.”<cite>Product collaborator</cite></blockquote><blockquote>“He asks great questions, notices the details and makes collaboration feel easy.”<cite>Engineering collaborator</cite></blockquote><a href="#">Read 14 recommendations<br/>on LinkedIn <Arrow /></a></div></section>

    <section className="currently"><div className="shell"><h2>Currently<br/><b>curious about</b></h2><p>Experiment validity　〰　Behavioral design　〰　Accessible interaction　〰　Browser quirks　〰　Typography　〰　Useful side projects</p></div></section>

    <section className="about-contact"><div className="shell"><div><h2>If the problem sits between disciplines,<br/>I&apos;m probably interested.</h2><p>Send me the messy version. No pitch deck required.</p></div><div className="actions"><a className="btn btn-red" href="mailto:hello@josuesomarribas.com">Start a conversation <Arrow /></a><button className="btn btn-outline">✉ Copy email</button></div></div></section>
    <SiteFooter current="about" />
  </main>;
}
