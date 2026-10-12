import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# Mevcut duzeltmeler
duzeltmeler = {
    "L-PSEY": {"form": "остыгъай", "literalMeaning": "cam agaci",
               "notes": "C-11.3: cam. Teshu 1991."},
    "L-TSYXHU2": {"form": "шиху", "literalMeaning": "kavak",
                  "notes": "C-11.3: kavak. Abaze 2005."},
    "L-ZHYGEY": {"form": "жыгей", "literalMeaning": "mese agaci",
                 "notes": "C-11.3: mese. Jonty, Abaze."},
}

for l in lex:
    if l["id"] in duzeltmeler:
        g = duzeltmeler[l["id"]]
        for k, v in g.items():
            l[k] = v
        print(f"Duzeltildi: {l['id']} -> {l['form']}")

# Yeni agaclar
yeni = [
    {"id": "L-MY1ERYSEY", "form": "мыӀэрысей", "literalMeaning": "elma agaci",
     "conceptId": "APPLE_TREE"},
    {"id": "L-KUZHAY", "form": "къужъай", "literalMeaning": "armut agaci",
     "conceptId": "PEAR_TREE"},
    {"id": "L-KUMBYL", "form": "къумбыл", "literalMeaning": "kavak (varyant)",
     "conceptId": "POPLAR"},
    {"id": "L-DAE", "form": "дае", "literalMeaning": "ceviz agaci",
     "conceptId": "WALNUT_TREE"},
    {"id": "L-BZIIXHU", "form": "бзииху", "literalMeaning": "ihlamur",
     "conceptId": "LINDEN"},
]

for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-FLORA"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: agac. Abaze 2005, Teshu 1991."
        lex.append(y)
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
