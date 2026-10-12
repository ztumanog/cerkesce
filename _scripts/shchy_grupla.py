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

GRUP = 100
out = Path("_scripts/shchy_gruplar")
out.mkdir(exist_ok=True)

gruplar = [belirsiz[i:i+GRUP] for i in range(0, len(belirsiz), GRUP)]

for i, grup in enumerate(gruplar, 1):
    dosya = out / f"shchy-{i:02d}.txt"
    with open(dosya, "w", encoding="utf-8") as f:
        f.write(f"щы- Grup {i}/{len(gruplar)} — {len(grup)} kayıt\n")
        f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
        for form, anlam in grup:
            temiz = anlam.replace(",", " ").replace('"', "'")[:50]
            f.write(f'{form},"{temiz}",?,?,?,щы-\n')

print(f"Grup sayisi: {len(gruplar)}")
for i, g in enumerate(gruplar, 1):
    print(f"  shchy-{i:02d}.txt: {len(g)}")
