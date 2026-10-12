import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

dzhe = [l for l in lex if normalize(l.get("form", "")).startswith("джэ")]
dzhe.sort(key=lambda x: x.get("form", ""))

print(f"джэ- TOPLAM: {len(dzhe)}")
print()

for l in dzhe[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/DZHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"джэ- KÖKÜ SINIFLANDIRMA — {len(dzhe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** CHICKEN, HEN, BIRD, ANIMAL...\n")
    f.write("- **AİLE:** Hayvanlar & Doğa, Eylem & Fiziksel...\n")
    f.write("- **ROOT:** джэ-\n\n")
    f.write("## ÖRNEK\n")
    f.write('джэд,"tavuk",CHICKEN,CHICKEN_BIRD,Hayvanlar & Doğa,джэ-\n')
    f.write('джэду,"kedi",CAT,CAT_ANIMAL,Hayvanlar & Doğa,джэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(dzhe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in dzhe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,джэ-\n')

print(f"\n✅ _scripts/DZHE_MIMARA.txt")
