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

# TÜM Ӏэ- kayıtlarını göster (normalize edilmiş + orijinal)
tum = []
for l in lex:
    form = l.get("form", "")
    if normalize(form).startswith("Ӏэ"):
        tum.append((form, normalize(form), l.get("subConceptId") or "-", l.get("literalMeaning") or "?"))

tum.sort(key=lambda x: x[0])

print(f"Ӏэ- TOPLAM: {len(tum)}")
print()
print(f"{'ORİJİNAL':<35} | {'NORMALIZE':<35} | SUB | ANLAM")
print("-" * 130)
for orig, norm, sub, anlam in tum[:50]:
    print(f"{orig:<35} | {norm:<35} | {sub:<10} | {anlam[:30]}")

# İşlenmeyenleri kaydet
belirsiz = [(o, n, a) for o, n, s, a in tum if s == "-"]
print(f"\n\nBELİRSİZ: {len(belirsiz)}")

with open("_scripts/IHE_KALAN3.txt", "w", encoding="utf-8") as f:
    f.write(f"Ӏэ- KALAN — {len(belirsiz)} kayıt\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for orig, norm, anlam in belirsiz:
        temiz = anlam.replace(",", " ").replace('"', "'")[:50]
        f.write(f'{orig},"{temiz}",?,?,?,Ӏэ-\n')

print(f"✅ _scripts/IHE_KALAN3.txt")
