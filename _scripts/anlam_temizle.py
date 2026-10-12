import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Rusça gramer kısaltmaları (temizlenecek)
RU_GRAMMAR = [
    r'перех\.\s*гл\.',
    r'неперех\.\s*гл\.',
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
    text = re.sub(r'^\s*[IVX]+\s+', '', text)

    # 4. Fazla boşlukları temizle
    text = re.sub(r'\s+', ' ', text).strip()

    # 5. Baştaki/sondaki noktalama işaretlerini temizle
    text = re.sub(r'^[\s,;:.\-–—]+', '', text)
    text = re.sub(r'[\s,;:.\-–—]+$', '', text)

    return text

# ANIMAL kategorisindeki kayıtları temizle
duzeltme = 0
for l in lex:
    if l.get("conceptId") != "ANIMAL":
        continue

    eski = l.get("literalMeaning") or ""
    yeni = temizle_anlam(eski)

    if yeni != eski:
        l["literalMeaning"] = yeni
        duzeltme += 1

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== ANLAM TEMİZLEME RAPORU ===")
print(f"Temizlenen kayıt: {duzeltme}\n")

# Örnekleri göster
print(f"{'Form':20s} {'Eski Anlam':45s} {'Yeni Anlam'}")
print("-" * 110)
ornekler = [l for l in lex if l.get("conceptId") == "ANIMAL"][:30]
for l in ornekler:
    form = l.get("form") or "?"
    anlam = (l.get("literalMeaning") or "—")[:40]
    print(f"{form:20s} {anlam:45s}")
