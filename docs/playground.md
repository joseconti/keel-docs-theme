# Playground — keel-docs-theme

The runnable verification environment for this project is the **demo styleguide** at
`demo/` — the full fictional product "Basalt" documented on the theme, bilingual
(en/es), dual-audience (user guide + developer portal). It is the permanent living
proof of the theme (D-007).

## Access (no server, no build, no credentials)

- Open **`demo/index.html`** in any browser — the entry/cover page (language +
  audience choice).
- Or open a rich topic page directly, e.g. `demo/en/dev/api-webhooks.html`,
  `demo/en/user/installation.html` (sidebar, search, code tabs, admonitions,
  copy buttons — the full component surface).
- Works from `file://`: `open demo/index.html` (macOS). No web server, no build
  step, no dependencies, no external requests.

## Seed data / reset

- Data is **static and synthetic** (the "Basalt" product and the "Meridian" brand
  preset). There is no database, no state, nothing to seed or reset — reopening the
  file is a clean slate.

## Try it

- Navigate the sidebar; switch **audience** (User guide ↔ Developer) and **language**
  (EN ↔ ES) in the header.
- **Search:** type in the header search box; arrow through results; Enter opens.
- **Dark mode:** toggle the OS appearance — the theme follows `prefers-color-scheme`.
- **Code blocks:** switch language tabs (←/→) and use the Copy button.
- **Narrow width:** shrink the window — the sidebar becomes a keyboard-operable drawer.

## Verify (assistant-run)

- Theme integrity: `diff -rq theme/_theme demo/_theme` → must be identical (the demo
  vendors the same `_theme/` unit; parity is a release gate).
- Contrast contract: `python3 scripts/verify-contrast.py` → 40 pairs, 0 below AA.
- Accessibility: the guided assistive-technology pass runs on this demo
  (`docs/accessibility.md`).

last verified: 2026-07-23 — guided AT pass in progress on the demo (K1–K7 passed, a
focus-visibility fix applied in K2); contrast recompute clean; theme/demo parity ✓.
