import SiteFooter from "../../../../components/SiteFooter";
import type { Metadata } from "next";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Política de privacidad de Jira Tools",
  description: "Información sobre el tratamiento, el almacenamiento local y la eliminación de los datos de Jira Tools.",
  alternates: { canonical: "/jira-tools/privacy" },
};

export default function JiraToolsPrivacyPage() {
  return (
    <><main className={styles.page}>
      <article className={styles.document} aria-labelledby="privacy-title">
        <header className={styles.header}>
          <a className={styles.brand} href="/es">Josue Somarribas </a>
          <p className={styles.label}>JIRA TOOLS / PRIVACIDAD</p>
          <h1 id="privacy-title">Política de privacidad de Jira Tools</h1>
        </header>
        <div className={styles.content}>
          <p>Jira Tools procesa información de los tickets de Jira cuando el usuario utiliza sus funciones, incluidos identificadores, títulos, enlaces, estados, responsables y contenido mostrado en modo lectura.</p>
          <p>La bandeja, el historial, las preferencias, las plantillas y el dominio de Jira se almacenan localmente en el navegador. La extensión no transmite estos datos a servidores del desarrollador ni incorpora servicios de analítica o publicidad.</p>
          <p>Los datos se utilizan exclusivamente para copiar, organizar, consultar y abrir tickets y preparar actualizaciones. No se venden, no se utilizan con fines publicitarios ni para determinar la solvencia crediticia.</p>
          <p>El usuario puede borrar la bandeja y el historial desde la extensión. Al desinstalarla se eliminan sus datos almacenados en el navegador.</p>
          <p>Jira Tools cumple la Política de Datos de Usuario de Chrome Web Store, incluidos sus requisitos de uso limitado.</p>
        </div>
        <p className={styles.footer}>Jira Tools · Política de privacidad</p>
      </article>
    </main><SiteFooter locale="es"/></>
  );
}
