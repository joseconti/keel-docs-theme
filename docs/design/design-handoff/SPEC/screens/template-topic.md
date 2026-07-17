# screens/template-topic.md

La página de contenido — el 95 % del tema. **UNA plantilla para las dos audiencias**: cambian los datos de navegación y qué componentes aparecen, nunca la estructura. Archivo canónico: `artifacts/templates/template-topic.html`. Instancias: ver `manifest.md`.

## Qué hace / acciones disponibles
Presenta un tema de documentación con: navegación lateral (grupos plegables, página actual resaltada), breadcrumb, columna de lectura de anchura controlada (`--reading-measure` 42rem), TOC "En esta página" con scrollspy, paginación anterior/siguiente, conmutador de audiencia, selector de idioma, búsqueda y footer. Acciones: navegar (sidebar/breadcrumb/pager/TOC/search), plegar grupos, cambiar audiencia/idioma, copiar código, cambiar de pestaña de código, expandir detalles, imprimir. Comportamiento detallado en `interactions.md`.

## Estados
- **default / hover / focus / active:** enlaces de nav, TOC, pager, tarjetas y botones tienen hover (fondo `--color-surface-2` o borde acento) y `:focus-visible` (anillo 2px `--color-focus`, offset 2px). Activo: sidebar `aria-current="page"` (acento + peso + tinte), TOC `aria-current="true"` (filete de acento), pestaña `aria-selected`.
- **disabled:** no aplica en v1 (no hay controles deshabilitados; sitio estático).
- **loading:** no existe (estático).
- **vacío — búsqueda sin resultados:** desplegable con "Sin resultados".
- **vacío — índice sin datos:** la búsqueda no rompe; descripción accesible "índice no disponible"; sin resultados.

## Breakpoints (px exactos) y qué pasa
| Rango | Layout | Sidebar | TOC | Tablas / código anchos |
|-------|--------|---------|-----|------------------------|
| **≥1280** (escritorio ancho) | 3 col `264px / 1fr / 216px` | columna sticky | lateral sticky con scrollspy | `overflow-x:auto` contenido |
| **1024–1279** (portátil) | 3 col `240px / 1fr / 200px`, `--content-pad` 36px | igual | igual | igual |
| **768–1023** (tablet) | 2 col `sidebar / 1fr` | columna | **TOC lateral oculta**; aparece plegable en línea (`details.toc-inline`) sobre el contenido | igual; medida sube a 46rem |
| **<768** (móvil) | 1 col | **drawer** (botón `.nav-toggle` + scrim, `transform` 240ms, `Escape`/scrim cierran) | plegable en línea | igual; `--content-pad` 20px, pager en columna |
| **<480** | 1 col | drawer | plegable | se oculta versión/kbd hint del header |

En todos los rangos: identificadores largos de código y firmas de API hacen scroll horizontal dentro de su caja (`.code-block pre`, `.api__sig`, `.table-wrap`), nunca rompen el layout ni desbordan la página. Zoom de texto 200 % / reflow a 320px: una sola columna legible sin scroll horizontal de página.

## Variantes condicionales
- **Audiencia (user/dev):** misma estructura; cambia el árbol de navegación (`NAV.user` vs `NAV.dev`), el `data-audience` de `<html>` (filtra la búsqueda) y qué componentes didácticos/técnicos aparecen en el cuerpo. Si el diseño necesitara separarlas sería una pregunta al usuario — **no fue necesario**: una sola plantilla cubre ambas.
- **Idioma:** el selector lleva a la MISMA página en el otro locale (`../../<otro>/<aud>/<slug>.html`). Si esa página no existe en el otro locale, el enlace apunta a la portada de esa audiencia en ese locale (comportamiento definido; keel emite el `href` correcto). `lang`/`dir` correctos por página.
- **Modo claro/oscuro:** automático (`prefers-color-scheme`).
- **reduced-motion:** anula transiciones (drawer, chevrons, scroll de TOC, hover).
- **Impresión:** `print.css` — sin navegación ni chrome, una columna, tinta sobre blanco, URLs de enlaces visibles, bloques `break-inside:avoid` (ver `interactions.md` §9).

## Accesibilidad (además de `accessibility.md`)
- Landmarks: `banner`, `search`, `nav` (sidebar/breadcrumb/switchers/pager con `aria-label`), `main#main`, `aside` de TOC (`aria-labelledby`), `contentinfo`.
- Un solo `h1`; secciones `h2` (numeración `aria-hidden`), subsecciones `h3`/`h4`; sin saltos de nivel.
- Skip-link a `#main` primero en el orden de foco. Orden de foco completo y gestión del drawer/búsqueda/pestañas: `accessibility.md` §5.
- Objetivos táctiles: pager y summary ≥44px; enlaces de nav/resultado ≥32px.
