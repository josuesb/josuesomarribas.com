import Link from "next/link";
import Image from "next/image";
import type { Article } from "../../lib/content";

export default function ArticlePage({ article, locale }:{ article:Article; locale:"en"|"es" }) {
  const indexHref = locale === "es" ? "/es/writing" : "/writing";
  const labels = locale === "es"
    ? { back:"Todos los artículos", note:"Este artículo todavía está disponible únicamente en inglés." }
    : { back:"All articles", note:"" };
  const structuredData = {
    "@context":"https://schema.org", "@type":"BlogPosting", headline:article.title,
    description:article.description, datePublished:article.date, image:`https://josuesomarribas.com${article.image}`,
    author:{ "@type":"Person", name:"Josue Somarribas", url:"https://josuesomarribas.com" },
    mainEntityOfPage:`https://josuesomarribas.com/writing/${article.slug}`,
  };
  return <main className="article-page" lang="en">
    <nav className="article-nav shell"><Link className="logo" href={locale === "es" ? "/es" : "/"}>JS.</Link><Link href={indexHref}>← {labels.back}</Link></nav>
    <article className="article-shell">
      {labels.note && <p className="translation-note">{labels.note}</p>}
      <header>
        <p className="writing-label">{article.cluster || "WRITING"}</p>
        <h1>{article.title}</h1>
        <p className="article-description">{article.description}</p>
        <div className="article-byline"><time dateTime={article.date}>{new Intl.DateTimeFormat(locale, { dateStyle:"long" }).format(new Date(article.date))}</time><span>Josue Somarribas</span></div>
        <Image src={article.image} alt={article.imageAlt} width={1672} height={941} priority unoptimized/>
      </header>
      <div className="article-content" dangerouslySetInnerHTML={{ __html:article.body }}/>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
  </main>;
}
