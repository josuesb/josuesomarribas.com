import type { Metadata } from "next";
import WritingPage from "./WritingPage";
export const metadata:Metadata={title:"Writing — Josue Somarribas",description:"Field notes on UX, experimentation, CRO and front-end engineering.",alternates:{canonical:"/writing",languages:{en:"/writing",es:"/es/writing","x-default":"/writing"}}};
export default function Page(){return <WritingPage locale="en"/>}
