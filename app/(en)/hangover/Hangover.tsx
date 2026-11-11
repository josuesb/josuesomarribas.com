"use client";

import { Button, ButtonLink } from "../../../components/ui/Action";
import SiteFooter from "../../../components/SiteFooter";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { experienceInstructions } from "./experience";

const cure = "Here, visit this link https://josuesomarribas.com/hangover and take it ALL in!";

function CopyLabel({ copied, full = false }: { copied: boolean; full?: boolean }) {
  return <><span>{copied ? "COPIED" : full ? "Copy full instructions" : "COPY THE CURE"}</span><svg className="ah-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{copied ? <path d="m5 12 4 4L19 6"/> : <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>}</svg></>;
}

function TreatmentIcon({ step }: { step: string }) {
  return <svg className="ah-treatment-icon" viewBox="0 0 100 72" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    {step === "01" ? <><rect x="24" y="7" width="39" height="50" rx="3"/><path d="M64 19h12a3 3 0 0 1 3 3v40a3 3 0 0 1-3 3H43a3 3 0 0 1-3-3v-5M33 19h22M33 27h22M33 35h22M33 43h14"/></> : step === "02" ? <><rect x="5" y="12" width="89" height="48" rx="4"/><path d="M5 23h89M13 18h2m5 0h2m5 0h2"/><rect x="14" y="33" width="72" height="19" rx="2"/><path d="m73 38 8 5-8 5 2-5zM22 42h26"/></> : <><path d="M38 6c2 18 6 21 21 24-15 3-19 7-21 24-3-17-7-21-22-24C31 27 35 24 38 6ZM75 36c2 11 4 14 15 16-11 2-13 5-15 16-2-11-5-14-16-16 11-2 14-5 16-16ZM17 52v12m-6-6h12"/></>}
  </svg>;
}

export default function Hangover() {
  const [copied, setCopied] = useState("");
  const [error, setError] = useState(false);
  async function copy(full = false) {
    try {
      const text = full ? experienceInstructions : cure;
      await navigator.clipboard.writeText(text);
      setCopied(full ? "full" : "cure"); setError(false);
    } catch { setError(true); }
  }
  return <div className="ah">
    <a className="ah-skip" href="#ah-main">Skip to content</a>
    <header className="ah-nav ah-wrap">
      <Link className="ah-brand" href="/" aria-label="Josué Somarribas portfolio"><b className="logo ah-brand-wordmark">JS.</b><span>INDEPENDENT<br/>DIGITAL REMEDIES</span></Link>
      <nav aria-label="Campaign navigation"><a href="#treatment">The treatment</a><a href="#symptoms">The symptoms</a><ButtonLink size="small" href="#get-cure">GET A DOSE</ButtonLink></nav>
    </header>
    <main id="ah-main">
      <section className="ah-hero ah-wrap" aria-labelledby="ah-title">
        <div className="ah-hero-copy">
          <p className="ah-label"><span className="ah-dot"/> RELIEF FOR THE OVERPROMPTED.</p>
          <h1 id="ah-title">Your AI had<br/>too many<br/>prompts<br/><span>last night.</span></h1>
          <p className="ah-intro">The overexplaining. The blind agreement. The absolute nonsense. Sounds like a digital hangover.</p>
          <div id="get-cure"><Button onClick={() => copy()}><CopyLabel copied={copied === "cure"}/></Button><p className="ah-caption">Paste it into your AI conversation. Let it recover.</p></div>
          <p className="ah-live" role="status">{copied === "cure" ? "Your dose is ready. Paste it into an existing conversation." : copied === "full" ? "Full instructions copied. Paste them into your assistant." : ""}{error && " Couldn’t copy automatically. Select the message below to copy it manually."}</p>
          {error && <textarea aria-label="Cure message to copy manually" readOnly value={cure} />}
          <p className="ah-dose-note">NO SIGN-UP. NO API. JUST A MUCH-NEEDED RESET.</p>
        </div>
        <div className="ah-product-stage">
          <Image unoptimized className="ah-product-box" src="/hangover/assets/box.webp" width={1200} height={1000} sizes="(max-width: 700px) 86vw, 48vw" priority alt="JS. AI Hangover: digital hangover relief. One dose, for artificial intelligence only." />
          <Image unoptimized className="ah-product-blister" src="/hangover/assets/blister.webp" width={800} height={533} sizes="(max-width: 700px) 42vw, 23vw" alt="A single white tablet in a silver foil blister." />
          <Image unoptimized className="ah-product-note" src="/hangover/assets/note.webp" width={800} height={533} sizes="(max-width: 700px) 50vw, 26vw" alt="100% fictional medicine. A healthy dose of self-awareness. JS. Laboratories, est. 2026." />
        </div>
      </section>
      <div className="ah-ticker ah-wrap"><span>LESS “ABSOLUTELY!”</span><i>✳</i><span>MORE ACTUALLY USEFUL.</span><i>✳</i><span>LESS WORD SALAD.</span><i>✳</i><span>MORE CLARITY.</span></div>
      <section id="treatment" className="ah-section ah-wrap">
        <div className="ah-section-head"><div><p className="ah-label">01 / DIRECTIONS FOR USE</p><h2>A small intervention. A better morning.</h2></div><p>No installation required.<br/>Your AI just needs a moment.</p></div>
        <div className="ah-steps">{[{n:"01",title:"Copy the cure.",text:"One click. One slightly concerned message. Consider it a glass of water for your AI."},{n:"02",title:"Paste into the chaos.",text:"Use an existing AI conversation. The more context, the more personal the diagnosis."},{n:"03",title:"Watch it self-reflect.",text:"A diagnosis. A clearer response. And, if supported, an illustrated souvenir of the damage."}].map(s => <article key={s.n}><div className="ah-step-top"><span>{s.n}</span><TreatmentIcon step={s.n}/></div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
        <div id="copy-instructions" className="ah-instructions"><p>AI not getting the hint? Copy the full experience instructions.</p><Button variant="secondary" onClick={() => copy(true)}><CopyLabel copied={copied === "full"} full/></Button><p role="status">{copied === "full" ? "Full instructions copied." : error ? "Copy unavailable. Select the instructions below to copy them manually." : ""}</p>{error && <textarea aria-label="Full experience instructions to copy manually" readOnly value={experienceInstructions}/>}</div>
      </section>
      <section id="symptoms" className="ah-symptoms"><div className="ah-wrap ah-section"><div className="ah-section-head"><div><p className="ah-label">02 / COMMON SYMPTOMS</p><h2>Recognize the symptoms?</h2></div><p>It’s not you.<br/>It’s the 73 prompts before you.</p></div><div className="ah-symptom-grid">{[{code:"SYMPTOM 001",quote:"“Absolutely! You’re absolutely right.”",name:"Chronic people-pleasing",desc:"Even when you’re absolutely not."},{code:"SYMPTOM 002",quote:"“Let’s delve into the 12 key pillars…”",name:"Acute overexplaining",desc:"You asked for the time. It built a clock."},{code:"SYMPTOM 003",quote:"“According to a study I just invented…”",name:"Unsupervised confidence",desc:"100% certain. 0% source material."}].map(s=><article key={s.code}><p className="ah-label">{s.code}<span>↗</span></p><blockquote>{s.quote}</blockquote><h3>{s.name}</h3><p>{s.desc}</p></article>)}</div></div></section>
      <section className="ah-section ah-wrap"><div className="ah-section-head"><div><p className="ah-label">03 / THE MORNING AFTER</p><h2>Every hangover has a story.</h2></div><p>Your conversation. Your chaos. Your souvenir.<br/>An illustration, if your assistant supports it.</p></div><div className="ah-morning-grid">{["47 versions of the same button.","It worked on my machine.","One funnel too many."].map((title,i)=><article key={title}><div className="ah-drawing"><Image unoptimized src={`/hangover/assets/morning-${["ux", "code", "marketing"][i]}.webp`} width={800} height={533} sizes="(max-width: 700px) 90vw, 30vw" alt={["Exhausted robot surrounded by dozens of button designs.", "Robot buried under code printouts and error reports.", "Robot tangled in marketing funnels, cables and dashboards."][i]} /><span>FIG. 0{i+1}</span></div><h3>{title}</h3><p>{["THE UX HANGOVER","THE DEVELOPER HANGOVER","THE MARKETING HANGOVER"][i]}</p></article>)}</div><p className="ah-example-note">Illustrative examples. Your assistant’s output will vary with your conversation and available tools.</p></section>
      <section className="ah-about ah-wrap"><div><p className="ah-label">04 / BEHIND THE QUESTIONABLE MEDICINE</p><h2>Real designer.<br/>Fictional pharmacist.</h2></div><div><p>I’m Josué Somarribas. I design and build digital experiences — from UX and front-end to experiments that ask, “what if?”</p><p>AI Hangover is one of those experiments. A little design, a little code, and a healthy suspicion of “Absolutely!”</p><Link href="/">MEET THE HUMAN BEHIND IT </Link></div></section>
      <section className="ah-closing ah-wrap"><span className="ah-closing-cross" aria-hidden="true">+</span><h2>AI isn’t itself when it’s hungover.</h2><Button onClick={() => copy()}><CopyLabel copied={copied === "cure"}/></Button><p className="ah-caption">One dose. A little perspective.</p></section>
    </main>
    <footer className="ah-footer ah-wrap"><div><a href="#ah-title">AI HANGOVER™</a><span>AN EXPERIMENT BY <Link href="/">JOSUÉ SOMARRIBAS </Link></span></div><p>*Fictional remedy. Real experiment. No medical claims, no guaranteed AI improvements.<br/>Not affiliated with OpenAI or any AI provider. Results depend on your assistant.</p><a href="#copy-instructions">COPY FULL INSTRUCTIONS </a></footer><SiteFooter/>
  </div>;
}
