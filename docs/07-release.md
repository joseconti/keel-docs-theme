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
- Pending at close: user AT pass on demo (⚠ flagged), push + release publication (user).
