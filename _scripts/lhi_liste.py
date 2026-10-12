import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

lhi = [l for l in lex if l.get("form", "").startswith("лӀы") or l.get("form", "").startswith("лIы") or l.get("form", "").startswith("лӏы")]
lhi.sort(key=lambda x: x.get("form", ""))

print(f"лӀы- TOPLAM: {len(lhi)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in lhi).most_common(10):
    print(f"  {k:<25} {v}")
print()

with open("_scripts/LHI_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"лӀы- KÖKÜ SINIFLANDIRMA — {len(lhi)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** MAN, MALE, HUSBAND, PERSON, HERO...\n")
    f.write("- **AİLE:** İnsan & Cinsiyet, Toplum & Rol, Aile & Akrabalık...\n")
    f.write("- **ROOT:** лӀы-\n\n")
    f.write("## ÖRNEK\n")
    f.write('лӀы,"adam, erkek",MAN,MAN_ADULT,İnsan & Cinsiyet,лӀы-\n')
    f.write('лӀыгъуэ,"erkeklik, mertlik",MANHOOD,MANHOOD_QUALITY,İnsan & Nitelik,лӀы-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(lhi)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in lhi:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,лӀы-\n')

print(f"OK - _scripts/LHI_MIMARA.txt")
