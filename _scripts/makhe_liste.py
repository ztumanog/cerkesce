import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

makhe = [l for l in lex if l.get("form", "").startswith("махуэ")]
makhe.sort(key=lambda x: x.get("form", ""))

print(f"махуэ- TOPLAM: {len(makhe)}")
print()

for l in makhe:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/MAKHUE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"махуэ- KÖKÜ SINIFLANDIRMA — {len(makhe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## ÖRNEK\n")
    f.write('махуэ,"gün",DAY,DAY_TIME,Zaman & Takvim,махуэ-\n')
    f.write('махуэшхуэ,"bayram günü",HOLIDAY,HOLIDAY_DAY,Zaman & Kültür,махуэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(makhe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in makhe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,махуэ-\n')

print(f"\n✅ _scripts/MAKHUE_MIMARA.txt")
