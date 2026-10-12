import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

mel = [l for l in lex if l.get("form", "").startswith("мэл")]
mel.sort(key=lambda x: x.get("form", ""))

print(f"мэл- TOPLAM: {len(mel)}")
print()

for l in mel:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/MEL_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"мэл- KÖKÜ SINIFLANDIRMA — {len(mel)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## ÖRNEK\n")
    f.write('мэл,"koyun",SHEEP,SHEEP_ANIMAL,Hayvanlar & Doğa,мэл-\n')
    f.write('мэлыжь,"koç",RAM,RAM_MALE,Hayvanlar & Doğa,мэл-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(mel)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in mel:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,мэл-\n')

print(f"\n✅ _scripts/MEL_MIMARA.txt")
