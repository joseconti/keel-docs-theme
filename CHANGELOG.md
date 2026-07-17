# Changelog — keel-docs-theme

## v1.0.0 — 2026-07-17

Initial release. Art direction **Errata** — an editorial engineering manual brought to the web.

- Three slot templates built once: `template-entry` (guide cover), `template-audience-home` (per-audience home), `template-topic` (the content workhorse).
- The vendorable unit `_theme/` (css, js, fonts, icons): plain HTML + CSS + vanilla JS, no build step, zero external requests, works from `file://`.
- Dual audience per product (end-user guide + developer portal), any locale via the `strings-<locale>.js` schema (es + en shipped), RTL-ready, print stylesheet.
- Brand-neutral core + strict closed brand layer (`brand/brand.css`: accent pair + soft tint + logo slot) with a verifiable contrast contract; Meridian example preset included as rebrand proof.
- Offline client-side search (global-script index, language- and audience-scoped, diacritic-insensitive, full keyboard support).
- Accessibility: WCAG 2.2 AA floor with AAA on nearly all text, ratios measured in both modes; visible focus, reduced-motion, forced-colors, logical properties.
- Typography: Source Serif 4 (prose), IBM Plex Sans (UI), IBM Plex Mono (code) — 10 self-hosted woff2, SIL OFL, licenses included.
- Complete bilingual demo (fictional product "Basalt", 25 pages) as the permanent living styleguide in `demo/`.
- Release packaging with stamped `__THEME_VERSION__` and SHA-256 `checksums.txt` for mechanical integrity verification.
