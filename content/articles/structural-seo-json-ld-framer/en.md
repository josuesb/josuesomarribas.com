---
slug: "structural-seo-json-ld-framer"
locale: "en"
title: "Structural SEO: JSON-LD in Framer Beyond Meta Tags"
description: "A complete structural SEO workflow for Framer using JSON-LD, CMS fields, validation, llms.txt, sitemaps, and machine-readable article structure."
date: "2026-08-28T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: []
audio: ""
sourceImage: "https://framerusercontent.com/images/JonfDb4WmoRt6cIewByQIgGg54.jpg"
imageAlt: "A dynamic gathering of photographers capturing moments indoors with flash."
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p dir="auto">Structural SEO is the practice of making a page’s meaning explicit through hierarchy, internal links, and structured data. In Framer, that means going beyond title tags and meta descriptions by using JSON-LD to describe what a post is, who wrote it, how it fits into the site, and which questions it answers.</p>
<p dir="auto">Meta tags help Google preview a page. Structured data helps Google understand the page. Those are related jobs, but they are not the same job.</p>
<h2 dir="auto">Why JSON-LD matters in a Framer site</h2>
<p dir="auto">Google recommends JSON-LD for structured data when a site setup allows it because it is usually easier to implement and maintain at scale. For Framer sites, that matters because the visual editor can make pages look polished while the underlying content relationships remain thin.</p>
<p dir="auto">A blog post should not only say “this is an article.” It should identify the author, publication date, modified date, headline, image, canonical URL, and sometimes breadcrumbs or FAQs. That extra layer gives search engines a cleaner map of the content.</p>
<h2 dir="auto">The structure Google can understand</h2>
<p dir="auto">For a technical blog post in Framer, these schema types are usually the most useful:</p>
<ul dir="auto">
<li data-preset-tag="p">
<p>
<strong>Article</strong> or <strong>BlogPosting</strong>, for the post itself.</p>
</li>
<li data-preset-tag="p">
<p>
<strong>BreadcrumbList</strong>, for the page’s place inside the site.</p>
</li>
<li data-preset-tag="p">
<p>
<strong>FAQPage</strong>, when the article includes visible question-and-answer content.</p>
</li>
<li data-preset-tag="p">
<p>
<strong>HowTo</strong>, when the article teaches a clear sequence of steps.</p>
</li>
<li data-preset-tag="p">
<p>
<strong>Person</strong>, for the author entity behind the site.</p>
</li>
</ul>
<p dir="auto">Do not add schema just because it exists. Add it when the structured data matches visible content on the page. If the FAQ is not visible to users, it should not be hidden in JSON-LD like a little SEO costume.</p>
<h2 dir="auto">A basic Article schema for Framer</h2>
<p dir="auto">A simple Article schema can be added as custom code in the page head or injected through a component pattern, depending on your Framer setup.</p>
<pre data-language="JSX">
<code>&lt;script type="application/ld+json"&gt;
{"@context": "https://schema.org","@type": "BlogPosting","headline": "Structural SEO: JSON-LD in Framer Beyond Meta Tags","description": "How to use JSON-LD in Framer to help Google understand your article structure.","author": {"@type": "Person","name": "Josue Somarribas","url": "https://josuesomarribas.com"},"datePublished": "2026-06-08","dateModified": "2026-06-08","mainEntityOfPage": {"@type": "WebPage","@id": "https://josuesomarribas.com/blog/structural-seo-json-ld-framer"}
}
&lt;/script&gt;</code>
</pre>
<p dir="auto">This does not replace good headings, useful content, or internal links. It supports them. Structured data is a label on a well-built shelf, not the shelf itself.</p>
<h2 dir="auto">Dynamic structured data for CMS posts</h2>
<p dir="auto">The stronger pattern is to connect schema values to CMS fields: title, description, slug, date, image, category, and author. That keeps your schema aligned with the page as your content library grows.</p>
<p dir="auto">For a Framer CMS blog, the target model should look like this:</p>
<ul dir="auto">
<li data-preset-tag="p">
<p>The post title becomes <code>headline</code>.</p>
</li>
<li data-preset-tag="p">
<p>The excerpt or description becomes <code>description</code>.</p>
</li>
<li data-preset-tag="p">
<p>The cover image becomes <code>image</code>.</p>
</li>
<li data-preset-tag="p">
<p>The author stays consistent as a <code>Person</code> entity.</p>
</li>
<li data-preset-tag="p">
<p>The slug builds the canonical <code>mainEntityOfPage</code> URL.</p>
</li>
<li data-preset-tag="p">
<p>The category can inform breadcrumbs and internal linking.</p>
</li>
</ul>
<p dir="auto">If you update the title in the CMS but forget to update JSON-LD manually, you create mismatched signals. Dynamic values reduce that risk.</p>
<h2 dir="auto">Breadcrumbs are underrated</h2>
<p dir="auto">Breadcrumb schema is useful because it explains where the article sits inside the site. For a portfolio blog, that might be Home, Blog, SEO, then the article title.</p>
<pre data-language="JSX">
<code>{"@context": "https://schema.org","@type": "BreadcrumbList","itemListElement": [{"@type": "ListItem","position": 1,"name": "Home","item": "https://josuesomarribas.com"},{"@type": "ListItem","position": 2,"name": "Blog","item": "https://josuesomarribas.com/blog"},{"@type": "ListItem","position": 3,"name": "SEO","item": "https://josuesomarribas.com/blog?category=seo"}]
}</code>
</pre>
<p dir="auto">This is structural SEO in a very literal sense. You are telling the crawler how the content shelf is organized.</p>
<h2 dir="auto">JSON-LD for AI search and GEO</h2>
<p dir="auto">Generative search systems still depend heavily on retrievable, well-structured content. JSON-LD alone will not make an article quotable, but it helps define entities and relationships more clearly. For GEO, the bigger win is combining schema with self-contained answers, precise headings, definitions, and internal links.</p>
<p dir="auto">A sentence like “JSON-LD is a structured data format used to describe page entities in machine-readable form” is easier to extract than a poetic paragraph about visibility. Poetry can stay home for this one.</p>
<h2 dir="auto">A practical Framer schema checklist</h2>
<ul dir="auto">
<li data-preset-tag="p">
<p>Add Article or BlogPosting schema to every serious blog post.</p>
</li>
<li data-preset-tag="p">
<p>Use BreadcrumbList for blog hierarchy.</p>
</li>
<li data-preset-tag="p">
<p>Use FAQPage only when the questions and answers are visible in the article.</p>
</li>
<li data-preset-tag="p">
<p>Keep schema values aligned with CMS fields.</p>
</li>
<li data-preset-tag="p">
<p>Validate the output with Google’s Rich Results Test.</p>
</li>
<li data-preset-tag="p">
<p>Do not mark up content that users cannot see.</p>
</li>
<li data-preset-tag="p">
<p>Update <code>dateModified</code> when a post is materially changed.</p>
</li>
</ul>
<h2 dir="auto">The practical answer</h2>
<p dir="auto">Framer can look excellent while still being structurally vague. JSON-LD fixes part of that by giving search engines a clearer description of your content hierarchy.</p>
<p dir="auto">Start with Article schema, add breadcrumbs, connect values to CMS fields where possible, and validate before publishing. That is the difference between decorating a post for SEO and actually explaining what it is.</p>
<h2 dir="auto">Where to add JSON-LD in Framer</h2>
<p dir="auto">Framer gives you two practical routes. The visual Structured Data field is convenient when the markup is simple and maps cleanly to CMS values. Custom code in the document head gives you full control when the graph has several entities, locale-specific values, or relationships the visual panel cannot express.</p>
<p dir="auto">Whichever route you use, inspect the live page rather than trusting Preview. The generated script must contain valid JSON, absolute URLs, the final canonical URL, and values that match what visitors can see. Template syntax, escaping, and trailing commas are the common failure points.</p>
<h3 dir="auto">A reusable BlogPosting shape</h3>
<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article title",
  "description": "Article description",
  "datePublished": "2026-06-10",
  "dateModified": "2026-06-10",
  "mainEntityOfPage": "https://example.com/blog/article",
  "author": { "@type": "Person", "name": "Author name" },
  "publisher": { "@type": "Organization", "name": "Site name" }
}</code></pre>
<p dir="auto">Treat this as a shape, not something to paste blindly. Add an image only when the URL is public and representative. Use a Person publisher for a personal site when that reflects reality. Schema should describe the page you actually published.</p>
<h2 dir="auto">llms.txt is a directory, not a ranking switch</h2>
<p dir="auto">An <code>llms.txt</code> file can offer AI-oriented tools a clean list of important resources and short descriptions. It can be useful documentation, especially for a content-heavy site, but it is neither an access-control standard nor a replacement for crawlable HTML, internal links, sitemaps, or structured data.</p>
<p dir="auto">Keep it small and intentional: identify the site, list canonical pillar pages, and link to useful machine-readable resources. Do not dump the whole sitemap into a second file. If the main pages are vague or inaccessible, an immaculate <code>llms.txt</code> will not rescue them.</p>
<h2 dir="auto">Make the article itself machine-readable</h2>
<p dir="auto">Structured data works best when the visible writing is structured too. Start with one clear question, answer it early, use headings that describe real subproblems, and include concrete examples. Make authorship and update dates obvious. Link related claims to supporting pages.</p>
<p dir="auto">This is not about flattening every article into robotic FAQ copy. It is about reducing ambiguity. A reader and a retrieval system should both be able to identify the main claim, the evidence behind it, and where the answer changes under different conditions.</p>
<h2 dir="auto">Validation before publication</h2>
<ol dir="auto"><li><p>Open the production URL and inspect the rendered JSON-LD.</p></li><li><p>Run it through Google Rich Results Test and Schema.org Validator.</p></li><li><p>Confirm the canonical, dates, author, image, and breadcrumbs match the page.</p></li><li><p>Check the URL appears once in the sitemap and is internally linked.</p></li><li><p>Keep <code>llms.txt</code> focused on canonical resources rather than every archive URL.</p></li></ol>
