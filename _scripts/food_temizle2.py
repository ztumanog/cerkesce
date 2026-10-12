import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-food-temizle2-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Gercek FOOD/EAT/MEAT/Taste/BITE
GERCEK = [
    "шхын", "шхэн", "шхэ", "шхащ", "шхэрэ", "шхэну", "шхэкъэ",
    "шхалъэ", "лы", "лыгъэва", "мэлыл", "джэдыл",
    "хьэнтхъупс", "хьэлу", "хьэлыгъуанэ", "хьэлыгъу",
    "хэгъон", "еплъын", "ӏулъхьэ", "щӀэшхыкӀын",
    "щхьэхуэрышхэн", "мэлжьагъэ",
]

temizlenen = 0
for l in lex:
    cid = l.get("conceptId", "")
    form = l.get("form", "")
    # FOOD ile ilgili kategoriler
    if cid in ("FOOD", "EAT", "EAT_FOOD", "EAT_UNDER", "EAT_ALONE",
               "MEAT", "BOILED_MEAT", "MUTTON", "CHICKEN_MEAT",
               "TASTE", "BITE_FOOD", "FOOD_CONTAINER"):
        if form not in GERCEK:
            # Yanlis → temizle
            l["conceptId"] = ""
            l["subConceptId"] = ""
            l["taxonomyFamily"] = ""
            l["notes"] = (l.get("notes", "") + " [FOOD yanlis etiket temizlendi]").strip()
            temizlenen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Temizlenen: {temizlenen}")

# Kontrol
food_all = [l for l in lex if "FOOD" in (l.get("conceptId") or "") or
            "EAT" in (l.get("conceptId") or "") or
            "MEAT" in (l.get("conceptId") or "") or
            "TASTE" in (l.get("conceptId") or "") or
            "BITE" in (l.get("conceptId") or "")]
print(f"\nKalan FOOD ilgili: {len(food_all)}")
for l in food_all:
    print(f"  {l.get('form'):20s} | {l.get('conceptId'):20s} | {l.get('literalMeaning', '?')[:40]}")
