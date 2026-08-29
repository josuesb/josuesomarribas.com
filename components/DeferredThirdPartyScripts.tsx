"use client";

import { useEffect } from "react";

type DeferredWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (command:string, eventName:string, parameters?:Record<string, string | number | boolean | undefined>) => void;
  hj?: ((...args:unknown[]) => void) & { q?: unknown[][] };
  _hjSettings?: { hjid:number; hjsv:number };
};

export default function DeferredThirdPartyScripts() {
  useEffect(() => {
    const currentWindow = window as DeferredWindow;
    currentWindow.dataLayer ??= [];
    currentWindow.gtag ??= (...args:unknown[]) => currentWindow.dataLayer?.push(args);
    currentWindow.dataLayer.push(["js", new Date()]);
    currentWindow.dataLayer.push(["config", "G-65JN3HEB8W"]);

    const loadScripts = () => {
      const analytics = document.createElement("script");
      analytics.async = true;
      analytics.src = "https://www.googletagmanager.com/gtag/js?id=G-65JN3HEB8W";
      document.head.appendChild(analytics);

      currentWindow.hj ??= Object.assign((...args:unknown[]) => {
        currentWindow.hj?.q?.push(args);
      }, { q:[] as unknown[][] });
      currentWindow._hjSettings = { hjid:6693862, hjsv:6 };
      const hotjar = document.createElement("script");
      hotjar.async = true;
      hotjar.src = `https://static.hotjar.com/c/hotjar-${currentWindow._hjSettings.hjid}.js?sv=${currentWindow._hjSettings.hjsv}`;
      document.head.appendChild(hotjar);
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(loadScripts, { timeout:5000 });
      else window.setTimeout(loadScripts, 2500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once:true });
    return () => window.removeEventListener("load", schedule);
  }, []);
  return null;
}
