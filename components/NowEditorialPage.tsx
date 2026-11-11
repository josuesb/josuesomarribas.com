import Image from "next/image";

type Locale = "en" | "es";

const copy = {
  en: {
    field: "NOW — FIELD LOG 08/26",
    title: <>Designing clearer paths<br/>from evidence to action.</>,
    discipline: "UX ENGINEERING · EXPERIMENTATION · PRODUCT STRATEGY",
    intro: "I help teams turn research signals into interface decisions—faster, safer, and easier to repeat.",
    updated: "Barcelona, Spain · Updated August 2026",
    status: "LIVE STATUS",
    statuses: [["01","Shipping"],["02","Investigating"],["03","Learning"],["04","Reading"]],
    shipping: "Shipping now",
    playbook: "Evidence-to-Interface Playbook",
    shippingCopy: "A practical system for turning research signals into interface decisions—faster, safer, and easier to repeat.",
    progress: "63% complete",
    questions: "Questions on my wall",
    questionItems: ["What would we stop measuring if we trusted our users more?","Which decisions are we still making without enough evidence?","Where is complexity protecting us from shipping?"],
    signals: "Signals I’m following",
    signalItems: [["Behavioral latency","Small delays, big intent."],["Counterfactual clarity","Better ‘what ifs’, better choices."],["Interface elasticity","Systems that adapt without chaos."]],
    learning: "Learning in public",
    learningItems: [["Causal inference","Separating correlation from causation."],["Decision systems","Designing choices, not just flows."],["Adaptive interfaces","Interfaces that respond to context, not just input."]],
    reading: "Reading / listening",
    readingItems: ["The Catalyst — Jonah Berger","Superforecasting — Philip Tetlock","Range — David Epstein","Why We Decide — Jonah Lehrer","The Pragmatist’s Guide to Experimentation","Hidden Potential — Adam Grant"],
    open: "Open for selected collaborations",
    services: [["CRO Strategy","Turn complexity into compounding lift."],["UX Engineering","Ship resilient experiences that scale."],["Product Audits","Cut noise. Focus the next right bet."]],
    cta: "Bring me the problem that won’t behave.",
    talk: "Start a conversation",
    built: "Built in Barcelona",
  },
  es: {
    field: "AHORA — DIARIO DE CAMPO 08/26",
    title: <>Diseñando caminos más claros<br/>de la evidencia a la acción.</>,
    discipline: "INGENIERÍA UX · EXPERIMENTACIÓN · ESTRATEGIA DE PRODUCTO",
    intro: "Ayudo a equipos a convertir señales de investigación en decisiones de interfaz más rápidas, seguras y repetibles.",
    updated: "Barcelona, España · Actualizado en agosto de 2026",
    status: "ESTADO ACTUAL",
    statuses: [["01","Publicando"],["02","Investigando"],["03","Aprendiendo"],["04","Leyendo"]],
    shipping: "Publicando ahora",
    playbook: "Playbook de evidencia a interfaz",
    shippingCopy: "Un sistema práctico para transformar señales de investigación en decisiones de interfaz más rápidas, seguras y fáciles de repetir.",
    progress: "63% completado",
    questions: "Preguntas en mi pared",
    questionItems: ["¿Qué dejaríamos de medir si confiáramos más en nuestros usuarios?","¿Qué decisiones seguimos tomando sin evidencia suficiente?","¿Dónde nos protege la complejidad de publicar?"],
    signals: "Señales que sigo",
    signalItems: [["Latencia conductual","Pequeños retrasos, gran intención."],["Claridad contrafactual","Mejores hipótesis, mejores decisiones."],["Elasticidad de interfaz","Sistemas que se adaptan sin caos."]],
    learning: "Aprendiendo en público",
    learningItems: [["Inferencia causal","Separar correlación de causalidad."],["Sistemas de decisión","Diseñar decisiones, no solo flujos."],["Interfaces adaptativas","Responder al contexto, no solo al input."]],
    reading: "Leyendo / escuchando",
    readingItems: ["The Catalyst — Jonah Berger","Superforecasting — Philip Tetlock","Range — David Epstein","Why We Decide — Jonah Lehrer","The Pragmatist’s Guide to Experimentation","Hidden Potential — Adam Grant"],
    open: "Disponible para colaboraciones seleccionadas",
    services: [["Estrategia CRO","Convertir complejidad en mejora acumulativa."],["Ingeniería UX","Crear experiencias resistentes que escalan."],["Auditorías de producto","Eliminar ruido y enfocar la siguiente apuesta."]],
    cta: "Tráeme el problema que no se deja domar.",
    talk: "Iniciar una conversación",
    built: "Hecho en Barcelona",
  },
};

const asset = "/assets/now/editorial";

export default function NowEditorialPage({locale="en"}:{locale?:Locale}) {
  const t = copy[locale];
  const home = locale === "es" ? "/es" : "/";
  const blog = locale === "es" ? "/es/blog" : "/blog";
  return <main className="now-page" lang={locale}>
    

    <section className="now-editorial-hero shell">
      <div className="now-cover-copy">
        <p className="now-kicker">{t.field}</p>
        <h1>{t.title}</h1>
        <p className="now-discipline">{t.discipline}</p>
        <p className="now-intro">{t.intro}</p>
        <small>{t.updated}</small>
      </div>
      <div className="now-observatory" aria-label={locale === "es" ? "Observatorio visual de señales y decisiones" : "Visual observatory of signals and decisions"}>
        <Image className="observatory-layer observatory-discs" src={`${asset}/hero-discs.png`} alt="" width={1536} height={1024} unoptimized/>
        <Image className="observatory-layer observatory-evidence" src={`${asset}/hero-evidence.png`} alt="" width={1536} height={1024} unoptimized/>
        <Image className="observatory-layer observatory-route" src={`${asset}/hero-route.png`} alt="" width={1862} height={845} unoptimized/>
      </div>
    </section>

    <section className="now-status shell" aria-label={t.status}>
      <b><i/>{t.status}</b>
      {t.statuses.map(([number,label])=><div key={number}><span>{number}</span><strong>{label}</strong></div>)}
    </section>

    <section className="now-journal shell">
      <article className="now-shipping">
        <div className="now-figure-copy"><small>FIG. 01</small><h2>{t.shipping}</h2><h3>{t.playbook}</h3><p>{t.shippingCopy}</p><strong>{t.progress}</strong><i className="now-progress"/></div>
        <Image className="shipping-art" src={`${asset}/shipping-layers.png`} alt={locale === "es" ? "Capas de evidencia, decisión e interfaz" : "Layers of evidence, decision and interface"} width={1536} height={1024} unoptimized/>
      </article>

      <aside className="now-questions"><small>FIG. 02</small><h2>{t.questions}</h2><ol>{t.questionItems.map((item,index)=><li key={item}><b>0{index+1}</b><span>{item}</span></li>)}</ol></aside>

      <article className="now-signals"><small>FIG. 03</small><h2>{t.signals}</h2><Image src={`${asset}/signal-symbols.png`} alt="" width={2172} height={724} unoptimized/><div>{t.signalItems.map(([title,description])=><section key={title}><h3>{title}</h3><p>{description}</p></section>)}</div></article>

      <article className="now-learning"><small>FIG. 04</small><h2>{t.learning}</h2><ol>{t.learningItems.map(([title,description],index)=><li key={title}><b>0{index+1}</b><span><strong>{title}</strong>{description}</span></li>)}</ol></article>

      <article className="now-reading-list"><small>FIG. 05</small><h2>{t.reading}</h2><ol>{t.readingItems.map((item,index)=><li key={item}><b>{String(index+1).padStart(2,"0")}</b><span>{item}</span></li>)}</ol><a href={blog}>{locale === "es" ? "Notas en el sitio" : "Notes are on the site"} </a></article>

      <article className="now-collaborations"><small>FIG. 06</small><h2>{t.open}</h2><ul>{t.services.map(([title,description])=><li key={title}><strong>{title}</strong><span>{description}</span></li>)}</ul></article>
    </section>

    <section className="now-final-cta shell">
      <Image src={`${asset}/cta-mark.png`} alt="" width={1536} height={1024} unoptimized/>
      <h2>{t.cta}</h2>
      <a href="mailto:josuesomarribasb@gmail.com">{t.talk} </a>
    </section>

    <footer className="now-editorial-footer"><div className="shell"><span>© 2026 Josue Somarribas</span><span>41.3851° N, 2.1734° E</span><span>{t.built} <i/></span><a href={home}>JS.</a></div></footer>
  </main>;
}
