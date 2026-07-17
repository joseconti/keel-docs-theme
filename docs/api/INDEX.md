# API Index — keel-docs-theme
> One line per public surface (the theme's stable contracts with consumers). Grep here FIRST; open the doc only on a hit.

| Surface | Kind | File | Doc | Purpose (one line) |
|---------|------|------|-----|--------------------|
| `<meta name="keel-docs-theme" content="vX.Y.Z">` | version marker | every page `<head>` | README §Releases | mechanical check of which theme version a page carries |
| `window.KEEL_SEARCH_INDEX` | global data schema | `guide/search-index.js` (example: theme/examples/) | design-handoff SPEC/assets-index.md §4 | offline search index; fields title/path/audience/lang/section/excerpt/terms |
| `window.KEEL_I18N` (32 stable keys) | global data schema | `guide/strings-<locale>.js` (examples es/en) | SPEC/assets-index.md §4 | UI chrome strings per locale; keys never translated |
| `data-i18n` / `data-i18n-aria` / `data-i18n-attr` / `data-i18n-vars` | markup contract | `_theme/js/theme.js` | SPEC/interactions.md §1 | string injection points; {n}/{v} interpolation |
| `--brand-accent`, `--brand-accent-contrast`, `--brand-accent-soft`, `--brand-logo-w/-h` | brand layer contract (closed) | `brand/brand.css` | SPEC/design-tokens.md §8 + README §Brand layer | the ONLY per-project customization; contrast rule ≥4.5:1 ×3, both modes |
| `{{ slot }}` placeholders | template slots | `theme/templates/*.html` | SPEC/screens/*.md | keel fills these; markup and relative paths stay as templated |
| `html[lang] [dir] [data-audience] [data-root]` | page behavior attributes | templates / every page | SPEC/interactions.md preamble | drive i18n, RTL, search scoping and path resolution |
| `.skip-link` → `#main` | landmark contract | every page (incl. entry, A1) | SPEC/accessibility.md §5 | first tab stop; focus order authority |
