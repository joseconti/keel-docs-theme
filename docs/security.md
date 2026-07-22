# Security — keel-docs-theme (applied posture)

Profile: `references/security/library-component.md` (reusable component / library).
This is the **applied** result for this project, not the generic profile — what is
in place, where, and how a maintainer keeps it intact.

## Threat model

The theme is a **vendored static asset**: a consumer downloads a release, copies
`_theme/` into its own `guide/_theme/`, adds a brand layer and content, and serves
the result as plain files (often `file://`). There is no server, no build step, no
runtime configuration, and no code path that executes caller-supplied strings. The
realistic risks are therefore: (a) the theme making a network request the consumer
did not ask for, (b) the theme's client-side JS turning consumer-generated content
into script (XSS), and (c) a tampered or secret-carrying distributable. Each is
addressed below.

## Safe by default / no hidden side effects

- **Zero external requests, zero telemetry, zero dynamic execution.** Audited on
  the shipped tree (`theme/_theme/js/theme.js` is the only script): no `fetch`,
  `XMLHttpRequest`, `WebSocket`, `sendBeacon`, dynamic `import()`, `eval`,
  `new Function`, `document.write`, or `.src=` assignment. Fonts are self-hosted
  woff2; no CDN, no analytics, no external URL anywhere in `_theme/` (CSS/JS/HTML).
  This is the offline contract (D-001) enforced as a security property.
- **No file/system/storage access the consumer didn't ask for.** The script only
  reads a global search index the consumer generated and manipulates the DOM of the
  page it is on. It does not use cookies, `localStorage`, or `sessionStorage`.
- **Fail safe on missing data.** Absent/empty search index or strings degrade to an
  inert search box, never an error that breaks the page.

## Input boundaries (the client-side XSS surface)

The one place the theme turns data into markup is the search results renderer
(`theme/_theme/js/theme.js`). It is safe by construction:

- `escapeHtml()` (theme.js:283) escapes the five HTML-significant characters
  `& < > " '`.
- `highlight()` (theme.js:274) escapes **every** slice of the title/excerpt before
  it is inserted and only ever injects a literal `<mark>` wrapper around the
  (also-escaped) matched substring. `escapeHtml()` is applied to the section crumb
  too (theme.js:330).
- Result: even a **hostile search index** cannot inject script through titles,
  excerpts, or section labels — the content is escaped, not trusted.

**Documented trust assumption (consumer's responsibility):** each result's link
target is set as `a.href = BASE + e.path` (theme.js:324). The consumer generates
`search-index.js`; it must contain ordinary in-project relative paths and must not
put `javascript:` (or other active) URIs in `path`. The theme escapes *content* but
does not police the *href scheme* of a path the consumer authored for its own site.
Keel generates this index from the project's own `docs/`, so in normal use it is
first-party data.

## Supply chain & dependencies

- **No runtime dependencies.** No `package.json`, no npm/composer tree, nothing to
  audit or pin at runtime — the smallest possible inherited-risk surface for every
  consumer.
- **Bundled fonts are the only third-party artifacts,** all SIL OFL, shipped with
  their license files inside the unit (`_theme/fonts/LICENSE-IBMPlex.txt`,
  `_theme/fonts/LICENSE-SourceSerif4.md`). OFL permits redistribution with the
  license attached (D-004).
- **Reproducible, verifiable distributable.** `scripts/package.sh` stamps
  `__THEME_VERSION__` and emits `dist/checksums.txt` — SHA-256 of every packaged
  file plus the zip. Consumers verify `guide/_theme/` against `checksums.txt` after
  vendoring; the unit is **never edited per project** (a project-side need is an
  upstream issue, never a local fork — D-001/D-007).

## Distributed-artifact hygiene

- **The package contains only what is intended:** `theme/` (the vendorable
  `_theme/`, templates, brand preset, examples) + `LICENSE` + `CHANGELOG.md`. Build
  output lives in `dist/`, which is git-ignored; repo-only material (`docs/`,
  design handoff, `CLAUDE.md`/`AGENTS.md`) is not part of the release zip.
- **No secrets, ever.** The confidential-data gate runs before every commit
  (SKILL.md, unbreakable rule); the theme carries no tokens, keys, or endpoints in
  code, examples, or fixtures. The example brand preset and search index hold only
  synthetic "Basalt"/"Meridian" demo data.

## API stability & disclosure

- **Semantic versioning**, MIT license (D-004). The public "surface" is the vendor
  contract: the `_theme/` layout, the three slot templates, the brand-layer tokens,
  and the `search-index.js` / `strings-<locale>.js` schemas. A breaking change to
  any of these is a major; the CHANGELOG documents changes oldest → newest.
- **Vulnerability reporting:** open a security issue (or a private advisory) on
  `github.com/joseconti/keel-docs-theme`. Supported version: the latest release.
  A security fix ships as a new patch release through the maintenance hotfix path
  and is called out in the CHANGELOG.

## How a maintainer keeps this intact

1. Never introduce a network call, storage access, or dynamic-execution primitive
   into `_theme/` — the offline/no-telemetry contract is a security property, not a
   style choice. If a feature seems to need one, it is a design decision for the
   record, not a silent addition.
2. Keep the search renderer escaping **all** injected content; never replace an
   `escapeHtml()`/`highlight()` path with raw `innerHTML` of index data.
3. Keep fonts self-hosted with their licenses bundled; never swap to a CDN.
4. Regenerate `dist/checksums.txt` from source on every release
   (`scripts/package.sh`) and verify assets after publishing (L-002).
5. Run the confidential-data scan before every commit.

## Known gaps / honest notes

- No automated SAST/dependency scanner runs in CI (there are no runtime
  dependencies to scan and no CI configured — `Assistant config: none`, D-005). The
  JS security surface is small and was reviewed by inspection (recorded above).
- The href-scheme trust assumption above is a genuine boundary: it is documented,
  not eliminated, because the theme cannot know a consumer's legitimate path space.
