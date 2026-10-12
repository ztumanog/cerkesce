import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-food-temizle3-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Gercek FOOD/EAT/MEAT/TASTE/BITE
GERCEK = [
    "шхын", "шхэн", "шхэ", "шхащ", "шхэрэ", "шхэну", "шхэкъэ",
    "шхалъэ", "лы", "лыгъэва", "мэлыл", "джэдыл",
    "хьэнтхъупс", "хьэлу", "хьэлыгъуанэ", "хьэлыгъу",
    "хэгъон", "еплъын", "ӏулъхьэ", "щӀэшхыкӀын",
    "щхьэхуэрышхэн", "мэлжьагъэ", "ӏубыгъуэ",
]

# Yanlis kategoriler
YANLIS_KATEGORILER = [
    "DEATH", "HEAT", "SUFFER_DEFEAT", "GREAT_PRAISE",
    "GREAT_LEADER", "GREAT_RESPECT", "SEAT_NEAR", "RETREAT",
    "BLOOD_AND_SWEAT", "SEAT_IN_FRONT", "CHICKEN_EATER",
]

temizlenen = 0
for l in lex:
    cid = l.get("conceptId") or ""
    form = l.get("form", "")

    # Food ile ilgili TUM kategoriler
    food_mi = any(k in cid for k in ["FOOD", "EAT", "MEAT", "TASTE", "BITE"])
    yanlis_mi = cid in YANLIS_KATEGORILER

    if food_mi and form not in GERCEK:
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + " [FOOD yanlis etiket temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {form} ({cid})")
    elif yanlis_mi:
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + f" [{cid} yanlis etiket temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {form} ({cid})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

# Kontrol
food_all = [l for l in lex if any(k in (l.get("conceptId") or "") for k in ["FOOD", "EAT", "MEAT", "TASTE", "BITE"])]
print(f"\nKalan FOOD ilgili: {len(food_all)}")
for l in food_all:
    print(f"  {l.get('form'):20s} | {l.get('conceptId'):20s} | {l.get('literalMeaning', '?')[:40]}")
