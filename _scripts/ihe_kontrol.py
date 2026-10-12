import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04e0')
    return text.strip()

# Palochka ile başlayan tüm formlar
hepsi = [l for l in lex if normalize(l.get("form", "")).startswith("Ӏ")]
print(f"Ӏ- ile başlayan TOPLAM: {len(hepsi)}")
print()

# İlk 30
for l in hepsi[:30]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:40]
    cps = " ".join(hex(ord(c)) for c in form[:3])
    sub = l.get("subConceptId") or "-"
    print(f"  {form:<22} | {anlam:<40} | {sub}")

# Kaç tane Ӏэ- var?
ihe = [l for l in hepsi if normalize(l.get("form","")).startswith("Ӏэ")]
print(f"\nӀэ- ile başlayan: {len(ihe)}")
for l in ihe[:20]:
    form = l.get("form", "?")
    cps = " ".join(hex(ord(c)) for c in form[:3])
    print(f"  {form:<22} | cps: {cps} | sub: {l.get('subConceptId') or '-'}")
