---
slug: "javascript-i-write-every-week-in-an-a-b-testing-role"
locale: "en"
title: "JavaScript I Write Every Week in an A/B Testing Role"
description: "A look at the JavaScript I actually write every week working in A/B testing — from polling for async elements to cookie-based variant assignment. No theory, just real scripts."
date: "2026-03-18T00:00:00.000Z"
draft: false
type: "AB Testing"
cluster: "cro-ab-testing-experimentation"
tags: []
audio: ""
sourceImage: "/images/framer-migrated/R0DRiUTEc9FZizAcccMKy59qjDo.webp"
imageAlt: "``` Developer's hands typing on a keyboard in a dark workspace, with code visible on screen"
image: "/images/blog/javascript-i-write-every-week-in-an-a-b-testing-role-v2.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: "Download Assets of This Post"
---

<p dir="auto">Most A/B testing tutorials show you a toggle. Variant A or variant B, one element changes, done. That is not what the job looks like in practice.</p><p dir="auto">In a real CRO or experimentation role, you write JavaScript constantly. Not complex framework code, but practical, sometimes ugly, often clever scripts that need to run fast, not break anything, and stay invisible to users. Here is what actually shows up in my week.</p><p dir="auto"><strong>Waiting for elements that are not there yet</strong></p><p dir="auto">This is probably the most common thing I write. You need to modify an element, but the page renders it asynchronously. If you try to grab it immediately, it does not exist.</p><pre data-language="JavaScript"><code>function waitForElement(selector, callback, timeout = 5000) {
  const start = Date.now();

  const interval = setInterval(() =&gt; {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
    if (Date.now() - start &gt; timeout) {
      clearInterval(interval);
    }
  }, 100);
}

waitForElement('.product-price', (el) =&gt; {
  el.textContent = 'From $49';
});</code></pre><p dir="auto">I use <code>setInterval</code> more than <code>MutationObserver</code> for this. MutationObserver is cleaner in theory, but the polling approach is easier to debug when something goes wrong, and something always goes wrong.</p><p dir="auto"><strong>Pushing events to the dataLayer</strong></p><p dir="auto">Every test needs measurement. Most of the time that means sending something to GA4 through the dataLayer.</p><pre data-language="JavaScript"><code>window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  event: 'experiment_interaction',
  experiment_id: 'checkout-cta-v2',
  variant: 'b',
  action: 'clicked'
});</code></pre><p dir="auto">This looks simple, but the part nobody talks about is timing. If you push the event before the GTM container is ready, it queues correctly. If you push it after a user action, you need to make sure the element listener was attached in the right moment. I have lost more test data to timing issues than to bad hypotheses.</p><p dir="auto"><strong>Reading URL parameters for targeting</strong></p><p dir="auto">Sometimes the targeting logic lives in the tool, Monetate or Adobe Target. Sometimes you need to do it yourself, inside the script.</p><pre data-language="JavaScript"><code>function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

if (getParam('source') === 'email') {
  // show different hero variant
}</code></pre><p dir="auto">I also use this to force variants during QA. Sharing a URL with <code>?variant=b</code> is faster than explaining to a stakeholder how to access the testing tool's preview mode.</p><p dir="auto"><strong>Modifying elements without breaking event listeners</strong></p><p dir="auto">You want to change a button's text. Easy. But if someone else's code is listening to that button with a delegated event, and you replace the element entirely instead of just updating it, you will break things silently.</p><pre data-language="JavaScript"><code>// Risky
button.outerHTML = '&lt;button class="cta"&gt;Buy Now&lt;/button&gt;';

// Safer
button.textContent = 'Buy Now';
button.classList.add('cta-variant');</code></pre><p dir="auto">The difference between <code>textContent</code> and <code>innerHTML</code> also matters. If the original button has a child span for an icon, <code>textContent</code> will destroy it. <code>innerHTML</code> might open an XSS issue if the content is dynamic. Neither option is always right.</p><p dir="auto"><strong>Persisting variant assignment across pages</strong></p><p dir="auto">Tests that span multiple pages need some way to remember what variant a user saw. Cookies are the standard approach.</p><pre data-language="JavaScript"><code>function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((acc, part) =&gt; {
    const [key, val] = part.split('=');
    return key === name ? val : acc;
  }, null);
}

if (!getCookie('exp-checkout')) {
  const variant = Math.random() &lt; 0.5 ? 'control' : 'treatment';
  setCookie('exp-checkout', variant, 30);
}

const assignedVariant = getCookie('exp-checkout');</code></pre><p dir="auto">The tool usually handles this, but sometimes you are running something lightweight outside of it, or you need the assignment to persist for longer than the session.</p><p dir="auto"><strong>One thing I have stopped doing</strong></p><p dir="auto">I used to write the variant logic directly inside the test script with a lot of branching. Multiple if statements, one per element, all in sequence. It works, but it becomes impossible to read after a week.</p><p dir="auto">Now I separate the logic into small functions with clear names, even when the total script is 40 lines. It makes QA faster and makes handing off the code to someone else much less painful.</p><p dir="auto">None of this is advanced JavaScript. It does not have to be. The discipline in this role is not about the code being clever, it is about the code being reliable at the exact moment a real user triggers it, on a page you did not build, loaded in a browser you cannot control.</p><p dir="auto">That constraint makes even simple scripts more interesting to write than they look.</p>
