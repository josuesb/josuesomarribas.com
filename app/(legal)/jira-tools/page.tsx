import type { Metadata } from "next";
import Image from "next/image";
import styles from "./landing.module.css";

const assets = "/assets/jira-tools";
export const metadata: Metadata = {
  title: "Jira Tools — Copia, organiza y abre tickets",
  description: "Plantillas de copia, bandeja, informes por estado e historial local. Abre tickets de Jira por ID con Spotlight. Una extensión para Chrome.",
  alternates: { canonical: "/jira-tools" },
  openGraph: {
    title: "Jira Tools — Copia, organiza y abre tickets",
    description: "Menos pasos entre Jira y el resto de tu trabajo. Una extensión para Chrome con almacenamiento local.",
    locale: "es_ES",
    images: [{ url: `${assets}/04-bandeja-e-informes-1280x800.png`, width: 1280, height: 800, alt: "Bandeja y actualizaciones por estado de Jira Tools" }],
  },
};

function Screenshot({ file, alt, priority = false }: { file: string; alt: string; priority?: boolean }) {
  return <Image src={`${assets}/${file}-1280x800.png`} alt={alt} width={1280} height={800} priority={priority} sizes="(max-width: 760px) 100vw, 1100px" className={styles.screenshot} />;
}

export default function JiraToolsLanding() {
  return <main className={styles.page}>
    <a href="#contenido" className={styles.skip}>Saltar al contenido</a>
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Navegación de Jira Tools">
        <a className={styles.brand} href="/jira-tools" aria-label="Jira Tools, inicio"><Image src={`${assets}/icon.png`} width={36} height={36} alt="" />Jira Tools</a>
        <div className={styles.navLinks}><a href="#funciones">Funciones</a><a href="#preguntas">Preguntas</a><a href="/jira-tools/privacy">Privacidad <span aria-hidden="true">↗</span></a></div>
      </nav>
      <header className={styles.hero} id="contenido">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> UNA EXTENSIÓN PARA CHROME</p>
          <h1>Copia, organiza<br />y <em>abre tickets.</em></h1>
          <p className={styles.lead}>Menos pasos entre Jira y el resto de tu trabajo. Copia con tu formato, reúne tus tickets y prepara la próxima actualización.</p>
          <div className={styles.heroActions}><a className={styles.primary} href="#funciones">Descubrir las funciones <span aria-hidden="true">↓</span></a></div>
          <p className={styles.status}><span /> En revisión en Chrome Web Store</p>
        </div>
        <div className={styles.spotlightPreview} aria-label="Ejemplo del buscador de tickets Spotlight">
          <div className={styles.previewTop}><span>⚡ Abrir ticket</span><kbd>Esc</kbd></div>
          <label htmlFor="ticket-example">ID del ticket</label>
          <div className={styles.mockInput} id="ticket-example">ID-123<span aria-hidden="true" /></div>
          <p className={styles.destination}>jira.example.com/browse/ID-123</p>
          <div className={styles.recent}><span>ID-123</span><p>Mejorar la navegación del formulario</p></div>
          <div className={styles.previewBottom}><span className={styles.mockButton}>Abrir ↵</span><span>Escribe el ID y pulsa Enter</span></div>
          <p className={styles.previewCaption}>Tu ticket, a un atajo de distancia.</p>
        </div>
      </header>
      <div className={styles.benefits}><span>01 / Copia a tu manera</span><span>02 / Prepara tu daily</span><span>03 / Todo guardado en local</span></div>
      <section id="funciones" className={styles.features} aria-labelledby="features-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>DEL TICKET A TU SIGUIENTE TAREA</p><h2 id="features-title">Pequeñas herramientas.<br />Menos trabajo repetido.</h2><p>Para esos gestos que haces cada día: compartir un enlace, reunir pendientes o contar cómo va el trabajo.</p></div>
        <div className={styles.featureRow}>
          <div className={styles.featureText}><span className={styles.number}>01 — SPOTLIGHT</span><h3>Sabes el ID.<br />Ya sabes llegar.</h3><p>Abre el buscador sobre la página actual, escribe el ID y pulsa Enter. El ticket se abre en una pestaña nueva, con el dominio de Jira que hayas configurado.</p><p>También desde la barra de Chrome: <kbd>jira</kbd> + <kbd>Tab</kbd> + ID.</p><div className={styles.shortcut}><kbd>⌘</kbd><kbd>⇧</kbd><kbd>O</kbd><span>Mac</span><kbd>Alt</kbd><kbd>⇧</kbd><kbd>O</kbd><span>Windows / Linux</span></div></div>
          <div className={styles.featureVisual}><Screenshot file="02-spotlight" alt="Spotlight con el ID-123, destino visible y sugerencia del historial" /></div>
        </div>
        <div className={`${styles.featureRow} ${styles.reverse}`}>
          <div className={styles.featureText}><span className={styles.number}>02 — FORMATOS Y PLANTILLAS</span><h3>Copia una vez.<br />Pégalo como necesitas.</h3><p>Texto enriquecido para documentos, Markdown para tus notas o texto plano. Elige una plantilla para Slack, documentación o crea la tuya.</p><p>Conserva el ID, el título y el enlace. Añade estado y responsable cuando hagan falta.</p><div className={styles.tags}><span>Texto enriquecido</span><span>Markdown</span><span>Texto plano</span></div></div>
          <div className={styles.featureVisual}><Screenshot file="03-formatos-y-plantillas" alt="Ajustes de formatos de copia y plantilla para Slack con vista previa" /></div>
        </div>
        <div className={styles.wideFeature}>
          <div><span className={styles.number}>03 — BANDEJA E INFORMES</span><h3>Tu próxima daily,<br /><em>con los tickets en orden.</em></h3></div>
          <p>Reúne los tickets en una bandeja, cópialos juntos o agrúpalos por estado. Revisa la vista previa y lleva la actualización a donde trabaja tu equipo.</p>
          <div className={styles.wideScreenshot}><Screenshot file="04-bandeja-e-informes" alt="Dos tickets en la bandeja y una actualización agrupada en En curso y Hecho" /></div>
          <p className={styles.caption}>Los datos se guardan al añadir el ticket. Vuelve a añadirlo desde Jira para actualizarlo.</p>
        </div>
        <div className={styles.featureRow}>
          <div className={styles.featureText}><span className={styles.number}>04 — HISTORIAL LOCAL</span><h3>Ese ticket que copiaste.<br />Aquí sigue.</h3><p>Recupera los últimos 100 tickets copiados. Busca por ID o título y vuelve a copiarlos con tu formato y plantilla actuales.</p><p>El historial se queda en tu navegador. Puedes borrar un ticket o vaciarlo entero cuando quieras.</p></div>
          <div className={styles.featureVisual}><Screenshot file="05-historial-local" alt="Historial local con búsqueda por ID o título y acciones de copiar y eliminar" /></div>
        </div>
        <div className={styles.menuFeature}><Screenshot file="01-menu-de-herramientas" alt="Menú del rayo con siete acciones y sus atajos" /><div><span className={styles.number}>TODO A MANO</span><h3>Un rayo.<br />Siete acciones.</h3><p>Copia, añade a la bandeja, abre por ID o prepara una actualización desde el mismo menú. Con el menú abierto, las teclas del 1 al 7 te llevan a cada acción.</p><a className={styles.textLink} href="#atajos">Ver los atajos <span aria-hidden="true">↗</span></a></div></div>
      </section>
      <section className={styles.privacy} aria-labelledby="privacy-heading"><span className={styles.privacyIcon} aria-hidden="true">↳</span><div><p className={styles.eyebrow}>TUS TICKETS, EN TU NAVEGADOR</p><h2 id="privacy-heading">Local por diseño.</h2><p>Tu bandeja, historial, plantillas y preferencias se guardan en el navegador. La extensión no envía estos datos a servidores del desarrollador, no incorpora analítica ni publicidad y no modifica tus tickets de Jira.</p><a className={styles.textLink} href="/jira-tools/privacy">Leer la política de privacidad <span aria-hidden="true">↗</span></a></div></section>
      <section className={styles.faq} id="preguntas" aria-labelledby="faq-heading"><div><p className={styles.eyebrow}>ANTES DE EMPEZAR</p><h2 id="faq-heading">Algunas respuestas.</h2></div><div className={styles.questions}>
        <details><summary>¿Dónde puedo instalar Jira Tools?</summary><p>La extensión está en revisión en Chrome Web Store. El enlace de instalación estará disponible en esta página cuando se publique.</p></details>
        <details><summary>¿Cómo configuro mi Jira?</summary><p>En la extensión, abre Ajustes → Jira y guarda el dominio de tu instancia. Spotlight lo utilizará para construir el enlace del ticket. Abrir por ID no comprueba que el ticket exista.</p></details>
        <details id="atajos"><summary>¿Qué atajos puedo usar?</summary><p>En Mac: ⌘⇧J para copiar, ⌘⇧K para añadir a bandeja, ⌘⇧O para Spotlight y ⌘⇧Y para el menú. En Windows y Linux, usa Alt+Mayús en lugar de ⌘⇧.</p><p>Son combinaciones sugeridas. Si alguna está ocupada, puedes cambiarla en chrome://extensions/shortcuts. Ajustes → Atajos muestra las combinaciones realmente asignadas.</p></details>
        <details><summary>¿Se actualizan los tickets en segundo plano?</summary><p>No. La bandeja y el historial guardan una captura de los datos. Vuelve a añadir el ticket desde Jira para refrescarlo. Jira Tools no utiliza la API de Jira ni modifica tickets.</p></details>
        <details><summary>¿Funciona en cualquier página?</summary><p>Spotlight se abre sobre la página actual. En páginas internas de Chrome o sitios protegidos utiliza el popup de la extensión o una ventana compacta. La lectura de tickets depende de la estructura de tu instancia de Jira.</p></details>
      </div></section>
      <section className={styles.closing}><Image src={`${assets}/icon.png`} alt="" width={56} height={56}/><h2>Tu trabajo ya tiene<br />suficientes pestañas.</h2><p>Acorta el camino entre un ticket y lo que viene después.</p><span className={styles.storeStatus}>En revisión en Chrome Web Store</span></section>
      <footer className={styles.footer}><a className={styles.brand} href="/jira-tools">⚡ Jira Tools</a><span>Hecho por <a href="/es">Josue Somarribas</a></span><a href="/jira-tools/privacy">Política de privacidad</a><p>Jira Tools es un proyecto independiente y no está afiliado a Atlassian.</p></footer>
    </div>
  </main>;
}
