import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

gue = [l for l in lex if normalize(l.get("form", "")).startswith("гуэ")]
gue.sort(key=lambda x: x.get("form", ""))

print(f"гуэ- TOPLAM: {len(gue)}")
print()

for l in gue[:40]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    print(f"  {form:<25} | {anlam}")

with open("_scripts/GUE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"гуэ- KÖKÜ SINIFLANDIRMA — {len(gue)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** ?\n")
    f.write("- **AİLE:** ?\n")
    f.write("- **ROOT:** гуэ-\n\n")
    f.write("## ÖRNEK\n")
    f.write('гуэ,"?",?,?,?,гуэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(gue)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in gue:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,гуэ-\n')

print(f"\n✅ _scripts/GUE_MIMARA.txt")
