import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LabToolDetailPage from "../../../../components/LabToolDetailPage";
import { getLabTool, labTools } from "../../../../lib/lab-tools";

export const dynamicParams = false;

export function generateStaticParams() { return labTools.map(tool => ({slug:tool.slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug} = await params;
  const tool = getLabTool(slug);
  if (!tool) return {};
  return {title:`${tool.name.en} — Lab — Josue Somarribas`,description:tool.description.en,alternates:{canonical:`/lab/${slug}`,languages:{en:`/lab/${slug}`,es:`/es/lab/${slug}`,"x-default":`/lab/${slug}`}},openGraph:{title:tool.name.en,description:tool.description.en,url:`/lab/${slug}`,images:[{url:tool.image,alt:tool.imageAlt.en}]}};
}

export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params;
  const tool = getLabTool(slug);
  if (!tool) notFound();
  return <LabToolDetailPage tool={tool} locale="en"/>;
}
