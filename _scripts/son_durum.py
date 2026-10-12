import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

print(f"Toplam щы-: {len(shchy)}")
print(f"DOLU: {len(dolu)}")
print(f"BOS: {len(bos)}")

# Ornek bos
print("\nBOS olanlar (ilk 20):")
for l in bos[:20]:
    print(f"  {l.get('form')}")
