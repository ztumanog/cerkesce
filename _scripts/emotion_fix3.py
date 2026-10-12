import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-emotion-fix3-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# --- Duzeltme 1: гушӀэгъу mukerrer ---
gushIegu_gorulen = False
silinecek = []

for i, l in enumerate(lex):
    if l.get("form") == "гущӀэгъу" and l.get("conceptId") == "COMPASSION":
        if gushIegu_gorulen:
            silinecek.append(i)
        else:
            l["literalMeaning"] = "merhamet, şefkat, acıma"
            gushIegu_gorulen = True

# --- Duzeltme 2: гухэлъ cok anlamli ---
for l in lex:
    if l.get("form") == "гухэлъ" and l.get("conceptId") == "HOPE":
        l["conceptIds"] = ["HOPE", "THOUGHT", "PLAN"]
        l["literalMeaning"] = "niyet, fikir, plan"
        l["notes"] = "[Çok anlamlı: 1. niyet 2. fikir 3. plan]"

# --- Duzeltme 3: пагагъ varyant ---
for l in lex:
    if l.get("form") == "пагагъ" and l.get("conceptId") == "PRIDE":
        l["seeAlso"] = "пагагъэ"
        l["isVariant"] = True
        l["literalMeaning"] = "gurur (kısa varyant)"

# --- Sil ---
for i in sorted(silinecek, reverse=True):
    print(f"  Silindi: {lex[i].get('form')}")
    del lex[i]

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - 3 duzeltme, {len(silinecek)} silme")
