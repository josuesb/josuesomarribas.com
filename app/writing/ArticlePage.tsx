import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { getAllArticles, type Article, type ArticleMeta } from "../../lib/content";
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

function availableAudio(article:Article, locale:"en"|"es") {
  const generatedUrl = `/audio/blog/${locale}/${article.slug}.mp3`;
  const publicFile = (url:string) => path.join(process.cwd(), "public", url.replace(/^\//, ""));
  if (fs.existsSync(publicFile(generatedUrl))) return generatedUrl;
  if (!article.audio) return undefined;
  if (article.audio.startsWith("/") && !fs.existsSync(publicFile(article.audio))) return undefined;
  return article.audio;
}

function articleHref(article:ArticleMeta, locale:"en"|"es") {
  return `${locale === "es" ? "/es" : ""}/blog/${article.slug}`;
}

function ArticleNavCard({ article, locale, label }:{ article:ArticleMeta; locale:"en"|"es"; label:string }) {
  return <a className="article-nav-card" href={articleHref(article, locale)}>
    <span className="article-nav-thumb" aria-hidden="true" style={{ backgroundImage:`url(${editorialImage(article.slug, article.image)})` }}/>
    <span><small>{label}</small><em>{article.cluster.replaceAll("-", " · ")}</em><strong>{article.title}</strong></span><b aria-hidden="true">→</b>
  </a>;
}

export default function ArticlePage({ article, locale, hasSpanishTranslation=false }:{ article:Article; locale:"en"|"es"; hasSpanishTranslation?:boolean }) {
  const indexHref = locale === "es" ? "/es/blog" : "/blog";
  const articlePath = `${locale === "es" ? "/es" : ""}/blog/${article.slug}`;
  const articleUrl = `https://josuesomarribas.com${articlePath}`;
  const { html, headings } = prepareBody(article.body);
  const minutes = Math.max(1, Math.ceil(plainText(article.body).split(/\s+/).length / 220));
  const isFouc = /fouc/i.test(article.slug);
  const heroImage = isFouc ? "/assets/article-fouc/01-hero-diagrama.svg" : editorialImage(article.slug, article.image);
  const audioSrc = availableAudio(article, locale);
  const allArticles = getAllArticles({ locale });
  const currentIndex = Math.max(0, allArticles.findIndex(item => item.slug === article.slug));
  const previousArticle = allArticles.length > 1 ? allArticles[(currentIndex - 1 + allArticles.length) % allArticles.length] : undefined;
  const nextArticle = allArticles.length > 1 ? allArticles[(currentIndex + 1) % allArticles.length] : undefined;
  const relatedArticles = allArticles.filter(item => item.slug !== article.slug && item.cluster === article.cluster).slice(0, 3);
  const related = relatedArticles.length === 3 ? relatedArticles : [...relatedArticles, ...allArticles.filter(item => item.slug !== article.slug && !relatedArticles.some(relatedItem => relatedItem.slug === item.slug))].slice(0, 3);
  const labels = locale === "es"
    ? { note:"", contents:"EN ESTE ARTÍCULO", by:"Por Josue Somarribas", minRead:"min de lectura", updated:"Actualizado", all:"TODOS LOS ARTÍCULOS", next:"SIGUIENTE ARTÍCULO", previous:"ARTÍCULO ANTERIOR", moreTopic:"Más sobre este tema" }
    : { note:"", contents:"IN THIS NOTE", by:"By Josue Somarribas", minRead:"min read", updated:"Updated", all:"ALL WRITING", next:"NEXT NOTE", previous:"PREVIOUS NOTE", moreTopic:"More from this topic" };
  const schemaImage = article.image.startsWith("http") ? article.image : `https://josuesomarribas.com${article.image}`;
  const structuredData = { "@context":"https://schema.org", "@type":"BlogPosting", headline:article.title, description:article.description, image:schemaImage, datePublished:article.date, dateModified:article.date, author:{ "@type":"Person", name:"Josué Somarribas", url:"https://www.linkedin.com/in/josuesb/" }, url:articleUrl, mainEntityOfPage:{ "@type":"WebPage", "@id":articleUrl }, inLanguage:locale };

  return <main className="article-page" lang={locale}>
    <div className="article-nav"><SiteNav locale={locale} current="writing" articleSlug={article.slug} hasSpanishTranslation={locale === "es" || hasSpanishTranslation}/></div>
    <ArticleTools title={article.title} mode="progress"/>
    <div className="article-layout shell">
      <aside className="article-sidebar">
        <b>{labels.contents}</b>
        <nav>{headings.slice(0, 7).map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.label}</a>)}</nav>
        <ArticleTools title={article.title} locale={locale} mode="sidebar-progress"/>
        <a className="article-back-link" href={indexHref}>← {labels.all}</a>
      </aside>
      <article className="article-shell">
        {labels.note && <p className="translation-note">{labels.note}</p>}
        <header>
          <p className="writing-label">{article.cluster || "WRITING"} · {article.tags[0] || "FIELD NOTES"}</p>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-meta"><span>{labels.by}</span><span>•</span><span>{minutes} {labels.minRead}</span><span>•</span><time dateTime={article.date}>{labels.updated} {new Intl.DateTimeFormat(locale, { month:"short", year:"numeric" }).format(new Date(article.date))}</time></div>
          <ArticleTools title={article.title} locale={locale} audioSrc={audioSrc}/>
          {nextArticle && <a className="article-next-preview" href={articleHref(nextArticle, locale)}><span aria-hidden="true" style={{ backgroundImage:`url(${editorialImage(nextArticle.slug, nextArticle.image)})` }}/><small>{labels.next}</small><strong>{nextArticle.title}</strong><b aria-hidden="true">→</b></a>}
          <Image src={heroImage} alt={article.imageAlt} width={1800} height={900} priority unoptimized/>
        </header>
        {isFouc && <div className="fouc-asset-story" aria-label="Visual explanation of flicker and experiment validity">
          {[
            ["02-recorrido-ocular",1600,430], ["03-timeline-300ms",1800,500], ["04-anotaciones-validity",1200,900],
            ["05-banner-senal",1400,360], ["06-checklist-papel",1800,600], ["07-check-manuscrito",700,600]
          ].map(([file,width,height])=><Image key={file} src={`/assets/article-fouc/${file}.svg`} alt="" aria-hidden="true" width={Number(width)} height={Number(height)}/>) }
        </div>}
        <div className="article-content" dangerouslySetInnerHTML={{ __html:html }}/>
        {previousArticle && nextArticle && <nav className="article-post-nav" aria-label={locale === "es" ? "Navegar entre artículos" : "Browse articles"}>
          <ArticleNavCard article={previousArticle} locale={locale} label={labels.previous}/>
          <ArticleNavCard article={nextArticle} locale={locale} label={labels.next}/>
          <a className="article-all-link" href={indexHref}>{labels.all} →</a>
        </nav>}
        {!!related.length && <section className="article-related"><h2>{labels.moreTopic}</h2><div>{related.map(item => <a key={item.slug} href={articleHref(item, locale)}><span aria-hidden="true" style={{ backgroundImage:`url(${editorialImage(item.slug, item.image)})` }}/><small>{item.cluster.replaceAll("-", " · ")}</small><strong>{item.title}</strong><em>↗</em></a>)}</div></section>}
      </article>
    </div>
    <div className="article-footer"><SiteFooter locale={locale} current="writing"/></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
  </main>;
}
