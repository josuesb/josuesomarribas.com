import {getCliClient} from 'sanity/cli';
const client=getCliClient({apiVersion:'2026-09-01'}).withConfig({perspective:'raw'});
const replacements=[
 ['At the time of publication, the extension is under review in Chrome Web Store.','The extension is now available in Chrome Web Store.'],
 ['While the extension is under review, the page states that installation from Chrome Web Store is not yet available.','You can now install it from Chrome Web Store via the Jira Tools page.'],
 ['En el momento de publicar este artículo está en revisión en Chrome Web Store.','La extensión ya está disponible en Chrome Web Store.'],
 ['Mientras la extensión está en revisión, allí se indica que la instalación desde Chrome Web Store todavía no está disponible.','Ya puedes instalarla desde Chrome Web Store a través de la página de Jira Tools.']
];
function update(value){if(typeof value==='string')return replacements.reduce((s,[before,after])=>s.replaceAll(before,after),value);if(Array.isArray(value))return value.map(update);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,v])=>[key,update(v)]));return value;}
const docs=await client.fetch('*[_type=="article" && slug.current=="jira-tools-copy-organize-open-tickets" && !(_id in path("drafts.**"))]{_id,_rev,locale,body,bodyHtml}');
if(docs.length!==2)throw new Error('Expected the two published Jira Tools translations');
let tx=client.transaction();let count=0;
for(const doc of docs){const fields=update({body:doc.body,bodyHtml:doc.bodyHtml});if(JSON.stringify(fields)!==JSON.stringify({body:doc.body,bodyHtml:doc.bodyHtml})){tx=tx.patch(doc._id,p=>p.ifRevisionId(doc._rev).set(fields));count++;}}
if(count)await tx.commit();console.log(`Updated ${count} published translations; preserved all existing blocks and figures.`);
