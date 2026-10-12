import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Hala EMOTION genel olanlar
kalan = [l for l in lex if l.get("conceptId") == "EMOTION"]
print(f"EMOTION genel kalan: {len(kalan)}")
for l in kalan:
    print(f"  {l.get('form'):25s} | {l.get('literalMeaning', '?')[:50]}")
