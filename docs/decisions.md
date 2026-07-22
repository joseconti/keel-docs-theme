# Decisions — keel-docs-theme

> Append-only. A session NEVER re-opens a decision recorded here on its own initiative;
> only the user reverses a decision (append the reversal as a new entry).

## D-001 — Project, scope and consumption mechanism
- Date / phase: 2026-07-16 / pre-keel planning (recorded 2026-07-17)
- Decision: build the canonical documentation theme keel applies to every project's `guide/`. Public repo `github.com/joseconti/keel-docs-theme`, semver releases; assistants download the latest release and vendor `_theme/` as a unit. Dual audience (end-user guide + developer portal), single entry page with language+audience choice, tree `guide/{locale}/{user|dev}/`. Neutral core + strict closed brand layer (`brand/`). Light+dark automatic via prefers-color-scheme. Client-side offline search. `_theme/` never edited per project (release checksums; version meta per page).
- Why: docs are mandatory and incremental in keel, but without a canonical theme every project improvises its design.
- Alternatives rejected: per-project ad-hoc design (the problem itself); CDN delivery (violates offline contract).
- Supersedes: none. Full mechanism: docs/PLAN-KEEL-DOCS-THEME.md.

## D-002 — Art direction and demo decisions (Design session)
- Date / phase: 2026-07-17 / Phase 3
- Decision: direction "1A Errata" chosen by user from 3 divergent directions (Errata, Console, Margins). Fictional demo product "Basalt" (name chosen by Design, approved). José Conti brand preset DEFERRED to first keel consumption; theme ships neutral preset only. All open questions closed at zero (SPEC/open-questions.md).
- Why: user picked Errata seeing light+dark; deferring the personal preset keeps the theme brand-neutral and unblocks v1.
- Supersedes: none.

## D-003 — Docs language: English; Spanish historical artifacts kept
- Date / phase: 2026-07-17 / Phase 4 start
- Decision: everything keel creates in this repo is English (token economy). The three pre-keel artifacts stay in Spanish as historical record: PLAN-KEEL-DOCS-THEME.md, DESIGN-BRIEF.md, MENSAJE-APERTURA-DESIGN.md — not translated.
- Why: living state is re-read every session (English ≈15-30% cheaper); the historical artifacts are consumed once and already did their job.
- Supersedes: none.

## D-004 — License: MIT
- Date / phase: 2026-07-17 / Phase 4 start (user choice)
- Decision: repo and theme under MIT. Font files remain SIL OFL with their license files traveling inside `_theme/fonts/`.
- Why: the theme is vendored inside projects of ANY license (GPL, proprietary, SaaS); MIT removes derivative-work doubts for third parties. OFL explicitly allows redistribution with the license attached.
- Alternatives rejected: GPL-3.0-or-later (friction/doubt for non-GPL consumers of a vendored asset).
- Supersedes: none.

## D-005 — Keel portability: lock only; assistant config: none
- Date / phase: 2026-07-17 / Phase 4 start (user choice)
- Decision: CLAUDE.md + AGENTS.md lock block only; no embedded skill copy; no native assistant config package.
- Why: consumers download releases, they do not manage the repo; the maintainer's environments have keel installed. Keeps the repo lean.
- Supersedes: none.

## D-006 — Audit findings resolved build-side, per SPEC authority; handoff untouched
- Date / phase: 2026-07-17 / Phase 4 (user choice)
- Decision: the 3 audit findings are resolved in the BUILT tree (never in docs/design/design-handoff/, which stays byte-identical to Design's delivery):
  1. Entry skip-link: SPEC/accessibility.md §5 and SPEC/screens/template-entry.md specify a skip-link to #main on the entry template; the delivered template-entry.html and guide/index.html omit it. The build adds it, replicating the exact skip-link markup used by template-topic (data-i18n skip_to_content). This is building TO the SPEC, not inventing.
  2. brand-preset-example comment ratios: the CSS comment's approximate ratios (5.3/5.0/5.8 light, 7.5/6.4/7.5 dark) disagree with the measured ones in SPEC/accessibility.md §3 (5.68/5.97/6.07, 7.29/6.86/7.29 — audit recomputation matches accessibility.md exactly). The built copy of the example preset carries the measured values.
  3. theme.js ~line 145 inert statement (`el.scrollIntoView ? el.scrollTo : 0;`) — dead refactor residue, no effect; removed in the built copy.
- Why: all three trace to the SPEC as authority; a Design Request round-trip for three micro-items blocks the release without adding fidelity. Each is logged in BUILD-SPEC §9 adaptations.
- Supersedes: none.

## D-007 — Public repo structure and release packaging
- Date / phase: 2026-07-17 / Phase 4 (user criterion: "whatever assistants understand and can use without problems")
- Decision: public tree optimized for mechanical consumption:
  - `theme/` = release zip content: `_theme/` (css, js, fonts, icons — the vendorable unit), `templates/` (3 slot templates), `brand/` (neutral preset brand.css), `examples/` (search-index.js, strings-es.js, strings-en.js, brand-preset-meridian/).
  - `demo/` = the full functional Basalt styleguide (file://-openable) at repo root — permanent validation per the plan.
  - `scripts/package.sh` = release packaging: stamp `__THEME_VERSION__`, produce `dist/keel-docs-theme-vX.Y.Z.zip` + `dist/checksums.txt` (SHA-256 of every `_theme/` file + the zip). `dist/` is git-ignored; assets attach to the GitHub release.
  - Repo tree keeps the literal `__THEME_VERSION__` placeholder; only packaged releases are stamped (single source of truth, checksums computed on stamped files).
  - Root: README.md (consumption contract for assistants), LICENSE (MIT), CHANGELOG.md (theme versions).
- Why: names self-describe; an assistant needs only README + zip; demo proves the theme permanently.
- Supersedes: none.

## D-008 — Defaults accepted without dedicated questions
- Date / phase: 2026-07-17 / Phase 4 start
- Decision: Client budget: no (internal tooling, no client to bill). Website intent: no (the repo README + demo are the theme's public face).
- Why: obvious defaults for an internal infrastructure project; recorded so no session re-asks.
- Supersedes: none.

## D-009 — Theme version v1.0.0 for first release
- Date / phase: 2026-07-17 / Phase 7 target (explicit user instruction: plan §3.B and this session)
- Decision: first release is v1.0.0 (tag v1.0.0, zip keel-docs-theme-v1.0.0.zip).
- Why: explicitly named by the user as the goal in docs/PLAN-KEEL-DOCS-THEME.md and re-confirmed when launching this build.
- Supersedes: none.

## D-010 — v1.0.1 patch release: fix v1.0.0 missing release assets
- Date / phase: 2026-07-22 / maintenance (explicit user instruction: "arréglalo y crea una 1.0.1")
- Decision: remediate the v1.0.0 asset-attachment defect in two parts:
  1. Backfill v1.0.0's downloadable assets. The GitHub release had `assets: []` — `keel-docs-theme-v1.0.0.zip` and `checksums.txt` were described in the release body but never uploaded. The intact local `dist/` build (zip SHA verified against `checksums.txt` first) was attached with `gh release upload v1.0.0` and verified via `gh release view v1.0.0 --json assets`.
  2. Cut v1.0.1 as the new "latest". Theme content is byte-identical to v1.0.0 (`git diff v1.0.0 HEAD -- theme/` empty); only the stamped `__THEME_VERSION__` differs. Assets attached at creation and verified post-publication.
- Why: consumers fetch the latest release zip; a release with no assets forced a downstream chat to a fallback. Backfilling repairs v1.0.0 for anyone pinned to it; the v1.0.1 patch gives a clean, correct "latest" and documents the defect.
- Alternatives rejected: only backfill v1.0.0 without a new version (user explicitly asked for v1.0.1); rebuild v1.0.0's zip (the local artifact was proven intact, so the authentic build was reattached).
- Supersedes: none. Related: L-002.
