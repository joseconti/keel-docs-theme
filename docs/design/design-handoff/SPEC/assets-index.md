# assets-index.md

Cada asset: archivo → dónde se usa → tamaño intrínseco → formatos entregados. **El build nunca convierte, recolorea ni redimensiona nada**: todo viaja listo para usar. SVG optimizados (viewBox `0 0 24 24`, sin restos de editor, `stroke`/`fill` en `currentColor` para que hereden el color del contexto al inlinearse). Los iconos se **inlinean** en el HTML (fiable en `file://`, sin `fetch`, recolorables por `currentColor`); los archivos SVG de `_theme/icons/` son la fuente canónica indexada y la base de los PNG.

Ubicaciones:
- Fuente canónica vendorizada: `guide/_theme/icons/*.svg`, `guide/_theme/fonts/*.woff2`, `guide/brand/logo*.svg`.
- Catálogo de la entrega (copias): `artifacts/assets/svg/`, `artifacts/assets/png/`, `artifacts/assets/fonts/`.

---

## 1. Iconos (SVG + PNG)

SVG 24×24 (`currentColor`). PNG rasterizados a tinta `#1B1A16`, tamaño intrínseco **24px** + densidad **@2x (48px)** (archivos `-2x.png`). En modo oscuro se usa el SVG inlineado (hereda `currentColor`); los PNG son para consumidores que necesiten bitmap.

| Icono | SVG | PNG | Dónde se usa |
|-------|-----|-----|--------------|
| note | `svg/icons/note.svg` | `png/icons/note.png` + `-2x` | aviso "Nota" |
| tip | `svg/icons/tip.svg` | idem | aviso "Consejo" |
| warn | `svg/icons/warn.svg` | idem | aviso "Atención" |
| danger | `svg/icons/danger.svg` | idem | aviso "Peligro" |
| search | `svg/icons/search.svg` | idem | campo de búsqueda |
| language | `svg/icons/language.svg` | idem | selector de idioma (disponible para keel) |
| audience-user | `svg/icons/audience-user.svg` | idem | tarjeta/portada audiencia usuario |
| audience-dev | `svg/icons/audience-dev.svg` | idem | tarjeta/portada audiencia desarrollador |
| copy | `svg/icons/copy.svg` | idem | botón copiar código |
| check | `svg/icons/check.svg` | idem | confirmación (disponible; el estado "copiado" es textual) |
| chevron | `svg/icons/chevron.svg` | idem | grupos plegables del sidebar |
| external | `svg/icons/external.svg` | idem | enlaces externos del footer |
| arrow-prev | `svg/icons/arrow-prev.svg` | idem | paginación anterior |
| arrow-next | `svg/icons/arrow-next.svg` | idem | paginación siguiente / "Entrar" en portada |
| menu | `svg/icons/menu.svg` | idem | abrir sidebar (móvil) |
| close | `svg/icons/close.svg` | idem | cerrar drawer (disponible; el cierre es por scrim/Escape) |
| eye | `svg/icons/eye.svg` | idem | bloque "Qué deberías ver" |
| book | `svg/icons/book.svg` | idem | TOC plegable en línea (móvil) |

18 iconos × (1 SVG + 2 PNG) = 18 SVG + 36 PNG.

## 2. Marca demo (Basalt) — asset ficticio del demo

Mark "columnar basalt": hexágono con dos verticales. **Colores explícitos** (un `<img>` no hereda `currentColor`), por eso hay variante para cada modo.

| Archivo | SVG | PNG | Tamaño intrínseco | Dónde |
|---------|-----|-----|-------------------|-------|
| logo (claro) | `svg/brand/logo.svg` | `png/brand/logo.png` + `-2x` | 56px (header a 28, portada a 56) | slot de marca, todas las páginas en claro |
| logo-dark (oscuro) | `svg/brand/logo-dark.svg` | `png/brand/logo-dark.png` + `-2x` | 56px | auto-swap en modo oscuro |

(En el árbol de consumo viven en `guide/brand/logo.svg` y `guide/brand/logo-dark.svg`.)

Preset de rebrandeo "Meridian" (círculo + meridiano): `styles/brand-preset-example/logo.svg` y `logo-dark.svg` (mismo tamaño intrínseco).

## 3. Fuentes (woff2 autoalojadas, SIL OFL)

Ubicación final: `guide/_theme/fonts/`. `@font-face` escritos contra esas rutas exactas (`../fonts/NAME.woff2`). Solo los pesos usados.

| Familia | Peso/estilo | Archivo | Uso |
|---------|-------------|---------|-----|
| Source Serif 4 | 400 | `SourceSerif4-Regular.woff2` | cuerpo |
| Source Serif 4 | 400 italic | `SourceSerif4-Italic.woff2` | lead, numeración de sección |
| Source Serif 4 | 600 | `SourceSerif4-Semibold.woff2` | énfasis de cuerpo |
| IBM Plex Sans | 400 | `IBMPlexSans-Regular.woff2` | UI |
| IBM Plex Sans | 500 | `IBMPlexSans-Medium.woff2` | UI media |
| IBM Plex Sans | 600 | `IBMPlexSans-SemiBold.woff2` | H1–H4, activos |
| IBM Plex Sans | 700 | `IBMPlexSans-Bold.woff2` | nombre de producto, rótulos fuertes |
| IBM Plex Mono | 400 | `IBMPlexMono-Regular.woff2` | código |
| IBM Plex Mono | 500 | `IBMPlexMono-Medium.woff2` | código medio |
| IBM Plex Mono | 600 | `IBMPlexMono-SemiBold.woff2` | numeración de paso, badges |

**Licencias** (redistribución permitida, viajan con el tema): `guide/_theme/fonts/LICENSE-SourceSerif4.md` (OFL, Adobe) y `guide/_theme/fonts/LICENSE-IBMPlex.txt` (OFL, IBM).

**Procedencia exacta** (fetch mecánico, sin transformación):
- IBM Plex Sans/Mono — repo `github.com/IBM/plex`, rama `master`, `packages/plex-sans/fonts/complete/woff2/` y `packages/plex-mono/fonts/complete/woff2/`. Licencia `LICENSE.txt` del repo.
- Source Serif 4 — repo `github.com/adobe-fonts/source-serif`, rama `release`, `WOFF2/OTF/SourceSerif4-{Regular,Semibold,It}.otf.woff2` (renombrados a `-Regular/-Semibold/-Italic.woff2`). Licencia `LICENSE.md` del repo.

> Nota de entrega: los 10 woff2 (Source Serif 4 + IBM Plex Sans + IBM Plex Mono) y sus dos licencias OFL están **presentes** en `_theme/fonts/` y en `assets/fonts/`, copiados tal cual de esos repos OFL (coordenadas arriba), sin conversión. El tema los referencia por sus nombres finales.

## 4. Archivos de datos (esquemas para keel)

No son "assets" gráficos, pero keel los genera por proyecto. Se cargan como `<script src>` que definen un global (funciona en `file://`).

### `search-index.js` → `window.KEEL_SEARCH_INDEX`
```
{ "version": 1, "entries": [ {
    "title":   "Inventario",                 // título de la página
    "path":    "es/dev/api-inventario.html",  // ruta relativa a guide/ (el tema le antepone data-root)
    "audience":"dev",                          // "user" | "dev"
    "lang":    "es",                           // locale
    "section": "Documentación de desarrollador", // migaja/contexto mostrado bajo el título
    "excerpt": "Consulta y actualiza…",        // extracto (1 frase)
    "terms":   "inventario stock sku api"      // términos extra para el match (minúsculas)
} ] }
```
Campos obligatorios: `title, path, audience, lang, excerpt, terms` (+ `section` recomendado). El buscador filtra por `lang` + `data-audience` de la página y hace match insensible a mayúsculas/diacríticos sobre `title+terms+excerpt`.

### `strings-<locale>.js` → `window.KEEL_I18N`
Objeto plano `clave → cadena`. Las **claves son el contrato estable** (no se traducen); los valores sí. Interpolación `{n}`, `{v}`. Se entregan `strings-es.js` y `strings-en.js`; para un locale nuevo keel copia y traduce los valores. Claves incluidas: `skip_to_content, nav_label, toggle_nav, close_nav, breadcrumb_label, on_this_page, prev, next, heading_link, search_placeholder, search_label, search_results_label, search_no_results, search_count, search_no_index, audience_label, audience_user, audience_dev, lang_label, admonition_note, admonition_tip, admonition_warn, admonition_danger, expected_label, copy, copied, since, deprecated, required, optional, footer_support, footer_generated`.
