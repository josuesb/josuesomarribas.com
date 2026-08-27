"use client";

import { useMemo, useState } from "react";
import type { ArticleMeta } from "../../lib/content";

type Locale = "en" | "es";
const copy = {
  en: { search:"Search articles", all:"All", latest:"Latest articles", notes:"articles", updated:"Updated irregularly", min:"min read", empty:"No articles match your search." },
  es: { search:"Buscar artículos", all:"Todos", latest:"Artículos recientes", notes:"artículos", updated:"Actualizado sin calendario", min:"min de lectura", empty:"No hay artículos que coincidan con la búsqueda." },
};

function readingMinutes(article: ArticleMeta) {
  return Math.max(4, Math.round((article.description.length + article.title.length) / 35));
}

export default function WritingIndex({ locale, articles }:{ locale:Locale; articles:ArticleMeta[] }) {
  const t = copy[locale];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = useMemo(() => ["All", ...Array.from(new Set(articles.map(article => article.cluster).filter(Boolean)))], [articles]);
  const shown = useMemo(() => articles.filter(article =>
    (filter === "All" || article.cluster === filter) &&
    `${article.title} ${article.description} ${article.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  ), [articles, filter, query]);

  return <>
    <div className="writing-tools">
      <label className="search-box">⌕<input value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search}/></label>
      <div className="filter-row">{filters.map(value => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{value === "All" ? t.all : value}</button>)}</div>
      <small>{shown.length} {t.notes} · {t.updated}</small>
    </div>
    <section className="latest">
      <div className="latest-head"><h2>{t.latest}</h2></div>
      <div className="notes-list visual">{shown.map((article, index) => {
        const href = `${locale === "es" ? "/es" : ""}/writing/${article.slug}`;
        return <a className="note-row" href={href} key={article.slug} aria-label={article.title}>
          <span className="note-number">{String(index + 1).padStart(2, "0")}</span>
          <div className="note-copy">
            <small>{article.cluster || article.tags.slice(0, 2).join(" · ")}</small>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </div>
          <div className="note-meta"><time dateTime={article.date}>{new Intl.DateTimeFormat(locale, { dateStyle:"medium" }).format(new Date(article.date))}</time><span>{readingMinutes(article)} {t.min}</span></div>
          <span className="article-cover" aria-hidden="true" style={{ backgroundImage:`url(${article.image})` }}/>
        </a>;
      })}</div>
      {!shown.length && <p className="empty-notes">{t.empty}</p>}
    </section>
  </>;
}
