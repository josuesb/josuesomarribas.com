"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";

const pieces = [
  { file:"01-cuaderno-field-kit", depth:0, drift:4 },
  { file:"02-mapa-costa-rica-spain", depth:24, drift:7 },
  { file:"03-ventana-experimento", depth:50, drift:10 },
  { file:"04-tarjeta-ab", depth:78, drift:14 },
  { file:"05-reloj-barcelona", depth:104, drift:18 },
  { file:"06-nota-investigacion", depth:132, drift:22 },
  { file:"07-sello-curious", depth:164, drift:27 },
] as const;

export default function AboutHeroCollage3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<Array<HTMLImageElement | null>>([]);
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
      if (sceneRef.current) sceneRef.current.style.transform = `rotateX(${(6 - y * 11).toFixed(2)}deg) rotateY(${(-8 + x * 15).toFixed(2)}deg) rotateZ(1deg)`;
      pieces.forEach((piece, index) => {
        const element = pieceRefs.current[index];
        if (element) element.style.transform = `translate3d(${(x * piece.drift).toFixed(2)}px, ${(y * piece.drift).toFixed(2)}px, ${piece.depth}px)`;
      });
    });
  };

  const reset = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (sceneRef.current) sceneRef.current.style.transform = "rotateX(6deg) rotateY(-8deg) rotateZ(1deg)";
      pieces.forEach((piece, index) => {
        const element = pieceRefs.current[index];
        if (element) element.style.transform = `translate3d(0, 0, ${piece.depth}px)`;
      });
    });
  };

  return <div className="about-collage about-3d-viewport" role="img" aria-label="Research, experimentation and a journey from Costa Rica to Spain" onPointerMove={move} onPointerLeave={reset}>
    <div ref={sceneRef} className="about-3d-scene" aria-hidden="true">
      <Image className="about-decor about-asset-sun about-3d-sun" src="/assets/global/sol-rojo-texturizado.svg" alt="" width={1024} height={1024}/>
      <Image className="about-decor about-asset-waves about-3d-waves" src="/assets/global/ondas-marfil-3-lineas.svg" alt="" width={1400} height={360}/>
      {pieces.map((piece,index)=><Image key={piece.file} ref={element => { pieceRefs.current[index] = element; }} className={`about-hero-layer about-layer-${index+1}`} src={`/assets/about-hero/${piece.file}.svg`} alt="" width={1800} height={1100} priority={index<3} style={{ transform:`translate3d(0, 0, ${piece.depth}px)` }}/>) }
    </div>
  </div>;
}
