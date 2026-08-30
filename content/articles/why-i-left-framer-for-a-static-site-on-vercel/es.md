---
slug: "why-i-left-framer-for-a-static-site-on-vercel"
locale: "es"
title: "Por qué dejé Framer por un sitio estático asistido por IA"
description: "Por qué trasladé mi portfolio de Framer a un sitio estático basado en archivos, cuánto cuesta realmente, qué gané y a qué renuncié."
date: "2026-08-28T14:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["Framer", "Vercel", "Sitio estático", "Desarrollo asistido por IA", "Portfolio", "Desarrollo web"]
audio: ""
sourceImage: "/images/blog/why-i-left-framer-for-a-static-site-on-vercel-1400.webp"
imageAlt: "Collage editorial en el que un lienzo visual fragmentado se transforma, mediante un grafo de control de versiones, en un conjunto ordenado de páginas web estáticas."
image: "/images/blog/why-i-left-framer-for-a-static-site-on-vercel-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>No dejé Framer porque sea un mal producto. Lo dejé porque mi web había dejado de comportarse como un proyecto de diseño y empezaba a parecerse a un pequeño sistema editorial.</p>

<p>Quería rutas bilingües, artículos guardados como archivos, redirecciones predecibles, control completo sobre los datos estructurados, audio generado localmente, pruebas para el sitemap y libertad para modificar un componente sin tener que negociar con un editor visual. Framer podía resolver partes de esa lista. El problema era el coste creciente alrededor de todo aquello que no controlaba bien.</p>

<p>Así que reconstruí el sitio como un proyecto React exportado de forma estática, guardé el contenido dentro del repositorio, incorporé la IA como compañera de desarrollo y desplegué los archivos terminados en Vercel. En producción no necesito una base de datos ni un servidor procesando cada visita. La web es, principalmente, HTML, CSS, JavaScript, imágenes y archivos MP3 servidos desde una CDN.</p>

<p>Este no es otro artículo anunciando que “Framer ha muerto”. Es el registro del momento en que un constructor visual dejó de ser la abstracción adecuada para este sitio concreto.</p>

<h2>La versión corta</h2>

<p>Framer me dio velocidad al principio. El sitio estático me da control ahora.</p>

<table><thead><tr><th>Modelo Framer</th><th>Modelo estático actual</th></tr></thead><tbody><tr><td>El editor visual controla la estructura</td><td>El repositorio Git controla la estructura</td></tr><tr><td>El contenido vive dentro de la plataforma</td><td>Los artículos son archivos versionados</td></tr><tr><td>Hosting y edición están empaquetados</td><td>Hosting, contenido y herramientas están separados</td></tr><tr><td>Los cambios ocurren principalmente en una interfaz</td><td>Los cambios pasan por código y diffs revisables</td></tr><tr><td>La localización es una función de pago</td><td>Los idiomas son rutas y archivos de contenido</td></tr><tr><td>Las convenciones del producto marcan el techo</td><td>Mi capacidad de mantenimiento marca el techo</td></tr></tbody></table>

<p>La última fila importa. Tener el stack en propiedad no elimina las limitaciones. Sustituye las limitaciones del producto por responsabilidad técnica.</p>

<h2>La comparación de costes, sin contabilidad creativa</h2>

<p>Mi historial de facturas de Framer muestra la progresión real: $90 por el plan Basic anual en 2024, $180 por Basic Site anual en 2025 y un pago separado de $168.16 por Locale en 2026. Si junto las últimas facturas pagadas de Basic y Locale, el coste de plataforma era de $348.16 antes de contar el dominio.</p>

<p>La página pública de precios de Framer también muestra por qué la localización cambia el cálculo: Basic aparece a $10 mensuales con facturación anual y los idiomas adicionales como un complemento de $20 mensuales por locale. Los precios cambian, los impuestos dependen de la región y mi factura no es una cotización universal. Por eso utilizo mis recibos como registro de lo que pagué y la <a href="https://www.framer.com/pricing">página oficial de precios</a> como referencia actual.</p>

<p>El desembolso del nuevo modelo quedó así:</p>

<table><thead><tr><th>Concepto</th><th>Cómo lo contabilizo</th><th>Coste</th></tr></thead><tbody><tr><td>Hosting estático en Vercel Hobby</td><td>Hosting recurrente actual</td><td>$0</td></tr><tr><td>Dominio registrado en Spaceship</td><td>Coste recurrente anual</td><td>$8</td></tr><tr><td>ChatGPT Plus</td><td>Un mes asignado a la migración</td><td>$20</td></tr><tr><td>Desembolso del mes de migración</td><td>Dominio + un mes asignado de ChatGPT</td><td>$28</td></tr><tr><td>Coste recurrente después de migrar</td><td>Solo el dominio</td><td>$8/año</td></tr></tbody></table>

<p>Esos $28 corresponden a lo que asigno a la transición de este mes, no a una nueva factura mensual de la web. ChatGPT Plus cuesta $20 al mes según la <a href="https://openai.com/chatgpt/pricing">página oficial de precios</a>, pero ya utilizo esa suscripción para tareas que van mucho más allá de este sitio. Le atribuyo un mes a la migración porque representa el esfuerzo concentrado de construcción; no considero la suscripción una dependencia permanente del hosting.</p>

<p>Después del mes de migración, el coste marginal recurrente de esta web es de <strong>$8 al año</strong>: el dominio. El sitio generado no llama a ChatGPT en producción y las visitas no consumen créditos de IA. Si mañana cancelara ChatGPT, la web desplegada seguiría funcionando.</p>

<table><thead><tr><th>Comparación</th><th>Coste</th></tr></thead><tbody><tr><td>Últimas facturas de Framer Basic + Locale</td><td>$348.16/año</td></tr><tr><td>Asignación puntual del mes de migración</td><td>$28</td></tr><tr><td>Sitio estático después de migrar</td><td>$8/año</td></tr></tbody></table>

<p>Frente a mis últimas facturas de Framer, el ahorro recurrente de plataforma es de aproximadamente <strong>$340.16 al año</strong>. No incluyo el dominio en ese ahorro porque lo necesitaría con cualquiera de los dos modelos. El primer año suma además los $20 puntuales asignados a la migración asistida por IA.</p>

<h2>La letra pequeña de Vercel a $0</h2>

<p>El plan Hobby de Vercel cuesta $0 e incluye despliegues desde Git, CDN, HTTPS, previews y recursos suficientes para muchos proyectos estáticos pequeños. Pero “gratis” no es la única condición relevante.</p>

<p>Vercel define Hobby como un plan para uso personal y no comercial. Su <a href="https://vercel.com/docs/plans/hobby">documentación de Hobby</a> y la <a href="https://vercel.com/pricing">página de precios</a> muestran ese límite. Un portfolio que funcione directamente como web de un negocio puede necesitar Pro, listado actualmente a $20 al mes. Quien copie esta configuración debería clasificar su uso con honestidad, no tratar Hobby como un cupón de hosting gratuito sin condiciones.</p>

<p>La arquitectura seguiría siendo económica si el plan cambiara porque la entrega estática consume muy poco cómputo. Pero la afirmación exacta es: <strong>mi factura actual de Vercel es de $0 bajo Hobby, sujeta a sus requisitos y límites de uso</strong>.</p>

<h2>Qué terminó empujándome fuera de Framer</h2>

<h3>El contenido necesitaba ser portátil</h3>

<p>Un CMS es cómodo hasta que se convierte en el único lugar donde el contenido puede existir con facilidad. Quería que cada artículo, traducción, redirección, ruta de imagen, ruta de audio y campo de metadatos pudiera inspeccionarse dentro del repositorio.</p>

<p>Ahora cada artículo vive en una carpeta predecible con front matter y contenido HTML. Los borradores permanecen versionados, pero desaparecen de las rutas públicas, del RSS y del sitemap. Una futura migración ya no tendrá que rescatar primero los textos de una plataforma.</p>

<h3>La localización se había convertido en infraestructura</h3>

<p>Inglés y español no son variantes cosméticas de una misma página. Afectan rutas, metadatos, sitemaps, relaciones hreflang, revisión editorial y publicación. Pagar por un idioma era solo una parte de la fricción; el problema mayor era tener menos control sobre el comportamiento de ambos árboles de contenido.</p>

<p>En la versión estática, una traducción española real es un archivo <code>es.md</code>. Si no existe, la ruta no se presenta a Google como contenido traducido. Es una regla suficientemente sencilla como para comprobarla automáticamente.</p>

<h3>Quería un SEO aburrido e inspeccionable</h3>

<p>El sitio genera ahora su propio sitemap, robots, RSS, metadatos canónicos y alternancias de idioma. Las redirecciones viven en configuración. Cuando un artículo pasa a draft, sale del sitemap en la siguiente compilación. Cuando varios artículos se solapan, puedo fusionarlos y añadir sus redirecciones permanentes dentro del mismo cambio.</p>

<p>Nada de esto resulta visualmente emocionante. Precisamente por eso me gusta.</p>

<h3>La IA volvió práctico tener el código en propiedad</h3>

<p>La IA no eliminó la necesidad de comprender la web. Redujo el coste de pasar de una intención de diseño a una implementación. Puedo describir un problema de layout, revisar el diff propuesto, ejecutar el sitio, comparar capturas e iterar sin convertir cada ajuste en un nuevo miniproyecto.</p>

<p>La distinción importante es que la IA asiste al repositorio; no es propietaria del repositorio. Los activos duraderos siguen siendo archivos normales, pruebas, historial de Git, comandos de compilación y decisiones documentadas.</p>

<h2>Qué gané</h2>

<ul><li><p><strong>Propiedad.</strong> El contenido y la interfaz pueden trasladarse a otro host estático.</p></li><li><p><strong>Historial.</strong> Cada cambio importante puede revisarse y revertirse.</p></li><li><p><strong>Rendimiento.</strong> Las rutas públicas se renderizan durante el build, no en cada visita.</p></li><li><p><strong>Comportamiento personalizado.</strong> Audio, navegación, animación, schema y layouts editoriales son código normal.</p></li><li><p><strong>Pruebas.</strong> El build verifica rutas, sitemap, localización y redirecciones.</p></li><li><p><strong>Separación de costes.</strong> Dominio, hosting, suscripción de IA y contenido ya no forman una sola decisión de plataforma.</p></li></ul>

<h2>A qué renuncié</h2>

<p>Esta historia sería deshonesta si solo describiera las ventajas.</p>

<ul><li><p><strong>El lienzo visual.</strong> Framer es mucho más rápido cuando la tarea principal consiste en componer libremente una landing.</p></li><li><p><strong>Edición no técnica.</strong> Un repositorio no es automáticamente un CMS amable para un equipo editorial.</p></li><li><p><strong>Convenciones gestionadas.</strong> Ahora soy responsable de dependencias, errores de build, regresiones de accesibilidad y configuración.</p></li><li><p><strong>Publicación instantánea desde una interfaz.</strong> Los cambios pasan por archivos, Git y un despliegue.</p></li><li><p><strong>Un único responsable de soporte.</strong> Si algo falla, no existe un solo producto que responda por todo el stack.</p></li></ul>

<p>Para un equipo de marketing que necesita reorganizar páginas todos los días, todavía podría elegir Framer. Para un portfolio personal que se está convirtiendo en un sistema editorial y técnico, prefiero el repositorio.</p>

<h2>El stack real</h2>

<p>El sitio actual utiliza React 19, Vite y vinext. Vinext ofrece un modelo compatible con App Router sobre Vite y el proyecto exporta cada ruta pública como salida estática. Los artículos están en <code>content/articles</code>. Un script de build genera <code>robots.txt</code>, <code>sitemap.xml</code> y <code>rss.xml</code>. Vercel publica el directorio resultante <code>dist/client</code>.</p>

<p>No existe una base de datos de producción para el blog ni una API de texto a voz ejecutándose cuando alguien pulsa Escuchar. El audio puede generarse localmente y desplegarse como un MP3 normal. La arquitectura de producción es aburrida a propósito.</p>

<h2>¿Recomendaría hacer lo mismo?</h2>

<p>Solo si la razón es más fuerte que “el código parece más profesional”.</p>

<p>Quédate en Framer si la iteración visual es el trabajo principal, varias personas no técnicas publican contenido o la plataforma ya resuelve lo que necesitas a un precio aceptable. Pasa a un repositorio estático cuando la portabilidad, el comportamiento personalizado, el contenido versionado, el SEO técnico y el control a largo plazo compensen la responsabilidad de mantener el build.</p>

<p>La mejor herramienta no es la que tiene la factura más baja. Es aquella cuyas limitaciones encajan mejor con el trabajo.</p>

<p>Para esta web, eso cambió. Framer fue el lugar adecuado para descubrir el diseño. El repositorio se convirtió en el lugar adecuado para seguir construyéndolo.</p>

<p>La guía complementaria, <a href="/es/blog/how-to-migrate-from-framer-to-a-static-site-on-vercel">Cómo migrar de Framer a un sitio estático en Vercel</a>, documenta el flujo real, la estructura de carpetas, el despliegue, las redirecciones, los metadatos y el QA asistido por IA.</p>
