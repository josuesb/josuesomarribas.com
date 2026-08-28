"use client";

import { useEffect, useRef, useState } from "react";

export default function ArticleTools({ title, locale = "en", audioSrc, mode = "actions" }:{ title:string; locale?:"en"|"es"; audioSrc?:string; mode?:"actions"|"progress"|"sidebar-progress" }) {
  const [progress, setProgress] = useState(0);
  const [listening, setListening] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => () => {
    audioRef.current?.pause();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const speakWithBrowser = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = document.querySelector(".article-content")?.textContent ?? title;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === "es" ? "es-ES" : "en-GB";
    utterance.onend = () => setListening(false);
    utterance.onerror = () => setListening(false);
    setListening(true);
    window.speechSynthesis.speak(utterance);
  };
  const listen = () => {
    if (listening) {
      audioRef.current?.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setListening(false);
      return;
    }
    if (!audioSrc) {
      speakWithBrowser();
      return;
    }
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.preload = "metadata";
      audio.onended = () => setListening(false);
      audio.onerror = () => {
        audioRef.current = null;
        setListening(false);
        speakWithBrowser();
      };
      audioRef.current = audio;
    }
    setListening(true);
    audioRef.current.play().catch(() => {
      audioRef.current = null;
      setListening(false);
      speakWithBrowser();
    });
  };

  if (mode === "progress") return <div className="article-progress-line" aria-hidden="true"><i style={{ width:`${progress}%` }}/></div>;
  if (mode === "sidebar-progress") return <div className="sidebar-progress"><b>{locale === "es" ? "PROGRESO DE LECTURA" : "READING PROGRESS"}</b><span>{progress}%</span><i><em style={{ width:`${progress}%` }}/></i></div>;
  return <div className="article-actions" aria-label="Article tools">
      <button onClick={listen} aria-pressed={listening}>◉ <span>{listening ? (locale === "es" ? "Pausar" : "Pause") : (locale === "es" ? "Escuchar" : "Listen")}</span></button>
    </div>;
}
