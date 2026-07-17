# Plan: keel-docs-theme — diseño canónico de la documentación que keel aplicará siempre

Fecha: 2026-07-16. Decisiones tomadas por José en esta sesión.

## 1. Decisiones

- **Problema:** la documentación es obligatoria en keel y se crea a medida que se desarrolla, pero el diseño del artefacto HTML sale improvisado en cada proyecto y deja que desear.
- **Solución:** un tema canónico diseñado UNA vez por Claude Design y aplicado SIEMPRE por keel.
- **Ubicación:** repositorio público `github.com/joseconti/keel-docs-theme`, con releases versionadas (semver). Cualquier asistente (Claude, Codex, Cursor, Gemini...) descarga la última release sin credenciales.
- **Alcance:** dos audiencias por proyecto — guía de usuario final y portal de desarrollador — con portada única donde el lector elige audiencia e idioma, y conmutador para saltar entre ellas. El portal de desarrollador es un RENDERIZADO de `docs/` (que sigue siendo Markdown y única fuente de verdad); la guía de usuario sigue su contrato actual de Fase 6.
- **Marca:** tema neutro + capa de marca estricta (`brand/`: acento con par de contraste, logo, nombre, versión, enlaces de soporte). Preset "José Conti" como primer preset real. Sirve también a terceros que usen keel.
- **Modo oscuro:** claro + oscuro automático por `prefers-color-scheme` en v1.
- **Búsqueda:** sí en v1, cliente y offline (índice embebido como script global, compatible `file://`; keel genera el índice por proyecto según el esquema de la SPEC).

## 2. El mecanismo — cómo keel aplicará el tema siempre

Cuando el tema exista con su release, keel (Fase 6) hará esto en cada proyecto:

1. **Obtener la última release** de `joseconti/keel-docs-theme` (zip de la release o `git clone --depth 1 --branch vX.Y.Z`). Sin red disponible: el usuario hace de courier (descarga el zip y lo coloca donde keel le diga), regla estándar de keel para fronteras de entorno.
2. **Vendorizar** el tema como unidad en `guide/_theme/` (css, js, fuentes, iconos). El proyecto queda autocontenido y offline: la red solo hace falta al instalar o al actualizar el tema, nunca para usar la guía.
3. **Rellenar la capa de marca** en `guide/brand/` (brand.css + logo) — lo único personalizable; con preset si existe (José Conti) o valores del proyecto.
4. **Generar el contenido** sobre las plantillas: portada, guía de usuario por locale (`guide/{locale}/user/`) y portal de desarrollador (`guide/{locale}/dev/`) derivado de `docs/` (arquitectura, API, uso, referencia, seguridad, accesibilidad, changelog). Más `search-index.js` y `strings-{locale}.js` según los esquemas de la SPEC del tema.
5. **Registrar la versión**: línea `Docs theme: vX.Y.Z` en la tarjeta de proyecto de `docs/PROGRESS.md` + entrada en `docs/decisions.md`. Cada página lleva `<meta name="keel-docs-theme" content="vX.Y.Z">` (lo estampa el empaquetado de la release).
6. **Pureza verificable:** `_theme/` no se edita jamás por proyecto (misma filosofía que la regla 10 del handoff-contract: reemplazable al por mayor). Si un proyecto necesita algo que el tema no tiene, es una issue/release del tema, nunca un fork local. `guide-qa` verifica: meta de versión presente y coherente con la tarjeta, `_theme/` íntegro (checksums publicados con cada release), páginas construidas sobre las plantillas.
7. **Actualizaciones:** proyectos nuevos toman la última release; proyectos existentes solo actualizan en mantenimiento con aprobación del usuario (el chequeo de frescura de `references/maintenance.md` incluye mirar si hay release nueva del tema). Nunca una actualización silenciosa.

## 3. Orden de ejecución

- **A. Design (ahora).** Pegar `MENSAJE-APERTURA-DESIGN.md` íntegro como primer mensaje en Claude Design. Opcional antes de pegar: adjuntar capturas anotadas de documentaciones que te gusten (nunca URLs). Design preguntará lo abierto (preset José Conti, referencias, nombre del demo).
- **B. Repo + build.** Cuando Design devuelva `design-handoff/`: crear `~/Documents/GitHub/keel-docs-theme`, colocar `docs/design/DESIGN-BRIEF.md` y la entrega en `docs/design/design-handoff/`, conectar la carpeta a Cowork, y gestionar el proyecto con keel: Fase 4 (auditar la entrega contra el handoff-contract y construir fiel), Fase 6, Fase 7 → **release v1.0.0** con zip + checksums. El README del repo documenta el árbol de consumo y el contrato de la capa de marca.
- **C. Cambios en keel-skill** (detallados en §4) para que keel aplique el tema siempre.
- **D. Primer consumidor.** El proyecto que ya tiene documentación con mal diseño: regenerar su `guide/` sobre el tema (vía mantenimiento), verificar con `guide-qa`, y de paso validar el mecanismo entero.

## 4. Cambios futuros en keel-skill (cuando exista la release; NUNCA cambiar versión sin instrucción explícita de José)

- **Nuevo `references/guide-theme.md`:** el mecanismo completo de §2 — repo canónico, obtención de release, árbol de vendorizado, capa de marca y presets, generación del portal dev desde `docs/`, registro de versión, regla de pureza, política de actualización, rama sin red (usuario courier).
- **`references/phase-6-documentation.md`:** la sección de `guide/` pasa de "HTML/CSS plano improvisado" a "construido sobre el tema canónico según `references/guide-theme.md`" (las reglas vanilla/offline/self-contained se mantienen: el tema las cumple por diseño). Se añade el portal de desarrollador (`guide/{locale}/dev/`) como render de `docs/`, con su decisión propia (¿se genera? ¿embarca en la release o queda repo-only?) registrada en decisions.md y la tarjeta. Preguntas batched igual que idiomas/embarque actuales.
- **`guide-qa`:** checks nuevos — meta de versión del tema presente y = tarjeta; `_theme/` íntegro contra checksums de la release; cobertura del portal dev contra `docs/api/INDEX.md` (uno a uno, como docs-verifier).
- **`references/maintenance.md`:** el deber de frescura incluye comprobar si hay release nueva del tema y ofrecer (nunca imponer) la actualización.
- **`MANIFEST.md`** (T1: `guide/_theme/` + `brand/` + meta como elementos condicionales; T2/T3: fila de la versión que José decida) + **CHANGELOG** + los cuatro sitios de versión, solo cuando José dé el número.

## 5. Prompt de retorno (para el chat donde se construya el tema, cuando la entrega esté colocada)

> Proyecto keel-docs-theme (repo nuevo `~/Documents/GitHub/keel-docs-theme`, gestionado con keel). Es el tema canónico de documentación (guía de usuario + portal de desarrollador, neutro + capa de marca) que keel aplicará a `guide/` en todos los proyectos; el plan completo está en `docs/PLAN-KEEL-DOCS-THEME.md`. El brief aprobado está en `docs/design/DESIGN-BRIEF.md` y la entrega de Design en `docs/design/design-handoff/`. Retomar en Fase 4 (faithful build), Paso 1: auditar la entrega contra `references/handoff-contract.md`. Objetivo de la Fase 7: release v1.0.0 con zip de consumo + checksums del tema.

## 6. Recordatorios

- La carpeta devuelta por Design va EXACTAMENTE en `docs/design/design-handoff/` y ahí no vive nada más (regla 10 del contrato).
- El usuario es el courier entre chats: mensajes completos listos para pegar, nunca instrucciones de qué componer.
- `docs/` (desarrollo) sigue siendo Markdown y fuente de verdad; el portal dev se regenera desde él, jamás al revés.
