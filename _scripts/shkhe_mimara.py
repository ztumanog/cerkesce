import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# щхьэ- ile başlayan
shkhe = [l for l in lex if l.get("form", "").startswith("щхьэ")]
shkhe.sort(key=lambda x: x.get("form", ""))

# ============================================================
# MİMARA GÖNDERİLECEK DOSYA
# ============================================================
with open("_scripts/SHKHE_MIMARA.txt", "w", encoding="utf-8") as f:
    f.write("=" * 100 + "\n")
    f.write("щхьэ- KÖKÜ SINIFLANDIRMA GÖREVİ\n")
    f.write("=" * 100 + "\n\n")
    
    f.write("## GÖREVİN AMACI\n")
    f.write("Aşağıdaki щхьэ- ile başlayan kelimeleri Morfolojik Pasaport yapısına göre sınıflandır.\n\n")
    
    f.write("## FORMAT\n")
    f.write("Her kelime için şu 6 alanı doldur:\n\n")
    f.write("| FORM | ANLAM | CONCEPT | SUB | AİLE | ROOT |\n")
    f.write("|------|-------|---------|-----|------|------|\n\n")
    
    f.write("## KURALLAR\n\n")
    f.write("### 1. CONCEPT (İngilizce Büyük Harf)\n")
    f.write("Kelimenin doğrudan kavramı:\n")
    f.write("- `HEAD` = baş, kafa\n")
    f.write("- `TOP` = üst, tepe\n")
    f.write("- `SELF` = kendi, öz\n")
    f.write("- `ALONE` = yalnız, tek\n")
    f.write("- `WINDOW` = pencere\n")
    f.write("- `SPOUSE` = eş\n")
    f.write("- `REASON` = sebep\n")
    f.write("- ... (sen ekle)\n\n")
    
    f.write("### 2. SUB (Spesifik Alt Kategori)\n")
    f.write("CONCEPT'ten daha spesifik:\n")
    f.write("- `HEAD_TOP` = başın tepesi\n")
    f.write("- `HEAD_SELF` = kendi başına\n")
    f.write("- ...\n\n")
    
    f.write("### 3. AİLE (Ana Anlamsal Grup)\n")
    f.write("Şu 4 kategoriden birini seç veya yeni ekle:\n")
    f.write("- `Baş & Kafa`\n")
    f.write("- `Üst & Üzeri`\n")
    f.write("- `Kendi & Öz`\n")
    f.write("- `BAŞKA` (sen karar ver)\n\n")
    
    f.write("### 4. ROOT\n")
    f.write("Sabit: `щхьэ-`\n\n")
    
    f.write("## ÖRNEK\n\n")
    f.write("| FORM | ANLAM | CONCEPT | SUB | AİLE | ROOT |\n")
    f.write("|------|-------|---------|-----|------|------|\n")
    f.write("| щхьэ | baş | HEAD | HEAD | Baş & Kafa | щхьэ- |\n")
    f.write("| щхьэгу | tepe | TOP | HEAD_TOP | Baş & Kafa | щхьэ- |\n")
    f.write("| щхьэхуэ | ayrı | SELF | SEPARATE | Kendi & Öz | щхьэ- |\n\n")
    
    f.write("## NOTLAR\n")
    f.write("- Yorumları **Türkçe** yaz\n")
    f.write("- Anlam bilinmiyorsa `?` bırak, ama CONCEPT/AİLE tahmin et\n")
    f.write("- Yeni CONCEPT/AİLE eklemekten çekinme\n\n")
    
    f.write("=" * 100 + "\n")
    f.write(f"## SINIFLANDIRILACAK KELİMELER ({len(shkhe)} kayıt)\n")
    f.write("=" * 100 + "\n\n")
    
    # 30'arlı gruplar
    GRUP = 30
    gruplar = [shkhe[i:i+GRUP] for i in range(0, len(shkhe), GRUP)]
    
    for i, grup in enumerate(gruplar, 1):
        f.write(f"\n### GRUP {i}/{len(gruplar)} ({len(grup)} kayıt)\n\n")
        f.write("| FORM | ANLAM | CONCEPT | SUB | AİLE | ROOT |\n")
        f.write("|------|-------|---------|-----|------|------|\n")
        for l in grup:
            form = l.get("form", "?")
            anlam = (l.get("literalMeaning") or "?")[:50].replace("|", "/")
            f.write(f"| {form} | {anlam} | ? | ? | ? | щхьэ- |\n")
        f.write("\n")
    
    f.write("\n" + "=" * 100 + "\n")
    f.write("SON\n")
    f.write("=" * 100 + "\n")

print(f"OK - SHKHE_MIMARA.txt olusturuldu")
print(f"Toplam: {len(shkhe)} kayit")
print(f"Grup sayisi: {len(gruplar)}")
print()
print("Dosya boyutu:")
import os
boyut = os.path.getsize("_scripts/SHKHE_MIMARA.txt")
print(f"  {boyut:,} byte ({boyut/1024:.1f} KB)")
