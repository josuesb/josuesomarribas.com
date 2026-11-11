import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
async function stylesheets(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry => entry.isDirectory() ? stylesheets(new URL(`${entry.name}/`, directory)) : entry.name.endsWith(".css") ? [new URL(entry.name, directory)] : []))).flat();
}

test("all application text sizes use the shared typography system", async () => {
  for (const file of [...await stylesheets(new URL("app/", root)), ...await stylesheets(new URL("components/", root))]) {
    if (file.pathname.endsWith("/ui/typography.css")) continue;
    const css = (await readFile(file, "utf8")).replace(/\/\*[\s\S]*?\*\//g, "");
    for (const [, property, value] of css.matchAll(/(?:^|[;{])\s*(font-size|font)\s*:\s*([^;{}]+)/g)) {
      if (/^(inherit|initial|unset|revert|0)$/.test(value.trim())) continue;
      assert.match(value, /var\(--(?:type-|font-size-)/, `${file.pathname}: ${property}: ${value}`);
      assert.doesNotMatch(value, /(?:\d|\.\d)(?:px|rem|em|vw)\b/, `${file.pathname}: component-defined size: ${value}`);
    }
  }
});

test("typography scales with reader preferences and caps page titles responsively", async () => {
  const css = await readFile(new URL("components/ui/typography.css", root), "utf8");
  const definitions = [...css.matchAll(/--font-size-(\d+):\s*([\d.]+)rem/g)];
  assert.deepEqual(definitions.map(match => Number(match[1])), [12, 14, 16, 20, 24, 32, 40, 48]);
  for (const [, pixels, rem] of definitions) assert.equal(Number(rem) * 16, Number(pixels));
  assert.match(css, /--type-title:\s*var\(--font-size-48\)/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*--type-title:\s*var\(--font-size-40\)/);
  const global = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(global, /@import "\.\.\/components\/ui\/typography\.css"/);
  assert.doesNotMatch(global, /html\s*\{[^}]*font-size:\s*\d+(?:px|rem)/);
});
