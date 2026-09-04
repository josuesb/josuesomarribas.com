"use client";

import { useEffect, useRef, type PointerEvent } from "react";

const copy = {
  en: { aria:"Three-dimensional editorial system with an article, code and experiment result", label:"FIELD NOTE / 024", title:"Clarity is a systems problem.", deck:"Research, interface decisions and production code—documented.", read:"08 MIN READ", result:"MEASURED LIFT" },
  es: { aria:"Sistema editorial tridimensional con un artículo, código y resultado experimental", label:"NOTA DE CAMPO / 024", title:"La claridad es un problema de sistema.", deck:"Investigación, decisiones de interfaz y código de producción—documentados.", read:"08 MIN DE LECTURA", result:"MEJORA MEDIDA" },
} as const;

export default function WritingHeroArtwork3D({ locale }:{ locale:"en"|"es" }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const t = copy[locale];

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (sceneRef.current) sceneRef.current.style.transform = `rotateX(${(9 - y * 12).toFixed(2)}deg) rotateY(${(-12 + x * 18).toFixed(2)}deg) rotateZ(-1deg)`;
    });
  };

  const reset = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (sceneRef.current) sceneRef.current.style.transform = "rotateX(9deg) rotateY(-12deg) rotateZ(-1deg)";
    });
  };

  return <div className="notebook-art writing-3d-viewport" role="img" aria-label={t.aria} onPointerMove={move} onPointerLeave={reset}>
    <div ref={sceneRef} className="writing-3d-scene" aria-hidden="true">
      <div className="writing-3d-grid-plane"/>
      <div className="writing-3d-code-panel">
        <header><span>EXPERIMENT.LOG</span><i/></header>
        <code><b>const</b> insight = observe();<br/><br/><span>if</span> (signal) {'{'}<br/>&nbsp;&nbsp;frameHypothesis();<br/>&nbsp;&nbsp;prototype();<br/>&nbsp;&nbsp;measure();<br/>{'}'}</code>
        <footer><i/><i/><i/></footer>
      </div>
      <article className="writing-3d-article-panel">
        <header><span>{t.label}</span><b>↗</b></header>
        <div className="writing-3d-rule"/>
        <h2>{t.title}</h2>
        <p>{t.deck}</p>
        <footer><span>UX × CRO × FRONT-END</span><b>{t.read}</b></footer>
      </article>
      <div className="writing-3d-result-card"><small>{t.result}</small><strong>+18.7%</strong><span>99% CONFIDENCE</span></div>
      <div className="writing-3d-index"><span>J/S</span><b>WRITING<br/>ARCHIVE</b></div>
    </div>
  </div>;
}
