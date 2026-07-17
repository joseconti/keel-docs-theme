# Lessons Learned — keel-docs-theme

## L-001 — Claude Design export mangles non-ASCII folder names
- Problem: the design export arrived as `documentaci-n-web-keel-skill/` (ó lost from "documentación")
- Where: repo intake, 2026-07-17
- What failed: trusting the export wrapper's own folder naming
- Working solution: relocate the delivery to its canonical keel path `docs/design/design-handoff/` immediately; discard the export wrapper (README for coding agents, .thumbnail)
- Rule for next time: on receiving a Design export, move contents to canonical ASCII paths first; the wrapper is packaging, not deliverable
