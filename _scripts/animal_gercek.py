import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# ANIMAL kategorisindeki kayıtları incele
animal_kayitlar = [l for l in lex if l.get("conceptId") == "ANIMAL"]

print(f"=== ANIMAL KATEGORİSİ ({len(animal_kayitlar)} kayıt) ===\n")

# POS dağılımı
pos_dagilim = Counter(l.get("partOfSpeech") or "—" for l in animal_kayitlar)
print("--- POS DAĞILIMI ---")
for pos, sayi in pos_dagilim.most_common():
    print(f"  {pos:20s} {sayi:5d}")

print("\n--- İLK 50 KAYIT ---")
for i, l in enumerate(animal_kayitlar[:50], 1):
    form = l.get("form") or "?"
    pos = l.get("partOfSpeech") or "—"
    meaning = (l.get("literalMeaning") or "—")[:40]
    print(f"  {i:4d}. {form:20s} [{pos:15s}] → {meaning}")
