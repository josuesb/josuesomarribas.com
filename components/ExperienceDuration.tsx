"use client";

import { useEffect, useState } from "react";

const CAREER_START = new Date(2018, 7, 1);

function calendarDuration(now:Date) {
  let years = now.getFullYear() - CAREER_START.getFullYear();
  let cursor = new Date(CAREER_START);
  cursor.setFullYear(CAREER_START.getFullYear() + years);
  if (cursor > now) {
    years -= 1;
    cursor = new Date(CAREER_START);
    cursor.setFullYear(CAREER_START.getFullYear() + years);
  }

  let months = (now.getFullYear() - cursor.getFullYear()) * 12 + now.getMonth() - cursor.getMonth();
  let monthCursor = new Date(cursor);
  monthCursor.setMonth(cursor.getMonth() + months);
  if (monthCursor > now) {
    months -= 1;
    monthCursor = new Date(cursor);
    monthCursor.setMonth(cursor.getMonth() + months);
  }

  const currentDay = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const cursorDay = Date.UTC(monthCursor.getFullYear(), monthCursor.getMonth(), monthCursor.getDate());
  return { years, months, days:Math.floor((currentDay - cursorDay) / 86_400_000) };
}

export default function ExperienceDuration({ locale="en" }:{ locale?:"en"|"es" }) {
  const [duration, setDuration] = useState(() => calendarDuration(new Date()));

  useEffect(() => {
    const update = () => setDuration(calendarDuration(new Date()));
    update();
    const timer = globalThis.setInterval(update, 60 * 60 * 1000);
    return () => globalThis.clearInterval(timer);
  }, []);

  const text = locale === "es"
    ? `${duration.years} AÑOS · ${duration.months} MESES · ${duration.days} DÍAS`
    : `${duration.years} YEARS · ${duration.months} MONTHS · ${duration.days} DAYS`;

  return <time dateTime={`P${duration.years}Y${duration.months}M${duration.days}D`} suppressHydrationWarning>{text}</time>;
}
