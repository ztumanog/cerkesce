import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# плӀыжь varyantlarini bul
hedefler = ["плӀыжь", "плӏыжь", "плIыжь", "плlыжь", "пл1ыжь"]

for h in hedefler:
    bulunan = [l for l in lex if l.get("form") == h]
    if bulunan:
        l = bulunan[0]
        print(f"BULUNDU: {h}")
        print(f"  Unicode: {[hex(ord(c)) for c in h]}")
        print(f"  conceptId: {l.get('conceptId', 'YOK')}")
        print(f"  literalMeaning: {l.get('literalMeaning', 'YOK')}")
        print(f"  subConceptId: {l.get('subConceptId', 'YOK')}")
        print()
