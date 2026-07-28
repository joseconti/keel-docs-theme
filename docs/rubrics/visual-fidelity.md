# Rubric — visual & accessibility fidelity of a theme change

Recorded judgment criteria (Keel Phase 2 §6a) for the one quality domain where a
theme change needs a consistent bar rather than case-by-case taste: does a change to
`_theme/` preserve the theme's visual and accessibility contract? Applied when
reviewing any CSS/JS/template change before it ships.

A change **passes** only if every row holds; a `✗` is a defect, not a preference.

| # | Criterion | How to check | Pass bar |
|---|---|---|---|
| 1 | Contrast preserved (both modes) | `python3 scripts/verify-contrast.py`; recompute if a token changed | 0 pairs below AA 4.5:1; body text stays ≈AAA |
| 2 | Focus visible on every interactive element | keyboard pass on the demo; watch clipped/rounded containers (`overflow:hidden`) | every focusable element shows the ring, nothing clipped (L-003) |
| 3 | No meaning by color alone | inspect states/admonitions/nav | second cue present (icon + label + weight), never color-only |
| 4 | Offline contract intact | grep the change for `fetch`/`eval`/external URLs/CDN | zero network, zero dynamic exec, zero external requests |
| 5 | Logical properties (RTL-safe) | inspect new CSS | `*-inline`/`*-block`, `inset-*` — no physical left/right/top/bottom for layout |
| 6 | Reduced-motion & forced-colors honored | check any new animation/state | `prefers-reduced-motion` override + `forced-colors` handling present |
| 7 | Source-first, no minified drift | `git diff`; no `*.min.*` hand-edits | readable source only (D-012); theme/_theme ≡ demo/_theme after the change |
| 8 | Semantic name/role/state | inspect any new control against SPEC §6 | correct role, accessible name, live state (`aria-*`) |

Domains deliberately **not** governed by a rubric here: art direction and content
wording (settled once by Design as "Errata", D-002 — not re-judged per change).
