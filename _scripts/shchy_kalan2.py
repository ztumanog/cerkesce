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
    if normalize(form).startswith("щы"):
        concept = l.get("conceptId") or ""
        sub = l.get("subConceptId") or ""
        if concept in ("BELIRSIZ", "", None) or sub in ("", "-", None):
            belirsiz.append((form, l.get("literalMeaning") or "?"))

belirsiz.sort(key=lambda x: x[0])

print(f"щы- BELİRSİZ: {len(belirsiz)}")
print()

with open("_scripts/SHCHY_KALAN.txt", "w", encoding="utf-8") as f:
    f.write(f"щы- KALAN — {len(belirsiz)} kayıt\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form, anlam in belirsiz:
        temiz = anlam.replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{temiz}",?,?,?,щы-\n')

print(f"✅ _scripts/SHCHY_KALAN.txt ({len(belirsiz)} kayıt)")
