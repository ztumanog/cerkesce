import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=== TAM HTML ÖRNEKLERİ (kısaltmasız) ===\n")
for l in lex[:5]:
    if l["id"].startswith("L-CORPUS"):
        lm = l.get("literalMeaning", "")
        print(f"ID: {l['id']}")
        print(f"Form: {l.get('form', '?')}")
        print(f"literalMeaning tam ({len(lm)} karakter):")
        print(lm)
        print("=" * 100)
