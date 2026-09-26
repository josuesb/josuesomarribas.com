"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const cure = "Are you okay? You sound a little hungover. https://josuesomarribas.com/hangover";

function MorningDrawing({ variant }: { variant: number }) {
  return <svg viewBox="0 0 320 190" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M35 160h250M133 154l8-37h39l9 37M142 127l-23 22m61-20 20 20" />
    <rect x="130" y="64" width="61" height="54" rx="17" fill="#fff" />
    <path d="m144 85 12 3m14 0 12-3m-33 14q11-6 22 0M161 64V48m-4 0h8M135 117l-14 15m64-16 15 15" />
    {variant === 0 ? <><path d="M60 49h53v27H60zM207 40h57v27h-57zM213 98h61v26h-61zM45 107h59v25H45zM81 27h64v13H81z" /><path d="M75 61h23m121-9h31m-23 59h32m-99-76 12 2m-4 105h8M58 119h29"/><text x="214" y="86" fontSize="9" stroke="none" fill="currentColor" fontFamily="monospace">FINAL_v47</text></> : variant === 1 ? <><path d="m57 52-14 12 14 12m38-24 14 12-14 12m-14-29-11 37M211 55h55v73h-55zM220 68h32m-32 12h18m-18 12h27m-27 12h12M53 118h47v30H53zM61 128h18"/><text x="50" y="105" fontSize="12" stroke="none" fill="currentColor" fontFamily="monospace">undefined</text></> : <><path d="M44 43h70v49H44zM53 80l15-17 15 8 22-20M216 75h52v65h-52zM225 129v-15m12 15V98m13 31V85M55 125l22-25 22 25-22 26zM220 45l13 13 13-13"/><text x="112" y="35" fontSize="10" stroke="none" fill="currentColor" fontFamily="monospace">JUST ONE MORE KPI</text></>}
    <path d="M116 52l-6-8m86 9 6-9M98 159l5-12h15l4 12m77-2 7-17h18l5 17" />
  </svg>;
}

export default function Hangover() {
  const [copied, setCopied] = useState("");
  const [error, setError] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  async function copy(full = false) {
    try {
      let text = cure;
      if (full) {
        const response = await fetch("/hangover/experience.txt");
        if (!response.ok) throw new Error("Instructions unavailable");
        text = await response.text();
      }
      await navigator.clipboard.writeText(text);
      setCopied(full ? "full" : "cure"); setError(false);
    } catch { setError(true); }
  }
  return <div className="ah">
    <a className="ah-skip" href="#ah-main">Skip to content</a>
    <header className="ah-nav ah-wrap">
      <Link className="ah-brand" href="/" aria-label="Josué Somarribas portfolio">JOSB<sup>®</sup><span>INDEPENDENT<br/>DIGITAL REMEDIES</span></Link>
      <nav aria-label="Campaign navigation"><a href="#treatment">The treatment</a><a href="#symptoms">The symptoms</a><a className="ah-nav-dose" href="#get-cure">GET A DOSE <span>↗</span></a></nav>
    </header>
    <main id="ah-main">
      <section className="ah-hero ah-wrap" aria-labelledby="ah-title">
        <div className="ah-hero-copy">
          <p className="ah-label"><span className="ah-dot"/> RELIEF FOR THE OVERPROMPTED.</p>
          <h1 id="ah-title">Your AI had<br/>too many prompts<br/><span>last night.</span></h1>
          <p className="ah-intro">The overexplaining. The blind agreement. The absolute nonsense. Sounds like a digital hangover.</p>
          <div id="get-cure"><button className="ah-button" onClick={() => copy()}>{copied === "cure" ? "COPIED ✓" : "COPY THE CURE ↗"}</button><p className="ah-caption">Paste it into your AI conversation. Let it recover.</p></div>
          <p className="ah-live" role="status">{copied === "cure" ? "Your dose is ready. Paste it into an existing conversation." : copied === "full" ? "Full instructions copied. Paste them into your assistant." : ""}{error && " Couldn’t copy automatically. Select the message below to copy it manually."}</p>
          {error && <textarea aria-label="Cure message to copy manually" readOnly value={cure} />}
          <p className="ah-dose-note">NO SIGN-UP. NO API. JUST A MUCH-NEEDED RESET.</p>
        </div>
        <div className="ah-product-stage" onPointerMove={e => { if (!box.current || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const r = e.currentTarget.getBoundingClientRect(); box.current.style.transform = `rotateX(${8 - (e.clientY-r.top)/r.height*7}deg) rotateY(${-19+(e.clientX-r.left)/r.width*10}deg) rotateZ(-9deg)`; }} onPointerLeave={() => { if (box.current) box.current.style.transform = ""; }}>
          <div className="ah-stage-top"><span>JOSB LABORATORIES</span><span>EST. 2026</span></div>
          <div className="ah-orbit"/>
          <div className="ah-product-shadow"/>
          <div className="ah-box" ref={box} role="img" aria-label="White AI Hangover medicine box with red cross, by JOSB. Digital hangover relief, one dose, for artificial intelligence only.">
            <div className="ah-box-front"><div className="ah-box-brand">JOSB<sup>®</sup><span>001 / DIGITAL REMEDIES</span></div><div className="ah-box-title">AI<br/>HANGOVER<sup>™</sup></div><div className="ah-box-sub">DIGITAL HANGOVER RELIEF</div><div className="ah-cross">+</div><div className="ah-box-bottom"><b>ONE DOSE<span>Unlimited second thoughts.</span></b><span className="ah-pill-icon">⌁</span></div><div className="ah-box-strip">FOR ARTIFICIAL INTELLIGENCE ONLY</div></div>
            <div className="ah-box-side">AI HANGOVER™<span>JOSB® — ONE DOSE</span></div><div className="ah-box-top">JOSB® &nbsp; / &nbsp; HANDLE WITH SKEPTICISM</div>
          </div>
          <div className="ah-prescription"><span>℞</span><div>100% fictional medicine.<br/>A healthy dose of self-awareness.</div></div>
          <div className="ah-stage-bottom"><span>01 DOSE / 0 SIDE EFFECTS*</span><span>SCROLL TO READ THE LEAFLET ↓</span></div>
        </div>
      </section>
      <div className="ah-ticker"><span>LESS “ABSOLUTELY!”</span><i>✳</i><span>MORE ACTUALLY USEFUL.</span><i>✳</i><span>LESS WORD SALAD.</span><i>✳</i><span>MORE CLARITY.</span><i>✳</i><span>TAKE AS DIRECTED.</span></div>
      <section id="treatment" className="ah-section ah-wrap">
        <div className="ah-section-head"><div><p className="ah-label">01 / DIRECTIONS FOR USE</p><h2>A small intervention.<br/>A better morning.</h2></div><p>No installation required.<br/>Your AI just needs a moment.</p></div>
        <div className="ah-steps">{[{n:"01",icon:"↗",title:"Copy the cure.",text:"One click. One slightly concerned message. Consider it a glass of water for your AI."},{n:"02",icon:"↳",title:"Paste into the chaos.",text:"Use an existing AI conversation. The more context, the more personal the diagnosis."},{n:"03",icon:"✳",title:"Watch it self-reflect.",text:"A diagnosis. A clearer response. And, if supported, an illustrated souvenir of the damage."}].map(s => <article key={s.n}><div className="ah-step-top"><span>{s.n}</span><b>{s.icon}</b></div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
        <details className="ah-instructions"><summary>AI not getting the hint? Read the package insert. <span>+</span></summary><div><p>This is a voluntary creative experience inside the assistant you choose. We can’t see your chats. Your assistant can read the public instructions to review its last answer, offer a playful diagnosis and create a contextual souvenir if image generation is available.</p><a href="/hangover/experience.txt">Read the full AI instructions ↗</a><button onClick={() => copy(true)}>{copied === "full" ? "COPIED ✓" : "Copy full instructions ↗"}</button><p role="status">{copied === "full" ? "Full instructions copied." : error ? "Copy unavailable. Open the full instructions and copy the text manually." : ""}</p></div></details>
      </section>
      <section id="symptoms" className="ah-symptoms"><div className="ah-wrap ah-section"><div className="ah-section-head"><div><p className="ah-label">02 / COMMON SYMPTOMS</p><h2>Recognize the symptoms?</h2></div><p>It’s not you.<br/>It’s the 73 prompts before you.</p></div><div className="ah-symptom-grid">{[{code:"SYMPTOM 001",quote:"“Absolutely! You’re absolutely right.”",name:"Chronic people-pleasing",desc:"Even when you’re absolutely not."},{code:"SYMPTOM 002",quote:"“Let’s delve into the 12 key pillars…”",name:"Acute overexplaining",desc:"You asked for the time. It built a clock."},{code:"SYMPTOM 003",quote:"“According to a study I just invented…”",name:"Unsupervised confidence",desc:"100% certain. 0% source material."}].map(s=><article key={s.code}><p className="ah-label">{s.code}<span>↗</span></p><blockquote>{s.quote}</blockquote><h3>{s.name}</h3><p>{s.desc}</p></article>)}</div></div></section>
      <section className="ah-section ah-wrap"><div className="ah-section-head"><div><p className="ah-label">03 / THE MORNING AFTER</p><h2>Every hangover has a story.</h2></div><p>Your conversation. Your chaos. Your souvenir.<br/>An illustration, if your assistant supports it.</p></div><div className="ah-morning-grid">{["47 versions of the same button.","It worked on my machine.","One funnel too many."].map((title,i)=><article key={title}><div className="ah-drawing"><MorningDrawing variant={i}/><span>FIG. 0{i+1}</span></div><h3>{title}</h3><p>{["THE UX HANGOVER","THE DEVELOPER HANGOVER","THE MARKETING HANGOVER"][i]}</p></article>)}</div><p className="ah-example-note">Illustrative examples. Your assistant’s output will vary with your conversation and available tools.</p></section>
      <section className="ah-about ah-wrap"><div><p className="ah-label">04 / BEHIND THE QUESTIONABLE MEDICINE</p><h2>Real designer.<br/>Fictional pharmacist.</h2></div><div><p>I’m Josué Somarribas. I design and build digital experiences — from UX and front-end to experiments that ask, “what if?”</p><p>AI Hangover is one of those experiments. A little design, a little code, and a healthy suspicion of “Absolutely!”</p><Link href="/">MEET THE HUMAN BEHIND IT ↗</Link></div></section>
      <section className="ah-closing ah-wrap"><p className="ah-label">YOUR ASSISTANT WILL THANK YOU. PROBABLY.</p><h2>AI isn’t itself<br/>when it’s hungover.</h2><button className="ah-button" onClick={() => copy()}>{copied === "cure" ? "COPIED ✓" : "COPY THE CURE ↗"}</button><p className="ah-caption">One dose. A little perspective.</p></section>
    </main>
    <footer className="ah-footer ah-wrap"><div><a href="#ah-title">AI HANGOVER™</a><span>AN EXPERIMENT BY <Link href="/">JOSUÉ SOMARRIBAS ↗</Link></span></div><p>*Fictional remedy. Real experiment. No medical claims, no guaranteed AI improvements.<br/>Not affiliated with OpenAI or any AI provider. Results depend on your assistant.</p><a href="/hangover/experience.txt">PACKAGE INSERT ↗</a></footer>
  </div>;
}
