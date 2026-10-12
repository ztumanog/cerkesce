import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

belirsiz = []
for l in lex:
    form = l.get("form", "")
    if normalize(form).startswith("пэ") and not l.get("subConceptId"):
        belirsiz.append((form, l.get("literalMeaning") or "?"))

belirsiz.sort(key=lambda x: x[0])

print(f"пэ- BELİRSİZ: {len(belirsiz)}")
print()

for form, anlam in belirsiz:
    print(f"  {form:<25} | {anlam[:50]}")

with open("_scripts/PE_KALAN2.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"пэ- KALAN — 5. TUR — {len(belirsiz)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## MEVCUT AİLE\n")
    f.write("- İnsan & Beden / Mekan & Yön / Eylem & Fiziksel\n")
    f.write("- Düşünce & Soyut / Toplum & Meslek / Nitelik & Beden\n")
    f.write("- Eşya & Araç / Kültür & Etkileşim / Eylem & Dil\n")
    f.write("- Doğa & Hayvan / Yaşam & Sağlık / Gramer & Çekim\n")
    f.write("- **YENİ ekleyebilirsin**\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form, anlam in belirsiz:
        temiz = anlam.replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{temiz}",?,?,?,пэ-\n')

print(f"\n✅ _scripts/PE_KALAN2.txt ({len(belirsiz)} kayıt)")
