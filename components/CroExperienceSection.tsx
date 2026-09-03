import Image from "next/image";

const MonitorIcon = () => <svg viewBox="0 0 28 24" aria-hidden="true"><rect x="2" y="2" width="18" height="14" rx="1"/><path d="M7 22h8M11 16v6M24 5v14M21 8l3-3 3 3"/></svg>;
const ShieldIcon = () => <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M14 2 24 6v7c0 6-4 10-10 13C8 23 4 19 4 13V6l10-4Z"/><path d="m9 14 3 3 7-8"/></svg>;
const GlobeIcon = () => <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="11"/><path d="M3 14h22M14 3c4 4 4 18 0 22M14 3c-4 4-4 18 0 22"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="11"/><path d="m9 14 3 3 7-8"/></svg>;

function CroArtwork({ locale }: { locale: "en" | "es" }) {
  return <div className="cro-stage" role="img" aria-label={locale === "es" ? "Capas de un experimento digital desde las variantes hasta la implementación permanente" : "Layers of a digital experiment from variants through permanent implementation"}>
    <Image className="cro-browser cro-layer" src="/assets/cro-experience/browser.svg" alt="" width={760} height={420} unoptimized/>
    <Image className="cro-mobile cro-layer" src="/assets/cro-experience/mobile.svg" alt="" width={240} height={430} unoptimized/>
    <Image className="cro-attention cro-layer" src="/assets/cro-experience/attention.svg" alt="" width={340} height={240} unoptimized/>
    <Image className="cro-code cro-layer" src="/assets/cro-experience/code.svg" alt="" width={310} height={220} unoptimized/>
    <Image className="cro-ticket cro-layer" src="/assets/cro-experience/ticket.svg" alt="" width={350} height={112} unoptimized/>
    <Image className="cro-live cro-layer" src="/assets/cro-experience/live.svg" alt="" width={270} height={76} unoptimized/>
    <Image className="cro-winner cro-layer" src="/assets/cro-experience/winner.svg" alt="" width={270} height={110} unoptimized/>
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
