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

DUZELT = {
    "щыз": {
        "conceptId": "FULL",
        "subConceptId": "SATURATED",
        "taxonomyFamily": "Nitelik & Beden",
        "notes": "[Düzeltme: Mimar FAT dedi, sözlük DOLU/SATURATED diyor]"
    },
    "щылэ": {
        "conceptId": "JANUARY",
        "subConceptId": "MONTH",
        "taxonomyFamily": "Zaman & Takvim",
        "conceptIds": ["JANUARY", "SILK"],
        "notes": "[Çift anlam: 1. Ocak (ay) 2. ipek (doğal)]"
    },
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    norm = normalize(form)
    if norm in DUZELT:
        veri = DUZELT[norm]
        l["conceptId"] = veri["conceptId"]
        l["subConceptId"] = veri["subConceptId"]
        l["taxonomyFamily"] = veri["taxonomyFamily"]
        if "conceptIds" in veri:
            l["conceptIds"] = veri["conceptIds"]
        eski = l.get("notes") or ""
        yeni = veri["notes"]
        if yeni not in eski:
            l["notes"] = (eski + " " + yeni).strip()
        uygulanan += 1
        print(f"OK: {form} -> {veri['conceptId']}")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit duzeltildi")

# Kontrol
for l in lex:
    form = l.get("form", "")
    if normalize(form) in DUZELT:
        print(f"\nFORM: {form}")
        print(f"  conceptId: {l.get('conceptId')}")
        print(f"  subConceptId: {l.get('subConceptId')}")
        print(f"  conceptIds: {l.get('conceptIds')}")
        print(f"  notes: {l.get('notes')[:100]}")
