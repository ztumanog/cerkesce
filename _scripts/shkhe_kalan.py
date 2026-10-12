import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# щхьэ- belirsiz kalanlar
belirsiz = []
for l in lex:
    form = l.get("form", "")
    if not form.startswith("щхьэ"):
        continue
    if l.get("subConceptId"):
        continue
    belirsiz.append((form, l.get("literalMeaning") or "?"))

belirsiz.sort(key=lambda x: x[0])

print(f"щхьэ- BELİRSİZ KALAN: {len(belirsiz)}")
print("=" * 100)
print(f"{'FORM':<28} | ANLAM")
print("-" * 100)
for form, anlam in belirsiz:
    print(f"{form:<28} | {anlam[:55]}")

# Mimara gönderilecek CSV
with open("_scripts/SHKHE_KALAN.txt", "w", encoding="utf-8") as f:
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form, anlam in belirsiz:
        temiz = anlam.replace(",", " ").replace("|", " ").replace('"', "'")[:50]
        f.write(f'{form},"{temiz}",?,?,?,щхьэ-\n')

print(f"\n\n✅ CSV hazır: _scripts/SHKHE_KALAN.txt")
