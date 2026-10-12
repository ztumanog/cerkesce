import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Grup bazlı yeni kök atamaları
GRUP_ATAMA = {
    # Grup 2: Anatomi/Yüzey/Merkez
    "Ӏэгу": "R-GU-SURFACE", "лъэгу": "R-GU-SURFACE", "нэгу": "R-GU-SURFACE",
    "бзэгу": "R-GU-SURFACE", "щхьэгу": "R-GU-SURFACE", "щӀыгу": "R-GU-SURFACE",
    "уафэгу": "R-GU-SURFACE", "хытӀыгу": "R-GU-SURFACE", "жьэгу": "R-GU-SURFACE",
    "унэгу": "R-GU-SURFACE", "уанэгу": "R-GU-SURFACE", "анэгу": "R-GU-SURFACE",
    "гущӀыӀум": "R-GU-SURFACE", "гузэгу": "R-GU-SURFACE", "гузэгум": "R-GU-SURFACE",

    # Grup 3: Araba/Taşıt
    "мафӀэгу": "R-GU-CART", "гъущӀгъуэгу": "R-GU-CART", "шыгу": "R-GU-CART",
    "шыгъуэгу": "R-GU-CART", "шызакъуэгу": "R-GU-CART", "гурыгъ": "R-GU-CART",
    "гулъэмыж": "R-GU-CART",

    # Grup 4: Söz/Konuşma
    "гущыӀэ": "R-GUSCH", "гушыӀэ": "R-GUSCH", "гущыӀ": "R-GUSCH",
    "гущыӀэр": "R-GUSCH", "гущыӀэм": "R-GUSCH", "гущыӀэн": "R-GUSCH",
    "гущыӀэхэр": "R-GUSCH", "гущыӀэхэм": "R-GUSCH",
    "гущыӀэухыгъэ": "R-GUSCH", "гущӀэ": "R-GUSCH",
    "гущыкӀ": "R-GUSCH", "гущыкӀыгъуэ": "R-GUSCH",

    # Grup 5: Buğday/Tarım
    "гуэдз": "R-GUADZ", "гуадзэ": "R-GUADZ", "гуэдзэн": "R-GUADZ",
    "гуэдзыр": "R-GUADZ", "нэшэбэгу": "R-GUADZ",

    # Grup 6: Bağımsız kökler
    "гуп": "R-GUP", "гупышхуэ": "R-GUP", "гупым": "R-GUP", "гупыр": "R-GUP",
    "гуэр": "R-GUER", "гуэрхэр": "R-GUER", "гуэрым": "R-GUER",
    "гуэрхэм": "R-GUER", "гуэри": "R-GUER", "гуэркӀэ": "R-GUER",
    "гуэныхь": "R-GUNAH", "гуэныхьлы": "R-GUNAH", "гунахь": "R-GUNAH",
    "гуэныхьхэр": "R-GUNAH", "гуэныхьым": "R-GUNAH",
    "гуащэ": "R-GUASCHA", "гуащэм": "R-GUASCHA", "гуащэр": "R-GUASCHA",
    "гуащӀэ": "R-GUASCH", "гуащӀэм": "R-GUASCH", "гуащӀэр": "R-GUASCH",
    "губгъэ": "R-GUBGH", "губгъо": "R-GUBGH", "губгъуэ": "R-GUBGH",
    "губгъом": "R-GUBGH", "гуэл": "R-GUEL", "гуэлым": "R-GUEL",
    "гуэщ": "R-GUESCH", "гуэщым": "R-GUESCH",
    "гус": "R-GUS", "дэгу": "R-DEGU", "гуу": "R-GUU",
    "гува": "R-GUVA", "гувэн": "R-GUVA", "гуоун": "R-GUOUN",
    "гурымыкъ": "R-GURYMYK", "гузэрыдзэ": "R-GUZERYDZ",
    "гуэгуш": "R-GUEGUSCH",
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in GRUP_ATAMA:
        yeni_kok = GRUP_ATAMA[form]
        root_ids = l.get("rootIds", [])
        # R-GU'yu çıkar, yeni kökü ekle
        if "R-GU" in root_ids:
            root_ids.remove("R-GU")
        if yeni_kok not in root_ids:
            root_ids.append(yeni_kok)
        l["rootIds"] = root_ids
        guncellenen += 1

print(f"Yeni kök atanan: {guncellenen}")

# Kontrol
yeni_kokler = {}
for l in lex:
    for rid in (l.get("rootIds") or []):
        if rid.startswith("R-GU"):
            yeni_kokler[rid] = yeni_kokler.get(rid, 0) + 1

print("\n=== Yeni R-GU* kökleri ===")
for rid, sayi in sorted(yeni_kokler.items()):
    print(f"  {rid:20s} {sayi}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("\nOK Kaydedildi")
