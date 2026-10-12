import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

EMOTION_CONCEPTS = {
    "ANGER","COMPASSION","GRIEF","HOPE","JOY","LOVE","FEAR",
    "DOUBT","SUSPICION","BOREDOM","ANXIETY","PEACE","INDIFFERENCE",
    "DISGUST","DISLIKE","LOYALTY","SHAME","RESENTMENT","PRIDE",
    "LAUGH","FEARLESS","CALM","RESPECT","DISGUSTING"
}

# Mükerrer kontrol
forms = Counter()
for l in lex:
    if l.get("conceptId") in EMOTION_CONCEPTS:
        forms[l.get("form")] += 1

print("=== MÜKERRER FORMLAR (2+) ===")
for f, n in forms.most_common():
    if n > 1:
        print(f"  {f}: {n}")

print(f"\n=== TOPLAM BENZERSIZ ===")
print(f"Toplam kayıt: {sum(forms.values())}")
print(f"Benzersiz form: {len(forms)}")

# 49 fark nereden geliyor?
# emotion_fix2.py'deki 29 form disindakiler
FIX2_FORMS = {
    "губж","гукӏэгъу","гухэкӏ","гугъапӏэ","гуфӏэгъу","гуэтыныгъэ",
    "гузэвакӀуэ","гугъа","гъэщтэн","ГуфӀэ","Гухэхъуэ","Губжь",
    "Шынэ","Шынагъуэ","ГущӀэгъугъэ","Гуиих","гуэныкъуэгъэ",
    "гурыщхъуэ","гукъао","гухахъо","гуапагъэ","гукъыдэжыншэ",
    "гумызагъэ","гугъэуз","гущыкӀыгъуэ","гухэщӀ","гуапагъ","хьэщыкъ"
}

print(f"\n=== FIX2 DISI KAYITLAR ===")
digerleri = []
for l in lex:
    if l.get("conceptId") in EMOTION_CONCEPTS:
        f = l.get("form", "")
        if f not in FIX2_FORMS:
            digerleri.append((f, l.get("conceptId"), l.get("literalMeaning", "")[:40]))

print(f"Toplam: {len(digerleri)}")
for f, c, m in digerleri[:30]:
    print(f"  {f:20s} | {c:15s} | {m}")
