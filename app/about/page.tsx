import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Josue Somarribas",
  description: "UX Engineer and CRO Developer connecting human behavior, interface craft and production code.",
};

const Arrow = () => <span aria-hidden="true">↗</span>;
const aboutHeroLayers = ["01-cuaderno-field-kit", "02-mapa-costa-rica-spain", "03-ventana-experimento", "04-tarjeta-ab", "05-reloj-madrid", "06-nota-investigacion", "07-sello-curious"];
const beliefImages:Record<string,string> = { ship:"02-idea-ship-learn", results:"03-resultados-planos", details:"04-detalle-ui-confianza" };

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
          <div className="actions"><a className="btn btn-red" href="#route">Download résumé ↓</a><a className="btn btn-outline" href="mailto:josuesomarribasb@gmail.com">Start a conversation <Arrow /></a></div>
          <p className="about-meta">8+ years across UX and web development　·　Based in Spain　·　Born in Costa Rica</p>
        </div>
        <div className="about-collage" role="img" aria-label="Research, experimentation and a journey from Costa Rica to Spain">
          <Image className="about-decor about-asset-sun" src="/assets/global/sol-rojo-texturizado.svg" alt="" aria-hidden="true" width={1024} height={1024}/>
          <Image className="about-decor about-asset-waves" src="/assets/global/ondas-marfil-3-lineas.svg" alt="" aria-hidden="true" width={1400} height={360}/>
          {aboutHeroLayers.map((file,index)=><Image key={file} className={`about-hero-layer about-layer-${index+1}`} src={`/assets/about-hero/${file}.svg`} alt="" aria-hidden="true" width={1800} height={1100} priority={index<3}/>) }
        </div>
      </div>
    </section>

    <section className="about-overlap shell">
      <div><h2>I work in the overlap.</h2><p>The most interesting product problems rarely belong to one discipline. I like following them across boundaries—from the first awkward question to the production details that decide whether an idea survives.</p></div>
      <Image className="about-venn-asset" src="/assets/about-secundarios/01-diagrama-venn.svg" alt="People, interfaces and systems overlap to create useful things that ship" width={1200} height={820}/>
    </section>

    <section className="beliefs shell"><h2>A few things I believe</h2><div className="belief-grid">{beliefs.map(([n,t,d,c])=><article className={c === "ship" ? "featured" : ""} key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p>{beliefImages[c] ? <Image className="belief-asset" src={`/assets/about-secundarios/${beliefImages[c]}.svg`} alt="" aria-hidden="true" width={1100} height={700}/> : <Image className="belief-arrow" src="/assets/global/flecha-manuscrita-roja.svg" alt="" aria-hidden="true" width={800} height={500}/>}</article>)}</div></section>

    <section className="route shell" id="route"><div className="route-head"><h2>The route so far</h2><a className="btn btn-dark" href="mailto:josuesomarribasb@gmail.com?subject=Résumé">View résumé <Arrow /></a></div><Image className="route-icons-asset" src="/assets/about-secundarios/05-iconos-ruta-profesional.svg" alt="" aria-hidden="true" width={1800} height={360}/><div className="route-line">{route.map(([,title,text])=><article key={title}><span/><h3>{title}</h3><p>{text}</p></article>)}</div><p className="industries">Enterprise software　·　Education　·　E-commerce　·　Finance　·　Health　·　Travel</p></section>

    <section className="team"><div className="shell"><h2>What I bring to a team</h2><Image className="team-icons-asset" src="/assets/about-secundarios/06-iconos-aporte-equipo.svg" alt="" aria-hidden="true" width={1350} height={460}/><div className="team-grid"><article><div><h3>See the problem</h3><p>Research, synthesis, journey friction, hypothesis framing.</p></div></article><article><div><h3>Shape the experience</h3><p>Flows, interaction design, prototypes, design systems.</p></div></article><article><div><h3>Make it real</h3><p>Front-end, responsive behavior, accessibility, analytics and experiment QA.</p></div></article></div><p className="team-flow">OBSERVE　 ⟶　 FRAME　 ⟶　 PROTOTYPE　 ⟶　 INSTRUMENT　 ⟶　 SHIP　 ⟶　 LEARN</p></div></section>

    <section className="hospitality"><div className="shell hospitality-grid"><div><h2>UX does not stop at the screen.</h2><p>Alongside digital products, I host travellers from around the world in Costa Rica. More than 70 guest reviews have taught me the same lesson as product work: comfort lives in anticipation, clear communication and the small details people should never have to ask for.</p><a href="https://www.airbnb.es/rooms/1328530246047347477" target="_blank" rel="noreferrer">Read the guest reviews <Arrow /></a></div><Image className="hospitality-asset" src="/assets/about-secundarios/07-kit-hospitalidad.svg" alt="Hospitality kit with keys, map and welcome card" width={1800} height={900}/></div></section>

    <section className="recommendations shell"><h2>People I&apos;ve worked with say it better.</h2><div><blockquote>“Josue bridges design decisions and production constraints exceptionally well.”<cite>Product collaborator</cite></blockquote><blockquote>“He asks great questions, notices the details and makes collaboration feel easy.”<cite>Engineering collaborator</cite></blockquote><a href="#">Read 14 recommendations<br/>on LinkedIn <Arrow /></a></div></section>

    <section className="currently"><div className="shell"><h2>Currently<br/><b>curious about</b></h2><p>Experiment validity　〰　Behavioral design　〰　Accessible interaction　〰　Browser quirks　〰　Typography　〰　Useful side projects</p></div></section>

    <section className="about-contact"><div className="shell"><div><h2>If the problem sits between disciplines,<br/>I&apos;m probably interested.</h2><p>Send me the messy version. No pitch deck required.</p></div><div className="actions"><a className="btn btn-red" href="mailto:josuesomarribasb@gmail.com">Start a conversation <Arrow /></a><button className="btn btn-outline">✉ Copy email</button></div></div></section>
    <SiteFooter current="about" />
  </main>;
}
