import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

VERI = {}
with open("_scripts/shchy_01_sonuc.csv", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#") or line.startswith("FORM,"):
            continue
        parts = line.split(",")
        if len(parts) < 4:
            continue
        # DOĞRU KOLONLAR:
        form = parts[0].strip().strip('"')
        concept = parts[1].strip().strip('"')  # ← 1 değil 1
        sub = parts[2].strip().strip('"')      # ← 2
        aile = parts[3].strip().strip('"')     # ← 3
        VERI[normalize(form)] = (concept, sub, aile)

print(f"Veri: {len(VERI)} kayit")

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("щы"):
        continue
    norm = normalize(form)
    if norm in VERI:
        concept, sub, family = VERI[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "щы-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("щы") and (l.get("subConceptId") in (None, "", "-"))]
print(f"щы- Belirsiz kalan: {len(belirsiz)}")
