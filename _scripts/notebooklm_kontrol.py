import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hedef = ["ийщӀ", "жъгъей", "иутын", "пштэмэ", "зандэу", "тохуэ"]

for form in hedef:
    found = False
    for l in lex:
        if l.get("form", "").lower() == form:
            print(f"{form}:")
            print(f"  rootIds: {l.get('rootIds')}")
            print(f"  wordFamilyId: {l.get('wordFamilyId')}")
            print(f"  conceptId: {l.get('conceptId')}")
            found = True
            break
    if not found:
        print(f"{form}: BULUNAMADI")
    print()
