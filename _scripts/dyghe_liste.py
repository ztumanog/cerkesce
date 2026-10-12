import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

dyghe = [l for l in lex if l.get("form", "").startswith("дыгъэ")]
dyghe.sort(key=lambda x: x.get("form", ""))

print(f"дыгъэ- TOPLAM: {len(dyghe)}")
print()

with open("_scripts/DYGHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"дыгъэ- KÖKÜ SINIFLANDIRMA — {len(dyghe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** SUN, LIGHT, DAY, HEAT...\n")
    f.write("- **AİLE:** Güneş & Işık, Zaman & Gün...\n")
    f.write("- **ROOT:** дыгъэ-\n\n")
    f.write("## ÖRNEK\n")
    f.write('дыгъэ,"güneş",SUN,SUN_STAR,Güneş & Işık,дыгъэ-\n')
    f.write('дыгъэгъазэ,"gün dönümü",SOLSTICE,SOLSTICE_EVENT,Zaman & Gün,дыгъэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(dyghe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in dyghe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,дыгъэ-\n')

print(f"OK - _scripts/DYGHE_MIMARA.txt")
