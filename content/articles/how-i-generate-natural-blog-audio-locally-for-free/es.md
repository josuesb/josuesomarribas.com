---
slug: "how-i-generate-natural-blog-audio-locally-for-free"
locale: "es"
title: "Cómo genero audio natural para mi blog gratis y en local"
description: "Un flujo práctico para generar narraciones naturales localmente en un Mac con Apple Silicon usando Kokoro, MLX Audio, exportación automática a MP3 y ninguna API de voz de pago."
date: "2026-08-28T00:00:00.000Z"
draft: false
type: "Blog"
cluster: "framer-cms-technical-seo"
tags: ["TTS local", "Kokoro", "Accesibilidad", "Audio para blogs"]
audio: "/audio/blog/es/how-i-generate-natural-blog-audio-locally-for-free.mp3"
sourceImage: "/images/blog/how-i-generate-natural-blog-audio-locally-for-free-1400.webp"
imageAlt: "Ilustración editorial que representa la transformación local de un artículo escrito en una onda de audio dentro de un ordenador."
image: "/images/blog/how-i-generate-natural-blog-audio-locally-for-free-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>Quería tener un botón Listen de verdad en mi blog, pero no quería que cada clic activara una solicitud de texto a voz de pago. Tampoco quería que el resultado dependiera de la voz robótica que tuviera instalada el navegador de cada visitante.</p><p>La solución resultó ser bastante práctica: generar la narración localmente en mi Mac, exportar un MP3 optimizado por artículo y servirlo como un archivo estático normal. La generación no cuesta dinero, la voz se mantiene consistente y la web sólo tiene que reproducir un archivo.</p><p>En este artículo explico el flujo exacto que construí con Kokoro, MLX Audio, Python y FFmpeg.</p>

<h2>La idea: generar una vez y reproducir todas las veces necesarias</h2>

<p>La síntesis de voz del navegador es cómoda, pero ofrece muy poco control. La voz disponible cambia entre sistemas operativos y navegadores. El ritmo, la pronunciación y la calidad también cambian.</p><p>Una API de voz con inteligencia artificial aporta más consistencia, pero añade otro servicio, límites de uso, credenciales y un coste recurrente. Puede tener sentido para un producto dinámico. Me parecía innecesario para artículos que apenas cambian.</p><p>La narración estática cambia el modelo:</p><ol><li><p>Preparar un texto limpio para narración.</p></li><li><p>Generar la voz localmente.</p></li><li><p>Comprimirla en un MP3.</p></li><li><p>Guardar el audio terminado con la web.</p></li><li><p>Permitir que todas las personas escuchen la misma grabación revisada.</p></li></ol><p>No existe ningún proceso de texto a voz en producción ni una llamada a una API cuando alguien pulsa Play.</p>

<h2>La tecnología local</h2>

<p>Utilizo <a href="https://github.com/Blaizzy/mlx-audio">MLX Audio</a>, una biblioteca de voz construida sobre el framework MLX de Apple, junto con el modelo de texto a voz Kokoro. Kokoro es compacto en comparación con muchos modelos modernos y sus pesos están disponibles bajo licencia Apache 2.0. MLX permite ejecutarlo de forma práctica en un Mac con Apple Silicon.</p><p>FFmpeg se encarga de la compresión final. Python ejecuta el script de automatización, pero ni Python ni el modelo necesitan existir en Vercel. Sólo se publican los MP3 resultantes.</p><p>Para inglés utilizo por defecto <strong>George</strong>, una voz masculina británica identificada como <code>bm_george</code>. Para español utilizo la voz masculina <code>em_alex</code>. Ambas funcionan a una velocidad de 0,95, que deja respirar un poco más al contenido técnico sin hacerlo sonar lento.</p>

<h2>Instalación inicial</h2>

<p>En un Mac con Apple Silicon instalo Python 3.12 y FFmpeg mediante Homebrew:</p><pre><code>brew install python@3.12 ffmpeg</code></pre><p>Después creo un entorno virtual específico para el proyecto e instalo las herramientas locales de voz:</p><pre><code>/opt/homebrew/bin/python3.12 -m venv .venv-tts
.venv-tts/bin/python -m pip install --upgrade pip
.venv-tts/bin/pip install mlx-audio "misaki[en]" soundfile</code></pre><p>La primera ejecución descarga el modelo y las voces. Las siguientes reutilizan la caché local y arrancan más rápido.</p>

<h2>El flujo basado en carpetas</h2>

<p>Quería que el proceso fuera lo bastante aburrido como para usarlo de verdad. Los textos de narración entran en carpetas separadas por idioma:</p><pre><code>audio-source/
├── en/
│   └── article-slug.txt
└── es/
    └── article-slug.txt</code></pre><p>Después ejecuto un solo comando desde la raíz del proyecto:</p><pre><code>npm run audio:generate</code></pre><p>El generador detecta el idioma por la carpeta, selecciona la voz correcta, crea internamente un WAV, lo convierte en un MP3 de 96 kilobits y escribe el archivo público aquí:</p><pre><code>public/audio/blog/en/article-slug.mp3
public/audio/blog/es/article-slug.mp3</code></pre><p>La web puede cargarlo desde <code>/audio/blog/es/article-slug.mp3</code> como cualquier otro recurso público.</p>

<h2>Una cola, una carpeta done y una checklist</h2>

<p>Generar decenas de artículos largos lleva tiempo, así que el script trata las carpetas de origen como una cola. Cuando un MP3 se crea correctamente, el texto utilizado se mueve a una subcarpeta llamada <code>done</code>.</p><p>El script también mantiene una checklist en formato JSON. Registra una huella calculada a partir de la narración, el idioma, la voz, la velocidad y el modelo. Si vuelve a aparecer el mismo archivo con la misma configuración, el generador lo reconoce y no pierde tiempo repitiendo el audio.</p><p>Si cambio el texto, la voz o la velocidad, la huella cambia y el artículo puede generarse de nuevo. También puedo forzar una regeneración deliberada:</p><pre><code>npm run audio:generate -- --force audio-source/es/article-slug.txt</code></pre><p>Esto importa cuando la cola contiene un archivo editorial completo. Una simple fecha de modificación no basta; la checklist hace explícito el historial de generación.</p>

<h2>Preparar texto para ser escuchado</h2>

<p>Un buen resultado de texto a voz no depende solamente de la voz. Una página y una narración son interfaces distintas.</p><p>Mi generador acepta texto plano, Markdown o HTML. Elimina metadatos, etiquetas HTML, imágenes y bloques de código antes de enviar el contenido al modelo. Incluye el título, pero excluye los detalles de implementación que no tienen sentido en voz alta.</p><p>Aun así, reviso algunos problemas previsibles:</p><ul><li><p>Los encabezados deben funcionar como transiciones habladas.</p></li><li><p>Puede ser necesario expandir siglas o escribirlas fonéticamente.</p></li><li><p>Nunca deberían leerse direcciones URL completas.</p></li><li><p>Las listas largas necesitan puntuación y espacio para respirar.</p></li><li><p>El código debe explicarse, no narrarse carácter por carácter.</p></li></ul><p>Ni la voz más natural puede rescatar un texto que nunca fue preparado para escucharse.</p>

<h2>Qué significa realmente gratis</h2>

<p>La generación es local y no utiliza una API de pago. No existe un coste por carácter, minuto o reproducción. El modelo funciona en un ordenador que ya tengo.</p><p>Eso no significa que el audio tenga literalmente cero coste de infraestructura. Los MP3 ocupan espacio en el repositorio o almacenamiento, y las personas utilizan el ancho de banda normal del hosting al escucharlos. Un MP3 de 96 kilobits es suficientemente ligero para este caso, pero continúa siendo un archivo que hay que entregar.</p><p>La diferencia importante es que escuchar no activa una inferencia. Cien oyentes y un oyente utilizan el mismo recurso terminado.</p>

<h2>Control de calidad antes de publicar</h2>

<p>No publico la primera generación a ciegas. Mi checklist de audio es breve:</p><ul><li><p>Escuchar el inicio, una transición entre secciones y el cierre.</p></li><li><p>Comprobar nombres, siglas, productos y números.</p></li><li><p>Confirmar que no se lee código ni una URL.</p></li><li><p>Asegurar que el reproductor nunca comienza automáticamente.</p></li><li><p>Mantener Play, Pause, duración, progreso y velocidad accesibles mediante teclado.</p></li><li><p>Conservar el artículo escrito como versión canónica.</p></li></ul><p>Si una palabra suena mal, edito fonéticamente el texto privado para narración sin cambiar el artículo visible. Esa separación es útil: la precisión escrita y la pronunciación hablada no siempre necesitan la misma ortografía.</p>

<h2>Dónde funciona mejor este enfoque</h2>

<p>La narración estática y local encaja bien en portfolios, documentación, blogs editoriales y contenido relativamente estable. Aporta una calidad consistente sin añadir un servicio de ejecución a la web.</p><p>Es menos adecuada cuando el texto cambia constantemente, las personas generan contenido arbitrario o el audio debe personalizarse en tiempo real. Esos productos necesitan un sistema de voz en servidor o una API.</p><p>Para mi blog, el audio estático ofrece el equilibrio correcto. Controlo la voz, reviso el resultado una vez y mantengo sencilla la producción. La parte sofisticada sucede localmente. La web solamente reproduce un archivo, que es exactamente el tipo de arquitectura aburrida en la que confío.</p>
