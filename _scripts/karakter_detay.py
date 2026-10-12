import json
import unicodedata
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# I ve benzeri karakterleri bul
hedefler = {
    "I": "Latin buyuk i (U+0049)",
    "İ": "Latin buyuk I noktali (U+0130)",
    "ı": "Latin kucuk i noktasiz (U+0131)",
    "Ӏ": "Kiril palochka (U+04C0)",
    "ӏ": "Kiril palochka kucuk (U+04CF)",
    "1": "Rakam 1",
    "l": "Latin kucuk L",
    "|": "Dikey cizgi",
}

# Her karakteri say
from collections import Counter
karakter_sayisi = Counter()

for l in lex:
    form = l.get("form", "")
    for c in form:
        if c in hedefler:
            karakter_sayisi[c] += 1

print("=== KARAKTER ANALIZI ===")
for c, desc in hedefler.items():
    sayi = karakter_sayisi.get(c, 0)
    if sayi > 0:
        print(f"  {desc:35s} '{c}' : {sayi}")

# I içeren formları bul
print("\n=== 'I' içeren formlar ===")
sayac = 0
for l in lex:
    form = l.get("form", "")
    if "I" in form and "Ӏ" not in form:
        print(f"  {form} | id={l.get('id')}")
        sayac += 1
        if sayac >= 20:
            break
print(f"Toplam: {sayac}")

# "Diğer" kategorisindeki formları bul
print("\n=== 'Diğer' kategorisindeki formlar ===")
import re
kiril_re = re.compile(r'^[\u0400-\u04FF\u0500-\u052FӀӏ\-\s]+$')
sayac = 0
for l in lex:
    form = l.get("form", "")
    if form and not kiril_re.match(form):
        print(f"  {form} | id={l.get('id')}")
        sayac += 1
        if sayac >= 20:
            break
print(f"Toplam: {sayac}")
