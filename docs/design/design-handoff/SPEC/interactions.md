# interactions.md — comportamiento transversal

Todo JS es vanilla, sin dependencias, en `_theme/js/theme.js`. Funciona desde `file://` (los datos llegan por `<script src>` como globales, nunca por `fetch`). Cada interacción tiene su variante `prefers-reduced-motion`. Sin JS, el contenido es legible y navegable (degradación aceptable: el sidebar queda expandido, la búsqueda no filtra, las pestañas muestran el primer panel; todo con HTML semántico).

Datos globales que el JS consume:
- `window.KEEL_I18N` (de `strings-<locale>.js`) — cadenas de interfaz.
- `window.KEEL_SEARCH_INDEX` (de `search-index.js`) — índice de búsqueda.
Atributos en `<html>` que gobiernan el comportamiento: `lang`, `dir`, `data-audience` (`user`/`dev`/ausente en la portada), `data-root` (`""` en raíz, `../../` en contenido).

---

## 1. Inyección de cadenas (i18n)

Las cadenas de interfaz NO se incrustan en las plantillas. Se marcan con atributos y el JS las rellena desde `KEEL_I18N` al cargar:
- `data-i18n="clave"` → `textContent`.
- `data-i18n-aria="clave"` → `aria-label`.
- `data-i18n-attr="placeholder:clave;title:clave2"` → atributos arbitrarios.
- Interpolación `{n}`, `{v}` vía `data-i18n-vars='{"n":3}'`.
Esquema de cadenas y claves: ver `assets-index.md` §Cadenas y los archivos `strings-es.js` / `strings-en.js`. Para añadir un locale, keel copia el archivo y traduce los VALORES; las CLAVES son el contrato estable.

## 2. Sidebar plegable en pantallas estrechas (drawer)

- **≥768px:** el sidebar es una columna sticky normal.
- **<768px:** se convierte en drawer. El botón `.nav-toggle` (visible solo <768) lo abre; pone `data-sidebar-open="true"` en `<body>`, `aria-expanded="true"` en el botón, y mueve el foco al primer enlace del sidebar. Un scrim (`.sidebar-scrim`) cubre el resto.
- **Cerrar:** click en el scrim, `Escape` (devuelve el foco al botón), o navegar a un enlace.
- Transición: `transform` 240ms `--ease-standard`; con reduced-motion, instantánea. `aria-controls="sidebar"` enlaza botón y región.
- RTL: el drawer entra desde el lado inicial lógico (derecha en RTL).

## 3. Grupos plegables del sidebar

- Cada grupo es un `<button class="nav-group__toggle" aria-expanded>` seguido de su `<ul>`. El chevron rota (`aria-expanded="false"` → −90°, +90° en RTL). El CSS oculta la lista cuando `aria-expanded="false"`.
- Estado inicial: abierto si contiene la página actual; los demás grupos, cerrados. Toggle por click/Enter/Espacio (es un `<button>` nativo).

## 4. TOC "En esta página" + scrollspy

- La lista lateral (`.toc`, ≥1024px) enlaza a los `id` de los `h2`/`h3`. Un `IntersectionObserver` (`rootMargin: -72px 0px -70% 0px`) marca `aria-current="true"` en el enlace de la sección más alta visible.
- **<1024px:** la TOC lateral se oculta y aparece una versión plegable en línea (`<details class="toc-inline">`) sobre el contenido.
- Click en un enlace de TOC (o en el ancla `#` de un encabezado): scroll suave (o instantáneo con reduced-motion), actualiza el hash sin recargar y mueve el foco al encabezado (`tabindex=-1`).
- Anclas de encabezado: el JS añade un enlace `#` a cada `h2`/`h3` con `id` (visible al hover/focus), con `aria-label` desde `KEEL_I18N.heading_link`.

## 5. Pestañas de código (WAI-ARIA tabs)

- `role="tablist"` > `role="tab"` con `aria-selected` y `aria-controls`; paneles `role="tabpanel"` con `hidden`.
- **Roving tabindex:** solo la pestaña activa es `tabindex=0`; el resto `-1`.
- Teclado: `←/→` mueven (invertido en RTL), `Home`/`End` a extremos, con wrap. `Enter`/`Espacio`/foco activan por el propio `<button>`.
- Al cambiar de pestaña se muestra su panel y se ocultan los demás.

## 6. Botón copiar código

- `navigator.clipboard.writeText` con fallback a `<textarea>` + `execCommand('copy')` (necesario en `file://`).
- Al copiar: el botón pasa a `data-copied="true"` (borde/color en verde consejo), la etiqueta cambia a "Copiado" (desde `KEEL_I18N.copied`) durante 1600ms y se anuncia por una región `aria-live="polite"` compartida. Luego revierte a "Copiar".
- Objetivo del botón ≥28px de alto; icono con `aria-hidden`, el texto es la etiqueta accesible.

## 7. Búsqueda cliente offline

- Índice desde `window.KEEL_SEARCH_INDEX.entries` (esquema en `assets-index.md`). Se **filtra por el `lang` y el `data-audience` de la página** (en la portada, sin audiencia, busca en todo el locale).
- Coincidencia insensible a **mayúsculas y diacríticos** (`toLowerCase().normalize('NFD')` sin marcas). Busca en `title + terms + excerpt`. Ranking: coincidencia en título primero, luego por posición.
- **Combobox + listbox** (`role="combobox"` en el input con `aria-expanded`, `aria-controls`, `aria-activedescendant`; `role="listbox"` en resultados, `role="option"` en cada uno).
- Teclado: `↓`/`↑` recorren (con wrap, `aria-selected` + `aria-activedescendant`), `Enter` navega al resultado activo, `Escape` cierra (y si ya está cerrado, desenfoca), click fuera cierra. `/` enfoca la búsqueda desde cualquier parte (salvo si ya estás escribiendo en un campo).
- **Recuento** anunciado por `aria-live` y mostrado como cabecera del desplegable (`{n} resultados`). Cada resultado resalta el término con `<mark>`.
- **Estado vacío** (sin coincidencias): mensaje "Sin resultados" (`KEEL_I18N.search_no_results`).
- **Índice vacío/ausente** (`entries` = 0): la búsqueda no rompe; se añade una descripción accesible "El índice de búsqueda no está disponible" y no se muestran resultados. Sitio estático → no existe estado "cargando".
- Los `href` de resultado se construyen como `data-root + entry.path` (funciona desde cualquier profundidad y desde `file://`).

## 8. Portada: selector de idioma

- Botones `.entry-lang__btn[data-lang]` (`aria-selected`) muestran/ocultan los paneles `[data-lang-panel]`. Estado inicial = `lang` del documento. Es la única página con paneles por idioma (no hay una portada por idioma).

## 9. Impresión (`print.css`, `media="print"`)

- Se ocultan header, sidebar, TOC (lateral e inline), búsqueda, switchers, skip-link, botones copiar, anclas y paginación.
- Contenido a una columna, colores a tinta sobre blanco, code/tablas `break-inside:avoid`, código en `white-space:pre-wrap` para que nada se recorte.
- **URLs visibles:** los enlaces a `http`, a rutas relativas y a `.html` muestran su destino entre paréntesis; los anclas `#` no. `@page { margin:18mm 16mm }`.

## 10. Preferencias del sistema

- **Modo claro/oscuro:** automático por `prefers-color-scheme` (sin conmutador manual en v1).
- **reduced-motion:** todas las transiciones/animaciones se anulan.
- **forced-colors (alto contraste):** ver `accessibility.md` §forced-colors — los estados activos y el foco usan `Highlight`, y los bordes semánticos `CanvasText`.
