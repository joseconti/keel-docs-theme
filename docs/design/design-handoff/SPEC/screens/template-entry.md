# screens/template-entry.md

La portada de `guide/` — única página en la raíz (profundidad 0, rutas relativas `_theme/…`, `brand/…`). Una **puerta, no una landing**: sin hero de marketing, sin CTA, sin ilustración. Archivo canónico: `artifacts/templates/template-entry.html`. Instancia: `guide/index.html`.

## Qué hace / acciones disponibles
Deja al lector (1) identificar el producto (logo + nombre + descripción de una línea + versión), (2) elegir idioma, y (3) elegir audiencia (Guía de usuario / Documentación de desarrollador). Footer con enlaces de soporte. Nada más.

Acciones:
- **Selector de idioma:** botones `.entry-lang__btn[data-lang]`; al pulsar, el JS muestra el panel `[data-lang-panel]` correspondiente y oculta el resto. Es la única página con paneles por idioma (no existe una portada por idioma).
- **Tarjetas de audiencia:** enlazan a `<locale>/user/index.html` y `<locale>/dev/index.html` del idioma activo.

## Estados
- **default / hover / focus:** `.audience-card` con hover (borde acento + fondo) y `:focus-visible`. Botones de idioma con `aria-selected` (activo) y foco visible.
- **active:** el idioma activo = `aria-selected="true"`; su panel visible, los demás con `hidden`.
- **disabled / loading / vacío:** no aplican (portada estática; siempre hay al menos un idioma y dos audiencias).
- **sin JS:** el panel del idioma por defecto es el visible (los demás quedan ocultos con `hidden`); las tarjetas siguen siendo enlaces válidos. Degradación aceptable.

## Breakpoints
| Rango | Tarjetas de audiencia |
|-------|-----------------------|
| ≥768 | 2 columnas `repeat(2, minmax(0,260px))` centradas |
| <768 | 1 columna |

Contenido centrado vertical y horizontalmente (`.entry__main` flex). Logo a 56px de alto (ancho automático). Escalado de texto/zoom: el bloque se mantiene centrado y en una columna.

## Variantes condicionales
- **Idioma:** un panel por locale; el selector alterna. keel emite un botón y un panel por cada locale disponible.
- **Modo claro/oscuro:** automático; el logo hace auto-swap a `logo-dark.svg` en oscuro si existe.
- **reduced-motion:** sin transiciones (el cambio de panel es instantáneo de por sí).
- **Impresión:** hereda el `print.css` (portada rara vez se imprime; queda limpia, enlaces con URL visible).

## Accesibilidad
- Landmarks: `main#main` y `contentinfo` (footer). Skip-link a `#main`.
- Encabezado: el nombre del producto actúa como título principal (`.entry__name`). Si un proyecto requiere un `h1` explícito por conformidad, keel puede envolver `.entry__name` en `h1` sin cambios de estilo (documentado).
- Selector de idioma: grupo de botones con `aria-label` (idioma) y `aria-selected`. Tarjetas: enlaces con nombre accesible (`data-i18n` audience_user/dev) + descripción.
- Objetivos: tarjetas y botones ≥44px de alto efectivo; separación adecuada.
- Iconos de audiencia decorativos (`aria-hidden`); el texto porta el significado.
