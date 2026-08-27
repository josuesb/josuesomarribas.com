import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const output = (path) => new URL(`../dist/client/${path}`, import.meta.url);

test("exports canonical public pages as static HTML", async () => {
  const routes = [
    ["index.html", /Josue Somarribas/, "en"],
    ["es.html", /Ingeniero UX/, "es"],
    ["about.html", /Designer by instinct/, "en"],
    ["blog.html", /Things I’m learning/, "en"],
    ["es/blog.html", /Cosas que estoy aprendiendo/, "es"],
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
  for (const route of ["/about", "/blog", "/es/blog"]) assert.match(sitemap, new RegExp(`<loc>https://www\\.josuesomarribas\\.com${route}</loc>`));
  assert.match(sitemap, /<loc>https:\/\/www\.josuesomarribas\.com\/blog\/the-cost-of-fouc-how-content-flicker-kills-test-validity<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.josuesomarribas\.com\/es\/blog\/the-cost-of-fouc-how-content-flicker-kills-test-validity<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/writing/);
  assert.doesNotMatch(sitemap, /<lastmod>\d{3}-/);
  assert.match(rss, /<link>https:\/\/www\.josuesomarribas\.com\/blog<\/link>/);
  assert.match(rss, /<guid isPermaLink="true">https:\/\/www\.josuesomarribas\.com\/blog\//);
  assert.doesNotMatch(rss, /josuesomarribas\.com\/writing/);
});

test("publishes only genuinely translated articles under the Spanish blog", async () => {
  const files = (await readdir(output("es/blog"))).filter((file) => file.endsWith(".html"));
  assert.equal(files.length, 3);
  for (const file of files) {
    const html = await readFile(output(`es/blog/${file}`), "utf8");
    assert.match(html, /<html lang="es"/);
    assert.doesNotMatch(html, /available only in English/i);
  }
});

test("configures Vercel static output and permanent legacy redirects", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.equal(config.framework, null);
  assert.equal(config.outputDirectory, "dist/client");
  assert.equal(config.cleanUrls, true);
  assert.deepEqual(config.redirects, [
    { source: "/writing", destination: "/blog", permanent: true },
    { source: "/writing/:slug", destination: "/blog/:slug", permanent: true },
    { source: "/es/writing", destination: "/es/blog", permanent: true },
    { source: "/es/writing/:slug", destination: "/es/blog/:slug", permanent: true },
  ]);
});
