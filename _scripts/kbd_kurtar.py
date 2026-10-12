import json
import re
import shutil
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")

# 1. Kaynak dosya
SRC = BASE / "public/data/18.Kbd-Ru&En.json"
# 2. Hedef dosya
LEX = BASE / "public/data/linguistic/lexemes.json"
# 3. Yedek
BAK = BASE / "public/data/linguistic/lexemes.json.bak-kbd-kurtar"

# Kaynak yükle
print("Kaynak yukleniyor...")
src = json.loads(SRC.read_text(encoding="utf-8"))
w = src["words"]
print(f"Kaynak kelime sayisi: {len(w)}")

# Lexemes yükle
print("Lexemes yukleniyor...")
lex = json.loads(LEX.read_text(encoding="utf-8"))
print(f"Lexemes toplam: {len(lex)}")

# Yedek al
if not BAK.exists():
    shutil.copy(LEX, BAK)
    print(f"Yedek alindi: {BAK}")
else:
    print(f"Yedek zaten var: {BAK}")

# POS esleme
POS_MAP = {
    "гл.": "verb",
    "нареч.": "adverb",
    "междом.": "interjection",
    "мест.": "pronoun",
}

# Anlamdan POS cikar
def extract_pos(meaning):
    for ru, en in POS_MAP.items():
        if ru in meaning:
            return en
    return "noun"  # default

# Anlamdan Ingilizce kismi cikar
# Format: "Rusca anlam (English meaning)"  veya  "Rusca anlam"
def extract_en(meaning):
    # Son parantez grubunu al
    m = re.findall(r'\(([^()]+)\)\s*$', meaning)
    if m:
        return m[-1].strip()
    return meaning.strip()

# Islem
sayac = 0
atlanan = 0
bulunamayan = 0

for l in lex:
    if not l.get("id", "").startswith("L-KBD-"):
        continue

    form = l.get("form", "")
    if form not in w:
        bulunamayan += 1
        continue

    # Zaten dolu ise atla (guvenlik)
    if l.get("literalMeaning") and l.get("partOfSpeech"):
        atlanan += 1
        continue

    kayit = w[form]
    defs = kayit.get("definitions", [])
    if not defs:
        atlanan += 1
        continue

    anlam_ru = defs[0].get("meaning", "")
    if not anlam_ru:
        atlanan += 1
        continue

    # Anlami ayikla
    en_anlam = extract_en(anlam_ru)
    pos = extract_pos(anlam_ru)

    # Sadece bos olanlari doldur
    if not l.get("literalMeaning"):
        l["literalMeaning"] = en_anlam
    if not l.get("partOfSpeech"):
        l["partOfSpeech"] = pos

    sayac += 1

print("=" * 60)
print(f"Guncellenen       : {sayac}")
print(f"Zaten dolu atlanan: {atlanan}")
print(f"Kaynakta bulunmayan: {bulunamayan}")
print("=" * 60)

# Yaz
LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Yazildi: {LEX}")