import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "../../../components/SiteNav";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Now — Josue Somarribas",
  description: "What Josue Somarribas is building, learning, exploring and reading right now.",
};

const Arrow = () => <span aria-hidden="true">→</span>;

const FocusDiagram = () => <svg className="now-funnel" viewBox="0 0 270 280" role="img" aria-label="Experiment funnel from hypothesis to impact">
  <g fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M25 35h215v55l-46 50v58l-40 42h-44l-40-42v-58L25 90Z"/><path d="M25 90h215M70 140h124M110 198h44M110 240h44"/><path d="M18 25v75M247 80v125M4 25h28M4 100h28M233 80h28M233 205h28"/></g>
  <g className="now-funnel-copy"><text x="132" y="65">HYPOTHESIS</text><text x="132" y="119">EXPERIMENT</text><text x="132" y="174">ANALYZE</text><text x="132" y="224">IMPACT</text><text x="0" y="18">80</text><text x="237" y="73">50</text></g>
</svg>;

export default function NowPage() {
  const week = [["M","Build",true],["T","Measure",true],["W","Learn",true],["T","Explore",true],["F","Write",true],["S","Recharge",false],["S","Recharge",false]];
  return <main className="now-page">
    <header className="now-header"><SiteNav current="now" /></header>

    <section className="now-hero shell">
      <div className="now-ruler" aria-hidden="true"><i/><b>08</b><b>06</b><b>04</b><b>02</b><b>00</b><i/></div>
      <h1>NOW</h1>
      <div className="now-hero-copy"><span aria-hidden="true">⟶</span><h2>What I’m<br/>focused on<br/>right now.</h2><p>Updated August 2026 · Madrid</p></div>
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
        <div className="blueprint"><div><small>PRIMARY FOCUS</small><h3>Editorial CRO Framework</h3><p>A field-tested framework for turning<br/>ethical, insight-led experiments that<br/>improve experience and drive outcomes.</p><ul><li>Experiment design</li><li>Implementation patterns</li><li>Measurement &amp; analysis</li><li>Case studies</li></ul><label>Progress <span>65%</span><i/></label></div><FocusDiagram/><em>fig. 01</em></div>
      </article>

      <article className="now-card learning"><b>02</b><h2>Learning</h2><p>Topics I’m diving deep into.</p><ul><li>Advanced Statistics for A/B Testing</li><li>Bayesian Thinking for Product Decisions</li><li>Web Performance in 2026</li><li>Design Systems at Scale</li></ul><div className="bell-curve" aria-hidden="true"><span>reduce<br/>uncertainty</span><svg viewBox="0 0 180 105"><path d="M6 85C52 85 48 20 90 20s38 65 84 65M6 85h168M90 15v76"/><text x="10" y="102">−2σ</text><text x="58" y="102">−1σ</text><text x="88" y="102">μ</text><text x="120" y="102">+1σ</text><text x="157" y="102">+2σ</text></svg></div><a href="/blog">Notes &amp; takeaways <Arrow/></a></article>
      <article className="now-card exploring"><b>03</b><h2>Exploring</h2><p>Ideas, tools, and spaces I’m exploring.</p><ul><li>Edge delivery &amp; personalization</li><li>Server Components &amp; islands</li><li>Experimentation platforms (open source)</li><li>AI-assisted data analysis</li></ul><div className="scatter" aria-hidden="true"><i/><i/><i/><i/><i/><span>Find patterns.<br/>Ask better questions.</span></div><a href="/blog">Lab notebook <Arrow/></a></article>
      <article className="now-card reading"><b>04</b><h2>Reading</h2><p>On my nightstand and in my feed.</p><div className="book-stack" aria-label="Book covers"><i>Noise<small>Daniel Kahneman</small></i><i>Designing<br/>Data-Intensive<br/>Applications<small>Martin Kleppmann</small></i><i>The Mom Test<small>Rob Fitzpatrick</small></i></div><ul><li><strong>Noise</strong><span>Reading</span></li><li><strong>Designing Data-Intensive Applications</strong><span>Reading</span></li><li><strong>The Mom Test</strong><span>Re-reading</span></li></ul><a href="/blog">My highlights <Arrow/></a></article>
      <article className="now-card available"><b>05</b><h2>Available for</h2><p>How I can help right now.</p><ul><li><i>◎</i><span><strong>CRO Strategy &amp; Experimentation</strong>From opportunity discovery to measurable lift.</span></li><li><i>‹/›</i><span><strong>UX Engineering</strong>Fast, accessible, scalable front-end solutions.</span></li><li><i>⌁</i><span><strong>Audit &amp; Optimization</strong>Find friction. Fix what matters. Prove impact.</span></li></ul><a href="mailto:josuesomarribasb@gmail.com">Let’s see if it’s a fit <Arrow/></a></article>
    </section>

    <section className="now-cta shell"><h2>Have a stubborn<br/>product problem?</h2><p>I help teams ship better experiences through a mix of UX engineering, experimentation, and data-informed decisions.</p><a href="mailto:josuesomarribasb@gmail.com">Start a conversation <Arrow/></a></section>
    <footer className="now-footer"><div className="shell"><a className="logo" href="/">JS.</a><p>Madrid, Spain<br/>Available worldwide</p><nav><a href="/#work">Work</a><a href="/#process">Experiments</a><a href="/blog">Writing</a></nav><nav><a href="/about">About</a><a href="/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf">Résumé</a><a href="/now">Now</a></nav><p><a href="mailto:josuesomarribasb@gmail.com">josuesomarribasb@gmail.com</a><br/>+34 600 123 456</p><b>BUILT<br/>WITH CARE<br/>&amp; CURIOSITY</b></div><div className="shell now-legal"><span>© 2026 Josue Somarribas</span><span>Privacy　 Terms　 Cookies</span></div></footer>
  </main>;
}
