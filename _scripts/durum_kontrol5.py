import json
from pathlib import Path

p = Path("public/data/linguistic/lexemes.json")
print(f"Dosya: {p}")
print(f"Boyut: {p.stat().st_size} bytes")
print(f"Son degisiklik: {p.stat().st_mtime}")

lex = json.loads(p.read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")

shchy = [l for l in lex if l.get("form", "").startswith("щы")]
dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

print(f"\nщы-: {len(shchy)}")
print(f"DOLU: {len(dolu)}")
print(f"BOS: {len(bos)}")

# Ornek dolu
print("\nOrnek dolu (ilk 10):")
for l in dolu[:10]:
    print(f"  {l.get('form')} | {l.get('conceptId')}")
