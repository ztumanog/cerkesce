import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

# щы- ile başlayanları al
shchy = [l for l in lex if normalize(l.get("form", "")).startswith("щы")]
shchy.sort(key=lambda x: x.get("form", ""))

print(f"щы- TOPLAM: {len(shchy)}")
print()

# İlk 20 örnek
for l in shchy[:20]:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    concept = l.get("conceptId") or "-"
    print(f"  {form:<22} | {anlam:<50} | {concept}")
