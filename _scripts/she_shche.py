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

# Çok anlamlı diyalekt çiftleri
CIFT = {
    "шэ": {
        "conceptId": "MILK",
        "subConceptId": "DAIRY_PRODUCT",
        "taxonomyFamily": "Doğa & Besin",
        "conceptIds": ["MILK", "BULLET", "FAT"],
        "notes": "[Çok anlamlı: 1. süt 2. kurşun/mermi 3. yağ (iç yağı)] [Diyalekt: Adigece щэ ↔ Kabardeyce шэ]"
    },
    "щэ": {
        "conceptId": "FAT",
        "subConceptId": "ANIMAL_FAT",
        "taxonomyFamily": "Doğa & Besin",
        "conceptIds": ["FAT", "HUNDRED", "THREE_TIMES"],
        "notes": "[Çok anlamlı: 1. yağ, iç yağı 2. yüz (100) 3. üç kez] [Diyalekt: Kabardeyce шэ ↔ Adigece щэ]"
    },
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    norm = normalize(form)
    if norm in CIFT:
        veri = CIFT[norm]
        l["conceptId"] = veri["conceptId"]
        l["subConceptId"] = veri["subConceptId"]
        l["taxonomyFamily"] = veri["taxonomyFamily"]
        l["conceptIds"] = veri["conceptIds"]
        eski = l.get("notes") or ""
        yeni = veri["notes"]
        if yeni not in eski:
            l["notes"] = (eski + " " + yeni).strip()
        uygulanan += 1
        print(f"OK: {form} -> {veri['conceptId']} (çok anlamlı)")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit cok anlamli isaretlendi")

# Kontrol
for l in lex:
    form = l.get("form", "")
    if normalize(form) in CIFT:
        print(f"\nFORM: {form}")
        print(f"  conceptId: {l.get('conceptId')}")
        print(f"  conceptIds: {l.get('conceptIds')}")
        print(f"  notes: {l.get('notes')}")
