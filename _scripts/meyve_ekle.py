import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# Mevcutlari duzelt
duzeltmeler = {
    "L-MY1ERYSEY": {"form": "мыӀэрысей", "literalMeaning": "elma agaci"},
    "L-KUZHAY": {"form": "къужъай", "literalMeaning": "armut agaci"},
}

for l in lex:
    if l["id"] in duzeltmeler:
        g = duzeltmeler[l["id"]]
        for k, v in g.items():
            l[k] = v

# Yeni meyveler
yeni = [
    {"id": "L-MY1ERYSE", "form": "мыӀэрысэ", "literalMeaning": "elma",
     "conceptId": "APPLE"},
    {"id": "L-MY", "form": "мы", "literalMeaning": "yabani elma",
     "conceptId": "WILD_APPLE"},
    {"id": "L-KHUZH", "form": "кхъужь", "literalMeaning": "armut",
     "conceptId": "PEAR"},
    {"id": "L-KUZHY", "form": "къужъы", "literalMeaning": "armut (varyant)",
     "conceptId": "PEAR"},
    {"id": "L-SHCHYPTS1ESHCHYDE", "form": "щӀыпцӀэщӀыдэ", "literalMeaning": "badem",
     "conceptId": "ALMOND"},
    {"id": "L-KYTS1E", "form": "къыцэ", "literalMeaning": "badem (cagla)",
     "conceptId": "ALMOND"},
]

for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-FRUIT"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: meyve. Jonty, Abaze, Teshu."
        lex.append(y)
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
