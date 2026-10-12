import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# ANIMAL kategorisindeki tüm kelimeleri topla
hayvanlar = []
for l in lex:
    if l.get("conceptId") == "ANIMAL":
        form = l.get("form") or "?"
        pos = l.get("partOfSpeech") or "—"
        meaning = l.get("literalMeaning") or "—"
        hayvanlar.append((form, pos, meaning))

print(f"=== ANIMAL KATEGORİSİ ({len(hayvanlar)} kelime) ===\n")
for i, (form, pos, meaning) in enumerate(hayvanlar, 1):
    print(f"  {i:4d}. {form:20s} [{pos:12s}] → {meaning}")
