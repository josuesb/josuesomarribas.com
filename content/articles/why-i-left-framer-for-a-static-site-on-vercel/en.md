---
slug: "why-i-left-framer-for-a-static-site-on-vercel"
locale: "en"
title: "Why I Left Framer for an AI-Assisted Static Site on Vercel"
description: "Why I moved my portfolio from Framer to a file-backed static site on Vercel, what it really costs, what I gained, and what I gave up."
date: "2026-08-28T14:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["Framer", "Vercel", "Static site", "AI-assisted development", "Portfolio", "Web development"]
audio: ""
sourceImage: ""
imageAlt: ""
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>I did not leave Framer because it is a bad product. I left because my website had stopped behaving like a design project and started behaving like a small publishing system.</p>

<p>I wanted bilingual routes, file-backed articles, predictable redirects, complete control over structured data, locally generated audio, tests for the sitemap, and the freedom to change a component without negotiating with a visual editor. Framer could handle parts of that list. The problem was the growing tax around the parts it did not own cleanly.</p>

<p>So I rebuilt the site as a statically exported React project, keep the content in the repository, use AI as a development partner, and deploy the finished files to Vercel. The production site does not need a database or a server process. It is mostly HTML, CSS, JavaScript, images, and MP3 files served from a CDN.</p>

<p>This is not a “Framer is dead” article. It is a record of when a visual builder stopped being the right abstraction for one particular site.</p>

<h2>The short version</h2>

<p>Framer gave me speed at the beginning. The static site gives me control now.</p>

<table><thead><tr><th>Framer model</th><th>Current static model</th></tr></thead><tbody><tr><td>Visual editor owns the page structure</td><td>Git repository owns the page structure</td></tr><tr><td>CMS content lives inside the platform</td><td>Articles live as versioned files</td></tr><tr><td>Hosting and editing are bundled</td><td>Hosting, content, and tooling are separable</td></tr><tr><td>Changes happen mainly through a UI</td><td>Changes happen through code and reviewed diffs</td></tr><tr><td>Localization is a paid product feature</td><td>Locales are routes and content files</td></tr><tr><td>Platform conventions define the ceiling</td><td>My maintenance capacity defines the ceiling</td></tr></tbody></table>

<p>The last row is important. Owning the stack does not remove constraints. It replaces product constraints with engineering responsibility.</p>

<h2>The cost comparison, without creative accounting</h2>

<p>My Framer invoice history shows the real progression: a $90 Basic yearly payment in 2024, a $180 Basic Site yearly payment in 2025, and a separate $168.16 Locale payment in 2026. Using the most recent paid Basic and Locale invoices together, the platform cost was $348.16 before counting the domain.</p>

<p>Framer’s current public pricing also shows why localization changes the calculation: Basic is listed at $10 per month with yearly billing, while additional locales are listed as a $20-per-locale monthly add-on. Pricing changes, regional taxes differ, and my invoice is not a universal quote, so I treat my receipts as the record of what I paid and the <a href="https://www.framer.com/pricing">official pricing page</a> as the current reference.</p>

<p>My new cash outlay looked like this:</p>

<table><thead><tr><th>Item</th><th>How I account for it</th><th>Cost</th></tr></thead><tbody><tr><td>Static hosting on Vercel Hobby</td><td>Current recurring hosting</td><td>$0</td></tr><tr><td>Domain registered with Spaceship</td><td>Yearly recurring cost</td><td>$8</td></tr><tr><td>ChatGPT Plus</td><td>One month allocated to the migration</td><td>$20</td></tr><tr><td>Migration-month outlay</td><td>Domain + one allocated ChatGPT month</td><td>$28</td></tr><tr><td>Recurring website cost after migration</td><td>Domain only</td><td>$8/year</td></tr></tbody></table>

<p>That $28 number is the amount I assign to the transition this month, not a new monthly website bill. ChatGPT Plus is $20 per month according to the <a href="https://openai.com/chatgpt/pricing">official ChatGPT pricing page</a>, but I already use that subscription for work beyond this website. I am allocating one month to the migration because that reflects the concentrated build effort; I am not treating the subscription as permanent hosting infrastructure.</p>

<p>After the migration month, the marginal recurring infrastructure cost of this website is therefore <strong>$8 per year</strong>: the domain. The generated site does not call ChatGPT in production, and visitors do not consume AI credits when they open a page. If I stopped paying for ChatGPT tomorrow, the deployed website would continue working.</p>

<table><thead><tr><th>Comparison</th><th>Cost</th></tr></thead><tbody><tr><td>Recent Framer Basic + Locale invoices</td><td>$348.16/year</td></tr><tr><td>One-time migration-month allocation</td><td>$28</td></tr><tr><td>Static site after migration</td><td>$8/year</td></tr></tbody></table>

<p>Against my latest Framer platform invoices, the recurring platform saving is about <strong>$340.16 per year</strong>. The domain is excluded from that saving because I need it in either setup. The first year also includes the one-off $20 allocation for the AI-assisted migration, bringing the new-model outlay to $28 rather than $8.</p>

<h2>The Vercel $0 caveat</h2>

<p>Vercel’s Hobby plan is $0 and includes Git deployments, a CDN, HTTPS, preview deployments, and enough included usage for many small static projects. But “free” is not the only condition that matters.</p>

<p>Vercel explicitly describes Hobby as a plan for personal, non-commercial use. Its <a href="https://vercel.com/docs/plans/hobby">Hobby documentation</a> and <a href="https://vercel.com/pricing">pricing page</a> both make that boundary visible. A portfolio that directly operates as a commercial business site may need Pro, currently listed at $20 per month. Anyone copying this setup should classify their own use honestly instead of treating Hobby as an unconditional free-hosting coupon.</p>

<p>My architecture remains inexpensive even if the hosting plan changes because static delivery uses very little compute. But the accurate claim is: <strong>my current Vercel bill is $0 under Hobby, subject to its eligibility and usage limits</strong>.</p>

<h2>What finally pushed me away from Framer</h2>

<h3>My content needed to become portable</h3>

<p>A CMS is convenient until the CMS becomes the only comfortable place where the content can exist. I wanted every article, translation, redirect, image path, audio path, and metadata field to be inspectable in the repository.</p>

<p>Now each article lives in a predictable folder with front matter and HTML content. Drafts remain versioned but disappear from public routes, RSS, and the sitemap. A platform migration no longer requires rescuing the writing from the platform first.</p>

<h3>Localization had become infrastructure</h3>

<p>English and Spanish are not cosmetic variants of the same page. They affect routes, metadata, sitemaps, hreflang relationships, editorial review, and publishing workflows. Paying for a locale was only one part of the friction; the larger problem was having less control over how the two content trees behaved.</p>

<p>In the static version, a real Spanish article is an <code>es.md</code> file. If the translation does not exist, the route is not presented to Google as translated content. That rule is simple enough to test automatically.</p>

<h3>I wanted boring, inspectable SEO</h3>

<p>The site now generates its own sitemap, robots file, RSS feed, canonical metadata, and language alternates. Redirects live in configuration. When an article becomes a draft, it leaves the sitemap during the next build. When several articles overlap, I can merge them and add permanent redirects in the same change.</p>

<p>None of this is visually exciting. That is why I like it.</p>

<h3>AI made code ownership practical again</h3>

<p>AI did not remove the need to understand the website. It reduced the cost of moving between design intent and implementation. I can describe a layout problem, inspect the proposed diff, run the site, compare screenshots, and iterate without turning every change into a fresh mini-project.</p>

<p>The important distinction is that AI assists the repository; it does not own the repository. The durable assets are still ordinary files, tests, Git history, build commands, and documented decisions.</p>

<h2>What I gained</h2>

<ul><li><p><strong>Ownership.</strong> The content and interface can move to another static host.</p></li><li><p><strong>Version history.</strong> Every meaningful change can be reviewed and reversed.</p></li><li><p><strong>Performance.</strong> Public routes are rendered during the build instead of assembled on every request.</p></li><li><p><strong>Custom behavior.</strong> Audio, navigation, animation, schema, and editorial layouts are normal code.</p></li><li><p><strong>Testability.</strong> The build verifies public routes, sitemap output, localization, and redirects.</p></li><li><p><strong>Cost separation.</strong> The domain, hosting, AI subscription, and content are no longer one platform decision.</p></li></ul>

<h2>What I gave up</h2>

<p>This move would be dishonest if I only described the upside.</p>

<ul><li><p><strong>The visual canvas.</strong> Framer is much faster when the main task is freely composing a marketing page.</p></li><li><p><strong>Non-technical editing.</strong> A repository is not automatically a friendly CMS for a content team.</p></li><li><p><strong>Managed conventions.</strong> I now own dependencies, build failures, accessibility regressions, and deployment configuration.</p></li><li><p><strong>Instant publishing from a UI.</strong> Content changes move through files, Git, and a deployment.</p></li><li><p><strong>A single support boundary.</strong> When something breaks, there is no one product responsible for the whole stack.</p></li></ul>

<p>For a collaborative marketing team that needs to rearrange pages daily, I might still choose Framer. For a personal portfolio that is becoming an editorial and technical system, I prefer the repository.</p>

<h2>The actual stack</h2>

<p>The current site uses React 19, Vite, and vinext. Vinext provides an App Router-compatible model on top of Vite, and the project exports every public route as static output. Articles are stored under <code>content/articles</code>. A build script writes <code>robots.txt</code>, <code>sitemap.xml</code>, and <code>rss.xml</code>. Vercel publishes the resulting <code>dist/client</code> directory.</p>

<p>There is no production database for the blog and no text-to-speech API running when someone presses Listen. Audio can be generated locally and deployed as a normal MP3. This keeps the production architecture intentionally boring.</p>

<h2>Would I recommend the same move?</h2>

<p>Only if the reason is stronger than “code feels more serious.”</p>

<p>Stay with Framer if visual iteration is the main job, several non-developers publish content, or the existing platform already does what you need at a price you accept. Move to a static repository when portability, custom behavior, versioned content, technical SEO, and long-term control matter enough to justify owning the build.</p>

<p>The best tool is not the one with the lowest invoice. It is the one whose constraints match the work.</p>

<p>For this site, that changed. Framer was the right place to discover the design. The repository became the right place to keep building it.</p>

<p>The companion guide, <a href="/blog/how-to-migrate-from-framer-to-a-static-site-on-vercel">How to Migrate from Framer to a Static Site on Vercel</a>, documents the actual workflow, folder structure, deployment configuration, redirects, metadata, and AI-assisted QA.</p>
