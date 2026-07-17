# manifest.md — páginas demo → plantilla + datos

El tema es TODO plantillas. El demo (producto ficticio **Basalt**) es la styleguide permanente: instancia cada plantilla con datos reales, en `es` y `en`, en las dos audiencias. **Ninguna página está construida a mano ni duplicada estructuralmente**: todas se generan del mismo constructor (`artifacts/pages/` = literalmente "construir una vez, reutilizar por manifiesto"). Este archivo es ese manifiesto.

Árbol de consumo real (cómo keel vendoriza): ver README §Árbol de consumo. Rutas relativas: raíz `_theme/…`; contenido (profundidad 2) `../../_theme/…`.

## Plantillas (construidas una vez)

| Plantilla | Archivo canónico | SPEC | Instancias en el demo |
|-----------|------------------|------|------------------------|
| template-entry | `artifacts/templates/template-entry.html` | `screens/template-entry.md` | 1 |
| template-audience-home | `artifacts/templates/template-audience-home.html` | `screens/template-audience-home.md` | 4 (2 idiomas × 2 audiencias) |
| template-topic | `artifacts/templates/template-topic.html` | `screens/template-topic.md` | 20 (2 idiomas × 2 audiencias × 5 temas) |

## Páginas del demo (cada una → plantilla + datos)

Ruta relativa a `guide/`. `variante` = audiencia (los datos de navegación y qué componentes aparecen cambian; la estructura, nunca).

| # | Ruta | Plantilla | locale | audiencia | Datos / clave | Componentes que ejercita |
|---|------|-----------|--------|-----------|----------------|--------------------------|
| 1 | `index.html` | template-entry | es (con panel en) | — | Basalt v2.4.0 | logo slot, selector de idioma, tarjetas de audiencia, footer |
| 2 | `es/user/index.html` | template-audience-home | es | user | grupos: Primeros pasos, Tareas, Ayuda | sidebar, switchers, search, topic-grid, footer |
| 3 | `es/user/instalacion.html` | template-topic | es | user | key=install | pasos, expected, kbd, admonition nota+consejo, figura |
| 4 | `es/user/configuracion.html` | template-topic | es | user | key=config | setting, tabla, admonition atención, kbd, disclosure |
| 5 | `es/user/sincronizar-inventario.html` | template-topic | es | user | key=sync | pasos, expected, admonition nota |
| 6 | `es/user/gestionar-almacenes.html` | template-topic | es | user | key=warehouses | pasos, tabla, admonition consejo |
| 7 | `es/user/solucion-problemas.html` | template-topic | es | user | key=trouble | admonition peligro+atención+nota, disclosure |
| 8 | `es/dev/index.html` | template-audience-home | es | dev | grupos: Fundamentos, API, Referencia, Registro | igual que #2, datos dev |
| 9 | `es/dev/arquitectura.html` | template-topic | es | dev | key=architecture | figura, terminal, ul, admonition peligro |
| 10 | `es/dev/api-inventario.html` | template-topic | es | dev | key=apiinv | API surface (GET+POST), tabla de parámetros, code-block con pestañas curl/PHP/JS, copiar, badge since, admonition atención |
| 11 | `es/dev/api-webhooks.html` | template-topic | es | dev | key=apihook | API surface (POST), hook/filtro, code-block, admonition peligro |
| 12 | `es/dev/clase-client.html` | template-topic | es | dev | key=apiclass | bloque de clase, code-block, tabla de métodos, badge deprecated+since |
| 13 | `es/dev/changelog.html` | template-topic | es | dev | key=changelog | listas con badges since/deprecated, tabla de versiones |
| 14–25 | `en/user/*` y `en/dev/*` | (mismas plantillas) | en | user/dev | mismas claves, contenido traducido | espejo 1:1 de #2–#13 en inglés |

Total: **1 entry + 4 audience-home + 20 topic = 25 páginas** + `search-index.js` + `strings-es.js` + `strings-en.js`.

## Cobertura del inventario de componentes (DoD)

Cada componente aparece al menos una vez, en `es` y `en`, en la audiencia correcta:

- **Transversales (todas las páginas de contenido):** sidebar con grupos plegables · breadcrumb · TOC con scrollspy · paginación · conmutador de audiencia · selector de idioma · buscador (con estado vacío) · skip-link · footer.
- **Usuario:** pasos (#3,#5,#6) · expected (#3,#5) · avisos nota (#3,#5,#7), consejo (#3,#6), atención (#4,#7), peligro (#7) · figura (#3) · kbd (#3,#4) · tabla (#4,#6) · disclosure (#4,#7) · setting (#4).
- **Desarrollador:** code-block + etiqueta + copiar (#10,#11,#12) · pestañas de código curl/PHP/JS (#10) · terminal (#9) · API surface (#10,#11) · hook/filtro (#11) · clase/función (#12) · badges since/deprecated (#10,#12,#13) · admonition peligro (#9,#11).

El catálogo aislado de todos los componentes con sus estados: `artifacts/components/components.html`.

## Prueba de rebrandeo (no es una página del producto)

`artifacts/pages/rebrand-proof.html` — la misma `api-inventario` renderizada usando el núcleo intacto y **solo** la carpeta de marca alternativa `styles/brand-preset-example/` (preset "Meridian", terracota). Demuestra que el rebrandeo cambia únicamente `brand/`.
