import {getCliClient} from "sanity/cli";
import fs from "node:fs";

const slugs = [
  "geo-vs-seo-ai-search",
  "complete-guide-to-ab-testing-cro-experimentation",
  "the-risk-of-ai-visual-homogenization",
];
const commit = process.env.SANITY_TRANSLATION_COMMIT === "1";
const usePreview = process.env.SANITY_TRANSLATION_USE_PREVIEW === "1";
const client = getCliClient({apiVersion: "2026-09-01"}).withConfig({perspective: "raw"});
const previewPath = "work/sanity-translations-preview.json";
const spanishEditorial = {
  "complete-guide-to-ab-testing-cro-experimentation": {
    title: "Test A/B y CRO: guía práctica completa",
    description: "Una guía práctica sobre estrategia de experimentación, estadística, investigación, QA, analítica, plataformas y optimización ética.",
  },
  "geo-vs-seo-ai-search": {
    title: "GEO vs. SEO: qué cambia cuando buscamos con IA",
    description: "Una guía práctica sobre SEO y búsqueda con IA: estructura, citas sin clic, seguimiento de prompts, analítica y métricas de visibilidad.",
  },
  "the-risk-of-ai-visual-homogenization": {
    title: "El riesgo de la homogeneización visual con IA",
    description: "Cómo usar IA en diseño sin perder criterio, autonomía creativa, accesibilidad ni diferenciación de marca.",
  },
};

function naturalizeSpanish(value) {
  return value
    .replaceAll("pruebas A/B", "tests A/B")
    .replaceAll("Pruebas A/B", "Tests A/B")
    .replaceAll("control de calidad", "QA")
    .replaceAll("Control de calidad", "QA")
    .replaceAll("barreras de seguridad", "métricas guardrail")
    .replaceAll("Barreras de seguridad", "Métricas guardrail")
    .replaceAll("barandilla", "métrica guardrail")
    .replaceAll("tablero", "dashboard")
    .replaceAll("Optimización Generativa del Motor", "optimización para motores generativos")
    .replaceAll("seguimiento rápido", "seguimiento de prompts")
    .replaceAll("una sudadera con capucha de experimentación", "un disfraz de experimentación")
    .replaceAll("Una persona experimentada madura", "Un profesional con experiencia")
    .replaceAll("miradas furtivas", "revisión continua de resultados")
    .replaceAll("el vistazo", "la revisión continua de resultados")
    .replaceAll("un segundo chef", "un ayudante de cocina")
    .replaceAll("segundo chef", "ayudante de cocina")
    .replaceAll("parte interesada", "stakeholder")
    .replaceAll("costo", "coste")
    .replaceAll("costos", "costes")
    .replaceAll("El Internet promedio tiene una mirada.", "Internet tiene una estética promedio reconocible.")
    .replaceAll("no está al tanto. Son decoración.", "no participa de verdad: está de adorno.");
}

async function translateOne(value) {
  const body = new URLSearchParams({client: "gtx", sl: "en", tl: "es", dt: "t", q: value});
  const response = await fetch("https://translate.googleapis.com/translate_a/single", {method: "POST", headers: {"content-type": "application/x-www-form-urlencoded"}, body});
  if (!response.ok) throw new Error(`Translation service returned ${response.status}: ${await response.text()}`);
  const result = await response.json();
  const translated = result?.[0]?.map(part => part?.[0] ?? "").join("");
  if (!translated?.trim()) throw new Error(`Translation service returned an empty fragment for: ${value.slice(0, 80)}`);
  return translated;
}

async function translate(strings, title) {
  const translated = [];
  for (let offset = 0; offset < strings.length; offset += 8) {
    const batch = strings.slice(offset, offset + 8);
    translated.push(...(await Promise.all(batch.map(translateOne))).map(naturalizeSpanish));
    console.log(`  ${Math.min(offset + batch.length, strings.length)}/${strings.length} fragments`);
  }
  if (translated.length !== strings.length) throw new Error(`Translation count mismatch for ${title}.`);
  return translated;
}

function collectStrings(article) {
  const targets = [
    {owner: article, key: "title"},
    {owner: article, key: "description"},
  ];
  if (article.imageAlt) targets.push({owner: article, key: "imageAlt"});
  if (article.mainImage?.alt) targets.push({owner: article.mainImage, key: "alt"});
  for (const item of article.body ?? []) {
    if (item._type === "block") {
      for (const child of item.children ?? []) if (child._type === "span" && child.text?.trim() && !child.marks?.includes("code")) targets.push({owner: child, key: "text"});
    } else if (item._type === "image" || item._type === "externalImage" || item._type === "editorialFigure") {
      if (item.alt) targets.push({owner: item, key: "alt"});
      if (item.caption) targets.push({owner: item, key: "caption"});
    }
  }
  return targets;
}

const articles = await client.fetch(`*[_type == "article" && locale == "en" && slug.current in $slugs]{
  ..., topic->{_id}
}`, {slugs});
if (articles.length !== slugs.length) throw new Error(`Expected ${slugs.length} source articles, found ${articles.length}.`);
const preview = usePreview && fs.existsSync(previewPath) ? JSON.parse(fs.readFileSync(previewPath, "utf8")) : [];

const translated = [];
for (const source of articles) {
  const cached = preview.find(article => article._id === `article.${source.slug.current}.es`);
  if (cached) {
    const targets = collectStrings(cached);
    targets.forEach(({owner, key}) => { owner[key] = naturalizeSpanish(owner[key]); });
    Object.assign(cached, spanishEditorial[source.slug.current]);
    delete cached.audioFile;
    cached.audioPath = "";
    translated.push(cached);
    console.log(`Using reviewed preview for ${source.slug.current}.`);
    continue;
  }
  const article = structuredClone(source);
  const targets = collectStrings(article);
  console.log(`Translating ${article.slug.current}: ${targets.length} text fragments...`);
  const values = await translate(targets.map(({owner, key}) => owner[key]), article.title);
  targets.forEach(({owner, key}, index) => { owner[key] = values[index]; });
  Object.assign(article, spanishEditorial[article.slug.current]);
  const document = structuredClone(article);
  delete document._rev;
  delete document._createdAt;
  delete document._updatedAt;
  document._id = `article.${article.slug.current}.es`;
  document.locale = "es";
  document.translationKey = article.translationKey || article.slug.current;
  document.topic = article.topic?._id ? {_type: "reference", _ref: article.topic._id} : article.topic;
  document.bodyHtml = undefined;
  document.audioFile = undefined;
  document.audioPath = "";
  translated.push(document);
}

for (const article of translated) console.log(`${article._id}: ${article.title}`);
fs.mkdirSync("work", {recursive: true});
fs.writeFileSync(previewPath, `${JSON.stringify(translated, null, 2)}\n`);
console.log(`Wrote ${previewPath} for editorial QA.`);
if (!commit) {
  console.log("Dry run only. Set SANITY_TRANSLATION_COMMIT=1 to publish this selected batch.");
  process.exit(0);
}

const transaction = client.transaction();
for (const article of translated) transaction.createOrReplace(article);
await transaction.commit({visibility: "sync"});
console.log(`Published ${translated.length} Spanish translations in one transaction.`);
