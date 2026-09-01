import {getCliClient} from "sanity/cli";
import {JSDOM} from "jsdom";
import {convertHtmlToPortableText, portableTextPlainText} from "./lib/portable-text.mjs";

const commit = process.argv.includes("--commit");
const client = getCliClient({apiVersion: "2025-08-15"}).withConfig({perspective: "raw"});
const articles = await client.fetch(`*[_type == "article" && defined(bodyHtml.code)]{_id, title, bodyHtml}`);
const converted = articles.map(article => {
  const body = convertHtmlToPortableText(article.bodyHtml.code);
  const sourceText = new JSDOM(article.bodyHtml.code).window.document.body.textContent.replace(/\s+/g, " ").trim();
  const convertedText = portableTextPlainText(body);
  return {...article, body, sourceCharacters: sourceText.length, convertedCharacters: convertedText.length};
});

const suspicious = converted.filter(article => article.sourceCharacters && article.convertedCharacters / article.sourceCharacters < 0.9);
console.log(`Converted ${converted.length} Sanity documents; ${suspicious.length} retain less than 90% of source text in text blocks.`);
for (const article of suspicious.slice(0, 20)) console.log(`${article._id}: ${article.convertedCharacters}/${article.sourceCharacters}`);

if (!commit) {
  console.log("Dry run only. Pass --commit to patch the Portable Text body fields.");
  process.exit(0);
}

for (let index = 0; index < converted.length; index += 50) {
  const transaction = client.transaction();
  for (const article of converted.slice(index, index + 50)) transaction.patch(article._id, patch => patch.set({body: article.body}));
  await transaction.commit({visibility: "async"});
  console.log(`Patched ${Math.min(index + 50, converted.length)}/${converted.length}`);
}
