import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# R-ADA'dan çıkarılacak kelimeler
CIKAR = {"дэшхуэ", "адэт"}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if form in CIKAR and "R-ADA" in root_ids:
        root_ids.remove("R-ADA")
        guncellenen += 1
        l["rootIds"] = root_ids

print(f"R-ADA çıkarılan: {guncellenen}")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
