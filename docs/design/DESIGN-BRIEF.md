# Design Brief: keel-docs-theme v1

## 0. Cómo debes trabajar (Design) — leer primero

Vas a producir un **sistema de diseño reutilizable + artefactos reales construidos + una SPEC que lo gobierna**, no un montón de páginas.

**Reglas duras:**

1. **Construye una vez, reutiliza por manifiesto.** Las páginas estructuralmente idénticas se construyen UNA vez como plantilla. No regeneres páginas casi idénticas — desperdicia tokens y crea deriva. Registra cada página que reutiliza una plantilla en `SPEC/manifest.md` con sus datos/variante.
2. **Especifícalo todo. Nada en el aire.** Cada plantilla, cada estado, cada breakpoint, cada comportamiento condicional recibe valores exactos y queda documentado en la SPEC.
3. **Cuando algo no esté definido, PREGUNTA — no inventes ni interpretes.** Recoge los puntos abiertos en `SPEC/open-questions.md` y pregúntalos directamente antes de finalizar. Un token adivinado o un comportamiento inventado es un defecto.
4. **Solo valores exactos.** Colores hex, px/rem, nombres de fuente reales + pesos, duraciones en ms, curvas de easing, z-index. Nunca "algo", "un poco", "azulado".
5. **Entrega los archivos reales Y la SPEC** en la estructura exacta de la Sección 6.

Este proyecto tiene una particularidad que lo gobierna todo: **no es la web de un producto — es el TEMA canónico de documentación que un sistema automatizado (keel) aplicará a la documentación de muchos productos distintos, de marcas distintas, durante años.** Cada decisión debe tomarse pensando en reutilización mecánica: otra herramienta rellenará tus plantillas con contenido real proyecto tras proyecto, sin ti delante. Todo lo que no esté especificado con exactitud se improvisará mal más adelante — por eso nada queda en el aire.

## 1. Contexto

- **Qué es:** un tema de documentación versionado y reutilizable — plantillas HTML + componentes + tokens — para el artefacto `guide/` que keel genera en cada proyecto de software. Cubre DOS audiencias por producto: la **guía de usuario final** (no técnico, orientada a tareas: "cómo hago X") y el **portal de desarrollador** (referencia de API, arquitectura, clases, funciones, hooks, seguridad).
- **Dónde vivirá el código final:** HTML estático abierto desde disco (`file://`) o servido desde cualquier hosting, sin servidor y sin paso de build. El tema se vendoriza (se copia tal cual) dentro de la carpeta `guide/` de cada proyecto consumidor.
- **Restricciones de host que debes respetar (vinculantes):**
  - HTML, CSS y JS vanilla. Sin frameworks, sin librerías, sin dependencias de build, sin scripts de terceros en runtime.
  - Cero peticiones externas: sin CDN, sin Google Fonts, sin analytics, sin iconos remotos. Todo autocontenido.
  - Debe funcionar abierto desde `file://`: nada de `fetch()` de archivos locales (bloqueado en `file://`) — cualquier dato (índice de búsqueda, cadenas) se carga como `<script src>` con variable global.
  - Solo rutas relativas, con exactamente dos profundidades de página (ver Sección 6): la portada en la raíz de `guide/` y las páginas de contenido en `guide/{locale}/{audiencia}/`.
  - Fuentes autoalojadas en `woff2` con licencia libre que permita redistribución (SIL OFL o equivalente), porque los archivos de fuente viajarán dentro del tema a todos los proyectos y a un repositorio público.
  - Preparado para RTL (dirección lógica en CSS: `margin-inline`, `padding-inline`, etc.) y para impresión (hoja de estilos print de la página de contenido).
  - Prohibido usar emojis en cualquier parte del tema (iconografía, títulos, contenido demo, cadenas de interfaz). Los iconos son SVG dibujados.
- **Audiencia / propósito:** lectores de documentación de software. El usuario final llega para resolver una tarea concreta; el desarrollador llega a consultar referencia técnica. La portada permite elegir audiencia e idioma; dentro, un conmutador permite saltar de una audiencia a la otra.

## 2. Marca y tokens (los valores canónicos)

- **Estado del sistema de diseño: fundacional y NEUTRO DE MARCA, en dos capas.** No existe sistema previo; tú fundas el sistema canónico de este tema, sabiendo que NO pertenece a ninguna marca: se aplicará a productos de marcas distintas. La arquitectura es obligatoria:
  - **Núcleo neutro (todo el tema):** tipografía, escala, espaciado, estructura, componentes, colores semánticos (fondos, superficies, texto, bordes, avisos, código, resaltado de sintaxis), modo claro y modo oscuro. Tiene que tener carácter propio (ver Sección 8) sin depender de una identidad de marca.
  - **Capa de marca (superficie de personalización estricta y cerrada):** un único archivo `brand/brand.css` de custom properties + un logo. Lo ÚNICO que un proyecto puede tocar para adoptar su marca es: `--brand-accent` y `--brand-accent-contrast` (par con contraste verificado en ambos modos), `--brand-accent-soft` (tinte de fondo derivado), el archivo `brand/logo.svg` (más `brand/logo-dark.svg` opcional) dentro de una caja de tamaño fija que tú defines, el nombre del producto, su versión, y los enlaces de soporte/web del pie. Nada más. Rebrandear = sustituir la carpeta `brand/`; ni un selector del núcleo se edita. El tema debe renderizar correcto y completo con la capa de marca en sus valores neutros por defecto.
  - Entregas el preset neutro por defecto y la mecánica documentada para crear presets. El primer preset real ("José Conti", para los productos del autor) se rellenará con los valores que el usuario te dé si se los pides ahora (ver `SPEC/open-questions.md`) o, si prefiere aplazarlo, lo rellenará keel en el primer uso siguiendo tu mecánica documentada.
- **Superficies/plataformas objetivo:** una sola superficie, explícita: web/HTML estático (escritorio, tablet y móvil, `file://` y hosting). Sin superficies anticipadas.
- **Paleta de color:** la fundas tú, con estas restricciones: modo claro + modo oscuro automático por `prefers-color-scheme` (sin conmutador manual en v1); roles semánticos mínimos: fondo, superficie, texto, texto secundario, borde, acento (el único delegado a la capa de marca), y los juegos completos de los 4 avisos (nota, consejo, atención, peligro), bloques de código y paleta de resaltado de sintaxis — todo con pares de contraste medidos y aprobados en AMBOS modos (Sección 5d).
- **Tipografía:** la eliges tú, con estas restricciones: una familia de texto con carácter y una monospace de verdad para código (en documentación técnica la monospace es protagonista: elígela con el mismo cuidado que la de texto). Licencia libre con redistribución permitida (OFL o equivalente); archivos `woff2` autoalojados en sus rutas finales con los `@font-face` escritos contra esas rutas exactas, solo los pesos usados. Vetadas por el usuario: Inter, Poppins y Space Grotesk. Define escala tipográfica, pesos, line-heights y longitud de línea máxima de lectura con valores exactos.
- **Escala de espaciado:** la defines tú con valores exactos (una escala única y coherente para todo el tema).
- **Radios / sombras / bordes:** preferencia firme del usuario: radios pequeños (2–4 px), bordes visibles de 1 px, jerarquía por estructura y tipografía — no tarjetas flotantes con sombras difusas por todas partes. Si usas sombra, que sea deliberada, escasa y con valores exactos.
- **Motion:** mínimo y funcional (estados de foco/hover, apertura de plegables, resultados de búsqueda). Duraciones y easing exactos + variante `prefers-reduced-motion` para cada transición.
- **Logo:** el tema NO tiene logo propio visible; muestra el logo del PRODUCTO documentado a través del slot de la capa de marca (tú defines la caja, tamaños mínimos y comportamiento con logos anchos/altos/cuadrados). Para el contenido demo crea una marca ficticia sencilla (con su SVG y PNG reales, indexados) que ocupe el slot.
- **Assets de marca aportados:** ninguno — el tema es neutro.
- **Referencias visuales:** el usuario puede adjuntar capturas de documentaciones que le gusten, cada una anotada con qué tomar de ella (nunca URLs). Si no adjunta ninguna, propones tú la dirección (Sección 8) y especificas exactamente lo elegido en la SPEC.

Si algo de lo anterior te resulta imposible de decidir sin el usuario, pregúntaselo antes de finalizar — no elijas por él.

Todo lo que definas queda documentado en `SPEC/design-tokens.md` y `artifacts/styles/` sabiendo que se convierte en el sistema canónico de documentación de keel para todos los proyectos futuros.

## 3. Inventario de pantallas (partido para reutilización)

Este proyecto es deliberadamente TODO plantillas y componentes; las páginas concretas las generará keel en cada proyecto rellenándolas con contenido real. Construye cada plantilla UNA vez:

**Plantillas (cada una construida una vez, cada una con su archivo SPEC):**

- `template-entry` — portada de `guide/` (única página en la raíz): logo y nombre del producto (capa de marca), una línea de descripción, versión del producto, elección de audiencia (Guía de usuario / Documentación de desarrollador), selector de idioma, pie con enlaces de soporte. Sin hero de marketing: es una puerta, no una landing.
- `template-audience-home` — portada de cada audiencia (una por idioma y audiencia): para usuario, los grupos de tareas y entradas destacadas (instalación, primeros pasos, solución de problemas); para desarrollador, las secciones del portal (Arquitectura, API, Uso, Referencia, Seguridad, Accesibilidad, Changelog). Misma plantilla, dos variantes de datos — no dos plantillas.
- `template-topic` — la página de contenido, el caballo de batalla (el 95 % de las páginas de ambas audiencias): sidebar de navegación con grupos plegables y página actual resaltada, breadcrumb, columna de contenido con anchura de lectura controlada, tabla de contenidos "en esta página", anterior/siguiente, conmutador de audiencia, selector de idioma, búsqueda, pie. UNA plantilla para las dos audiencias: la audiencia cambia los datos de navegación y qué componentes aparecen, nunca la estructura. Si mientras diseñas ves que necesitas separarlas, es una pregunta para el usuario, no una decisión tuya.

**Componentes (reutilizables, cada uno con todos sus estados):**

Navegación y estructura: sidebar con grupos plegables; breadcrumb; TOC "en esta página" con resaltado de sección activa al hacer scroll; paginación anterior/siguiente; conmutador de audiencia; selector de idioma; buscador con resultados desplegables navegables por teclado; skip-link; pie con enlaces de soporte.

Contenido didáctico (audiencia usuario): secuencia de pasos numerados; bloque "qué deberías ver" (resultado esperado tras un paso); avisos de 4 tipos (nota, consejo, atención, peligro) con icono SVG propio; figura/captura de pantalla con pie; teclas `kbd`; tablas; detalles plegables; bloque de ajuste de configuración (dónde vive, valores válidos, valor por defecto, efecto).

Contenido técnico (audiencia desarrollador): bloque de código con etiqueta de lenguaje y botón copiar; bloque de terminal/comando; pestañas de código accesibles para variantes del mismo ejemplo (por ejemplo curl / PHP / JS); bloque de superficie de API (firma, tabla de parámetros con tipo/requerido/defecto, respuesta, errores, ejemplo real); bloque de hook/filtro (nombre, parámetros, ejemplo ejecutable); bloque de clase/función; insignias "desde vX.Y" y "obsoleto".

Si descubres más oportunidades de reutilización mientras diseñas, colápsalas en plantillas o componentes y actualiza el manifiesto — no produzcas duplicados.

## 4. Estados y comportamiento a especificar por plantilla

Para cada plantilla, primero indica QUÉ HACE (su propósito y las acciones disponibles), y después diseña Y documenta cada estado aplicable:

- default, hover, focus, active, disabled donde aplique; loading no existe (sitio estático); estado vacío del buscador (sin resultados) y del índice (sin datos).
- **Breakpoints:** los propones tú y los FIJAS con valores exactos en px; deben cubrir escritorio ancho, portátil, tablet y móvil. Documenta por breakpoint qué pasa con el sidebar (en pantallas estrechas se pliega a un disclosure accesible manejado con JS vanilla), con la TOC "en esta página" (se oculta o se pliega) y con las tablas y bloques de código anchos (scroll horizontal contenido, nunca romper el layout; los identificadores largos de código no desbordan).
- **Variantes condicionales:** por audiencia (usuario/desarrollador: misma plantilla, navegación y componentes distintos), por idioma (el selector lleva a la misma página en el otro idioma cuando existe; defines el comportamiento cuando no existe), por modo (claro/oscuro automático), reduced motion, impresión (print de `template-topic`: sin navegación, contenido limpio, URLs de enlaces visibles).
- **Búsqueda (v1, decidida por el usuario):** cliente y offline. El índice se carga como `<script src="search-index.js">` que define una variable global (funciona en `file://`); keel genera ese archivo en cada proyecto siguiendo el esquema que TÚ documentas en la SPEC (campos exactos: título, ruta, audiencia, idioma, extracto, términos). Comportamiento: filtra por audiencia e idioma actuales, insensible a mayúsculas y diacríticos, resultados navegables por teclado (flechas + Enter, Escape cierra), estado "sin resultados" diseñado, anuncio del número de resultados para lectores de pantalla. JS vanilla, sin dependencias.

Documenta cada plantilla en `SPEC/screens/<plantilla>.md` y el comportamiento transversal (búsqueda, plegado del sidebar, conmutadores, scroll de la TOC) en `SPEC/interactions.md`.

## 5. Contenido y assets

- **Copy:** contenido demo creado por ti y marcado como placeholder en la SPEC. El demo es la prueba de aceptación del tema: un producto ficticio documentado en `es/` y `en/`, con las DOS audiencias pobladas y CADA componente del inventario ejercitado al menos una vez (una guía de usuario con instalación, configuración, dos tareas y solución de problemas; un portal de desarrollador con arquitectura, dos superficies de API, un hook, una clase y changelog). Este demo vivirá en el repositorio del tema como styleguide permanente.
- **Cadenas de interfaz del tema** ("Buscar", "En esta página", "Anterior", "Siguiente", "Guía de usuario", "Documentación de desarrollador", "Sin resultados", etc.): externalizadas en un único archivo de cadenas por idioma (cargado como script global, mismo mecanismo que el índice), nunca incrustadas en las plantillas. Entregas `es` y `en`; el esquema documentado para que keel añada locales.
- **Iconos/ilustraciones:** juego mínimo de iconos SVG dibujados y coherentes (avisos, búsqueda, idioma, audiencia, copiar, plegar, externo, anterior/siguiente). Cada logo e icono en SVG Y PNG (SVG optimizado con viewBox y sin restos de editor; PNG al tamaño intrínseco más las densidades necesarias), todo indexado en `SPEC/assets-index.md`. Formatos listos para usar tal cual — el build nunca convierte, recolorea ni redimensiona nada.
- **i18n:** el tema soporta cualquier locale; la v1 entrega demo y cadenas en `es` + `en`. Preparado para RTL. `lang` correcto en cada página.
- **Objetivo de accesibilidad:** WCAG 2.2 AA como suelo, AAA donde sea viable (es documentación: lectura prolongada — apunta alto en contraste de texto). Se especifica por plantilla en la Sección 5d.

## 5b. Configuración de software externo

Ninguna. Este tema no requiere configurar ningún software externo: escribe explícitamente "none" en `SPEC/external-setup.md` para que la ausencia quede registrada.

## 5c. Assets que tú (Design) no puedas producir

No se prevé ninguno (no hay fotografía ni ilustración compleja: todo es tipografía, iconos SVG y estructura). Si durante el diseño identificas alguno, decláralo en `SPEC/external-assets.md` con su prompt base neutral completo según el contrato; si no, escribe "none" explícito.

## 5d. Accesibilidad (innegociable — especifica por plantilla, no la delegues al build)

La accesibilidad la diseñas y documentas tú, en `SPEC/accessibility.md` más notas por plantilla en `SPEC/screens/<plantilla>.md`:

- **Nivel objetivo:** WCAG 2.2 AA suelo, AAA donde sea viable; EN 301 549 / EAA (el tema se usará en productos del ámbito UE).
- **Pares de contraste verificados** para cada par texto/fondo y objeto/fondo, con su ratio medido, EN AMBOS MODOS (claro y oscuro) — incluida la paleta de resaltado de sintaxis y los 4 tipos de aviso. Además: la exigencia de contraste que debe cumplir cualquier `--brand-accent` que un proyecto inyecte, documentada como regla verificable (por ejemplo: ratio mínimo contra fondo y contra `--brand-accent-contrast` en ambos modos).
- **Indicador de foco visible** con estilo/tokens exactos y **orden de foco** por plantilla (incluidos sidebar plegado, búsqueda con resultados abiertos y pestañas de código).
- **Nombre, rol y estado accesibles** de cada componente en cada estado (grupos plegables, pestañas, buscador con listbox, botón copiar con su anuncio de "copiado", conmutadores de audiencia e idioma).
- **Estructura de encabezados y landmarks** por plantilla (banner, nav, main, aside de TOC, contentinfo; navegable por titulares y por regiones).
- **Tamaños de objetivo** mínimos (24×24 CSS px con espaciado adecuado) en toda la navegación táctil.
- **Variante reduced-motion** de cada animación; comportamiento con **escalado de texto/reflow al 200 %** y **alto contraste/forced-colors**.
- **Identificación de errores y estados** nunca solo por color (los 4 avisos se distinguen también por icono y rótulo).
- **Alternativas de texto** para cada icono con significado; los decorativos, ocultos correctamente.
- **RTL/bidi:** el tema es multilingüe por diseño; documenta el comportamiento RTL de sidebar, breadcrumb, TOC y paginación.

Lo que no puedas decidir es una pregunta para el usuario en `SPEC/open-questions.md` — nunca un valor inventado ni algo que el build rellenará.

## 6. Estructura de entrega obligatoria (innegociable)

Entrega una carpeta `design-handoff/` exactamente así:

```
design-handoff/
├── README.md
├── artifacts/
│   ├── templates/      # template-entry, template-audience-home, template-topic — cada una construida UNA vez
│   ├── components/     # cada componente del inventario, aislado y con sus estados
│   ├── pages/          # SOLO el demo (las páginas del producto ficticio que ejercitan todo)
│   ├── assets/         # svg/ + png/ de iconos y marca demo, fonts/ (woff2 reales autoalojados)
│   └── styles/         # tokens como CSS custom properties + estilos globales + brand/brand.css neutro
└── SPEC/
    ├── manifest.md         # cada página demo → plantilla + datos; nada único salvo lo declarado
    ├── design-tokens.md    # valores canónicos exactos, ambos modos, y el contrato de la capa de marca
    ├── screens/<plantilla>.md
    ├── interactions.md     # búsqueda, plegados, conmutadores, TOC activa, copiar código
    ├── assets-index.md     # cada asset: archivo → dónde se usa → tamaño intrínseco → formatos entregados
    ├── external-assets.md  # "none" salvo hallazgo, con detalle completo si lo hay
    ├── external-setup.md   # "none"
    ├── accessibility.md    # el contrato a11y completo de 5d, ambos modos
    └── open-questions.md   # todo lo indefinido — pregúntalo al usuario; debe quedar a cero
```

`SPEC/design-tokens.md` y `artifacts/styles/` deben contener los mismos valores.

Además, tus artefactos deben respetar el **árbol de consumo** en el que keel vendorizará el tema en cada proyecto — diséñalos ya con estas rutas relativas:

```
guide/
├── index.html                  # template-entry (profundidad 0)
├── _theme/                     # el tema vendorizado como unidad: css/, js/, fonts/, icons/ — NUNCA se edita por proyecto
├── brand/                      # brand.css + logo.svg (+ logo-dark.svg) — lo único que keel personaliza
├── search-index.js             # generado por keel por proyecto, según tu esquema
├── strings-<locale>.js         # cadenas de interfaz por locale, según tu esquema
└── {locale}/                   # es/, en/, ...
    ├── user/                   # guía de usuario: index.html + una página por tema (profundidad 2)
    └── dev/                    # portal de desarrollador: index.html + páginas (profundidad 2)
```

Consecuencias que debes cumplir: exactamente dos variantes de rutas relativas (raíz: `_theme/...`; contenido: `../../_theme/...`); todo funciona desde `file://`; cada plantilla lleva en el `<head>` el marcador `<meta name="keel-docs-theme" content="__THEME_VERSION__">` (el placeholder literal `__THEME_VERSION__`, que el empaquetado de cada release sustituirá) para que keel pueda verificar mecánicamente qué versión del tema lleva cada proyecto.

## 7. Definition of done

No des la entrega por terminada hasta que:

- Cada página demo de `manifest.md` resuelve a una plantilla + datos concretos; ninguna página estructuralmente duplicada.
- Cada plantilla tiene su SPEC con todos los estados y todos los breakpoints con tokens exactos.
- `SPEC/design-tokens.md` documenta ambos modos completos y el contrato cerrado de la capa de marca (qué variables existen, qué puede tocar un proyecto, qué regla de contraste debe cumplir un acento inyectado), y coincide con `artifacts/styles/`.
- **Prueba de rebrandeo:** demuestras con un segundo `brand.css` de ejemplo que cambiando SOLO la carpeta `brand/` el demo queda correctamente rebrandeado en ambos modos, sin tocar nada más.
- **Prueba offline:** el demo abre y funciona por completo desde `file://` — navegación, búsqueda, pestañas, plegables, ambos modos — sin una sola petición externa.
- El demo ejercita cada componente del inventario al menos una vez, en `es` y `en`, en las dos audiencias.
- Cada asset existe en `artifacts/assets/` e indexado (SVG+PNG para cada icono/logo, woff2 reales de las fuentes con su licencia incluida), o está declarado en `external-assets.md`; nada exige transformación en el build.
- `SPEC/accessibility.md` y las notas por plantilla están completas según 5d, con ratios medidos en ambos modos.
- `SPEC/external-setup.md` dice "none"; `SPEC/open-questions.md` está a cero (preguntaste y registraste las respuestas).

Si no puedes cumplir un punto porque falta información: para, pregunta al usuario la duda concreta y solo entonces finaliza. Inventar la respuesta no es aceptable.

## 8. Dirección de arte

**Innegociables técnicos, primero:** vanilla sin excepciones; fuentes autoalojadas OFL, jamás un CDN; sin emojis en ninguna parte; radios 2–4 px y bordes 1 px visibles.

**Tono:** técnico, sobrio y preciso. Esto es documentación para trabajar, no marketing: sin hero, sin CTAs, sin ilustraciones decorativas, sin gradientes de ambiente. La personalidad sale de la tipografía, el ritmo vertical, la densidad bien resuelta y unos pocos elementos firma — no de la decoración. La vara de calidad: la documentación impresa de ingeniería bien encuadernada, trasladada a la web con oficio.

**Lista negra literal (el "look documentación IA" a evitar):** tarjetas flotantes con radio 12–16 px y sombra difusa como recurso universal; blobs o elipses pastel de fondo; gradientes morados de herramienta dev; eyebrow en mayúsculas + palabra del titular pintada en el color de acento; grid de 3 tarjetas como único ritmo; separadores en curva; iconos emoji en los titulares; Inter/Poppins/Space Grotesk. Si al terminar parece la doc por defecto de cualquier generador de sitios, has fallado aunque cada regla se haya cumplido.

**Ejercicio de divergencia obligatorio:** antes de consolidar, produce **3 direcciones divergentes de `template-topic`** (la plantilla más vista), cada una de una familia estética distinta y con nombre propio, cada una con al menos una apuesta arriesgada (en tipografía, en la relación sidebar/contenido, en el tratamiento del código, en el uso del acento de marca...). Preséntalas al usuario, que elegirá; consolida la elegida conservando 1–2 elementos firma reconocibles que se repitan por todo el tema. Las tres direcciones deben seguir siendo neutras de marca: su carácter no puede depender del color de acento (que cada proyecto cambiará).

**Pase final de autocrítica:** antes de entregar, revisa el demo completo preguntándote dónde se ve "plantilla genérica" y corrígelo. Documenta en el README de la entrega qué elementos firma definen este tema.

## 9. Preguntas abiertas conocidas (llévalas a `SPEC/open-questions.md` y pregúntalas)

1. Los valores del preset de marca "José Conti" (color de acento y logo SVG de sus productos), o su decisión explícita de aplazarlo y que lo rellene keel en el primer uso.
2. Si quiere adjuntar capturas anotadas de documentaciones que le gusten como referencia de dirección, o te deja proponer las 3 direcciones sin referencias.
3. El nombre del producto ficticio del demo (propón tú dos o tres; decide él).
