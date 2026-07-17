# BUILD-SPEC: keel-docs-theme

> Source handoff: `docs/design/design-handoff/`
> This document is the implementation contract. The build does not deviate from it. Code adapts to this; this never adapts to the code.
> Build target (D-007): the public repo tree (`theme/` + `demo/`) + release packaging — a verbatim port of the delivered artifacts, not a re-implementation.

## 1. Audit result (evidence table)

Audit run 2026-07-17 (mechanical passes via scripted checks on the delivery; outputs quoted).

| Item (Step 1 bullet) | Checked | Evidence | Result |
|---|---|---|---|
| Handoff matches contract structure | yes | Tree: README.md + artifacts/{templates(3),components,pages,assets,styles} + SPEC/{manifest,design-tokens,interactions,accessibility,assets-index,external-assets,external-setup,open-questions,screens(3)} | pass |
| manifest.md — every page resolves | yes | 25 pages listed (1 entry + 4 audience-home + 20 topic); script: "25 pages listed; missing on disk: NONE; total html under guide/: 25" | pass |
| design-tokens.md agrees with artifacts/styles/; origin; surfaces | yes | Script: "64 unique hex in design-tokens.md; missing from theme.css: NONE"; 120/180/240ms, 2/3/4px radii, both easing curves present; origin stated (founding — canonical, README §3); single declared surface: static web (brief §2 "Sin superficies anticipadas") | pass |
| screens/*.md — purpose, all states, breakpoints, variants | yes | 3 files (template-entry/-audience-home/-topic): purpose + default/hover/focus/active + empty states + exact breakpoints 1280/1024/768/480 + audience/lang/dark/reduced-motion/print variants | pass |
| interactions.md — every behavior specified | yes | 10 sections: i18n injection, sidebar drawer, nav groups, TOC scrollspy, code tabs, copy, offline search, entry lang panels, print, system prefs | pass |
| assets-index.md — assets exist, SVG+PNG both, build-ready | yes | Script: "icon svg=18, icon png=36, brand svg=2, brand png=4 — icons missing PNG pair: NONE"; delivery strategy: icons inlined in HTML (no fetch, currentColor), SVG files canonical | pass |
| external-assets.md | yes | "none." — confirmed: typography + hand-drawn SVG + CSS only | pass |
| Fonts shipped at final paths | yes | 10 woff2 + LICENSE-IBMPlex.txt + LICENSE-SourceSerif4.md in _theme/fonts/ AND assets/fonts/ (byte-identical, cmp/diff clean); script: "10 url() refs in theme.css; unresolved: NONE"; provenance recorded in assets-index §3 | pass |
| external-setup.md | yes | "none." — confirmed: static, serverless, no third-party config | pass |
| accessibility.md complete + per-screen notes | yes | Measured pairs both modes (§1-2), brand-accent rule (§3), focus (§5), name/role/state (§6), landmarks/headings (§7), targets (§8), reduced-motion/reflow/forced-colors (§9), not-color-only (§10), RTL (§11); per-screen a11y in each screens/*.md | pass (finding F1 below) |
| open-questions.md | yes | "CERO preguntas abiertas" — 3 known questions answered and recorded (preset deferred, no references, Basalt) | pass |
| Placeholder copy that would ship | yes | Demo copy is the intentional permanent styleguide (manifest.md preamble); no unintended placeholders | pass |
| Foreign files in design-handoff/ | yes | Script: "junk files inside handoff: NONE; hidden: NONE" | pass |
| Contrast recomputed from hex (never trusted) | yes | WCAG arithmetic on ~30 declared pairs (both modes, core+admonitions+syntax+HTTP verbs+neutral & Meridian presets): 0 deviations from accessibility.md; all ≥4.5:1 where required. Example: text/bg light 16.29 (declared 16.29); Meridian light 5.68/5.97/6.07 (declared 5.68/5.97/6.07) | pass |

- `open-questions.md` status: empty/resolved (zero).
- Gaps found: **none** → build may proceed.
- Audit findings (SPEC↔artifact discrepancies, not build blockers; resolution per D-006, logged §9):
  - **F1** — SPEC/accessibility.md §5 + screens/template-entry.md specify a skip-link to `#main` on the entry template; delivered `template-entry.html` and `guide/index.html` omit it. Build adds it (building TO the SPEC).
  - **F2** — `styles/brand-preset-example/brand.css` comment carries approximate ratios (5.3/5.0/5.8 · 7.5/6.4/7.5) that contradict the measured ones (5.68/5.97/6.07 · 7.29/6.86/7.29 = audit arithmetic = accessibility.md §3). Built copy carries the measured values.
  - **F3** — `_theme/js/theme.js` ~line 145: inert statement `el.scrollIntoView ? el.scrollTo : 0;` (dead refactor residue). Removed in built copy.

## 2. Resolved screen list

| Screen | Type | Source artifact | SPEC file | Notes |
|---|---|---|---|---|
| Entry | template | artifacts/templates/template-entry.html | SPEC/screens/template-entry.md | 1 demo instance: guide/index.html |
| Audience home | template | artifacts/templates/template-audience-home.html | SPEC/screens/template-audience-home.md | 4 instances (2 locales × 2 audiences) |
| Topic | template | artifacts/templates/template-topic.html | SPEC/screens/template-topic.md | 20 instances (2×2×5) |
| Component catalog | reference page | artifacts/components/components.html | manifest §DoD | not a product page |
| Rebrand proof | reference page | artifacts/pages/rebrand-proof.html | manifest §rebrand | proves brand/-only swap |

All 25 demo pages resolve template+data per manifest.md — no structural duplicates.

## 3. Token table

Tokens travel **verbatim**: `theme.css` is the canonical values-as-code file and is byte-copied into the built tree (evidence row 3 reconciles it against `SPEC/design-tokens.md` — 64/64 hex + all scalar values). Single surface (static web) → no surface mapping tables needed.

Brand layer (the ONLY per-project surface, design-tokens.md §8):

| Variable | Neutral light / dark | Rule |
|---|---|---|
| --brand-accent | #2B5B84 / #7FB0DC | ≥4.5:1 vs bg AND vs surface, both modes |
| --brand-accent-contrast | #FFFFFF / #10131A | ≥4.5:1 vs accent |
| --brand-accent-soft | #E7EEF4 / #1E2A34 | decorative tint only |
| --brand-logo-w / -h | 28px / 28px | logo box, contain, never cropped |

## 4. Per-screen state matrix

Build = verbatim port, so every state ships already built inside the delivered artifacts; the matrix is verified by the demo exercising each state (manifest §DoD coverage map) and by the checks below.

| Template | States required (SPEC) | Exercised in demo | Verified |
|---|---|---|---|
| template-topic | default/hover/focus/active; search empty ×2; breakpoints 1280/1024/768/480; audience/lang/dark/reduced-motion/print/forced-colors/RTL-ready | pages #2-#25 (all components ≥1× per manifest DoD) | ☑ audit + linkcheck + demo |
| template-audience-home | same transversal states | #2, #8, #14, #20 | ☑ |
| template-entry | default/hover/focus; lang panels; no-JS degradation | #1 (index.html) | ☑ (+F1 skip-link added) |

## 4a. Accessibility spec

Authority: `SPEC/accessibility.md` (complete, both modes). Audit recomputed every declared ratio from hex — **0 deviations** (§1 row "Contrast recomputed"). Core recomputed pairs: light text/bg 16.29, secondary 6.75, muted 5.21, accent/bg 6.70, accent/surface 7.04, white/accent 7.16, code 13.39; dark text/bg 14.92, secondary 7.97, muted 5.23, accent/bg 7.95, accent/surface 7.48, ink/accent 8.09; admonitions and syntax palettes all ≥4.5 both modes; HTTP verbs 5.88-10.20. Brand rule (any injected accent): ≥4.5 vs bg, ≥4.5 vs surface, ≥4.5 contrast-on-accent, both modes — neutral and Meridian presets both comply (recomputed).

F1 resolution: skip-link added to entry (template + demo index) replicating template-topic's exact markup (`a.skip-link[href="#main"]` + `data-i18n="skip_to_content"`), first in focus order per accessibility.md §5.

⚠ unverified (Phase 7 gate closes): user-run assistive-technology pass on the demo (guided loop) — automated/mechanical checks done; real AT pass pends user availability.

## 5. Interaction & logic table

| Trigger | Behavior | Spec ref |
|---|---|---|
| Page load | i18n injection from window.KEEL_I18N (data-i18n/-aria/-attr; {n},{v} interpolation) | interactions §1 |
| .nav-toggle click (<768px) | drawer opens, focus to first link, scrim; Esc/scrim/navigate closes, focus returns | §2 |
| .nav-group__toggle | aria-expanded toggle; chevron rotates; initial open = group containing current page | §3 |
| Scroll | TOC scrollspy via IntersectionObserver (rootMargin -72px 0 -70%), aria-current="true" | §4 |
| TOC/anchor click | smooth scroll (auto if reduced-motion), hash replaceState, focus to heading | §4 |
| Code tab keys | WAI-ARIA tabs, roving tabindex, ←/→ (RTL-inverted), Home/End, wrap | §5 |
| .copy-btn click | clipboard API → textarea/execCommand fallback (file://); "Copiado" 1600ms + aria-live | §6 |
| Search input | filter KEEL_SEARCH_INDEX by page lang+audience; diacritic/case-insensitive; combobox+listbox; ↑↓ Enter Esc; count announced; empty + no-index states | §7 |
| "/" key | focuses search (unless typing in a field) | §7 |
| Entry lang buttons | show/hide [data-lang-panel]; aria-selected | §8 |
| Print | print.css: chrome hidden, one column, URLs shown, break-inside avoided | §9 |
| System prefs | dark via prefers-color-scheme; reduced-motion kills transitions; forced-colors per a11y §9 | §10 |

## 6. Asset map

| Asset group | Files | Formats | Both SVG+PNG | Build-ready | Exists |
|---|---|---|---|---|---|
| Icons (18: note tip warn danger search language audience-user audience-dev copy check chevron external arrow-prev arrow-next menu close eye book) | 18 svg + 36 png (@1x+@2x) | SVG 24×24 currentColor; PNG ink #1B1A16 | ☑ | ☑ inlined, no transform | ☑ |
| Demo brand (Basalt) | 2 svg + 4 png | logo + logo-dark, 56px intrinsic | ☑ | ☑ | ☑ |
| Fonts | 10 woff2 + 2 OFL licenses | SourceSerif4 (400/400i/600), PlexSans (400/500/600/700), PlexMono (400/500/600) | n/a | ☑ final paths, @font-face resolve 10/10 | ☑ |
| Meridian example preset | brand.css + 2 svg | rebrand proof | ☑ | ☑ | ☑ |

## 7. External manual setup

No external manual setup required (`SPEC/external-setup.md` = "none", confirmed).

## 8. Externally generated assets

No externally generated assets required (`SPEC/external-assets.md` = "none", confirmed).

## 9. Target-stack integration plan

Target: public repo tree per D-007. The "port" is byte-copy — the handoff artifacts ARE the final product (vanilla HTML/CSS/JS). Mapping (source → built):

- `artifacts/pages/guide/_theme/` → `theme/_theme/` (A3 applied) — the vendorable unit
- `artifacts/templates/` → `theme/templates/` (A1 applied to template-entry.html)
- `artifacts/styles/brand/` → `theme/brand/` (neutral preset; logo.svg is per-project, supplied by consumer — design-tokens §8)
- `artifacts/pages/guide/{search-index.js,strings-es.js,strings-en.js}` → `theme/examples/` (schema instances)
- `artifacts/styles/brand-preset-example/` → `theme/examples/brand-preset-meridian/` (A2 applied)
- `artifacts/pages/guide/` (complete) → `demo/` (A1 on index.html, A3 via its _theme copy) — demo/_theme stays byte-identical to theme/_theme
- Repo tree keeps `__THEME_VERSION__` literal; `scripts/package.sh` stamps it only in `dist/` packaging output (zip + checksums) — D-007
- Constraints honored: no build step, file://-safe, zero external requests, only relative paths — all preserved by copying

**Code-side adaptations log** (all per D-006; handoff untouched; each traces to SPEC):
- **A1** Entry skip-link added (template-entry.html + demo/index.html): markup replicated from template-topic; traces to accessibility.md §5 + screens/template-entry.md §Accesibilidad. Result: entry matches its SPEC; visual result unchanged (visually-hidden until focus).
- **A2** Meridian example comment ratios corrected to measured values (accessibility.md §3 = audit arithmetic). Result: comment now agrees with normative SPEC; zero functional change.
- **A3** theme.js inert statement removed (dead code; no behavior attached). Result: byte-diff of exactly one line vs delivery; behavior identical.

## 10. Faithfulness checklist (verified at Step 7)

- [x] Every screen matches its artifact + SPEC (byte-copy port; A1-A3 logged).
- [x] Every documented state implemented and reachable (delivered built; demo exercises all per manifest DoD).
- [x] No invented values; every value traces to theme.css/design-tokens.md (64/64 reconciled).
- [x] No interpreted behavior; every behavior traces to interactions.md (§5 table).
- [x] Reuse preserved — 3 templates stay single sources; 25 pages resolve template+data.
- [x] Founding design system: canonical here; no divergence introduced.
- [x] Every logo/icon in SVG+PNG; zero build-side transformation (byte-copies).
- [x] No unintended placeholder copy (demo = permanent styleguide by design).
- [x] External setup: none required.
- [x] External assets: none required.
- [x] Every code-side adaptation logged in §9 with design intent intact (A1-A3).
- [ ] Accessibility: automated/mechanical checks pass (ratios recomputed 0 deviations; skip-link fixed; landmarks/ARIA delivered) — **user-run assistive-technology pass pending** (⚠ flagged for Phase 7 gate).
- [x] Zero unresolved Design Requests (register empty — no DRs needed).
