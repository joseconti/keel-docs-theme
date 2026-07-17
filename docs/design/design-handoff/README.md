# keel-docs-theme v1 — design-handoff

Tema canónico de documentación (guía de usuario final + portal de desarrollador) que **keel** vendoriza en el artefacto `guide/` de cada proyecto. **Neutro de marca**, versionado y reutilizable. HTML + CSS + JS **vanilla**, sin build, sin dependencias, sin peticiones externas; funciona desde `file://`. Dirección de arte elegida: **Errata** (manual de ingeniería editorial).

No es la web de un producto: es un **sistema de plantillas + componentes + tokens + una SPEC que lo gobierna**. keel rellena las plantillas con contenido real, proyecto tras proyecto, sin un diseñador delante.

---

## Cómo verlo (todo offline, `file://`)
- **Demo completo (Basalt):** abre `artifacts/pages/guide/index.html`. Portada → elige idioma y audiencia. Navega, busca (`/`), pliega el sidebar, cambia de pestaña de código, copia, imprime. Prueba el modo oscuro del sistema.
- **Catálogo de componentes:** `artifacts/components/components.html`.
- **Plantillas (esqueletos con slots):** `artifacts/templates/`.
- **Prueba de rebrandeo:** `artifacts/pages/rebrand-proof.html` (misma página, solo cambia `brand/`).
- **Las 3 direcciones divergentes exploradas:** `../exploration/directions.html` (Errata elegida).

## Estructura de la entrega
```
design-handoff/
├── README.md                 (este archivo)
├── artifacts/
│   ├── templates/            template-entry / -audience-home / -topic (construidas UNA vez, con slots)
│   ├── components/           components.html — cada componente aislado con estados
│   ├── pages/                SOLO el demo: guide/ (árbol de consumo real, funcional) + rebrand-proof.html
│   ├── assets/               svg/ (iconos+marca) · png/ (iconos+marca @1x/@2x) · fonts/ (woff2 OFL + licencias)
│   └── styles/               theme.css · print.css · brand/brand.css (neutro) · brand-preset-example/ (rebrand)
└── SPEC/
    ├── manifest.md · design-tokens.md · interactions.md · accessibility.md
    ├── assets-index.md · external-assets.md (none) · external-setup.md (none) · open-questions.md (cero)
    └── screens/  template-entry.md · template-audience-home.md · template-topic.md
```
`SPEC/design-tokens.md` y `artifacts/styles/` contienen **los mismos valores** (fuente de verdad: `theme.css`).

## Árbol de consumo (cómo keel vendoriza en cada proyecto)
```
guide/
├── index.html                 template-entry (profundidad 0 → rutas _theme/… , brand/…)
├── _theme/                    el tema como unidad: css/ js/ fonts/ icons/  — NUNCA se edita por proyecto
├── brand/                     brand.css + logo.svg (+ logo-dark.svg)       — lo ÚNICO que keel personaliza
├── search-index.js            generado por keel (esquema en assets-index.md)
├── strings-<locale>.js        cadenas de interfaz por locale (esquema en assets-index.md)
└── {locale}/{user|dev}/       index.html + una página por tema (profundidad 2 → rutas ../../_theme/… , ../../brand/…)
```
**Exactamente dos variantes de rutas relativas:** raíz `_theme/…` · contenido `../../_theme/…`. Cada página lleva en el `<head>` el marcador `<meta name="keel-docs-theme" content="__THEME_VERSION__">` (placeholder literal que el empaquetado de cada release sustituye) para verificación mecánica de versión.

`artifacts/pages/guide/` ES ese árbol, funcional y offline. Los artefactos `templates/` y `components/` consumen el mismo `_theme/` vía ruta relativa; `styles/` y `assets/` son el catálogo canónico (copias) exigido por la estructura.

## Capa de marca (contrato cerrado)
Rebrandear = **sustituir la carpeta `brand/`**. Ni un selector del núcleo se edita. Lo único personalizable: `--brand-accent`, `--brand-accent-contrast`, `--brand-accent-soft`, `--brand-logo-w/-h`, los logos, y el nombre/versión/enlaces del pie. Todo acento inyectado debe cumplir la regla de contraste (≥4.5:1 vs fondo y vs superficie y vs su contraste, en ambos modos). Detalle y mecánica de presets: `SPEC/design-tokens.md` §8. El preset "José Conti" se aplaza a keel (decisión del usuario; `SPEC/open-questions.md`). Prueba de que funciona: `rebrand-proof.html` + `styles/brand-preset-example/`.

## Elementos firma del tema (qué lo hace reconocible y NO "plantilla genérica")
Tras el pase de autocrítica, el carácter de Errata vive en 4 firmas que se repiten por todo el tema y **no dependen del acento** (que cada proyecto cambia):
1. **H1 reglado** — titular en IBM Plex Sans con filete inferior de 1px, como el encabezamiento de un capítulo impreso.
2. **Numeración de sección en cursiva serif** — cada `h2` lleva su número en Source Serif 4 *itálica* (color de acento), traído del margen del manual a la web.
3. **Lead en cursiva serif** — la entradilla en itálica marca el cambio de registro entre título y cuerpo.
4. **Ritmo reglado, no flotante** — bordes de 1px y filetes de 2px en navegación/TOC; cero tarjetas con sombra difusa, cero radios grandes (máx 4px), cero gradientes. La jerarquía sale de la estructura y la tipografía.

Lista negra del brief evitada explícitamente: sin tarjetas flotantes r12–16 con sombra difusa como recurso universal, sin blobs pastel, sin gradientes morados dev, sin eyebrow-mayúsculas + palabra del titular en acento, sin rejilla de 3 tarjetas como único ritmo, sin separadores en curva, sin emojis, sin Inter/Poppins/Space Grotesk.

## Comprobaciones (Definition of Done)
- Cada página demo resuelve a plantilla + datos; ninguna duplicada estructuralmente (`manifest.md`).
- Cada plantilla tiene su SPEC con estados y breakpoints exactos (`screens/`).
- `design-tokens.md` = `styles/` (ambos modos + contrato de marca cerrado).
- **Rebrandeo:** `rebrand-proof.html` cambia solo `brand/`.
- **Offline:** el demo abre y funciona por completo desde `file://` (navegación, búsqueda, pestañas, plegables, ambos modos) sin una sola petición externa.
- Cada componente ejercitado ≥1 vez, en `es` y `en`, en ambas audiencias.
- Contrastes medidos en ambos modos (`accessibility.md`).
- `external-setup.md` = none · `open-questions.md` = cero.

## Nota sobre las fuentes
Los 10 `.woff2` (SIL OFL) están autoalojados en `guide/_theme/fonts/` (y copiados en `artifacts/assets/fonts/`), con sus dos licencias OFL. Se copiaron tal cual desde repos OFL públicos; sus coordenadas exactas (repo, rama, ruta, licencia) están en `SPEC/assets-index.md` §3. Ninguna transformación en el build. Si un archivo faltara, el tema cae con gracia a la pila de fallback del sistema (Georgia / system-ui / monospace).
