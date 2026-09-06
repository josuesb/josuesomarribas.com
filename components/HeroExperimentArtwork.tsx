"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { useDeviceTilt } from "./useDeviceTilt";

type Locale = "en" | "es";

const copy = {
  en: { aria:"Experiment workflow from signal to measurable result", signal:"SIGNAL", hypothesis:"HYPOTHESIS", build:"BUILD", measure:"MEASURE", conversion:"Conversion rate", hypothesisText:<>If we <b>reduce friction</b> in the pricing section, more users will complete the upgrade.</>, result:"Result", lift:"Lift", significance:"Stat. Sig.", activate:"Enable motion", denied:"Motion access blocked" },
  es: { aria:"Flujo de experimento desde la señal hasta un resultado medible", signal:"SEÑAL", hypothesis:"HIPÓTESIS", build:"CONSTRUIR", measure:"MEDIR", conversion:"Tasa de conversión", hypothesisText:<>Si <b>reducimos la fricción</b> en la sección de precios, más personas completarán la mejora.</>, result:"Resultado", lift:"Mejora", significance:"Sig. estadística", activate:"Activar movimiento", denied:"Acceso al movimiento bloqueado" },
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
    { label:t.signal, number:"01", className:"flow-signal", content:<><small>{t.conversion}</small><strong>+18.7%</strong><span className="flow-chart"><i/><i/><i/><i/><i/></span></> },
    { label:t.hypothesis, number:"02", className:"flow-hypothesis", content:<p>{t.hypothesisText}</p> },
    { label:t.build, number:"03", className:"flow-build", content:<code><span><b>const</b> test = {'{'}</span><span>&nbsp;&nbsp;variant: <i>&apos;B&apos;</i>,</span><span>&nbsp;&nbsp;change: <i>&apos;clarity&apos;</i></span><span>{'}'};</span><em>deploy(test);</em></code> },
    { label:t.measure, number:"04", className:"flow-measure", content:<><small>{t.result}</small><strong>+18.7%</strong><span>{t.lift}</span><hr/><span>{t.significance} <b>99%</b></span></> },
  ];

  return <div className="hero-flow-perspective" onPointerMove={handlePointerMove} onPointerLeave={resetScene}>
    {tiltStatus !== "active" && <button className="hero-motion-control" type="button" onClick={requestTiltAccess}>{tiltStatus === "denied" ? t.denied : t.activate}</button>}
    <div ref={sceneRef} className="hero-signal-flow" role="img" aria-label={t.aria}>
      <div className="hero-flow-line" aria-hidden="true" />
      {steps.map((step,index)=><section className={`hero-flow-step ${step.className}`} key={step.label} style={{ "--flow-index":index } as CSSProperties}>
        <header><b>{step.label}</b><span>{step.number}</span><i aria-hidden="true" /></header>
        <div>{step.content}</div>
      </section>)}
    </div>
  </div>;
}
