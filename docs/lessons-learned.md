# Lessons Learned — keel-docs-theme

## L-001 — Claude Design export mangles non-ASCII folder names
- Problem: the design export arrived as `documentaci-n-web-keel-skill/` (ó lost from "documentación")
- Where: repo intake, 2026-07-17
- What failed: trusting the export wrapper's own folder naming
- Working solution: relocate the delivery to its canonical keel path `docs/design/design-handoff/` immediately; discard the export wrapper (README for coding agents, .thumbnail)
- Rule for next time: on receiving a Design export, move contents to canonical ASCII paths first; the wrapper is packaging, not deliverable

## L-002 — A release body describing assets is not proof they are attached
- Problem: v1.0.0 was recorded as "zip + checksums.txt attached … verified against the live releases page", but the GitHub release actually had `assets: []`. The assets were only DESCRIBED in the release body, never uploaded, so consumers could not download the theme.
- Where: Phase 7 release 2026-07-17; discovered in maintenance 2026-07-22 from a downstream consumer report.
- What failed: "verifying" attachment by reading the rendered release page — which renders the body's asset description — instead of querying the actual attachment list.
- Working solution: verify assets after publication with `gh release view <tag> --json assets` (names + sizes), never from the rendered page. Backfill missing assets with `gh release upload <tag> <files>` and re-verify.
- Rule for next time: a forge release that ships downloadable assets is not "done" until its attachment list is confirmed by API/CLI. (Current Keel already codifies this — phase-7-release.md step 5 / definition of done; the v1.0.0 release predates this project's baseline reconciliation, card `Keel baseline: v3.1.0`.)

## L-003 — `overflow:hidden` on a rounded container clips its descendants' focus ring
- Problem: the audience/language switcher (`.switcher`, `overflow:hidden` to clip items to its rounded corners) clipped the 2px `outline-offset` focus ring of its items, so keyboard focus on "User guide"/"Developer"/"ES"/"EN" was INVISIBLE — a WCAG 2.4.7 (Focus Visible) failure shipped in v1.0.0/v1.0.1.
- Where: `theme/_theme/css/theme.css`; found in the guided assistive-technology pass (item K2), 2026-07-22.
- What failed: the global `:focus-visible{ outline-offset:2px }` draws the ring OUTSIDE the element; any ancestor with `overflow:hidden` (needed here for `border-radius`) clips that outward ring away.
- Working solution: draw the ring INSIDE for focusable children of a clipped rounded container — `.switcher__item:focus-visible{ outline-offset:-2px }`. The `outline` shorthand in the `forced-colors` rule does not reset `outline-offset`, so high-contrast focus stays visible too.
- Rule for next time: whenever a container uses `overflow:hidden`/`clip` with rounded corners, check that its focusable descendants' focus ring is not clipped — use a negative `outline-offset` (or an inset `box-shadow`) there. Add this to every focus-style review.
