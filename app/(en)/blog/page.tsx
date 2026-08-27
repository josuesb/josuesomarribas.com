import type { Metadata } from "next";
import WritingPage from "../../writing/WritingPage";
import { getAllArticles } from "../../../lib/content";

export const dynamic = "force-static";
export const metadata:Metadata={title:"Blog — Josue Somarribas",description:"Field notes on UX, experimentation, CRO and front-end engineering.",alternates:{canonical:"/blog",languages:{en:"/blog",es:"/es/blog","x-default":"/blog"}}};

export default function Page(){return <WritingPage locale="en" articles={getAllArticles()}/>}
