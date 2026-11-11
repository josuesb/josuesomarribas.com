import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {convertHtmlToPortableText} from '../scripts/lib/portable-text.mjs';
import {portableTextToHtml} from '../scripts/lib/portable-text-html.mjs';

for (const locale of ['en','es']) {
  test(`illustrated ${locale} article survives the CMS body round trip`, async () => {
    const source = await readFile(new URL(`../content/articles/jira-tools-copy-organize-open-tickets/${locale}.md`, import.meta.url), 'utf8');
    const html = source.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)[1];
    const body = convertHtmlToPortableText(html);
    const original = new JSDOM(html).window.document;
    const restored = new JSDOM(portableTextToHtml(body)).window.document;
    const textBlocks = document => [...document.body.children].map(element => element.textContent.replace(/\s+/g,' ').trim());
    assert.deepEqual(textBlocks(restored), textBlocks(original));
    for (const selector of ['a','figure img','figcaption','h2','pre code']) {
      const before = [...original.querySelectorAll(selector)];
      const after = [...restored.querySelectorAll(selector)];
      assert.equal(after.length, before.length, selector);
      if (selector === 'figure img') {
        assert.equal(after.length,4);
        assert.deepEqual(after.map(img => [img.getAttribute('src'),img.alt]), before.map(img => [img.getAttribute('src'),img.alt]));
      }
      if (selector === 'a') assert.deepEqual(after.map(link => link.getAttribute('href')), before.map(link => link.getAttribute('href')));
    }
  });
}
