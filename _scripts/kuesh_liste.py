import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

kuesh = [l for l in lex if l.get("form", "").startswith("къуэш")]
kuesh.sort(key=lambda x: x.get("form", ""))

print(f"къуэш- TOPLAM: {len(kuesh)}")
print()

for l in kuesh:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/KUESH_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"къуэш- KÖKÜ SINIFLANDIRMA — {len(kuesh)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## ÖRNEK\n")
    f.write('къуэш,"erkek kardeş",BROTHER,BROTHER_SIBLING,Aile & Akrabalık,къуэш-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(kuesh)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in kuesh:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,къуэш-\n')

print(f"\n✅ _scripts/KUESH_MIMARA.txt")
