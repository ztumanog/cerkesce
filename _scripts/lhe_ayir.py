import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# лъэ- ile başlayan
lhe = [l for l in lex if l.get("form", "").startswith("лъэ")]

# Anlamı VAR olanlar
anlamli = []
anlamsiz = []

for l in lhe:
    anlam = (l.get("literalMeaning") or "").strip()
    if anlam and anlam != "?":
        anlamli.append(l)
    else:
        anlamsiz.append(l)

# Dosyalara yaz
with open("_scripts/lhe_anlamli.txt", "w", encoding="utf-8") as f:
    f.write(f"# лъэ- ANLAMLI KAYITLAR — {len(anlamli)} kayit\n")
    f.write(f"# FORMAT: FORM | ANLAM | CONCEPT | POS\n")
    f.write("=" * 100 + "\n\n")
    for i, l in enumerate(sorted(anlamli, key=lambda x: x.get("form","")), 1):
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:50]
        concept = l.get("conceptId") or "-"
        pos = l.get("partOfSpeech") or "-"
        f.write(f"[{i:3}] {form:<25} | {anlam:<50} | {concept:<15} | {pos}\n")

with open("_scripts/lhe_anlamsiz.txt", "w", encoding="utf-8") as f:
    f.write(f"# лъэ- ANLAMSIZ KAYITLAR — {len(anlamsiz)} kayit\n")
    f.write(f"# FORMAT: FORM | (anlam bilinmiyor)\n")
    f.write("=" * 100 + "\n\n")
    for i, l in enumerate(sorted(anlamsiz, key=lambda x: x.get("form","")), 1):
        form = l.get("form", "?")
        pos = l.get("partOfSpeech") or "-"
        concept = l.get("conceptId") or "-"
        f.write(f"[{i:3}] {form:<25} | POS: {pos:<15} | CONCEPT: {concept}\n")

print(f"Toplam лъэ-: {len(lhe)}")
print(f"Anlamlı:    {len(anlamli)}")
print(f"Anlamsız:   {len(anlamsiz)}")
