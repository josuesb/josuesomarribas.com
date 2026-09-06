"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SensorPermission = () => Promise<"granted" | "denied">;
type PermissionConstructor = { requestPermission?: SensorPermission };
type TiltStatus = "idle" | "active" | "denied";

const clamp = (value: number) => Math.min(0.5, Math.max(-0.5, value));

/** Converts orientation (or accelerometer fallback) into centered -0.5…0.5 coordinates. */
export function useDeviceTilt(onTilt: (x: number, y: number) => void) {
  const [status, setStatus] = useState<TiltStatus>("idle");
  const callbackRef = useRef(onTilt);
  const neutralOrientationRef = useRef<{ beta: number; gamma: number } | null>(null);
  const neutralMotionRef = useRef<{ x: number; y: number } | null>(null);
  const lastOrientationRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const listeningRef = useRef(false);

  useEffect(() => { callbackRef.current = onTilt; }, [onTilt]);

  const animate = useCallback(function tick() {
    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.14;
    current.y += (target.y - current.y) * 0.14;
    callbackRef.current(current.x, current.y);
    if (Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001) frameRef.current = requestAnimationFrame(tick);
    else frameRef.current = null;
  }, []);

  const updateTarget = useCallback((rawX: number, rawY: number, divisor: number) => {
    const angle = screen.orientation?.angle ?? window.orientation ?? 0;
    const landscape = Math.abs(angle) === 90;
    targetRef.current = {
      x: clamp((landscape ? rawY * Math.sign(angle || 1) : rawX) / divisor),
      y: clamp((landscape ? -rawX * Math.sign(angle || 1) : rawY) / divisor),
    };
    setStatus("active");
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (event.beta === null || event.gamma === null) return;
    lastOrientationRef.current = performance.now();
    if (!neutralOrientationRef.current) neutralOrientationRef.current = { beta: event.beta, gamma: event.gamma };
    updateTarget(event.gamma - neutralOrientationRef.current.gamma, event.beta - neutralOrientationRef.current.beta, 36);
  }, [updateTarget]);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    if (performance.now() - lastOrientationRef.current < 500) return;
    const acceleration = event.accelerationIncludingGravity;
    if (acceleration?.x == null || acceleration.y == null) return;
    if (!neutralMotionRef.current) neutralMotionRef.current = { x: acceleration.x, y: acceleration.y };
    updateTarget(acceleration.x - neutralMotionRef.current.x, acceleration.y - neutralMotionRef.current.y, 8);
  }, [updateTarget]);

  const startListening = useCallback(() => {
    if (listeningRef.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    neutralOrientationRef.current = null;
    neutralMotionRef.current = null;
    if (typeof DeviceOrientationEvent !== "undefined") window.addEventListener("deviceorientation", handleOrientation, true);
    if (typeof DeviceMotionEvent !== "undefined") window.addEventListener("devicemotion", handleMotion, true);
    listeningRef.current = true;
  }, [handleMotion, handleOrientation]);

  const requestAccess = useCallback(() => {
    if (listeningRef.current) return;
    const Orientation = globalThis.DeviceOrientationEvent as unknown as PermissionConstructor | undefined;
    const Motion = globalThis.DeviceMotionEvent as unknown as PermissionConstructor | undefined;
    const owner = Orientation?.requestPermission ? Orientation : Motion;
    const requestPermission = owner?.requestPermission;
    if (!requestPermission) return startListening();
    void requestPermission.call(owner)
      .then(permission => permission === "granted" ? startListening() : setStatus("denied"))
      .catch(() => setStatus("denied"));
  }, [startListening]);

  useEffect(() => {
    const Orientation = globalThis.DeviceOrientationEvent as unknown as PermissionConstructor | undefined;
    const Motion = globalThis.DeviceMotionEvent as unknown as PermissionConstructor | undefined;
    if (!Orientation?.requestPermission && !Motion?.requestPermission) startListening();
    const recalibrate = () => {
      neutralOrientationRef.current = null;
      neutralMotionRef.current = null;
    };
    screen.orientation?.addEventListener("change", recalibrate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("deviceorientation", handleOrientation, true);
      window.removeEventListener("devicemotion", handleMotion, true);
      screen.orientation?.removeEventListener("change", recalibrate);
      listeningRef.current = false;
    };
  }, [handleMotion, handleOrientation, startListening]);

  return { requestAccess, status };
}
