#!/usr/bin/env python3
"""Independent WCAG 2.x contrast recomputation vs Design's measured ratios
(docs/design/design-handoff/SPEC/accessibility.md). Verifies the theme's
color contract with the canonical relative-luminance formula."""

def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def lum(hexs):
    hexs = hexs.lstrip('#')
    r, g, b = (int(hexs[i:i+2], 16) for i in (0, 2, 4))
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(fg, bg):
    a, b = lum(fg), lum(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)

# (label, fg, bg, spec_value)
pairs = [
    # LIGHT
    ("L body #1B1A16/bg",        "#1B1A16", "#FAF7F1", 16.29),
    ("L body #1B1A16/surface",   "#1B1A16", "#FFFDF8", 17.13),
    ("L heading #14130F/bg",     "#14130F", "#FAF7F1", 17.38),
    ("L secondary #5A574E/bg",   "#5A574E", "#FAF7F1", 6.75),
    ("L muted #6B685F/bg",       "#6B685F", "#FAF7F1", 5.21),
    ("L code #26251F/code-bg",   "#26251F", "#F3EFE6", 13.39),
    ("L accent #2B5B84/bg",      "#2B5B84", "#FAF7F1", 6.70),
    ("L accent #2B5B84/surface", "#2B5B84", "#FFFDF8", 7.04),
    ("L white/accent",           "#FFFFFF", "#2B5B84", 7.16),
    ("L note #2F5E86/surface",   "#2F5E86", "#FFFDF8", 6.74),
    ("L tip #2E6B45/surface",    "#2E6B45", "#FFFDF8", 6.25),
    ("L warn #835E0C/surface",   "#835E0C", "#FFFDF8", 5.78),
    ("L danger #9E3520/surface", "#9E3520", "#FFFDF8", 6.92),
    ("L syn comment #67635A",    "#67635A", "#F3EFE6", 5.22),
    ("L syn keyword #8C3B4A",    "#8C3B4A", "#F3EFE6", 6.44),
    ("L syn string #3E6E4E",     "#3E6E4E", "#F3EFE6", 5.16),
    ("L syn number #8A5A1E",     "#8A5A1E", "#F3EFE6", 5.14),
    ("L syn function #2C5578",   "#2C5578", "#F3EFE6", 6.83),
    ("L syn property #6A4A86",   "#6A4A86", "#F3EFE6", 6.23),
    # DARK
    ("D body #ECE8DE/bg",        "#ECE8DE", "#17150F", 14.92),
    ("D body #ECE8DE/surface",   "#ECE8DE", "#1E1B14", 14.04),
    ("D heading #F4F1E8/bg",     "#F4F1E8", "#17150F", 16.16),
    ("D secondary #B0AB9E/bg",   "#B0AB9E", "#17150F", 7.97),
    ("D muted #8E897C/bg",       "#8E897C", "#17150F", 5.23),
    ("D code #E6E2D8/code-bg",   "#E6E2D8", "#211E16", 12.86),
    ("D accent #7FB0DC/bg",      "#7FB0DC", "#17150F", 7.95),
    ("D accent #7FB0DC/surface", "#7FB0DC", "#1E1B14", 7.48),
    ("D ink/accent",             "#10131A", "#7FB0DC", 8.09),
    ("D note #9FC2E0/surface",   "#9FC2E0", "#1E1B14", 9.22),
    ("D tip #8FD0A6/surface",    "#8FD0A6", "#1E1B14", 9.61),
    ("D warn #E0B27A/surface",   "#E0B27A", "#1E1B14", 8.85),
    ("D danger #E8977E/surface", "#E8977E", "#1E1B14", 7.49),
    ("D syn comment #9A9384",    "#9A9384", "#211E16", 5.45),
    ("D syn keyword #E88A9C",    "#E88A9C", "#211E16", 6.77),
    ("D syn string #93D3AA",     "#93D3AA", "#211E16", 9.62),
    ("D syn number #E0B27A",     "#E0B27A", "#211E16", 8.57),
    ("D syn function #A6C8E6",   "#A6C8E6", "#211E16", 9.53),
    ("D syn property #C7ABE6",   "#C7ABE6", "#211E16", 8.24),
    # Focus ring
    ("L focus #1B1A16/bg",       "#1B1A16", "#FAF7F1", 16.29),
    ("D focus #ECE8DE/bg",       "#ECE8DE", "#17150F", 14.92),
]

max_delta = 0.0
worst = None
mismatches = 0
below_aa = 0
print(f"{'pair':32} {'recomputed':>10} {'spec':>7} {'Δ':>6}  AA(4.5) AAA(7)")
for label, fg, bg, spec in pairs:
    r = ratio(fg, bg)
    d = abs(r - spec)
    if d > max_delta:
        max_delta, worst = d, label
    if d > 0.05:
        mismatches += 1
    if r < 4.5:
        below_aa += 1
    aa = "PASS" if r >= 4.5 else "FAIL"
    aaa = "AAA" if r >= 7 else ("AA" if r >= 4.5 else "-")
    print(f"{label:32} {r:10.2f} {spec:7.2f} {d:6.3f}  {aa:>5}  {aaa}")

print()
print(f"pairs checked: {len(pairs)}")
print(f"max |recomputed - spec| delta: {max_delta:.3f}  (worst: {worst})")
print(f"pairs disagreeing with SPEC by >0.05: {mismatches}")
print(f"pairs below AA 4.5:1: {below_aa}")
