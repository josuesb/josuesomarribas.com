import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const output = (path) => new URL(`../dist/client/${path}`, import.meta.url);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("exports canonical public pages as static HTML", async () => {
  const routes = [
    ["index.html", /Josue Somarribas/, "en"],
    ["es.html", /Ingeniero UX/, "es"],
    ["about.html", /Designer by instinct/, "en"],
    ["blog.html", /Things I’m learning/, "en"],
    ["es/blog.html", /Cosas que estoy aprendiendo/, "es"],
    ["lab.html", /Useful things, built from curiosity/, "en"],
    ["es/lab.html", /Cosas útiles, construidas desde la curiosidad/, "es"],
    ["es/blog/the-cost-of-fouc-how-content-flicker-kills-test-validity.html", /El coste del FOUC/, "es"],
  ];
  for (const [path, expectedContent, language] of routes) {
    const html = await readFile(output(path), "utf8");
    assert.match(html, /^<!doctype html>/i, path);
    assert.match(html, new RegExp(`<html lang="${language}"`), path);
    assert.match(html, expectedContent, path);
  }
});

test("emits robots, sitemap and RSS into the deployed static directory", async () => {
  const [robots, sitemap, rss] = await Promise.all([
    readFile(output("robots.txt"), "utf8"),
    readFile(output("sitemap.xml"), "utf8"),
    readFile(output("rss.xml"), "utf8"),
  ]);
  assert.match(robots, /Sitemap: https:\/\/www\.josuesomarribas\.com\/sitemap\.xml/);
  for (const route of ["/about", "/now", "/es/now", "/lab", "/es/lab", "/blog", "/es/blog"]) assert.match(sitemap, new RegExp(`<loc>https://www\\.josuesomarribas\\.com${route}</loc>`));
  assert.match(sitemap, /<loc>https:\/\/www\.josuesomarribas\.com\/blog\/the-cost-of-fouc-how-content-flicker-kills-test-validity<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.josuesomarribas\.com\/es\/blog\/the-cost-of-fouc-how-content-flicker-kills-test-validity<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/writing/);
  assert.doesNotMatch(sitemap, /<lastmod>\d{3}-/);
  assert.ok(sitemap.split("\n").length > 10, "sitemap should be human-readable rather than minified");
  for (const [, lastModified] of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    assert.ok(Date.parse(lastModified) <= Date.now(), `sitemap must not publish a future lastmod: ${lastModified}`);
  }
  assert.match(rss, /<link>https:\/\/www\.josuesomarribas\.com\/blog<\/link>/);
  assert.match(rss, /<guid isPermaLink="true">https:\/\/www\.josuesomarribas\.com\/blog\//);
  assert.doesNotMatch(rss, /josuesomarribas\.com\/writing/);
});

test("publishes only genuinely translated articles under the Spanish blog", async () => {
  const files = (await readdir(output("es/blog"))).filter((file) => file.endsWith(".html"));
  const articleDirectories = await readdir(new URL("../content/articles/", import.meta.url), { withFileTypes:true });
  const translatedSlugs = [];
  for (const directory of articleDirectories.filter((entry) => entry.isDirectory())) {
    try {
      const source = await readFile(new URL(`../content/articles/${directory.name}/es.md`, import.meta.url), "utf8");
      const date = source.match(/^date:\s*"([^"]+)"$/m)?.[1];
      if (/^draft:\s*false$/m.test(source) && date && Date.parse(date) <= Date.now()) translatedSlugs.push(directory.name);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  assert.deepEqual(files.sort(), translatedSlugs.map((slug) => `${slug}.html`).sort());
  for (const file of files) {
    const html = await readFile(output(`es/blog/${file}`), "utf8");
    assert.match(html, /<html lang="es"/);
    assert.doesNotMatch(html, /available only in English/i);
  }
});

test("keeps published articles clustered and internal blog links resolvable", async () => {
  const articleDirectories = await readdir(new URL("../content/articles/", import.meta.url), { withFileTypes:true });
  const publishedSlugs = new Set();

  for (const directory of articleDirectories.filter((entry) => entry.isDirectory())) {
    try {
      const source = await readFile(new URL(`../content/articles/${directory.name}/en.md`, import.meta.url), "utf8");
      const date = source.match(/^date:\s*"([^"]+)"$/m)?.[1];
      if (!/^draft:\s*false$/m.test(source) || !date || Date.parse(date) > Date.now()) continue;
      publishedSlugs.add(directory.name);
      assert.match(source, /^cluster:\s*"[^"]+"$/m, `${directory.name} needs an editorial cluster`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  for (const slug of publishedSlugs) {
    const html = await readFile(output(`blog/${slug}.html`), "utf8");
    const linkedSlugs = [...html.matchAll(/href="\/blog\/([^"?#/]+)[^"#]*"/g)].map((match) => match[1]);
    for (const linkedSlug of linkedSlugs) {
      assert.ok(publishedSlugs.has(linkedSlug), `${slug} links to unpublished /blog/${linkedSlug}`);
    }
  }
});

test("configures Vercel static output and permanent legacy redirects", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.equal(config.framework, null);
  assert.equal(config.outputDirectory, "dist/client");
  assert.equal(config.cleanUrls, true);
  const requiredRedirects = [
    { source: "/writing", destination: "/blog", permanent: true },
    { source: "/writing/:slug", destination: "/blog/:slug", permanent: true },
    { source: "/es/writing", destination: "/es/blog", permanent: true },
    { source: "/es/writing/:slug", destination: "/es/blog/:slug", permanent: true },
    { source: "/blog/ai-mentions-without-clicks", destination: "/blog/geo-vs-seo-ai-search", permanent: true },
    { source: "/blog/how-to-track-ai-visibility", destination: "/blog/geo-vs-seo-ai-search", permanent: true },
    { source: "/blog/google-search-console-for-chatgpt", destination: "/blog/geo-vs-seo-ai-search", permanent: true },
    { source: "/blog/seo-schema-in-framer", destination: "/blog/structural-seo-json-ld-framer", permanent: true },
    { source: "/blog/llms-txt-json-ld-framer-setup", destination: "/blog/structural-seo-json-ld-framer", permanent: true },
    { source: "/blog/make-blog-posts-ai-readable", destination: "/blog/structural-seo-json-ld-framer", permanent: true },
    { source: "/blog/mutationobservers-vs-polling-a-performance-shootout-for-a-b-testing", destination: "/blog/mutationobservers-without-panic-performance-guide", permanent: true },
    { source: "/blog/how-i-add-real-audio-to-my-blog-posts-using-chatgpt-elevenlabs-and-framer", destination: "/blog/how-i-generate-natural-blog-audio-locally-for-free", permanent: true },
    { source: "/blog/elevenlabs-studio-for-developers-advanced-ssml-and-narration-hacks", destination: "/blog/how-i-generate-natural-blog-audio-locally-for-free", permanent: true },
  ];
  for (const redirect of requiredRedirects) {
    assert.ok(config.redirects.some(item => JSON.stringify(item) === JSON.stringify(redirect)), `Missing redirect ${redirect.source}`);
  }
  assert.ok(config.redirects.every(redirect => redirect.permanent === true));
  assert.ok(config.redirects.some(redirect => redirect.source === "/blog/the-geometry-behind-modern-ui-squircles-apple-and-todays-framer-update" && redirect.destination === "/blog/the-squircle-in-mobile-cro-superellipses-and-cognitive-friction"));
  assert.ok(config.redirects.some(redirect => redirect.source === "/blog/designing-for-real-world-context" && redirect.destination === "/blog/designing-for-attention-degradation-ux-for-bags-sun-glare-and-3g"));
  assert.ok(config.redirects.some(redirect => redirect.source === "/blog/digital-sous-chef-ai-design-judgment" && redirect.destination === "/blog/ai-assisted-ui-design-faster-yes-better-not-always"));
});

test("consolidates every merged article into one indexable canonical URL", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  const sitemap = await readFile(output("sitemap.xml"), "utf8");
  const blogRedirects = config.redirects.filter((redirect) => redirect.source.startsWith("/blog/"));
  for (const redirect of blogRedirects) {
    const sourceUrl = `https://www.josuesomarribas.com${redirect.source}`;
    const destinationUrl = `https://www.josuesomarribas.com${redirect.destination}`;
    assert.doesNotMatch(sitemap, new RegExp(`<loc>${escapeRegExp(sourceUrl)}</loc>`), redirect.source);
    assert.match(sitemap, new RegExp(`<loc>${escapeRegExp(destinationUrl)}</loc>`), redirect.destination);
    const html = await readFile(output(`${redirect.destination.slice(1)}.html`), "utf8");
    assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRegExp(destinationUrl)}"`), redirect.destination);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex/i, redirect.destination);
  }
});
