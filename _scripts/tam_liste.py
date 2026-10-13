import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

print(f"Toplam rootIds'siz: {len(kalan)}")
print(f"\n=== TAM LISTE (ilk 200) ===\n")

for i, l in enumerate(kalan[:200]):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    meaning = (l.get("literalMeaning") or "")[:40]
    print(f"{i+1:4d}. {form:25s} | {pos:12s} | {meaning}")
