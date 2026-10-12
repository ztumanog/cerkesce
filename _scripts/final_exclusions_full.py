import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0

# Mimarın son önerisi: FINAL_ROOT_EXCLUSIONS
FINAL_EXCLUSIONS = {
    "R-SHA": ["шэнджэс", "шэрджэс", "шэмбэт", "шэч", "шэчншэу", "шэчын", "шэтыр"],
    "R-CHA": ["чэрэз", "чэтэн", "чэф", "чэфынчъэ", "чэфу", "чэнджэщ", "чэнджэщэгъу"],
    "R-YN": ["инжир", "инджыл", "инженер"],
    "R-TSY": ["цыхьэ", "цыхьэшӀэгъу"],
    "R-FO": ["fond", "фолькенинг"],
    "R-ANA": ["етӀуанэ", "ещӀанэ", "еплӀанэ", "етхуанэ", "итӀанэ", "бланэ", "плӀанэ", "плӀанэпэ"],
    "R-DZA": ["зэпэдзэн", "падзэжэн", "зыхэдзэн", "тедзэн", "дзэн"],
    "R-FA": ["фэдэ", "фэдиз", "фэд", "фэгъэхьыгъэу", "фэхъун"],
    "R-WA": ["кӀуэн", "кӀуэ", "кӀуэр", "мэракӀуэ"],
    "R-WAFA": ["фошыгъуафэ"],
    "R-WASHKH": ["махуэшхуэ", "зауэшхуэ", "къуэшхэм"],
    "R-MYL": ["ямылей", "нэрымылъагъу"],
    "R-LHA": ["плъэн", "лъэгъун", "елъэтахэн", "илъэс", "хьэзырылъэ", "дзажэналъэ", "лъэтэн", "пэплъэн", "теплъэ", "плъыжь", "гъуаплъэ"],
    "R-QA": ["къалэ", "къалэм", "къалэн", "шъыпкъагъэ", "щыпкъагъэ", "къалмыкъ", "къарал"],
    "R-QWA": ["закъуэ", "щэныкъуэ", "къуэлэн"],
    "R-BZA": ["хабзэ", "къабзэ", "къабзэу"],
    "R-ZHY": ["дыжьын", "жьынду", "лэжьыгъэ", "лэжьэн"],
}

for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids:
        continue

    for rid, kelimeler in FINAL_EXCLUSIONS.items():
        if rid in root_ids and form in kelimeler:
            root_ids.remove(rid)
            guncellenen += 1

print(f"FINAL_EXCLUSIONS ile güncellenen: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
