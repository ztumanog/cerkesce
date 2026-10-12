import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
food = [l for l in lex if l.get("conceptId") == "FOOD"]

# Yemek ile ilgili kelimeler
YEMEK = ["yemek", "et", "süt", "peynir", "ekmek", "tuz", "yağ", "bal",
         "su", "çay", "kahve", "un", "pirinç", "buğday", "mısır",
         "elma", "armut", "üzüm", "kiraz", "erik", "ceviz", "fındık",
         "soğan", "sarımsak", "biber", "domates", "salatalık",
         "yumurta", "tavuk", "balık", "kuzu", "dana", "koyun",
         "kavurma", "haşlama", "kızartma", "çorba", "pilav",
         "tatlı", "tuzlu", "ekşi", "acı", "şeker", "tuz"]

gercek = []
for l in food:
    anlam = (l.get("literalMeaning") or "").lower()
    for y in YEMEK:
        if y in anlam:
            gercek.append(l)
            break

print(f"Gerçek FOOD adayı: {len(gercek)}")
print()
for l in gercek:
    print(f"  {l.get('form'):20s} | {l.get('literalMeaning', '?')[:60]}")
