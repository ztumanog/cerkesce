import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Genişletilmiş R-HAE beyaz liste
EXACT_HAE_WORDS = {
    "хьэ", "хьэпшыр", "хьэбзы", "хьэш",
    "хьэпӀащэ", "хьэпӀащэжь", "хьэгъуэлъыжь",
    "хьэпӀащӀэ", "хьэпщӀащэ",
    "ныбгъуэхьэш", "хьэбз", "хьэбзэ"
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids:
        continue

    # Eğer form beyaz listedeyse R-HAE'yi ekle (yoksa)
    if form in EXACT_HAE_WORDS:
        if "R-HAE" not in root_ids:
            root_ids.append("R-HAE")
            l["rootIds"] = root_ids
            if "wordFamilyId" not in l or not l["wordFamilyId"]:
                l["wordFamilyId"] = "WF-HAE"
            guncellenen += 1

print(f"Yeni R-HAE eklenen: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
