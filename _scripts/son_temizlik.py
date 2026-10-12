import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Genişletilmiş Rusça gramer kısaltmaları
RU_GRAMMAR = [
    r'перех\.\s*гл\.',
    r'неперех\.\s*гл\.',
    r'неперех\.',
    r'\bгл\.',
    r'опред\.\s*мест\.',
    r'неопред\.\s*мест\.',
    r'вопросит\.\s*мест\.',
    r'указат\.\s*мест\.',
    r'притяж\.\s*мест\.',
    r'мест\.',
    r'нареч\.',
    r'частица',
    r'послелог',
    r'вводн\.\s*сл\.',
    r'сущ\.',
    r'прил\.',
    r'числ\.',
    r'союз',
    r'предлог',
    r'межд\.',
    r'см\.',           # "см." (bakınız)
    r'\bне\b',         # Yanlışlıkla kalan "не"
]

def temizle_anlam(anlam: str) -> str:
    if not anlam:
        return anlam

    text = str(anlam)

    # 1. HTML etiketlerini temizle
    text = re.sub(r'<[^>]+>', ' ', text)

    # 2. Rusça gramer kısaltmalarını temizle
    for pattern in RU_GRAMMAR:
        text = re.sub(pattern, ' ', text, flags=re.IGNORECASE)

    # 3. Roma rakamlarını temizle (I, II, III)
    text = re.sub(r'\b[IVX]+\b', ' ', text)

    # 4. Parantez içi çekim eklerini temizle: (мэжей), (тофыхь)
    text = re.sub(r'\([^)]*\)', ' ', text)

    # 5. Sadece rakamlardan oluşan anlamları temizle
    text = re.sub(r'^\s*\d+\s*\.?\s*', '', text)

    # 6. Fazla boşlukları temizle
    text = re.sub(r'\s+', ' ', text).strip()

    # 7. Baştaki/sondaki noktalama işaretlerini temizle
    text = re.sub(r'^[\s,;:.\-–—]+', '', text)
    text = re.sub(r'[\s,;:.\-–—]+$', '', text)

    # 8. İlk noktadan sonrasını kırp (uzun açıklamalar için)
    #    Örn: "спать; заснуть" → "спать"
    #    Ama sadece ilk anlamı al, gerisini at
    if len(text) > 60:
        # İlk noktalı virgül veya noktayı bul
        match = re.search(r'[;.]', text)
        if match and match.start() > 10:
            text = text[:match.start()].strip()

    # 9. Çok uzunsa kırp
    if len(text) > 80:
        text = text[:80].rsplit(' ', 1)[0] + '…'

    return text

# Tüm lexemes'i temizle (sadece ANIMAL değil, tümü)
duzeltme = 0
for l in lex:
    eski = l.get("literalMeaning") or ""
    yeni = temizle_anlam(eski)
    if yeni != eski:
        l["literalMeaning"] = yeni
        duzeltme += 1

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== SON TEMİZLİK RAPORU ===")
print(f"Temizlenen kayıt: {duzeltme}\n")

# Kalan 4 kirli kaydı kontrol et
print("=== KALAN KİRLİ KAYITLAR ===")
kirli = []
for l in lex:
    anlam = l.get("literalMeaning") or ""
    if re.search(r'<[^>]+>|нареч\.|частица|послелог|вводн\.|перех\.|неперех\.|мест\.|сущ\.|прил\.|\bне\b', anlam):
        kirli.append((l.get("form"), anlam[:80]))

if kirli:
    for form, anlam in kirli[:20]:
        print(f"  {form:20s} → {anlam}")
else:
    print("  ✅ Hiç kirli kayıt kalmadı!")
