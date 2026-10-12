import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# тхьэ- ile başlayan
thle = [l for l in lex if l.get("form", "").startswith("тхьэ")]
thle.sort(key=lambda x: x.get("form", ""))

with open("_scripts/THLE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"тхьэ- KÖKÜ SINIFLANDIRMA — {len(thle)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    
    f.write("## FORMAT\n")
    f.write("Her satır için: FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** İngilizce büyük harf (GOD, PRAYER, OATH, DEITY, SAINT...)\n")
    f.write("- **SUB:** Spesifik alt kategori (GOD_SUPREME, PRAYER_REQUEST...)\n")
    f.write("- **AİLE:** Anlamsal grup (Tanrı & İnanç, Dua & Yemin, Kutsal & Mitoloji...)\n")
    f.write("- **ROOT:** тхьэ-\n\n")
    
    f.write("## ÖRNEK\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    f.write("тхьэ,tanrı,GOD,GOD_SUPREME,Tanrı & İnanç,тхьэ-\n")
    f.write("тхьэлъэӀу,dua,PRAYER,PRAYER_REQUEST,Dua & Yemin,тхьэ-\n\n")
    
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(thle)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in thle:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,тхьэ-\n')

print(f"Toplam тхьэ- kaydi: {len(thle)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in thle).most_common(10):
    print(f"  {k:<25} {v}")
print()
print("OK - _scripts/THLE_MIMARA.txt")
