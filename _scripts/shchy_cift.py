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

# ÇİFT ANLAMLI KAYITLAR
CIFT_ANLAM = {
    "щы":    {
        "conceptIds": ["THREE", "EDGE"],
        "notes": "[Çift anlam: 1. üç (sayı) 2. uç, kenar]"
    },
    "щыблэ": {
        "conceptIds": ["LIGHTNING", "DEITY"],
        "notes": "[Çift anlam: 1. şimşek (doğa olayı) 2. Şıble (mitolojik şimşek tanrısı)]"
    },
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    norm = normalize(form)
    if norm in CIFT_ANLAM:
        veri = CIFT_ANLAM[norm]
        l["conceptIds"] = veri["conceptIds"]
        eski = l.get("notes") or ""
        yeni = veri["notes"]
        if yeni not in eski:
            l["notes"] = (eski + " " + yeni).strip()
        uygulanan += 1
        print(f"OK: {form} -> conceptIds: {veri['conceptIds']}")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit cift anlamli olarak isaretlendi")

# Kontrol
for l in lex:
    form = l.get("form", "")
    if normalize(form) in CIFT_ANLAM:
        print(f"\nFORM: {form}")
        print(f"  conceptId: {l.get('conceptId')}")
        print(f"  subConceptId: {l.get('subConceptId')}")
        print(f"  conceptIds: {l.get('conceptIds')}")
        print(f"  notes: {l.get('notes')}")
