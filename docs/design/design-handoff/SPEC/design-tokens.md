# design-tokens.md — valores canónicos (Errata)

Fuente única de verdad de los valores. **Coinciden exactamente con `artifacts/styles/theme.css`** (y su copia vendorizada `_theme/css/theme.css`). Si algo diverge, manda `theme.css`. Todos los tokens son custom properties CSS.

Dirección elegida: **Errata** — manual de ingeniería editorial. Elementos firma (ver README): (1) H1 y H2 en IBM Plex Sans con **H1 reglado** (filete inferior de 1px); (2) **numeración de sección** en Source Serif 4 *cursiva* con el color de acento, junto al título; (3) **lead en cursiva serif**; (4) navegación lateral con **filete de 2px** y activo en acento.

---

## 1. Tipografía

Tres familias, todas SIL OFL, autoalojadas en `_theme/fonts/` (woff2). Vetadas por el usuario y NO usadas: Inter, Poppins, Space Grotesk.

| Rol | Familia | Uso | Pesos incluidos (woff2) |
|-----|---------|-----|--------------------------|
| Cuerpo (`--font-body`) | **Source Serif 4** | Prosa, lead, numeración de sección | 400, 400 *italic*, 600 |
| Interfaz/titulares (`--font-ui`) | **IBM Plex Sans** | H1–H4, navegación, UI, tablas | 400, 500, 600, 700 |
| Código (`--font-mono`) | **IBM Plex Mono** | Código, `kbd`, badges, verbos, números de paso | 400, 500, 600 |

Stacks completos (fallback del sistema mientras carga / si falla):
```
--font-body: "Source Serif 4", Georgia, "Times New Roman", serif;
--font-ui:   "IBM Plex Sans", system-ui, -apple-system, Segoe UI, sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```
`font-display: swap` en todos los `@font-face`.

### Escala tipográfica (base 16px = 1rem)
| Token | rem | px | Uso |
|-------|-----|----|-----|
| `--fs-12` | 0.75 | 12 | fine print, rótulos, badges, kbd |
| `--fs-13` | 0.8125 | 13 | TOC, tabla, pie de figura, footer |
| `--fs-14` | 0.875 | 14 | UI secundaria, navegación, tabla |
| `--fs-15` | 0.9375 | 15 | cuerpo pequeño (admonition, step) |
| `--fs-16` | 1 | 16 | **cuerpo base** |
| `--fs-17` | 1.0625 | 17 | H4 |
| `--fs-18` | 1.125 | 18 | lead |
| `--fs-21` | 1.3125 | 21 | H3, numeración de sección |
| `--fs-25` | 1.5625 | 25 | H2 |
| `--fs-34` | 2.125 | 34 | H1, título de home |

### Line-heights y medida de lectura
| Token | Valor | Uso |
|-------|-------|-----|
| `--lh-tight` | 1.15 | H1 |
| `--lh-heading` | 1.28 | H2/H3 |
| `--lh-ui` | 1.4 | interfaz |
| `--lh-body` | 1.7 | prosa (lectura prolongada) |
| `--reading-measure` | 42rem (672px) | anchura máxima de la columna de contenido (~72 caracteres en serif a 16px) |

---

## 2. Escala de espaciado (base 4px)

`--sp-1`4 · `--sp-2`8 · `--sp-3`12 · `--sp-4`16 · `--sp-5`20 · `--sp-6`24 · `--sp-7`32 · `--sp-8`40 · `--sp-9`48 · `--sp-10`64 · `--sp-11`80 · `--sp-12`96 (px). Escala única para todo el tema.

## 3. Radios, bordes, sombras

| Token | Valor | Nota |
|-------|-------|------|
| `--radius-sm` | 2px | por defecto (chips, kbd, tabs) |
| `--radius-md` | 3px | cajas, tarjetas, code blocks |
| `--radius-lg` | 4px | tarjetas de audiencia (máximo del tema) |
| `--bw` | 1px | **todos** los bordes son de 1px visibles |
| `--shadow-popover` | claro: `0 1px 2px rgba(30,25,10,.10), 0 6px 16px rgba(30,25,10,.12)` · oscuro: `0 1px 2px rgba(0,0,0,.5), 0 8px 24px rgba(0,0,0,.55)` | **única sombra del tema**; solo en el desplegable de búsqueda y en el drawer del sidebar en móvil. En ningún otro sitio hay sombra. |

Jerarquía por estructura y tipografía, no por elevación. Cero tarjetas flotantes.

## 4. Layout y z-index

| Token | Valor |
|-------|-------|
| `--sidebar-w` | 264px (240px < 1280) |
| `--toc-w` | 216px (200px < 1280) |
| `--header-h` | 60px |
| `--content-pad` | 48px (36px < 1280 · 20px < 768) |

z-index: `--z-content`0 · `--z-sticky`100 (sidebar/TOC sticky) · `--z-header`200 · `--z-drawer`300 (sidebar móvil) · `--z-search`400 (resultados) · `--z-skiplink`500.

## 5. Motion

| Token | Valor |
|-------|-------|
| `--dur-fast` | 120ms (hover, foco) |
| `--dur-base` | 180ms (plegables, chevrons) |
| `--dur-slow` | 240ms (drawer del sidebar) |
| `--ease-standard` | `cubic-bezier(.2,0,0,1)` |
| `--ease-out` | `cubic-bezier(0,0,.2,1)` |

`@media (prefers-reduced-motion: reduce)`: todas las `transition`/`animation` a `.01ms` y `scroll-behavior:auto`.

---

## 6. Color — MODO CLARO (núcleo neutro, tono papel cálido)

| Token | Hex | Rol |
|-------|-----|-----|
| `--color-bg` | `#FAF7F1` | fondo de página |
| `--color-surface` | `#FFFDF8` | superficie elevada (header, sidebar, footer, admonition) |
| `--color-surface-2` | `#F3EFE6` | inset (cabecera de tabla, expected) |
| `--color-heading` | `#14130F` | titulares |
| `--color-text` | `#1B1A16` | texto primario |
| `--color-text-secondary` | `#5A574E` | texto secundario |
| `--color-text-muted` | `#6B685F` | texto atenuado (rótulos, pies) |
| `--color-border` | `#E4DED0` | filete de hairline |
| `--color-border-strong` | `#D2CBB9` | borde estructural visible 1px |
| `--color-focus` | `#1B1A16` | anillo de foco (independiente de la marca) |
| `--code-bg` | `#F3EFE6` | fondo de código |
| `--code-text` | `#26251F` | texto de código |
| `--code-border` | `#E1DAC9` | borde de bloques de código |
| `--mark-bg` / `--mark-text` | `#F3E7B8` / `#3A3212` | resaltado de búsqueda / selección |

Resaltado de sintaxis (claro), sobre `--code-bg`:
`--syn-comment #67635A` · `--syn-keyword #8C3B4A` · `--syn-string #3E6E4E` · `--syn-number #8A5A1E` · `--syn-function #2C5578` · `--syn-punctuation #57534A` · `--syn-property #6A4A86`.

Avisos (claro) — `accent` = borde + icono + rótulo; `bg` = tinte:
`nota #2F5E86 / #EAF0F6` · `consejo #2E6B45 / #E7F1EA` · `atención #835E0C / #F6EFD9` · `peligro #9E3520 / #F7E9E4`.

Verbos HTTP (claro), texto `--http-verb-text #FFFFFF`:
`GET #2E6B45` · `POST #2F5E86` · `PUT #835E0C` · `DELETE #9E3520`.

Badges (claro): base `#EFEADD/#4A473F` · since `#E7F1EA/#2E6B45` · deprecated `#F6EFD9/#835E0C`.

## 7. Color — MODO OSCURO (`prefers-color-scheme: dark`, automático, sin conmutador)

| Token | Hex |
|-------|-----|
| `--color-bg` | `#17150F` |
| `--color-surface` | `#1E1B14` |
| `--color-surface-2` | `#211E16` |
| `--color-heading` | `#F4F1E8` |
| `--color-text` | `#ECE8DE` |
| `--color-text-secondary` | `#B0AB9E` |
| `--color-text-muted` | `#8E897C` |
| `--color-border` | `#302C22` |
| `--color-border-strong` | `#423C2E` |
| `--color-focus` | `#ECE8DE` |
| `--code-bg` | `#211E16` |
| `--code-text` | `#E6E2D8` |
| `--code-border` | `#35301F` |
| `--mark-bg` / `--mark-text` | `#4A3E12` / `#F3E7B8` |

Sintaxis (oscuro): `--syn-comment #9A9384` · `--syn-keyword #E88A9C` · `--syn-string #93D3AA` · `--syn-number #E0B27A` · `--syn-function #A6C8E6` · `--syn-punctuation #B8B2A2` · `--syn-property #C7ABE6`.

Avisos (oscuro): `nota #9FC2E0 / #1B2530` · `consejo #8FD0A6 / #182619` · `atención #E0B27A / #2A2313` · `peligro #E8977E / #2C1B15`.

Verbos HTTP (oscuro), texto `--http-verb-text #17150F`: `GET #8FD0A6` · `POST #9FC2E0` · `PUT #E0B27A` · `DELETE #E8977E`.

Badges (oscuro): base `#2A261B/#C7C1B2` · since `#182619/#8FD0A6` · deprecated `#2A2313/#E0B27A`.

Todos los pares de contraste medidos están en `accessibility.md` (ambos modos).

---

## 8. Capa de marca — contrato CERRADO

Vive solo en `brand/brand.css` (+ los logos de esa carpeta + el nombre/versión/enlaces que se inyectan). **Rebrandear = sustituir la carpeta `brand/`. Ni un selector del núcleo (`_theme/`) se edita.** El núcleo trae fallbacks neutros idénticos por si faltara `brand.css`.

Variables que un proyecto PUEDE tocar — y ninguna más:

| Variable | Qué es | Neutro por defecto (claro / oscuro) |
|----------|--------|--------------------------------------|
| `--brand-accent` | color de acento (enlaces, estado activo, base del tinte) | `#2B5B84` / `#7FB0DC` |
| `--brand-accent-contrast` | color de texto/icono sobre un relleno de acento | `#FFFFFF` / `#10131A` |
| `--brand-accent-soft` | tinte suave de fondo para estados activos/seleccionados | `#E7EEF4` / `#1E2A34` |
| `--brand-logo-w` / `--brand-logo-h` | caja del slot del logo (header) | `28px` / `28px` |

También personalizable (datos, no CSS del núcleo): `logo.svg` (obligatorio) + `logo-dark.svg` (opcional, auto-swap en oscuro), nombre del producto, versión, y los enlaces de soporte/web del pie.

### Regla de contraste verificable que DEBE cumplir cualquier acento inyectado
Comprobable mecánicamente con cualquier checker WCAG, en **ambos modos**:

1. `contrast(--brand-accent, --color-bg)` ≥ **4.5:1** (el acento se usa como texto de enlace).
2. `contrast(--brand-accent, --color-surface)` ≥ **4.5:1**.
3. `contrast(--brand-accent-contrast, --brand-accent)` ≥ **4.5:1** (texto sobre relleno de acento).

`--color-bg`/`--color-surface` a usar: claro `#FAF7F1`/`#FFFDF8`; oscuro `#17150F`/`#1E1B14`. `--brand-accent-soft` es decorativo (solo fondo); no porta significado por sí solo y no requiere garantía de contraste de texto, pero como el texto activo sobre él usa `--color-text`, manténlo claro en claro / oscuro en oscuro.

El preset neutro por defecto cumple las tres reglas (ver `accessibility.md`). El segundo preset de ejemplo `styles/brand-preset-example/` ("Meridian", terracota) también las cumple y sirve de **prueba de rebrandeo**.

### Slot del logo (comportamiento con logos anchos/altos/cuadrados)
- El logo se renderiza DENTRO de una caja fija `--brand-logo-w × --brand-logo-h` y se escala con `contain` (nunca se recorta ni se recolorea).
- Cuadrado/icónico: caja 28×28 por defecto.
- Wordmark ancho: sube `--brand-logo-w` (p. ej. `120px`) manteniendo alto ~24–28px.
- Marca alta: mantén el ancho pequeño; el alto manda.
- Alto mínimo legible en header: 20px. La portada muestra el mismo logo a 56px de alto (ancho automático) vía `.entry__logo`.

### Cómo keel crea un preset (mecánica documentada)
1. Copiar `brand/brand.css`; cambiar SOLO las variables anteriores (claro + oscuro).
2. Sustituir `logo.svg` (y opcional `logo-dark.svg`).
3. Si es wordmark ancho, ajustar `--brand-logo-w`.
4. Verificar la regla de contraste (ambos modos).
No añadir selectores, no importar nada, no tocar `_theme/`.
