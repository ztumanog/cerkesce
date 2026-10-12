import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

lhe = [l for l in lex if normalize(l.get("form", "")).startswith("лъ") and not normalize(l.get("form", "")).startswith("лъэ")]
lhe.sort(key=lambda x: x.get("form", ""))

print(f"лъ- (лъэ hariç) TOPLAM: {len(lhe)}")
print()

for l in lhe[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/LHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"лъ- KÖKÜ SINIFLANDIRMA — {len(lhe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in lhe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,лъ-\n')

print(f"\n✅ _scripts/LHE_MIMARA.txt")
