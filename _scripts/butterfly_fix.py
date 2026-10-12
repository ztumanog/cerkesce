import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-butterfly-fix-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# хьэндырабгъуэ'yi tekrar BUTTERFLY yap
for l in lex:
    if l.get("form") == "хьэндырабгъуэ":
        l["conceptId"] = "BUTTERFLY"
        l["subConceptId"] = "INSECT"
        l["taxonomyFamily"] = "Doğa & Hayvan"
        print(f"  OK: хьэндырабгъуэ -> BUTTERFLY")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK")
