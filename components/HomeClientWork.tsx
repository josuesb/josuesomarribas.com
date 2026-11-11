import Image from "next/image";
import styles from "../app/home.module.css";

const projects = [
  {name:"What You Carry",url:"https://whatyoucarrycr.com/",image:"what-you-carry.webp",category:["Conservation","Conservación"],role:["Web development","Desarrollo web"],description:["An immersive bilingual campaign exposing the hidden cost of wildlife trafficking in Costa Rica.","Una campaña bilingüe e inmersiva que revela el coste oculto del tráfico de vida silvestre en Costa Rica."]},
  {name:"Andrés Tenor",url:"https://andrestenor.com/",image:"andres-tenor.webp",category:["Performing arts","Artes escénicas"],role:["Design & development","Diseño y desarrollo"],description:["A distinctive website for opera and bolero tenor Andrés Rodríguez, based in Barcelona.","Una web para Andrés Rodríguez, tenor de ópera y boleros afincado en Barcelona."]},
  {name:"Rofka Projects",url:"https://rofkaproyectos.com/",image:"rofka-projects.webp",category:["Construction","Construcción"],role:["Framer","Framer"],description:["A digital presence for a Costa Rican construction company, from planning to finished spaces.","Una presencia digital para una constructora costarricense, desde la planificación hasta los espacios terminados."]},
  {name:"PitchCR",url:"https://www.pitchcr.com/",image:"pitchcr.webp",category:["Startup ecosystem","Ecosistema startup"],role:["Squarespace","Squarespace"],description:["A digital home for Costa Rica’s startup and pitch community.","Un hogar digital para la comunidad de startups y pitch de Costa Rica."]},
];

export default function HomeClientWork({locale}:{locale:"en"|"es"}) {
  const es=locale==="es", language=es?1:0;
  return <section className={styles.clientSection} id="work" aria-labelledby="client-work-title"><div className={styles.wrap}>
    <header className={styles.sectionIntro}><div><p className={styles.kicker}>{es ? "01 / Proyectos para clientes" : "01 / Client work"}</p><h2 id="client-work-title">{es ? <>Diseñado para personas.<br/>Construido para la web.</> : <>Designed for real people.<br/>Built for the web.</>}</h2></div><p>{es ? "Cuatro proyectos, desde una campaña de conservación hasta webs de artistas y plataformas digitales." : "Four different briefs, from conservation storytelling to artist websites and digital platforms."}</p></header>
    <div className={styles.clientGrid}>{projects.map((project,index)=><article key={project.name} className={styles.clientCard}>
      <a className={styles.clientImage} href={project.url} target="_blank" rel="noreferrer" aria-label={`${es ? "Visitar" : "Visit"} ${project.name}`} data-analytics-event="project_click" data-analytics-label={project.name}>
        <Image src={`/assets/project-previews/${project.image}`} alt={`${project.name} — ${project.role[language]}`} fill sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1280px) 48vw, 608px" unoptimized/>
      </a>
      <div className={styles.clientMeta}><span>{String(index+1).padStart(2,"0")} / {project.category[language]}</span><span>{project.role[language]}</span></div>
      <h3><a href={project.url} target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label={project.name}>{project.name}</a></h3><p>{project.description[language]}</p>
    </article>)}</div>
  </div></section>;
}
