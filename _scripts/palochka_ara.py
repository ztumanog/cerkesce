import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Palochka olabilecek tüm karakterleri dene
ADAYLAR = ['\u04e0', '\u04cf', '\u04c0', '\u0406', '\u0456', 'I', 'l', '1']

for c in ADAYLAR:
    baslayan = [l for l in lex if l.get("form", "").startswith(c)]
    baslayan_ie = [l for l in lex if l.get("form", "").startswith(c + "э")]
    hex_kod = hex(ord(c))
    print(f"'{c}' ({hex_kod}) ile başlayan: {len(baslayan)} | '{c}э' ile: {len(baslayan_ie)}")
    # Örnek göster
    for l in baslayan[:3]:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:30]
        print(f"    {form} | {anlam}")
    print()
