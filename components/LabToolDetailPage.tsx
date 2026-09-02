import Image from "next/image";
import { labTools, type LabLocale, type LabTool } from "../lib/lab-tools";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";

const text = {
  en:{lab:"Lab",live:"Live tool",concept:"Concept",open:"Open tool",article:"Read the field note",problem:"The problem",does:"Capabilities",architecture:"Privacy & architecture",limits:"Known limits",built:"Technologies",back:"Back to all tools",next:"Explore another tool",status:"Status",online:"Online",preview:"Product preview",context:"Context",capabilities:"Capabilities",system:"System",notes:"Honest notes"},
  es:{lab:"Laboratorio",live:"Herramienta live",concept:"Concepto",open:"Abrir herramienta",article:"Leer la nota",problem:"El problema",does:"Capacidades",architecture:"Privacidad y arquitectura",limits:"Límites conocidos",built:"Tecnologías",back:"Volver a todas las herramientas",next:"Explorar otra herramienta",status:"Estado",online:"Online",preview:"Vista del producto",context:"Contexto",capabilities:"Capacidades",system:"Sistema",notes:"Notas honestas"},
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
        <a className="labd-back" href={base}>← {t.lab}</a>
        <p className="labd-kicker">LAB / {tool.number} · {tool.status === "live" ? t.live : t.concept}</p>
        <h1>{tool.name[locale]}</h1>
        <p className="labd-deck">{tool.description[locale]}</p>
        {primaryUrl && <div className="labd-actions"><a className="btn btn-red" href={primaryUrl} target={tool.externalUrl ? "_blank" : undefined} rel={tool.externalUrl ? "noreferrer" : undefined}>{tool.externalUrl ? t.open : t.article} <span aria-hidden="true">↗</span></a></div>}
        <p className="labd-meta"><span>{tool.status === "live" ? t.live : t.concept}</span><span>{t.status}: <b>{tool.status === "live" ? t.online : t.concept}</b></span><span>ID: LAB—{tool.number}</span></p>
      </div>
      <figure className="labd-visual"><div className="labd-preview-head"><span>{t.preview}</span><span>{tool.name[locale]}</span></div><div className="labd-visual-frame"><Image src={tool.image} alt={tool.imageAlt[locale]} fill priority sizes="(max-width: 800px) calc(100vw - 30px), 54vw" unoptimized/></div><figcaption>{tool.number} / {tool.category.toUpperCase()}</figcaption></figure>
    </section>
    <div className="labd-body shell">
      <section className="labd-problem"><p>01 / {t.context}</p><h2>{t.problem}</h2><div className="labd-context-mark" aria-hidden="true"><strong>{tool.number}</strong><span>LAB<br/>NOTE</span></div><p>{tool.problem[locale]}</p></section>
      <section className="labd-features"><p>02 / {t.capabilities}</p><h2>{t.does}</h2><ol>{tool.features[locale].map((feature,index)=><li key={feature}><span>0{index+1}</span><p>{feature}</p></li>)}</ol></section>
      <section className="labd-tech"><p>{t.built}</p><ul>{tool.stack.map((item,index)=><li key={item}><span aria-hidden="true">{["◇","□","⌁","△"][index%4]}</span>{item}</li>)}</ul>{primaryUrl && <a href={primaryUrl} target={tool.externalUrl ? "_blank" : undefined} rel={tool.externalUrl ? "noreferrer" : undefined}>{tool.externalUrl ? t.open : t.article} ↗</a>}</section>
      <div className="labd-details">
        <section><p>03 / {t.system}</p><h2>{t.architecture}</h2><p>{tool.architecture[locale]}</p></section>
        <section><p>04 / {t.notes}</p><h2>{t.limits}</h2><ul className="labd-limits">{tool.limits[locale].map(item=><li key={item}>{item}</li>)}</ul></section>
      </div>
      <nav className="labd-next"><a href={base}>← {t.back}</a><a href={`${base}/${nextTool.slug}`}><small>{t.next}</small>{nextTool.name[locale]} <span aria-hidden="true">→</span></a></nav>
    </div>
    <SiteFooter locale={locale} current="lab"/>
  </main>;
}
