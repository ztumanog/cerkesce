import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0

# Mimarın son önerisi: ROOT_EXCLUSIONS
ROOT_EXCLUSIONS = {
    "R-LHA": ["плъэн", "лъэгъун", "елъэтахэн", "илъэс", "хьэзырылъэ", "дзажэналъэ"],
    "R-QA": ["къалэ", "къалэм", "къалэн", "шъыпкъагъэ", "щыпкъагъэ"],
    "R-QWA": ["закъуэ", "щэныкъуэ", "къуэлэн"],
    "R-BZA": ["хабзэ", "къабзэ", "къабзэу"],
    "R-ZHY": ["дыжьын", "жьынду", "лэжьыгъэ", "лэжьэн"]
}

for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids:
        continue

    for rid, kelimeler in ROOT_EXCLUSIONS.items():
        if rid in root_ids and form in kelimeler:
            root_ids.remove(rid)
            guncellenen += 1

print(f"Dışlama ile güncellenen kelime: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
