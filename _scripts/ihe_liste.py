import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04e0')
    return text.strip()

# Palochka normalizasyonu ile ara
ihe = [l for l in lex if normalize(l.get("form", "")).startswith("Ӏэ")]
ihe.sort(key=lambda x: x.get("form", ""))

print(f"Ӏэ- TOPLAM: {len(ihe)}")
print()

for l in ihe[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/IHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"Ӏэ- KÖKÜ SINIFLANDIRMA — {len(ihe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## ÖRNEK\n")
    f.write('Ӏэ,"el",HAND,HAND_BODY,İnsan & Beden,Ӏэ-\n')
    f.write('Ӏэпэ,"parmak",FINGER,FINGER_BODY,İnsan & Beden,Ӏэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(ihe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in ihe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,Ӏэ-\n')

print(f"\n✅ _scripts/IHE_MIMARA.txt")
