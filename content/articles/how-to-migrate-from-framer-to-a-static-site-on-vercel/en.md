---
slug: "how-to-migrate-from-framer-to-a-static-site-on-vercel"
locale: "en"
title: "How to Migrate from Framer to an AI-Assisted Static Site on Vercel"
description: "A practical migration guide for moving a Framer portfolio and CMS blog into a versioned, file-backed static site deployed through Git and Vercel."
date: "2026-08-28T13:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["Framer migration", "Vercel", "Static export", "React", "AI-assisted development", "Technical SEO"]
audio: ""
sourceImage: ""
imageAlt: ""
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>Moving a site out of Framer is not mainly a job of recreating rectangles in CSS. The difficult part is preserving the invisible system around the rectangles: URLs, content, metadata, images, language relationships, redirects, analytics, and all the small assumptions accumulated while the site was live.</p>

<p>I migrated my portfolio into a statically exported React project, keep the blog as files, use AI to accelerate implementation and review, and deploy the finished output to Vercel. This guide explains the workflow I would use again.</p>

<p>If you want the reasoning and real cost comparison first, read <a href="/blog/why-i-left-framer-for-a-static-site-on-vercel">Why I Left Framer for an AI-Assisted Static Site on Vercel</a>.</p>

<h2>The target architecture</h2>

<pre><code>content/articles/       versioned blog content
public/images/          static image assets
public/audio/           pre-generated narration
app/                    routes and page components
lib/content.ts          content loader
scripts/                migration and metadata tools
tests/                  rendered-output checks
dist/client/            deployable static site</code></pre>

<p>The browser receives static files. Git stores the source of truth. Vercel builds the repository and publishes <code>dist/client</code>. Dynamic behavior can still run in the browser, but a server is not required to render an article.</p>

<h2>Step 1: inventory the live site before touching code</h2>

<p>Create a list of every URL that matters. Include:</p>

<ul><li><p>primary pages and localized versions;</p></li><li><p>every CMS article slug;</p></li><li><p>canonical URLs and metadata;</p></li><li><p>images, downloads, audio, and externally hosted assets;</p></li><li><p>forms and third-party embeds;</p></li><li><p>analytics, verification tags, and consent behavior;</p></li><li><p>redirects already in use;</p></li><li><p>pages receiving impressions or backlinks.</p></li></ul>

<p>Export the Framer CMS collection to CSV and keep the original export untouched in a backup folder. Take full-page screenshots of important routes at desktop and mobile sizes. Screenshots are not source code, but they are excellent regression evidence.</p>

<p>Do this before redesigning anything. A migration and a redesign can happen together, but you still need to know whether a difference is intentional.</p>

<h2>Step 2: choose a static-capable stack</h2>

<p>You do not need my exact dependencies. Astro, Eleventy, Next.js static export, or another static-capable framework can all work. The important requirements are:</p>

<ul><li><p>one deterministic output file per public route;</p></li><li><p>support for metadata and localized routes;</p></li><li><p>a build command that fails loudly;</p></li><li><p>content that does not depend on a proprietary editor;</p></li><li><p>a deployable output directory.</p></li></ul>

<p>My implementation uses React, Vite, and vinext:</p>

<pre><code>npm install
npm run dev
npm run build
npm test</code></pre>

<p>The production export is enabled in <code>next.config.ts</code>:</p>

<pre><code>const nextConfig = {
  output: "export",
};

export default nextConfig;</code></pre>

<p>Because vinext builds through Vite, the finished client output lands in <code>dist/client</code>. That directory, not the source repository, is what the host serves.</p>

<h2>Step 3: convert CMS records into portable article files</h2>

<p>Each article in this site lives at:</p>

<pre><code>content/articles/&lt;slug&gt;/en.md
content/articles/&lt;slug&gt;/es.md</code></pre>

<p>The file begins with strict front matter and continues with the article body:</p>

<pre><code>---
slug: "example-article"
locale: "en"
title: "Example Article"
description: "A useful summary."
date: "2026-08-28T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["Migration", "Static site"]
audio: ""
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
---

&lt;p&gt;The article begins here.&lt;/p&gt;</code></pre>

<p>I wrote a migration script for the CSV archive rather than pasting dozens of articles by hand. The script normalizes slugs, converts metadata into the expected shape, preserves drafts, strips unsafe scripts and inline event handlers, and assigns a temporary local cover when an image has not yet been migrated.</p>

<p>The rule worth keeping is simple: <strong>never make the importer destructive</strong>. Keep the original CSV, write generated content into a separate structure, and make repeated runs deterministic.</p>

<h2>Step 4: build one content loader</h2>

<p>The content loader reads the front matter, returns the article body, filters drafts, sorts by date, and supports a locale parameter. Every consumer should use that loader: the blog index, article routes, related-post navigation, RSS, and sitemap.</p>

<p>Centralizing this logic prevents one of the most common static-site mistakes: a draft disappearing from the index while remaining discoverable through the sitemap or a generated route.</p>

<pre><code>getAllArticles({ locale: "en" })
  .filter(article =&gt; !article.draft)
  .sort((a, b) =&gt; Date.parse(b.date) - Date.parse(a.date));</code></pre>

<p>The individual article route performs the same draft check and returns not found when the content is not public.</p>

<h2>Step 5: preserve URL structure before improving it</h2>

<p>If the Framer article lived at <code>/blog/my-article</code>, keep that URL unless there is a strong reason to change it. A prettier route is rarely worth losing established links, shares, and search history.</p>

<p>When a route must change, add a permanent redirect in the same release:</p>

<pre><code>{
  "source": "/writing/:slug",
  "destination": "/blog/:slug",
  "permanent": true
}</code></pre>

<p>Do the same when consolidating overlapping posts. Move the useful content into the stronger article, make the weaker article a draft, and redirect its old URL to the surviving canonical page. Do not ask Google to remove a URL that should transfer its signals through a redirect.</p>

<h2>Step 6: rebuild metadata as output, not decoration</h2>

<p>A successful visual migration can still be an SEO regression. The build should produce and verify:</p>

<ul><li><p>unique titles and descriptions;</p></li><li><p>self-referencing canonical URLs;</p></li><li><p>language attributes and reciprocal alternates where translations exist;</p></li><li><p>Open Graph metadata;</p></li><li><p>structured data that matches visible content;</p></li><li><p><code>robots.txt</code>;</p></li><li><p><code>sitemap.xml</code>;</p></li><li><p><code>rss.xml</code>.</p></li></ul>

<p>In my project, a post-build script writes the deployable metadata files after the static routes have been exported. Draft articles are excluded from all three feeds.</p>

<h2>Step 7: treat localization as separate content</h2>

<p>A translated route should exist only when a real translation exists. Do not publish English text under an <code>/es/</code> URL and hope a language tag makes it Spanish.</p>

<p>This project uses an explicit file rule:</p>

<pre><code>en.md exists  → publish /blog/slug
es.md exists  → publish /es/blog/slug
es.md missing → do not claim a Spanish translation</code></pre>

<p>The sitemap adds alternates only for pairs that genuinely exist. A rendered-output test counts translated pages and confirms their HTML language is Spanish.</p>

<h2>Step 8: move assets out of platform URLs carefully</h2>

<p>Download images at their best available quality and keep the originals in a root-level backup folder. Create optimized public copies separately. Never solve a performance problem by deleting the only high-resolution source.</p>

<p>Use stable local paths:</p>

<pre><code>backup/original-images/article-hero.png
public/images/blog/article-hero.webp</code></pre>

<p>Update alt text while migrating, but do not invent descriptions unrelated to the image. Scan the exported content for old Framer CDN URLs after the migration; remote assets are easy to miss because they continue working until they do not.</p>

<h2>Step 9: add AI without handing it the steering wheel</h2>

<p>AI is most useful here as a fast collaborator across several narrow tasks:</p>

<ul><li><p>map repeated Framer patterns into reusable components;</p></li><li><p>write migration scripts and validation checks;</p></li><li><p>identify duplicated CSS and inconsistent tokens;</p></li><li><p>compare screenshots against a reference;</p></li><li><p>draft metadata and image alt text for review;</p></li><li><p>find internal links pointing to retired routes;</p></li><li><p>create tests around bugs that already happened.</p></li></ul>

<p>The workflow is not “ask AI to rebuild the website.” It is:</p>

<ol><li><p>define one bounded outcome;</p></li><li><p>let the assistant inspect the actual repository;</p></li><li><p>review the proposed files and assumptions;</p></li><li><p>run the build and tests;</p></li><li><p>open the result at real breakpoints;</p></li><li><p>commit a change small enough to understand.</p></li></ol>

<p>AI makes the loop faster. Git makes the loop recoverable. Tests make the loop trustworthy.</p>

<h2>Step 10: configure Vercel as a static host</h2>

<p>Connect the Git repository to Vercel and describe the build explicitly:</p>

<pre><code>{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "cleanUrls": true
}</code></pre>

<p>Every push can now create a deployment. Preview deployments make visual review safer, while production remains a promotion of a specific Git state.</p>

<p>Vercel Hobby currently costs $0, but it is explicitly intended for personal, non-commercial use. Review the <a href="https://vercel.com/docs/plans/hobby">official plan terms</a> before treating it as the permanent hosting plan for a commercial site. Pro is the appropriate reference when the project crosses that boundary.</p>

<h2>Step 11: test the exported site, not only development mode</h2>

<p>A local development server can hide static-export problems. My test command performs a production build and then inspects the files that will actually be deployed.</p>

<p>The minimum useful checks are:</p>

<ul><li><p>canonical pages exist as static HTML;</p></li><li><p>robots, sitemap, and RSS exist in the output directory;</p></li><li><p>drafts are absent;</p></li><li><p>only genuine translations appear under localized routes;</p></li><li><p>legacy redirects remain configured;</p></li><li><p>internal links do not point to retired articles.</p></li></ul>

<pre><code>npm test</code></pre>

<p>A green test suite is not a design review. I still inspect the homepage, blog index, one long article, navigation, footer, mobile layout, keyboard behavior, and reduced-motion behavior in a browser.</p>

<h2>Step 12: switch the domain without improvising</h2>

<ol><li><p>Lower DNS TTL in advance if the provider allows it.</p></li><li><p>Add the domain to Vercel and note the required DNS records.</p></li><li><p>Deploy and test through the Vercel preview domain first.</p></li><li><p>Confirm canonical URLs still reference the real production domain.</p></li><li><p>Update DNS through the registrar.</p></li><li><p>Verify HTTPS, the <code>www</code> redirect, sitemap, robots file, and key article URLs.</p></li><li><p>Resubmit the sitemap in Google Search Console and monitor indexing.</p></li></ol>

<p>Do not cancel the old platform before the new domain, redirects, and critical pages have been verified. A few days of overlap is cheaper than an avoidable outage.</p>

<h2>The migration checklist</h2>

<ul><li><p>Original CMS export backed up.</p></li><li><p>High-quality images preserved.</p></li><li><p>Every public Framer URL mapped to a destination.</p></li><li><p>Articles imported with stable slugs.</p></li><li><p>Drafts excluded everywhere.</p></li><li><p>Real translations separated from fallbacks.</p></li><li><p>Canonicals, schema, sitemap, robots, and RSS generated.</p></li><li><p>Redirects configured before launch.</p></li><li><p>Production build tested.</p></li><li><p>Desktop and mobile screenshots reviewed.</p></li><li><p>Domain and HTTPS verified.</p></li><li><p>Search Console sitemap resubmitted.</p></li></ul>

<h2>When this model is the wrong choice</h2>

<p>Do not migrate purely to save money if nobody wants to maintain code. A static repository is a poor replacement for a visual CMS when a non-technical team publishes daily, experiments require an integrated marketing platform, or layout changes must happen without engineering review.</p>

<p>It works especially well for portfolios, documentation, editorial sites, and relatively stable content where ownership, performance, and custom behavior matter more than drag-and-drop publishing.</p>

<p>The result is not “a free website made by AI.” It is a small software project with low infrastructure costs, versioned content, explicit trade-offs, and an AI-assisted maintenance workflow.</p>

<p>That description is less magical. It is also the reason I trust it.</p>
