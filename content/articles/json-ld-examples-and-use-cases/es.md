---
slug: "json-ld-examples-and-use-cases"
locale: "es"
title: "Ejemplos de JSON-LD: 12 usos prácticos para una web"
description: "Una guía práctica con 12 casos de uso de JSON-LD, ejemplos funcionales de Schema.org, criterios de selección, validación y errores que debes evitar."
date: "2026-09-01T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["JSON-LD", "Schema.org", "SEO técnico"]
audio: ""
sourceImage: "/images/blog/json-ld-examples-and-use-cases-1400.webp"
imageAlt: "Un grafo central de datos estructurados conecta artículos, personas, organizaciones, vídeos, eventos, productos, software y ofertas de trabajo."
image: "/images/blog/json-ld-examples-and-use-cases-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>JSON-LD resulta mucho más sencillo cuando dejas de verlo como un adorno SEO y lo tratas como una descripción de aquello sobre lo que realmente habla una página. Una URL puede describir un artículo, una persona, una empresa, un producto, un evento o varias entidades relacionadas. JSON-LD asigna nombres, tipos, propiedades y relaciones que las máquinas pueden interpretar sin tener que deducirlos a partir de la interfaz.</p>

<p>Esta guía reúne doce usos prácticos de JSON-LD para sitios modernos. El objetivo no es marcarlo todo, sino elegir el grafo más pequeño y veraz que describa el contenido visible y responda a un propósito real de búsqueda o descubrimiento.</p>

<aside><p><strong>La distinción esencial:</strong> que un marcado sea válido en Schema.org no significa que pueda generar un resultado enriquecido en Google. Schema.org ofrece un vocabulario amplio; Google admite un conjunto menor y cambiante de funciones. Consulta siempre la <a href="https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=es">galería de resultados de búsqueda de Google</a> para conocer los requisitos actuales.</p></aside>

<h2>Para qué se utiliza JSON-LD</h2>

<p>JSON-LD es un formato de datos enlazados. En una web suele aparecer dentro de un elemento <code>&lt;script type="application/ld+json"&gt;</code> y utilizar el vocabulario de Schema.org. Los buscadores pueden usarlo para comprender entidades y, en los tipos admitidos, evaluar una página para presentaciones especiales en los resultados.</p>

<p>No garantiza rankings ni resultados enriquecidos. Su valor práctico es la claridad: hace explícito qué representa la página, qué datos pertenecen a cada entidad y cómo se relacionan.</p>

<pre data-language="HTML"><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Ejemplos y usos de JSON-LD",
  "url": "https://example.com/es/ejemplos-json-ld"
}
&lt;/script&gt;</code></pre>

<h2>1. Organization: definir la empresa responsable del sitio</h2>

<p>Utiliza <a href="https://schema.org/Organization">Organization</a> en una página autorizada sobre una empresa, normalmente la portada o la página «Acerca de». Permite relacionar el nombre, la URL canónica, el logotipo, los datos de contacto y los perfiles públicos verificados. Mantén un <code>@id</code> estable y reutilízalo cuando otros objetos hagan referencia a la organización.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://example.com/#organization",
  "name": "Estudio Ejemplo",
  "url": "https://example.com/",
  "logo": "https://example.com/logo.png",
  "sameAs": ["https://www.linkedin.com/company/estudio-ejemplo"]
}</code></pre>

<p><strong>Adecuado para:</strong> agencias, empresas, organizaciones, instituciones y marcas con identidad propia.</p>

<h2>2. Person: establecer una identidad profesional o creativa</h2>

<p>Utiliza <a href="https://schema.org/Person">Person</a> cuando la página trate principalmente sobre una persona: un portfolio, un perfil de autor, una página de conferenciante o una web personal. Entre las propiedades útiles están <code>name</code>, <code>url</code>, <code>jobTitle</code>, <code>worksFor</code> y <code>sameAs</code>. Enlaza únicamente perfiles que representen realmente a esa persona.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://example.com/#person",
  "name": "Alex Rivera",
  "url": "https://example.com/",
  "jobTitle": "UX Engineer",
  "sameAs": ["https://www.linkedin.com/in/alex-rivera"]
}</code></pre>

<p><strong>Adecuado para:</strong> portfolios, consultores, creadores, autores y perfiles profesionales públicos.</p>

<h2>3. WebSite: describir el sitio completo</h2>

<p><a href="https://schema.org/WebSite">WebSite</a> representa la web completa, no una página individual. Suele combinarse con Organization o Person e identificarse desde la portada. No debe sustituir la descripción del contenido específico de cada URL.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://example.com/#website",
  "url": "https://example.com/",
  "name": "Estudio Ejemplo",
  "publisher": { "@id": "https://example.com/#organization" },
  "inLanguage": ["en", "es"]
}</code></pre>

<p><strong>Adecuado para:</strong> declarar el nombre del sitio, su editor, sus idiomas y la relación con la entidad principal.</p>

<h2>4. Article y BlogPosting: identificar contenido editorial</h2>

<p>Usa <a href="https://schema.org/Article">Article</a>, <a href="https://schema.org/BlogPosting">BlogPosting</a> o NewsArticle cuando la página sea una obra editorial. El marcado debe coincidir con el titular, el autor, las fechas y la imagen visibles. Google documenta recomendaciones adicionales para los <a href="https://developers.google.com/search/docs/appearance/structured-data/article?hl=es">datos estructurados de artículos</a>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Ejemplos de JSON-LD: 12 usos prácticos",
  "datePublished": "2026-09-01",
  "dateModified": "2026-09-01",
  "author": { "@id": "https://example.com/#person" },
  "image": "https://example.com/images/guia-json-ld.jpg",
  "mainEntityOfPage": "https://example.com/es/ejemplos-json-ld"
}</code></pre>

<p><strong>Adecuado para:</strong> artículos de blog, informes, noticias, tutoriales y contenido editorial extenso.</p>

<h2>5. BreadcrumbList: hacer explícita la jerarquía</h2>

<p><a href="https://schema.org/BreadcrumbList">BreadcrumbList</a> describe la posición de una página dentro de una jerarquía. Sus elementos deben corresponder a una ruta de navegación real y lógica, no a una lista inventada únicamente para el marcado. Google mantiene <a href="https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?hl=es">directrices específicas para las migas de pan</a>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Blog", "item": "https://example.com/es/blog" },
    { "@type": "ListItem", "position": 2, "name": "SEO técnico", "item": "https://example.com/es/blog/seo-tecnico" },
    { "@type": "ListItem", "position": 3, "name": "Ejemplos de JSON-LD" }
  ]
}</code></pre>

<p><strong>Adecuado para:</strong> comercio electrónico, documentación, publicaciones y sitios con categorías significativas.</p>

<h2>6. Product: describir algo que puede comprarse</h2>

<p>Utiliza <a href="https://schema.org/Product">Product</a> para un producto o una variante concreta. El precio, la disponibilidad, las valoraciones y las reseñas deben reflejar información visible para el usuario. La <a href="https://developers.google.com/search/docs/appearance/structured-data/product?hl=es">documentación de productos de Google</a> distingue entre fichas de comerciante y fragmentos de producto.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Cuaderno de campo",
  "image": "https://example.com/cuaderno.jpg",
  "sku": "FN-01",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "24.00",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/productos/cuaderno"
  }
}</code></pre>

<p><strong>Adecuado para:</strong> bienes físicos, variantes y productos digitales comprables. No corresponde a una página genérica de servicios.</p>

<h2>7. SoftwareApplication: explicar una aplicación</h2>

<p><a href="https://schema.org/SoftwareApplication">SoftwareApplication</a> puede describir una aplicación móvil, web, de escritorio u otro software. Utiliza un subtipo más específico, como MobileApplication o WebApplication, cuando encaje con precisión.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Temporizador Focus",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
}</code></pre>

<p><strong>Adecuado para:</strong> páginas de producto de aplicaciones, SaaS, herramientas web y software descargable.</p>

<h2>8. Event: publicar un evento real con fecha y lugar</h2>

<p>Utiliza <a href="https://schema.org/Event">Event</a> para algo que sucede en un momento definido: una conferencia, un webinar, un taller, una actuación o un encuentro. El estado y el modo de asistencia son importantes cuando el evento se aplaza, cancela, celebra online o adopta un formato híbrido. Sigue las <a href="https://developers.google.com/search/docs/appearance/structured-data/event?hl=es">directrices actuales de Google para eventos</a>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Taller de datos estructurados",
  "startDate": "2026-10-15T18:00:00+02:00",
  "endDate": "2026-10-15T20:00:00+02:00",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": { "@type": "VirtualLocation", "url": "https://example.com/taller" }
}</code></pre>

<p><strong>Adecuado para:</strong> páginas individuales de eventos, no categorías que mezclan todo un calendario.</p>

<h2>9. VideoObject: aportar datos sobre un vídeo reproducible</h2>

<p><a href="https://schema.org/VideoObject">VideoObject</a> ayuda a describir un vídeo insertado en una página. La miniatura, la fecha de publicación, la duración, la descripción y la URL deben ser correctas y accesibles. La <a href="https://developers.google.com/search/docs/appearance/structured-data/video?hl=es">documentación de vídeos de Google</a> explica las propiedades y requisitos de indexación.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Cómo conecta JSON-LD las entidades de una web",
  "description": "Una explicación visual de un grafo conectado de Schema.org.",
  "thumbnailUrl": "https://example.com/miniatura-video.jpg",
  "uploadDate": "2026-09-01",
  "duration": "PT6M20S",
  "contentUrl": "https://example.com/videos/json-ld.mp4"
}</code></pre>

<p><strong>Adecuado para:</strong> páginas donde el vídeo sea una parte principal y reproducible del contenido.</p>

<h2>10. JobPosting: estructurar una vacante real</h2>

<p>Utiliza <a href="https://schema.org/JobPosting">JobPosting</a> para un único puesto abierto. La descripción, la empresa, la ubicación, el tipo de empleo, la fecha de publicación y la caducidad deben coincidir con la oferta visible. No mantengas vacantes caducadas como abiertas. Las <a href="https://developers.google.com/search/docs/appearance/structured-data/job-posting?hl=es">políticas de Google para ofertas de empleo</a> son especialmente estrictas porque el marcado representa una oportunidad real.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Senior UX Engineer",
  "datePosted": "2026-09-01",
  "validThrough": "2026-10-01T23:59:59+02:00",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@id": "https://example.com/#organization" },
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": { "@type": "Country", "name": "España" }
}</code></pre>

<p><strong>Adecuado para:</strong> una página dedicada a una sola vacante activa.</p>

<h2>11. LocalBusiness: conectar un negocio con una ubicación</h2>

<p><a href="https://schema.org/LocalBusiness">LocalBusiness</a> es un subtipo de Organization para negocios con presencia física de atención al público. Elige el subtipo más específico que corresponda. La dirección, el teléfono, el horario y la información geográfica deben coincidir con la página y con otras fuentes autorizadas.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Estudio de investigación Ejemplo",
  "url": "https://example.com/",
  "telephone": "+34 900 000 000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Ejemplo 10",
    "addressLocality": "Barcelona",
    "postalCode": "08001",
    "addressCountry": "ES"
  }
}</code></pre>

<p><strong>Adecuado para:</strong> tiendas, restaurantes, clínicas, estudios y servicios profesionales locales. Un negocio completamente remoto debería utilizar Organization.</p>

<h2>12. CreativeWork: representar portfolios y casos de estudio</h2>

<p><a href="https://schema.org/CreativeWork">CreativeWork</a> es útil cuando una página presenta un proyecto, diseño, informe, conjunto de datos u otra creación. Schema.org no define actualmente un tipo CaseStudy; inventarlo produciría vocabulario no válido. Un caso de portfolio puede ser un Article o BlogPosting cuya propiedad <code>about</code> haga referencia a un CreativeWork.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Rediseñando una experiencia de planificación de viajes",
  "author": { "@id": "https://example.com/#person" },
  "about": {
    "@type": "CreativeWork",
    "name": "Rediseño de planificación de viajes",
    "creator": { "@id": "https://example.com/#person" },
    "keywords": ["investigación UX", "diseño de producto", "viajes"]
  }
}</code></pre>

<p><strong>Adecuado para:</strong> portfolios, proyectos de diseño, investigaciones y casos de estudio. Explico este modelo con mayor detalle en <a href="/es/blog/json-ld-for-case-studies-specific-schema-for-ux-portfolios">JSON-LD para casos de estudio UX</a>.</p>

<h2>Cómo combinar varios tipos de JSON-LD</h2>

<p>Una página suele necesitar varios objetos conectados. Un artículo puede pertenecer a una web, identificar a una persona como autora, referenciar a una organización como editora e incluir migas de pan. En lugar de duplicar cada entidad, utiliza valores <code>@id</code> estables y conecta los objetos dentro de <code>@graph</code>.</p>

<pre data-language="JSON"><code>{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://example.com/#person",
      "name": "Alex Rivera"
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "author": { "@id": "https://example.com/#person" }
    },
    {
      "@type": "BlogPosting",
      "@id": "https://example.com/es/ejemplos-json-ld/#article",
      "headline": "Ejemplos y usos de JSON-LD",
      "author": { "@id": "https://example.com/#person" },
      "isPartOf": { "@id": "https://example.com/#website" }
    }
  ]
}</code></pre>

<p>El grafo no mejora simplemente por ser más grande. Añade una entidad cuando aclare una relación real o ayude al propósito de la página.</p>

<h2>Cómo elegir el tipo de schema correcto</h2>

<ol>
  <li><p><strong>Empieza por la entidad principal.</strong> ¿La página presenta un artículo, producto, evento, persona, empleo o aplicación?</p></li>
  <li><p><strong>Utiliza el subtipo válido más específico.</strong> BlogPosting es más preciso que CreativeWork para un post, siempre que siga siendo correcto.</p></li>
  <li><p><strong>Comprueba la correspondencia con el contenido visible.</strong> Una propiedad no debería afirmar un precio, valoración, autor o disponibilidad que el usuario no pueda verificar.</p></li>
  <li><p><strong>Consulta por separado la documentación de Google.</strong> La validez en Schema.org y la elegibilidad para funciones de Google son preguntas distintas.</p></li>
  <li><p><strong>Prefiere identificadores estables.</strong> Reutiliza los mismos <code>@id</code> canónicos para una persona, organización o sitio.</p></li>
</ol>

<h2>Errores habituales con JSON-LD</h2>

<ul>
  <li><p><strong>Inventar tipos.</strong> Si un tipo no existe en Schema.org, escribir su nombre no lo convierte en válido.</p></li>
  <li><p><strong>Añadir afirmaciones invisibles.</strong> El marcado no debe presentar valoraciones, precios, empleos o eventos ausentes de la página.</p></li>
  <li><p><strong>Usar la entidad equivocada.</strong> Product no es una etiqueta genérica para servicios y LocalBusiness no corresponde a cualquier empresa.</p></li>
  <li><p><strong>Duplicar objetos contradictorios.</strong> Plugins, temas y scripts personalizados pueden generar schemas que compiten entre sí.</p></li>
  <li><p><strong>Mantener datos obsoletos.</strong> Empleos caducados, eventos pasados, precios antiguos y disponibilidad incorrecta vuelven poco fiable el marcado.</p></li>
  <li><p><strong>Esperar que el schema arregle contenido débil.</strong> El marcado describe una página; no crea autoridad, relevancia ni utilidad.</p></li>
</ul>

<h2>Cómo validar JSON-LD antes de publicar</h2>

<ol>
  <li><p>Valida el vocabulario y la estructura del grafo con el <a href="https://validator.schema.org/">validador de Schema.org</a>.</p></li>
  <li><p>Prueba las funciones admitidas por Google con la <a href="https://search.google.com/test/rich-results?hl=es">prueba de resultados enriquecidos</a>.</p></li>
  <li><p>Compara cada propiedad importante con el contenido visible.</p></li>
  <li><p>Inspecciona la URL publicada, no solamente la vista previa del CMS.</p></li>
  <li><p>Vigila en Search Console los problemas de datos estructurados detectados.</p></li>
</ol>

<p>Si implementas JSON-LD mediante un CMS, escapa los valores dinámicos como JSON y prueba varios registros, no solo el ejemplo más limpio. Las comillas, imágenes ausentes, campos opcionales, traducciones y valores vacíos suelen romper las plantillas. Para ver un proceso de implementación concreto, consulta <a href="/blog/structural-seo-json-ld-framer">SEO estructural y JSON-LD en Framer</a> (en inglés).</p>

<h2>La regla práctica</h2>

<p>Usa JSON-LD para expresar lo que una persona atenta ya puede aprender de la página. Elige la entidad principal, descríbela mediante el tipo correcto más específico, conecta las entidades relacionadas con identificadores estables y detente antes de que el grafo se vuelva especulativo. Los mejores datos estructurados no son los más elaborados, sino los más fáciles de verificar y mantener.</p>
