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
    "лъа":        ("SHARP", "SHARPENED", "Nitelik & Doğa"),
    "лъахъц":     ("SHOOT", "PLANT_SPROUT", "Doğa & Bitki"),
    "лъахъшэ":    ("LOW", "HEIGHT_LOW", "Nitelik & Doğa"),
    "лъахъэ":     ("SHACKLE", "FOOT_TETHER", "Eşya & Araç"),
    "лъахэ":      ("HOMELAND", "NATIVE_LAND", "Mekan & Yön"),
    "лъашэ":      ("LAME", "LIMPING", "Nitelik & Beden"),
    "лъитагъ":    ("NOTICED", "PERCEIVED", "Eylem & Zihin"),
    "лъфагъэ":    ("BIRTH", "GAVE_BIRTH", "Yaşam & Sağlık"),
    "лъхуэгъуэ":  ("BIRTH_TIME", "TIME_OF_BIRTH", "Yaşam & Sağlık"),
    "лъхуэн":     ("GIVE_BIRTH", "BIRTH_ACTION", "Yaşam & Sağlık"),
    "лъы":        ("BLOOD", "BODY_FLUID", "İnsan & Beden"),
    "лъыплъэн":   ("WATCH", "OBSERVE", "Eylem & Fiziksel"),
    "лъыпытэу":   ("CONTINUOUSLY", "MANNER", "Düşünce & Soyut"),
    "лъытэ":      ("RESPECT", "EMOTION", "Kültür & Etkileşim"),
    "лъыхъу":     ("SEARCH", "ACTION", "Eylem & Zihin"),
}

DUZELT_NORM = {normalize(k): v for k, v in DUZELT.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("лъ"):
        continue
    if normalize(form).startswith("лъэ"):
        continue
    
    norm = normalize(form)
    if norm in DUZELT_NORM:
        concept, sub, family = DUZELT_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "лъ-"
        uygulanan += 1
        print(f"OK: {form} -> {concept}/{sub}")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit duzeltildi")

# Kontrol
bos = []
for l in lex:
    form = l.get("form", "")
    if normalize(form).startswith("лъ") and not normalize(form).startswith("лъэ"):
        concept = l.get("conceptId") or ""
        sub = l.get("subConceptId") or ""
        if concept in ("BELIRSIZ", "-", "", "COLOR") or sub in ("-", ""):
            bos.append(form)

print(f"лъ- BOŞ/BELIRSIZ kalan: {len(bos)}")
if bos:
    for f in bos:
        print(f"  - {f}")
else:
    print("\n🎉 лъ- KATEGORİSİ TAM BİTTİ!")
