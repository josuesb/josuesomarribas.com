---
slug: "jira-tools-copy-organize-open-tickets"
locale: "es"
title: "Jira Tools: copiar tickets con contexto y volver a ellos por ID"
description: "Cómo he diseñado Jira Tools para copiar referencias útiles, reunir tickets y preparar actualizaciones por estado, con Spotlight e historial local."
date: "2026-11-11T09:00:00.000Z"
draft: false
type: "Blog"
cluster: "portfolio-projects-case-studies"
tags: ["Jira Tools", "Ingeniería UX", "Extensión para Chrome"]
audio: ""
sourceImage: "/assets/articles/jira-tools/cover-es.svg"
imageAlt: "Jira Tools: un ticket conectado con una referencia de copia y una actualización por estado"
image: "/assets/articles/jira-tools/cover-es-1400.webp"
canonical: ""
featured: false
downloadUrl: ""
downloadText: ""
---

<p>Compartir un ticket debería ser una acción pequeña. Sin embargo, un enlace suelto suele obligar a quien lo recibe a abrir Jira para entender de qué trata. Si añades el título a mano, después quizá falte el estado, el responsable o el mismo formato que usaste en el mensaje anterior.</p>

<p>He creado <a href="/es/jira-tools">Jira Tools</a> para resolver ese trabajo alrededor del ticket: copiar una referencia útil, reunir varias tareas y abrir una incidencia cuando ya conoces su ID. Es una extensión para Chrome que guarda sus preferencias, bandeja e historial en el navegador.</p>

<p>La versión presentada aquí es la 2.1.0. En el momento de publicar este artículo está en revisión en Chrome Web Store. Las capturas muestran la extensión con datos ficticios.</p>

<h2>Una referencia que se entiende antes de abrirla</h2>

<p>El punto de partida es sencillo: copiar el ID enlazado y el título del ticket actual. Así, quien lee el mensaje tiene una referencia reconocible y puede decidir si necesita entrar en Jira.</p>

<p>El destino del texto también importa. Un documento con editor visual, una nota en Markdown y un campo de texto plano esperan contenidos distintos. En Jira Tools, el formato de copia y la plantilla se eligen por separado: el primero define cómo se escribe el enlace; la segunda, qué información acompaña al ticket.</p>

<p>La plantilla básica incluye el ID y el título. La de Slack añade estado y responsable en una segunda línea. La de documentación prepara una ficha más completa, y la personalizada permite combinar variables como <code>{link}</code>, <code>{title}</code> o <code>{status}</code> con texto propio.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/formats.webp" alt="Ajustes de Jira Tools: texto enriquecido seleccionado, plantilla para Slack y vista previa del ticket con estado y responsable" loading="lazy"><figcaption>Formato y plantilla son decisiones independientes. La vista previa permite revisar la referencia antes de copiarla.</figcaption></figure>

<p>Por ejemplo, puedes dejar una plantilla como esta:</p>

<pre data-language="text"><code>{link} — {title}
Estado: {status}
Responsable: {assignee}</code></pre>

<p>El botón «Copiar ejemplo» permite comprobar el pegado real en la aplicación de destino. La vista previa ayuda, pero que un enlace conserve el formato también depende del editor en el que lo pegues.</p>

<h2>Cuando ya sabes el ID, ve al ticket</h2>

<p>Si alguien menciona <code>ID-123</code> durante una conversación, la siguiente acción puede ser escribir ese ID. Spotlight abre un buscador sobre la página actual, muestra el destino y abre el ticket en una pestaña nueva al pulsar Enter.</p>

<p>Primero hay que guardar el dominio de la instancia en <strong>Ajustes → Jira</strong>. A partir de ahí, el buscador construye la dirección con ese dominio. No comprueba si el ticket existe ni si tienes acceso: eso se resuelve al entrar en Jira.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/spotlight.webp" alt="Buscador Spotlight sobre una página atenuada, con el ID-123, su URL de destino y una sugerencia del historial local" loading="lazy"><figcaption>Spotlight mantiene visible el destino antes de abrirlo. Las sugerencias proceden del historial local, no de una búsqueda en Jira.</figcaption></figure>

<p>El atajo sugerido es <code>⌘⇧O</code> en Mac y <code>Alt+Mayús+O</code> en Windows y Linux. Si la combinación ya está ocupada, se puede cambiar en <code>chrome://extensions/shortcuts</code>. La sección de atajos de la extensión muestra los que están realmente asignados.</p>

<p>También funciona desde la barra de direcciones: escribe <code>jira</code>, pulsa Tab, introduce el ID y pulsa Enter. En páginas protegidas donde Chrome no permite superponer el buscador, la extensión recurre a su popup o a una ventana compacta.</p>

<h2>De varios tickets a una actualización por estado</h2>

<p>Para preparar una daily o un informe, Jira Tools permite añadir tickets a una bandeja. Allí puedes revisar sus datos, quitar los que ya no necesitas y copiar la selección completa con el formato elegido.</p>

<p>Si vuelves a añadir un ticket que ya estaba guardado, se actualiza sin duplicarse ni cambiar su posición. Copiar los tickets tampoco vacía la bandeja: reunir información y llevarla al portapapeles son acciones distintas.</p>

<p>La opción «Actualización por estado» convierte esa selección en apartados como «En curso» y «Hecho», con un contador de tickets en cada grupo. La vista previa permite comprobar qué vas a compartir antes de copiarlo.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/tray.webp" alt="Bandeja con dos tickets ficticios y una vista previa que los agrupa en En curso y Hecho, con el botón Copiar actualización" loading="lazy"><figcaption>La bandeja reúne la selección; la vista previa muestra el informe. Se utiliza el estado guardado al añadir cada ticket.</figcaption></figure>

<p>Ese último detalle es importante para interpretar el informe: los datos son una captura. Si un ticket cambia de estado en Jira, la bandeja no lo consulta en segundo plano. Hay que volver a añadirlo para refrescarlo antes de compartir la actualización.</p>

<h2>Recuperar lo que ya habías copiado</h2>

<p>El historial conserva hasta 100 tickets distintos copiados, con los más recientes primero. Puedes buscar por ID o título, abrir su enlace o volver a copiarlos con la plantilla y el formato que tengas configurados en ese momento.</p>

<figure class="article-editorial-figure"><img src="/assets/articles/jira-tools/history.webp" alt="Historial local de Jira Tools con un buscador por ID o título y tres tickets ficticios, cada uno con acciones para copiar y eliminar" loading="lazy"><figcaption>El historial conserva referencias reutilizables. Sus datos corresponden a la última copia; no se actualizan desde Jira.</figcaption></figure>

<p>La bandeja y el historial tienen propósitos distintos. La primera es una selección que preparas; el segundo permite recuperar referencias que ya copiaste. Borrar el historial no modifica la bandeja, y abrir un ticket sin copiarlo no crea una entrada.</p>

<h2>Decisiones pequeñas que definen la herramienta</h2>

<p>La interfaz mantiene juntas la selección y su resultado: los tickets junto al informe, los ajustes junto a la vista previa y el ID junto a su destino. Es una decisión de diseño para que puedas revisar el resultado en el mismo lugar en el que lo preparas.</p>

<p>El menú del rayo reúne siete acciones y muestra sus atajos. Con el menú abierto, las teclas del 1 al 7 activan cada opción. Al escribir en un campo o en Spotlight, esas teclas dejan de ejecutar las acciones del menú.</p>

<p>La extensión lee información del ticket cuando invocas sus funciones. No modifica tickets, no utiliza un token ni la API de Jira y no envía la bandeja o el historial a un servidor del desarrollador. Las preferencias y los tickets guardados permanecen en el navegador. Puedes consultar los detalles en la <a href="/jira-tools/privacy">política de privacidad</a>.</p>

<p>Hay límites concretos: algunas vistas de Jira pueden requerir adaptar los selectores que leen los campos, las instalaciones con un prefijo de ruta no están cubiertas por la configuración actual de Spotlight y los atajos dependen de los conflictos del perfil de Chrome. La compatibilidad con tu instancia y con el editor donde pegues debe comprobarse en ese entorno.</p>

<h2>Qué puedes ver ahora</h2>

<p>La <a href="/es/jira-tools">página de Jira Tools</a> reúne las funciones y el estado de publicación. Mientras la extensión está en revisión, allí se indica que la instalación desde Chrome Web Store todavía no está disponible.</p>

<p>La apuesta del proyecto está en ese recorrido corto: salir de Jira con una referencia que se entienda y volver a un ticket sin reconstruir el camino. El formato, la bandeja y el historial se encargan de conservar el contexto entre ambos momentos.</p>
