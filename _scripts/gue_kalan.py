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
    if normalize(form).startswith("гуэ"):
        concept = l.get("conceptId") or ""
        if concept in ("BELIRSIZ", "", "ANIMAL"):  # ANIMAL da yanlış olabilir
            belirsiz.append((form, l.get("literalMeaning") or "?", concept))

belirsiz.sort(key=lambda x: x[0])

print(f"гуэ- BELIRSIZ: {len(belirsiz)}")
print()

with open("_scripts/GUE_KALAN.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"гуэ- BELIRSIZ — {len(belirsiz)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## MEVCUT AİLE\n")
    f.write("- Eylem & Fiziksel / Dil\n")
    f.write("- Doğa & Hayvan / Besin\n")
    f.write("- Toplum & İlişki / Meslek\n")
    f.write("- Kültür & İnanç / Etkileşim\n")
    f.write("- Düşünce & Soyut / Nitelik & Doğa\n")
    f.write("- Eşya & Araç / Ev / Takı\n")
    f.write("- Gramer & Çekim / Nitelik\n")
    f.write("- Mekan & Yön\n")
    f.write("- **YENİ ekleyebilirsin**\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form, anlam, eski in belirsiz:
        temiz = anlam.replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{temiz}",?,?,?,гуэ-\n')

print(f"✅ _scripts/GUE_KALAN.txt")
