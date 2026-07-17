# screens/template-audience-home.md

Portada de cada audiencia (una por idioma y audiencia: 4 instancias en el demo). **Misma plantilla, dos variantes de datos** (user/dev) — no dos plantillas. Archivo canónico: `artifacts/templates/template-audience-home.html`.

## Qué hace / acciones disponibles
Punto de entrada de una audiencia: presenta sus temas agrupados en tarjetas navegables. Reutiliza el MISMO header y sidebar que `template-topic` (para no perder la navegación global). Difiere en el `<main>`: sin TOC ni breadcrumb ni pager; en su lugar, grupos de secciones con rejilla de tarjetas.
- **user:** grupos de tareas y entradas destacadas (p. ej. Primeros pasos → Instalación, Configuración; Tareas → Sincronizar, Almacenes; Ayuda → Solución de problemas).
- **dev:** secciones del portal (Fundamentos → Arquitectura; API → Inventario, Webhooks; Referencia → Clase Client; Registro → Changelog).

Acciones: navegar a un tema (tarjeta o sidebar), cambiar audiencia/idioma, buscar. Layout `layout--no-toc` (2 columnas: sidebar + contenido).

## Estados
- **default / hover / focus:** `.topic-card` con hover (borde acento + fondo `--color-surface-2`) y `:focus-visible`. Enlaces del sidebar/switchers como en template-topic.
- **active:** en el sidebar, el enlace "Introducción" (home) lleva `aria-current="page"`.
- **disabled / loading:** no aplican.
- **vacío:** un grupo sin temas simplemente no se renderiza (keel no emite grupos vacíos); la búsqueda tiene su estado vacío estándar.

## Breakpoints
| Rango | Layout | Rejilla de tarjetas | Sidebar |
|-------|--------|---------------------|---------|
| ≥1280 | `264px / 1fr` | `repeat(auto-fill, minmax(240px,1fr))` | columna sticky |
| 1024–1279 | `240px / 1fr` | igual (auto-fill) | columna |
| 768–1023 | `240px / 1fr` | auto-fill (2–3 col según ancho) | columna |
| <768 | 1 col | 1 col | **drawer** (igual que template-topic) |

`--content-pad` como en template-topic (48/36/20). La rejilla es `auto-fill`, así que el número de columnas se adapta sin media queries adicionales; nunca hay una "rejilla de 3 tarjetas" fija como único ritmo.

## Variantes condicionales
- **Audiencia:** cambia el conjunto de grupos/tarjetas y el `data-audience`; estructura idéntica.
- **Idioma:** el selector lleva a la portada de la misma audiencia en el otro locale.
- **Modo / reduced-motion / impresión:** como el resto del tema (impresión: sin chrome, tarjetas como lista de enlaces con URLs visibles).

## Accesibilidad
- Landmarks: `banner`, `search`, `nav` (sidebar/switchers), `main#main`, `contentinfo`. Sin `aside` de TOC (no hay TOC).
- Jerarquía: `h1` = título de la audiencia; cada grupo es un `h2` (`.section-group__title`); las tarjetas son enlaces con título (`.topic-card__title`) y descripción.
- Objetivos: tarjetas con área amplia (≥44px de alto efectivo). Foco visible en cada tarjeta.
