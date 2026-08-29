"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../../lib/analytics";

export default function ArticleTools({ title, locale = "en", audioSrc, mode = "actions" }:{ title:string; locale?:"en"|"es"; audioSrc?:string; mode?:"actions"|"progress"|"sidebar-progress" }) {
  const [progress, setProgress] = useState(0);
  const [listening, setListening] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const milestonesRef = useRef(new Set<number>());

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
    utterance.onend = () => { setListening(false); trackEvent("audio_complete", { article_title:title, language:locale, audio_source:"browser" }); };
    utterance.onerror = () => setListening(false);
    setListening(true);
    trackEvent(startedRef.current ? "audio_resume" : "audio_start", { article_title:title, language:locale, audio_source:"browser" });
    startedRef.current = true;
    window.speechSynthesis.speak(utterance);
  };
  const listen = () => {
    if (listening) {
      const audio = audioRef.current;
      trackEvent("audio_pause", { article_title:title, language:locale, audio_source:audioSrc ? "mp3" : "browser", audio_time:Math.round(audio?.currentTime ?? 0) });
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
      audio.onended = () => { setListening(false); trackEvent("audio_complete", { article_title:title, language:locale, audio_source:"mp3" }); };
      audio.ontimeupdate = () => {
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
        const percentage = Math.floor((audio.currentTime / audio.duration) * 100);
        for (const milestone of [25,50,75]) if (percentage >= milestone && !milestonesRef.current.has(milestone)) {
          milestonesRef.current.add(milestone);
          trackEvent("audio_progress", { article_title:title, language:locale, audio_source:"mp3", percent:milestone });
        }
      };
      audio.onerror = () => {
        trackEvent("audio_fallback", { article_title:title, language:locale, failed_source:"mp3" });
        audioRef.current = null;
        setListening(false);
        speakWithBrowser();
      };
      audioRef.current = audio;
    }
    setListening(true);
    audioRef.current.play().then(() => {
      trackEvent(startedRef.current ? "audio_resume" : "audio_start", { article_title:title, language:locale, audio_source:"mp3" });
      startedRef.current = true;
    }).catch(() => {
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
