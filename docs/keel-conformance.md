# Keel conformance sweep — keel-docs-theme

> HISTORICAL v5.0.0 sweep; current authoritative sweep is “Current mechanical sweep — v7.3.2” below.
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

## Current mechanical sweep — v7.3.2 (2026-10-29, D-015)

The earlier v5 report above is historical. Every current Table 1 row is reviewed below; current scope is static-theme maintenance, not a new product phase. `docs/sessions.md` is produced by the measured close of this session. No Gemini, embed, native assistant settings, CI, launcher, site or inbound tunnel is selected. Stop-hook script exists; registration is not applicable to this Codex session because its output contract is unconfirmed. Public fixture browser tests are a scoped issue regression, not a claim that the deferred historical harness is complete.

| Requirement | State | Evidence / condition |
|---|---|---|
| `docs/PROGRESS.md` | present | docs/PROGRESS.md |
| `docs/decisions.md` | present | docs/decisions.md |
| `docs/lessons-learned.md` | present | docs/lessons-learned.md |
| `docs/sessions.md` | present | Measured session close writes the record before final commit |
| `scripts/keel-time` | present | scripts/keel-time |
| `scripts/keel-clock` | present | scripts/keel-clock |
| `docs/.keel/clock.jsonl` | present | docs/.keel/clock.jsonl |
| Off-machine durability — a Git remote, or a tree that replicates off this computer | present | origin HTTPS remote verified; isolated branch pushed at block close |
| A clean working tree at every block close | present | verified at block close, develop-bound isolated branch |
| `CLAUDE.md` + `AGENTS.md` (repo root) | present | CLAUDE.md, AGENTS.md |
| `GEMINI.md` or `context.fileName` in `.gemini/settings.json` | n/a | Only if the user works with Gemini CLI |
| `.claude/skills/keel/` + `.agents/skills/keel/` | n/a | Only if embed accepted (card: `Keel portability:`) |
| `docs/00-competitive-landscape.md` | declined | D-011 consolidated documentation / D-014 historical harness deferral preserved |
| `docs/01-discovery.md` | declined | D-011 consolidated documentation / D-014 historical harness deferral preserved |
| `docs/estimate.md` | present | docs/estimate.md |
| `docs/token-ledger.md` | present | docs/token-ledger.md |
| `docs/02-functional-spec.md` | declined | D-011 consolidated documentation / D-014 historical harness deferral preserved |
| `docs/03-technical-plan.md` | declined | D-011 consolidated documentation / D-014 historical harness deferral preserved |
| `docs/threat-model.md` | present | docs/threat-model.md |
| `docs/flows/` | n/a | Static offline component, no branching journey; demo navigation is the reference (D-011) |
| `docs/budget.md` | n/a | Only if `Client budget: yes` (card line, asked at Phase 1 step 10) |
| `docs/spec-references/` | n/a | Only if the spec records any (`## Reference artifacts`) |
| `docs/rubrics/` | present | docs/rubrics/ |
| `docs/design/references/` | n/a | Only if the user holds any |
| Assistant rules — one container per accepted tool (`.claude/rules/`, `.cursor/rules/`, `.github/instructions/`, `.windsurf/rules/`, nested context files for Codex/Gemini) | n/a | Only if accepted (card: `Assistant config:`) |
| Assistant subagents — per capable tool (`.claude/agents/`, `.github/agents/`, `.cursor/agents/`, `.gemini/agents/`) | n/a | Only if accepted (card: `Assistant config:`) |
| `docs/design/DESIGN-BRIEF.md` | present | docs/design/DESIGN-BRIEF.md |
| `docs/design/design-handoff/` | present | docs/design/design-handoff/ |
| `docs/BUILD-SPEC.md` | present | docs/BUILD-SPEC.md |
| `docs/design/design-requests/` | n/a | When the first Design Request appears |
| `.gitignore` + `.gitattributes` | present / n/a | Ignore present; package.sh copies only theme/, no git archive/export-ignore needed (D-014) |
| `docs/sprints/` | present | docs/sprints/ |
| `docs/sprints/deferred.md` | present | docs/sprints/deferred.md |
| `docs/.keel/plan.json` | present | docs/.keel/plan.json |
| `scripts/keel-parallel` | present | scripts/keel-parallel |
| `docs/.keel/parallel/` | n/a | Ignored before use; no parallel writer registered in this repo |
| `docs/.keel/slices/<run-id>/<slice-id>/<attempt-id>.json` | n/a | Only when a parallel writing worker runs |
| `docs/05-test-points.md` | declined | D-011 consolidated documentation / D-014 historical harness deferral preserved |
| `docs/api/INDEX.md` | present | docs/api/INDEX.md |
| `docs/keel-conformance.md` | present | docs/keel-conformance.md |
| `docs/playground.md` | present | docs/playground.md |
| `scripts/keel-verify` | present | scripts/keel-verify |
| `scripts/playground-tunnel` | n/a | Only if an external system calls the project (payment notifications, webhooks, a URL a third party fetches, a remote client connecting to a local server) |
| `scripts/keel-affected-tests` | present | scripts/keel-affected-tests |
| `.githooks/pre-push` + `core.hooksPath` set | present | .githooks/pre-push |
| `scripts/keel-doctor` | deferred | D-014 historical environment automation; current runtime preflight is documented in BUILD-SPEC |
| `scripts/` build/minify script (name per the technical plan) | n/a | Readable source ships by recorded D-012 exception; package.sh stamps only |
| `scripts/keel-handoff-verify` | present | scripts/keel-handoff-verify |
| Single-lane lock — taken by `scripts/keel-handoff-verify` when the card is `Chaining: start` | n/a | Supervised chaining |
| `scripts/keel-tools/<tool>.sh` — one row file per accepted assistant | n/a | Only if the card is not `Chaining: off` and not `Chaining: supervised` |
| `scripts/keel-continue` | n/a | Only if the card is not `Chaining: off` and not `Chaining: supervised` |
| `scripts/keel-close` | present | scripts/keel-close |
| `.githooks/post-commit` + `core.hooksPath` set | present | .githooks/post-commit |
| `scripts/keel-stop-hook` + its `Stop` hook registration | present / n/a | Script exists; registration unsupported by confirmed Codex contract, not installed |
| `scripts/keel-session-pid.sh` | present | scripts/keel-session-pid.sh |
| `scripts/keel-chain-check` | n/a | Only if the card is not `Chaining: off` and not `Chaining: supervised` |
| `Chaining model:` line on the project card | n/a | Only if the card is not `Chaining: off` and not `Chaining: supervised` |
| `Chain verified:` line on the project card | n/a | Only if the card is not `Chaining: off` and not `Chaining: supervised` |
| `.githooks/pre-commit` | n/a | Only if accepted (card: `Assistant config:`) |
| Permission allow-lists — per capable tool (`.claude/settings.json`, `.codex/rules/`, `tools.allowed` in `.gemini/settings.json`, `.cursor/cli.json`) | n/a | Only if accepted (card: `Assistant config:`) |
| CI workflow (e.g. `.github/workflows/ci.yml`) | n/a | Only if accepted (card: `Assistant config:`) and the forge has CI |
| MCP registration — per capable tool (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`, `[mcp_servers]` in `.codex/config.toml`, `mcpServers` in `.gemini/settings.json`) | n/a | Only if the technical plan defines dev MCP servers |
| `docs/architecture.md` | present | docs/architecture.md |
| `docs/api/`, `docs/usage/`, `docs/reference/` | present / declined | api present; usage/reference consolidated by D-011 |
| `docs/security.md` | present | docs/security.md |
| `docs/accessibility.md` | present | docs/accessibility.md |
| `README.md` (repo root) | present | README.md |
| `guide/` (repo root) | n/a | Theme itself is the guide product; README + demo (card) |
| `guide/_theme/` + `guide/brand/` + per-page `<meta name="keel-docs-theme">` | n/a | This is the producer, no consumer guide vendoring |
| `docs/07-release.md` | present | docs/07-release.md |
| `docs/security-audit.md` | n/a | Card `Security audit: required` — or any project on which an audit has run |
| `docs/security-audit/` listed in `.gitignore` | n/a | No active audit run, card optional |
| `<site-docs>/` (`docs/site/` or the site's own repo, per the recorded decision) | n/a | Website intent only |
| `<site-docs>/design/design-handoff/SPEC/art-direction.md` | n/a | Website intent only (since v5.12.0) |
| `~/.keel/art-ledger.md` | n/a | Website intent only (since v5.12.0) |
| `<site-docs>/launch-report.md` | n/a | Website intent only |
| `<site-docs>/operations.md` | n/a | Website intent only |
| `docs/.keel/e2e-status.json` | n/a | Only if the project card carries an `E2E:` line |
| `docs/.keel/e2e-history.jsonl` | n/a | Optional even where `E2E:` exists; every reader copes with its absence |
| `docs/issues.md` | present | docs/issues.md |
| `docs/old/` | n/a | When archiving starts |
| `docs/04-adoption-audit.md` | n/a | Adopted projects only |
| `env.CLAUDE_CODE_EXPERIMENTAL_AGENTS_TEAMS: "1"` in `.claude/settings.local.json` (machine-local, gitignored) | n/a | Whenever Claude Code is in use (running session or accepted tool) |
| `Parallel development: auto; max_workers: max` on the card | present | canonical scripts/keel-parallel; serial dependency set; no worker run in this repo |

### Per-version delta sweep

Each version row was checked against current manifest, using the row-specific conditions and the preserved D-011/D-014 deferrals.

| Version | State | Disposition |
|---|---|---|
| v5.0.0 | Reviewed | D-014 remains authoritative for historical discovery/AC harness; current scoped real browser run and static runtime checks now added. No retrospective reconstruction. |
| v5.1.0 | Reviewed | Historical full Playwright harness remains deferred D-014; current Puppeteer issue regression records durable machine-readable red/green results. No false trace/video claim. |
| v5.2.0 | Reviewed | Reading review delegated to parent; single executing browser conductor. No independent executing verifier can share browser. |
| v5.3.0 | Reviewed | Ignored current handoff, verifier and scoped close added; chaining explicitly supervised by parent, no launch/model needed. |
| v5.3.1 | Reviewed | Handoff verifier installed; launcher n/a supervised. |
| v5.3.2 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.3.3 | Reviewed | Current manifest is the source of this sweep, earlier conformance retained only as historical record. |
| v5.4.0 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.4.1 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.5.0 | Reviewed | Scoped automatic maintenance authorised by owner; notify parent; supervised chaining; existing issue tracking only. No native tool settings inferred. |
| v5.5.1 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.5.2 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.6.0 | Reviewed | Origin remote verified and card durability recorded; current branch pushed before block close. |
| v5.7.0 | Reviewed | Fresh handoff written at candidate close, parent retains publication task. |
| v5.8.0 | Reviewed | Existing issue1 ledger created; no new issue capture authorised. |
| v5.8.1 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.9.0 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.10.0 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.10.1 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.10.2 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.10.3 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.11.0 | Reviewed | Test-first card added; public fixture failed on original source before patch and passes identical assertions after. |
| v5.12.0 | Reviewed | No website intent, site art-direction/ledger requirements not applicable. |
| v5.13.0 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.14.0 | Reviewed | Scoped close helper and active post-commit stale-handoff deletion installed. |
| v5.15.0 | Reviewed | Stop helper installed; unconfirmed Codex Stop contract means no registration. |
| v5.15.1 | Reviewed | Single session identity helper installed; no shared-checkout writers. |
| v5.15.2 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.16.0 | Reviewed | Assistant config:none retained; no CI generated, card states n/a. |
| v5.17.0 | Reviewed | Schema sprint ledger and generated plan added; no E2E badge claim. |
| v5.18.0 | Reviewed | No tool registry or launcher under supervised chaining; no guessed Codex hook schema. |
| v5.19.0 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.19.1 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.19.2 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.20.0 | Reviewed | Behavioural launcher/close correction reviewed: supervised chaining has no launch action. Scoped close/stop/handoff helpers copied from current implementation; no native settings registered. |
| v5.21.0 | Reviewed | All new work planned in T001–T004 before implementation; measured actuals and residuals maintained. |
| v6.0.0 | Reviewed | Measured time/clock, sessions, plan and pre-push affected-test selector added. Full theme gate run on candidate. |
| v6.1.0 | Reviewed | Supervised chaining; registry/continue/model/allow-list conditions not met. |
| v6.2.0 | Reviewed | No configured Codex launcher accepted; no native settings modified. |
| v6.3.0 | Reviewed | Optional static-library audit posture recorded; no active audit or money/PII/service surface. |
| v6.4.0 | Reviewed | Canonical measured clock feeds session report, actual hours and residual balance. |
| v6.5.0 | Reviewed | One Puppeteer browser per regression, serial, finally closes; external existing deps only. Historical full doctor remains D014. |
| v6.6.0 | Reviewed | New slices have immutable original_hours, explicit residual_hours, ownership and added provenance. No legacy slice decomposition exists. |
| v7.0.0 | Reviewed | Canonical parallel helper installed; dependency set is linear, sole browser exclusive; execution serial, no writing worker assignment created. |
| v7.1.0 | Reviewed | Node syntax and Python contrast actually ran with zero findings; no unavailable analyzer mislabeled pass. |
| v7.2.0 | Reviewed | No inbound calls; file:// local demo driven live with real CSS/JS. No tunnel needed. |
| v7.3.0 | Reviewed | Current sweep executed; auto/max card; no Claude Code accepted/configured, teams setting n/a. Active dependency set remains serial. |
| v7.3.1 | Reviewed | Clock helper copied byte-identically; elapsed and summed slice hours reported independently at close. |
| v7.3.2 | Reviewed | Parallel helper byte-identical current canonical. No worker batch exists; all current verification serial at candidate gate. |

Standing checks: lock-only portability retained; canonical clock/parallel helpers checksum compared; supervised chaining means no launcher or model selected; Claude teams not applicable; scoped owner authority supplies automatic maintenance, not a permanent preference for unrelated work; no registered worker in this repository, effective serial execution. Existing source remains readable under D-012.
