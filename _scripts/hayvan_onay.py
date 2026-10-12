import json
import re
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# ============================================================
# ONAYLANAN HAYVANLAR (senin verdiğin liste)
# form → anlam eşleşmesi
# ============================================================
ONAYLI_HAYVANLAR = {
    # form : (anlam ipucu)
    "адакъэ": "horoz",
    "адыгэш": "Çerkes atı",
    "адэжынэ": "bıldırcın kılavuzu",
    "ажэ": "teke",           # hem 16 hem 17
    "алащэ": "binek atı",
    "алъп": "mitolojik at",
    "аргъей": "somon",
    "бжьо": "sığın",
    "благъуэ": "ejderha",
    "блащхъуэжьей": "mitolojik yılan",
    "бу": "puhu kuşu",
    "джэджьей": "civciv",
    "джэдкъаз": "kümes hayvanı",
    "джэдынэ": "keklik",
    "дзыгъуэнэф": "köstebek",
    "домбей": "bizon",
    "елыркъэш": "tarihi at soyu",
}

# ============================================================
# SINIFLANDIR
# ============================================================
onayli = []
yanlis = []
diger = []

for l in animal:
    form = l.get("form", "")
    if form in ONAYLI_HAYVANLAR:
        onayli.append(l)
    else:
        diger.append(l)

# Aday listesini oku (123 kayıt)
aday_dosya = Path("_scripts/hayvan_adaylari.txt")
if aday_dosya.exists():
    aday_formlar = set()
    for satir in aday_dosya.read_text(encoding="utf-8").splitlines():
        # [xxx] [x] form | ...
        m = re.match(r"\[\s*\d+\]\s*\[.\]\s*(\S+)", satir)
        if m:
            aday_formlar.add(m.group(1))
    
    print(f"Aday listesinde: {len(aday_formlar)} form")
    print()

print("=" * 70)
print("ONAYLANAN HAYVANLAR")
print("=" * 70)
for l in onayli:
    form = l.get("form", "?")
    anlam = (l.get("literalMeaning") or "?")[:50]
    kid = l.get("id", "?")
    print(f"  {form:22} | {anlam:50} | {kid}")

print()
print(f"Toplam onaylı: {len(onayli)}")
print(f"Diğer (ANIMAL'da kalan): {len(diger)}")
print()

# Diğerleri arasında "aday" olanları göster
if aday_dosya.exists():
    diger_aday = [l for l in diger if l.get("form") in aday_formlar]
    print(f"Aday listesinden 'yanlış [x]' olanlar: {len(diger_aday)}")
    print()
    print("İlk 30:")
    for l in diger_aday[:30]:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:45]
        print(f"  {form:22} | {anlam}")

print()
print("⚠️  KURU ÇALIŞTIRMA — hiçbir şey değişmedi")
