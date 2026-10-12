import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

ne = [l for l in lex if l.get("form", "").startswith("нэ")]
ne.sort(key=lambda x: x.get("form", ""))

out = Path("_scripts/ne_gruplar")
out.mkdir(exist_ok=True)

# KURALLARI her dosyaya başa yaz
KURALLAR = """# нэ- KOKU SINIFLANDIRMA KURALLARI
# ============================================================
# AİLE seçenekleri (4 kategori):
#   1. Göz & Görme      -> нэ, нэбжьыц, нэпсы, нэрылъагъу...
#   2. Yüz & Sima       -> нэгу, нэкӀу, нэгуф, нэжэгужэ...
#   3. Sınır & Mesafe   -> нэс, нэгъабэ, нэблагъэ...
#   4. Ahlak & Soyut    -> нэмыс, нэмысыншэ, нэпцӀ...
#
# FORMAT: FORM | ANLAM | CONCEPT | SUB | AİLE | ROOT
#
# ÖRNEK:
#   нэ | göz | EYE | EYE | Göz & Görme | нэ-
#   нэгу | yüz | FACE | FACE | Yüz & Sima | нэ-
#   нэс | -e kadar | GRAMMAR | UNTIL | Sınır & Mesafe | нэ-
#   нэмыс | saygı | EMOTION | RESPECT | Ahlak & Soyut | нэ-
# ============================================================
"""

GRUP_BOYUT = 30
gruplar = [ne[i:i+GRUP_BOYUT] for i in range(0, len(ne), GRUP_BOYUT)]

for i, grup in enumerate(gruplar, 1):
    dosya = out / f"grup-{i:02d}.txt"
    with open(dosya, "w", encoding="utf-8") as f:
        f.write(KURALLAR)
        f.write(f"\n# нэ- Grup {i}/{len(gruplar)} — {len(grup)} kayit\n")
        f.write("=" * 130 + "\n")
        f.write(f"{'FORM':<22} | {'ANLAM':<40} | {'CONCEPT':<15} | {'SUB':<18} | {'AİLE':<20} | ROOT\n")
        f.write("-" * 130 + "\n")
        for l in grup:
            form = l.get("form", "?")
            anlam = (l.get("literalMeaning") or "?")[:40]
            f.write(f"{form:<22} | {anlam:<40} | {'?':<15} | {'?':<18} | {'?':<20} | нэ-\n")

print(f"Toplam: {len(ne)} kayit")
print(f"Grup sayisi: {len(gruplar)}")
for i, grup in enumerate(gruplar, 1):
    print(f"  grup-{i:02d}.txt: {len(grup)} kayit")
