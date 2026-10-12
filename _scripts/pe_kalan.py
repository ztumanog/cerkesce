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
        belirsiz.append(form)

belirsiz.sort()

print(f"пэ- BELİRSİZ: {len(belirsiz)}")
print()
for f in belirsiz[:60]:
    print(f"  {f}")

with open("_scripts/PE_KALAN.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"пэ- KALAN — {len(belirsiz)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## MEVCUT AİLE\n")
    f.write("- İnsan & Beden / Mekan & Yön / Eylem & Fiziksel\n")
    f.write("- Düşünce & Soyut / Toplum & Meslek / Nitelik & Beden\n")
    f.write("- Eşya & Araç / Kültür & Etkileşim / Eylem & Dil\n")
    f.write("- Doğa & Hayvan / Yaşam & Sağlık / Gramer & Çekim\n")
    f.write("- **YENİ ekleyebilirsin**\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form in belirsiz:
        f.write(f'{form},"?",?,?,?,пэ-\n')

print(f"\n✅ _scripts/PE_KALAN.txt")
