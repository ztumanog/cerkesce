import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

pkhu = [l for l in lex if l.get("form", "").startswith("пхъу")]
pkhu.sort(key=lambda x: x.get("form", ""))

print(f"пхъу- TOPLAM: {len(pkhu)}")
print()

for l in pkhu:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/PKHU_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"пхъу- KÖKÜ SINIFLANDIRMA — {len(pkhu)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** DAUGHTER, GIRL, SISTER, FEMALE...\n")
    f.write("- **AİLE:** Aile & Akrabalık, İnsan & Cinsiyet...\n")
    f.write("- **ROOT:** пхъу-\n\n")
    f.write("## ÖRNEK\n")
    f.write('пхъу,"kız evlat",DAUGHTER,DAUGHTER_CHILD,Aile & Akrabalık,пхъу-\n')
    f.write('шыпхъу,"kız kardeş",SISTER,SISTER_FEMALE,Aile & Akrabalık,пхъу-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(pkhu)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in pkhu:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,пхъу-\n')

print(f"\n✅ _scripts/PKHU_MIMARA.txt")
