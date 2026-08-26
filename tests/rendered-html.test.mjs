import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["../dist/client/index.html", /Josue Somarribas/],
  ["../dist/client/es.html", /Ingeniero UX/],
  ["../dist/client/writing.html", /Writing/],
  ["../dist/client/es/writing.html", /Artículos/],
];

test("exports every public route as static HTML", async () => {
  for (const [path, expectedContent] of routes) {
    const html = await readFile(new URL(path, import.meta.url), "utf8");
    assert.match(html, /^<!doctype html>/i, path);
    assert.match(html, expectedContent, path);
  }
});

test("configures Vercel to serve only the static client output", async () => {
  const config = JSON.parse(
    await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  );

  assert.equal(config.framework, null);
  assert.equal(config.outputDirectory, "dist/client");
  assert.equal(config.cleanUrls, true);
});
