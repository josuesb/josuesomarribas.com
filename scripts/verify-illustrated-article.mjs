import {getCliClient} from 'sanity/cli';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {portableTextToHtml} from './lib/portable-text-html.mjs';
import {JSDOM} from 'jsdom';

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) throw new Error('Provide one article slug.');
const client = getCliClient({apiVersion:'2026-09-01'}).withConfig({perspective:'published',useCdn:false});
const result = await client.fetch(`{
  "now":now(),
  "total":count(*[_type == "article"]),
  "visibleByDate":count(*[_type == "article" && publicationDate <= now()]),
  "articles":*[_type == "article" && slug.current == $slug]{_id,locale,title,publicationDate,"cover":mainImage.asset->url,body[]{...,_type == "image" => {...,"url":asset->url}}}
}`,{slug});
assert.equal(result.articles.length,2);
for (const article of result.articles) {
  const source = await readFile(`content/articles/${slug}/${article.locale}.md`,'utf8');
  const original = new JSDOM(source.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)[1]).window.document;
  const restored = new JSDOM(portableTextToHtml(article.body)).window.document;
  const text = doc => [...doc.body.children].map(el => el.textContent.replace(/\s+/g,' ').trim());
  assert.deepEqual(text(restored),text(original));
  assert.equal(restored.querySelectorAll('figure').length,4);
  assert.equal(restored.querySelectorAll('figure img[alt]').length,4);
  const urls = [article.cover,...[...restored.querySelectorAll('img')].map(img=>img.src)];
  assert.ok(urls.every(url=>url.startsWith('https://cdn.sanity.io/')));
  const checks = await Promise.all(urls.map(async url => {
    const response=await fetch(url,{method:'HEAD'});
    assert.ok(response.ok,`Image unavailable: ${response.status}`);
    return response.status;
  }));
  console.log(`${article.locale}: published body matches source; ${checks.length} CMS images respond successfully.`);
}
console.log(JSON.stringify({cmsTime:result.now,total:result.total,visibleByDate:result.visibleByDate,publicationDates:result.articles.map(article=>({locale:article.locale,date:article.publicationDate}))},null,2));

// Use the CLI session for a local CMS build without persisting its credential.
if (process.argv.includes('--sync')) {
  const token = client.config().token;
  if (!token) throw new Error('Authenticated sync requires --with-user-token.');
  process.env.SANITY_API_READ_TOKEN = token;
  await import('./sync-sanity-content.mjs');
}
