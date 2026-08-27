# Guía tipográfica

La interfaz utiliza una escala limitada. Los tamaños se definen como variables CSS en `app/globals.css`; no deben añadirse valores de `font-size` aislados.

| Token | Tamaño | Uso |
| --- | --- | --- |
| `--text-micro` | 10 px | Texto interno de diagramas y previews. |
| `--text-xs` | 12 px | Metadatos, fechas y notas auxiliares. |
| `--text-sm` | 14 px | Navegación secundaria, captions y botones pequeños. |
| `--text-base` | 16 px | Párrafos, navegación, botones y contenido general. |
| `--text-lg` | 18 px | Entradillas y texto destacado. |
| `--text-xl` | 24 px | Títulos de tarjeta y encabezados de tercer nivel. |
| `--text-2xl` | 32 px | Títulos de sección. |
| `--text-3xl` | 36–44 px | Encabezados principales de páginas interiores. |
| `--text-display` | 44–56 px | Titulares de hero. |
| `--text-hero` | 56–76 px | Uso expresivo excepcional y elementos decorativos. |

## Familias

- Sans serif (`--font-geist`): interfaz, navegación, cuerpo y botones.
- Monoespaciada (`--font-mono`): etiquetas técnicas, código y metadatos breves.
- Georgia: énfasis editorial puntual.

## Reglas

- Cada bloque usa como máximo tres niveles: título, cuerpo y metadato.
- El contenido informativo nunca queda por debajo de `--text-xs`.
- `--text-micro` se reserva para gráficos que funcionan como ilustración.
- Los párrafos usan una altura de línea de 1.5–1.7; los titulares, de 1.05–1.2.
- Los botones usan `--text-sm` o `--text-base` según su jerarquía.
- En móvil se conservan los tokens fluidos; no se crean tamaños nuevos.

## Datos de contacto oficiales

- Email: `josuesomarribasb@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/josuesb/`
- Airbnb: `https://www.airbnb.es/rooms/1328530246047347477`
