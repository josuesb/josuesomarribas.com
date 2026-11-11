import styles from "../app/home.module.css";

export default function HomeExperimentPanel({locale}:{locale:"en"|"es"}) {
  const es=locale==="es";
  const steps = es ? [
    ["Observar", "Detectar dónde se atasca la gente en el recorrido."],
    ["Plantear", "Definir qué comportamiento debería cambiar."],
    ["Construir", "variant: 'B'\nchange: 'clarity'\nqa: 'passed'"],
    ["Medir", "Comparar con el control y revisar las métricas de protección."],
  ] : [
    ["Observe", "Find where people get stuck in the journey."],
    ["Hypothesise", "Define the behaviour you expect to change."],
    ["Build", "variant: 'B'\nchange: 'clarity'\nqa: 'passed'"],
    ["Measure", "Compare with the control and check guardrail metrics."],
  ];
  return <div className={styles.instrument} role="group" aria-label={es ? "Ejemplo ilustrativo de un experimento, no son resultados de clientes" : "Illustrative experiment workflow, not client results"}>
    <div className={styles.instrumentTop}><span><i aria-hidden="true"/>{es ? "Flujo de un experimento" : "Experiment workflow"}</span><span>{es ? "Diseñar → Publicar → Aprender" : "Design → Deploy → Learn"}</span></div>
    <ol className={styles.instrumentSteps}>{steps.map(([title,description],index)=><li key={title}>
      <span className={styles.stepNumber}>{String(index+1).padStart(2,"0")}</span><strong>{title}</strong>
      {index===2 ? <code>{description}</code> : <p>{description}</p>}
    </li>)}</ol>
    <div className={styles.instrumentBottom}><span>{es ? "Ejemplo ilustrativo" : "Illustrative workflow"}</span><span>JS · CRO</span></div>
  </div>;
}
