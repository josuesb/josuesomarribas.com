import Image from "next/image";
import Link from "next/link";
import { labTools, type LabLocale, type LabTool } from "../lib/lab-tools";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";

const text = {
  en:{lab:"Lab",live:"Live tool",concept:"Concept",open:"Open tool",article:"Read the field note",problem:"The problem",does:"What it does",architecture:"Privacy & architecture",limits:"Known limits",built:"Built with",back:"Back to all tools",next:"Explore another tool"},
  es:{lab:"Laboratorio",live:"Herramienta live",concept:"Concepto",open:"Abrir herramienta",article:"Leer la nota",problem:"El problema",does:"Qué hace",architecture:"Privacidad y arquitectura",limits:"Límites conocidos",built:"Construido con",back:"Volver a todas las herramientas",next:"Explorar otra herramienta"},
};

export default function LabToolDetailPage({ tool, locale }:{tool:LabTool;locale:LabLocale}) {
  const t = text[locale];
  const base = locale === "es" ? "/es/lab" : "/lab";
  const index = Number(tool.number) % 8;
  const nextTool = labTools[index];
  const primaryUrl = tool.externalUrl ?? tool.articleUrl?.[locale];
  const structuredData = tool.status === "live" ? {
    "@context":"https://schema.org", "@type":"SoftwareApplication", name:tool.name[locale], description:tool.description[locale], applicationCategory:tool.category === "utilities" ? "UtilitiesApplication" : "BusinessApplication", operatingSystem:"Web", url:tool.externalUrl ?? `https://www.josuesomarribas.com${base}/${tool.slug}`, author:{"@type":"Person",name:"Josue Somarribas",url:"https://www.josuesomarribas.com"}, offers:{"@type":"Offer",price:"0",priceCurrency:"USD"},
  } : {"@context":"https://schema.org","@type":"CreativeWork",name:tool.name[locale],description:tool.description[locale],author:{"@type":"Person",name:"Josue Somarribas"}};

  return <main className="labx-page labd-page">
    <header className="labx-header"><SiteNav locale={locale} current="lab"/></header>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
    <section className="labd-hero shell">
      <div className="labd-hero-copy">
        <Link className="labd-back" href={base}>← {t.lab}</Link>
        <p className="labd-kicker">LAB / {tool.number} · {tool.status === "live" ? t.live : t.concept}</p>
        <h1>{tool.name[locale]}</h1>
        <p className="labd-deck">{tool.description[locale]}</p>
        {primaryUrl && <div className="labd-actions"><a className="btn btn-red" href={primaryUrl} target={tool.externalUrl ? "_blank" : undefined} rel={tool.externalUrl ? "noreferrer" : undefined}>{tool.externalUrl ? t.open : t.article} <span aria-hidden="true">↗</span></a></div>}
      </div>
      <figure className="labd-visual"><Image src={tool.image} alt={tool.imageAlt[locale]} fill priority sizes="(max-width: 800px) calc(100vw - 30px), 54vw" unoptimized/><figcaption>{tool.number} / {tool.category.toUpperCase()}</figcaption></figure>
    </section>
    <div className="labd-body shell">
      <section className="labd-problem"><p>01 / CONTEXT</p><h2>{t.problem}</h2><p>{tool.problem[locale]}</p></section>
      <section className="labd-features"><p>02 / CAPABILITIES</p><h2>{t.does}</h2><ol>{tool.features[locale].map((feature,index)=><li key={feature}><span>0{index+1}</span><p>{feature}</p></li>)}</ol></section>
      <div className="labd-details">
        <section><p>03 / SYSTEM</p><h2>{t.architecture}</h2><p>{tool.architecture[locale]}</p><h3>{t.built}</h3><ul className="labd-stack">{tool.stack.map(item=><li key={item}>{item}</li>)}</ul></section>
        <section><p>04 / HONEST NOTES</p><h2>{t.limits}</h2><ul className="labd-limits">{tool.limits[locale].map(item=><li key={item}>{item}</li>)}</ul></section>
      </div>
      <nav className="labd-next"><Link href={base}>← {t.back}</Link><Link href={`${base}/${nextTool.slug}`}><small>{t.next}</small>{nextTool.name[locale]} <span aria-hidden="true">→</span></Link></nav>
    </div>
    <SiteFooter locale={locale} current="lab"/>
  </main>;
}
