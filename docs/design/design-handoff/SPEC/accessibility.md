# accessibility.md — contrato A11y (ambos modos)

**Objetivo:** WCAG 2.2 nivel **AA como suelo, AAA donde es viable**; alineado con EN 301 549 / EAA (uso en el ámbito UE). Es documentación de lectura prolongada, así que el contraste de texto apunta alto (casi todo el cuerpo supera AAA).

Ratios **medidos** con la fórmula WCAG (relative luminance) sobre los hex canónicos de `design-tokens.md`. AA texto normal = 4.5:1; AA texto grande / componentes UI = 3:1; AAA texto normal = 7:1.

---

## 1. Pares de contraste — MODO CLARO

| Par | Ratio | Nivel |
|-----|-------|-------|
| texto `#1B1A16` / fondo `#FAF7F1` | **16.29** | AAA |
| texto `#1B1A16` / superficie `#FFFDF8` | **17.13** | AAA |
| titular `#14130F` / fondo | **17.38** | AAA |
| texto secundario `#5A574E` / fondo | **6.75** | AA (≈AAA large) |
| texto atenuado `#6B685F` / fondo | **5.21** | AA |
| código `#26251F` / code-bg `#F3EFE6` | **13.39** | AAA |
| acento `#2B5B84` / fondo | **6.70** | AA |
| acento `#2B5B84` / superficie | **7.04** | AAA |
| blanco `#FFFFFF` / acento (relleno) | **7.16** | AAA |

Avisos (rótulo+icono sobre su superficie): nota `#2F5E86` **6.74** · consejo `#2E6B45` **6.25** · atención `#835E0C` **5.78** · peligro `#9E3520` **6.92** — todos AA (≈AAA).

Sintaxis (sobre code-bg `#F3EFE6`): comment `#67635A` **5.22** · keyword `#8C3B4A` **6.44** · string `#3E6E4E` **5.16** · number `#8A5A1E` **5.14** · function `#2C5578` **6.83** · property `#6A4A86` **6.23** — todos ≥4.5.

Verbos HTTP (texto blanco sobre el relleno): GET **6.35** · POST **6.85** · PUT **5.88** · DELETE **7.04**.

## 2. Pares de contraste — MODO OSCURO

| Par | Ratio | Nivel |
|-----|-------|-------|
| texto `#ECE8DE` / fondo `#17150F` | **14.92** | AAA |
| texto `#ECE8DE` / superficie `#1E1B14` | **14.04** | AAA |
| titular `#F4F1E8` / fondo | **16.16** | AAA |
| texto secundario `#B0AB9E` / fondo | **7.97** | AAA |
| texto atenuado `#8E897C` / fondo | **5.23** | AA |
| código `#E6E2D8` / code-bg `#211E16` | **12.86** | AAA |
| acento `#7FB0DC` / fondo | **7.95** | AAA |
| acento `#7FB0DC` / superficie | **7.48** | AAA |
| ink `#10131A` / acento (relleno) | **8.09** | AAA |

Avisos (rótulo+icono sobre superficie): nota `#9FC2E0` **9.22** · consejo `#8FD0A6` **9.61** · atención `#E0B27A` **8.85** · peligro `#E8977E` **7.49** — AAA.

Sintaxis (sobre code-bg `#211E16`): comment `#9A9384` **5.45** · keyword `#E88A9C` **6.77** · string `#93D3AA` **9.62** · number `#E0B27A` **8.57** · function `#A6C8E6` **9.53** · property `#C7ABE6` **8.24**.

Verbos HTTP (texto ink `#17150F` sobre el relleno): GET **10.20** · POST **9.79** · PUT **9.40** · DELETE **7.96**.

## 3. Regla de contraste para cualquier `--brand-accent` inyectado

Verificable en ambos modos (ver `design-tokens.md` §8):
1. acento / `--color-bg` ≥ 4.5:1
2. acento / `--color-surface` ≥ 4.5:1
3. `--brand-accent-contrast` / acento ≥ 4.5:1

**Preset neutro por defecto:** cumple (6.70 / 7.04 / 7.16 claro; 7.95 / 7.48 / 8.09 oscuro).
**Preset de ejemplo "Meridian" (terracota):** claro 5.68 / 5.97 / 6.07 · oscuro 7.29 / 6.86 / 7.29 — cumple en ambos modos (prueba de rebrandeo).

## 4. Bordes y elementos no textuales

Los bordes hairline (`--color-border`, `--color-border-strong`) son **estructura decorativa**, no el único indicador de un estado ni el límite de un control interactivo. El contraste borde/fondo (~1.5:1 en claro) es intencional y no infringe 1.4.11: los límites de componentes interactivos y sus estados se comunican con medios que sí superan 3:1 — color de acento, tinte de fondo (`--brand-accent-soft`), peso tipográfico y/o icono. El **anillo de foco** (§5) y el acento activo son los que portan el requisito de contraste no textual.

## 5. Foco visible y orden de foco

- **Indicador:** `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; border-radius: 2px }`. `--color-focus` es independiente de la marca: `#1B1A16` en claro (**16.29** vs fondo) y `#ECE8DE` en oscuro (**14.92**). Los campos con foco interno (búsqueda) usan `outline` en `:focus-within`.
- **Orden de foco por plantilla:**
  - *template-topic / audience-home:* skip-link → nav-toggle (móvil) → marca → búsqueda → conmutador de audiencia → selector de idioma → (sidebar: enlaces y toggles en orden visual) → contenido (`#main`) → paginación → footer. Con el **sidebar drawer abierto** (móvil) el foco entra al primer enlace del sidebar y `Escape` lo devuelve al toggle. Con **resultados de búsqueda abiertos**, el foco permanece en el input (patrón combobox) y `↑/↓` mueven el `aria-activedescendant`; `Escape` cierra. En las **pestañas de código**, `Tab` entra a la pestaña activa (roving tabindex) y `←/→` cambian.
  - *template-entry:* skip-link (a `#main`) → marca (no hay, es portada) → selector de idioma → tarjeta usuario → tarjeta desarrollador → enlaces del footer.

## 6. Nombre, rol y estado accesibles

| Componente | Rol | Nombre | Estado |
|------------|-----|--------|--------|
| Grupo plegable sidebar | `button` nativo | texto del grupo | `aria-expanded` |
| Pestañas de código | `tablist`/`tab`/`tabpanel` | etiqueta de la pestaña | `aria-selected`, roving `tabindex` |
| Buscador | `combobox` + `listbox`/`option` | `aria-label` (search_label) | `aria-expanded`, `aria-activedescendant`, recuento por `aria-live` |
| Botón copiar | `button` | etiqueta "Copiar" | anuncio "Copiado" por `aria-live="polite"` |
| Conmutador de audiencia / idioma | `nav` > enlaces | texto (audiencia) / código (idioma) | `aria-current="page"` en el activo |
| Enlace activo del sidebar / TOC | enlace | texto | `aria-current="page"` (sidebar) / `aria-current="true"` (TOC) |
| Drawer del sidebar | región `aside` | — | `aria-controls`/`aria-expanded` en el toggle; foco gestionado |
| Portada: selector de idioma | `button` | código de idioma | `aria-selected` |

Iconos: los significativos llevan alternativa textual (o el texto adyacente ES la etiqueta y el icono va `aria-hidden`); los decorativos van `aria-hidden="true" focusable="false"`. Ningún icono emoji en todo el tema.

## 7. Estructura de encabezados y landmarks (por plantilla)

- **Landmarks:** `header[role=banner]` (`.site-header`), `nav` (búsqueda `role=search`, sidebar con `aria-label`, switchers con `aria-label`, breadcrumb con `aria-label`, paginación con `aria-label`), `main#main`, `aside` de TOC con `aria-labelledby`, `footer[role=contentinfo]`. Navegable por regiones y por titulares.
- **Jerarquía de encabezados:** template-topic → un solo `h1` (título de la página); secciones en `h2` (con numeración decorativa `aria-hidden`), subsecciones `h3`, detalle `h4`. template-audience-home → `h1` (audiencia) + `h2` por grupo. template-entry → `h1` implícito por el nombre del producto (marcado como `.entry__name`; si se requiere `h1` explícito, keel puede envolverlo — documentado). Sin saltos de nivel.

## 8. Tamaños de objetivo

Objetivos táctiles ≥ **24×24 CSS px** con separación adecuada (WCAG 2.2 AA); los principales (paginación, summary de disclosure, toggle del sidebar, tarjetas) ≥ **44×44** (`min-block-size:44px`). Enlaces de navegación e ítems de resultado ≥32px de alto. Botón copiar 28px con separación.

## 9. Reduced motion, reflow 200 % y forced-colors

- **reduced-motion:** cada transición/animación (foco, hover, chevrons, drawer, scroll de TOC) tiene su anulación; `scroll-behavior:auto`.
- **Reflow / zoom de texto al 200 %:** layout fluido con `minmax(0,1fr)`, medidas en rem, `overflow-x:auto` contenido en tablas, code blocks y firmas de API (los identificadores largos hacen scroll, nunca rompen el layout). Sin alturas fijas que recorten texto. A anchuras estrechas el sidebar pasa a drawer y la TOC a plegable en línea, de modo que a 320px / 400 % el contenido sigue en una columna legible sin scroll horizontal de página.
- **forced-colors (alto contraste Windows):** `@media (forced-colors: active)` — el foco usa `Highlight`; el ítem activo de TOC y la pestaña seleccionada marcan el borde con `Highlight`; los avisos conservan borde `CanvasText` (además del icono y rótulo); los verbos HTTP mantienen borde `CanvasText`. Los estados no dependen de color eliminado por el modo.

## 10. No solo por color · errores/estados

Los 4 avisos se distinguen por **icono + rótulo textual + color** (nunca solo color). "Requerido/opcional" en tablas de parámetros es texto ("sí"/"no"), no solo color. El estado activo de navegación combina color de acento **y** peso/`aria-current`. El estado "copiado" es texto anunciado, no solo cambio de color.

## 11. RTL / bidi

El tema es multilingüe por diseño; todo el CSS usa propiedades lógicas (`margin-inline`, `padding-inline`, `border-inline-start`, `inset-inline`). Con `dir="rtl"`:
- **Sidebar:** filete y activo en el borde inicial lógico; el drawer entra desde la derecha.
- **Breadcrumb:** el separador se invierte (`\` en RTL) y el flujo va derecha→izquierda.
- **TOC:** el filete y el marcador activo en el borde inicial lógico.
- **Paginación:** las flechas anterior/siguiente se reflejan (`scaleX(-1)`); "Anterior" queda a la derecha.
- **Chevrons** de grupo: rotan en el sentido correcto según `dir`.
El `lang` y el `dir` correctos se fijan en `<html>` por página (keel los emite según el locale).
