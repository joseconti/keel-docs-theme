# Threat model — keel-docs-theme

Per `references/phase-2-functional-spec.md` §4c and the library-component profile's
"Deliberate omissions". Every defended control carries a delivery state; only
`IN PLACE` is written in the present tense. Companion to `docs/security.md`
(the applied posture) — this file states the boundary and what is NOT defended.

## Assumptions

- The theme is served as **static files**, frequently from `file://` — no server, no
  runtime configuration, no code path that executes caller-supplied strings.
- The **consumer** generates the page content, the `search-index.js`, the
  `strings-<locale>.js`, and the brand layer; the consumer controls and trusts its
  own documentation content.
- The theme is **vendored as an indivisible unit** and integrity-checked against the
  release `checksums.txt` before use; `_theme/` is never edited per project.

## Defended

| Control | State | Evidence |
|---|---|---|
| No network / telemetry / dynamic execution in theme JS | IN PLACE | grep audit of `theme/_theme/js/theme.js` (no fetch/XHR/WebSocket/eval/new Function/document.write); `docs/security.md` |
| Search renderer escapes all injected content (XSS-safe even vs a hostile index) | IN PLACE | `escapeHtml()` (theme.js:283) + `highlight()` (theme.js:274) escape every slice; `docs/security.md` |
| Reproducible, checksummed distributable | IN PLACE | `scripts/package.sh` → `checksums.txt` (SHA-256 of every file + zip); verified post-publish (L-002) |
| No secrets in package or examples | IN PLACE | confidential-data gate before every commit; only synthetic "Basalt"/"Meridian" demo data |
| Zero runtime dependencies | IN PLACE | no `package.json`/`composer.json`; only bundled OFL fonts |
| Injected-accent contrast contract is verifiable | IN PLACE | `scripts/verify-contrast.py` (40 pairs, 0 below AA); `docs/accessibility.md` §3 |

## Not defended (deliberate omissions)

| Not defended | Consequence | If you need it |
|---|---|---|
| How consumers use the theme / what they index | The theme escapes content but does NOT police the URL scheme of a `path` the consumer authored for its search index (documented trust assumption, `security.md`) | Consumers sanitize their generated index; never place `javascript:`/active URIs in `path` |
| The consumer's browser / runtime | Targets modern evergreen browsers and `file://`; very old browsers are untested, not guaranteed | Widen the tested matrix, or narrow the declared support, on record |
| Transitive dependency compromise | n/a — zero runtime deps; the only third-party artifacts are the OFL fonts (pinned, bundled with licenses) | Keep the dependency count at zero (the real control) |
| Data the theme is handed | It renders the content/index it is given and transmits nothing (offline); it neither logs nor stores input | Do not embed secrets in indexed content — it ships in a static file |
| Malicious fork / typosquat | A user could vendor something that is not this project | Verify `_theme/` against the release `checksums.txt`; the canonical source is `github.com/joseconti/keel-docs-theme` (README) |
| Post-vendor integrity of `_theme/` | Once copied into a consumer repo, the theme cannot enforce that it stays unedited | The consumer runs the checksum verification (`checksums.txt`) in its own `guide-qa`/CI |

## Notes

- No control above is `TO BUILD`, `MANUAL`, or `VERIFY`: the theme's security surface
  is small and fully realized in the shipped static files.
- Structural note (not a vulnerability): `theme/_theme` and `demo/_theme` are a
  managed, in-sync duplication (the demo must be self-contained). Parity is verified
  at the release gate and on every `_theme/` edit; a `scripts/keel-verify` check would
  enforce it mechanically (deferred with the test-automation harness — see
  `docs/keel-conformance.md`).
