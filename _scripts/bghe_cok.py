import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-bghe-cok-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# бгъэ'yi cok anlamli yap
for l in lex:
    if l.get("form") == "бгъэ":
        l["conceptId"] = "EAGLE"  # ana anlam
        l["conceptIds"] = ["EAGLE", "CHEST"]  # tum anlamlar
        l["subConceptId"] = "BIRD"
        l["taxonomyFamily"] = "Doğa & Hayvan"
        l["notes"] = "[Çok anlamlı: 1. kartal 2. göğüs, döş]"
        print(f"  OK: бгъэ -> EAGLE + CHEST (çok anlamlı)")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK")
