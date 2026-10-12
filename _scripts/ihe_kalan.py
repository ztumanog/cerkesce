import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    text = text.replace('I', '\u04c0').replace('l', '\u04c0').replace('1', '\u04c0')
    return text.strip()

# Ӏэ- belirsiz
belirsiz = []
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("Ӏэ"):
        continue
    if l.get("subConceptId"):
        continue
    belirsiz.append((form, l.get("literalMeaning") or "?"))

belirsiz.sort(key=lambda x: x[0])

print(f"Ӏэ- BELİRSİZ: {len(belirsiz)}")
print()

for form, anlam in belirsiz[:50]:
    print(f"  {form:<25} | {anlam[:50]}")

# Mimara gönderilecek
with open("_scripts/IHE_KALAN.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"Ӏэ- KALAN BELİRSİZLER — {len(belirsiz)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## MEVCUT KATEGORİLER (aileden birini seç veya yeni ekle)\n")
    f.write("- İnsan & Beden\n")
    f.write("- Eşya & Takı\n")
    f.write("- Eşya & Araç\n")
    f.write("- Eşya & Mutfak\n")
    f.write("- Eşya & Savaş\n")
    f.write("- Eylem & Fiziksel\n")
    f.write("- Eylem & Gramer\n")
    f.write("- Eylem & Yazı\n")
    f.write("- Kültür & Etkileşim\n")
    f.write("- Nitelik & Beceri\n")
    f.write("- Nitelik & Doğa\n")
    f.write("- Toplum & Meslek\n")
    f.write("- Kültür & Beden\n")
    f.write("- Düşünce & Soyut\n")
    f.write("- **YENİ ekleyebilirsin**\n\n")
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(belirsiz)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form, anlam in belirsiz:
        temiz = anlam.replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{temiz}",?,?,?,Ӏэ-\n')

print(f"\n✅ _scripts/IHE_KALAN.txt ({len(belirsiz)} kayıt)")
