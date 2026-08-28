import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "../../../../components/SiteNav";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ahora — Josue Somarribas",
  description: "Lo que Josue Somarribas está construyendo, aprendiendo, explorando y leyendo ahora mismo.",
  alternates: { canonical: "/es/now", languages: { en: "/now", es: "/es/now", "x-default": "/now" } },
};

const Arrow = () => <span aria-hidden="true">→</span>;

const FocusDiagram = () => <svg className="now-funnel" viewBox="0 0 270 280" role="img" aria-label="Embudo de experimentación desde la hipótesis hasta el impacto">
  <g fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M25 35h215v55l-46 50v58l-40 42h-44l-40-42v-58L25 90Z"/><path d="M25 90h215M70 140h124M110 198h44M110 240h44"/><path d="M18 25v75M247 80v125M4 25h28M4 100h28M233 80h28M233 205h28"/></g>
  <g className="now-funnel-copy"><text x="132" y="65">HIPÓTESIS</text><text x="132" y="119">EXPERIMENTO</text><text x="132" y="174">ANÁLISIS</text><text x="132" y="224">IMPACTO</text><text x="0" y="18">80</text><text x="237" y="73">50</text></g>
</svg>;

export default function NowPage() {
  const week = [["L","Construir",true],["M","Medir",true],["X","Aprender",true],["J","Explorar",true],["V","Escribir",true],["S","Recargar",false],["D","Recargar",false]];
  return <main className="now-page" lang="es">
    <header className="now-header"><SiteNav locale="es" current="now" /></header>

    <section className="now-hero shell">
      <div className="now-ruler" aria-hidden="true"><i/><b>08</b><b>06</b><b>04</b><b>02</b><b>00</b><i/></div>
      <h1>NOW</h1>
      <div className="now-hero-copy"><span aria-hidden="true">⟶</span><h2>En qué estoy<br/>enfocado<br/>ahora.</h2><p>Actualizado en agosto de 2026 · Madrid</p></div>
      <div className="now-hero-note"><Image src="/assets/global/sol-rojo-texturizado.svg" alt="" width={180} height={180} unoptimized/><p>Crear mejores<br/>experiencias.<br/>Medir lo que<br/>importa.</p></div>
    </section>

    <section className="weekly-signal shell" aria-label="Ritmo semanal">
      <div className="weekly-label"><b>RITMO SEMANAL</b><span>4 ago — 10 ago</span></div>
      <div className="week-days">{week.map(([day,task,active],i)=><div key={`${day}-${i}`}><b className={!active ? "weekend" : ""}>{day}</b><i className={!active ? "weekend" : ""}/><span>{task}</span></div>)}</div>
      <p>Ritmo &gt;<br/>Concentrarse,<br/>crear, aprender,<br/>compartir.</p>
    </section>

    <section className="now-board shell">
      <article className="now-building">
        <div className="now-section-intro"><b>01</b><h2>Construyendo</h2><p>Proyectos que estoy desarrollando<br/>y publicando activamente.</p><a href="/es#process">Ver experimentos <Arrow/></a></div>
        <div className="blueprint"><div><small>ENFOQUE PRINCIPAL</small><h3>Marco editorial de CRO</h3><p>Un marco probado para convertir<br/>ideas éticas basadas en evidencia en<br/>experimentos que generan resultados.</p><ul><li>Diseño de experimentos</li><li>Patrones de implementación</li><li>Medición y análisis</li><li>Casos de estudio</li></ul><div className="blueprint-progress">Progreso <span>65%</span><i/></div></div><FocusDiagram/><em>fig. 01</em></div>
      </article>

      <article className="now-card learning"><b>02</b><h2>Aprendiendo</h2><p>Temas en los que estoy profundizando.</p><ul><li>Estadística avanzada para pruebas A/B</li><li>Pensamiento bayesiano para decisiones de producto</li><li>Rendimiento web en 2026</li><li>Sistemas de diseño a escala</li></ul><div className="bell-curve" aria-hidden="true"><span>reducir la<br/>incertidumbre</span><svg viewBox="0 0 180 105"><path d="M6 85C52 85 48 20 90 20s38 65 84 65M6 85h168M90 15v76"/><text x="10" y="102">−2σ</text><text x="58" y="102">−1σ</text><text x="88" y="102">μ</text><text x="120" y="102">+1σ</text><text x="157" y="102">+2σ</text></svg></div><a href="/es/blog">Notas y aprendizajes <Arrow/></a></article>
      <article className="now-card exploring"><b>03</b><h2>Explorando</h2><p>Ideas, herramientas y espacios que investigo.</p><ul><li>Distribución edge y personalización</li><li>Server Components e islas</li><li>Plataformas de experimentación open source</li><li>Análisis de datos asistido por IA</li></ul><div className="scatter" aria-hidden="true"><i/><i/><i/><i/><i/><span>Encontrar patrones.<br/>Hacer mejores preguntas.</span></div><a href="/es/blog">Cuaderno de laboratorio <Arrow/></a></article>
      <article className="now-card reading"><b>04</b><h2>Leyendo</h2><p>En mi mesita de noche y en mis feeds.</p><div className="book-stack" aria-label="Portadas de libros"><i>Noise<small>Daniel Kahneman</small></i><i>Designing<br/>Data-Intensive<br/>Applications<small>Martin Kleppmann</small></i><i>The Mom Test<small>Rob Fitzpatrick</small></i></div><ul><li><strong>Noise</strong><span>Leyendo</span></li><li><strong>Designing Data-Intensive Applications</strong><span>Leyendo</span></li><li><strong>The Mom Test</strong><span>Releyendo</span></li></ul><a href="/es/blog">Mis destacados <Arrow/></a></article>
      <article className="now-card available"><b>05</b><h2>Disponible para</h2><p>Cómo puedo ayudar ahora mismo.</p><ul><li><i>◎</i><span><strong>Estrategia CRO y experimentación</strong>De oportunidades a mejoras medibles.</span></li><li><i>‹/›</i><span><strong>Ingeniería UX</strong>Soluciones front-end rápidas, accesibles y escalables.</span></li><li><i>⌁</i><span><strong>Auditoría y optimización</strong>Encontrar fricción, mejorar lo importante y demostrar impacto.</span></li></ul><a href="mailto:josuesomarribasb@gmail.com">Veamos si encajamos <Arrow/></a></article>
    </section>

    <section className="now-cta shell"><h2>¿Tienes un problema<br/>de producto difícil?</h2><p>Ayudo a equipos a crear mejores experiencias combinando ingeniería UX, experimentación y decisiones basadas en datos.</p><a href="mailto:josuesomarribasb@gmail.com">Iniciar una conversación <Arrow/></a></section>
    <footer className="now-footer"><div className="shell"><a className="logo" href="/es">JS.</a><p>Madrid, España<br/>Disponible internacionalmente</p><nav><a href="/es#work">Proyectos</a><a href="/es#process">Experimentos</a><a href="/es/blog">Artículos</a></nav><nav><a href="/about">Sobre mí</a><a href="/CV/JosueSomarribas_CV_CRO_EN_06_2026-04.pdf">Currículum</a><a href="/es/now">Ahora</a></nav><p><a href="mailto:josuesomarribasb@gmail.com">josuesomarribasb@gmail.com</a><br/>+34 600 123 456</p><b>HECHO<br/>CON CUIDADO<br/>Y CURIOSIDAD</b></div><div className="shell now-legal"><span>© 2026 Josue Somarribas</span><span>Privacidad · Términos · Cookies</span></div></footer>
  </main>;
}
