"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";

const layers = [
  { src:"/assets/writing-hero/01-libro-base.png", className:"writing-3d-book", x:0, y:8, depth:0, rotate:0, drift:5 },
  { src:"/assets/writing-hero/02-pagina-codigo.png", className:"writing-3d-code", x:-24, y:-8, depth:82, rotate:-1.5, drift:11 },
  { src:"/assets/writing-hero/03-pagina-notas.png", className:"writing-3d-notes", x:24, y:-18, depth:154, rotate:1.8, drift:17 },
  { src:"/assets/writing-hero/04-marcador-rojo.png", className:"writing-3d-marker", x:38, y:-30, depth:226, rotate:3, drift:23 },
  { src:"/assets/writing-hero/05-cursor.png", className:"writing-3d-cursor", x:48, y:15, depth:292, rotate:-2, drift:30 },
] as const;

const layerTransform = (layer: typeof layers[number], x = 0, y = 0) =>
  `translate3d(${layer.x + x * layer.drift}px, ${layer.y + y * layer.drift}px, ${layer.depth}px) rotateZ(${layer.rotate}deg)`;

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
      if (sceneRef.current) sceneRef.current.style.transform = `rotateX(${(11 - y * 14).toFixed(2)}deg) rotateY(${(-15 + x * 20).toFixed(2)}deg) rotateZ(-2deg)`;
      layers.forEach((layer, index) => {
        const element = layerRefs.current[index];
        if (element) element.style.transform = layerTransform(layer, x, y);
      });
    });
  };

  const reset = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (sceneRef.current) sceneRef.current.style.transform = "rotateX(11deg) rotateY(-15deg) rotateZ(-2deg)";
      layers.forEach((layer, index) => {
        const element = layerRefs.current[index];
        if (element) element.style.transform = layerTransform(layer);
      });
    });
  };

  return <div className="notebook-art writing-3d-viewport" role="img" aria-label={locale === "es" ? "Cuaderno editorial tridimensional con wireframes, código y notas" : "Three-dimensional editorial notebook with wireframes, code and notes"} onPointerMove={move} onPointerLeave={reset}>
    <span className="notebook-layer notebook-halo" aria-hidden="true"/>
    <span className="notebook-layer notebook-blueprint" aria-hidden="true"/>
    <div ref={sceneRef} className="writing-3d-scene" aria-hidden="true">
      <Image className="writing-3d-layer writing-3d-book-edge writing-3d-book-edge-back" src="/assets/writing-hero/01-libro-base.png" alt="" width={1800} height={1100} priority unoptimized sizes="(max-width: 760px) 100vw, 52vw"/>
      <Image className="writing-3d-layer writing-3d-book-edge writing-3d-book-edge-front" src="/assets/writing-hero/01-libro-base.png" alt="" width={1800} height={1100} priority unoptimized sizes="(max-width: 760px) 100vw, 52vw"/>
      {layers.map((layer, index) => <Image key={layer.src} ref={element => { layerRefs.current[index] = element; }} className={`writing-3d-layer ${layer.className}`} src={layer.src} alt="" width={1800} height={1100} priority={index < 3} unoptimized sizes="(max-width: 760px) 100vw, 52vw" style={{ transform:layerTransform(layer) }}/>) }
    </div>
  </div>;
}
