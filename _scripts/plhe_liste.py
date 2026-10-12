import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# плъэ- ile başlayan
plhe = [l for l in lex if l.get("form", "").startswith("плъэ")]
plhe.sort(key=lambda x: x.get("form", ""))

print(f"плъэ- TOPLAM: {len(plhe)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in plhe).most_common(10):
    print(f"  {k:<25} {v}")
print()

# Mimara gönderilecek
with open("_scripts/PLHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"плъэ- KÖKÜ SINIFLANDIRMA — {len(plhe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("Her satır için: FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** İngilizce büyük harf (LOOK, SEE, WATCH, RED...)\n")
    f.write("- **SUB:** Spesifik alt kategori\n")
    f.write("- **AİLE:** Anlamsal grup (Göz & Görme, Renk & Nitelik...)\n")
    f.write("- **ROOT:** плъэ-\n\n")
    f.write("## ÖRNEK\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    f.write('плъэн,"bakmak",LOOK,LOOK_ACTION,Göz & Görme,плъэ-\n')
    f.write('плъыжь,"kırmızı",RED,COLOR_RED,Renk & Nitelik,плъэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(plhe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in plhe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,плъэ-\n')

print(f"OK - _scripts/PLHE_MIMARA.txt")
