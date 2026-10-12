import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
color = [l for l in lex if l.get("conceptId") == "COLOR"]

# Ilk 10 kaydin tum alanlari
for l in color[:10]:
    print(f"\n=== {l.get('form')} ===")
    for k, v in l.items():
        if v:
            s = str(v)[:80]
            print(f"  {k}: {s}")
