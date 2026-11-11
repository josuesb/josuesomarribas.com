"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { useDeviceTilt } from "./useDeviceTilt";

type Locale = "en" | "es";

const copy = {
  en: { aria:"Illustrative experiment workflow; not client results", signal:"SIGNAL", hypothesis:"HYPOTHESIS", build:"BUILD", measure:"MEASURE", observation:"Friction", signalText:"People hesitate at pricing.", hypothesisText:<>Clearer plan details help people choose.</>, result:"Compare", comparison:"Control / variant", guardrails:"Outcome + guardrails", caption:"Illustrative workflow · not client results", activate:"Enable motion", denied:"Motion access blocked" },
  es: { aria:"Ejemplo de un experimento; no son resultados de clientes", signal:"SEÑAL", hypothesis:"HIPÓTESIS", build:"CONSTRUIR", measure:"MEDIR", observation:"Fricción", signalText:"Dudas al elegir un plan.", hypothesisText:<>Aclarar los planes facilita la elección.</>, result:"Comparar", comparison:"Control / variante", guardrails:"Resultado + guardrails", caption:"Ejemplo ilustrativo · no son resultados de clientes", activate:"Activar movimiento", denied:"Acceso al movimiento bloqueado" },
} as const;

export default function HeroExperimentArtwork({ locale = "en" }: { locale?: Locale }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const t = copy[locale];

  const applyTilt = (x: number, y: number) => {
    if (!sceneRef.current) return;
    sceneRef.current.style.setProperty("--scene-rotate-x", `${(-y * 10).toFixed(2)}deg`);
    sceneRef.current.style.setProperty("--scene-rotate-y", `${(x * 14).toFixed(2)}deg`);
    sceneRef.current.style.setProperty("--scene-light-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    sceneRef.current.style.setProperty("--scene-light-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const { requestAccess: requestTiltAccess, status: tiltStatus } = useDeviceTilt(applyTilt);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !sceneRef.current) return;
    const bounds = sceneRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    applyTilt(x, y);
  };

  const resetScene = () => {
    if (!sceneRef.current) return;
    sceneRef.current.style.setProperty("--scene-rotate-x", "0deg");
    sceneRef.current.style.setProperty("--scene-rotate-y", "0deg");
    sceneRef.current.style.setProperty("--scene-light-x", "50%");
    sceneRef.current.style.setProperty("--scene-light-y", "45%");
  };

  const steps = [
    { label:t.signal, number:"01", className:"flow-signal", content:<><strong>{t.observation}</strong><p>{t.signalText}</p></> },
    { label:t.hypothesis, number:"02", className:"flow-hypothesis", content:<p>{t.hypothesisText}</p> },
    { label:t.build, number:"03", className:"flow-build", content:<code><span><b>const</b> test = {'{'}</span><span>&nbsp;&nbsp;variant: <i>&apos;B&apos;</i>,</span><span>&nbsp;&nbsp;change: <i>&apos;clarity&apos;</i></span><span>{'}'};</span><em>deploy(test);</em></code> },
    { label:t.measure, number:"04", className:"flow-measure", content:<><strong>{t.result}</strong><span>{t.comparison}</span><hr/><span>{t.guardrails}</span></> },
  ];

  return <div className="hero-flow-perspective" onPointerMove={handlePointerMove} onPointerLeave={resetScene}>
    {tiltStatus !== "active" && <button className="hero-motion-control" type="button" onClick={requestTiltAccess}>{tiltStatus === "denied" ? t.denied : t.activate}</button>}
    <div ref={sceneRef} className="hero-signal-flow" role="group" aria-label={t.aria}>
      <div className="hero-flow-line" aria-hidden="true" />
      {steps.map((step,index)=><section className={`hero-flow-step ${step.className}`} key={step.label} style={{ "--flow-index":index } as CSSProperties}>
        <header><b>{step.label}</b><span>{step.number}</span><i aria-hidden="true" /></header>
        <div>{step.content}</div>
      </section>)}
    </div>
    <p className="hero-flow-caption">{t.caption}</p>
  </div>;
}
