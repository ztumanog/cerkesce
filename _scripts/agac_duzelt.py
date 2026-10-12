import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# Mevcut duzeltmeler
for l in lex:
    if l["id"] == "L-PSEY":
        l["form"] = "остыгъай"
        l["literalMeaning"] = "cam agaci"
        l["notes"] = "C-11.3: cam. Dogru form: остыгъай. Teshu 1991."
        print("L-PSEY duzeltildi: остыгъай (cam)")

# Yeni agaclar
yeni = [
    {"id": "L-CHYGEY", "form": "чъыгай", "literalMeaning": "mese agaci (Adigece)",
     "conceptId": "OAK_TREE"},
    {"id": "L-CHYGAE", "form": "чъыгае", "literalMeaning": "mese agaci (varyant)",
     "conceptId": "OAK_TREE"},
]

for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-FLORA"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: agac. Teshu 1991."
        lex.append(y)
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
