import type { Metadata } from "next";
import WritingPage from "../../writing/WritingPage";
import { getAllArticles } from "../../../lib/content";

export const dynamic = "force-static";
export const metadata:Metadata={title:"Blog — Josue Somarribas",description:"Notas sobre UX, experimentación, CRO y desarrollo front-end.",alternates:{canonical:"/es/blog",languages:{en:"/blog",es:"/es/blog","x-default":"/blog"}}};

export default function Page(){return <WritingPage locale="es" articles={getAllArticles()}/>}
