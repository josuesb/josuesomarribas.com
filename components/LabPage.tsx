"use client";

import { Button, ButtonLink, TextLink } from "./ui/Action";

import Image from "next/image";
import { useMemo, useState } from "react";
import { labTools } from "../lib/lab-tools";
import SiteFooter from "./SiteFooter";

type Locale = "en" | "es";
type Category = "all" | "live" | "systems" | "experiments" | "utilities";

const copy = {
  en:{
    title:"Useful things, built from curiosity.", intro:"Tools, experiments and side projects made to solve real problems.", filters:{all:"All",live:"Live tools",systems:"Client systems",experiments:"Experiments",utilities:"Utilities"},
    open:"Open tool", details:"View details", preview:"View public preview", read:"Read how it works", concept:"View concept", featured:"Featured tool", updated:"Updated", live:"Live", development:"In development",
    seconds:"Test whether a message is understood in five seconds—before traffic, polish or persuasion hide the problem.",
    wedding:"A private invitation platform with a public event layer, personalized guest experiences and a complete operational dashboard.",
    invite:"Personalized invitations", inviteCopy:"Unique links, reserved places, envelope animation and RSVP flows.", rsvp:"RSVP & guest operations", rsvpCopy:"Confirmations, released places, messages, exports and activity history.",
    notebook:"Open notebook", notebookCopy:"Unfinished experiments, useful fragments and ideas that did not need to become products.", browse:"Browse the notes",
    cta:"Have a tool idea or a product problem?", ctaCopy:"I build practical interfaces and experiments that turn unclear problems into something useful.", talk:"Let’s talk",
  },
  es:{
    title:"Cosas útiles, construidas desde la curiosidad.", intro:"Herramientas, experimentos y proyectos paralelos creados para resolver problemas reales.", filters:{all:"Todo",live:"Herramientas live",systems:"Sistemas",experiments:"Experimentos",utilities:"Utilidades"},
    open:"Abrir herramienta", details:"Ver ficha", preview:"Ver vista pública", read:"Ver cómo funciona", concept:"Ver concepto", featured:"Herramienta destacada", updated:"Actualizado", live:"Live", development:"En desarrollo",
    seconds:"Comprueba si un mensaje se entiende en cinco segundos, antes de que el tráfico, el acabado o la persuasión oculten el problema.",
    wedding:"Una plataforma privada de invitaciones con página pública, experiencias personalizadas y un panel operativo completo.",
    invite:"Invitaciones personalizadas", inviteCopy:"Enlaces únicos, cupos reservados, animación de sobre y flujos RSVP.", rsvp:"RSVP y gestión de invitados", rsvpCopy:"Confirmaciones, cupos liberados, mensajes, exportaciones e historial de actividad.",
    notebook:"Cuaderno abierto", notebookCopy:"Experimentos sin terminar, fragmentos útiles e ideas que no necesitaban convertirse en productos.", browse:"Explorar las notas",
    cta:"¿Tienes una idea de herramienta o un problema de producto?", ctaCopy:"Construyo interfaces y experimentos prácticos que convierten problemas poco claros en algo útil.", talk:"Hablemos",
  },
};

export default function LabPage({ locale="en" }:{ locale?:Locale }) {
  const t = copy[locale];
  const [filter,setFilter] = useState<Category>("all");
  const visibleTools = useMemo(() => labTools.filter(tool => tool.number !== "01" && (filter === "all" || tool.category === filter || (filter === "live" && tool.status === "live"))),[filter]);
  const filters = Object.entries(t.filters) as [Category,string][];

  return <main className="labx-page">
    

    <section className="labx-hero shell">
      <div className="labx-hero-copy"><p>LAB / 01</p><strong aria-hidden="true">LAB</strong><h1>{t.title}</h1><i/><p>{t.intro}</p><small>JOSUE SOMARRIBAS · UX ENGINEER · CRO DEVELOPER</small></div>
      <div className="labx-hero-art" role="img" aria-label={locale === "es" ? "Capas de un blueprint, una consola de experimentación y tarjetas de métricas" : "Layered blueprint, experimentation console and metric cards"}>
        <Image className="labx-layer labx-blueprint" src="/assets/lab/hero-blueprint.webp" alt="" width={1536} height={1024} priority unoptimized/>
        <Image className="labx-layer labx-console" src="/assets/lab/hero-console.webp" alt="" width={1536} height={1024} priority unoptimized/>
        <Image className="labx-layer labx-metrics" src="/assets/lab/hero-metrics.webp" alt="" width={1536} height={1024} priority unoptimized/>
      </div>
    </section>

    <div className="labx-catalog shell">
      <nav className="labx-filters" aria-label={locale === "es" ? "Filtrar herramientas" : "Filter tools"}>{filters.map(([value,label])=><Button variant="secondary" size="small" key={value} type="button" className={filter===value?"active":""} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{label}</Button>)}</nav>

      {(filter === "all" || filter === "live") && <article className="labx-featured">
        <div className="labx-featured-copy"><p><span>01</span>{t.featured}</p><h2>5 Seconds Tester</h2><p>{t.seconds}</p><dl><div><dt>STATUS</dt><dd><i/>{t.live}</dd></div><div><dt>TECH</dt><dd>Next.js · TypeScript · Vercel</dd></div></dl><ButtonLink variant="secondary" href={`${locale === "es" ? "/es" : ""}/lab/five-seconds-tester`}>{t.details}</ButtonLink></div>
        <a className="labx-featured-image" href={`${locale === "es" ? "/es" : ""}/lab/five-seconds-tester`} aria-label={`${t.details}: 5 Seconds Tester`}><Image src="/assets/project-previews/5-seconds-tester.webp" alt="5 Seconds Tester interface" fill sizes="(max-width: 760px) calc(100vw - 48px), 58vw" unoptimized/></a>
      </article>}

      {(filter === "all" || filter === "systems") && <article className="labx-wedding">
        <div className="labx-wedding-copy"><p>PRIVATE PLATFORM · ADVANCED BUILD</p><h2>Comparte el Momento</h2><span>DIGITAL EVENT INVITATIONS</span><p>{t.wedding}</p><ul><li><b>{t.invite}</b><span>{t.inviteCopy}</span></li><li><b>{t.rsvp}</b><span>{t.rsvpCopy}</span></li></ul><small>Next.js 16 · React 19 · TypeScript · Neon · Drizzle</small><div><em><i/>{t.development}</em><TextLink href="https://www.comparteelmomento.com/" target="_blank" rel="noreferrer">{t.preview}</TextLink></div></div>
        <div className="labx-wedding-art" role="img" aria-label={locale === "es" ? "Portada pública de la boda y panel anónimo de gestión de invitados" : "Public wedding page and anonymous guest-management dashboard"}>
          <Image className="labx-wedding-public" src="/assets/lab/comparte-public.webp" alt="" width={1440} height={900} loading="eager" unoptimized/>
          <Image className="labx-wedding-admin" src="/assets/lab/comparte-admin.webp" alt="" width={1536} height={1024} loading="eager" unoptimized/>
        </div>
      </article>}

      {!!visibleTools.length && <section className="labx-tool-grid" aria-label={locale === "es" ? "Herramientas y experimentos" : "Tools and experiments"}>{visibleTools.map(tool=><article key={tool.id}>
        <header><b>{tool.number}</b><span>{tool.category === "utilities" ? t.filters.utilities : t.filters.experiments}</span></header>
        <div className="labx-tool-image"><Image src={tool.image} alt="" fill sizes="(max-width: 760px) calc(100vw - 48px), 25vw" loading="eager" unoptimized/></div>
        <h2>{tool.name[locale]}</h2><p>{tool.description[locale]}</p><TextLink href={tool.landingUrl?.[locale] ?? `${locale === "es" ? "/es" : ""}/lab/${tool.slug}`}>{t.details}</TextLink>
      </article>)}</section>}

      <aside className="labx-notebook"><span aria-hidden="true">▱</span><div><h2>{t.notebook}</h2><p>{t.notebookCopy}</p></div><TextLink href={locale === "es" ? "/es/blog" : "/blog"}>{t.browse}</TextLink></aside>
      <section className="labx-cta"><span aria-hidden="true">⌁</span><div><h2>{t.cta}</h2><p>{t.ctaCopy}</p></div><ButtonLink href="mailto:josuesomarribasb@gmail.com">{t.talk} </ButtonLink></section>
    </div>
    <SiteFooter locale={locale} current="lab"/>
  </main>;
}
