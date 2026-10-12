import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

satirlar = []
satirlar.append(f"ANIMAL'DA KALAN {len(animal)} HAYVAN")
satirlar.append("=" * 60)

for i, l in enumerate(animal, 1):
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    kid = l.get("id", "?")
    satirlar.append(f"{i:2}. {form:25} | {anlam:50} | {kid}")

Path("_scripts/KALAN-HAYVANLAR.txt").write_text("\n".join(satirlar), encoding="utf-8")
print(f"OK - {len(animal)} kayit yazildi")
