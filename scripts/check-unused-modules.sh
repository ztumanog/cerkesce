#!/usr/bin/env bash
#
# check-unused-modules.sh — hiçbir yerden import edilmeyen modülleri bulur.
#
# Neden: 9597a0c (2026-11-15) src/lib/curationValidate.ts dosyasını ekledi ama hiçbir
# çağrı noktası bağlamadı; modül 8 gün ölü kaldı (bkz. docs/audits/CURATION-VALIDATE-AUDIT.md).
# Bu script o sınıf hatayı CI'da yakalar: "modül eklendi ama bağlanmadı".
#
# Kapsam: CHECK_UNUSED_DIRS (varsayılan: src/lib src/hooks src/utils) altındaki
# .ts dosyaları (*.test.ts, *.d.ts hariç). Import taraması app/, src/, scripts/
# üzerinden yapılır; TEST DOSYALARI tüketici sayılmaz — yalnızca kendi testinde
# import edilen modül de "bağlanmamış" kabul edilir.
#
# Kullanım:
#   bash scripts/check-unused-modules.sh              # bağlanmamış varsa exit 1 (CI modu)
#   WARN_ONLY=1 bash scripts/check-unused-modules.sh  # yalnızca uyarı, exit 0
#
# Muafiyet: repo kökündeki .unused-modules-allowlist dosyasına satır satır dosya yolu yazın
# (ör. src/lib/gelecekCalisma.ts). Bilinçli kararın kaydıdır, sessizliğin değil.
#
# Sınırlar: aynı adlı iki dosya (iki farklı utils.ts) yanlış-negatif verebilir; literal
# olmayan dinamik import() yakalanmaz. Araç erken uyarıdır, kesin kanıt değil.

set -uo pipefail

DIRS="${CHECK_UNUSED_DIRS:-src/lib src/hooks src/utils}"
ALLOWLIST="${CHECK_UNUSED_ALLOWLIST:-.unused-modules-allowlist}"
SEARCH_DIRS="app src scripts"
WARN_ONLY="${WARN_ONLY:-0}"

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

# 1) Tüm import specifier'larını tek seferde topla.
#    - `... from '<x>'`  (import, import type, export ... from)
#    - `import('<x>')`   (dinamik, literal)
#    Test dosyaları (*.test.ts) hariç tutulur: tüketici sayılmazlar.
collect_imports() {
  grep -rhoE "from ['\"][^'\"]+['\"]" $SEARCH_DIRS \
    --include='*.ts' --include='*.tsx' --include='*.mjs' --include='*.js' 2>/dev/null \
    --exclude='*.test.ts' --exclude='*.test.tsx' \
    | sed -E "s/^from ['\"]//; s/['\"]$//"
  grep -rhoE "import\(['\"][^'\"]+['\"]\)" $SEARCH_DIRS \
    --include='*.ts' --include='*.tsx' --include='*.mjs' --include='*.js' 2>/dev/null \
    --exclude='*.test.ts' --exclude='*.test.tsx' \
    | sed -E "s/^import\(['\"]//; s/['\"]\)$//"
}

IMPORTS="$(collect_imports)"

if [ -z "$(printf '%s' "$IMPORTS" | tr -d '[:space:]')" ]; then
  echo "HATA: import taraması boş döndü — dizin yapısı değişmiş olabilir." >&2
  exit 2
fi

unused=()

for dir in $DIRS; do
  [ -d "$dir" ] || continue
  while IFS= read -r f; do
    # Muafiyet listesindeyse atla
    if [ -f "$ALLOWLIST" ] && grep -qxF "$f" "$ALLOWLIST"; then
      continue
    fi

    base="${f#*/}"        # src/ sonrası: lib/curationValidate
    noext="${base%.ts}"   # lib/curationValidate
    name="$(basename "$noext")"

    # Specifier şunlardan biriyle bitiyor mu?
    #   "/lib/curationValidate"  → @/lib/x alias'ı veya ../../lib/x göreceli yol
    #   "/curationValidate"      → aynı dizindeki kardeş import (./x)
    if printf '%s\n' "$IMPORTS" | grep -q -E "(/${noext}|/${name})$"; then
      continue
    fi

    unused+=("$f")
  done < <(find "$dir" -name '*.ts' ! -name '*.test.ts' ! -name '*.d.ts' | sort)
done

if [ "${#unused[@]}" -eq 0 ]; then
  echo "OK: ${DIRS} altında bağlanmamış modül yok."
  exit 0
fi

echo "BAĞLANMAMIŞ MODÜLLER (${#unused[@]}):"
for f in "${unused[@]}"; do
  echo "  - $f"
done
echo
echo "Bunlar ya bir çağrı noktasına bağlanmalı ya da .unused-modules-allowlist'e bilinçli karar olarak yazılmalı."
echo "Bkz: docs/audits/CURATION-VALIDATE-AUDIT.md (KÖK NEDEN ve DERS)"

if [ "$WARN_ONLY" = "1" ]; then
  echo "(WARN_ONLY=1 — uyarı modu, exit 0)"
  exit 0
fi
exit 1
