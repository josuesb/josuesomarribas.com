import Image from "next/image";
import type { Article } from "../../lib/content";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import ArticleTools from "./ArticleTools";
import { editorialImage } from "../../lib/editorial-assets";

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
  const indexHref = locale === "es" ? "/es/blog" : "/blog";
  const articlePath = `${locale === "es" ? "/es" : ""}/blog/${article.slug}`;
  const articleUrl = `https://josuesomarribas.com${articlePath}`;
  const { html, headings } = prepareBody(article.body);
  const minutes = Math.max(1, Math.ceil(plainText(article.body).split(/\s+/).length / 220));
  const isFouc = /fouc/i.test(article.slug);
  const heroImage = isFouc ? "/assets/article-fouc/01-hero-diagrama.svg" : editorialImage(article.slug, article.image);
  const labels = locale === "es"
    ? { writing:"Artículos", back:"Volver a artículos", note:"Este artículo todavía está disponible únicamente en inglés.", talk:"Hablemos", compare:"¿Comparamos notas?", conversation:"Iniciar conversación", contents:"EN ESTE ARTÍCULO", share:"COMPARTIR" }
    : { writing:"Writing", back:"Back to Writing", note:"", talk:"Let’s talk", compare:"Want to compare notes?", conversation:"Start a conversation", contents:"IN THIS NOTE", share:"SHARE" };
  const schemaImage = article.image.startsWith("http") ? article.image : `https://josuesomarribas.com${article.image}`;
  const structuredData = { "@context":"https://schema.org", "@type":"BlogPosting", headline:article.title, description:article.description, image:schemaImage, datePublished:article.date, dateModified:article.date, author:{ "@type":"Person", name:"Josué Somarribas", url:"https://www.linkedin.com/in/josuesb/" }, url:articleUrl, mainEntityOfPage:{ "@type":"WebPage", "@id":articleUrl }, inLanguage:locale };

  return <main className="article-page" lang="en">
    <div className="article-nav"><SiteNav locale={locale} current="writing"/></div>
    <ArticleTools title={article.title} mode="progress"/>
    <div className="article-layout shell">
      <aside className="article-sidebar">
        <b>{labels.contents}</b>
        <nav>{headings.slice(0, 7).map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.label}</a>)}</nav>
        <div className="article-share"><b>{labels.share}</b><div><a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(articleUrl)}`}>✉</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}>in</a><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}>𝕏</a></div></div>
      </aside>
      <article className="article-shell">
        {labels.note && <p className="translation-note">{labels.note}</p>}
        <header>
          <p className="writing-label">{article.cluster || "WRITING"} · {article.tags[0] || "FIELD NOTES"}</p>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-meta"><span>By Josue Somarribas</span><span>•</span><span>{minutes} min read</span><span>•</span><time dateTime={article.date}>Updated {new Intl.DateTimeFormat("en", { month:"short", year:"numeric" }).format(new Date(article.date))}</time></div>
          <ArticleTools title={article.title}/>
          <Image src={heroImage} alt={article.imageAlt} width={1800} height={900} priority unoptimized/>
        </header>
        {isFouc && <div className="fouc-asset-story" aria-label="Visual explanation of flicker and experiment validity">
          {[
            ["02-recorrido-ocular",1600,430], ["03-timeline-300ms",1800,500], ["04-anotaciones-validity",1200,900],
            ["05-banner-senal",1400,360], ["06-checklist-papel",1800,600], ["07-check-manuscrito",700,600]
          ].map(([file,width,height])=><Image key={file} src={`/assets/article-fouc/${file}.svg`} alt="" aria-hidden="true" width={Number(width)} height={Number(height)}/>) }
        </div>}
        <div className="article-content" dangerouslySetInnerHTML={{ __html:html }}/>
        <section className={`article-takeaway ${isFouc ? "fouc-takeaway" : ""}`}><b>The takeaway</b><strong>{article.description}</strong><p>Clear thinking, careful implementation and honest measurement produce results that are easier to trust.</p></section>
        <section className="article-author"><b className="logo">JS.</b><div><strong>Written by Josue Somarribas</strong><p>UX Engineer and CRO Developer writing about experimentation, front-end craft and the uncomfortable details between them.</p></div><a className="btn btn-red" href="mailto:josuesomarribasb@gmail.com">More about Josue →</a></section>
      </article>
    </div>
    <section className="article-cta"><div className="shell"><h2>{labels.compare}</h2><a className="btn btn-light" href="mailto:josuesomarribasb@gmail.com">{labels.conversation} ↗</a><a className="btn btn-outline" href={indexHref}>{labels.back} ↑</a></div></section>
    <div className="article-footer"><SiteFooter locale={locale} current="writing"/></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
  </main>;
}
