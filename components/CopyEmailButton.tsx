"use client";

import { useState } from "react";

const EMAIL = "josuesomarribasb@gmail.com";

export default function CopyEmailButton({ label = "Copy email", copiedLabel = "Copied" }: { label?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <button className="btn btn-outline" type="button" onClick={copyEmail} aria-live="polite">
    <span aria-hidden="true">✉</span> {copied ? copiedLabel : label}
  </button>;
}
