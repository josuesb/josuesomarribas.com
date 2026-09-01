export type LabLocale = "en" | "es";
export type LabCategory = "utilities" | "experiments";

type Localized = { en:string; es:string };

export type LabTool = {
  slug:string;
  id:string;
  number:string;
  category:LabCategory;
  status:"live" | "concept";
  name:Localized;
  description:Localized;
  image:string;
  imageAlt:Localized;
  externalUrl?:string;
  articleUrl?:Localized;
  problem:Localized;
  features:{ en:string[]; es:string[] };
  limits:{ en:string[]; es:string[] };
  architecture:Localized;
  stack:string[];
};

export const labTools:LabTool[] = [
  {
    slug:"five-seconds-tester", id:"seconds", number:"01", category:"experiments", status:"live", name:{en:"5 Seconds Tester",es:"Test de 5 segundos"},
    description:{en:"Test whether a message is understood in five seconds—before traffic, polish or persuasion hide the problem.",es:"Comprueba si un mensaje se entiende en cinco segundos, antes de que el tráfico, el acabado o la persuasión oculten el problema."},
    image:"/assets/project-previews/5-seconds-tester.webp", imageAlt:{en:"5 Seconds Tester interface",es:"Interfaz de Test de 5 segundos"}, externalUrl:"https://www.fivesecondtester.com/",
    problem:{en:"Teams often debate whether a page communicates clearly without observing what people actually notice first. A five-second exposure reveals the message that survives before considered reading begins.",es:"Los equipos suelen debatir si una página comunica con claridad sin observar qué percibe primero la gente. Una exposición de cinco segundos revela el mensaje que permanece antes de que empiece la lectura deliberada."},
    features:{en:["Upload a design and run a focused first-impression test.","Collect unaided recall instead of leading respondents.","Review patterns in what people noticed, missed or misunderstood."],es:["Sube un diseño y ejecuta una prueba enfocada en la primera impresión.","Recoge recuerdos espontáneos sin dirigir las respuestas.","Revisa patrones sobre lo que las personas notaron, omitieron o malinterpretaron."]},
    limits:{en:["A five-second test measures immediate comprehension, not task usability.","Results need a clear research question and a relevant participant sample."],es:["Una prueba de cinco segundos mide comprensión inmediata, no usabilidad de tareas.","Los resultados necesitan una pregunta clara y una muestra de participantes relevante."]},
    architecture:{en:"A focused web application built with Next.js and TypeScript and deployed on Vercel.",es:"Una aplicación web enfocada, construida con Next.js y TypeScript y desplegada en Vercel."}, stack:["Next.js","TypeScript","Vercel"]
  },
  {
    slug:"font-tester", id:"font", number:"02", category:"utilities", status:"live", name:{en:"Font Tester",es:"Probador de tipografías"},
    description:{en:"Compare typefaces with real content, fine-tune size and spacing, and test readability.",es:"Compara tipografías con contenido real, ajusta tamaño y espaciado y prueba la legibilidad."},
    image:"/assets/project-previews/font-tester.webp", imageAlt:{en:"Font Tester interface",es:"Interfaz del probador de tipografías"}, externalUrl:"https://fonts.josuesomarribas.com/?color=%23111111&bgColor=%23ffffff",
    problem:{en:"Type choices are often made from specimen sheets that do not resemble the interface where the font will live. This tool puts typography back into realistic content and layout conditions.",es:"Las tipografías suelen elegirse en muestras que no se parecen a la interfaz donde vivirán. Esta herramienta devuelve la tipografía a condiciones reales de contenido y maquetación."},
    features:{en:["Compare multiple typefaces against the same text.","Adjust size, line height, spacing, text and colors.","Share a configured view through URL parameters."],es:["Compara varias tipografías con el mismo texto.","Ajusta tamaño, interlineado, espaciado, texto y colores.","Comparte una vista configurada mediante parámetros de URL."]},
    limits:{en:["Readability still needs testing with real users and devices.","A browser preview cannot reproduce every rendering difference between platforms."],es:["La legibilidad todavía debe probarse con usuarios y dispositivos reales.","Una vista en navegador no reproduce todas las diferencias de renderizado entre plataformas."]},
    architecture:{en:"A lightweight browser-based typography utility with shareable state.",es:"Una utilidad tipográfica ligera que funciona en el navegador y permite compartir su estado."}, stack:["Web fonts","CSS","JavaScript"]
  },
  {
    slug:"local-blog-audio", id:"audio", number:"03", category:"utilities", status:"live", name:{en:"Local Blog Audio Generator",es:"Generador local de audio"},
    description:{en:"Generate natural-sounding article narration locally, privately and without a per-use fee.",es:"Genera narraciones naturales de artículos localmente, con privacidad y sin coste por uso."},
    image:"/assets/writing-editorial/06-ssml-audio.svg", imageAlt:{en:"Audio waveform and narration controls",es:"Onda de audio y controles de narración"}, articleUrl:{en:"/blog/how-i-generate-natural-blog-audio-locally-for-free",es:"/es/blog/how-i-generate-natural-blog-audio-locally-for-free"},
    problem:{en:"Browser text-to-speech is convenient but inconsistent. Cloud narration can become costly and sends editorial content to a third party. The local workflow creates reusable audio files on the author's own machine.",es:"El texto a voz del navegador es práctico pero inconsistente. La narración en la nube puede ser costosa y envía el contenido a terceros. Este flujo local crea archivos reutilizables en el propio ordenador del autor."},
    features:{en:["Turn queued article text into publishable MP3 files.","Choose language-specific voices for English and Spanish.","Move completed sources to a done folder and avoid duplicate generations."],es:["Convierte textos de artículos en cola en archivos MP3 publicables.","Elige voces específicas para inglés y español.","Mueve las fuentes terminadas a una carpeta done y evita generaciones duplicadas."]},
    limits:{en:["Generation speed depends on the computer and article length.","Pronunciation and pacing still need a listening pass before publishing."],es:["La velocidad depende del ordenador y de la longitud del artículo.","La pronunciación y el ritmo todavía requieren una revisión antes de publicar."]},
    architecture:{en:"A local Python and FFmpeg pipeline triggered through an npm command; generated MP3 files become static site assets.",es:"Un flujo local con Python y FFmpeg ejecutado mediante npm; los MP3 generados se convierten en recursos estáticos del sitio."}, stack:["Python","MLX Audio","Kokoro","FFmpeg"]
  },
  {
    slug:"experiment-preflight", id:"preflight", number:"04", category:"experiments", status:"live", name:{en:"Experiment Preflight",es:"Preflight de experimentos"},
    description:{en:"Check whether an A/B test has enough traffic and time to detect an effect that would actually be worth shipping.",es:"Comprueba si un test A/B tiene suficiente tráfico y tiempo para detectar un efecto que realmente justificaría implementar."},
    image:"/assets/lab/experiment-preflight.webp", imageAlt:{en:"Experiment Preflight calculator",es:"Calculadora Preflight de experimentos"}, externalUrl:"https://experiments.josuesomarribas.com/",
    problem:{en:"Many experiments begin with a variant but no honest answer to whether the available traffic can resolve the decision. Preflight makes that constraint visible before implementation work begins.",es:"Muchos experimentos comienzan con una variante, pero sin saber si el tráfico disponible puede resolver la decisión. Preflight hace visible esa limitación antes de comenzar la implementación."},
    features:{en:["Estimate required sample size and runtime.","Connect minimum detectable effect to business relevance.","Expose assumptions before a test is added to the roadmap."],es:["Estima el tamaño de muestra y la duración necesarios.","Conecta el efecto mínimo detectable con su relevancia para el negocio.","Expone los supuestos antes de añadir un test al roadmap."]},
    limits:{en:["Estimates do not replace a complete experimental design review.","Traffic seasonality, novelty and interference still require judgment."],es:["Las estimaciones no sustituyen una revisión completa del diseño experimental.","La estacionalidad, la novedad y la interferencia todavía requieren criterio."]},
    architecture:{en:"A small static decision-support tool that runs calculations in the browser.",es:"Una pequeña herramienta estática de apoyo a decisiones que ejecuta los cálculos en el navegador."}, stack:["Static web app","Experiment statistics","Vercel"]
  },
  {
    slug:"fouc-simulator", id:"fouc", number:"05", category:"experiments", status:"concept", name:{en:"FOUC Simulator",es:"Simulador de FOUC"},
    description:{en:"See how content flicker contaminates perception, behavior and experiment validity.",es:"Observa cómo el parpadeo contamina la percepción, el comportamiento y la validez del experimento."},
    image:"/assets/writing-editorial/01-fouc-original-flicker-variant.svg", imageAlt:{en:"Sequence showing original content flickering into an experiment variant",es:"Secuencia del contenido original parpadeando antes de una variante"}, articleUrl:{en:"/blog/the-cost-of-fouc-how-content-flicker-kills-test-validity",es:"/es/blog/the-cost-of-fouc-how-content-flicker-kills-test-validity"},
    problem:{en:"When a visitor sees the control before the variant appears, exposure is no longer clean. The simulator concept makes that invisible validity problem tangible.",es:"Cuando un visitante ve el control antes de que aparezca la variante, la exposición deja de ser limpia. El concepto hace tangible ese problema invisible de validez."},
    features:{en:["Compare clean and flickering variant delivery.","Adjust the delay before the treatment appears.","Connect visible flicker to measurement and behavior risks."],es:["Compara una entrega limpia con una variante que parpadea.","Ajusta el retraso antes de que aparezca el tratamiento.","Relaciona el parpadeo visible con riesgos de medición y comportamiento."]},
    limits:{en:["This is currently an explanatory concept, not a production diagnostic.","Actual flicker must be measured on the target site and network conditions."],es:["Actualmente es un concepto explicativo, no un diagnóstico de producción.","El parpadeo real debe medirse en el sitio y las condiciones de red objetivo."]},
    architecture:{en:"An interactive concept derived from the research and implementation notes in the accompanying article.",es:"Un concepto interactivo derivado de la investigación y las notas de implementación del artículo relacionado."}, stack:["A/B testing","Performance","Behavioral UX"]
  },
  {
    slug:"url-concat", id:"concat", number:"06", category:"utilities", status:"live", name:{en:"URL Concat Tool",es:"Generador masivo de URLs"},
    description:{en:"Turn Excel or CSV rows into parameterized URLs from a reusable template. Files stay entirely inside the browser.",es:"Convierte filas de Excel o CSV en URLs parametrizadas usando una plantilla reutilizable. Los archivos permanecen en el navegador."},
    image:"/assets/lab/concat.webp", imageAlt:{en:"Bulk URL generator interface",es:"Interfaz del generador masivo de URLs"}, externalUrl:"https://concat.josuesomarribas.com/",
    problem:{en:"Building hundreds of campaign, catalog or personalized URLs by hand is slow and error-prone. URL Concat treats spreadsheet columns as variables in a reusable URL template.",es:"Crear a mano cientos de URLs de campañas, catálogos o enlaces personalizados es lento y propenso a errores. URL Concat usa las columnas de una hoja como variables en una plantilla reutilizable."},
    features:{en:["Read the first sheet of Excel or CSV files.","Automatically match template variables with column headers.","Preview, copy and export generated URLs as CSV.","Optionally encode spaces, accents and special characters."],es:["Lee la primera hoja de archivos Excel o CSV.","Asocia automáticamente variables de la plantilla con encabezados.","Previsualiza, copia y exporta las URLs generadas como CSV.","Codifica opcionalmente espacios, acentos y caracteres especiales."]},
    limits:{en:["Only the first spreadsheet sheet is processed.","Changing the template resets manual column mappings.","Duplicate or empty headers can produce ambiguous mappings."],es:["Solo procesa la primera hoja del archivo.","Cambiar la plantilla reinicia las asociaciones manuales.","Los encabezados duplicados o vacíos pueden producir asociaciones ambiguas."]},
    architecture:{en:"A single static HTML application using SheetJS. Files are processed locally in the browser and are never uploaded.",es:"Una aplicación HTML estática que usa SheetJS. Los archivos se procesan localmente en el navegador y nunca se suben."}, stack:["HTML","CSS","JavaScript","SheetJS"]
  },
  {
    slug:"utm-builder", id:"utm", number:"07", category:"utilities", status:"live", name:{en:"UTM Builder & Validator",es:"Generador y validador UTM"},
    description:{en:"Build campaign URLs, detect naming and encoding problems, and preview how their values will appear in GA4.",es:"Crea enlaces de campaña, detecta problemas de nomenclatura y encoding y previsualiza sus valores en GA4."},
    image:"/assets/lab/utm-builder.webp", imageAlt:{en:"UTM campaign URL builder",es:"Generador de URLs UTM para campañas"}, externalUrl:"https://utm.josuesomarribas.com/",
    problem:{en:"Campaign attribution degrades when teams improvise capitalization, spaces and naming conventions. This builder validates the inputs while keeping the final link visible and easy to copy.",es:"La atribución se degrada cuando los equipos improvisan mayúsculas, espacios y convenciones. Este generador valida los datos y mantiene el enlace final visible y fácil de copiar."},
    features:{en:["Create properly encoded campaign URLs.","Detect existing UTM parameters and remove them from the base URL.","Flag spaces, uppercase letters and special characters.","Preview how source, medium and campaign will appear in GA4."],es:["Crea URLs de campaña correctamente codificadas.","Detecta UTMs existentes y permite eliminarlas de la URL base.","Señala espacios, mayúsculas y caracteres especiales.","Previsualiza cómo aparecerán source, medium y campaign en GA4."]},
    limits:{en:["Warnings do not automatically enforce an organization's naming taxonomy.","Only missing or invalid required inputs block URL generation."],es:["Las advertencias no imponen automáticamente la taxonomía de cada organización.","Solo los datos obligatorios ausentes o inválidos bloquean la generación."]},
    architecture:{en:"A responsive vanilla HTML, CSS and JavaScript tool with no backend or stored data.",es:"Una herramienta responsive en HTML, CSS y JavaScript puro, sin backend ni datos almacenados."}, stack:["HTML","CSS","JavaScript","GA4"]
  },
  {
    slug:"browser-debug", id:"debug", number:"08", category:"utilities", status:"live", name:{en:"Browser Debug Report",es:"Informe de depuración del navegador"},
    description:{en:"Capture viewport, screen, browser, input and preference details in one report that is ready to share with a developer.",es:"Recopila viewport, pantalla, navegador, métodos de entrada y preferencias en un informe listo para compartir con un desarrollador."},
    image:"/assets/lab/browser-debug.webp", imageAlt:{en:"Browser environment debugging report",es:"Informe de depuración del entorno del navegador"}, externalUrl:"https://debug.josuesomarribas.com/",
    problem:{en:"Visual bugs are difficult to reproduce when a report only says that a page looks wrong. The tool turns the visitor's environment into a structured, copyable diagnostic snapshot.",es:"Los errores visuales son difíciles de reproducir cuando el reporte solo dice que algo se ve mal. La herramienta convierte el entorno del visitante en un diagnóstico estructurado y copiable."},
    features:{en:["Capture viewport, screen, pixel density and orientation.","Report browser, platform, language and time zone.","Detect touch, pointer, color-scheme and reduced-motion preferences.","Copy a shareable plain-text report."],es:["Recopila viewport, pantalla, densidad de píxeles y orientación.","Informa navegador, plataforma, idioma y zona horaria.","Detecta touch, puntero, tema y preferencia de movimiento reducido.","Copia un informe de texto listo para compartir."]},
    limits:{en:["Browser APIs may omit or generalize privacy-sensitive information.","The report helps reproduce a problem but does not inspect the affected page itself."],es:["Las APIs del navegador pueden omitir o generalizar información sensible.","El informe ayuda a reproducir el problema, pero no inspecciona la página afectada." ]},
    architecture:{en:"A dependency-free static HTML page. All detection happens locally and no browser information is sent to a server.",es:"Una página HTML estática sin dependencias. Toda la detección ocurre localmente y no se envía información a ningún servidor."}, stack:["HTML","CSS","JavaScript","Browser APIs"]
  }
];

export const getLabTool = (slug:string) => labTools.find(tool => tool.slug === slug);
