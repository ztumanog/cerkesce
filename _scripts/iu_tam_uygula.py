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

# CSV oku
VERI = {}
with open("_scripts/iu_veri.csv", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#"):
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
    if not normalize(form).startswith("Ӏу"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in VERI:
        concept, sub, family = VERI[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "Ӏу-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("Ӏу") and not l.get("subConceptId")]
print(f"Ӏу- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:15]:
        print(f"  - {f}")
else:
    print("\n🎉 Ӏу- KATEGORİSİ TAM BİTTİ!")
