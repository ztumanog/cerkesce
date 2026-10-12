import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0

# 1. R-ADA için 'дэ-' preverb engeli
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids or "R-ADA" not in root_ids:
        continue

    # дэ- ile başlayan ve gerçek baba kelimesi olmayan
    if form.startswith("дэ") and form not in ["дадэ", "адэ", "адэжь", "тэтэ", "тэтэжь"]:
        root_ids.remove("R-ADA")
        guncellenen += 1
        l["rootIds"] = root_ids

# 2. R-NA için 'нэхъ' / 'нахь' (daha) edatı engeli
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids or "R-NA" not in root_ids:
        continue

    # нэхъ / нахь ile başlayan karşılaştırma kelimeleri
    if form.startswith("нэхъ") or form.startswith("нахь"):
        root_ids.remove("R-NA")
        guncellenen += 1
        l["rootIds"] = root_ids

print(f"Güncellenen kelime: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
