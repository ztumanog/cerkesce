import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# --- YANLIŞ POZİTİF FİLTRELERİ ---

# 1. Belirli kelimeler için kök çıkarma kuralları
KELIME_FILTRE = {
    "пэплъэн": ["R-LHA"],          # пэ + плъэн
    "лэжьыгъэ": ["R-ZHY"],         # лэжьэн'den
    "къалмыкъ": ["R-QA"],          # alıntı
    "къарал": ["R-QA"],            # alıntı
    "лъэбакъуэ": ["R-QWA"],        # бакъуэ (adım)
    "лъакъуэ": ["R-QWA"],          # бакъуэ (bacak)
    "плӀанэпэ": ["R-ANA"],         # плӀы + анэ
    "журтхэм": ["R-TKHE"],         # журт + -хэм
    "джуртхэр": ["R-TKHE"],        # журт + -хэр
    "дэтхэнэ": ["R-TKHE"],         # zamir
    "шэшэн": ["R-SHA"],            # Çeçen
    "шэнт": ["R-SHA"],             # sandalye
    "мылъку": ["R-MYL"],           # alıntı
    "емылъытауэ": ["R-MYL"],       # fiil formu
    "къамыл": ["R-MYL"],           # kamış
    "гъуэмылэ": ["R-MYL"],         # kumanya
    "инженер": ["R-YN"],           # alıntı
    "институт": ["R-YN"],          # alıntı
    "индыл": ["R-YN"],             # İncil
    "мэлъатэ": ["R-MEL"],          # мэ- + лъэтэн
    "мэлажьэ": ["R-MEL"],          # мэ- + лэжьэн
    "нэмэз": ["R-MEZ"],            # namaz
    "къуажэм": ["R-ZHAM"],         # къуажэ + -м
    "сымаджэм": ["R-ZHAM"],        # сымаджэ + -м
    "вынд": ["R-VY"],              # karga
    "бгъущӀ": ["R-GHWSCH"],        # 90
    "хэбжэн": ["R-BZHEN"],         # хэ- + бжэн
    "фӀыцӀэ": ["R-FY"],            # siyah
    "хьэр": ["R-HAE"],             # zaten beyaz listede, R-HAE kalacak
    "хьэхэр": ["R-HAE"],           # aynı
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids:
        continue

    # Belirli kelime filtresi
    if form in KELIME_FILTRE:
        for cikar in KELIME_FILTRE[form]:
            if cikar in root_ids:
                root_ids.remove(cikar)
                guncellenen += 1

    # Ek filtresi: -хэм, -жэм ile biten kelimelerde yanlış kökleri çıkar
    if form.endswith("хэм") and "R-TKHE" in root_ids:
        root_ids.remove("R-TKHE")
        guncellenen += 1
    if form.endswith("жэм") and "R-ZHAM" in root_ids:
        root_ids.remove("R-ZHAM")
        guncellenen += 1

    # Alıntı filtresi: bilinen alıntı kelimelerde kökleri çıkar
    ALINTI = ["инженер", "институт", "индыл", "нэмэз", "мылъку", "къамыл", "къалмыкъ", "къарал"]
    if form in ALINTI:
        # Tüm kökleri çıkar (alıntıların Çerkesçe kökü yok)
        l["rootIds"] = []
        guncellenen += 1

    l["rootIds"] = root_ids

print(f"Güncellenen kelime: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
