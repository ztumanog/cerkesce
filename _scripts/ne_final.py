import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize_palochka(text):
    if not text:
        return ""
    return text.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")

SON_5 = {
    "нэмыӏэми":          ("COMPARISON", "CONJUNCTION", "Karşılaştırma"),
    "нэуфӏыцӏщхьэрыуэу":  ("FACE", "DARK_FACE", "Yüz & Sima"),
    "нэшанэ":            ("SIGN", "SIGN", "Belirti & İşaret"),
    "нэмыц":             ("PERSON", "GERMAN", "Kişi & Halk"),
    "нэмыгъэса":         ("ETHICS", "UNTRAINED", "Ahlak & Soyut"),
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    norm = normalize_palochka(form)
    if norm in SON_5:
        concept, sub, family = SON_5[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "нэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

# DOĞRULAMA
belirsiz = []
for l in lex:
    if l.get("form", "").startswith("нэ") and not l.get("subConceptId"):
        belirsiz.append(l.get("form"))

print(f"\nSon durum — Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:10]:
        print(f"  - {f}")
else:
    print("🎉 нэ- kategorisi TAM BİTTİ!")
