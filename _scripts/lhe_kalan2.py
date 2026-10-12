import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

belirsiz = []
for l in lex:
    form = l.get("form", "")
    if normalize(form).startswith("лъ") and not normalize(form).startswith("лъэ"):
        concept = l.get("conceptId") or ""
        if concept in ("BELIRSIZ", ""):
            belirsiz.append((form, l.get("literalMeaning") or "?"))

belirsiz.sort(key=lambda x: x[0])

print(f"лъ- BELİRSİZ: {len(belirsiz)}")
print()
for form, anlam in belirsiz:
    print(f"  {form:<25} | {anlam[:50]}")

with open("_scripts/LHE_KALAN2.txt", "w", encoding="utf-8") as f:
    f.write(f"лъ- KALAN — 5. TUR — {len(belirsiz)} kayıt\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form, anlam in belirsiz:
        temiz = anlam.replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{temiz}",?,?,?,лъ-\n')

print(f"\n✅ _scripts/LHE_KALAN2.txt")
