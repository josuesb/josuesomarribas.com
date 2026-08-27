---
slug: "json-ld-for-case-studies-specific-schema-for-ux-portfolios"
locale: "es"
title: "JSON-LD para casos de estudio: schema para portfolios UX"
description: "Schema.org no tiene un tipo CaseStudy. Esta es una receta práctica para representar casos de estudio UX con datos estructurados y expectativas realistas."
date: "2026-07-25T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: []
audio: ""
sourceImage: "https://framerusercontent.com/images/4iuRiUEdT8mg63cHw6Mew0A8UI.png"
imageAlt: "Una archivista cataloga piezas de un caso de estudio UX, como metáfora del schema JSON-LD para portfolios."
image: "/images/blog/default-cover.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p dir="auto">Los casos de estudio son las páginas de mayor riesgo en el sitio de una persona que diseña. Un recruiter o cliente llega, decide en minutos y se marcha. Sin embargo, suelen ser también las páginas menos legibles para las máquinas: largos recorridos de imágenes y texto sin nada que explique qué se creó, quién lo hizo, con qué herramientas o para obtener qué resultado. Los datos estructurados solucionan esa mitad del problema, aunque un portfolio UX presenta una complicación inmediata.</p><h2 dir="auto">La complicación: no existe el tipo CaseStudy</h2><p dir="auto">Schema.org no define un tipo CaseStudy. Hay que elegir dentro del vocabulario existente y Google restringe todavía más la elección: <a href="https://developers.google.com/search/docs/appearance/structured-data/article">para el marcado de artículos, el objeto debe basarse en Article, NewsArticle o BlogPosting</a>.</p><p dir="auto">También conviene ajustar las expectativas. De los cientos de tipos que define Schema.org, sólo una pequeña parte puede producir resultados enriquecidos visibles en Google. Para un portfolio, el valor principal del schema no es decorar la SERP, sino aportar claridad de entidades: ayudar a las máquinas a entender quién eres y qué creaste. Esto ha ganado importancia ahora que los asistentes de IA también funcionan como canal de descubrimiento.</p><h2 dir="auto">La receta: un Article sobre un CreativeWork, creado por una Person</h2><p dir="auto">El modelo adecuado es por capas: la propia página es un BlogPosting o Article; el proyecto descrito es un <a href="https://schema.org/CreativeWork">CreativeWork</a> anidado; y tú eres una Person vinculada a ambos. Esta última entidad importa especialmente porque fija la identidad que el portfolio pretende demostrar.</p><pre data-language="HTML"><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Cómo la investigación definió mi plataforma de viajes",
  "description": "Un caso sobre convertir entrevistas en decisiones de producto.",
  "author": {
    "@type": "Person",
    "name": "Josue Somarribas",
    "url": "https://josuesomarribas.com",
    "jobTitle": "UX Engineer y especialista CRO",
    "sameAs": ["https://www.linkedin.com/in/tu-perfil"]
  },
  "about": {
    "@type": "CreativeWork",
    "name": "Concepto de plataforma de viajes",
    "creator": { "@type": "Person", "name": "Josue Somarribas" },
    "keywords": "investigación UX, viajes, diseño de producto"
  },
  "image": "https://tu-cdn/portada.jpg",
  "datePublished": "2025-01-31",
  "inLanguage": "es"
}
&lt;/script&gt;</code></pre><p dir="auto">Los campos que justifican su peso en un portfolio son <strong>about</strong>, que representa el proyecto como entidad propia; <strong>sameAs</strong> en Person, que une el sitio con tu perfil público; <strong>keywords</strong>, alineado con tus capacidades reales; e <strong>inLanguage</strong>, especialmente útil en una web bilingüe. Evita valoraciones, ofertas o cualquier dato que no aparezca de forma visible en la página.</p><h2 dir="auto">Implementación en Framer</h2><p dir="auto">Framer no genera JSON-LD de forma nativa. El script se añade mediante un code embed en la plantilla CMS y las variables del CMS rellenan los campos dinámicos. Los casos y los artículos pueden compartir un script de plantilla cambiando el @type según la colección. En un sitio localizado, inLanguage y las URLs deben seguir el idioma activo.</p><p dir="auto">Valida el resultado con la prueba de resultados enriquecidos de Google después de publicar y vuelve a validarlo cuando cambie la plantilla: renombrar un solo campo CMS puede romper silenciosamente todas las páginas.</p><h2 dir="auto">Qué evitaría</h2><p dir="auto">No intentes marcarlo todo. AggregateRating sin valoraciones visibles, HowTo sobre cualquier proceso o preguntas frecuentes añadidas sólo para el schema van desde lo inútil hasta lo arriesgado. Un grafo pequeño y verdadero que las máquinas puedan confiar supera a uno ambicioso que deban descontar.</p><h2 dir="auto">La implicación</h2><p dir="auto">En un portfolio UX hay un efecto adicional: los datos estructurados son también una muestra de trabajo. Un caso impecablemente marcado demuestra, desde el propio código fuente, el pensamiento sistémico que el texto afirma tener. Poca gente mira el código, pero esa audiencia se solapa bastante con la que contrata.</p>
