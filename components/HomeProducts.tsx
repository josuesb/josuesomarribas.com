import { TextLink } from "./ui/Action";
import Image from "next/image";
import {labTools} from "../lib/lab-tools";
import styles from "../app/home.module.css";

type Product = {id:string;name:string;image:string;url:string;category:string;description:string;label:string};
export default function HomeProducts({locale}:{locale:"en"|"es"}) {
  const es=locale==="es";
  const summaries:Record<string,[string,string,string,string]>={
    seconds:["Research / Front-end","Investigación / Front-end","Test whether a proposition is understood in five seconds.","Comprueba si una propuesta se entiende en cinco segundos."],
    font:["Typography / UX","Tipografía / UX","Compare typefaces with real content and fine-tune readability.","Compara tipografías con contenido real y ajusta la legibilidad."],
    sitemap:["Information architecture","Arquitectura de información","Turn sitemaps into a navigable view of site structure.","Convierte sitemaps en una estructura navegable del sitio."],
    utm:["Analytics / CRO","Analítica / CRO","Build campaign links and catch tracking errors.","Crea enlaces de campaña y detecta errores de seguimiento."],
    concat:["Automation","Automatización","Generate URLs in bulk from Excel or CSV data.","Genera URLs en lote a partir de datos de Excel o CSV."],
    benchmark:["AI / Analytics","IA / Analítica","Explore brand mentions, recommendations and citations with demo data.","Explora menciones, recomendaciones y citas de marcas con datos de demo."],
    "cro-lab":["Experimentation / CRO","Experimentación / CRO","Compare A/B tests with GA4 exports or manual data.","Compara tests A/B con exportaciones de GA4 o datos manuales."],
  };
  const ids=["seconds","font","sitemap","utm","concat","benchmark","cro-lab"];
  const products:Product[]=ids.map(id=>{
    const tool=labTools.find(item=>item.id===id)!;
    const summary=summaries[id];
    return {id,name:tool.name.en,image:tool.image,url:tool.externalUrl!,category:summary[es?1:0],description:summary[es?3:2],label:id==="benchmark"?(es?"Explorar demo":"Explore demo"):(es?"Abrir herramienta":"Open tool")};
  });
  products.splice(3,0,{id:"comparte",name:"Comparte el Momento",image:"/assets/project-previews/comparte-el-momento.webp",url:"https://www.comparteelmomento.com/",category:es?"Producto / Eventos":"Product / Events",description:es?"Un gestor de invitaciones digitales para momentos especiales.":"A digital invitation manager for special moments.",label:es?"Visitar web":"Visit website"});
  return <section className={styles.productsSection} id="products" aria-labelledby="home-products-title"><div className={styles.wrap}>
    <header className={styles.sectionIntro}><div><p className={styles.kicker}>{es?"02 / Productos independientes":"02 / Independent products"}</p><h2 id="home-products-title">{es?"Herramientas hechas para usarse.":"Tools, built to be used."}</h2></div><p>{es?"Productos que convierten preguntas de UX, analítica y desarrollo en herramientas que puedes utilizar.":"Small products that turn UX, analytics and development questions into things you can use."}</p></header>
    <div className={styles.productGrid}>{products.map(product=><article className={styles.productCard} key={product.id}>
      <a className={styles.productImage} href={product.url} target="_blank" rel="noreferrer" aria-label={`${product.label}: ${product.name}`} data-analytics-event="project_click" data-analytics-label={product.id==="cro-lab"?"CRO Lab":product.name}><Image src={product.image} alt={product.name} fill sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 1050px) 48vw, 295px" unoptimized/></a>
      <div className={styles.productBody}><p className={styles.productCategory}>{product.category}</p><h3>{product.name}</h3><p>{product.description}</p><TextLink className={styles.textLink} href={product.url} target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label={product.id==="cro-lab"?"CRO Lab":product.name}>{product.label} </TextLink></div>
    </article>)}</div>
    <article className={styles.jiraFeature}>
      <a className={styles.jiraImage} href={es?"/es/jira-tools":"/jira-tools"} aria-label={es?"Descubrir Jira Tools":"Discover Jira Tools"} data-analytics-event="project_click" data-analytics-label="Jira Tools"><Image src="/assets/jira-tools/04-bandeja-e-informes-1280x800.png" alt={es?"Bandeja y vista previa de actualización de Jira Tools":"Jira Tools tray and status update preview"} fill sizes="(max-width: 760px) calc(100vw - 32px), 240px" unoptimized/></a>
      <div><p className={styles.productCategory}>{es?"Extensión para Chrome · En revisión":"Chrome extension · Under review"}</p><h3>Jira Tools</h3><p>{es?"Copia, organiza y abre tickets por ID. Plantillas, bandeja e historial local.":"Copy, organise and open tickets by ID. Templates, a tray and local history."}</p></div>
      <div className={styles.jiraLinks}><TextLink className={styles.textLink} href={es?"/es/jira-tools":"/jira-tools"} data-analytics-event="project_click" data-analytics-label="Jira Tools">{es?"Descubrir Jira Tools":"Discover Jira Tools"} </TextLink><TextLink className={styles.textLink} href={`${es?"/es":""}/blog/jira-tools-copy-organize-open-tickets`}>{es?"Leer el artículo":"Read the article"}</TextLink></div>
    </article>
    <div className={styles.catalogLink}><TextLink className={styles.textLink} href={es?"/es/lab":"/lab"}>{es?"Explorar todo el Lab":"Explore all of Lab"} </TextLink></div>
  </div></section>;
}
