import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-animal-spesifik-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

DUZELT = {
    "дыгъужь": "WOLF",
    "вы": "OX",
    "кхъуэ": "PIG",
    "блэ": "SNAKE",
    "бабыщ": "DUCK",
    "джэд": "CHICKEN",
    "къаргъэ": "HAWK",
    "жэм": "COW",
    "мэл": "SHEEP",
    "мыщэ": "BEAR",
    "бжьэ": "BEE",
    "кхъуэбан": "WILD_BOAR",
    "бадз": "FLY",
    "шы": "HORSE",
    "бжэн": "GOAT",
    "джэду": "CAT",
    "бзуущӀэ": "BABY_BIRD",
    "аргъуей": "MOSQUITO",
    "къандж": "MAGPIE",
    "хьэ": "DOG",
    "бдзэжьей": "FISH",
    "былым": "CATTLE",
    "бзыу": "BIRD",
    "дзыгъуэ": "MOUSE",
    "бажэ": "FOX",
    "гуащэнэ": "RIVER_FISH",
    "адакъэ": "ROOSTER",
    "щыхь": "DEER",
    "къаз": "GOOSE",
    "къуалэбзу": "BIRD_TYPE",
    "ажэ": "BILLY_GOAT",
    "псэушъхьэ": "LIVING_BEING",
}

sayac = 0
for l in lex:
    form = l.get("form", "")
    if form in DUZELT and l.get("conceptId") == "ANIMAL":
        l["conceptId"] = DUZELT[form]
        sayac += 1
        print(f"  OK: {form} -> {DUZELT[form]}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {sayac} kayit guncellendi")

# Kontrol
from collections import Counter
animal = [l for l in lex if "ANIMAL" in (l.get("conceptId") or "") or
          l.get("taxonomyFamily") == "Doğa & Hayvan"]
print(f"\nKalan ANIMAL ilgili: {len(animal)}")
cid = Counter(l.get("conceptId") for l in animal)
for c, s in cid.most_common(30):
    print(f"  {c}: {s}")
