---
slug: "designing-for-attention-degradation-ux-for-bags-sun-glare-and-3g"
locale: "es"
title: "Diseñar para la degradación de la atención: UX en el mundo real"
description: "Tus usuarios llevan una bolsa, entrecierran los ojos por el reflejo y navegan con 3G. Cómo diseñar para limitaciones situacionales en lugar de condiciones ideales."
date: "2026-07-13T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "ux-research-product-thinking"
tags: []
audio: ""
sourceImage: "/images/framer-migrated/lP2cC0GviVQwqboY3s3K3O8cTA.webp"
imageAlt: "Silueta de una persona frente a un atardecer intenso en Aoulef, Argelia."
image: "/images/blog/designing-for-attention-degradation-ux-for-bags-sun-glare-and-3g-v2.png"
canonical: ""
featured: false
downloadUrl: ""
downloadText: "Descargar recursos de este artículo"
---

<p>Casi todas las revisiones de diseño que he visto ocurren bajo las mismas condiciones: un monitor grande y calibrado, iluminación de oficina, conexión de fibra y una persona cuya única tarea es mirar la pantalla. Casi ningún uso real del producto sucede así. El usuario camina por la calle con un café en una mano, el sol golpea la pantalla desde el peor ángulo posible y la conexión depende de lo que la red haya decidido ofrecer entre dos edificios.</p>

<p>La distancia entre esos dos contextos tiene un nombre dentro de la investigación HCI y produce consecuencias de diseño suficientemente concretas como para actuar sobre ellas.</p>

<h2>Limitaciones situacionales: el marco de investigación</h2>

<p>El término académico es <em>situationally-induced impairments and disabilities</em> o SIIDs: limitaciones inducidas por la situación. Describe cómo el contexto y la actividad pueden degradar las capacidades de una persona hasta hacer que interactúe como alguien con una limitación motora o visual.</p>

<p><a href="https://faculty.washington.edu/wobbrock/pubs/eics-19.01.pdf">El programa de investigación de Jacob Wobbrock en la Universidad de Washington ha estudiado estas condiciones directamente</a>: caminar, distintos agarres, atención dividida, distracciones, intoxicación e incluso agua de lluvia sobre la pantalla. Su planteamiento propone que dispositivos e interfaces puedan detectar y adaptarse a estas situaciones.</p>

<p>El marco resulta útil porque convierte una empatía imprecisa —“diseña para usuarios ocupados”— en condiciones nombrables y comprobables. Una mano ocupada produce una restricción motora. La luz directa crea una restricción visual. Una conexión 3G impone una restricción de ancho de banda. Cada una tiene respuestas de diseño conocidas.</p>

<h2>Restricción uno: la mano ocupada</h2>

<p>El estudio de campo clásico es el de Steven Hoober. <a href="https://alistapart.com/article/how-we-hold-our-gadgets/">En más de 1.300 observaciones en la calle, el 49% de las personas sostenía el teléfono con una sola mano, el 36% lo apoyaba en una mano y tocaba con la otra, y el 15% utilizaba ambos pulgares</a>. Además, cambiaban de agarre constantemente según lo que estuvieran haciendo.</p>

<p>La mitad de la audiencia que navega con una sola mano opera toda la interfaz con un pulgar cuyo alcance cómodo cubre quizá dos tercios de la pantalla.</p>

<p>Las respuestas de diseño son claras: acciones principales en la mitad inferior del viewport, objetivos táctiles dimensionados para un pulgar en movimiento y ninguna interacción crítica que exija precisión en las esquinas superiores. Si el CTA decisivo está arriba a la derecha porque equilibraba bien el mockup de escritorio, muchos usuarios móviles pagan un impuesto físico para convertir.</p>

<h2>Restricción dos: reflejos y visión degradada</h2>

<p>La luz solar sobre una pantalla produce, funcionalmente, una condición de baja visión: el contraste colapsa, la tipografía fina desaparece y una interfaz gris claro sobre blanco se vuelve invisible.</p>

<p>Esto transforma las ratios de contraste. Dejan de ser una casilla de cumplimiento para convertirse en una característica de robustez. Los mínimos de WCAG están calibrados para condiciones controladas; en exteriores sobreviven las interfaces que los superan con margen.</p>

<p>En términos concretos: contraste del cuerpo de texto cómodamente superior a 4.5:1, ninguna información transmitida exclusivamente por color y una mirada escéptica sobre pesos tipográficos ultraligeros que parecen refinados en un monitor de estudio y desaparecen en un teléfono al 50% de brillo bajo el sol.</p>

<h2>Restricción tres: la conexión que nunca pruebas</h2>

<p>Los datos sobre redes lentas son suficientemente antiguos como para ser famosos y suficientemente actuales como para seguir doliendo. Google encontró que <a href="https://blog.google/products/admanager/the-need-for-mobile-speed/">el 53% de las visitas móviles probablemente abandona si una página tarda más de tres segundos, mientras que el sitio móvil promedio tardaba 19 segundos sobre 3G</a>. Su análisis posterior estimó que <a href="https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/app-and-mobile/find-out-how-you-stack-new-industry-benchmarks-mobile-page-speed/">al pasar de uno a siete segundos, la probabilidad de rebote aumenta un 113%</a>.</p>

<p>La respuesta es tratar el presupuesto de rendimiento como un requisito de UX: límites de peso para imágenes, fuentes con fallbacks razonables y una página capaz de mostrar algo útil antes de que termine de llegar todo.</p>

<p>La prueba más barata consiste en limitar tu propia web a Slow 3G desde DevTools y observar lo que realmente aparece durante los primeros cinco segundos. En este sitio, ese ejercicio fue una de las razones para mantener las páginas centradas primero en texto.</p>

<h2>Restricción cuatro: atención fragmentada</h2>

<p>Un usuario que camina y sufre interrupciones no lee flujos completos; vuelve a entrar en ellos. El trabajo de Wobbrock incluye la atención dividida y la distracción junto a las restricciones físicas, y sus implicaciones se parecen: estado capaz de sobrevivir una interrupción, pasos que puedan completarse en pocos segundos y textos escritos para alguien que escanea.</p>

<p>Un formulario debería conservar sus valores cuando la persona cambia de aplicación. Cada paso debería explicar dónde está y qué falta. La acción principal no debería depender de recordar una instrucción leída tres pantallas atrás. La misma atención selectiva que afecta a un check-in también gobierna un checkout dentro de un autobús en movimiento.</p>

<h2>Prueba bajo degradación, no solo en el laboratorio</h2>

<p>Existe un protocolo que puedes ejecutar esta semana sin presupuesto: toma el flujo más importante, úsalo con una mano, al aire libre, bajo una conexión 3G limitada y mientras caminas hacia un lugar al que realmente necesitas llegar.</p>

<p>Anota cada momento en el que debes dejar de caminar, cambiar el agarre o hacer sombra sobre la pantalla. Cada anotación es un punto de fricción que el QA desde un escritorio no puede descubrir por su propia estructura.</p>

<p>Esta práctica combina bien con <a href="/blog/guerrilla-research-low-traffic-validation">la investigación guerrilla cuando el tráfico no ayuda</a> y alimenta directamente la pregunta que desarrollo en <a href="/blog/why-mobile-gets-83-of-your-traffic-but-desktop-converts-2x-better">por qué móvil recibe el 83% del tráfico pero escritorio convierte el doble</a>. Parte de esa diferencia es degradación de atención que el escritorio sencillamente no sufre.</p>

<h2>La consecuencia</h2>

<p>Diseñar para el caso degradado no es diseñar para un caso extremo. Si observamos cómo se utilizan realmente los teléfonos, ese caso está más cerca de la mediana que una revisión de diseño.</p>

<p>Las interfaces que funcionan con una bolsa en la mano, reflejos en la pantalla y una señal débil son más simples, rápidas, contrastadas y tolerantes. Por eso también funcionan mejor en el laboratorio. Lo contrario no es cierto, y esa asimetría contiene todo el argumento.</p>
