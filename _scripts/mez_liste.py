import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

mez = [l for l in lex if l.get("form", "").startswith("мэз")]
mez.sort(key=lambda x: x.get("form", ""))

print(f"мэз- TOPLAM: {len(mez)}")
print()

for l in mez:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/MEZ_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"мэз- KÖKÜ SINIFLANDIRMA — {len(mez)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## ÖRNEK\n")
    f.write('мэз,"orman",FOREST,FOREST_NATURE,Doğa & Coğrafya,мэз-\n')
    f.write('мэзым,"ormanda, ormana",GRAMMAR,FOREST_OBLIQUE,Dil & Gramer,мэз-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(mez)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in mez:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,мэз-\n')

print(f"\n✅ _scripts/MEZ_MIMARA.txt")
