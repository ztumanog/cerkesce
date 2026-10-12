import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# адэжынэ güncelle
for l in lex:
    if l.get("form") == "адэжынэ":
        l["rootForm"] = "адэжынэ"
        l["taxonomyFamily"] = "RALLIDAE"
        l["subConceptId"] = "CORNCRAKE"
        l["conceptId"] = "ANIMAL"
        print(f"OK: адэжынэ guncellendi")
        break

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Doğrulama
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]
eksik = [l for l in animal if not l.get("subConceptId") or not l.get("taxonomyFamily") or not l.get("rootForm")]

print(f"ANIMAL toplam: {len(animal)}")
print(f"Eksik alanli:  {len(eksik)}")
if eksik:
    for l in eksik:
        print(f"  EKSIK: {l.get('form')}")
else:
    print("Tum kayitlar tam!")
