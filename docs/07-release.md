# Release procedure — keel-docs-theme

## Gate (before tagging)
1. BUILD-SPEC §10 checklist ticked (AT pass: user-run or explicitly accepted on record).
2. Confidential-data scan on the whole tracked tree (keel unbreakable rule) — no findings.
3. `bash scripts/package.sh vX.Y.Z` → dist/ zip + checksums build clean, placeholder fully stamped, repo tree keeps placeholder.
4. Demo linkcheck 0 broken refs; `theme/_theme` ≡ `demo/_theme`.

## Ship
1. Commit; annotated tag `vX.Y.Z`.
2. Push `main` + tag (maintainer's terminal — the bridge has no network).
3. GitHub → Releases → Draft new release → tag vX.Y.Z → title `keel-docs-theme vX.Y.Z — <name>` → paste the release text → attach `dist/keel-docs-theme-vX.Y.Z.zip` + `dist/checksums.txt` → publish.
4. Verify the "latest" release resolves to the new zip (assistants consume "latest").

## After v1.0.0 (recorded, do not lose)
- keel-skill changes to APPLY the theme (plan §4): references/guide-theme.md, phase-6 update, guide-qa checks, maintenance freshness — NEVER bumping keel-skill's version without explicit instruction.
- First consumer: regenerate the ugly-docs project's guide/ via maintenance; validates the whole mechanism.
- José Conti brand preset: filled by keel at first consumption (D-002).

## v1.0.0 — 2026-07-17
- Package built and verified this session: zip 55 entries (45 files), checksums 46 lines (45 files + zip), stamp verified in templates/pages/js, skip-link present in packaged template-entry.
- Published 2026-07-17 10:33 (GitHub release, latest). ASSET DEFECT (found 2026-07-22 from a consumer report): the release was published with `assets: []` — the zip and `checksums.txt` were described in the release body but never attached. The 2026-07-17 note "verified against the live releases page" was a FALSE verification: the rendered page shows the body's asset description, not the actual attachments (see L-002).
- Backfilled 2026-07-22: local `dist/` zip SHA verified vs `checksums.txt` first, then `gh release upload v1.0.0 dist/keel-docs-theme-v1.0.0.zip dist/checksums.txt`. Verified via `gh release view v1.0.0 --json assets` → `keel-docs-theme-v1.0.0.zip` (755176 bytes), `checksums.txt` (4356 bytes).
- Open at close: user AT pass on demo (⚠) — close via guided pass or recorded acceptance.

## v1.0.1 — 2026-07-22 (maintenance: packaging fix, D-010 / L-002)
- Reason: correct the v1.0.0 asset-attachment defect. Theme content byte-identical to v1.0.0 — `git diff v1.0.0 HEAD -- theme/` empty; only the stamped `__THEME_VERSION__` differs.
- Package: `bash scripts/package.sh v1.0.1` → `dist/keel-docs-theme-v1.0.1.zip` (755421 bytes) + `checksums.txt` (4356 bytes); 46 checksum entries. Placeholder fully stamped (meta `content="v1.0.1"`); no `__THEME_VERSION__` remains; zip SHA ≡ checksums.txt; `theme/_theme` ≡ `demo/_theme`.
- Confidential-data scan on the staged tree: no findings (CHANGELOG + docs only).
- No automated suite / `keel-verify` in this project (static theme; `demo/` is the living validation) — as-built since v1.0.0.
- Published 2026-07-22 with both assets at creation; verified attached via `gh release view v1.0.1 --json assets` (recorded at ship time).
