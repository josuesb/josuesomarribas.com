---
slug: "json-ld-examples-and-use-cases"
locale: "en"
title: "JSON-LD Examples: 12 Practical Use Cases for Websites"
description: "A practical guide to 12 JSON-LD use cases, with working Schema.org examples, selection advice, validation steps, and the mistakes that make markup misleading."
date: "2026-09-01T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["JSON-LD", "Schema.org", "Technical SEO"]
audio: ""
sourceImage: "/images/blog/json-ld-examples-and-use-cases-1400.webp"
imageAlt: "A central structured-data graph connecting article, person, organization, video, event, product, software, and job-listing objects."
image: "/images/blog/json-ld-examples-and-use-cases-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>JSON-LD becomes much easier once you stop thinking of it as an SEO ornament and start treating it as a description of the things a page is genuinely about. A page may describe an article, a person, a company, a product, an event, or several connected entities. JSON-LD gives those entities names, types, properties, and relationships that machines can read without reverse-engineering the interface.</p>

<p>This guide covers twelve practical JSON-LD use cases for modern websites. The goal is not to mark up everything. It is to choose the smallest truthful graph that describes the visible content and supports a real search or discovery use case.</p>

<aside><p><strong>The essential distinction:</strong> valid Schema.org markup is not the same as eligibility for a Google rich result. Schema.org provides a broad vocabulary; Google supports a smaller, changing set of search features. Always check the <a href="https://developers.google.com/search/docs/appearance/structured-data/search-gallery">Google Search Gallery</a> for current feature requirements.</p></aside>

<h2>What JSON-LD is used for</h2>

<p>JSON-LD is a format for linked data. On a website, it normally appears in a <code>&lt;script type="application/ld+json"&gt;</code> element and uses the Schema.org vocabulary. Search engines can use it to understand entities and, for supported types, evaluate a page for enhanced search appearances.</p>

<p>It does not guarantee rankings or rich results. Its practical value is clarity: it makes explicit what the page represents, which facts belong to which entity, and how those entities relate.</p>

<pre data-language="HTML"><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "JSON-LD Examples and Use Cases",
  "url": "https://example.com/json-ld-examples"
}
&lt;/script&gt;</code></pre>

<h2>1. Organization: define the company behind the site</h2>

<p>Use <a href="https://schema.org/Organization">Organization</a> on an authoritative page about a business, normally the home or about page. It can connect the company name, canonical URL, logo, contact details, and verified public profiles. Keep one stable <code>@id</code> and reuse it when other objects reference the organization.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://example.com/#organization",
  "name": "Example Studio",
  "url": "https://example.com/",
  "logo": "https://example.com/logo.png",
  "sameAs": ["https://www.linkedin.com/company/example-studio"]
}</code></pre>

<p><strong>Best for:</strong> agencies, companies, nonprofits, institutions, and brands with a distinct identity.</p>

<h2>2. Person: establish a creator or professional identity</h2>

<p>Use <a href="https://schema.org/Person">Person</a> when a page is primarily about an individual: a portfolio, author profile, speaker page, or personal site. Useful properties include <code>name</code>, <code>url</code>, <code>jobTitle</code>, <code>worksFor</code>, and <code>sameAs</code>. Only link profiles that genuinely represent the person.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://example.com/#person",
  "name": "Alex Rivera",
  "url": "https://example.com/",
  "jobTitle": "UX Engineer",
  "sameAs": ["https://www.linkedin.com/in/alex-rivera"]
}</code></pre>

<p><strong>Best for:</strong> portfolios, consultants, creators, authors, and public professional profiles.</p>

<h2>3. WebSite: describe the site as a whole</h2>

<p><a href="https://schema.org/WebSite">WebSite</a> represents the entire website rather than an individual page. It is commonly paired with Organization or Person and identified from the homepage. Do not use it as a substitute for describing the actual content on every URL.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://example.com/#website",
  "url": "https://example.com/",
  "name": "Example Studio",
  "publisher": { "@id": "https://example.com/#organization" },
  "inLanguage": ["en", "es"]
}</code></pre>

<p><strong>Best for:</strong> declaring the site name, publisher, language, and relationship to the main entity.</p>

<h2>4. Article and BlogPosting: identify editorial content</h2>

<p>Use <a href="https://schema.org/Article">Article</a>, <a href="https://schema.org/BlogPosting">BlogPosting</a>, or NewsArticle when the page is an editorial work. The markup should match the visible headline, author, dates, and image. Google documents additional recommendations for <a href="https://developers.google.com/search/docs/appearance/structured-data/article">article structured data</a>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "JSON-LD Examples: 12 Practical Use Cases",
  "datePublished": "2026-09-01",
  "dateModified": "2026-09-01",
  "author": { "@id": "https://example.com/#person" },
  "image": "https://example.com/images/json-ld-guide.jpg",
  "mainEntityOfPage": "https://example.com/json-ld-examples"
}</code></pre>

<p><strong>Best for:</strong> blog posts, reports, news, tutorials, and long-form editorial pages.</p>

<h2>5. BreadcrumbList: make the page hierarchy explicit</h2>

<p><a href="https://schema.org/BreadcrumbList">BreadcrumbList</a> describes a page's position inside a hierarchy. The items should correspond to a real, logical navigation path—not a list invented solely for markup. Google maintains specific <a href="https://developers.google.com/search/docs/appearance/structured-data/breadcrumb">breadcrumb guidelines</a>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Blog", "item": "https://example.com/blog" },
    { "@type": "ListItem", "position": 2, "name": "Technical SEO", "item": "https://example.com/blog/technical-seo" },
    { "@type": "ListItem", "position": 3, "name": "JSON-LD Examples" }
  ]
}</code></pre>

<p><strong>Best for:</strong> ecommerce, documentation, publications, and sites with meaningful categories.</p>

<h2>6. Product: describe something that can be purchased</h2>

<p>Use <a href="https://schema.org/Product">Product</a> for a specific product or product variant. Price, availability, ratings, and reviews must reflect information users can see on the page. Google's <a href="https://developers.google.com/search/docs/appearance/structured-data/product">product documentation</a> separates merchant listings from product snippets and defines the supported requirements.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Field Notebook",
  "image": "https://example.com/notebook.jpg",
  "sku": "FN-01",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "24.00",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/products/field-notebook"
  }
}</code></pre>

<p><strong>Best for:</strong> physical goods, product variants, and purchasable digital products. It is not appropriate for a generic services page.</p>

<h2>7. SoftwareApplication: explain an app or software product</h2>

<p><a href="https://schema.org/SoftwareApplication">SoftwareApplication</a> can describe a mobile app, web application, desktop product, or other software. Use a more specific subtype such as MobileApplication or WebApplication when it accurately fits.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Focus Timer",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
}</code></pre>

<p><strong>Best for:</strong> product landing pages for apps, SaaS tools, browser applications, and downloadable software.</p>

<h2>8. Event: publish a real event with a time and place</h2>

<p>Use <a href="https://schema.org/Event">Event</a> for something that happens at a defined time: a conference, webinar, workshop, performance, or community event. Status and attendance mode are important when an event is postponed, cancelled, online, or hybrid. Follow Google's current <a href="https://developers.google.com/search/docs/appearance/structured-data/event">event guidelines</a>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Structured Data Workshop",
  "startDate": "2026-10-15T18:00:00+02:00",
  "endDate": "2026-10-15T20:00:00+02:00",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": { "@type": "VirtualLocation", "url": "https://example.com/workshop" }
}</code></pre>

<p><strong>Best for:</strong> individual event pages, not category pages containing an undifferentiated calendar.</p>

<h2>9. VideoObject: provide the facts around a watchable video</h2>

<p><a href="https://schema.org/VideoObject">VideoObject</a> helps describe a video embedded on a page. The thumbnail, upload date, duration, description, and video URL should be accurate and accessible. Google's <a href="https://developers.google.com/search/docs/appearance/structured-data/video">video documentation</a> explains supported properties and indexing requirements.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How JSON-LD Connects Website Entities",
  "description": "A visual explanation of a connected Schema.org graph.",
  "thumbnailUrl": "https://example.com/video-thumbnail.jpg",
  "uploadDate": "2026-09-01",
  "duration": "PT6M20S",
  "contentUrl": "https://example.com/videos/json-ld.mp4"
}</code></pre>

<p><strong>Best for:</strong> pages where the video is a primary, watchable part of the content.</p>

<h2>10. JobPosting: structure a genuine open role</h2>

<p>Use <a href="https://schema.org/JobPosting">JobPosting</a> for a single, currently open position. The description, employer, location, employment type, publication date, and expiry should agree with the visible listing. Never leave expired roles marked as open. Google's <a href="https://developers.google.com/search/docs/appearance/structured-data/job-posting">job posting policies</a> are particularly strict because the markup represents a real opportunity.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Senior UX Engineer",
  "datePosted": "2026-09-01",
  "validThrough": "2026-10-01T23:59:59+02:00",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@id": "https://example.com/#organization" },
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": { "@type": "Country", "name": "Spain" }
}</code></pre>

<p><strong>Best for:</strong> a dedicated page for one active vacancy.</p>

<h2>11. LocalBusiness: connect a business to a physical location</h2>

<p><a href="https://schema.org/LocalBusiness">LocalBusiness</a> is an Organization subtype for a business with a customer-facing physical presence. Choose the most specific subtype that truthfully applies. Address, telephone, opening hours, and geographic information should match the page and other authoritative listings.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Example Research Studio",
  "url": "https://example.com/",
  "telephone": "+34 900 000 000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Example Street 10",
    "addressLocality": "Barcelona",
    "postalCode": "08001",
    "addressCountry": "ES"
  }
}</code></pre>

<p><strong>Best for:</strong> shops, restaurants, clinics, studios, and local professional services. Remote-only businesses should normally use Organization instead.</p>

<h2>12. CreativeWork: model portfolios and case studies honestly</h2>

<p><a href="https://schema.org/CreativeWork">CreativeWork</a> is useful when a page presents a project, design, report, dataset, or other creative output. Schema.org does not currently define a CaseStudy type, so inventing one produces invalid vocabulary. A portfolio case study can instead be an Article or BlogPosting whose <code>about</code> property references a CreativeWork.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Redesigning a Travel Planning Experience",
  "author": { "@id": "https://example.com/#person" },
  "about": {
    "@type": "CreativeWork",
    "name": "Travel Planning Redesign",
    "creator": { "@id": "https://example.com/#person" },
    "keywords": ["UX research", "product design", "travel"]
  }
}</code></pre>

<p><strong>Best for:</strong> portfolios, design projects, research outputs, and project case studies. I cover the model in more detail in <a href="/blog/json-ld-for-case-studies-specific-schema-for-ux-portfolios">JSON-LD for UX case studies</a>.</p>

<h2>How to combine multiple JSON-LD types</h2>

<p>A page often needs several connected objects. An article can belong to a website, name a person as its author, reference an organization as publisher, and include breadcrumbs. Instead of duplicating each entity, use stable <code>@id</code> values and connect the objects inside an <code>@graph</code>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://example.com/#person",
      "name": "Alex Rivera"
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "author": { "@id": "https://example.com/#person" }
    },
    {
      "@type": "BlogPosting",
      "@id": "https://example.com/json-ld-examples/#article",
      "headline": "JSON-LD Examples and Use Cases",
      "author": { "@id": "https://example.com/#person" },
      "isPartOf": { "@id": "https://example.com/#website" }
    }
  ]
}</code></pre>

<p>The graph is not better merely because it is larger. Add an entity when it clarifies a real relationship or supports the page's purpose.</p>

<h2>How to choose the right schema type</h2>

<ol>
  <li><p><strong>Start with the page's main thing.</strong> Is it an article, product, event, person, job, or application?</p></li>
  <li><p><strong>Use the most specific valid subtype.</strong> BlogPosting is more precise than CreativeWork for a blog post, but only when it remains accurate.</p></li>
  <li><p><strong>Check visible-content parity.</strong> A property should not claim a price, rating, author, or availability the user cannot verify on the page.</p></li>
  <li><p><strong>Check Google's documentation separately.</strong> Schema.org validity and Google feature eligibility answer different questions.</p></li>
  <li><p><strong>Prefer stable entity identifiers.</strong> Reuse canonical <code>@id</code> values for the same person, organization, and website.</p></li>
</ol>

<h2>Common JSON-LD mistakes</h2>

<ul>
  <li><p><strong>Inventing schema types.</strong> If a type is absent from Schema.org, using the name does not make it valid.</p></li>
  <li><p><strong>Adding invisible claims.</strong> Markup must not present ratings, prices, jobs, or events that the page does not show.</p></li>
  <li><p><strong>Using the wrong entity.</strong> Product is not a generic label for a service, and LocalBusiness is not appropriate for every company.</p></li>
  <li><p><strong>Duplicating contradictory objects.</strong> Plugins, themes, and custom scripts can each output competing schema.</p></li>
  <li><p><strong>Leaving stale facts.</strong> Expired jobs, past events, old prices, and changed availability make structured data unreliable.</p></li>
  <li><p><strong>Expecting schema to repair weak content.</strong> Markup describes a page; it does not create authority, relevance, or usefulness.</p></li>
</ul>

<h2>How to validate JSON-LD before publishing</h2>

<ol>
  <li><p>Validate vocabulary and graph structure with the <a href="https://validator.schema.org/">Schema.org Validator</a>.</p></li>
  <li><p>Test Google-supported features with the <a href="https://search.google.com/test/rich-results">Rich Results Test</a>.</p></li>
  <li><p>Compare every important property against the visible page.</p></li>
  <li><p>Inspect the deployed URL, not only a CMS preview.</p></li>
  <li><p>Monitor Search Console for detected structured-data issues.</p></li>
</ol>

<p>If you implement JSON-LD through a CMS, escape dynamic values as JSON and test several records—not only the cleanest example. Quotes, missing images, optional fields, translations, and empty values are where templates usually break. For a concrete implementation workflow, see <a href="/blog/structural-seo-json-ld-framer">structural SEO and JSON-LD in Framer</a>.</p>

<h2>The practical rule</h2>

<p>Use JSON-LD to express what a thoughtful reader can already learn from the page. Choose the main entity, describe it with the narrowest accurate type, connect related entities with stable identifiers, and stop before the graph becomes speculative. The best structured data is not the most elaborate. It is the easiest to verify and maintain.</p>
