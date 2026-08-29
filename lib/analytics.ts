export type AnalyticsValue = string | number | boolean | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command:string, eventName:string, parameters?:Record<string, AnalyticsValue>) => void;
  }
}

export function trackEvent(eventName:string, parameters:Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, parameters);
}
