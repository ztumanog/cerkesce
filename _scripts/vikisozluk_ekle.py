import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# Vikisozluk'ten secilmis kelimeler
yeni = [
    # Milletler
    {"id": "L-TYRCU", "form": "тырку", "literalMeaning": "Turk",
     "wordFamilyId": "WF-ETHNOS", "conceptId": "TURK"},
    {"id": "L-URYS", "form": "урыс", "literalMeaning": "Rus",
     "wordFamilyId": "WF-ETHNOS", "conceptId": "RUSSIAN"},
    {"id": "L-KEZHER", "form": "къэжэр", "literalMeaning": "Pers",
     "wordFamilyId": "WF-ETHNOS", "conceptId": "PERSIAN"},
    {"id": "L-SHESHEN", "form": "шэшэн", "literalMeaning": "Cecen",
     "wordFamilyId": "WF-ETHNOS", "conceptId": "CHECHEN"},
    {"id": "L-ABKHAZ", "form": "абхъаз", "literalMeaning": "Abhaz",
     "wordFamilyId": "WF-ETHNOS", "conceptId": "ABKHAZ"},
    {"id": "L-KURZHY", "form": "куржы", "literalMeaning": "Gurcu",
     "wordFamilyId": "WF-ETHNOS", "conceptId": "GEORGIAN"},
    {"id": "L-KALMYK", "form": "къалмыкъ", "literalMeaning": "Kalmuk",
     "wordFamilyId": "WF-ETHNOS", "conceptId": "KALMYK"},
    # Hayvanlar
    {"id": "L-BLANE", "form": "бланэ", "literalMeaning": "geyik",
     "wordFamilyId": "WF-ANIMAL", "conceptId": "DEER"},
    {"id": "L-DYGHUZH", "form": "дыгъужь", "literalMeaning": "kurt",
     "wordFamilyId": "WF-ANIMAL", "conceptId": "WOLF"},
    {"id": "L-BLE", "form": "блэ", "literalMeaning": "yilan",
     "wordFamilyId": "WF-ANIMAL", "conceptId": "SNAKE"},
    {"id": "L-KARGHE", "form": "къаргъэ", "literalMeaning": "sahin",
     "wordFamilyId": "WF-ANIMAL", "conceptId": "FALCON"},
    {"id": "L-ZHYNDU", "form": "жьынду", "literalMeaning": "baykus",
     "wordFamilyId": "WF-ANIMAL", "conceptId": "OWL"},
    # Bitkiler
    {"id": "L-DZEL", "form": "дзэл", "literalMeaning": "sogut",
     "wordFamilyId": "WF-PLANT", "conceptId": "WILLOW"},
    {"id": "L-BZHEY", "form": "бжей", "literalMeaning": "mese",
     "wordFamilyId": "WF-PLANT", "conceptId": "OAK"},
    {"id": "L-K1EY", "form": "кӏей", "literalMeaning": "disbudak",
     "wordFamilyId": "WF-PLANT", "conceptId": "ASH_TREE"},
    {"id": "L-BEREZHEY", "form": "бэрэжьей", "literalMeaning": "kizilcik",
     "wordFamilyId": "WF-PLANT", "conceptId": "DOGWOOD"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: Vikisozluk 2023."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
