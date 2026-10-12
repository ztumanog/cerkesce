import json
from pathlib import Path
import sys
sys.stdout.reconfigure(encoding="utf-8")

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Aynı form, farklı id olan lexeme'leri bul
from collections import defaultdict
by_form = defaultdict(list)
for l in lex:
    by_form[l["form"]].append(l)

print("=== HOMONİMLER ===")
for form, items in by_form.items():
    if len(items) > 1:
        print(f"\n{form}: {len(items)} lexeme")
        for i in items:
            print(f"  {i['id']} - {i.get('literalMeaning','?')}")
