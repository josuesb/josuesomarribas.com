"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../../lib/analytics";

export default function ArticleTools({ title, locale = "en", audioSrc, mode = "actions" }:{ title:string; locale?:"en"|"es"; audioSrc?:string; mode?:"actions"|"progress"|"sidebar-progress" }) {
  const [progress, setProgress] = useState(0);
  const [listening, setListening] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  const formatTime = (seconds:number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  };

  const speakWithBrowser = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = document.querySelector(".article-content")?.textContent ?? title;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === "es" ? "es-ES" : "en-GB";
    utterance.onend = () => { setListening(false); trackEvent("audio_complete", { article_title:title, language:locale, audio_source:"browser" }); };
    utterance.onerror = () => setListening(false);
    setPlayerOpen(true);
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
    setPlayerOpen(true);
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.preload = "metadata";
      audio.onloadedmetadata = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      audio.onended = () => { setListening(false); setCurrentTime(audio.duration); trackEvent("audio_complete", { article_title:title, language:locale, audio_source:"mp3" }); };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
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

  const seek = (value:number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.max(0, Math.min(value, audio.duration));
    setCurrentTime(audio.currentTime);
  };

  const skip = (seconds:number) => seek((audioRef.current?.currentTime ?? 0) + seconds);

  const closePlayer = () => {
    const audio = audioRef.current;
    audio?.pause();
    if (audio) audio.currentTime = 0;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    audioRef.current = null;
    startedRef.current = false;
    milestonesRef.current.clear();
    setListening(false);
    setCurrentTime(0);
    setDuration(0);
    setPlayerOpen(false);
    trackEvent("audio_close", { article_title:title, language:locale, audio_source:audioSrc ? "mp3" : "browser" });
  };

  useEffect(() => {
    if (!playerOpen) return;
    const closeOnEscape = (event:KeyboardEvent) => { if (event.key === "Escape") closePlayer(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  });

  if (mode === "progress") return <div className="article-progress-line" aria-hidden="true"><i style={{ width:`${progress}%` }}/></div>;
  if (mode === "sidebar-progress") return <div className="sidebar-progress"><b>{locale === "es" ? "PROGRESO DE LECTURA" : "READING PROGRESS"}</b><span>{progress}%</span><i><em style={{ width:`${progress}%` }}/></i></div>;
  return <>
    <div className="article-actions" aria-label={locale === "es" ? "Herramientas del artículo" : "Article tools"}>
      <button onClick={listen} aria-pressed={listening}>◉ <span>{listening ? (locale === "es" ? "Pausar" : "Pause") : (locale === "es" ? "Escuchar" : "Listen")}</span></button>
    </div>
    {playerOpen && <section className="floating-audio-player" aria-label={locale === "es" ? "Reproductor del artículo" : "Article audio player"}>
      <div className="floating-audio-copy"><small>{locale === "es" ? "ESCUCHANDO" : "NOW LISTENING"}</small><strong>{title}</strong></div>
      <div className="floating-audio-controls">
        <button type="button" onClick={() => skip(-15)} disabled={!audioSrc} aria-label={locale === "es" ? "Retroceder 15 segundos" : "Rewind 15 seconds"}>−15</button>
        <button className="floating-audio-toggle" type="button" onClick={listen} aria-label={listening ? (locale === "es" ? "Pausar" : "Pause") : (locale === "es" ? "Reproducir" : "Play")}>{listening ? <span className="floating-pause-icon" aria-hidden="true"><i/><i/></span> : <span aria-hidden="true">▶</span>}</button>
        <button type="button" onClick={() => skip(15)} disabled={!audioSrc} aria-label={locale === "es" ? "Avanzar 15 segundos" : "Forward 15 seconds"}>+15</button>
      </div>
      <div className="floating-audio-timeline">
        <input type="range" min="0" max={duration || 1} step="1" value={Math.min(currentTime, duration || 1)} onChange={event => seek(Number(event.target.value))} disabled={!audioSrc || !duration} aria-label={locale === "es" ? "Posición del audio" : "Audio position"}/>
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
      <button className="floating-audio-close" type="button" onClick={closePlayer} aria-label={locale === "es" ? "Cerrar el reproductor" : "Close audio player"}>×</button>
    </section>}
  </>;
}
