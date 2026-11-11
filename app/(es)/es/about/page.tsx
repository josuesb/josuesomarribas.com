import { ButtonLink, TextLink } from "../../../../components/ui/Action";
import type { Metadata } from "next";
import SiteFooter from "../../../../components/SiteFooter";
import CopyEmailButton from "../../../../components/CopyEmailButton";
import Image from "next/image";
import AboutHeroCollage3D from "../../../../components/AboutHeroCollage3D";

export const metadata: Metadata = {
  title: "Sobre mí — Josue Somarribas",
  alternates: { canonical: "/es/about", languages: { en: "/about", es: "/es/about", "x-default": "/about" } },
  description: "Ingeniero UX y desarrollador CRO que conecta comportamiento humano, diseño de interfaces y código en producción.",
};

const resumeHref = "/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf";
const editorialAsset = "/assets/about-editorial";

export default function AboutPage() {
  return <main className="about-page">
    <section className="about-hero">
      <div className="shell about-hero-grid">
        <div>
          <p className="about-label">SOBRE MÍ × LA PERSONA DETRÁS DE LOS PÍXELES</p>
          <h1>Diseñador por instinto.<br />Ingeniero por práctica.<br />Experimento por <em>curiosidad.</em></h1>
          <p className="about-lead">Soy Josue Somarribas, ingeniero UX y desarrollador CRO. Conecto el comportamiento humano, el diseño de interfaces y el código en producción.</p>
          <div className="actions"><ButtonLink href={resumeHref} download>Descargar currículum </ButtonLink><ButtonLink variant="secondary" href="mailto:josuesomarribasb@gmail.com">Hablemos </ButtonLink></div>
          <p className="about-meta">Más de 8 años en UX y desarrollo web · Vivo en España · Nací en Costa Rica</p>
        </div>
        <AboutHeroCollage3D locale="es" />
      </div>
    </section>

    <section className="about-work shell">
      <div className="about-work-copy"><small>01 / ENTRE DISCIPLINAS</small><h2>Mi trabajo conecta<br/>disciplinas.</h2><i/><p>Los buenos productos surgen donde se encuentran el pensamiento de diseño, el rigor de la ingeniería y la comprensión del comportamiento humano.</p><p>Me muevo entre esos ámbitos: convierto la incertidumbre en experimentos, diseño interfaces que respetan a las personas y construyo sistemas para aprender de forma continua.</p><p>De Costa Rica a Barcelona, me guía el mismo hilo: la curiosidad y el cuidado por los detalles.</p></div>
      <div className="about-work-art" role="img" aria-label="Documentos de investigación, un prototipo, una cinta métrica y un viaje de Costa Rica a Barcelona"><Image className="about-work-papers" src={`${editorialAsset}/work-papers.png`} alt="" width={1672} height={941} unoptimized/><Image className="about-work-tools" src={`${editorialAsset}/work-tools.png`} alt="" width={1536} height={1024} unoptimized/></div>
    </section>

    <section className="about-thinking"><div className="shell"><header><small>02 / PROCESO</small><h2>Cómo pienso</h2></header><div className="about-thinking-grid"><article><b>01</b><h3>Encontrar la pregunta de fondo.</h3><p>Empiezo por entender qué problema merece la pena resolver.</p></article><article><b>02</b><h3>Poner a prueba lo invisible.</h3><p>Diseño pruebas pequeñas y de bajo riesgo para encontrar señales.</p></article><article><b>03</b><h3>Llevar lo aprendido al producto.</h3><p>Construyo, mido y pongo en producción lo que nos ayuda a avanzar.</p></article></div><Image className="about-thinking-art" src={`${editorialAsset}/how-i-think.png`} alt="Hoja de preguntas, instrumento de medición y nota de lanzamiento" width={2172} height={724} unoptimized/></div></section>

    <section className="about-field-notes"><div className="shell"><header><h2>Notas de trabajo</h2><span>FRAGMENTOS DE MI DIARIO DE DISEÑO</span></header><Image src={`${editorialAsset}/field-notes.png`} alt="Cuatro notas sobre claridad, experimentación, cuidado por los detalles y medición ética" width={2073} height={758} unoptimized/></div></section>

    <section className="about-career shell" id="route"><div className="about-career-intro"><small>03 / TRAYECTORIA</small><h2>Un camino que se hace<br/>construyendo.</h2><i/><p>Mi trayectoria no ha sido una línea recta. Seguí mi curiosidad y continué construyendo.</p><TextLink href={resumeHref} target="_blank" rel="noreferrer">Ver currículum </TextLink></div><div className="about-career-story"><Image src={`${editorialAsset}/career-route.png`} alt="Una trayectoria profesional con curvas, de Costa Rica a Barcelona" width={1983} height={793} unoptimized/><div className="about-milestones"><span><b>2017</b>Curiosidad por el diseño</span><span><b>2018</b>Bases de producto</span><span><b>2019</b>Primeros experimentos</span><span><b>2021</b>Ingeniería UX</span><span><b>2022</b>Barcelona</span><span><b>2024+</b>Aprendizaje continuo</span></div></div></section>

    <section className="about-outside"><div className="shell"><div><small>04 / MÁS ALLÁ DEL TRABAJO</small><h2>Fuera de la<br/>interfaz.</h2><i/><p>La hospitalidad me enseñó empatía. Viajar me dio perspectiva. Mis raíces están en Costa Rica. Barcelona alimenta mi curiosidad.</p><p>Las buenas conversaciones y el café fuerte me dan energía.</p><TextLink href="https://www.airbnb.es/rooms/1328530246047347477" target="_blank" rel="noreferrer">Leer las reseñas de los huéspedes </TextLink></div><Image src={`${editorialAsset}/outside-collage.png`} alt="Llave de habitación, recibo de café, mapa de Barcelona y postal de Costa Rica" width={1536} height={1024} unoptimized/></div></section>

    <section className="about-voices shell"><header><small>05 / COLABORACIÓN</small><h2>Quienes han trabajado conmigo<br/>lo explican mejor.</h2></header><blockquote>“Josue aporta un equilibrio poco habitual: la curiosidad de un investigador, la precisión de un ingeniero y la sensibilidad de un diseñador.”<cite>Director de producto · Empresa de comercio electrónico en crecimiento</cite></blockquote><blockquote>“Hace buenas preguntas, se fija en los detalles y consigue que colaborar resulte fácil.”<cite>Colaborador de ingeniería · SaaS B2B</cite></blockquote><TextLink href="https://www.linkedin.com/in/josuesb/" target="_blank" rel="noreferrer">Leer 14 recomendaciones<br/>en LinkedIn </TextLink></section>

    <section className="about-curious"><div className="shell"><h2>Ahora mismo<br/><b>me interesa</b></h2><p>Validez de los experimentos 〰 Diseño conductual 〰 Interacción accesible 〰 Peculiaridades del navegador 〰 Tipografía 〰 Proyectos personales útiles</p></div></section>

    <section className="about-editorial-contact"><div className="shell"><div><h2>Si el problema conecta varias disciplinas,<br/>seguramente me interesa.</h2><p>Cuéntame la idea tal como está. No hace falta una presentación.</p></div><div className="actions"><ButtonLink href="mailto:josuesomarribasb@gmail.com">Hablemos </ButtonLink><CopyEmailButton label="Copiar email" copiedLabel="Copiado" /></div></div></section>
    <SiteFooter locale="es" current="about" />
  </main>;
}
