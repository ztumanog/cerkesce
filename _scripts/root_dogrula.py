import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

existing = {r.get("id") for r in roots}

# 1) Kiril kalan var mi?
kiril_kalan = set()
for l in lex:
    for rid in l.get("rootIds", []):
        if any('\u0400' <= c <= '\u04FF' for c in rid):
            kiril_kalan.add(rid)

# 2) roots.json'da olmayan var mi?
eksik = set()
for l in lex:
    for rid in l.get("rootIds", []):
        if rid not in existing:
            eksik.add(rid)

# 3) Bos rootIds
bos = sum(1 for l in lex if not l.get("rootIds"))

print(f"=== ROOT DOGRULAMA ===")
print(f"Toplam root: {len(roots)}")
print(f"Toplam lexeme: {len(lex)}")
print(f"rootIds dolu: {len(lex) - bos} ({100*(len(lex)-bos)/len(lex):.1f}%)")
print(f"rootIds bos: {bos}")
print(f"\n=== SORUNLAR ===")
print(f"Kiril kalan: {len(kiril_kalan)}")
if kiril_kalan:
    print(f"  Ornek: {list(kiril_kalan)[:10]}")
print(f"roots.json'da OLMAYAN: {len(eksik)}")
if eksik:
    print(f"  Ornek: {list(eksik)[:10]}")
