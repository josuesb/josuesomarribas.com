import type { Metadata } from "next";
import LabPage from "../../../../components/LabPage";

export const dynamic = "force-static";
export const metadata:Metadata = {
  title:"Laboratorio — Herramientas y experimentos — Josue Somarribas",
  description:"Una colección curada de herramientas, experimentos, sistemas y proyectos paralelos construidos por Josue Somarribas.",
  alternates:{canonical:"/es/lab",languages:{en:"/lab",es:"/es/lab","x-default":"/lab"}},
  openGraph:{title:"Laboratorio — Josue Somarribas",description:"Cosas útiles, construidas desde la curiosidad.",url:"/es/lab",images:[{url:"/og.png",width:1792,height:933,alt:"Laboratorio de Josue Somarribas"}]},
};

export default function Page(){ return <LabPage locale="es"/>; }
