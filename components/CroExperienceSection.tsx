const MonitorIcon = () => <svg viewBox="0 0 28 24" aria-hidden="true"><rect x="2" y="2" width="18" height="14" rx="1"/><path d="M7 22h8M11 16v6M24 5v14M21 8l3-3 3 3"/></svg>;
const ShieldIcon = () => <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M14 2 24 6v7c0 6-4 10-10 13C8 23 4 19 4 13V6l10-4Z"/><path d="m9 14 3 3 7-8"/></svg>;
const GlobeIcon = () => <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="11"/><path d="M3 14h22M14 3c4 4 4 18 0 22M14 3c-4 4-4 18 0 22"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="11"/><path d="m9 14 3 3 7-8"/></svg>;

function SignalModules() {
  return <>
    <div className="cro-module cro-module-copy"><i/><span><b/><b/><b/></span></div>
    <div className="cro-module cro-module-palette"><i/><i/><i/><span><b/><b/></span></div>
    <div className="cro-module cro-module-ring"><i/><span><b/><b/><b/></span></div>
    <div className="cro-module cro-module-chart"><i/><i/><i/><i/><i/></div>
  </>;
}

function CroArtwork({ locale }: { locale: "en" | "es" }) {
  const t = locale === "es" ? {
    map:"MAPA DE ATENCIÓN", ticket:"Listo para UAT", experience:"Experiencia", live:"ACTIVO · 4 MERCADOS", winner:"Ganador", permanent:"→ implementación permanente"
  } : {
    map:"ATTENTION MAP", ticket:"Ready for UAT", experience:"Experience", live:"LIVE · 4 MARKETS", winner:"Winner", permanent:"→ permanent build"
  };

  return <div className="cro-stage" role="img" aria-label={locale === "es" ? "Capas de un experimento digital desde las variantes hasta la implementación permanente" : "Layers of a digital experiment from variants through permanent implementation"}>
    <div className="cro-browser cro-layer" aria-hidden="true">
      <header><span><i/><i/><i/></span><b>Signal Lab</b><em>A</em><em>B</em></header>
      <div className="cro-browser-grid"><SignalModules /></div>
    </div>
    <div className="cro-mobile cro-layer" aria-hidden="true"><header><i/><b>Signal</b><span>•••</span></header><SignalModules /></div>
    <div className="cro-attention cro-layer" aria-hidden="true"><b>{t.map}</b><div><i/><i/><i/></div><div><i/><i/></div></div>
    <div className="cro-code cro-layer" aria-hidden="true"><div><i/><i/><i/><span>experiment.js</span></div><code><b>experiment</b> {'{'}<br/>&nbsp; variant: <em>B</em><br/>&nbsp; audience: <em>global</em><br/>&nbsp; status: <strong>active</strong><br/>{'}'}</code></div>
    <div className="cro-ticket cro-layer" aria-hidden="true"><span>✓</span><b>CRO-184 · {t.ticket}</b><small>{t.experience}</small><small>Variant B</small></div>
    <div className="cro-live cro-layer" aria-hidden="true"><i/>{t.live}</div>
    <div className="cro-winner cro-layer" aria-hidden="true"><span>✓</span><div><b>{t.winner}</b><small>{t.permanent}</small></div></div>
    <svg className="cro-route" viewBox="0 0 760 260" aria-hidden="true"><path d="M30 215 C220 250 250 198 365 205 S525 230 560 165 S650 100 730 120"/><path d="m718 108 14 12-16 8"/></svg>
  </div>;
}

export default function CroExperienceSection({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const proof = es ? [
    ["ADOBE TARGET · 2 AÑOS", <MonitorIcon key="monitor"/>], ["MONETATE · 1 AÑO", <ShieldIcon key="shield"/>], ["LANZAMIENTOS GLOBALES", <GlobeIcon key="globe"/>], ["QA · UAT · PRODUCCIÓN", <CheckIcon key="check"/>]
  ] : [
    ["ADOBE TARGET · 2 YEARS", <MonitorIcon key="monitor"/>], ["MONETATE · 1 YEAR", <ShieldIcon key="shield"/>], ["GLOBAL RELEASES", <GlobeIcon key="globe"/>], ["QA · UAT · PRODUCTION", <CheckIcon key="check"/>]
  ];

  return <section className="cro-experience" id="cro-experience">
    <div className="cro-experience-main shell">
      <div className="cro-experience-copy">
        <p>{es ? "CRO EN PRODUCCIÓN" : "CRO IN PRODUCTION"}</p>
        <h2>{es ? <>No me quedo<br/>en la hipótesis.</> : <>I don&apos;t stop<br/>at the hypothesis.</>}</h2>
        <p>{es ? "Desarrollo la variante, protejo el lanzamiento y ayudo a convertir los tests ganadores en producto." : "I build the variant, protect the release and help winning tests become product."}</p>
        <a className="btn btn-red" href="#process">{es ? "Ver cómo trabajo" : "Explore my CRO work"} <span aria-hidden="true">↗</span></a>
        <small>{es ? "30–50 experimentos · Adobe Target · Monetate" : "30–50 experiments · Adobe Target · Monetate"}</small>
      </div>
      <CroArtwork locale={locale}/>
    </div>
    <div className="cro-proof"><div className="shell">{proof.map(([label,icon])=><div key={label as string}>{icon}<span>{label}</span></div>)}</div></div>
  </section>;
}
