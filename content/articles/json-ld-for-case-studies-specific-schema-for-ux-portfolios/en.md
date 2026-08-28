---
slug: "json-ld-for-case-studies-specific-schema-for-ux-portfolios"
locale: "en"
title: "JSON-LD for Case Studies: Schema for UX Portfolios"
description: "Schema.org has no CaseStudy type, so what should a UX portfolio use? A working JSON-LD recipe for case studies, with the honest limits of what schema buys."
date: "2026-07-25T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: []
audio: ""
sourceImage: "https://framerusercontent.com/images/4iuRiUEdT8mg63cHw6Mew0A8UI.png"
imageAlt: "Archivist cataloging UX case study artifacts in a pastel museum archive, representing JSON-LD schema for structured portfolio content."
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: "Download Assets of This Post"
---

<p dir="auto">Case studies are the highest-stakes pages on a designer's site. A recruiter or client lands there, decides in minutes, and leaves. Yet they're usually the least machine-readable pages too: long scrolls of images and prose with nothing telling a crawler what was made, by whom, with what tools, for what outcome. Structured data fixes the machine-readable half, and for a UX portfolio it has one immediate complication worth addressing first.</p><h2 dir="auto">The complication: there is no CaseStudy type</h2><p dir="auto">Schema.org doesn't define a CaseStudy type. You're choosing from the existing vocabulary, and Google constrains the choice further: <a href="https://developers.google.com/search/docs/appearance/structured-data/article">for article markup, the object must be based on Article, NewsArticle, or BlogPosting</a>, with no required properties, just recommended ones that apply to your content.</p><p dir="auto">Expectations should be set honestly alongside that. <a href="https://squin.org/structured-data/">Of the 800+ types schema.org defines, only around 30 are eligible for visual rich results in Google's Search Gallery, FAQ rich results were restricted in 2023 to authoritative government and health sites, and How-To results were deprecated on mobile</a>. So for a portfolio, schema's payoff is mostly entity clarity (helping machines understand who you are and what you made) rather than SERP decoration. That payoff has grown, not shrunk, now that AI assistants are a discovery channel; extraction-friendly structure is the theme of <a href="/blog/geo-vs-seo-ai-search">GEO vs SEO</a>, and schema is its most literal form.</p><h2 dir="auto">The recipe: an Article about a CreativeWork, by a Person</h2><p dir="auto">The model that fits a case study is layered: the page itself is a BlogPosting (or Article), the project it describes is a nested <a href="https://schema.org/CreativeWork">CreativeWork</a>, and you are a Person connected to both. That last entity matters more than it looks: in <a href="https://ppc.land/google-and-schema-org-finally-show-how-the-web-uses-structured-data/">the adoption data Google and Schema.org published, Person and Organization sit among the most widely deployed types on the entire web</a>, precisely because they anchor identity, which is the thing a portfolio exists to establish.</p><pre data-language="HTML"><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How User Research Shaped My Travel Platform",
  "description": "A case study on turning traveler interviews into product decisions.",
  "author": {
    "@type": "Person",
    "name": "Josue Somarribas",
    "url": "https://josuesomarribas.com",
    "jobTitle": "UX Designer &amp; CRO Specialist",
    "sameAs": ["https://www.linkedin.com/in/your-profile"]
  },
  "about": {
    "@type": "CreativeWork",
    "name": "Travel platform concept",
    "creator": { "@type": "Person", "name": "Josue Somarribas" },
    "keywords": "UX research, travel, product design"
  },
  "image": "https://your-cdn/cover.jpg",
  "datePublished": "2025-01-31",
  "inLanguage": "en"
}
&lt;/script&gt;</code></pre><p dir="auto">The fields that earn their bytes for a portfolio specifically: <strong>about</strong> (the project as its own entity), <strong>sameAs</strong> on the Person (binding the site to your LinkedIn so machines consolidate you into one identity), <strong>keywords</strong> mapped to your actual skills, and <strong>inLanguage</strong>, which does real work on a bilingual site. Skip ratings, offers, and anything your page doesn't visibly contain; markup that doesn't match visible content is the one way to turn schema from neutral into harmful.</p><h2 dir="auto">Implementation in Framer, briefly</h2><p dir="auto">Framer doesn't generate JSON-LD natively, so this travels in a code embed on the CMS template, with CMS variables filling the dynamic fields, exactly the mechanism I documented in <a href="/blog/structural-seo-json-ld-framer">how to use JSON-LD for blog schema in Framer CMS</a> and extended in <a href="/blog/structural-seo-json-ld-framer">structural SEO: JSON-LD in Framer beyond meta tags</a>. Two portfolio-specific notes on top of those guides: case-study pages and blog posts can share one template-level script with the @type switched per collection, and on a localized site the inLanguage value and localized URLs need to track the locale, the workflow from <a href="/blog/framer-localization-workflow-hreflang-and-multi-language-cms">my Framer localization post</a>.</p><p dir="auto">Validate with Google's Rich Results Test after deploying, as <a href="https://developers.google.com/search/docs/appearance/structured-data/article">their documentation recommends</a>, and re-validate when you change the template, since one renamed CMS field silently breaks every page at once.</p><h2 dir="auto">What I'd skip</h2><p dir="auto">Resist the urge to mark up everything. AggregateRating without visible ratings, HowTo on a process write-up, FAQ blocks added purely for markup: these range from useless to risky given the eligibility restrictions above. A small, truthful graph that machines can trust beats an ambitious one they have to discount.</p><h2 dir="auto">The implication</h2><p dir="auto">For a UX portfolio there's a second-order effect worth naming: structured data is itself a work sample. A case study that's impeccably marked up demonstrates, in the page source, the systems thinking the case study claims in prose. The audience that views source is small, but it overlaps heavily with the audience that hires.</p><p dir="auto"><em>Related reads: </em><a href="/blog/structural-seo-json-ld-framer"><em>JSON-LD blog schema in Framer</em></a><em>, </em><a href="/blog/structural-seo-json-ld-framer"><em>structural SEO in Framer</em></a><em>, and </em><a href="/blog/how-user-research-shaped-my-travel-platform"><em>the travel platform case study</em></a><em> this post's example describes.</em></p>
