import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Örnek kontrol
for form in ["пэплъэн", "лэжьыгъэ", "журтхэм", "инженер", "мэлъатэ", "къуажэм"]:
    l = next((l for l in lex if l.get("form") == form), None)
    if l:
        print(f"{form:20s} rootIds={l.get('rootIds')}")

rootlu = [l for l in lex if l.get("rootIds")]
print(f"\nrootIds dolu: {len(rootlu)}")
