import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

nyse = [l for l in lex if l.get("form", "").startswith("нысэ")]
nyse.sort(key=lambda x: x.get("form", ""))

print(f"нысэ- TOPLAM: {len(nyse)}")
print()

for l in nyse:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/NYSE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"нысэ- KÖKÜ SINIFLANDIRMA — {len(nyse)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## ÖRNEK\n")
    f.write('нысэ,"gelin",BRIDE,BRIDE_DAUGHTER_IN_LAW,Aile & Akrabalık,нысэ-\n')
    f.write('нысэгъу,"elti",SISTER_IN_LAW,SISTER_IN_LAW_FEMALE,Aile & Akrabalık,нысэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(nyse)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in nyse:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,нысэ-\n')

print(f"\n✅ _scripts/NYSE_MIMARA.txt")
