"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";

const layers = [
  { src:"/assets/writing-hero/01-libro-base.png", className:"writing-3d-book", depth:0, drift:4 },
  { src:"/assets/writing-hero/02-pagina-codigo.png", className:"writing-3d-code", depth:34, drift:9 },
  { src:"/assets/writing-hero/03-pagina-notas.png", className:"writing-3d-notes", depth:68, drift:14 },
  { src:"/assets/writing-hero/04-marcador-rojo.png", className:"writing-3d-marker", depth:104, drift:19 },
  { src:"/assets/writing-hero/05-cursor.png", className:"writing-3d-cursor", depth:142, drift:25 },
] as const;

export default function WritingHeroArtwork3D({ locale }:{ locale:"en"|"es" }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLImageElement | null>>([]);
  const frameRef = useRef<number | null>(null);

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
      if (sceneRef.current) sceneRef.current.style.transform = `rotateX(${(7 - y * 12).toFixed(2)}deg) rotateY(${(-10 + x * 16).toFixed(2)}deg) rotateZ(-1.5deg)`;
      layers.forEach((layer, index) => {
        const element = layerRefs.current[index];
        if (element) element.style.transform = `translate3d(${(x * layer.drift).toFixed(2)}px, ${(y * layer.drift).toFixed(2)}px, ${layer.depth}px)`;
      });
    });
  };

  const reset = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (sceneRef.current) sceneRef.current.style.transform = "rotateX(7deg) rotateY(-10deg) rotateZ(-1.5deg)";
      layers.forEach((layer, index) => {
        const element = layerRefs.current[index];
        if (element) element.style.transform = `translate3d(0, 0, ${layer.depth}px)`;
      });
    });
  };

  return <div className="notebook-art writing-3d-viewport" role="img" aria-label={locale === "es" ? "Cuaderno editorial tridimensional con wireframes, código y notas" : "Three-dimensional editorial notebook with wireframes, code and notes"} onPointerMove={move} onPointerLeave={reset}>
    <span className="notebook-layer notebook-halo" aria-hidden="true"/>
    <span className="notebook-layer notebook-blueprint" aria-hidden="true"/>
    <div ref={sceneRef} className="writing-3d-scene" aria-hidden="true">
      {layers.map((layer, index) => <Image key={layer.src} ref={element => { layerRefs.current[index] = element; }} className={`writing-3d-layer ${layer.className}`} src={layer.src} alt="" width={1800} height={1100} priority={index < 3} unoptimized sizes="(max-width: 760px) 100vw, 52vw" style={{ transform:`translate3d(0, 0, ${layer.depth}px)` }}/>) }
    </div>
  </div>;
}
