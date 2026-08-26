"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "es";

const notes = [
  { n:"01", cats:["Front-end","Experimentation"], date:["May 12, 2024","12 may 2024"], mins:8, title:["Mutation Observers vs Polling: A Shootout for A/B Testing","Mutation Observers vs Polling: duelo para experimentos A/B"], desc:["Comparing event-driven observers and interval polling for DOM change detection in experiments. Spoiler: context matters more than fashion.","Comparativa entre observadores por eventos y polling para detectar cambios del DOM. Spoiler: el contexto importa más que la moda."], visual:"nodes" },
  { n:"02", cats:["CRO","Data"], date:["Apr 24, 2024","24 abr 2024"], mins:10, title:["Statistical Significance for Skeptics: When Flat Wins","Significancia estadística para escépticos: cuando no ganar es ganar"], desc:["Why “no winner” can be the right outcome—and how to trust it without needing a PhD.","Por qué «sin ganador» puede ser el resultado correcto y cómo confiar en él sin necesitar un doctorado."], visual:"chart" },
  { n:"03", cats:["UX Engineering","CRO"], date:["Apr 5, 2024","5 abr 2024"], mins:7, title:["The Squircle in Mobile CRO: Superellipses and Friction","La squircle en CRO móvil: superelipses y fricción"], desc:["How subtle geometry affects tappability, perception and conversion on small screens.","Cómo la geometría sutil afecta la interacción, la percepción y la conversión en pantallas pequeñas."], visual:"shape" },
  { n:"04", cats:["Front-end","SEO"], date:["Mar 18, 2024","18 mar 2024"], mins:6, title:["JSON-LD for Case Studies: Schema for UX Portfolios","JSON-LD para casos de estudio: schema para portfolios UX"], desc:["Making portfolio work machine-readable so it shows up better, looks richer and travels further.","Cómo hacer que un portfolio sea legible por máquinas para mejorar su visibilidad y alcance."], visual:"code" },
  { n:"05", cats:["Development","Audio"], date:["Feb 26, 2024","26 feb 2024"], mins:9, title:["ElevenLabs for Developers: Advanced SSML Narration Hacks","ElevenLabs para developers: técnicas avanzadas de narración SSML"], desc:["Going beyond basics: pacing, emphasis, prosody and fallbacks that actually sound human.","Más allá de lo básico: ritmo, énfasis, prosodia y alternativas que sí suenan humanas."], visual:"audio" },
];

const copy = {
  en:{search:"Search notes",all:"All",latest:"Latest notes",notes:"notes",updated:"Updated irregularly",list:"List",visual:"Visual",min:"min read",empty:"No notes match your search."},
  es:{search:"Buscar notas",all:"Todas",latest:"Notas recientes",notes:"notas",updated:"Actualizado sin calendario",list:"Lista",visual:"Visual",min:"min de lectura",empty:"No hay notas que coincidan con la búsqueda."}
};

function NoteVisual({type}:{type:string}) {
  if(type==="nodes") return <div className="note-visual nodes"><i>●</i><i>●</i><i>●</i><i>●</i><b>VS</b><span>◷</span></div>;
  if(type==="chart") return <div className="note-visual line-chart"><i /><i /><i /><strong>No winner.</strong></div>;
  if(type==="shape") return <div className="note-visual shapes"><i /><b>→</b><i /></div>;
  if(type==="code") return <div className="note-visual code-flow"><b>{"</>"}</b><span>→</span><i>@type<br/>name<br/>description</i><span>→</span><em>★ ＝</em></div>;
  return <div className="note-visual audio"><code>{"<speak>\n  Welcome to the test.\n</speak>"}</code><span>▂▅▇▃▆▂▅▇▅▂▇</span></div>;
}

export default function WritingIndex({locale,showTools=true,showNotes=true}:{locale:Locale;showTools?:boolean;showNotes?:boolean}) {
  const t=copy[locale], ix=locale==="en"?0:1;
  const [query,setQuery]=useState(""); const [filter,setFilter]=useState("All"); const [view,setView]=useState<"list"|"visual">("list");
  const filters=["All","Experimentation","UX Engineering","CRO","Front-end","Field notes"];
  const shown=useMemo(()=>notes.filter(note=>(filter==="All"||note.cats.includes(filter))&&(`${note.title[ix]} ${note.desc[ix]} ${note.cats.join(" ")}`).toLowerCase().includes(query.toLowerCase())),[filter,query,ix]);
  return <>
    {showTools&&<div className="writing-tools"><label className="search-box">⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search} aria-label={t.search}/></label><div className="filter-row">{filters.map(f=><button key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>{f==="All"?t.all:f}</button>)}</div><small>{shown.length} {t.notes} · {t.updated}</small></div>}
    {showNotes&&<section className="latest"><div className="latest-head"><h2>{t.latest}</h2><div><button className={view==="list"?"active":""} onClick={()=>setView("list")}>{t.list}</button><span>/</span><button className={view==="visual"?"active":""} onClick={()=>setView("visual")}>{t.visual}</button></div></div>
      <div className={`notes-list ${view}`}>{shown.map(note=><article className="note-row" key={note.n}><span className="note-number">{note.n}</span><div className="note-copy"><small>{note.cats.join("　·　")}</small><h3>{note.title[ix]}</h3><p>{note.desc[ix]}</p></div><div className="note-meta"><time>{note.date[ix]}</time><span>{note.mins} {t.min}</span></div><NoteVisual type={note.visual}/></article>)}</div>
      {!shown.length&&<p className="empty-notes">{t.empty}</p>}
    </section>}
  </>;
}
