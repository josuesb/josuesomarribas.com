import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle } from "../../../../lib/content";
import ArticlePage from "../../../writing/ArticlePage";

export function generateStaticParams() {
  return getAllArticles().map(article => ({ slug:article.slug }));
}

export async function generateMetadata({ params }:{ params:Promise<{slug:string}> }):Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const hasSpanishTranslation = Boolean(getArticle(slug, "es"));
  return {
    title:article.title,
    description:article.description,
    alternates:{ canonical:`/blog/${slug}`, languages:hasSpanishTranslation ? { en:`/blog/${slug}`, es:`/es/blog/${slug}`, "x-default":`/blog/${slug}` } : { en:`/blog/${slug}`, "x-default":`/blog/${slug}` } },
    openGraph:{ title:article.title, description:article.description, type:"article", url:`/blog/${slug}`, images:[article.image] },
  };
}

export default async function Page({ params }:{ params:Promise<{slug:string}> }) {
  const { slug } = await params;
  if (slug === ":slug") return <main/>;
  const article = getArticle(slug);
  if (!article || article.draft) notFound();
  return <ArticlePage article={article} locale="en" hasSpanishTranslation={Boolean(getArticle(slug, "es"))}/>;
}
