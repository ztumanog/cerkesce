import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

belirsiz = []
for l in lex:
    form = l.get("form", "")
    if not form.startswith("хьэ"):
        continue
    if l.get("subConceptId"):
        continue
    belirsiz.append((form, l.get("literalMeaning") or "?"))

belirsiz.sort(key=lambda x: x[0])

print(f"BELİRSİZ: {len(belirsiz)}")
print("=" * 90)
for form, anlam in belirsiz[:60]:
    print(f"{form:<28} | {anlam[:50]}")

# Mimara gönderilecek
with open("_scripts/KHE_KALAN.txt", "w", encoding="utf-8") as f:
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for form, anlam in belirsiz:
        temiz = anlam.replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{temiz}",?,?,?,хьэ-\n')

print(f"\n✅ _scripts/KHE_KALAN.txt ({len(belirsiz)} kayıt)")
