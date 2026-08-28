---
slug: "how-to-migrate-from-framer-to-a-static-site-on-vercel"
locale: "es"
title: "Cómo migrar de Framer a un sitio estático en Vercel asistido por IA"
description: "Guía práctica para trasladar un portfolio y un blog de Framer a un sitio estático basado en archivos, versionado con Git y desplegado en Vercel."
date: "2026-08-28T13:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["Migración de Framer", "Vercel", "Exportación estática", "React", "Desarrollo asistido por IA", "SEO técnico"]
audio: ""
sourceImage: "/images/blog/how-to-migrate-from-framer-to-a-static-site-on-vercel.png"
imageAlt: "Kit editorial de migración visto desde arriba con tarjetas de contenido, mapas de rutas, recursos, pipeline de build, ramas de versiones y un conjunto final de páginas estáticas."
image: "/images/blog/how-to-migrate-from-framer-to-a-static-site-on-vercel.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>Sacar una web de Framer no consiste principalmente en volver a dibujar rectángulos con CSS. La parte difícil es conservar el sistema invisible alrededor de esos rectángulos: URLs, contenido, metadatos, imágenes, relaciones entre idiomas, redirecciones, analítica y todas las pequeñas suposiciones acumuladas mientras el sitio estaba publicado.</p>

<p>Migré mi portfolio a un proyecto React exportado de forma estática, guardé el blog como archivos, incorporé IA para acelerar la implementación y la revisión, y desplegué el resultado en Vercel. Esta guía explica el proceso que volvería a utilizar.</p>

<p>Si antes quieres entender la decisión y la comparación real de costes, lee <a href="/es/blog/why-i-left-framer-for-a-static-site-on-vercel">Por qué dejé Framer por un sitio estático en Vercel asistido por IA</a>.</p>

<h2>La arquitectura de destino</h2>

<pre><code>content/articles/       contenido versionado del blog
public/images/          imágenes estáticas
public/audio/           narraciones generadas previamente
app/                    rutas y componentes
lib/content.ts          cargador de contenido
scripts/                migración y generación de metadatos
tests/                  verificaciones del resultado renderizado
dist/client/            sitio estático desplegable</code></pre>

<p>El navegador recibe archivos estáticos. Git conserva la fuente de verdad. Vercel compila el repositorio y publica <code>dist/client</code>. Puede seguir existiendo comportamiento dinámico en el navegador, pero no hace falta un servidor para renderizar un artículo.</p>

<h2>Paso 1: inventaría la web publicada antes de tocar código</h2>

<p>Crea una lista de todas las URLs importantes. Incluye:</p>

<ul><li><p>páginas principales y versiones localizadas;</p></li><li><p>todos los slugs del CMS;</p></li><li><p>URLs canónicas y metadatos;</p></li><li><p>imágenes, descargas, audio y recursos externos;</p></li><li><p>formularios e integraciones;</p></li><li><p>analítica, etiquetas de verificación y consentimiento;</p></li><li><p>redirecciones existentes;</p></li><li><p>páginas que ya reciben impresiones o enlaces.</p></li></ul>

<p>Exporta la colección del CMS de Framer a CSV y conserva intacta la exportación original dentro de una carpeta de backup. Toma capturas de página completa de las rutas importantes en escritorio y móvil. Una captura no es código fuente, pero funciona muy bien como evidencia para detectar regresiones.</p>

<p>Hazlo antes de rediseñar. Migración y rediseño pueden ocurrir juntos, pero necesitas saber si cada diferencia es intencionada.</p>

<h2>Paso 2: elige un stack capaz de exportar estático</h2>

<p>No necesitas usar mis dependencias exactas. Astro, Eleventy, la exportación estática de Next.js u otro framework pueden funcionar. Los requisitos importantes son:</p>

<ul><li><p>una salida determinista por cada ruta pública;</p></li><li><p>soporte para metadatos y rutas localizadas;</p></li><li><p>un comando de build que falle de forma visible;</p></li><li><p>contenido independiente de un editor propietario;</p></li><li><p>un directorio final que pueda desplegarse.</p></li></ul>

<p>Mi implementación utiliza React, Vite y vinext:</p>

<pre><code>npm install
npm run dev
npm run build
npm test</code></pre>

<p>La exportación de producción se activa en <code>next.config.ts</code>:</p>

<pre><code>const nextConfig = {
  output: "export",
};

export default nextConfig;</code></pre>

<p>Como vinext compila mediante Vite, la salida final del cliente queda en <code>dist/client</code>. Ese directorio, no el repositorio fuente, es lo que sirve el hosting.</p>

<h2>Paso 3: convierte el CMS en archivos portátiles</h2>

<p>Cada artículo de esta web vive en:</p>

<pre><code>content/articles/&lt;slug&gt;/en.md
content/articles/&lt;slug&gt;/es.md</code></pre>

<p>El archivo comienza con front matter estricto y continúa con el cuerpo:</p>

<pre><code>---
slug: "articulo-de-ejemplo"
locale: "es"
title: "Artículo de ejemplo"
description: "Un resumen útil."
date: "2026-08-28T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["Migración", "Sitio estático"]
audio: ""
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
---

&lt;p&gt;El artículo comienza aquí.&lt;/p&gt;</code></pre>

<p>Escribí un script de migración para el CSV en lugar de copiar decenas de artículos a mano. El script normaliza slugs, transforma metadatos, conserva drafts, elimina scripts inseguros y eventos inline, y asigna una portada local provisional cuando todavía no existe una imagen migrada.</p>

<p>La regla importante es sencilla: <strong>el importador nunca debe ser destructivo</strong>. Conserva el CSV original, escribe el contenido generado en otra estructura y procura que ejecutar el proceso varias veces produzca el mismo resultado.</p>

<h2>Paso 4: construye un único cargador de contenido</h2>

<p>El cargador lee el front matter, devuelve el cuerpo, filtra borradores, ordena por fecha y acepta un idioma. Todos los consumidores deben utilizarlo: índice, páginas de detalle, navegación entre artículos, RSS y sitemap.</p>

<p>Centralizar esta lógica evita un fallo frecuente: que un draft desaparezca del listado pero siga siendo descubrible mediante una ruta generada o el sitemap.</p>

<pre><code>getAllArticles({ locale: "es" })
  .filter(article =&gt; !article.draft)
  .sort((a, b) =&gt; Date.parse(b.date) - Date.parse(a.date));</code></pre>

<p>La ruta individual debe repetir la comprobación del draft y devolver not found cuando el contenido no sea público.</p>

<h2>Paso 5: conserva primero las URLs; ya las mejorarás después</h2>

<p>Si el artículo de Framer vivía en <code>/blog/mi-articulo</code>, conserva esa URL salvo que exista un motivo de peso para cambiarla. Una ruta ligeramente más bonita rara vez compensa perder enlaces, menciones e historial de búsqueda.</p>

<p>Si una ruta debe cambiar, añade una redirección permanente en el mismo despliegue:</p>

<pre><code>{
  "source": "/writing/:slug",
  "destination": "/blog/:slug",
  "permanent": true
}</code></pre>

<p>Haz lo mismo al consolidar posts solapados. Mueve el contenido útil al artículo más fuerte, convierte el débil en draft y redirige su URL antigua hacia la página canónica superviviente. No pidas a Google que elimine una URL que debería transferir sus señales mediante una redirección.</p>

<h2>Paso 6: reconstruye los metadatos como salida, no como decoración</h2>

<p>Una migración visualmente correcta puede ser una regresión de SEO. El build debe producir y verificar:</p>

<ul><li><p>títulos y descripciones únicos;</p></li><li><p>URLs canónicas autorreferentes;</p></li><li><p>atributos de idioma y alternancias recíprocas donde existan traducciones;</p></li><li><p>metadatos Open Graph;</p></li><li><p>datos estructurados coherentes con el contenido visible;</p></li><li><p><code>robots.txt</code>;</p></li><li><p><code>sitemap.xml</code>;</p></li><li><p><code>rss.xml</code>.</p></li></ul>

<p>En mi proyecto, un script posterior al build escribe los archivos de metadatos desplegables después de exportar las rutas. Los borradores quedan fuera de las tres fuentes.</p>

<h2>Paso 7: trata cada idioma como contenido independiente</h2>

<p>Una ruta traducida solo debe existir cuando hay una traducción real. No publiques texto inglés debajo de <code>/es/</code> esperando que una etiqueta de idioma lo convierta en español.</p>

<p>Este proyecto utiliza una regla explícita:</p>

<pre><code>existe en.md  → publica /blog/slug
existe es.md  → publica /es/blog/slug
falta es.md   → no declara traducción española</code></pre>

<p>El sitemap añade alternancias únicamente a pares reales. Una prueba cuenta las páginas traducidas y confirma que su HTML declara español.</p>

<h2>Paso 8: saca los assets de la plataforma con cuidado</h2>

<p>Descarga las imágenes con la mejor calidad disponible y guarda los originales en una carpeta de backup en la raíz. Genera versiones públicas optimizadas por separado. Nunca resuelvas un problema de rendimiento eliminando la única fuente en alta resolución.</p>

<pre><code>backup/original-images/article-hero.png
public/images/blog/article-hero.webp</code></pre>

<p>Actualiza los textos alternativos durante la migración sin inventar descripciones ajenas a la imagen. Al terminar, busca URLs antiguas del CDN de Framer en el contenido exportado; los recursos remotos son fáciles de pasar por alto porque siguen funcionando hasta que dejan de hacerlo.</p>

<h2>Paso 9: incorpora IA sin entregarle el volante</h2>

<p>La IA resulta especialmente útil como colaboradora rápida en tareas delimitadas:</p>

<ul><li><p>convertir patrones repetidos de Framer en componentes reutilizables;</p></li><li><p>escribir scripts de migración y validaciones;</p></li><li><p>detectar CSS duplicado y tokens inconsistentes;</p></li><li><p>comparar capturas con una referencia;</p></li><li><p>proponer metadatos y alt text para revisión;</p></li><li><p>encontrar enlaces internos hacia rutas retiradas;</p></li><li><p>crear pruebas a partir de errores que ya ocurrieron.</p></li></ul>

<p>El proceso no es “pídele a una IA que reconstruya la web”. Es:</p>

<ol><li><p>definir un resultado concreto;</p></li><li><p>permitir que el asistente inspeccione el repositorio real;</p></li><li><p>revisar archivos y supuestos;</p></li><li><p>ejecutar build y pruebas;</p></li><li><p>abrir el resultado en breakpoints reales;</p></li><li><p>guardar un cambio lo bastante pequeño como para entenderlo.</p></li></ol>

<p>La IA acelera el ciclo. Git lo hace recuperable. Las pruebas lo hacen confiable.</p>

<h2>Paso 10: configura Vercel como host estático</h2>

<p>Conecta el repositorio Git a Vercel y describe el build de forma explícita:</p>

<pre><code>{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "cleanUrls": true
}</code></pre>

<p>Cada push puede crear un despliegue. Las previews permiten revisar con seguridad y producción sigue correspondiendo a un estado concreto de Git.</p>

<p>Vercel Hobby cuesta actualmente $0, pero está destinado expresamente a uso personal y no comercial. Revisa las <a href="https://vercel.com/docs/plans/hobby">condiciones oficiales del plan</a> antes de considerarlo el hosting definitivo para una web comercial. Pro es la referencia adecuada cuando el proyecto cruza ese límite.</p>

<h2>Paso 11: prueba la exportación, no solo el modo de desarrollo</h2>

<p>El servidor local puede ocultar errores de exportación. Mi comando de pruebas genera el build de producción y después inspecciona los archivos que realmente se desplegarán.</p>

<p>Las comprobaciones mínimas son:</p>

<ul><li><p>las páginas canónicas existen como HTML estático;</p></li><li><p>robots, sitemap y RSS aparecen en la salida;</p></li><li><p>los drafts están ausentes;</p></li><li><p>solo las traducciones reales aparecen bajo rutas localizadas;</p></li><li><p>las redirecciones antiguas siguen configuradas;</p></li><li><p>los enlaces internos no apuntan a artículos retirados.</p></li></ul>

<pre><code>npm test</code></pre>

<p>Una suite verde no sustituye la revisión visual. Todavía compruebo homepage, índice del blog, un artículo largo, navegación, footer, móvil, teclado y movimiento reducido en un navegador.</p>

<h2>Paso 12: cambia el dominio sin improvisar</h2>

<ol><li><p>Reduce el TTL del DNS con antelación si el proveedor lo permite.</p></li><li><p>Añade el dominio a Vercel y anota los registros necesarios.</p></li><li><p>Despliega y prueba primero con el dominio de preview.</p></li><li><p>Confirma que las canónicas siguen señalando al dominio real.</p></li><li><p>Actualiza el DNS en el registrador.</p></li><li><p>Verifica HTTPS, la redirección de <code>www</code>, sitemap, robots y artículos clave.</p></li><li><p>Vuelve a enviar el sitemap en Google Search Console y vigila la indexación.</p></li></ol>

<p>No canceles la plataforma anterior antes de comprobar el dominio nuevo, las redirecciones y las páginas críticas. Unos días de solapamiento cuestan menos que una caída evitable.</p>

<h2>Checklist de migración</h2>

<ul><li><p>Exportación original del CMS respaldada.</p></li><li><p>Imágenes de alta calidad preservadas.</p></li><li><p>Cada URL pública de Framer tiene destino.</p></li><li><p>Artículos importados con slugs estables.</p></li><li><p>Drafts excluidos de todos los outputs.</p></li><li><p>Traducciones reales separadas de fallbacks.</p></li><li><p>Canónicas, schema, sitemap, robots y RSS generados.</p></li><li><p>Redirecciones configuradas antes del lanzamiento.</p></li><li><p>Build de producción probado.</p></li><li><p>Capturas de escritorio y móvil revisadas.</p></li><li><p>Dominio y HTTPS verificados.</p></li><li><p>Sitemap reenviado a Search Console.</p></li></ul>

<h2>Cuándo este modelo no es la elección correcta</h2>

<p>No migres solo para ahorrar si nadie quiere mantener código. Un repositorio estático sustituye mal a un CMS visual cuando un equipo no técnico publica a diario, los experimentos requieren una plataforma de marketing integrada o los layouts deben cambiar sin revisión técnica.</p>

<p>Funciona especialmente bien para portfolios, documentación, sitios editoriales y contenido relativamente estable donde la propiedad, el rendimiento y el comportamiento personalizado importan más que publicar mediante drag-and-drop.</p>

<p>El resultado no es “una web gratuita hecha por IA”. Es un pequeño proyecto de software con costes bajos de infraestructura, contenido versionado, trade-offs explícitos y un flujo de mantenimiento asistido por IA.</p>

<p>Esa descripción es menos mágica. También es la razón por la que confío en el sistema.</p>
