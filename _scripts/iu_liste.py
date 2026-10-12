import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

iu = [l for l in lex if normalize(l.get("form", "")).startswith("Ӏу")]
iu.sort(key=lambda x: x.get("form", ""))

print(f"Ӏу- TOPLAM: {len(iu)}")
print()

for l in iu[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/IU_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"Ӏу- KÖKÜ SINIFLANDIRMA — {len(iu)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** MOUTH, FRONT, SIDE, EDGE, LIP...\n")
    f.write("- **AİLE:** İnsan & Beden, Mekan & Yön, Nesne & Uç...\n")
    f.write("- **ROOT:** Ӏу-\n\n")
    f.write("## ÖRNEK\n")
    f.write('Ӏу,"ağız",MOUTH,MOUTH_BODY,İnsan & Beden,Ӏу-\n')
    f.write('Ӏупэ,"dudak",LIP,LIP_BODY,İnsan & Beden,Ӏу-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(iu)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in iu:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,Ӏу-\n')

print(f"\n✅ _scripts/IU_MIMARA.txt")
