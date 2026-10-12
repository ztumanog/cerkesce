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

DIALEKT_NOTLARI = {
    "лъфагъэ":   "[Batı Adigece varyantı - Doğu karşılığı: лъхуэгъуэ]",
    "лъхуэгъуэ": "[Doğu Kabardeyce varyantı - Batı karşılığı: лъфагъэ]",
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    norm = normalize(form)
    if norm in DIALEKT_NOTLARI:
        eski = l.get("notes") or ""
        yeni = DIALEKT_NOTLARI[norm]
        if yeni not in eski:
            l["notes"] = (eski + " " + yeni).strip()
            uygulanan += 1
            print(f"OK: {form} -> notes guncellendi")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit notes guncellendi")

# Diyalekt çiftleri kontrolü
print("\n=== лъфагъэ / лъхуэгъуэ KARŞILAŞTIRMA ===")
for l in lex:
    form = l.get("form", "")
    if normalize(form) in ("лъфагъэ", "лъхуэгъуэ"):
        print(f"\nFORM: {form}")
        print(f"  literalMeaning: {l.get('literalMeaning')}")
        print(f"  conceptId: {l.get('conceptId')}")
        print(f"  subConceptId: {l.get('subConceptId')}")
        print(f"  taxonomyFamily: {l.get('taxonomyFamily')}")
        print(f"  notes: {l.get('notes')}")
