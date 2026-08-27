"use client";

import { useMemo, useState } from "react";
import type { ArticleMeta } from "../../lib/content";
import { editorialImage } from "../../lib/editorial-assets";

type Locale = "en" | "es";

const INITIAL_ARCHIVE_SIZE = 7;
const LOAD_MORE_SIZE = 8;
const FEATURED_SLUGS = [
  "the-cost-of-fouc-how-content-flicker-kills-test-validity",
  "json-ld-for-case-studies-specific-schema-for-ux-portfolios",
  "the-squircle-in-mobile-cro-superellipses-and-cognitive-friction",
];

const copy = {
  en: {
    search:"Search articles", all:"All topics", featured:"Start here", archive:"Latest notes",
    notes:"articles", updated:"New notes, published irregularly", min:"min read",
    empty:"No articles match your search.", more:"Load more articles", showing:"Showing",
  },
  es: {
    search:"Buscar artículos", all:"Todos los temas", featured:"Empieza aquí", archive:"Últimas notas",
    notes:"artículos", updated:"Nuevas notas, sin calendario fijo", min:"min de lectura",
    empty:"No hay artículos que coincidan con la búsqueda.", more:"Cargar más artículos", showing:"Mostrando",
  },
};

const clusterLabels: Record<string, Record<Locale, string>> = {
  "framer-cms-technical-seo": { en:"Framer & SEO", es:"Framer y SEO" },
  "cro-ab-testing-experimentation": { en:"CRO & Experiments", es:"CRO y experimentos" },
  "ui-ux-writing-interface-clarity": { en:"Interface design", es:"Diseño de interfaces" },
  "ux-research-product-thinking": { en:"User research", es:"Investigación de usuarios" },
  "ai-search-geo-visibility": { en:"AI search", es:"Búsqueda con IA" },
  "hospitality-airbnb-service-design": { en:"Hospitality UX", es:"UX y hospitalidad" },
  "ai-design-creativity-judgment": { en:"AI & design", es:"IA y diseño" },
  "portfolio-projects-case-studies": { en:"Case studies", es:"Casos de estudio" },
};

function readingMinutes(article: ArticleMeta) {
  return Math.max(4, Math.round((article.description.length + article.title.length) / 35));
}

function clusterLabel(cluster: string, locale: Locale) {
  return clusterLabels[cluster]?.[locale] ?? cluster.replaceAll("-", " ");
}

function articleHref(article: ArticleMeta, locale: Locale) {
  return `${locale === "es" ? "/es" : ""}/writing/${article.slug}`;
}

export default function WritingIndex({ locale, articles }:{ locale:Locale; articles:ArticleMeta[] }) {
  const t = copy[locale];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_ARCHIVE_SIZE);
  const filters = useMemo(() => ["All", ...Array.from(new Set(articles.map(article => article.cluster).filter(Boolean)))], [articles]);
  const isBrowsing = filter !== "All" || query.trim().length > 0;
  const matches = useMemo(() => articles.filter(article =>
    (filter === "All" || article.cluster === filter) &&
    `${article.title} ${article.description} ${article.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  ), [articles, filter, query]);
  const featured = isBrowsing ? [] : FEATURED_SLUGS.map(slug => articles.find(article => article.slug === slug)).filter((article): article is ArticleMeta => Boolean(article));
  const featuredSlugs = new Set(featured.map(article => article.slug));
  const archive = isBrowsing ? matches : matches.filter(article => !featuredSlugs.has(article.slug));
  const visible = archive.slice(0, visibleCount);

  const chooseFilter = (value: string) => {
    setFilter(value);
    setVisibleCount(INITIAL_ARCHIVE_SIZE);
  };

  return <div className="writing-index-v2">
    <div className="writing-tools">
      <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={event => { setQuery(event.target.value); setVisibleCount(INITIAL_ARCHIVE_SIZE); }} placeholder={t.search} aria-label={t.search}/></label>
      <small>{matches.length} {t.notes} · {t.updated}</small>
      <div className="filter-row" aria-label={locale === "es" ? "Filtrar por tema" : "Filter by topic"}>{filters.map(value => <button type="button" key={value} className={filter === value ? "active" : ""} onClick={() => chooseFilter(value)}>{value === "All" ? t.all : clusterLabel(value, locale)}</button>)}</div>
    </div>

    {!!featured.length && <section className="featured-articles" aria-labelledby="featured-heading">
      <div className="latest-head"><p>{t.featured}</p><span>{locale === "es" ? "Una selección para conocer mi forma de pensar y trabajar." : "A selection that shows how I think and work."}</span></div>
      <div className="featured-grid">{featured.map((article, index) => <a className={`featured-card featured-card-${index + 1}`} href={articleHref(article, locale)} key={article.slug}>
        <span className="featured-cover" aria-hidden="true" style={{ backgroundImage:`url(${editorialImage(article.slug, article.image)})` }}/>
        <div><small>{clusterLabel(article.cluster, locale)}</small><h2>{article.title}</h2><p>{article.description}</p><span className="read-meta">{readingMinutes(article)} {t.min} <b aria-hidden="true">↗</b></span></div>
      </a>)}</div>
    </section>}

    <section className="latest" aria-labelledby="archive-heading">
      <div className="archive-head"><div><h2 id="archive-heading">{isBrowsing ? (locale === "es" ? "Resultados" : "Results") : t.archive}</h2><p>{isBrowsing ? `${matches.length} ${t.notes}` : (locale === "es" ? "Notas breves, guías y aprendizajes desde el trabajo." : "Field notes, practical guides and lessons from the work.")}</p></div><div className="archive-view" aria-hidden="true"><span>List</span><i>/</i><span>Visual</span></div></div>
      <div className="notes-list">{visible.map((article, index) => <a className="note-row" href={articleHref(article, locale)} key={article.slug} aria-label={article.title}>
        <span className="note-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="note-copy"><small>{clusterLabel(article.cluster, locale)}</small><h3>{article.title}</h3><p>{article.description}</p></div>
        <div className="note-meta"><time dateTime={article.date}>{new Intl.DateTimeFormat(locale, { dateStyle:"medium" }).format(new Date(article.date))}</time><span>{readingMinutes(article)} {t.min}</span><b aria-hidden="true">↗</b></div>
        <span className="article-cover" aria-hidden="true" style={{ backgroundImage:`url(${editorialImage(article.slug, article.image)})` }}/>
      </a>)}</div>
      {visible.length < archive.length && <button className="load-more" type="button" onClick={() => setVisibleCount(count => count + LOAD_MORE_SIZE)}>{t.more} <span aria-hidden="true">↓</span></button>}
      {!archive.length && <p className="empty-notes">{t.empty}</p>}
    </section>
  </div>;
}
