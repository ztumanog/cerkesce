import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# COLOR kayitlari
color = [l for l in lex if l.get("conceptId") == "COLOR"]

# Turkce renk isimleri
RENKLER = ["siyah", "beyaz", "kırmızı", "mavi", "yeşil", "sarı",
           "turuncu", "mor", "pembe", "kahverengi", "gri", "lacivert",
           "al", "ak", "kara", "boz", "ela", "eflatun", "turkuaz",
           "altın", "gümüş", "bakır", "kızıl", "kumral"]

print(f"Toplam COLOR: {len(color)}")
print()

# Anlaminda renk gecenler
gercek = []
for l in color:
    anlam = (l.get("literalMeaning") or l.get("meaning") or "").lower()
    for r in RENKLER:
        if r in anlam:
            gercek.append(l)
            break

print(f"Gerçek renk adayı: {len(gercek)}")
print()
for l in gercek[:50]:
    print(f"  {l.get('form'):20s} | {l.get('literalMeaning', '?')[:60]}")
