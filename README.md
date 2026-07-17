# keel-docs-theme

The canonical documentation theme that [keel](https://github.com/joseconti/keel-skill) vendors into the `guide/` artifact of every project it manages: an **end-user guide plus a developer portal**, built as a brand-neutral core with a strict, closed brand layer. Versioned, vendorable, offline by contract. Plain HTML + CSS + vanilla JS — no build step, no dependencies, no external requests. Works from `file://`.

Art direction: **Errata** — an editorial engineering manual brought to the web. Source Serif 4 for prose, IBM Plex Sans for UI and headings, IBM Plex Mono for code (all SIL OFL, self-hosted). Ruled H1, section numbers in serif italic, 1 px borders, 2–4 px radii, no gradients, automatic light and dark via `prefers-color-scheme`.

**See it now:** open `demo/index.html` from disk — the complete bilingual demo (fictional product "Basalt") is the theme's permanent living styleguide and exercises every component.

## Repository layout

```
theme/            what a release packages (plus LICENSE and CHANGELOG.md)
├── _theme/       THE VENDORABLE UNIT: css/ js/ fonts/ icons/ — copied as-is, never edited per project
├── templates/    template-entry.html · template-audience-home.html · template-topic.html (slot templates)
├── brand/        neutral brand preset (brand.css) — the ONLY per-project customization surface
└── examples/     search-index.js · strings-es.js · strings-en.js (schema instances) · brand-preset-meridian/
demo/             the Basalt styleguide: a real consumption tree, fully functional offline
docs/             project records (design handoff, BUILD-SPEC, keel state) — not part of a release
scripts/          package.sh — builds the release zip + checksums
```

## How an assistant applies the theme (the keel mechanism)

1. **Download the latest release zip** from this repo's Releases (no credentials needed). Do not scrape the repo tree: the repo keeps the literal `__THEME_VERSION__` placeholder; only release packages are version-stamped.
2. **Vendor `_theme/` as-is** into the consuming project at `guide/_theme/`. It is NEVER edited per project — verify integrity against the release's `checksums.txt`. If the project needs something the theme lacks, that is an issue on this repo, never a local fork.
3. **Fill the brand layer** at `guide/brand/`: copy `brand/brand.css` and set ONLY its six custom properties (light + dark), add the project's `logo.svg` (required; `logo-dark.svg` optional, auto-swapped). Any injected accent MUST pass the contrast contract below.
4. **Generate the pages** from `templates/` into the consumption tree (below): fill the `{{ slot }}` placeholders, keep the markup and relative paths exactly as templated. One entry page at the root; one audience home + topic pages per `{locale}/{user|dev}/`.
5. **Generate the data files** per project: `guide/search-index.js` and `guide/strings-<locale>.js`, following the schemas (see `examples/` and `docs/design/design-handoff/SPEC/assets-index.md` §4). Copy `strings-es.js`/`strings-en.js` as-is for es/en; for a new locale, copy one and translate the VALUES only — keys are the stable contract.
6. **Verify**: every generated page keeps its `<meta name="keel-docs-theme" content="vX.Y.Z">` (stamped in the release files) so tooling can check mechanically which theme version a project carries.

### The consumption tree

```
guide/
├── index.html                  from template-entry (depth 0 → paths are _theme/… , brand/…)
├── _theme/                     the vendored theme unit — never edited per project
├── brand/                      brand.css + logo.svg (+ logo-dark.svg) — the only customized folder
├── search-index.js             generated per project (search schema)
├── strings-<locale>.js         UI strings per locale
└── {locale}/{user|dev}/        index.html + one page per topic, from the templates
                                (depth 2 → paths are ../../_theme/… , ../../brand/…)
```

Exactly two relative-path variants exist (root `_theme/…`, content `../../_theme/…`) — the templates already carry the correct ones. Everything works from `file://`: data loads as global `<script src>` files, never `fetch()`.

## Brand layer contract (closed)

Rebranding = replacing the `brand/` folder. Nothing in `_theme/` is ever edited. A project may set ONLY:

| Variable | Meaning |
|---|---|
| `--brand-accent` | accent color (links, active states) |
| `--brand-accent-contrast` | text/icon color on accent fills |
| `--brand-accent-soft` | soft background tint for active/selected |
| `--brand-logo-w` / `--brand-logo-h` | logo slot box (contain, never cropped) |

plus the logo files and the product name/version/support links injected as content. **Contrast contract** (verifiable with any WCAG checker, in BOTH modes): accent vs `--color-bg` ≥ 4.5:1, accent vs `--color-surface` ≥ 4.5:1, contrast-on-accent vs accent ≥ 4.5:1. Backgrounds to check against: light `#FAF7F1`/`#FFFDF8`, dark `#17150F`/`#1E1B14`. The neutral preset and the Meridian example (`theme/examples/brand-preset-meridian/`) both comply — full mechanics in `docs/design/design-handoff/SPEC/design-tokens.md` §8.

## Accessibility

WCAG 2.2 AA floor with AAA on nearly all text, measured in both modes (every pair recomputed and verified); visible focus with a brand-independent ring, complete keyboard support (drawer, tabs, combobox search), reduced-motion variants, `forced-colors` support, logical properties throughout (RTL-ready), print stylesheet. The full accessibility contract lives in `docs/design/design-handoff/SPEC/accessibility.md`.

## Releases and integrity

Semver. Each release publishes `keel-docs-theme-vX.Y.Z.zip` (the `theme/` content, version-stamped) and `checksums.txt` (SHA-256 of every packaged file plus the zip). Consumers verify a vendored `_theme/` against those checksums; every page's `<meta name="keel-docs-theme">` names the version it carries. Maintainer: releases are built with `scripts/package.sh vX.Y.Z`; the zip and checksums attach to the GitHub release.

## Development

This repo is managed with the [keel](https://github.com/joseconti/keel-skill) workflow. Design source of truth: `docs/design/design-handoff/` (delivered by Claude Design against `docs/design/DESIGN-BRIEF.md`; its `SPEC/` governs tokens, interactions, accessibility and schemas). Build contract and audit evidence: `docs/BUILD-SPEC.md`. The handoff directory is never edited; the built `theme/` and `demo/` derive from it with three logged adaptations (BUILD-SPEC §9).

## Licenses

Code and theme: **MIT** (see `LICENSE`). Fonts: **SIL OFL 1.1** — the woff2 files travel with their license texts inside `_theme/fonts/`.
