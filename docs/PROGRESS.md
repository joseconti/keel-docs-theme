# PROGRESS — keel-docs-theme

> Living state. Read this FIRST in every session. Keep current and compact.

## Project card
- Name / one-line purpose: keel-docs-theme — the canonical documentation theme (end-user guide + developer portal) keel vendors into every project's `guide/`
- Project type: reusable component / library (static theme: HTML + CSS + vanilla JS)
- Stack & target platform(s): static web, no build step, `file://`-safe, any static hosting
- License: MIT (fonts remain SIL OFL, licenses travel with them)
- Docs language: English (token economy). Historical artifacts in Spanish kept as-is: docs/PLAN-KEEL-DOCS-THEME.md, docs/design/DESIGN-BRIEF.md, docs/design/MENSAJE-APERTURA-DESIGN.md
- Security profile: references/security/library-component.md
- Accessibility: WCAG 2.2 AA floor, AAA where feasible (delivered by Design with measured ratios; recomputed by audit)
- i18n: theme UI strings es+en shipped; any locale via strings-<locale>.js schema; RTL-ready (logical properties)
- Installed base: fresh v1
- Design system: founding — canonical (direction "Errata"); lives in this repo
- Keel portability: lock only
- Assistant config: none
- Keel baseline: v3.1.0
- Website intent: no
- Client budget: no
- User guide: n/a — the product IS the guide system; README + demo/ serve as its docs

## Phase status
| Phase | Status | Key artifacts |
|-------|--------|---------------|
| 1 Discovery | done (outside keel, 2026-07-16) | docs/PLAN-KEEL-DOCS-THEME.md |
| 2 Functional spec | done (outside keel, merged into plan + brief) | docs/PLAN-KEEL-DOCS-THEME.md, docs/design/DESIGN-BRIEF.md |
| 3 Design handoff | done (delivered 2026-07-17) | docs/design/DESIGN-BRIEF.md, docs/design/design-handoff/ |
| 4 Faithful build | done (2026-07-17; A1-A3 logged; AT pass ⚠ pending user) | docs/BUILD-SPEC.md |
| 5 Development | done (merged into Phase 4: verbatim port + mechanical verification) | docs/BUILD-SPEC.md §10 |
| 6 Documentation | done (2026-07-17) | README.md, docs/architecture.md, docs/api/INDEX.md |
| 7 Release | done (v1.0.0 published 2026-07-17, zip + checksums attached, latest) | docs/07-release.md, CHANGELOG.md |
| 8 Website | n/a (no website intent) | — |

## Current position
- Phase: 7 done — project in MAINTENANCE (references/maintenance.md)
- Next action: apply the keel-skill integration changes (docs/PLAN-KEEL-DOCS-THEME.md §4) in the keel-skill repo, then first consumer regeneration; close the open AT pass on the demo

## Open items
- Unresolved user questions: none
- Open Design Requests: none
- Unverified external steps/assets: assistive-technology pass on the demo (user-run, ⚠ open at release per user decision pending)
- Forge issues in progress: none

### Deferred items (consciously postponed work)
- José Conti brand preset — deferred by user decision to first keel consumption (SPEC/open-questions.md #1) — revisit at first consumer project
- keel-skill changes to APPLY this theme (guide-theme.md, phase-6, guide-qa, maintenance) — after v1.0.0 release, per docs/PLAN-KEEL-DOCS-THEME.md §4 — NEVER bump keel-skill version without explicit instruction

Last updated: 2026-07-17 — Phase 7 closed; v1.0.0 published; maintenance
