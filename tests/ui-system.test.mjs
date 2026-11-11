import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { JSDOM } from "jsdom";

const output = new URL("../dist/client/", import.meta.url);
const read = async route => new JSDOM(await readFile(new URL(route, output), "utf8"));

test("every page family uses one shared header, locale switch and full site footer", async () => {
  const routes = ["index.html", "es.html", "about.html", "es/about.html", "blog.html", "es/blog.html", "now.html", "es/now.html", "lab.html", "es/lab.html", "lab/five-seconds-tester.html", "jira-tools.html", "es/jira-tools.html", "jira-tools/privacy.html", "hangover.html"];
  for (const route of routes) {
    const dom = await read(route);
    const doc = dom.window.document;
    const es = doc.documentElement.lang === "es";
    assert.equal(doc.querySelectorAll("[data-site-header]").length, 1, `${route}: one global header`);
    assert.equal(doc.querySelectorAll("[data-site-footer]").length, 1, `${route}: one site footer`);
    const header = doc.querySelector("[data-site-header]");
    assert.equal(header.parentElement.tagName, "BODY", `${route}: layout owns the header`);
    assert.equal(header.querySelector(`a[lang="${es ? "es" : "en"}"]`).getAttribute("aria-current"), "page");
    assert.ok(header.querySelector(`a[href="${es ? "/es/blog" : "/blog"}"]`));
    assert.ok(header.querySelector(`a[href="${es ? "/es/about" : "/about"}"]`));
    assert.ok(header.querySelector(`a[href="${es ? "/es/lab" : "/lab"}"]`));
    assert.ok(header.querySelector("[data-ui=button]"), `${route}: shared action component`);
    assert.equal(doc.querySelectorAll(".btn").length, 0, `${route}: no legacy button styling`);
    dom.window.close();
  }
});

test("rendered links and buttons have no decorative arrows, including CMS labels", async () => {
  async function pages(url) {
    return (await Promise.all((await readdir(url, { withFileTypes: true })).map(entry => entry.isDirectory() ? pages(new URL(`${entry.name}/`, url)) : entry.name.endsWith(".html") ? [new URL(entry.name, url)] : []))).flat();
  }
  for (const file of await pages(output)) {
    const dom = new JSDOM(await readFile(file, "utf8"));
    for (const element of dom.window.document.querySelectorAll("a,button")) {
      assert.doesNotMatch(element.textContent, /[↗↙↖↘→←↑↓]/u, `${file.pathname}: ${element.textContent.slice(0, 100)}`);
    }
    dom.window.close();
  }
});

test("the shared UI migration preserves all three home artwork scenes", async () => {
  for (const route of ["index.html", "es.html"]) {
    const dom = await read(route);
    const doc = dom.window.document;
    assert.equal(doc.querySelectorAll(".hero-flow-step").length, 4);
    assert.equal(doc.querySelectorAll(".cro-stage img").length, 7);
    assert.equal(doc.querySelectorAll(".contact-art-3d").length, 1);
    dom.window.close();
  }
});
