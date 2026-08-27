import Image from "next/image";
import Link from "next/link";
import type { Article } from "../../lib/content";
import ArticleTools from "./ArticleTools";

function plainText(value:string) { return value.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, " ").trim(); }
function headingId(value:string) { return plainText(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function prepareBody(body:string) {
  const headings:{ id:string; label:string }[] = [];
  const used = new Set<string>();
  const html = body.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attributes, content) => {
    let id = headingId(content) || "section"; let suffix = 2;
    while (used.has(id)) id = `${id}-${suffix++}`; used.add(id);
    headings.push({ id, label:plainText(content) });
    return `<h2${attributes} id="${id}">${content}</h2>`;
  });
  return { html, headings };
}

export default function ArticlePage({ article, locale }:{ article:Article; locale:"en"|"es" }) {
  const indexHref = locale === "es" ? "/es/writing" : "/writing";
  const home = locale === "es" ? "/es" : "/";
  const { html, headings } = prepareBody(article.body);
  const minutes = Math.max(1, Math.ceil(plainText(article.body).split(/\s+/).length / 220));
  const labels = locale === "es"
    ? { writing:"Artículos", back:"Volver a artículos", note:"Este artículo todavía está disponible únicamente en inglés.", talk:"Hablemos", compare:"¿Comparamos notas?", conversation:"Iniciar conversación", contents:"EN ESTE ARTÍCULO", share:"COMPARTIR" }
    : { writing:"Writing", back:"Back to Writing", note:"", talk:"Let’s talk", compare:"Want to compare notes?", conversation:"Start a conversation", contents:"IN THIS NOTE", share:"SHARE" };
  const structuredData = { "@context":"https://schema.org", "@type":"BlogPosting", headline:article.title, description:article.description, datePublished:article.date, image:`https://josuesomarribas.com${article.image}`, author:{ "@type":"Person", name:"Josue Somarribas", url:"https://josuesomarribas.com" }, mainEntityOfPage:`https://josuesomarribas.com/writing/${article.slug}` };

  return <main className="article-page" lang="en">
    <nav className="article-topnav"><div className="shell"><Link className="logo" href={home}>JS.</Link><div><Link href={`${home}#work`}>Work</Link><Link href={`${home}#process`}>Experiments</Link><Link className="current" href={indexHref}>{labels.writing}</Link><Link href={`${home}#about`}>About</Link><Link href={`${home}#footer`}>Résumé</Link></div><a className="btn btn-red" href="mailto:hello@josuesomarribas.com">{labels.talk} ↗</a></div></nav>
    <ArticleTools title={article.title} mode="progress"/>
    <div className="article-layout shell">
      <aside className="article-sidebar">
        <b>{labels.contents}</b>
        <nav>{headings.slice(0, 7).map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.label}</a>)}</nav>
        <div className="article-share"><b>{labels.share}</b><div><a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=https://josuesomarribas.com/writing/${article.slug}`}>✉</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://josuesomarribas.com/writing/${article.slug}`)}`}>in</a><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://josuesomarribas.com/writing/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}>𝕏</a></div></div>
      </aside>
      <article className="article-shell">
        {labels.note && <p className="translation-note">{labels.note}</p>}
        <header>
          <p className="writing-label">{article.cluster || "WRITING"} · {article.tags[0] || "FIELD NOTES"}</p>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-meta"><span>By Josue Somarribas</span><span>•</span><span>{minutes} min read</span><span>•</span><time dateTime={article.date}>Updated {new Intl.DateTimeFormat("en", { month:"short", year:"numeric" }).format(new Date(article.date))}</time></div>
          <ArticleTools title={article.title}/>
          <Image src={article.image} alt={article.imageAlt} width={1672} height={941} priority unoptimized/>
        </header>
        <div className="article-content" dangerouslySetInnerHTML={{ __html:html }}/>
        <section className="article-takeaway"><b>The takeaway</b><strong>{article.description}</strong><p>Clear thinking, careful implementation and honest measurement produce results that are easier to trust.</p></section>
        <section className="article-author"><b className="logo">JS.</b><div><strong>Written by Josue Somarribas</strong><p>UX Engineer and CRO Developer writing about experimentation, front-end craft and the uncomfortable details between them.</p></div><a className="btn btn-red" href="mailto:hello@josuesomarribas.com">More about Josue →</a></section>
      </article>
    </div>
    <section className="article-cta"><div className="shell"><h2>{labels.compare}</h2><a className="btn btn-light" href="mailto:hello@josuesomarribas.com">{labels.conversation} ↗</a><Link className="btn btn-outline" href={indexHref}>{labels.back} ↑</Link></div></section>
    <footer className="article-footer"><div className="shell"><Link className="logo" href={home}>JS.</Link><div><Link href={`${home}#work`}>Work</Link><Link href={`${home}#process`}>Experiments</Link><Link href={indexHref}>{labels.writing}</Link><Link href={`${home}#about`}>About</Link></div></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
  </main>;
}
