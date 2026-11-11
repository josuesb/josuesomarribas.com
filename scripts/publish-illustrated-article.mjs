import {createReadStream} from 'node:fs';
import {readFile, access} from 'node:fs/promises';
import path from 'node:path';
import {getCliClient} from 'sanity/cli';
import {convertHtmlToPortableText} from './lib/portable-text.mjs';

const args = process.argv.slice(2);
const commit = args.includes('--commit');
const slug = args.find(value => !value.startsWith('--'));
if (!slug || !/^[a-z0-9-]+$/.test(slug)) throw new Error('Provide one article slug and optionally --commit or --inspect.');
const client = getCliClient({apiVersion:'2026-09-01'}).withConfig({perspective:'raw', useCdn:false});
const existing = await client.fetch('*[_type == "article" && slug.current == $slug]{_id, _rev, locale, title}', {slug});
const topics = await client.fetch('*[_type == "topic"]{_id, "slug":slug.current}');
const locales = await client.fetch('array::unique(*[_type == "article" && defined(locale)].locale)');
console.log(JSON.stringify({locales, existing, topics}, null, 2));
if (args.includes('--inspect')) process.exit(0);

const publicRoot = path.resolve('public');
function publicFile(src) {
  if (!src?.startsWith('/') || src.startsWith('//')) throw new Error(`Expected a local media path: ${src}`);
  const file = path.resolve(publicRoot, `.${src}`);
  if (!file.startsWith(`${publicRoot}${path.sep}`)) throw new Error(`Invalid media path: ${src}`);
  return file;
}
const articles = [];
for (const locale of ['en', 'es']) {
  const source = await readFile(`content/articles/${slug}/${locale}.md`, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Invalid article ${locale}`);
  const meta = Object.fromEntries(match[1].split('\n').filter(Boolean).map(line => {
    const at = line.indexOf(':'); return [line.slice(0, at), JSON.parse(line.slice(at + 1).trim())];
  }));
  if (meta.draft || !Number.isFinite(Date.parse(meta.date)) || Date.parse(meta.date) > Date.now()) throw new Error(`Article not ready: ${locale}`);
  if (meta.slug !== slug || meta.locale !== locale) throw new Error(`Metadata mismatch: ${locale}`);
  if (!meta.title || !meta.description || meta.description.length > 320) throw new Error(`Missing or invalid title/summary: ${locale}`);
  const id = `article.${slug}.${locale}`;
  // This publisher creates new articles only; it never overwrites existing editorial work.
  if (existing.some(doc => doc.locale === locale)) throw new Error(`Article already exists in CMS: ${locale}`);
  const topic = topics.find(value => value.slug === meta.cluster);
  if (!topic) throw new Error(`Missing topic: ${meta.cluster}`);
  const body = convertHtmlToPortableText(match[2].trim());
  const figures = body.filter(block => block._type === 'editorialFigure');
  if (!figures.length || figures.some(figure => !figure.alt || !figure.caption)) throw new Error(`Images need alt text and captions: ${locale}`);
  if (body.some(block => ['externalImage','rawHtml'].includes(block._type))) throw new Error(`Unsupported body block: ${locale}`);
  for (const src of [meta.image, ...figures.map(figure => figure.src)]) await access(publicFile(src));
  articles.push({meta, body, id, topic});
  console.log(`Ready ${locale}: ${body.length} blocks, ${figures.length} figures + cover.`);
}
if (!commit) { console.log('Dry run complete. Use --commit to upload images and publish both translations.'); process.exit(0); }

const uploaded = new Map();
async function upload(src) {
  if (uploaded.has(src)) return uploaded.get(src);
  const asset = await client.assets.upload('image', createReadStream(publicFile(src)), {filename:path.basename(src), source:{id:src, name:'Jira Tools article media'}});
  uploaded.set(src, asset);
  console.log(`Uploaded ${path.basename(src)} (${asset.metadata.dimensions.width}×${asset.metadata.dimensions.height})`);
  return asset;
}
const transaction = client.transaction();
for (const {meta, body, id, topic} of articles) {
  const cover = await upload(meta.image);
  const managedBody = [];
  for (const block of body) {
    if (block._type !== 'editorialFigure') { managedBody.push(block); continue; }
    const asset = await upload(block.src);
    managedBody.push({_key:block._key, _type:'image', asset:{_type:'reference', _ref:asset._id}, alt:block.alt, caption:block.caption});
  }
  transaction.create({
    _id:id, _type:'article', title:meta.title, slug:{_type:'slug',current:slug}, locale:meta.locale, translationKey:slug,
    description:meta.description, body:managedBody, publicationDate:meta.date, contentType:meta.type,
    topic:{_type:'reference',_ref:topic._id}, tags:meta.tags, featured:meta.featured,
    mainImage:{_type:'image',asset:{_type:'reference',_ref:cover._id},alt:meta.imageAlt},
    imagePath:meta.image, sourceImagePath:meta.sourceImage, imageAlt:meta.imageAlt,
    audioPath:'',
  });
}
await transaction.commit({visibility:'sync'});
const result = await client.fetch('*[_type == "article" && slug.current == $slug]{_id, locale, title, translationKey, "cover":mainImage.asset->url, "figures":count(body[_type == "image"])}', {slug});
if (result.length !== 2 || result.some(doc => !doc.cover || doc.figures !== 4)) throw new Error('Published article verification failed.');
console.log(JSON.stringify({published:result}, null, 2));
