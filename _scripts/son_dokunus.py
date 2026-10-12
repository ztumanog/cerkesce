import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

def son_temizlik(anlam: str) -> str:
    if not anlam:
        return anlam

    text = str(anlam)

    # 1. HTML etiketlerini temizle
    text = re.sub(r'<[^>]+>', ' ', text)

    # 2. Tek başına "перех." ve "неперех." temizle
    text = re.sub(r'\bперех\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bнеперех\.', ' ', text, flags=re.IGNORECASE)

    # 3. Diğer gramer kısaltmaları
    text = re.sub(r'\bгл\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bмест\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bнареч\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bчастица\b', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bпослелог\b', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bвводн\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bсущ\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bприл\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bчисл\.', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bсоюз\b', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bпредлог\b', ' ', text, flags=re.IGNORECASE)
    text = re.sub(r'\bмежд\.', ' ', text, flags=re.IGNORECASE)

    # 4. "1)", "2)" gibi numaralandırmaları temizle
    text = re.sub(r'\b\d+\)\s*', ' ', text)

    # 5. Roma rakamlarını temizle
    text = re.sub(r'\b[IVX]+\b', ' ', text)

    # 6. Parantez içi çekim eklerini temizle
    text = re.sub(r'\([^)]*\)', ' ', text)

    # 7. Fazla boşlukları temizle
    text = re.sub(r'\s+', ' ', text).strip()

    # 8. Baştaki/sondaki noktalama işaretlerini temizle
    text = re.sub(r'^[\s,;:.\-–—]+', '', text)
    text = re.sub(r'[\s,;:.\-–—]+$', '', text)

    # 9. İlk anlamı al (noktalı virgül veya noktadan sonrasını kırp)
    match = re.search(r'[;.]', text)
    if match and match.start() > 5:
        text = text[:match.start()].strip()

    return text

# Tüm lexemes'i temizle
duzeltme = 0
for l in lex:
    eski = l.get("literalMeaning") or ""
    yeni = son_temizlik(eski)
    if yeni != eski:
        l["literalMeaning"] = yeni
        duzeltme += 1

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== SON TEMİZLİK RAPORU ===")
print(f"Temizlenen kayıt: {duzeltme}\n")

# Kalan kirli kayıtları kontrol et
kirli = []
for l in lex:
    anlam = l.get("literalMeaning") or ""
    if re.search(r'<[^>]+>|нареч\.|частица|послелог|вводн\.|перех\.|неперех\.|мест\.|сущ\.|прил\.', anlam):
        kirli.append((l.get("form"), anlam[:80]))

if kirli:
    print(f"=== KALAN KİRLİ KAYITLAR ({len(kirli)}) ===")
    for form, anlam in kirli[:20]:
        print(f"  {form:20s} → {anlam}")
else:
    print("  ✅ Hiç kirli kayıt kalmadı! Temizlik tamamlandı.")

# Örnek çıktı
print("\n=== ÖRNEK TEMİZ ANLAMLAR ===")
for l in lex[:10]:
    form = l.get("form") or "?"
    anlam = l.get("literalMeaning") or "—"
    print(f"  {form:20s} → {anlam}")
