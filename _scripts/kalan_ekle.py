import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# KALAN CERKESCЕ OZ + CERKESCELESMIS
ekle_listesi = {
    "ийщӀ": ("R-NUM", "NUMBER_EIGHTY", "compound"),
    "щитӀ": ("R-NUM", "NUMBER_TWO_HUNDRED", "compound"),
    "щиплӀ": ("R-NUM", "NUMBER_FOUR_HUNDRED", "compound"),
    "рэхьатэу": ("R-REXHAT", "COMFORTABLY", "borrowed+suffix"),
    "рэхьат": ("R-REXHAT", "COMFORT", "borrowed"),
    "мамыру": ("R-MAMYR", "PEACEFULLY", "borrowed+suffix"),
    "саугъэт": ("R-SAUGHET", "GIFT", "root"),
    "чырбыш": ("R-CHYRBISH", "BRICK", "borrowed"),
    "толъкъун": ("R-TOLQUN", "WAVE", "borrowed"),
    "бэзэр": ("R-BEZER", "MARKET", "borrowed"),
    "тобэ": ("R-TOBE", "REPENTANCE", "borrowed"),
    "пачъыхь": ("R-PACHYH", "KING", "borrowed"),
    "дерс": ("R-DERS", "LESSON", "borrowed"),
    "арба": ("R-ARBA", "CART", "borrowed"),
}

print(f"Toplam EKLE: {len(ekle_listesi)}")
print(f"rootIds olmayan: {len(kalan)}")

guncellenen = 0
atlanan = 0

for l in kalan:
    form = l.get("form", "").lower().strip()
    if form in ekle_listesi:
        root_id, concept_id, rule = ekle_listesi[form]
        l["rootIds"] = [root_id]
        l["wordFamilyId"] = f"WF-{root_id}"
        l["conceptId"] = concept_id
        l["derivation"] = {
            "rootIds": [root_id],
            "morphemeIds": [],
            "rule": rule
        }
        guncellenen += 1
    else:
        atlanan += 1

print(f"Guncellenen: {guncellenen}")
print(f"Atlanan: {atlanan}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
