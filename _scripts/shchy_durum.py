import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# щы- ile baslayanlar
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
print(f"Toplam щы-: {len(shchy)}")

# conceptId dolu mu?
dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

print(f"conceptId DOLU: {len(dolu)}")
print(f"conceptId BOS: {len(bos)}")

# subConceptId durumu
sub_dolu = [l for l in shchy if l.get("subConceptId") and l.get("subConceptId") not in ("", "-")]
sub_bos = [l for l in shchy if not l.get("subConceptId") or l.get("subConceptId") in ("", "-")]
print(f"\nsubConceptId DOLU: {len(sub_dolu)}")
print(f"subConceptId BOS: {len(sub_bos)}")

# rootForm durumu
root_dolu = [l for l in shchy if l.get("rootForm")]
print(f"\nrootForm DOLU: {len(root_dolu)}")
print(f"rootForm BOS: {len(shchy) - len(root_dolu)}")

# Ornek bos
print("\nconceptId BOS olanlar (ilk 10):")
for l in bos[:10]:
    print(f"  {l.get('form')} (ID: {l.get('id')})")
