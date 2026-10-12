import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

shkhe = [l for l in lex if l.get("form", "").startswith("шхэ")]
shkhe.sort(key=lambda x: x.get("form", ""))

print(f"шхэ- TOPLAM: {len(shkhe)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in shkhe).most_common(10):
    print(f"  {k:<25} {v}")
print()

with open("_scripts/SHKHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"шхэ- KÖKÜ SINIFLANDIRMA — {len(shkhe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    f.write("## FORMAT\n")
    f.write("Her satır için: FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** İngilizce büyük harf (EAT, FOOD, HUNGER, FEAST...)\n")
    f.write("- **SUB:** Spesifik alt kategori\n")
    f.write("- **AİLE:** Anlamsal grup (Yemek & Yiyecek, Eylem & Hareket...)\n")
    f.write("- **ROOT:** шхэ-\n\n")
    f.write("## ÖRNEK\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    f.write('шхэн,"yemek yemek",EAT,EAT_ACTION,Yemek & Yiyecek,шхэ-\n')
    f.write('шхыгъу,"yemek sonrası",FEAST,FEAST_TIME,Yemek & Yiyecek,шхэ-\n\n')
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(shkhe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in shkhe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,шхэ-\n')

print(f"OK - _scripts/SHKHE_MIMARA.txt")
