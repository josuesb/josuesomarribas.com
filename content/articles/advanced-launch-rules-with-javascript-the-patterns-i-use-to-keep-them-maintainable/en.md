---
slug: "advanced-launch-rules-with-javascript-the-patterns-i-use-to-keep-them-maintainable"
locale: "en"
title: "Advanced Launch Rules with JavaScript: The Patterns I Use to Keep Them Maintainable"
description: "Practical patterns for writing maintainable Adobe Launch (AEP Data Collection) custom code, including utilities, idempotency, error handling, observability, performance tips, and a small starter kit you can reuse across rules."
date: "2025-12-18T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "cro-ab-testing-experimentation"
tags: []
audio: "https://framerusercontent.com/assets/d8TDQnjuy0xh2TkWr0MtQSjg.mp3"
sourceImage: "/images/framer-migrated/m5oRpiYYJIjzqsw87K6zY1pPxys.webp"
imageAlt: "Angled view of a laptop displaying a code editor on screen in black and white, with a blurred background."
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: "Download Assets of This Post"
---

<p>If you’ve done serious work in Adobe Launch (Adobe Experience Platform Data Collection), you’ve felt it: custom code rules start as “just a quick snippet” and slowly become… a haunted house. Stuff fires twice, breaks only in production, and nobody remembers why Rule 38 depends on a CSS class from 2019.</p><p>This post is basically my attempt to keep Launch code boring. Predictable. Maintainable. The kind of boring that doesn’t page you at 2am.</p><p>And yes, a lot of this also applies to Monetate experiments and JS actions. Different platform, same problems.</p><h2>What “advanced rules” really means in Launch</h2><p>For me, “advanced” isn’t clever. It’s when your code has to survive reality:</p><ul><li data-preset-tag="p"><p>Rules can fire more than once (SPA navigations, re-rendered components, “helpful” observers).</p></li><li data-preset-tag="p"><p>The DOM is not ready when you want it to be.</p></li><li data-preset-tag="p"><p>Other tags are racing you, or mutating the page after you run.</p></li><li data-preset-tag="p"><p>You need to debug, but you don’t want to spam the console for every user.</p></li><li data-preset-tag="p"><p>You need performance discipline because Launch is often running on already-heavy pages.</p></li></ul><p>So the goal is not “more JavaScript.” It’s fewer surprises.</p><h2>Pattern 1: A tiny shared utility layer (on purpose)</h2><p>If you copy-paste helpers into every custom code action, you’ll drift. One rule uses a 200ms timeout, another uses 800ms, one handles errors, one doesn’t.</p><p>Instead, I like a <strong>single shared utility object</strong> that gets loaded once, then reused.</p><p>Best case: you build a small Launch extension, version it, and import it cleanly.</p><p>More common case: you create one “Library” rule that runs early and defines <code>window.__launchUtils</code> (namespaced), then every other rule uses it.</p><p>That shared layer becomes your “standard library.” Boring, consistent, testable-ish.</p><h2>Pattern 2: Idempotency, or “don’t do the same thing twice”</h2><p>Idempotency just means: running the same rule twice doesn’t double-inject UI, double-bind events, or double-track.</p><p>In Launch and Monetate, this is the difference between “works in QA” and “why are we tracking 14 clicks per click.”</p><p>Things I do constantly:</p><ul><li data-preset-tag="p"><p>Mark DOM nodes I’ve already touched (via <code>data-*</code>).</p></li><li data-preset-tag="p"><p>Store a one-time flag in memory (<code>window.__state</code>) keyed by rule name.</p></li><li data-preset-tag="p"><p>For event listeners, prefer <strong>event delegation</strong> so you bind once to a stable parent instead of binding to elements that keep re-rendering.</p></li></ul><h2>Pattern 3: Error handling that doesn’t hide problems</h2><p>Custom code rules love failing silently. That feels nice until you need to know why conversions dropped.</p><p>My preference:</p><ul><li data-preset-tag="p"><p>Wrap rule entry points in a <code>try/catch</code>.</p></li><li data-preset-tag="p"><p>Log an error <strong>with context</strong> (rule name, variant, page type).</p></li><li data-preset-tag="p"><p>Optionally report it somewhere lightweight (even just Adobe Analytics as an event, if that’s your setup), but only if you have a clean way to do it.</p></li></ul><p>Key idea: errors should be <strong>visible during QA</strong> and <strong>discoverable in production</strong>, without turning the site into a Christmas tree of console logs.</p><h2>Pattern 4: Observability, but keep it sane</h2><p>You don’t need a full telemetry platform to get value. You need a switch.</p><p>I usually add a debug flag like:</p><ul><li data-preset-tag="p"><p><code>localStorage.setItem('launch_debug', '1')</code></p></li></ul><p>Then logging only happens when that flag is on. That means:</p><ul><li data-preset-tag="p"><p>QA can debug quickly.</p></li><li data-preset-tag="p"><p>Production users don’t get noise.</p></li><li data-preset-tag="p"><p>You can ask someone, “turn the flag on, reproduce, send me the logs.”</p></li></ul><p>Bonus: I prefix logs with something consistent, so filtering is easy.</p><h2>Pattern 5: Performance rules, because Launch runs on real sites</h2><p>Some practical habits:</p><ul><li data-preset-tag="p"><p>Cache selectors. Don’t query the same element 10 times.</p></li><li data-preset-tag="p"><p>Avoid aggressive <code>MutationObserver</code> setups unless you debounce and disconnect.</p></li><li data-preset-tag="p"><p>Prefer <code>requestAnimationFrame</code> / <code>requestIdleCallback</code> for non-critical work.</p></li><li data-preset-tag="p"><p>Keep polling (<code>setInterval</code>) as a last resort, and always set a timeout.</p></li></ul><p>In other words, act like you’re paying for milliseconds. Because your users are.</p><h2>Pattern 6: Avoid dependencies you can’t control</h2><p>It’s tempting to paste in a helper library, or depend on whatever jQuery version the site happens to have. That’s how you inherit chaos.</p><p>My rule:</p><ul><li data-preset-tag="p"><p>No external libs in rule code unless they’re first-party, versioned, and owned.</p></li><li data-preset-tag="p"><p>No “site already has X” assumptions unless that’s contractually true.</p></li></ul><p>If you need shared capability, build it into your utility layer.</p><h2>Mini starter kit: utilities I actually reuse in Launch rules</h2><p>Here’s a small “starter kit” you can drop into a single early-running Launch rule (or an extension). Then other rules call <code>window.__launchUtils.*</code>.</p><pre data-language="JSX"><code>(function initLaunchUtils(w) {
  const NS = "__launchUtils";
  if (w[NS]) return; // idempotent init

  const now = () =&gt; (w.performance &amp;&amp; performance.now ? performance.now() : Date.now());

  const debugEnabled = () =&gt; {
    try { return w.localStorage &amp;&amp; localStorage.getItem("launch_debug") === "1"; }
    catch (e) { return false; }
  };

  const log = (level, ...args) =&gt; {
    if (!debugEnabled()) return;
    const prefix = "[Launch]";
    (console[level] || console.log).call(console, prefix, ...args);
  };

  const safe = (fn, context = {}) =&gt; {
    return function wrapped(...args) {
      try { return fn.apply(this, args); }
      catch (err) {
        log("error", "Rule error", { err, context });
      }
    };
  };

  const once = (key, fn) =&gt; {
    w.__launchState = w.__launchState || {};
    if (w.__launchState[key]) return false;
    w.__launchState[key] = true;
    fn();
    return true;
  };

  const waitFor = (predicate, { interval = 50, timeout = 4000 } = {}) =&gt; {
    const start = now();
    return new Promise((resolve, reject) =&gt; {
      const tick = () =&gt; {
        let ok = false;
        try { ok = !!predicate(); } catch (e) {}
        if (ok) return resolve(true);
        if (now() - start &gt; timeout) return reject(new Error("waitFor timeout"));
        setTimeout(tick, interval);
      };
      tick();
    });
  };

  const onReady = (fn) =&gt; {
    if (document.readyState === "complete" || document.readyState === "interactive") fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  };

  const delegate = (root, eventName, selector, handler) =&gt; {
    root.addEventListener(eventName, (e) =&gt; {
      const el = e.target &amp;&amp; e.target.closest ? e.target.closest(selector) : null;
      if (!el || !root.contains(el)) return;
      handler(e, el);
    });
  };

  const markOnce = (el, mark) =&gt; {
    if (!el) return false;
    const attr = `data-launch-${mark}`;
    if (el.hasAttribute(attr)) return false;
    el.setAttribute(attr, "1");
    return true;
  };

  w[NS] = {
    log,
    safe,
    once,
    waitFor,
    onReady,
    delegate,
    markOnce
  };

  log("log", "Utilities ready");
})(window);
</code></pre><p>That’s not fancy, but it’s consistent. And consistency is what keeps “Adobe Launch custom code” from turning into a pile of mystery meat.</p><h2>Quick checklist I use before shipping a rule</h2><ul><li data-preset-tag="p"><p>Can this run twice without breaking anything?</p></li><li data-preset-tag="p"><p>Are event listeners bound once, ideally via delegation?</p></li><li data-preset-tag="p"><p>If it fails, will I notice? (at least in QA)</p></li><li data-preset-tag="p"><p>Can I debug it without editing code? (debug flag)</p></li><li data-preset-tag="p"><p>Did I avoid heavy DOM polling and expensive observers?</p></li><li data-preset-tag="p"><p>Did I avoid sketchy dependencies?</p></li><li data-preset-tag="p"><p>Is the rule name and keying consistent across Launch and Monetate workflows?</p></li></ul><h2>Closing thought</h2><p>Maintainability in Launch rules is mostly about humility. You’re not writing “a snippet.” You’re writing software that will live inside a tag manager, on a site you don’t fully control, next to other scripts that also think they’re the main character.</p><p>So I optimize for boring: small utilities, idempotency, defensive code, and just enough observability to explain what happened when something inevitably does happen.</p>
