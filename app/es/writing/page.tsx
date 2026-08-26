import type { Metadata } from "next";
import WritingPage from "../../writing/WritingPage";
export const dynamic = "force-static";
export const metadata:Metadata={title:"Artículos — Josue Somarribas",description:"Notas sobre UX, experimentación, CRO y desarrollo front-end.",alternates:{canonical:"/es/writing",languages:{en:"/writing",es:"/es/writing","x-default":"/writing"}}};
export default function Page(){return <WritingPage locale="es"/>}
