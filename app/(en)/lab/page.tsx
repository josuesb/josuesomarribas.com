import type { Metadata } from "next";
import LabPage from "../../../components/LabPage";

export const dynamic = "force-static";
export const metadata:Metadata = {
  title:"Lab — Tools, Experiments and Side Projects — Josue Somarribas",
  description:"A curated collection of useful tools, working experiments, client systems and side projects built by Josue Somarribas.",
  alternates:{canonical:"/lab",languages:{en:"/lab",es:"/es/lab","x-default":"/lab"}},
  openGraph:{title:"Lab — Josue Somarribas",description:"Useful things, built from curiosity.",url:"/lab",images:[{url:"/og.png",width:1792,height:933,alt:"Josue Somarribas Lab"}]},
};

export default function Page(){ return <LabPage/>; }
