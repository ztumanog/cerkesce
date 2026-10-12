import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

ade = [l for l in lex if l.get("form", "").startswith("адэ")]
ade.sort(key=lambda x: x.get("form", ""))

print(f"адэ- TOPLAM: {len(ade)}")
print()

for l in ade:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/ADE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"адэ- KÖKÜ SINIFLANDIRMA — {len(ade)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** FATHER, PARENT, ANCESTOR, GRANDFATHER...\n")
    f.write("- **AİLE:** Aile & Akrabalık, İnsan & Cinsiyet...\n")
    f.write("- **ROOT:** адэ-\n\n")
    f.write("## ÖRNEK\n")
    f.write('адэ,"baba",FATHER,FATHER_PARENT,Aile & Akrabalık,адэ-\n')
    f.write('адэшхуэ,"dede, büyükbaba",GRANDFATHER,GRANDFATHER_PATERNAL,Aile & Akrabalık,адэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(ade)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in ade:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,адэ-\n')

print(f"\n✅ _scripts/ADE_MIMARA.txt")
