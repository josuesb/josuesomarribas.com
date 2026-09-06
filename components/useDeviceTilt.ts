"use client";

import { useCallback, useEffect, useRef } from "react";

type OrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Converts phone orientation into the same centered -0.5…0.5 coordinates used
 * by the pointer-driven 3D scenes. The first reading becomes the neutral pose.
 */
export function useDeviceTilt(onTilt: (x: number, y: number) => void) {
  const callbackRef = useRef(onTilt);
  const neutralRef = useRef<{ beta: number; gamma: number } | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const listeningRef = useRef(false);

  useEffect(() => {
    callbackRef.current = onTilt;
  }, [onTilt]);

  const stopFrame = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  const animate = useCallback(function tick() {
    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.14;
    current.y += (target.y - current.y) * 0.14;
    callbackRef.current(current.x, current.y);

    if (Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001) {
      frameRef.current = requestAnimationFrame(tick);
    } else {
      frameRef.current = null;
    }
  }, []);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (event.beta === null || event.gamma === null) return;
    if (!neutralRef.current) neutralRef.current = { beta: event.beta, gamma: event.gamma };

    const beta = event.beta - neutralRef.current.beta;
    const gamma = event.gamma - neutralRef.current.gamma;
    const angle = screen.orientation?.angle ?? window.orientation ?? 0;
    const landscape = Math.abs(angle) === 90;
    const rawX = landscape ? beta * Math.sign(angle || 1) : gamma;
    const rawY = landscape ? -gamma * Math.sign(angle || 1) : beta;

    targetRef.current = {
      x: clamp(rawX / 36, -0.5, 0.5),
      y: clamp(rawY / 36, -0.5, 0.5),
    };
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const startListening = useCallback(() => {
    if (listeningRef.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    neutralRef.current = null;
    window.addEventListener("deviceorientation", handleOrientation, true);
    listeningRef.current = true;
  }, [handleOrientation]);

  const requestAccess = useCallback(() => {
    if (listeningRef.current || typeof DeviceOrientationEvent === "undefined") return;
    const Orientation = DeviceOrientationEvent as OrientationEventWithPermission;
    if (typeof Orientation.requestPermission === "function") {
      void Orientation.requestPermission().then(permission => {
        if (permission === "granted") startListening();
      }).catch(() => undefined);
    } else {
      startListening();
    }
  }, [startListening]);

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") return;
    const Orientation = DeviceOrientationEvent as OrientationEventWithPermission;
    if (typeof Orientation.requestPermission !== "function") startListening();

    const recalibrate = () => { neutralRef.current = null; };
    screen.orientation?.addEventListener("change", recalibrate);
    return () => {
      stopFrame();
      window.removeEventListener("deviceorientation", handleOrientation, true);
      screen.orientation?.removeEventListener("change", recalibrate);
      listeningRef.current = false;
    };
  }, [handleOrientation, startListening, stopFrame]);

  return requestAccess;
}
