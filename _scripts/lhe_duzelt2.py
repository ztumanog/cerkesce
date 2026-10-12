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

# VIKISÖZLÜK DOĞRULAMALI
DUZELT = {
    "лъапэкӀэрыхъ": ("SHOE", "RAW_LEATHER_SHOE", "Eşya & Takı"),      # чирики
    "лъыпыӏун":     ("WEAR_OVER", "PUT_ON_OVER_SOCKS", "Eylem & Fiziksel"),  # çorap üstüne
    "лъытэн":       ("COUNT", "ACTION", "Eylem & Fiziksel"),            # ilk anlam
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    norm = normalize(form)
    if norm in DUZELT:
        concept, sub, family = DUZELT[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "лъ-"
        # İkincil anlamı notes'a ekle
        if norm == "лъытэн":
            eski = l.get("notes") or ""
            yeni = "[İkincil anlam: respect/honour]"
            if yeni not in eski:
                l["notes"] = (eski + " " + yeni).strip()
        uygulanan += 1
        print(f"OK: {form} -> {concept}/{sub}")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit duzeltildi")
