import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "../../../components/SiteNav";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Now — Josue Somarribas",
  description: "What Josue Somarribas is building, learning, exploring and reading right now.",
  alternates: { canonical: "/now", languages: { en: "/now", es: "/es/now", "x-default": "/now" } },
};

const Arrow = () => <span aria-hidden="true">→</span>;

export default function NowPage() {
  const week = [["M","Build",true],["T","Measure",true],["W","Learn",true],["T","Explore",true],["F","Write",true],["S","Recharge",false],["S","Recharge",false]];
  return <main className="now-page">
    <header className="now-header"><SiteNav current="now" /></header>

    <section className="now-hero shell">
      <Image className="now-ruler" src="/assets/now/ruler.svg" alt="" aria-hidden="true" width={72} height={280} unoptimized/>
      <h1>NOW</h1>
      <div className="now-hero-copy"><Image className="now-hero-arrow" src="/assets/now/hero-arrow.svg" alt="" aria-hidden="true" width={82} height={36} unoptimized/><h2>What I’m<br/>focused on<br/>right now.</h2><p>Updated August 2026 · Madrid</p></div>
      <div className="now-hero-note"><Image src="/assets/global/sol-rojo-texturizado.svg" alt="" width={180} height={180}/><p>Ship better<br/>experiences.<br/>Measure what<br/>matters.</p></div>
    </section>

    <section className="weekly-signal shell" aria-label="Weekly signal">
      <div className="weekly-label"><b>WEEKLY SIGNAL</b><span>Aug 4 — Aug 10</span></div>
      <div className="week-days">{week.map(([day,task,active],i)=><div key={`${day}-${i}`}><b className={!active ? "weekend" : ""}>{day}</b><i className={!active ? "weekend" : ""}/><span>{task}</span></div>)}</div>
      <p>Rhythm &gt;<br/>Deep work,<br/>ship, learn,<br/>share.</p>
    </section>

    <section className="now-board shell">
      <article className="now-building">
        <div className="now-section-intro"><b>01</b><h2>Building</h2><p>Things I’m actively building<br/>and shipping.</p><a href="/#process">View all experiments <Arrow/></a></div>
        <div className="blueprint"><div><small>PRIMARY FOCUS</small><h3>Editorial CRO Framework</h3><p>A field-tested framework for turning<br/>ethical, insight-led experiments that<br/>improve experience and drive outcomes.</p><ul><li>Experiment design</li><li>Implementation patterns</li><li>Measurement &amp; analysis</li><li>Case studies</li></ul><div className="blueprint-progress">Progress <span>65%</span><i/></div></div><Image className="now-funnel" src="/assets/now/funnel-en.svg" alt="Experiment funnel from hypothesis to impact" width={270} height={280} unoptimized/><em>fig. 01</em></div>
      </article>

      <article className="now-card learning"><b>02</b><h2>Learning</h2><p>Topics I’m diving deep into.</p><ul><li>Advanced Statistics for A/B Testing</li><li>Bayesian Thinking for Product Decisions</li><li>Web Performance in 2026</li><li>Design Systems at Scale</li></ul><Image className="bell-curve now-card-graphic" src="/assets/now/bell-curve-en.svg" alt="Bell curve illustrating reduced uncertainty" width={200} height={135} unoptimized/><a href="/blog">Notes &amp; takeaways <Arrow/></a></article>
      <article className="now-card exploring"><b>03</b><h2>Exploring</h2><p>Ideas, tools, and spaces I’m exploring.</p><ul><li>Edge delivery &amp; personalization</li><li>Server Components &amp; islands</li><li>Experimentation platforms (open source)</li><li>AI-assisted data analysis</li></ul><Image className="scatter now-card-graphic" src="/assets/now/scatter-en.svg" alt="Scatter plot for finding patterns and asking better questions" width={190} height={220} unoptimized/><a href="/blog">Lab notebook <Arrow/></a></article>
      <article className="now-card reading"><b>04</b><h2>Reading</h2><p>On my nightstand and in my feed.</p><Image className="book-stack now-card-graphic" src="/assets/now/book-stack.svg" alt="Book covers for Noise, Designing Data-Intensive Applications, and The Mom Test" width={150} height={230} unoptimized/><ul><li><strong>Noise</strong><span>Reading</span></li><li><strong>Designing Data-Intensive Applications</strong><span>Reading</span></li><li><strong>The Mom Test</strong><span>Re-reading</span></li></ul><a href="/blog">My highlights <Arrow/></a></article>
      <article className="now-card available"><b>05</b><h2>Available for</h2><p>How I can help right now.</p><ul><li><i>◎</i><span><strong>CRO Strategy &amp; Experimentation</strong>From opportunity discovery to measurable lift.</span></li><li><i>‹/›</i><span><strong>UX Engineering</strong>Fast, accessible, scalable front-end solutions.</span></li><li><i>⌁</i><span><strong>Audit &amp; Optimization</strong>Find friction. Fix what matters. Prove impact.</span></li></ul><a href="mailto:josuesomarribasb@gmail.com">Let’s see if it’s a fit <Arrow/></a></article>
    </section>

    <section className="now-cta shell"><h2>Have a stubborn<br/>product problem?</h2><p>I help teams ship better experiences through a mix of UX engineering, experimentation, and data-informed decisions.</p><a href="mailto:josuesomarribasb@gmail.com">Start a conversation <Arrow/></a></section>
    <footer className="now-footer"><div className="shell"><a className="logo" href="/">JS.</a><p>Madrid, Spain<br/>Available worldwide</p><nav><a href="/#work">Work</a><a href="/#process">Experiments</a><a href="/blog">Writing</a></nav><nav><a href="/about">About</a><a href="/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf">Résumé</a><a href="/now">Now</a></nav><p><a href="mailto:josuesomarribasb@gmail.com">josuesomarribasb@gmail.com</a><br/>+34 600 123 456</p><b>BUILT<br/>WITH CARE<br/>&amp; CURIOSITY</b></div><div className="shell now-legal"><span>© 2026 Josue Somarribas</span><span>Privacy　 Terms　 Cookies</span></div></footer>
  </main>;
}
