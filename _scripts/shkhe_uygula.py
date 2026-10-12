import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04e0')
    text = text.replace('I', '\u04e0').replace('l', '\u04e0').replace('1', '\u04e0')
    return text.strip()

SHKHE = {
    "шхэ":       ("EAT", "EAT_ACTION", "Yemek & Yiyecek"),
    "шхэгъу":    ("TIME", "MEAL_TIME", "Yemek & Yiyecek"),
    "шхэгъуэ":   ("TIME", "MEAL_TIME", "Yemek & Yiyecek"),
    "шхэкъэ":    ("EAT", "NEGATIVE_QUESTION", "Yemek & Yiyecek"),
    "шхэкӀэ":    ("EAT", "MANNER_EAT", "Yemek & Yiyecek"),
    "шхэн":      ("EAT", "EAT_ACTION", "Yemek & Yiyecek"),
    "шхэну":     ("EAT", "PURPOSE_EAT", "Yemek & Yiyecek"),
    "шхэныгу":   ("FOOD", "APPETITE", "Yemek & Yiyecek"),
    "шхэпс":     ("FOOD", "SOUP_BROTH", "Yemek & Yiyecek"),
    "шхэпсылэ":  ("FOOD", "SOUP_BROTH", "Yemek & Yiyecek"),
    "шхэрей":    ("CHARACTER", "GLUTTON", "Yemek & Yiyecek"),
    "шхэрэ":     ("EAT", "PRESENT_ACTION", "Yemek & Yiyecek"),
}

SHKHE_NORM = {normalize(k): v for k, v in SHKHE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("шхэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in SHKHE_NORM:
        concept, sub, family = SHKHE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "шхэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("шхэ") and not l.get("subConceptId")]
print(f"шхэ- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 шхэ- KATEGORİSİ TAM BİTTİ!")
