# Keel conformance sweep — keel-docs-theme

> Derived mechanically from `MANIFEST.md` (Keel v5.0.0), not from memory.
> One row per applicable requirement with exactly one state:
> `present` (where) · `missing` · `deferred`/`declined` (+ D-entry) · `n/a` (+ condition).
> Run: 2026-07-23, reconciliation v3.4.0 → v5.0.0 (D-014). Position: Phase 7 done / maintenance.
> Linked from `docs/PROGRESS.md`.

## Table 1 — required artifacts

| Requirement | State | Where / condition |
|---|---|---|
| docs/PROGRESS.md | present | repo |
| docs/decisions.md | present | repo (D-001…D-014) |
| docs/lessons-learned.md | present | repo (L-001…L-003; new entries use the v5.0.0 symptom/cause/fix shape) |
| CLAUDE.md + AGENTS.md lock | present | refreshed to v5.0.0 this reconciliation |
| GEMINI.md mirror | n/a | not a Gemini-CLI project (lock only) |
| .claude/skills + .agents/skills embed | n/a | `Keel portability: lock only` (D-005) |
| docs/00-competitive-landscape.md | declined | Phase 1 ran outside keel; consolidated in docs/PLAN-KEEL-DOCS-THEME.md (D-011) |
| docs/01-discovery.md (+ Environment & test drivers §5a) | declined | consolidated in PLAN (D-011); §5a tied to the deferred test-automation harness (D-014) |
| docs/estimate.md | present | repo |
| docs/token-ledger.md | present | repo |
| docs/02-functional-spec.md (+ AC-nn IDs) | declined | consolidated in PLAN + DESIGN-BRIEF (D-011); AC-nn tied to deferred harness (D-014) |
| docs/03-technical-plan.md (+ [E]/[A]/[G], change map, drivers, Environment reqs) | declined | consolidated in PLAN + D-007; markers/change-map/drivers tied to deferred harness (D-014) |
| docs/threat-model.md | present | docs/threat-model.md (created this reconciliation) |
| docs/flows/ | n/a | static theme, no branching journeys; demo/ is the reference (D-011) |
| docs/budget.md | n/a | `Client budget: no` (D-008) |
| docs/spec-references/ | n/a | no reference artifacts held |
| docs/rubrics/ | present | docs/rubrics/visual-fidelity.md (created) |
| docs/design/references/ | n/a | none held |
| Assistant rules / subagents | n/a | `Assistant config: none` (D-005) |
| docs/design/DESIGN-BRIEF.md | present | docs/design/ |
| docs/design/design-handoff/ | present | docs/design/design-handoff/ |
| docs/BUILD-SPEC.md | present | repo (test evidence in §10) |
| docs/design/design-requests/ | n/a | no Design Request ever raised |
| .gitignore | present | repo |
| .gitattributes (export-ignore) | n/a | release is packaged by scripts/package.sh (zip from theme/), NOT git archive → export-ignore moot (D-014) |
| docs/sprints/ | n/a | Phase 5 merged into Phase 4 (D-011) |
| docs/05-test-points.md (+ Criterion/Coverage) | declined | Phase 5 merged into Phase 4; evidence in BUILD-SPEC §10 (D-011); columns tied to deferred harness |
| docs/api/INDEX.md | present | docs/api/INDEX.md |
| docs/keel-conformance.md | present | this file (v5.0.0) |
| docs/playground.md | present | docs/playground.md (documents demo/) |
| scripts/keel-verify | deferred | test-automation harness deferred (D-014) |
| scripts/keel-doctor | deferred | test-automation harness deferred (D-014) |
| scripts/ build/minify | n/a | ships readable source, no `*.min.*` (D-012) |
| .githooks/pre-commit | n/a | `Assistant config: none` |
| Permission allow-lists | n/a | `Assistant config: none` |
| CI workflow | n/a | `Assistant config: none` (D-005) |
| MCP registration | n/a | no dev MCP servers |
| docs/architecture.md | present | repo |
| docs/api/ | present | docs/api/ |
| docs/usage/ | declined | consolidated: README + demo/ serve as usage for a vendored static theme (D-011) |
| docs/reference/ | declined | consolidated: BUILD-SPEC + SPEC + api/INDEX cover the surface (D-011) |
| docs/security.md | present | repo (D-013) |
| docs/accessibility.md | present | repo (guided AT pass in progress, D-013) |
| README.md | present | repo |
| guide/ (+ _theme/brand/meta) | n/a | `User guide: n/a` — this repo IS keel-docs-theme, not a consumer |
| docs/07-release.md | present | repo |
| Phase 8 site docs | n/a | `Website intent: no` (D-008) |
| docs/issues.md | n/a | forge *releases* worked, not *issues* |
| docs/old/ | n/a | no archiving started |
| docs/04-adoption-audit.md | n/a | keel-built project, not adopted |

## Table 3 — per-version delta (v3.5.0 → v5.0.0)

| Action | State | Note |
|---|---|---|
| v3.5.0 (1) docs follow code (created/changed/removed) | adopted | behavioral; governs from now |
| v3.5.0 (2) rubric question | present | docs/rubrics/visual-fidelity.md |
| v4.0.0 (1) anti-patterns self-audit | done | see section below |
| v4.0.0 (2) code map [E]/[A]/[G] | declined | no docs/03-technical-plan.md (D-011) |
| v4.0.0 (3) change map | declined | tied to 03-technical-plan (D-011) |
| v4.0.0 (4) threat-model.md | present | docs/threat-model.md |
| v4.0.0 (5) extend keel-verify | deferred | with the harness (D-014) |
| v4.0.0 (6) competitive confrontation offer | declined | canonical infra theme, scope settled (D-014) |
| v4.0.0 (7) AI-dev-time language | adopted | behavioral |
| v5.0.0 (1) conformance sweep + keel-conformance.md | present | this file |
| v5.0.0 (2) environment reqs + keel-doctor | deferred | trivial env; with the harness (D-014) |
| v5.0.0 (3) driver per surface | deferred | with the harness (D-014) |
| v5.0.0 (4) convert user-checks to driven tests | deferred | with the harness (D-014); keyboard AT pass done manually this session |
| v5.0.0 (5) sprint-close shape | n/a | no sprints |
| v5.0.0 (6) accessibility rebalance | partial | keyboard pass done manually; screen-reader pass remains manual per the rebalance |
| v5.0.0 (7) maintenance opens with keel-doctor --check | deferred | with the harness (D-014) |
| v5.0.0 (8) Phase 4 driven | n/a | build complete |
| v5.0.0 (9) product screenshots by assistant | n/a | no guide/ |
| v5.0.0 (10) AC-nn IDs + test-points columns | declined | tied to 02/05 (D-011) |
| v5.0.0 (11) test-driver subagent + allow-lists | n/a | `Assistant config: none` |

## Anti-patterns self-audit (v4.0.0, `references/anti-patterns.md`)

Universal + library rows (WordPress/MCP/Web rows n/a). Every answer from a command/artifact.

| # | Question | Result |
|---|---|---|
| 1 | Declared tools all run & blocking? | n/a — no declared tooling (no package.json; consolidated plan) |
| 2 | Every cited command exists? | ✓ — package.sh, verify-contrast.py exist; keel-doctor/keel-verify appear only in this file, explicitly labelled deferred (not cited as runnable) |
| 3 | Version pinned in one place? | ✓ — theme version lives only in the tag + stamped package (placeholder in repo, D-007) |
| 4 | Code map [E] markers match disk? | n/a — no code map (D-011) |
| 5 | Extension points tested? | n/a — theme exposes no programmatic hooks; brand layer + data files are documented config |
| 6 | Generated artifacts consumed? | ✓ — release zip (vendored) + checksums.txt (verification); no orphan generator |
| 7 | Test-point rows carry command+output? | n/a — no 05-test-points.md; evidence in BUILD-SPEC §10 (D-011) |
| 8 | Suppression count grown? | n/a — no linter/suppressions |
| 9 | Deliberate omissions recorded? | ✓ — D-005/D-011/D-012 + threat-model.md "Not defended" |
| 10 | Present-tense controls actually IN PLACE? | ✓ — security.md/threat-model.md controls carry evidence; all IN PLACE |
| 11 | One authoritative file per artifact; .min matches source? | ⚠ managed — theme/_theme is authoritative; demo/_theme is a synced copy (parity ✓, release gate). No .min files (D-012). A keel-verify check would enforce parity → deferred with harness |
| 12 | Docs reachable, links resolve? | ✓ (after fix) — keel-conformance.md was orphaned; now linked from PROGRESS.md |
| 12a | User-visible criteria driven or tagged? | ⚠ — theme UI verified via the guided AT pass (manual); converting to driven tests is the deferred harness (D-014) |
| 12b | Conformance sweep exists? | ✓ — this file |
| 21 | Every dependency backed by a decision? | ✓ — zero runtime deps; OFL fonts recorded (D-004) |

Net: clean for a no-build static theme. Two structural notes (rows 11, 12a) both fold
into the deferred test-automation harness; one orphan (row 12) fixed this session.

## Outcomes (2026-07-23, D-014)

- **Applied:** lock → v5.0.0; keel-conformance.md; threat-model.md; playground.md;
  rubrics/visual-fidelity.md; anti-patterns self-audit; keel-conformance linked from PROGRESS.
- **Declined (on record):** competitive confrontation (scope settled); the consolidated
  early-phase docs stay consolidated (D-011); .gitattributes n/a (not git-archive packaged).
- **Deferred (D-014 deferred item):** the v5.0.0 test-automation harness — `keel-doctor`,
  browser drivers, driven tests, keel-verify + its checks, and the 01/02/03/05 back-fill —
  disproportionate for a no-build static theme validated by demo/ + verify-contrast.py + the
  guided AT pass. Revisit if the theme gains runtime behavior.
- **Baseline advanced to v5.0.0.**
