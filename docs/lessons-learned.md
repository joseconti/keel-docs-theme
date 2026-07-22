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
