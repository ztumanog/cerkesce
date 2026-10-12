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
with open("_scripts/lhe_veri.csv", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split(",")
        if len(parts) < 4:
            continue
        form = parts[0].strip()
        concept = parts[1].strip()
        sub = parts[2].strip()
        aile = parts[3].strip()
        VERI[normalize(form)] = (concept, sub, aile)

print(f"Veri: {len(VERI)} kayit")

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    # лъ- ile başlayan ama лъэ- olmayan
    if normalize(form).startswith("лъэ"):
        continue
    if not normalize(form).startswith("лъ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in VERI:
        concept, sub, family = VERI[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "лъ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("лъ") and not normalize(l.get("form","")).startswith("лъэ") and not l.get("subConceptId")]
print(f"лъ- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:15]:
        print(f"  - {f}")
else:
    print("\n🎉 лъ- KATEGORİSİ TAM BİTTİ!")
