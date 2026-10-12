import json
import re
from pathlib import Path

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Rusça gramer kısaltmaları → POS eşlemesi
RU_POS_MAP = {
    r'перех\.\s*гл\.': 'verb',
    r'неперех\.\s*гл\.': 'verb',
    r'\bгл\.': 'verb',
    r'мест\.': 'pronoun',
    r'нареч\.': 'adverb',
    r'частица': 'particle',
    r'послелог': 'postposition',
    r'вводн\.\s*сл\.': 'interjection',
    r'сущ\.': 'noun',
    r'прил\.': 'adjective',
    r'числ\.': 'numeral',
    r'союз': 'conjunction',
}

# Düzeltme sayacı
duzeltme = 0
degisiklikler = []

for l in lex:
    if l.get("conceptId") != "ANIMAL":
        continue

    eski_pos = l.get("partOfSpeech")
    if eski_pos != "noun":
        continue  # Sadece noun olanları düzelt

    meaning = l.get("literalMeaning") or ""
    yeni_pos = None

    # Rusça kısaltmaları ara
    for pattern, pos in RU_POS_MAP.items():
        if re.search(pattern, meaning, re.IGNORECASE):
            yeni_pos = pos
            break

    if yeni_pos and yeni_pos != eski_pos:
        l["partOfSpeech"] = yeni_pos
        duzeltme += 1
        degisiklikler.append((l.get("form"), eski_pos, yeni_pos, meaning[:60]))

# Kaydet
LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"=== DÜZELTME RAPORU ===")
print(f"Toplam düzeltilen kayıt: {duzeltme}\n")
print(f"{'Form':20s} {'Eski':10s} {'Yeni':12s} {'Anlam'}")
print("-" * 90)
for form, eski, yeni, anlam in degisiklikler[:50]:
    print(f"{form:20s} {eski:10s} {yeni:12s} {anlam}")
