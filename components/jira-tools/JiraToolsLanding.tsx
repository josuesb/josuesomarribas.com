import { ButtonLink, TextLink } from "../ui/Action";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import SiteFooter from "../SiteFooter";
import ContactArtwork3D from "../ContactArtwork3D";
import CopyEmailButton from "../CopyEmailButton";
import { english } from "./translations";
import Image from "next/image";
import styles from "./landing.module.css";

const assets = "/assets/jira-tools";

function Screenshot({ file, alt, priority = false }: { file: string; alt: string; priority?: boolean }) {
  return <Image src={`${assets}/${file}-1280x800.png`} alt={alt} width={1280} height={800} priority={priority} sizes="(max-width: 760px) 100vw, 1100px" className={styles.screenshot} />;
}

function translate(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    const trimmed = node.trim();
    return english[trimmed] ? node.replace(trimmed, english[trimmed]) : node;
  }
  if (Array.isArray(node)) return node.map(translate);
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const props = { ...element.props };
  for (const key of ["alt", "aria-label"]) {
    if (typeof props[key] === "string") props[key] = english[props[key]] ?? props[key];
  }
  return cloneElement(element, props, translate(props.children as ReactNode));
}

export default function JiraToolsLanding({ locale }: { locale: "en" | "es" }) {
  const path = locale === "es" ? "/es/jira-tools" : "/jira-tools";
  const content = <><main className={styles.page}>
    <a href="#contenido" className={styles.skip}>Saltar al contenido</a>
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Navegación de Jira Tools">
        <a className={styles.brand} href={path} aria-label="Jira Tools, inicio"><Image src={`${assets}/icon.png`} width={36} height={36} alt="" />Jira Tools</a>
        <div className={styles.navLinks}><a href="#funciones">Funciones</a><a href="#preguntas">Preguntas</a><a href="/jira-tools/privacy">Privacidad </a></div>
      </nav>
      <header className={styles.hero} id="contenido">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> UNA EXTENSIÓN PARA CHROME</p>
          <h1>Copia, organiza<br />y <em>abre tickets.</em></h1>
          <p className={styles.lead}>Menos pasos entre Jira y el resto de tu trabajo. Copia con tu formato, reúne tus tickets y prepara la próxima actualización.</p>
          <div className={styles.heroActions}><ButtonLink href="#funciones">Descubrir las funciones </ButtonLink></div>
          <p className={styles.status}><span /> En revisión en Chrome Web Store</p>
        </div>
        <div className={styles.spotlightPreview} aria-label="Ejemplo del buscador de tickets Spotlight">
          <div className={styles.previewTop}><span>⚡ Abrir ticket</span><kbd>Esc</kbd></div>
          <span className={styles.inputLabel}>ID del ticket</span>
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
        <div className={styles.menuFeature}><Screenshot file="01-menu-de-herramientas" alt="Menú del rayo con siete acciones y sus atajos" /><div><span className={styles.number}>TODO A MANO</span><h3>Un rayo.<br />Siete acciones.</h3><p>Copia, añade a la bandeja, abre por ID o prepara una actualización desde el mismo menú. Con el menú abierto, las teclas del 1 al 7 te llevan a cada acción.</p><TextLink className={styles.textLink} href="#atajos">Ver los atajos </TextLink></div></div>
      </section>
      <section className={styles.privacy} aria-labelledby="privacy-heading"><span className={styles.privacyIcon} aria-hidden="true">↳</span><div><p className={styles.eyebrow}>TUS TICKETS, EN TU NAVEGADOR</p><h2 id="privacy-heading">Local por diseño.</h2><p>Tu bandeja, historial, plantillas y preferencias se guardan en el navegador. La extensión no envía estos datos a servidores del desarrollador, no incorpora analítica ni publicidad y no modifica tus tickets de Jira.</p><TextLink className={styles.textLink} href="/jira-tools/privacy">Leer la política de privacidad </TextLink></div></section>
      <section className={styles.faq} id="preguntas" aria-labelledby="faq-heading"><div><p className={styles.eyebrow}>ANTES DE EMPEZAR</p><h2 id="faq-heading">Algunas respuestas.</h2></div><div className={styles.questions}>
        <details><summary>¿Dónde puedo instalar Jira Tools?</summary><p>La extensión está en revisión en Chrome Web Store. El enlace de instalación estará disponible en esta página cuando se publique.</p></details>
        <details><summary>¿Cómo configuro mi Jira?</summary><p>En la extensión, abre Ajustes → Jira y guarda el dominio de tu instancia. Spotlight lo utilizará para construir el enlace del ticket. Abrir por ID no comprueba que el ticket exista.</p></details>
        <details id="atajos"><summary>¿Qué atajos puedo usar?</summary><p>En Mac: ⌘⇧J para copiar, ⌘⇧K para añadir a bandeja, ⌘⇧O para Spotlight y ⌘⇧Y para el menú. En Windows y Linux, usa Alt+Mayús en lugar de ⌘⇧.</p><p>Son combinaciones sugeridas. Si alguna está ocupada, puedes cambiarla en chrome://extensions/shortcuts. Ajustes → Atajos muestra las combinaciones realmente asignadas.</p></details>
        <details><summary>¿Se actualizan los tickets en segundo plano?</summary><p>No. La bandeja y el historial guardan una captura de los datos. Vuelve a añadir el ticket desde Jira para refrescarlo. Jira Tools no utiliza la API de Jira ni modifica tickets.</p></details>
        <details><summary>¿Funciona en cualquier página?</summary><p>Spotlight se abre sobre la página actual. En páginas internas de Chrome o sitios protegidos utiliza el popup de la extensión o una ventana compacta. La lectura de tickets depende de la estructura de tu instancia de Jira.</p></details>
      </div></section>
      <section className={styles.closing}><Image src={`${assets}/icon.png`} alt="" width={56} height={56}/><h2>Tu trabajo ya tiene<br />suficientes pestañas.</h2><p>Acorta el camino entre un ticket y lo que viene después.</p><span className={styles.storeStatus}>En revisión en Chrome Web Store</span><p><TextLink className={styles.textLink} href={`${locale === "es" ? "/es" : ""}/blog/jira-tools-copy-organize-open-tickets`}>Leer cómo he diseñado Jira Tools </TextLink></p></section>

    </div>
  </main>
  <section className="contact"><ContactArtwork3D /><div className="shell contact-grid"><div><h2>¿Tienes un problema de producto<br />que se resiste?</h2><p>Envíame la versión desordenada. No hace falta una presentación.</p></div><div><div className="actions"><ButtonLink variant="light" href="mailto:josuesomarribasb@gmail.com">Iniciar una conversación </ButtonLink><CopyEmailButton label={locale === "es" ? "Copiar email" : "Copy email"} copiedLabel={locale === "es" ? "Copiado" : "Copied"}/></div><p>Desde España · CET · Español + Inglés</p></div></div></section>
  <SiteFooter locale={locale}/></>;
  return locale === "en" ? translate(content) : content;
}
