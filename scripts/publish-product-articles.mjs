import {readFile} from 'node:fs/promises';
import {getCliClient} from 'sanity/cli';
import {convertHtmlToPortableText} from './lib/portable-text.mjs';

// Publish only explicitly selected articles; never reimport the whole CMS.
const slugs = process.argv.slice(2).filter(value => value !== '--commit');
if (!slugs.length || slugs.some(slug => !/^[a-z0-9-]+$/.test(slug))) throw new Error('Provide article slugs and optionally --commit');
const client = getCliClient({apiVersion:'2026-09-01'}).withConfig({perspective:'raw'});
const transaction = client.transaction();
for (const slug of slugs) {
  for (const locale of ['en', 'es']) {
    const source = await readFile(new URL(`../content/articles/${slug}/${locale}.md`, import.meta.url), 'utf8');
    const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!match) throw new Error(`Invalid article: ${slug}/${locale}`);
    const article = Object.fromEntries(match[1].split('\n').filter(Boolean).map(line => {
      const separator = line.indexOf(':');
      return [line.slice(0, separator), JSON.parse(line.slice(separator + 1).trim())];
    }));
    if (article.draft || Date.parse(article.date) > Date.now()) throw new Error(`Not ready to publish: ${slug}/${locale}`);
    const id = `article.${slug}.${locale}`;
    const existing = await client.fetch('*[_type == "article" && slug.current == $slug && locale == $locale]{_id}', {slug, locale});
    if (existing.some(doc => doc._id.startsWith('drafts.'))) throw new Error(`CMS draft exists for ${slug}/${locale}; reconcile before publishing`);
    if (existing.some(doc => doc._id !== id)) throw new Error(`Unexpected CMS document ID for ${slug}/${locale}`);
    const fields = {
      title:article.title, slug:{_type:'slug', current:slug}, locale, translationKey:slug,
      description:article.description, body:convertHtmlToPortableText(match[2].trim()),
      bodyHtml:{_type:'code', language:'html', code:match[2].trim()},
      publicationDate:article.date, contentType:article.type,
      topic:{_type:'reference', _ref:`topic.${article.cluster}`}, tags:article.tags,
      featured:article.featured, imagePath:article.image, sourceImagePath:article.sourceImage,
      imageAlt:article.imageAlt, audioPath:article.audio,
    };
    transaction.createIfNotExists({_id:id, _type:'article'}).patch(id, patch => patch.set(fields));
    console.log(`${existing.length ? 'Update' : 'Create'} ${id}`);
  }
}
if (process.argv.includes('--commit')) {
  await transaction.commit({visibility:'sync'});
  console.log('Selected article translations published. Rebuild the site to generate their routes.');
} else console.log('Dry run. Add --commit to publish.');
