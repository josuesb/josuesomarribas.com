"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";

const EMAIL = "josuesomarribasb@gmail.com";

export default function CopyEmailButton({ label = "Copy email", copiedLabel = "Copied" }: { label?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    trackEvent("contact_click", { contact_method:"copy_email", link_text:label });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <button className="btn btn-outline" type="button" onClick={copyEmail} aria-live="polite">
    {copied ? copiedLabel : label}
  </button>;
}
