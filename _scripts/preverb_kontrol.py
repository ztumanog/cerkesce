import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Preverb içeren kelimeler
preverbler = ["къы", "нэ", "те", "щӀэ", "дэ", "хэ", "и", "блэ", "гъэ"]

for pv in preverbler:
    pv_kelimeler = [l for l in lex if l.get("form", "").startswith(pv)]
    print(f"{pv:6s} ile başlayan: {len(pv_kelimeler):5}")

    # Bu kelimelerden rootIds dolu olanlar
    rootlu = [l for l in pv_kelimeler if l.get("rootIds")]
    print(f"      rootIds dolu: {len(rootlu)}")
    for l in rootlu[:3]:
        print(f"         {l.get('form', '?'):20s} rootIds={l.get('rootIds')}")
