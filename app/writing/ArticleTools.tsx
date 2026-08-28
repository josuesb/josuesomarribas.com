"use client";

import { useEffect, useState } from "react";

export default function ArticleTools({ title, mode = "actions" }:{ title:string; mode?:"actions"|"progress"|"sidebar-progress" }) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [large, setLarge] = useState(false);

  useEffect(() => {
    if (mode === "actions") return;
    const update = () => {
      const article = document.querySelector<HTMLElement>(".article-content");
      if (!article) return;
      const start = article.offsetTop;
      const distance = Math.max(1, article.offsetHeight - window.innerHeight * .35);
      setProgress(Math.max(0, Math.min(100, Math.round(((window.scrollY - start) / distance) * 100))));
    };
    update(); window.addEventListener("scroll", update, { passive:true });
    return () => window.removeEventListener("scroll", update);
  }, [mode]);

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href); setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const listen = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = document.querySelector(".article-content")?.textContent ?? title;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  if (mode === "progress") return <div className="article-progress-line" aria-hidden="true"><i style={{ width:`${progress}%` }}/></div>;
  if (mode === "sidebar-progress") return <div className="sidebar-progress"><b>READING PROGRESS</b><span>{progress}%</span><i><em style={{ width:`${progress}%` }}/></i></div>;
  return <div className="article-actions" aria-label="Article tools">
      <button onClick={copy}>↗ <span>{copied ? "Copied" : "Copy link"}</span></button>
      <button onClick={listen}>◉ <span>Listen</span></button>
      <button onClick={() => { setLarge(value => !value); document.documentElement.classList.toggle("large-article-text"); }} aria-pressed={large}>A <span>Text size</span></button>
    </div>;
}
