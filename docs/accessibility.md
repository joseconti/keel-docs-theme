# Accessibility — keel-docs-theme (applied result)

Reference: `references/accessibility.md` (universal core + Web/HTML section).
This is the **applied** accessibility record for this project: the standard
targeted, the measures actually implemented, how they were verified, how a
maintainer keeps them intact, and any known gaps — honestly.

## Standard targeted

- **WCAG 2.2 Level AA as the floor, AAA where feasible.** Because the theme is
  long-form documentation, body text aims high: nearly all text clears AAA (7:1);
  the few secondary/muted and syntax colors clear AA (≥4.5:1) by design.
- **EN 301 549 / European Accessibility Act** alignment (EU market in scope).
- No accessibility overlay is used or endorsed (honesty rule).

## Applied measures (Web/HTML)

Consolidated from the design contract `docs/design/design-handoff/SPEC/accessibility.md`
(the frozen handoff) and verified as built. Section numbers below reference that SPEC.

- **Semantic structure & landmarks (SPEC §7):** `header[role=banner]`, `nav`
  regions (search `role=search`, sidebar, switchers, breadcrumb, pagination — each
  labelled), `main#main`, TOC `aside` with `aria-labelledby`,
  `footer[role=contentinfo]`. Navigable by region and by heading.
- **Heading hierarchy (SPEC §7):** one `h1` per page; `h2` sections (decorative
  section numbers are `aria-hidden`); `h3`/`h4` below; no skipped levels.
- **Visible focus & focus order (SPEC §5):** `:focus-visible { outline: 2px solid
  var(--color-focus); outline-offset: 2px }`; focus color is brand-independent and
  measured 16.29:1 (light) / 14.92:1 (dark). Per-template focus order documented,
  including drawer and combobox behavior.
- **Skip link** to `#main` on every template (the build added it to the entry
  template per D-006 finding #1).
- **Name / role / state (SPEC §6):** collapsible sidebar groups (`aria-expanded`),
  code tabs (`tablist`/`tab`/`tabpanel`, roving tabindex, `aria-selected`), search
  (`combobox`+`listbox`, `aria-expanded`/`aria-activedescendant`, count via
  `aria-live`), copy button ("Copied" via `aria-live="polite"`), switchers
  (`aria-current`). No emoji icons; meaningful icons have text alternatives,
  decorative icons are `aria-hidden`.
- **Target sizes (SPEC §8):** interactive targets ≥24×24 CSS px; primary controls
  ≥44×44.
- **Reduced motion, reflow, forced-colors (SPEC §9):** every transition has a
  `prefers-reduced-motion` override; fluid layout with logical properties reflows to
  a single readable column at 320px / 400%; `@media (forced-colors: active)` maps
  focus/active states to system colors.
- **Not by color alone (SPEC §10):** the four admonitions carry icon + text label +
  color; required/optional is text; active nav combines accent + weight +
  `aria-current`; "copied" is announced text.
- **RTL / bidi (SPEC §11):** all CSS uses logical properties; mirrored correctly
  under `dir="rtl"`.
- **Automatic light/dark** via `prefers-color-scheme`, contrast measured in both.

## Verification — automated (run by the assistant)

- **Contrast recomputation (independent).** All 40 foreground/background pairs from
  SPEC §1–2 (both modes, including admonitions, syntax highlighting, and the focus
  ring) were recomputed from the canonical hex tokens with the WCAG relative-
  luminance formula. Result: **max |recomputed − SPEC| = 0.005** (rounding only),
  **0 pairs disagree with the SPEC, 0 pairs below AA 4.5:1.** The neutral brand
  preset satisfies the injected-accent contract (§3: 6.70/7.04/7.16 light,
  7.95/7.48/8.09 dark); the Meridian example preset also passes both modes.
  Script: `scripts/verify-contrast.py` (recompute run 2026-07-22; reproducible from the SPEC hexes).
- **Client-side safety audit** (feeds `docs/security.md`): the only script makes no
  network request and escapes all injected search content — no accessibility-
  relevant dynamic behavior bypasses the semantics.
- **Note on tooling:** axe-core / pa11y / Lighthouse are **not installed** in the
  maintainer's current environment, so a live automated DOM audit was not run here.
  The theme's semantics were specified and built to the SPEC and reviewed by
  inspection; a consumer with these tools should still run them on the generated
  `guide/`. This is recorded as a gap, not hidden.

## Verification — guided assistive-technology pass (the real pass)

Per `references/accessibility.md`, the real-AT pass is a **guided user loop**: the
assistant gives one instruction and the expected result, the user runs it on the
`demo/` styleguide (open `demo/index.html` / `demo/es/...` in a browser; VoiceOver
via ⌘F5 on macOS) and reports, and each item is recorded here pass/fail before the
next. Started 2026-07-22.

| # | Item | Expected | Status |
|---|------|----------|--------|
| K1 | Skip link | Tab once from top → visible "Skip to content"; Enter jumps to `#main` | ⚠ pending |
| K2 | Focus order & visible focus | Tab through header→sidebar→content→pagination→footer; 2px outline on each; order matches visual | ⚠ pending |
| K3 | No keyboard trap | Tab forward and Shift+Tab back through the whole page; focus never stuck | ⚠ pending |
| K4 | Search combobox | Focus search, type a term; results appear; ↑/↓ move highlight; Enter opens; Esc closes, focus back to input | ⚠ pending |
| K5 | Code tabs | Tab to a code example's tab; ←/→ switch language; only active tab in tab order | ⚠ pending |
| K6 | Sidebar drawer (narrow) | At mobile width, nav toggle opens drawer; focus enters first link; Esc closes, focus back to toggle | ⚠ pending |
| K7 | Copy button | Tab to "Copy", Enter; visible "Copied" feedback | ⚠ pending |
| V1 | VoiceOver landmarks | Rotor → Landmarks lists banner, search, navigation(s), main, complementary, contentinfo — all labelled | ⚠ pending |
| V2 | VoiceOver headings | Rotor → Headings: single h1, h2 sections, no skipped levels; section numbers not read as content | ⚠ pending |
| V3 | VoiceOver search announce | Typing announces result count (aria-live); arrowing announces each option | ⚠ pending |
| V4 | VoiceOver admonitions | Note/tip/warning/danger announce their label (not color-only); icons not read as noise | ⚠ pending |
| V5 | VoiceOver copy announce | Activating Copy announces "Copied" | ⚠ pending |
| V6 | VoiceOver control state | Sidebar group announces expanded/collapsed; switchers announce current | ⚠ pending |
| P1 | Text zoom 200% / reflow | ⌘+ to 200%: no clipping/overlap; single-column reflow; no horizontal page scroll at ~320px | ⚠ pending |
| P2 | Reduced motion | System Reduce Motion ON, reload: drawer/chevron/scroll animations suppressed | ⚠ pending |
| P3 | Dark mode | System dark appearance: theme follows; text remains readable | ⚠ pending |
| P4 | Increase Contrast / forced-colors | macOS Increase Contrast ON: focus & active states stay visible, borders don't vanish (true Windows forced-colors needs a Windows pass) | ⚠ pending |

A fail is a defect and enters the normal fix flow. Items left `⚠ unverified` (e.g.
a check that needs a platform not available to the maintainer, like Windows
forced-colors) are recorded as such — never silently marked pass.

## How a maintainer keeps it intact

1. Never remove `:focus-visible` outlines or add `tabindex > 0`.
2. Keep every new control's name/role/state wired (follow the SPEC §6 table pattern)
   and keep dynamic status changes announced via `aria-live`.
3. Keep contrast within the SPEC's measured tokens; re-run the contrast recompute if
   a token changes — the injected-accent contract (§3) is verifiable, never trusted.
4. Keep logical CSS properties (RTL) and the `prefers-reduced-motion` /
   `forced-colors` overrides on any new animation or state.
5. Never introduce color-only meaning; keep the icon+label pattern on admonitions.

## Known gaps

- The guided AT pass above is **in progress** (started 2026-07-22); items are ⚠
  pending until run with the user. This file is updated per item.
- No live axe/pa11y/Lighthouse run in the maintainer's environment (recorded above);
  consumers should run them on their generated `guide/`.
- Windows `forced-colors` (High Contrast) can only be truly verified on Windows; the
  CSS support is specified (SPEC §9) but a real Windows pass is not yet done.
