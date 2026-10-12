import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

khabze = [l for l in lex if l.get("form", "").startswith("хабзэ")]
khabze.sort(key=lambda x: x.get("form", ""))

print(f"хабзэ- TOPLAM: {len(khabze)}")
print()

for l in khabze:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/KHABZE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"хабзэ- KÖKÜ SINIFLANDIRMA — {len(khabze)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## ÖRNEK\n")
    f.write('хабзэ,"gelenek, örf",CULTURE,CUSTOM_TRADITION,Toplum & Kültür,хабзэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(khabze)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in khabze:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,хабзэ-\n')

print(f"\n✅ _scripts/KHABZE_MIMARA.txt")
