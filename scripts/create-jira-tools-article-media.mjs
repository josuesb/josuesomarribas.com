import sharp from 'sharp';
import {mkdir, writeFile} from 'node:fs/promises';

const output = 'public/assets/articles/jira-tools';
await mkdir(output, {recursive:true});
const copy = {
  es: {label:'NOTAS DE PRODUCTO / 01', title:['Del ticket al','siguiente paso.'], subtitle:'Una extensión para conservar el contexto.', input:'TICKET EN JIRA', ticket:'Mejorar la navegación', ticket2:'del formulario', copy:'COPIAR CON CONTEXTO', status:'Estado: En curso', assignee:'Responsable: Ana García', tray:'PREPARAR ACTUALIZACIÓN', progress:'En curso (1)', done:'Hecho (1)', bottom:'Plantillas · Bandeja · Spotlight · Historial local'},
  en: {label:'PRODUCT NOTES / 01', title:['From ticket to','the next step.'], subtitle:'A browser extension that keeps the context.', input:'TICKET IN JIRA', ticket:'Improve form', ticket2:'navigation', copy:'COPY WITH CONTEXT', status:'Status: In progress', assignee:'Assignee: Ana García', tray:'PREPARE AN UPDATE', progress:'In progress (1)', done:'Done (1)', bottom:'Templates · Tray · Spotlight · Local history'},
};
for (const [locale,t] of Object.entries(copy)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="788" viewBox="0 0 1400 788">
  <defs>
    <radialGradient id="glow"><stop stop-color="#ff523b" stop-opacity=".12"/><stop offset="1" stop-color="#ff523b" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#f4f3ef" stroke-opacity=".025"/></pattern>
    <linearGradient id="panel" x2="1" y2="1"><stop stop-color="#22221f"/><stop offset="1" stop-color="#181817"/></linearGradient>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M1 1L6 4L1 7" fill="none" stroke="#ff806c" stroke-width="1.5"/></marker>
  </defs>
  <rect width="1400" height="788" fill="#10100f"/><rect width="1400" height="788" fill="url(#grid)"/>
  <ellipse cx="1100" cy="450" rx="600" ry="450" fill="url(#glow)"/>
  <g font-family="Arial,Helvetica,sans-serif" fill="#f4f3ef">
    <circle cx="92" cy="85" r="28" fill="#222220"/><path d="M97 61L77 88h13l-4 22 22-30H94z" fill="#ffd337"/>
    <text x="137" y="96" font-size="33" font-weight="700" letter-spacing="-1">Jira Tools</text>
    <text x="66" y="220" fill="#ff806c" font-size="13" letter-spacing="2.4">${t.label}</text>
    <text x="62" y="320" font-size="65" font-weight="700" letter-spacing="-3">${t.title[0]}</text>
    <text x="62" y="395" font-size="65" font-weight="700" letter-spacing="-3" fill="#ff806c">${t.title[1]}</text>
    <text x="66" y="452" fill="#b0b0aa" font-size="21">${t.subtitle}</text>
    <path d="M66 508h460" stroke="#393936"/>
    <g transform="translate(66 544)"><rect width="96" height="40" rx="6" fill="#222220" stroke="#494943"/><text x="16" y="27" font-family="monospace" font-size="21">ID-123</text><path d="M120 20h54" stroke="#ff806c" stroke-width="2" marker-end="url(#arrow)"/><text x="196" y="27" font-size="16" fill="#b0b0aa">${locale==='es'?'Una referencia útil.':'A useful reference.'}</text></g>
    <text x="66" y="720" fill="#b0b0aa" font-size="16">${t.bottom}</text>
    <rect x="687" y="174" width="302" height="206" rx="14" fill="url(#panel)" stroke="#55504a"/>
    <text x="715" y="211" fill="#b0b0aa" font-size="11" letter-spacing="1.5">${t.input}</text>
    <text x="715" y="260" fill="#79b9f6" font-size="23" font-family="monospace" font-weight="700">ID-123</text>
    <text x="715" y="302" font-size="22" font-weight="700">${t.ticket}</text><text x="715" y="331" font-size="22" font-weight="700">${t.ticket2}</text>
    <path d="M990 278h52V178h29" stroke="#ff806c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
    <rect x="1083" y="93" width="255" height="210" rx="14" fill="#181817" stroke="#49433e"/>
    <text x="1104" y="128" font-size="10" letter-spacing="1" fill="#ff806c">${t.copy}</text>
    <text x="1104" y="175" fill="#79b9f6" font-size="21" font-family="monospace" text-decoration="underline">ID-123</text>
    <path d="M1104 195h182" stroke="#f4f3ef" stroke-width="4" stroke-linecap="round" opacity=".75"/>
    <text x="1104" y="237" fill="#b0b0aa" font-size="14">${t.status}</text><text x="1104" y="264" fill="#b0b0aa" font-size="14">${t.assignee}</text>
    <path d="M838 382v65h54" stroke="#ff806c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
    <rect x="906" y="386" width="432" height="260" rx="14" fill="url(#panel)" stroke="#49433e"/>
    <text x="933" y="424" font-size="11" letter-spacing="1.5" fill="#ff806c">${t.tray}</text>
    <text x="933" y="474" font-size="23" font-weight="700">${t.progress}</text><text x="950" y="511" font-family="monospace" font-size="19" fill="#79b9f6">ID-123</text><path d="M1050 505h191" stroke="#b0b0aa" stroke-width="4" stroke-linecap="round" opacity=".55"/>
    <path d="M933 535h377" stroke="#393936"/>
    <text x="933" y="576" font-size="23" font-weight="700">${t.done}</text><text x="950" y="613" font-family="monospace" font-size="19" fill="#79b9f6">ID-124</text><path d="M1050 607h155" stroke="#b0b0aa" stroke-width="4" stroke-linecap="round" opacity=".55"/>
    <text x="1337" y="720" text-anchor="end" fill="#77776e" font-size="12">josuesomarribas.com</text>
  </g></svg>`;
  await writeFile(`${output}/cover-${locale}.svg`, svg);
  await sharp(Buffer.from(svg)).webp({quality:90}).toFile(`${output}/cover-${locale}-1400.webp`);
  await sharp(Buffer.from(svg)).resize(480).webp({quality:85}).toFile(`${output}/cover-${locale}-480.webp`);
}
for (const [name,file] of Object.entries({formats:'03-formatos-y-plantillas',spotlight:'02-spotlight',tray:'04-bandeja-e-informes',history:'05-historial-local'})) {
  // Preserve the complete screenshot; add side gutters to fit the blog's 16:9 image frame.
  await sharp(`public/assets/jira-tools/${file}-1280x800.png`).resize(1400,788,{fit:'contain',background:'#10100f'}).webp({quality:92}).toFile(`${output}/${name}.webp`);
}
console.log('Created two localized covers with thumbnails and four optimized screenshots.');
