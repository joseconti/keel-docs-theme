#!/usr/bin/env bash
# keel-docs-theme release packaging (docs/decisions.md D-007).
# Produces dist/keel-docs-theme-vX.Y.Z.zip + dist/checksums.txt from theme/,
# stamping the literal __THEME_VERSION__ placeholder with the release version.
# The repo tree itself always keeps the placeholder; only packages are stamped.
# Usage: scripts/package.sh vX.Y.Z
set -euo pipefail
V="${1:?usage: scripts/package.sh vX.Y.Z}"
case "$V" in v[0-9]*.[0-9]*.[0-9]*) ;; *) echo "version must look like vX.Y.Z" >&2; exit 1 ;; esac
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
NAME="keel-docs-theme-$V"
STAGE="$DIST/$NAME"
rm -rf "$STAGE" "$DIST/$NAME.zip" "$DIST/checksums.txt"
mkdir -p "$STAGE"
cp -R "$ROOT/theme/." "$STAGE/"
cp "$ROOT/LICENSE" "$ROOT/CHANGELOG.md" "$STAGE/"
# Stamp the version in every text file carrying the placeholder
grep -rl '__THEME_VERSION__' "$STAGE" | while IFS= read -r f; do
  python3 -c 'import sys;p,v=sys.argv[1],sys.argv[2];s=open(p,encoding="utf-8").read();open(p,"w",encoding="utf-8").write(s.replace("__THEME_VERSION__",v))' "$f" "$V"
done
if grep -rl '__THEME_VERSION__' "$STAGE" >/dev/null 2>&1; then
  echo "ERROR: unstamped placeholder remains" >&2; exit 1
fi
# SHA-256 helper (Linux: sha256sum; macOS: shasum -a 256)
sha() { if command -v sha256sum >/dev/null 2>&1; then sha256sum "$@"; else shasum -a 256 "$@"; fi; }
# Checksums of every packaged file, then the zip itself
( cd "$STAGE" && find . -type f | sed 's|^\./||' | LC_ALL=C sort | while IFS= read -r f; do sha "$f"; done ) > "$DIST/checksums.txt"
TMPD="$(mktemp -d)"
( cd "$DIST" && zip -qr "$TMPD/$NAME.zip" "$NAME" )
mv "$TMPD/$NAME.zip" "$DIST/$NAME.zip"
rmdir "$TMPD"
( cd "$DIST" && sha "$NAME.zip" >> checksums.txt )
echo "Built: dist/$NAME.zip"
echo "Checksums: dist/checksums.txt ($(wc -l < "$DIST/checksums.txt") entries)"
