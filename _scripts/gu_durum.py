import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# гу- ile başlayanlar
gu = [l for l in lex if l.get("form", "").startswith("гу")]

print(f"Toplam gu- kaydi: {len(gu)}")
print()

# conceptId dağılımı
concept_dagilim = Counter(l.get("conceptId") or "(bos)" for l in gu)
print("CONCEPTID DAGILIMI:")
for k, v in concept_dagilim.most_common():
    print(f"  {k:<25} {v}")

print()

# partOfSpeech dağılımı
pos_dagilim = Counter(l.get("partOfSpeech") or "(bos)" for l in gu)
print("PARTOFSPEECH DAGILIMI:")
for k, v in pos_dagilim.most_common():
    print(f"  {k:<15} {v}")

print()

# İlk 50 örnek
print("ILK 50:")
for l in sorted(gu, key=lambda x: x.get("form", ""))[:50]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:45]
    concept = l.get("conceptId") or "-"
    print(f"  {form:<25} | {anlam:<45} | {concept}")

# Dosyaya yaz
with open("_scripts/gu_durum.txt", "w", encoding="utf-8") as f:
    f.write(f"GU- KAYITLARININ MEVCUT DURUMU — {len(gu)} kayit\n")
    f.write("=" * 90 + "\n\n")
    f.write("CONCEPTID DAGILIMI:\n")
    for k, v in concept_dagilim.most_common():
        f.write(f"  {k:<25} {v}\n")
    f.write("\n\nTUM KAYITLAR:\n")
    f.write("-" * 90 + "\n")
    for l in sorted(gu, key=lambda x: x.get("form", "")):
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:50]
        concept = l.get("conceptId") or "-"
        pos = l.get("partOfSpeech") or "-"
        f.write(f"{form:<25} | {anlam:<50} | {concept:<15} | {pos}\n")

print()
print("OK - _scripts/gu_durum.txt")
