import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle } from "../../../../../lib/content";
import ArticlePage from "../../../../writing/ArticlePage";

export function generateStaticParams() {
  return getAllArticles({ locale:"es" }).map(article => ({ slug:article.slug }));
}

export async function generateMetadata({ params }:{ params:Promise<{slug:string}> }):Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug, "es");
  if (!article) return {};
  return {
    title:`${article.title} — Josue Somarribas`,
    description:article.description,
    alternates:{ canonical:`/es/blog/${slug}`, languages:{ en:`/blog/${slug}`, es:`/es/blog/${slug}`, "x-default":`/blog/${slug}` } },
    openGraph:{ title:article.title, description:article.description, type:"article", url:`/es/blog/${slug}`, images:[article.image] },
  };
}

export default async function Page({ params }:{ params:Promise<{slug:string}> }) {
  const { slug } = await params;
  if (slug === ":slug") return <main/>;
  const article = getArticle(slug, "es");
  if (!article || article.draft) notFound();
  return <ArticlePage article={article} locale="es"/>;
}
