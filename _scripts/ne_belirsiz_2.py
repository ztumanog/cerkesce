import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Belirsizleri bul
belirsiz = []
for l in lex:
    form = l.get("form", "")
    if not form.startswith("нэ"):
        continue
    if l.get("subConceptId"):
        continue
    belirsiz.append((form, l.get("literalMeaning") or "?"))

belirsiz.sort(key=lambda x: x[0])

out = Path("_scripts/ne_belirsiz_2")
out.mkdir(exist_ok=True)

GRUP = 30
gruplar = [belirsiz[i:i+GRUP] for i in range(0, len(belirsiz), GRUP)]

KURALLAR = """# нэ- BELİRSİZ — 2. TUR
# ============================================================
# MEVCUT KATEGORİLER:
#   1. Göz & Görme        -> нэ, нэбжьыц, нэпсы...
#   2. Yüz & Sima         -> нэгу, нэкӀу, нэщхъ...
#   3. Sınır & Mesafe     -> нэс, нэблэгъэ...
#   4. Ahlak & Soyut      -> нэмыс, нэпцӀ...
#   5. Işık & Aydınlık    -> нэф, нэху...
#   6. Üzüntü & Keder     -> нэщхъей...
#   7. Yaş & Karşılaştırma -> нэхъыжь...
#   8. Din & İnanç        -> нэмэз, нэчыхь...
#   9. Görünürlük         -> нэрылъагъу...
#  10. Karşılaştırma      -> нэхъыбэ...
#  11. Utanç & Ahlak      -> нэпэнчъэ...
#  12. BAŞKA (sen karar ver: PLANT, FAMILY, PERSON, NATURE...)
#
# FORMAT: FORM | ANLAM | CONCEPT | SUB | AİLE | ROOT
# ============================================================
"""

for i, grup in enumerate(gruplar, 1):
    dosya = out / f"belirsiz2-{i:02d}.txt"
    with open(dosya, "w", encoding="utf-8") as f:
        f.write(KURALLAR)
        f.write(f"\n# Grup {i}/{len(gruplar)} — {len(grup)} kayit\n")
        f.write("=" * 130 + "\n")
        f.write(f"{'FORM':<22} | {'ANLAM':<50} | {'CONCEPT':<15} | {'SUB':<18} | {'AİLE':<20} | ROOT\n")
        f.write("-" * 130 + "\n")
        for form, anlam in grup:
            f.write(f"{form:<22} | {anlam[:50]:<50} | {'?':<15} | {'?':<18} | {'?':<20} | нэ-\n")

print(f"Toplam belirsiz: {len(belirsiz)}")
print(f"Grup sayisi: {len(gruplar)}")
for i, g in enumerate(gruplar, 1):
    print(f"  belirsiz2-{i:02d}.txt: {len(g)}")
