import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# хьэ- ile başlayan
khe = [l for l in lex if l.get("form", "").startswith("хьэ")]
khe.sort(key=lambda x: x.get("form", ""))

# Grup sayısı
print(f"Toplam хьэ- kaydi: {len(khe)}")
print()
print("CONCEPT DAGILIMI:")
for k, v in Counter(l.get("conceptId") or "(bos)" for l in khe).most_common(15):
    print(f"  {k:<25} {v}")
print()

# Mimara gönderilecek
with open("_scripts/KHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write(f"хьэ- KÖKÜ SINIFLANDIRMA — {len(khe)} kayıt\n")
    f.write("=" * 100 + "\n\n")
    
    f.write("## FORMAT\n")
    f.write("Her satır için: FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n\n")
    
    f.write("## KURALLAR\n")
    f.write("- **CONCEPT:** İngilizce büyük harf (DOG, COURTYARD, CASE, COURT...)\n")
    f.write("- **SUB:** Spesifik alt kategori\n")
    f.write("- **AİLE:** Anlamsal grup\n")
    f.write("- **ROOT:** хьэ-\n\n")
    
    f.write("## ÖRNEK\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    f.write('хьэ,"köpek",DOG,DOG_ANIMAL,Hayvanlar & Doğa,хьэ-\n')
    f.write('хьэкум,"mahkeme",COURT,COURT_LEGAL,Toplum & Hukuk,хьэ-\n\n')
    
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(khe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
    for l in khe:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
        f.write(f'{form},"{anlam}",?,?,?,хьэ-\n')

print(f"OK - _scripts/KHE_MIMARA.txt")
