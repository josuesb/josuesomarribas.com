---
slug: "statistical-significance-for-skeptics-when-flat-data-is-a-success-signal"
locale: "es"
title: "Significancia estadística para escépticos: cuando un resultado plano gana"
description: "La mayoría de los tests A/B terminan sin diferencias significativas. Qué significa realmente un resultado plano y cuándo es precisamente la señal de éxito que buscabas."
date: "2026-07-17T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "cro-ab-testing-experimentation"
tags: []
audio: ""
sourceImage: "/images/framer-migrated/TYUoX187SQ5fKCAzvkBa39zRlw.webp"
imageAlt: "Ilustración editorial abstracta sobre diseño de producto digital y experimentación."
image: "/images/blog/default-cover-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: "Descargar recursos de este artículo"
---

<p>El resultado más frecuente de un test A/B bien ejecutado es nada. No aparece una diferencia significativa, los intervalos se solapan y el dashboard se niega educadamente a declarar un ganador. Muchos equipos interpretan esto como un fracaso, lo comunican pidiendo disculpas y dejan de experimentar poco a poco. Las tres reacciones interpretan mal los datos, y ese error cuesta más que el test plano.</p>

<p>Esta es una guía para escépticos sobre resultados planos: qué deberíamos esperar según las tasas base, qué afirma realmente “no existe una diferencia significativa” y en qué situaciones una lectura plana es la señal de éxito que queríamos encontrar.</p>

<h2>Primero, calibra tus expectativas: lo plano es la norma</h2>

<p>Los datos públicos más sólidos proceden de Ronny Kohavi, que construyó plataformas de experimentación en Microsoft, Bing y Airbnb. En el programa de Microsoft, <a href="https://exp-platform.com/Documents/2015-08OnlineControlledExperimentsKDDKeynoteNR.pdf">aproximadamente un tercio de las ideas produjo un resultado positivo estadísticamente significativo, otro tercio quedó plano y el resto fue significativamente negativo</a>. La tasa de éxito de Bing era todavía menor. Más recientemente, Kohavi ha situado en <a href="https://www.growthbook.io/blog/designing-a-b-testing-experiments-for-long-term-growth">alrededor del 10% la proporción de experimentos que mueve la métrica objetivo en una organización mediana</a>.</p>

<p>Conviene recordar ese segundo número porque tiene una consecuencia incómoda. Con una tasa base de éxito del 10% y umbrales convencionales, <a href="https://www.growthbook.io/blog/designing-a-b-testing-experiments-for-long-term-growth">el riesgo de falso positivo ronda el 22%: aproximadamente una de cada cinco “victorias significativas” puede ser falsa</a>. La primera lección escéptica funciona en ambas direcciones: hay que sufrir menos ante los planos y celebrar con algo menos de euforia los ganadores.</p>

<p>La recompensa de atravesar tantos experimentos fallidos es real. El conocido test de titulares publicitarios de Bing, <a href="https://hbr.org/2017/09/the-surprising-power-of-online-experiments">un cambio tan poco prometedor que permaneció meses en el backlog, incrementó los ingresos un 12% y generó más de 100 millones de dólares anuales</a>. Solo encuentras resultados así si ejecutas suficientes tests como para aceptar muchos planos durante el camino.</p>

<h2>Qué dice realmente un resultado plano</h2>

<p>“No estadísticamente significativo” significa que, si en realidad no existiera ninguna diferencia, unos datos como los observados no resultarían sorprendentes. No significa que las variantes sean iguales. Significa que cualquier diferencia es menor de lo que el tamaño de la muestra permite detectar con fiabilidad.</p>

<p>Ese umbral —el efecto mínimo detectable o MDE— se fijó, de manera explícita o accidental, cuando decidiste cuánto tiempo ejecutar el test. Un resultado plano en un test sin potencia suficiente informa principalmente sobre tu tráfico, una dinámica que explico con cifras reales en <a href="/blog/how-an-a-b-test-really-looks-when-you-don-t-have-enough-data">cómo se ve un test A/B cuando no tienes suficientes datos</a>.</p>

<p>De aquí salen dos reglas. Primera: nunca interpretes un resultado plano sin declarar el MDE. “No detectamos diferencias y teníamos potencia para detectar cualquier cambio superior al 8%” aporta información. “No hubo diferencia” es ruido vestido con traje.</p>

<p>Segunda: respeta la regla de parada definida de antemano. Revisar el test a diario y detenerlo en cuanto aparece significancia aumenta mucho la tasa de falsos positivos. Es la trampa que Evan Miller documentó en <a href="https://www.evanmiller.org/how-not-to-run-an-ab-test.html">How Not To Run an A/B Test</a> y convierte tests realmente planos en ganadores ficticios.</p>

<h2>Cuándo un resultado plano es la victoria</h2>

<p>Existe una clase de experimentos cuya hipótesis es de no inferioridad: quieres demostrar que la nueva versión no es peor porque mejora algo que la métrica primaria no captura. En esos casos, mantener plana la métrica principal es precisamente la forma que tiene el éxito.</p>

<ul><li><p><strong>La variante más barata.</strong> Eliminaste un widget externo, un script pesado o un paso con coste operativo. La conversión se mantiene: publícala. Has conseguido los mismos ingresos con menos coste y complejidad.</p></li><li><p><strong>La simplificación.</strong> El nuevo formulario tiene cuatro campos en lugar de nueve. Una conversión plana con menos mantenimiento y un código más limpio es una victoria que acumula valor silenciosamente.</p></li><li><p><strong>La comprobación de riesgo.</strong> Texto legal, una nueva presentación del precio o un elemento de rebranding. El test era un seguro para comprobar que el cambio no dañaba el negocio. Plano significa vía libre.</p></li><li><p><strong>El mito desmontado.</strong> Alguien estaba convencido de que el carrusel, el vídeo o el badge sostenía la conversión. El resultado demuestra que no. Ahora puedes eliminarlo y la siguiente discusión será más corta.</p></li></ul>

<p>Una disciplina mantiene esto honesto: declara la no inferioridad antes de ejecutar el test, no después. “No perjudicó nada” puede convertirse fácilmente en una excusa para lanzar preferencias personales sin evidencia. La diferencia está en si “plano = éxito” formaba parte de la hipótesis o apareció como consuelo posterior.</p>

<p>Las métricas de guardrail también importan. Una primaria plana acompañada por el deterioro de una métrica de seguridad sigue siendo una derrota, justo el territorio de <a href="/blog/the-metrics-you-re-not-watching-are-the-ones-that-will-hurt-you">las métricas que no estás vigilando</a>.</p>

<h2>Cómo comunicar un plano sin pedir perdón</h2>

<p>Un resultado plano bien comunicado incluye el MDE, el planteamiento de no inferioridad cuando corresponda, la lectura de los guardrails y una decisión: publicar la variante más barata, mantener el control o diseñar una intervención con un cambio mayor.</p>

<p>Presentado así, se entiende por lo que es: el experimento hizo su trabajo. Su trabajo era responder una pregunta y la respuesta llegó. Desarrollé una plantilla completa en <a href="/blog/the-professional-maturity-of-reporting-an-inconclusive-test">la madurez profesional de comunicar un test inconcluso</a> y una estrategia para poco tráfico en <a href="/blog/cro-when-you-don-t-have-the-traffic-optimizing-a-site-that-nobody-visits-yet">CRO cuando todavía no tienes tráfico</a>.</p>

<h2>La consecuencia</h2>

<p>Si aproximadamente un tercio de los tests honestos termina plano, la métrica principal de un programa de experimentación no puede ser su porcentaje de ganadores. Perseguir esa cifra solo enseña a los equipos a probar cambios pequeños, seguros e imposibles de refutar.</p>

<p>Un KPI mejor es el número de decisiones validadas por trimestre. Un resultado plano que elimina una mala idea, reduce el riesgo de un lanzamiento o autoriza una simplificación debe contar con todo su valor. La significancia es un filtro aplicado a la evidencia, no un veredicto sobre si el trabajo merecía hacerse.</p>
