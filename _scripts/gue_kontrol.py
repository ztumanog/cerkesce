import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

gue = [l for l in lex if normalize(l.get("form", "")).startswith("гуэ")]
gue.sort(key=lambda x: x.get("form", ""))

print(f"гуэ- TOPLAM: {len(gue)}")
print()
print(f"{'FORM':<20} | {'CONCEPT':<20} | {'SUB':<20} | AİLE")
print("-" * 100)

for l in gue:
    form = l.get("form", "?")
    concept = l.get("conceptId") or "-"
    sub = l.get("subConceptId") or "-"
    aile = l.get("taxonomyFamily") or "-"
    print(f"{form:<20} | {concept:<20} | {sub:<20} | {aile}")
