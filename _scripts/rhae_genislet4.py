import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Genişletilmiş beyaz liste
EXACT_HAE_WORDS = {
    "хьэ", "хьэпшыр", "хьэбзы", "хьэш",
    "хьэпӀащэ", "хьэпӀащэжь", "хьэгъуэлъыжь",
    "хьэпӀащӀэ", "хьэпщӀащэ",
    "ныбгъуэхьэш", "хьэбз", "хьэбзэ",
    "хьэщ", "хьэжь", "хьэхъу", "хьэшорэ",
    "хьэбзыпэ", "мэлыхъуэхьэ", "хьэхэм",
    "хьэкӀэ", "хьэпӀацӀэ",
    "хьэзешэ",
    "хьэр", "хьэхэр", "хьэлокӏуэ"
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids and form not in EXACT_HAE_WORDS:
        continue

    if form in EXACT_HAE_WORDS and "R-HAE" not in root_ids:
        root_ids.append("R-HAE")
        l["rootIds"] = root_ids
        if not l.get("wordFamilyId"):
            l["wordFamilyId"] = "WF-HAE"
        guncellenen += 1

print(f"Yeni R-HAE eklenen: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
