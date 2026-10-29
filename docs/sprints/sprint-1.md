---
schema: keel.sprint/2
sprint: 1
goal: "Reconcile maintenance records and prepare issue1 fix for approved theme v1.0.2"
status: in-progress
slices:
  - id: T-001
    title: "Keel v7.3.2 maintenance reconciliation"
    status: done
    original_hours: 0.5
    actual_hours: 0.06
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-MAINTENANCE-RECONCILIATION]
    estimate_changes: []
    depends_on: []
    criteria: [THEME-MAINTENANCE-RECONCILIATION]
    execution:
      write_paths: [.gitignore, AGENTS.md, CLAUDE.md, .githooks/, scripts/, docs/PROGRESS.md, docs/decisions.md, docs/estimate.md, docs/keel-conformance.md, docs/issues.md, docs/api/, docs/sprints/, docs/.keel/plan.json, docs/sessions.md]
      contracts:
        reads: [theme-layout-contract]
        writes: [theme-maintenance-state]
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "Linear maintenance dependency and coordinator-owned state; sole browser"
  - id: T-002
    title: "Issue1 responsive header and measured offsets"
    status: done
    original_hours: 1
    actual_hours: 0.01
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-ISSUE1-REFLOW]
    estimate_changes: []
    depends_on: [T-001]
    criteria: [THEME-ISSUE1-REFLOW]
    execution:
      write_paths: [theme/_theme/css/theme.css, theme/_theme/js/theme.js, demo/_theme/css/theme.css, demo/_theme/js/theme.js, scripts/verify-reflow.cjs, docs/BUILD-SPEC.md, docs/architecture.md, docs/verification/, docs/decisions.md, docs/PROGRESS.md]
      contracts:
        reads: [theme-layout-contract]
        writes: [theme-maintenance-state]
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "Linear maintenance dependency and coordinator-owned state; sole browser"
  - id: T-003
    title: "Prepare approved v1.0.2 package and checksums"
    status: done
    original_hours: 0.25
    actual_hours: 0.02
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-V102-PACKAGE]
    estimate_changes: []
    depends_on: [T-002]
    criteria: [THEME-V102-PACKAGE]
    execution:
      write_paths: [CHANGELOG.md, docs/07-release.md, docs/verification/, docs/token-ledger.md, docs/PROGRESS.md]
      contracts:
        reads: [theme-layout-contract]
        writes: [theme-maintenance-state]
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "Linear maintenance dependency and coordinator-owned state; sole browser"
  - id: T-004
    title: "Coordinator publication and release asset read-back"
    status: done
    original_hours: 0.25
    actual_hours: 0.09
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-V102-PUBLICATION]
    estimate_changes: []
    depends_on: [T-003, T-005]
    criteria: [THEME-V102-PUBLICATION]
    execution:
      write_paths: [docs/07-release.md, docs/issues.md, docs/PROGRESS.md, docs/decisions.md, docs/sprints/, docs/.keel/plan.json]
      contracts:
        reads: [theme-layout-contract]
        writes: [theme-maintenance-state]
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "Linear maintenance dependency and coordinator-owned state; sole browser"
  - id: T-005
    title: "Preserve content when wrapped header fills short viewport"
    status: done
    original_hours: 0.25
    actual_hours: 0.02
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-SHORT-VIEWPORT-FALLBACK]
    estimate_changes: []
    depends_on: [T-003]
    criteria: [THEME-SHORT-VIEWPORT-FALLBACK]
    execution:
      write_paths: [theme/_theme/, demo/_theme/, scripts/verify-reflow.cjs, docs/]
      contracts:
        reads: [theme-layout-contract]
        writes: [theme-maintenance-state]
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "Related edge fix, coordinator review and exclusive browser"

  - id: T-006
    title: "Correct entry language button ARIA state"
    status: done
    original_hours: 0.25
    actual_hours: 0.01
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-ENTRY-ARIA]
    estimate_changes: []
    depends_on: [T-004]
    criteria: [THEME-ENTRY-ARIA]
    execution:
      write_paths: [theme/templates/template-entry.html, theme/_theme/js/theme.js, demo/index.html, demo/_theme/js/theme.js, scripts/, docs/, CHANGELOG.md]
      contracts:
        reads: [theme-layout-contract]
        writes: [entry-language-state]
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "One bounded accessibility correction and exclusive browser"

  - id: T-007
    title: "Verify exact packaged entry assets through isolated fixture"
    status: done
    original_hours: 0.1
    actual_hours: 0.01
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-ENTRY-PACKAGE-REGRESSION]
    estimate_changes: []
    depends_on: [T-006]
    criteria: [THEME-ENTRY-PACKAGE-REGRESSION]
    execution:
      write_paths: [scripts/verify-entry-a11y.cjs, docs/]
      contracts:
        reads: [entry-language-state]
        writes: []
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "Exclusive browser after coordinating app verifier completes"


  - id: T-008
    title: "Publish owner-approved v1.0.3 and verify downloaded assets"
    status: done
    original_hours: 0.5
    actual_hours: 0.03
    actual_source: measured
    residual_hours: 0
    change_kind: added
    parent_slice: null
    owns: [THEME-V103-PUBLICATION]
    estimate_changes: []
    depends_on: [T-006, T-007]
    criteria: [THEME-V103-PUBLICATION]
    execution:
      write_paths: [CHANGELOG.md, docs/]
      contracts:
        reads: [entry-language-state]
        writes: [theme-maintenance-state]
      exclusive_resources: [theme-browser]
      parallel: serial
      serial_reason: "Release integration, state and exclusive browser owned by this coordinator"

---

# Maintenance sprint 1

Hours are AI work plus supervision. Publication is owned by the parent DeCA release coordinator;
this worker prepares a tested, committed branch and package only. Historical D-011/D-014
consolidation and harness deferrals remain recorded; no completed phase is reconstructed.

Publication checkpoint: D-018 records chronological changelog and separate Keel tool licensing; consumable theme runtime remains MIT.
