import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

pe = [l for l in lex if l.get("form", "").startswith("пэ")]
pe.sort(key=lambda x: x.get("form", ""))

print(f"пэ- TOPLAM: {len(pe)}")
print()

for l in pe[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/PE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"пэ- KÖKÜ SINIFLANDIRMA — {len(pe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** NOSE, FRONT, TIP, BEGINNING, EDGE...\n")
    f.write("- **AİLE:** İnsan & Beden, Mekan & Yön, Nesne & Uç...\n")
    f.write("- **ROOT:** пэ-\n\n")
    f.write("## ÖRNEK\n")
    f.write('пэ,"burun",NOSE,NOSE_BODY,İnsan & Beden,пэ-\n')
    f.write('пэ,"ön, ön taraf",FRONT,FRONT_SIDE,Mekan & Yön,пэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(pe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in pe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,пэ-\n')

print(f"\n✅ _scripts/PE_MIMARA.txt")
