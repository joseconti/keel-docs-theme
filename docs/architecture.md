# Architecture — keel-docs-theme

One-purpose repo: produce and version the canonical documentation theme keel vendors into each project's `guide/`.

## Pieces and flow

```
docs/design/design-handoff/        Design's delivery (byte-frozen; SPEC/ governs everything)
        │  verbatim copy + 3 logged adaptations (BUILD-SPEC §9: A1 skip-link, A2 comment ratios, A3 dead line)
        ▼
theme/                             the release content: _theme/ (vendorable unit) + templates/ + brand/ + examples/
demo/                              the same consumption tree instantiated with Basalt — permanent styleguide & validation
        │  scripts/package.sh vX.Y.Z  (stamps __THEME_VERSION__, zips, SHA-256 checksums)
        ▼
dist/keel-docs-theme-vX.Y.Z.zip + dist/checksums.txt   → attached to the GitHub release
        │  downloaded by any assistant (keel Phase 6 mechanism, README §How an assistant applies the theme)
        ▼
consumer project guide/            _theme/ vendored as-is · brand/ per project · pages from templates · data files per schemas
```

## Invariants

- The repo tree always carries the literal `__THEME_VERSION__`; only packaged releases are stamped. Single source, checksums computed on stamped files.
- `theme/_theme/` ≡ `demo/_theme/` byte-identical (verified by diff at build; consumers get the same bytes the demo runs).
- The handoff directory is wholesale-replaceable (keel contract rule 10): nothing is ever written into it.
- No build step at consumption time: everything ships final (vanilla HTML/CSS/JS, self-hosted OFL fonts, inline SVG icons, global-script data).
- Integrity chain: release checksums → vendored `_theme/` verification → per-page `<meta name="keel-docs-theme">` version marker.

Decisions: docs/decisions.md (D-001…D-009). Audit evidence: docs/BUILD-SPEC.md §1.
