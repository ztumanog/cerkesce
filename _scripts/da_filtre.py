import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

REAL_DA = {"адэ", "да", "адэжь", "дадэ", "адэшхуэ", "сиадэ", "сидадэ", "тэтэ", "тэтэжь"}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids or "R-DA" not in root_ids:
        continue
    if form not in REAL_DA:
        root_ids.remove("R-DA")
        guncellenen += 1
        l["rootIds"] = root_ids

print(f"R-DA çıkarılan: {guncellenen}")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
