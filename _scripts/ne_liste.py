import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# нэ- ile başlayan
ne = [l for l in lex if l.get("form", "").startswith("нэ")]
ne.sort(key=lambda x: x.get("form", ""))

with open("_scripts/ne_mimara.txt", "w", encoding="utf-8") as f:
    f.write(f"# нэ- KOKU KELIMELERI — {len(ne)} kayit\n")
    f.write(f"# Format: FORM | ANLAM | MEVCUT_CONCEPT | POS\n")
    f.write("=" * 110 + "\n\n")
    for i, l in enumerate(ne, 1):
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:55]
        concept = l.get("conceptId") or "-"
        pos = l.get("partOfSpeech") or "-"
        f.write(f"[{i:3}] {form:<25} | {anlam:<55} | {concept:<15} | {pos}\n")

print(f"Toplam nэ- kaydi: {len(ne)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in ne).most_common(10):
    print(f"  {k:<25} {v}")
print()
print(f"OK - _scripts/ne_mimara.txt")
