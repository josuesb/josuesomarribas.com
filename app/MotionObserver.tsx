"use client";

import { useEffect } from "react";

export function MotionObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.add("motion-ready");
    const targets = document.querySelectorAll(".cap, .work-section > .shell > h2, .section-intro, .project, .nda, .process h2, .process article, .quote-inner, .contact-grid > div");
    targets.forEach((target, index) => {
      target.classList.add("reveal");
      (target as HTMLElement).style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.13, rootMargin: "0px 0px -45px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return null;
}
