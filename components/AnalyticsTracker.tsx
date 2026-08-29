"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

function placement(element:Element) {
  const explicit = element.closest<HTMLElement>("[data-analytics-location]")?.dataset.analyticsLocation;
  if (explicit) return explicit;
  const section = element.closest<HTMLElement>("section");
  return section?.id || section?.classList[0] || "global";
}

function label(element:HTMLElement) {
  return (element.dataset.analyticsLabel || element.textContent || element.getAttribute("aria-label") || "").replace(/\s+/g," ").trim().slice(0,120);
}

export default function AnalyticsTracker() {
  useEffect(() => {
    const onClick = (event:MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("a,button") : null;
      if (!target) return;
      const anchor = target instanceof HTMLAnchorElement ? target : target.closest<HTMLAnchorElement>("a");
      const eventName = target.dataset.analyticsEvent;
      if (eventName) {
        trackEvent(eventName, {
          item_name:target.dataset.analyticsLabel || label(target),
          link_url:anchor?.href,
          placement:placement(target),
        });
        return;
      }
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.protocol === "mailto:") {
        trackEvent("contact_click", { contact_method:"email", link_text:label(anchor), placement:placement(anchor) });
      } else if (anchor.closest(".language-switcher")) {
        trackEvent("language_switch", { from_language:document.documentElement.lang, to_language:anchor.lang, destination_path:url.pathname });
      } else if (url.pathname.startsWith("/CV/")) {
        trackEvent("resume_click", { link_text:label(anchor), placement:placement(anchor) });
      } else if (url.hostname === "www.linkedin.com") {
        trackEvent("external_profile_click", { platform:"linkedin", placement:placement(anchor) });
      } else if (/^\/(?:es\/)?blog\/.+/.test(url.pathname) && url.pathname !== window.location.pathname) {
        trackEvent("article_navigation", { article_slug:url.pathname.split("/").filter(Boolean).at(-1), placement:placement(anchor) });
      }
    };
    const onSubmit = (event:SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (form?.action.includes("list-manage.com")) trackEvent("newsletter_submit", { placement:placement(form), language:document.documentElement.lang });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("submit", onSubmit); };
  }, []);
  return null;
}
