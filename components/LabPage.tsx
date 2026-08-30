"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";

type Locale = "en" | "es";
type Category = "all" | "live" | "systems" | "experiments" | "utilities";

const copy = {
  en:{
    title:"Useful things, built from curiosity.", intro:"Tools, experiments and side projects made to solve real problems.", filters:{all:"All",live:"Live tools",systems:"Client systems",experiments:"Experiments",utilities:"Utilities"},
    open:"Open tool", preview:"View public preview", read:"Read how it works", concept:"View concept", featured:"Featured tool", updated:"Updated", live:"Live", development:"In development",
    seconds:"Test whether a message is understood in five seconds—before traffic, polish or persuasion hide the problem.",
    wedding:"A private invitation platform with a public event layer, personalized guest experiences and a complete operational dashboard.",
    invite:"Personalized invitations", inviteCopy:"Unique links, reserved places, envelope animation and RSVP flows.", rsvp:"RSVP & guest operations", rsvpCopy:"Confirmations, released places, messages, exports and activity history.",
    notebook:"Open notebook", notebookCopy:"Unfinished experiments, useful fragments and ideas that did not need to become products.", browse:"Browse the notes",
    cta:"Have a tool idea or a product problem?", ctaCopy:"I build practical interfaces and experiments that turn unclear problems into something useful.", talk:"Let’s talk",
  },
  es:{
    title:"Cosas útiles, construidas desde la curiosidad.", intro:"Herramientas, experimentos y proyectos paralelos creados para resolver problemas reales.", filters:{all:"Todo",live:"Herramientas live",systems:"Sistemas",experiments:"Experimentos",utilities:"Utilidades"},
    open:"Abrir herramienta", preview:"Ver vista pública", read:"Ver cómo funciona", concept:"Ver concepto", featured:"Herramienta destacada", updated:"Actualizado", live:"Live", development:"En desarrollo",
    seconds:"Comprueba si un mensaje se entiende en cinco segundos, antes de que el tráfico, el acabado o la persuasión oculten el problema.",
    wedding:"Una plataforma privada de invitaciones con página pública, experiencias personalizadas y un panel operativo completo.",
    invite:"Invitaciones personalizadas", inviteCopy:"Enlaces únicos, cupos reservados, animación de sobre y flujos RSVP.", rsvp:"RSVP y gestión de invitados", rsvpCopy:"Confirmaciones, cupos liberados, mensajes, exportaciones e historial de actividad.",
    notebook:"Cuaderno abierto", notebookCopy:"Experimentos sin terminar, fragmentos útiles e ideas que no necesitaban convertirse en productos.", browse:"Explorar las notas",
    cta:"¿Tienes una idea de herramienta o un problema de producto?", ctaCopy:"Construyo interfaces y experimentos prácticos que convierten problemas poco claros en algo útil.", talk:"Hablemos",
  },
};

const tools = [
  {id:"font",number:"02",category:"utilities" as const,status:"live",name:{en:"Font Tester",es:"Probador de tipografías"},description:{en:"Compare typefaces with real content, fine-tune size and spacing, and test readability.",es:"Compara tipografías con contenido real, ajusta tamaño y espaciado y prueba la legibilidad."},image:"/assets/project-previews/font-tester.webp",href:"https://fonts.josuesomarribas.com/?color=%23111111&bgColor=%23ffffff"},
  {id:"audio",number:"03",category:"utilities" as const,status:"live",name:{en:"Local Blog Audio Generator",es:"Generador local de audio"},description:{en:"Generate natural-sounding article narration locally, privately and without a per-use fee.",es:"Genera narraciones naturales de artículos localmente, con privacidad y sin coste por uso."},image:"/assets/writing-editorial/06-ssml-audio.svg",href:"/blog/how-i-generate-natural-blog-audio-locally-for-free"},
  {id:"duration",number:"04",category:"experiments" as const,status:"concept",name:{en:"A/B Duration Calculator",es:"Calculadora de duración A/B"},description:{en:"Estimate the sample and running time an experiment needs before committing traffic.",es:"Estima la muestra y el tiempo que necesita un experimento antes de comprometer tráfico."},image:"/assets/process/02-frame.svg",href:"/blog/complete-guide-to-ab-testing-cro-experimentation"},
  {id:"fouc",number:"05",category:"experiments" as const,status:"concept",name:{en:"FOUC Simulator",es:"Simulador de FOUC"},description:{en:"See how content flicker contaminates perception, behavior and experiment validity.",es:"Observa cómo el parpadeo contamina la percepción, el comportamiento y la validez del experimento."},image:"/assets/writing-editorial/01-fouc-original-flicker-variant.svg",href:"/blog/the-cost-of-fouc-how-content-flicker-kills-test-validity"},
  {id:"concat",number:"06",category:"utilities" as const,status:"live",name:{en:"URL Concat Tool",es:"Generador masivo de URLs"},description:{en:"Turn Excel or CSV rows into parameterized URLs from a reusable template. Files stay entirely inside the browser.",es:"Convierte filas de Excel o CSV en URLs parametrizadas usando una plantilla reutilizable. Los archivos permanecen en el navegador."},image:"/assets/lab/concat.webp",href:"https://concat.josuesomarribas.com/"},
  {id:"utm",number:"07",category:"utilities" as const,status:"live",name:{en:"UTM Builder & Validator",es:"Generador y validador UTM"},description:{en:"Build campaign URLs, detect naming and encoding problems, and preview how their values will appear in GA4.",es:"Crea enlaces de campaña, detecta problemas de nomenclatura y encoding y previsualiza sus valores en GA4."},image:"/assets/lab/utm-builder.webp",href:"https://utm.josuesomarribas.com/"},
  {id:"debug",number:"08",category:"utilities" as const,status:"live",name:{en:"Browser Debug Report",es:"Informe de depuración del navegador"},description:{en:"Capture viewport, screen, browser, input and preference details in one report that is ready to share with a developer.",es:"Recopila viewport, pantalla, navegador, métodos de entrada y preferencias en un informe listo para compartir con un desarrollador."},image:"/assets/lab/browser-debug.webp",href:"https://debug.josuesomarribas.com/"},
];

export default function LabPage({ locale="en" }:{ locale?:Locale }) {
  const t = copy[locale];
  const [filter,setFilter] = useState<Category>("all");
  const visibleTools = useMemo(() => tools.filter(tool => filter === "all" || tool.category === filter || (filter === "live" && tool.status === "live")),[filter]);
  const filters = Object.entries(t.filters) as [Category,string][];

  return <main className="labx-page">
    <header className="labx-header"><SiteNav locale={locale} current="lab"/></header>

    <section className="labx-hero shell">
      <div className="labx-hero-copy"><p>LAB / 01</p><strong aria-hidden="true">LAB</strong><h1>{t.title}</h1><i/><p>{t.intro}</p><small>JOSUE SOMARRIBAS · UX ENGINEER · CRO DEVELOPER</small></div>
      <div className="labx-hero-art" role="img" aria-label={locale === "es" ? "Capas de un blueprint, una consola de experimentación y tarjetas de métricas" : "Layered blueprint, experimentation console and metric cards"}>
        <Image className="labx-layer labx-blueprint" src="/assets/lab/hero-blueprint.webp" alt="" width={1536} height={1024} priority unoptimized/>
        <Image className="labx-layer labx-console" src="/assets/lab/hero-console.webp" alt="" width={1536} height={1024} priority unoptimized/>
        <Image className="labx-layer labx-metrics" src="/assets/lab/hero-metrics.webp" alt="" width={1536} height={1024} priority unoptimized/>
      </div>
    </section>

    <div className="labx-catalog shell">
      <nav className="labx-filters" aria-label={locale === "es" ? "Filtrar herramientas" : "Filter tools"}>{filters.map(([value,label])=><button key={value} type="button" className={filter===value?"active":""} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{label}</button>)}</nav>

      {(filter === "all" || filter === "live") && <article className="labx-featured">
        <div className="labx-featured-copy"><p><span>01</span>{t.featured}</p><h2>5 Seconds Tester</h2><p>{t.seconds}</p><dl><div><dt>STATUS</dt><dd><i/>{t.live}</dd></div><div><dt>TECH</dt><dd>Next.js · TypeScript · Vercel</dd></div></dl><a href="https://www.fivesecondtester.com/" target="_blank" rel="noreferrer">{t.open} <span aria-hidden="true">→</span></a></div>
        <a className="labx-featured-image" href="https://www.fivesecondtester.com/" target="_blank" rel="noreferrer" aria-label={`${t.open}: 5 Seconds Tester`}><Image src="/assets/project-previews/5-seconds-tester.webp" alt="5 Seconds Tester interface" fill sizes="(max-width: 760px) calc(100vw - 48px), 58vw" unoptimized/></a>
      </article>}

      {(filter === "all" || filter === "systems") && <article className="labx-wedding">
        <div className="labx-wedding-copy"><p>PRIVATE PLATFORM · ADVANCED BUILD</p><h2>Comparte el Momento</h2><span>DIGITAL EVENT INVITATIONS</span><p>{t.wedding}</p><ul><li><b>{t.invite}</b><span>{t.inviteCopy}</span></li><li><b>{t.rsvp}</b><span>{t.rsvpCopy}</span></li></ul><small>Next.js 16 · React 19 · TypeScript · Neon · Drizzle</small><div><em><i/>{t.development}</em><a href="https://www.comparteelmomento.com/" target="_blank" rel="noreferrer">{t.preview} <span aria-hidden="true">↗</span></a></div></div>
        <div className="labx-wedding-art" role="img" aria-label={locale === "es" ? "Portada pública de la boda y panel anónimo de gestión de invitados" : "Public wedding page and anonymous guest-management dashboard"}>
          <Image className="labx-wedding-public" src="/assets/lab/comparte-public.webp" alt="" width={1440} height={900} loading="eager" unoptimized/>
          <Image className="labx-wedding-admin" src="/assets/lab/comparte-admin.webp" alt="" width={1536} height={1024} loading="eager" unoptimized/>
        </div>
      </article>}

      {!!visibleTools.length && <section className="labx-tool-grid" aria-label={locale === "es" ? "Herramientas y experimentos" : "Tools and experiments"}>{visibleTools.map(tool=><article key={tool.id}>
        <header><b>{tool.number}</b><span>{tool.category === "utilities" ? t.filters.utilities : t.filters.experiments}</span></header>
        <div className="labx-tool-image"><Image src={tool.image} alt="" fill sizes="(max-width: 760px) calc(100vw - 48px), 25vw" loading="eager" unoptimized/></div>
        <h2>{tool.name[locale]}</h2><p>{tool.description[locale]}</p><a href={tool.href} target={tool.href.startsWith("http")?"_blank":undefined} rel={tool.href.startsWith("http")?"noreferrer":undefined}>{tool.status === "concept" ? t.concept : tool.id === "audio" ? t.read : t.open} <span aria-hidden="true">→</span></a>
      </article>)}</section>}

      <aside className="labx-notebook"><span aria-hidden="true">▱</span><div><h2>{t.notebook}</h2><p>{t.notebookCopy}</p></div><a href={locale === "es" ? "/es/blog" : "/blog"}>{t.browse} <span aria-hidden="true">→</span></a></aside>
      <section className="labx-cta"><span aria-hidden="true">⌁</span><div><h2>{t.cta}</h2><p>{t.ctaCopy}</p></div><a className="btn btn-red" href="mailto:josuesomarribasb@gmail.com">{t.talk} <span aria-hidden="true">→</span></a></section>
    </div>
    <SiteFooter locale={locale} current="lab"/>
  </main>;
}
