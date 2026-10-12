import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

lhe = [l for l in lex if normalize(l.get("form", "")).startswith("лъ") and not normalize(l.get("form", "")).startswith("лъэ")]
lhe.sort(key=lambda x: x.get("form", ""))

print(f"лъ- TOPLAM: {len(lhe)}")
print()
print(f"{'FORM':<22} | {'CONCEPT':<15} | {'SUB':<22} | AİLE")
print("-" * 110)

bos = []
for l in lhe:
    form = l.get("form", "?")
    concept = l.get("conceptId") or "-"
    sub = l.get("subConceptId") or "-"
    aile = l.get("taxonomyFamily") or "-"
    
    if concept in ("BELIRSIZ", "-", "") or sub in ("-", ""):
        bos.append(form)
        print(f"⚠️ {form:<20} | {concept:<15} | {sub:<22} | {aile}")
    else:
        print(f"   {form:<20} | {concept:<15} | {sub:<22} | {aile}")

print()
print(f"BOŞ/BELIRSIZ: {len(bos)}")
if bos:
    for f in bos:
        print(f"  - {f}")
else:
    print("🎉 Tüm kayıtlar dolu!")
