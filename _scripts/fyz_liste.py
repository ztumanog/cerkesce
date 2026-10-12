import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

fyz = [l for l in lex if l.get("form", "").startswith("фыз")]
fyz.sort(key=lambda x: x.get("form", ""))

print(f"фыз- TOPLAM: {len(fyz)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in fyz).most_common(10):
    print(f"  {k:<25} {v}")
print()

# Konsola da yaz
for l in fyz[:30]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/FYZ_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"фыз- KÖKÜ SINIFLANDIRMA — {len(fyz)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** WOMAN, WIFE, FEMALE, MOTHER, GIRL...\n")
    f.write("- **AİLE:** İnsan & Cinsiyet, Aile & Akrabalık, Toplum & Rol...\n")
    f.write("- **ROOT:** фыз-\n\n")
    f.write("## ÖRNEK\n")
    f.write('фыз,"kadın",WOMAN,WOMAN_ADULT,İnsan & Cinsiyet,фыз-\n')
    f.write('фызыжь,"yaşlı kadın",WOMAN,OLD_WOMAN,İnsan & Yaşam,фыз-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(fyz)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in fyz:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,фыз-\n')

print(f"\n✅ _scripts/FYZ_MIMARA.txt ({len(fyz)} kayıt)")
