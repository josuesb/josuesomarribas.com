"use client";

import { useEffect, useRef } from "react";

export default function ContactArtwork3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const THREE = await import("three");
      if (disposed) return;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 9);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x123586, 2.5));
      const light = new THREE.DirectionalLight(0xffeadb, 4);
      light.position.set(-3, 4, 5);
      scene.add(light);
      const rim = new THREE.DirectionalLight(0x83bbff, 3);
      rim.position.set(4, -1, 1);
      scene.add(rim);
      const group = new THREE.Group();
      scene.add(group);
      const sphereGeometry = new THREE.SphereGeometry(1.12, 48, 32);
      const coral = new THREE.MeshStandardMaterial({ color: 0xf24e42, roughness: 0.36, metalness: 0.15 });
      const sun = new THREE.Mesh(sphereGeometry, coral);
      sun.position.set(0.65, 0.48, -0.45);
      group.add(sun);
      const ivory = new THREE.MeshStandardMaterial({ color: 0xfff6df, roughness: 0.28, metalness: 0.25 });
      const waves = Array.from({ length: 3 }, (_, row) => {
        const points = Array.from({ length: 65 }, (_, i) => {
          const x = -2.65 + i / 64 * 5.8;
          return new THREE.Vector3(x, Math.sin(x * 2.1) * 0.17 - row * 0.32 - 0.35, Math.cos(x * 1.5) * 0.22 + 0.65);
        });
        const wave = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 96, 0.035, 8, false), ivory);
        group.add(wave);
        return wave;
      });
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const reduced = matchMedia("(prefers-reduced-motion: reduce)");
      let start = 0;
      const stop = () => renderer.setAnimationLoop(null);
      const play = () => {
        stop();
        group.rotation.set(0, 0, 0);
        sun.position.y = 0.48;
        waves.forEach(wave => wave.position.y = 0);
        resize();
        if (reduced.matches) return;
        start = performance.now();
        renderer.setAnimationLoop(() => {
          const elapsed = (performance.now() - start) / 1000;
          const phase = Math.min(elapsed / 4.8, 1) * Math.PI * 2;
          const envelope = Math.sin(phase / 2) ** 2;
          group.rotation.y = Math.sin(phase) * 0.12;
          group.rotation.x = envelope * 0.07;
          sun.position.y = 0.48 + envelope * 0.1;
          waves.forEach((wave, i) => { wave.position.y = Math.sin(phase + i * 0.65) * envelope * 0.08; });
          renderer.render(scene, camera);
          if (elapsed >= 4.8) stop();
        });
      };
      reduced.addEventListener("change", play);
      play();
      cleanup = () => {
        stop();
        reduced.removeEventListener("change", play);
        resizeObserver.disconnect();
        sphereGeometry.dispose();
        coral.dispose();
        ivory.dispose();
        waves.forEach(wave => wave.geometry.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });
    observer.observe(host);
    return () => { disposed = true; observer.disconnect(); cleanup(); };
  }, []);

  return <div className="contact-art contact-art-3d" ref={hostRef} aria-hidden="true" />;
}
