import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# R-ADA için sadece gerçek baba kelimeleri
REAL_ADA = {
    "адэ", "дадэ", "адэжь", "адэшхуэ", "адэ-анэ",
    "адэ къуэш", "адэшыпхъу", "адэнапӀас", "тхьэмадэ",
    "щыкъу адэ", "пщыдадэ", "дадэшхуэ"
}
# Bunlarla başlayanlar da olabilir
REAL_ADA_PREFIX = ["адэ", "дадэ", "тхьэмадэ"]

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids or "R-ADA" not in root_ids:
        continue

    # Gerçek baba kelimesi mi?
    gercek = form in REAL_ADA or any(form.startswith(p) for p in REAL_ADA_PREFIX)
    if not gercek:
        root_ids.remove("R-ADA")
        guncellenen += 1
        l["rootIds"] = root_ids

print(f"R-ADA çıkarılan: {guncellenen}")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
