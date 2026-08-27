import type { Metadata } from "next";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import Home from "../page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Josue Somarribas — Ingeniero UX y desarrollador CRO",
  description: "Investigación, experimentación y desarrollo front-end de producción, desde la primera señal hasta una experiencia publicada.",
  alternates: { canonical: "/es", languages: { en: "/", es: "/es", "x-default": "/" } },
  openGraph: { title: "Josue Somarribas — Ingeniero UX y desarrollador CRO", description: "Detecto dónde dudan las personas, diseño la experiencia y construyo la solución.", url: "/es", locale: "es_ES", alternateLocale: ["en_US"] },
};

const translations: Record<string, string> = {
  "Primary navigation":"Navegación principal","Language selector":"Selector de idioma","Work":"Proyectos","Experiments":"Experimentos","Writing":"Artículos","About":"Sobre mí","Résumé":"Currículum","Let's talk ":"Hablemos ",
  "UX ENGINEER × CRO DEVELOPER":"INGENIERO UX × DESARROLLADOR CRO","I find why people":"Detecto dónde dudan","hesitate—then design":"y diseño","and ":"y ","build the fix.":"construyo la solución.",
  "Research, interface design, front-end implementation and experimentation—from first signal to shipped experience.":"Investigación, diseño de interfaces, implementación front-end y experimentación: desde la primera señal hasta una experiencia publicada.",
  "Research, interface design, front-end implementation and experimentation—from first signal to a measurable, shipped experience.":"Investigación, diseño de interfaces, implementación front-end y experimentación: desde la primera señal hasta una experiencia publicada y medible.",
  "View selected work ":"Ver proyectos ","Discuss a project ":"Cuéntame tu proyecto ","8+ years across UX and web development ":"Más de 8 años en UX y desarrollo web "," Working globally":" Trabajo globalmente",
  "User research":"Investigación de usuarios","Uncover real user needs with clear, actionable insights.":"Descubrir necesidades reales mediante hallazgos claros y accionables.","Experiment design":"Diseño de experimentos","Formulate hypotheses, test quickly, learn what matters.":"Formular hipótesis, probar rápido y aprender lo que importa.",
  "Turn signals into hypotheses, test quickly and learn what matters.":"Convertir señales en hipótesis, probar rápido y aprender lo que importa.","Build accessible, performant interfaces ready to ship and scale.":"Construir interfaces accesibles y rápidas, preparadas para publicar y escalar.","Instrument clean events, validate releases and protect the learning.":"Instrumentar eventos limpios, validar lanzamientos y proteger el aprendizaje.",
  "Production front-end":"Front-end de producción","Accessible, performant interfaces built to ship and scale.":"Interfaces accesibles y rápidas, preparadas para publicar y escalar.","Analytics & QA":"Analítica y QA","Reliable instrumentation and quality that protect learning.":"Instrumentación fiable y calidad que protegen el aprendizaje.",
  "Selected work":"Proyectos seleccionados","Different problems. Different roles. The same obsession with clarity.":"Problemas distintos. Roles distintos. La misma obsesión por la claridad.","INDEPENDENT PRODUCT · RESEARCH + FRONT-END":"PRODUCTO INDEPENDIENTE · INVESTIGACIÓN + FRONT-END",
  "A live tool for testing whether a value proposition is understood in five seconds.":"Una herramienta para comprobar si una propuesta de valor se entiende en cinco segundos.","Live product":"Producto real","Built end-to-end":"Creado de principio a fin","Research workflow":"Flujo de investigación","Try the tool ":"Probar herramienta ","Read the story →":"Leer el caso →",
  "EXPERIMENT · UX ENGINEERING":"EXPERIMENTO · INGENIERÍA UX","A browser-based experiment exploring how typography changes perception and trust.":"Un experimento en el navegador que explora cómo la tipografía modifica la percepción y la confianza.","Which design feels more":"¿Qué diseño transmite más","trustworthy?":"confianza?","Choose one option.":"Elige una opción.",
  "Interactive prototype":"Prototipo interactivo","Behavioral comparison":"Comparación de comportamiento","Front-end build":"Desarrollo front-end","Explore prototype ":"Explorar prototipo ","CLIENT WORK · WEB DEVELOPMENT":"TRABAJO PARA CLIENTE · DESARROLLO WEB","A digital home for Costa Rica's startup and pitch community.":"Un hogar digital para la comunidad de startups y pitch de Costa Rica.",
  "Where founders":"Donde los fundadores","connect and grow.":"conectan y crecen.","See upcoming events":"Ver próximos eventos","Role:":"Rol:","Design implementation":"Implementación del diseño","Focus:":"Enfoque:","Responsive UI":"Interfaz responsive","Visit live site ":"Visitar web ",
  "NDA-PROTECTED":"PROTEGIDO POR NDA","Enterprise work, selected details":"Trabajo enterprise, detalles seleccionados","I can walk through responsibilities,":"Puedo explicar responsabilidades,","constraints and outcomes in conversation.":"restricciones y resultados en una conversación.","Ask about this work ":"Preguntar por este trabajo ",
  "From signal to shipped experiment":"De la señal al experimento publicado","Observe":"Observar","Frame":"Enmarcar","Prototype":"Prototipar","Instrument & ship":"Instrumentar y publicar","Learn":"Aprender",
  "CLIENT WORK · WEB DESIGN + DEVELOPMENT":"TRABAJO PARA CLIENTE · DISEÑO + DESARROLLO WEB","CLIENT WORK · CREATIVE WEB DEVELOPMENT":"TRABAJO PARA CLIENTE · DESARROLLO WEB CREATIVO","A digital presence for a Costa Rican construction company—from planning and design to finished spaces.":"Una presencia digital para una constructora costarricense: desde la planificación y el diseño hasta los espacios terminados.","A distinctive artist website for opera and bolero tenor Andrés Rodríguez, based in Barcelona.":"Una web de artista con personalidad para Andrés Rodríguez, tenor de ópera y boleros afincado en Barcelona.","Web design & development":"Diseño y desarrollo web","Brand presence · Responsive UI":"Presencia de marca · Interfaz responsive","Artist identity · Performance":"Identidad artística · Rendimiento","Spaces built":"Espacios creados","with purpose.":"con propósito.","A voice that":"Una voz que","crosses borders.":"cruza fronteras.","Listen now　↗":"Escuchar ahora　↗","Have a stubborn":"¿Tienes un problema de producto","product problem?":"que se resiste?","Send me the messy version. No pitch deck required.":"Envíame la versión desordenada. No hace falta una presentación.","Start a conversation ":"Iniciar una conversación ","✉ Copy email":"✉ Copiar email","Based in Spain　·　CET　·　English + Spanish":"Desde España　·　CET　·　Español + Inglés","© 2026 Josue Somarribas. All rights reserved.":"© 2026 Josue Somarribas. Todos los derechos reservados."
  ," Available for remote collaboration":" Disponible para colaboración remota","More selected work":"Más proyectos seleccionados","Client websites built with the same attention to clarity, performance and craft.":"Webs para clientes creadas con la misma atención a la claridad, el rendimiento y el oficio.","Products & experiments":"Productos y experimentos","Independent tools built to test ideas, behavior and clarity.":"Herramientas independientes para probar ideas, comportamiento y claridad.","Selected enterprise work under NDA":"Trabajo enterprise seleccionado bajo NDA","Ask for a private walkthrough ":"Solicitar un recorrido privado ","A continuous loop from behavioral signal to an evidence-backed product decision.":"Un ciclo continuo desde la señal de comportamiento hasta una decisión de producto basada en evidencia.","Product collaborator · Enterprise project":"Colaborador de producto · Proyecto enterprise","Read 14 recommendations ":"Leer 14 recomendaciones "
  ,"How I bridge design decisions and production constraints.":"Cómo conecto las decisiones de diseño con las restricciones de producción.","A question reframed as a testable decision":"Una pregunta replanteada como una decisión comprobable","Accessible A and B component variants":"Variantes accesibles de los componentes A y B","Experiment quality assurance checklist":"Lista de control de calidad del experimento"
};

function translate(node: ReactNode): ReactNode {
  if (typeof node === "string") return translations[node] ?? node;
  if (Array.isArray(node)) return node.map(translate);
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const props = { ...element.props } as Record<string, unknown>;
  if (typeof props["aria-label"] === "string") props["aria-label"] = translations[props["aria-label"]] ?? props["aria-label"];
  if (props.href === "/") props.className = "";
  if (props.href === "/es") props.className = "active";
  if (props.href === "/writing") props.href = "/es/writing";
  return cloneElement(element, props, translate(element.props.children as ReactNode));
}

export default function SpanishHome() { return <div lang="es">{translate(Home({ locale:"es" }))}</div>; }
