import json
from pathlib import Path
from collections import Counter

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# ANIMAL kategorisindeki kayıtları incele
animal_kayitlar = [l for l in lex if l.get("isLemma") and l.get("conceptId") == "ANIMAL"]

print(f"=== ANIMAL KATEGORİSİ: {len(animal_kayitlar)} kayıt ===\n")

# POS dağılımı
pos_dagilim = Counter(l.get("partOfSpeech") or "—" for l in animal_kayitlar)
print("--- POS DAĞILIMI ---")
for pos, sayi in pos_dagilim.most_common():
    print(f"  {pos:20s} {sayi:5d}")

# İlk 30 kayıt
print("\n--- İLK 30 KAYIT ---")
for i, l in enumerate(animal_kayitlar[:30], 1):
    form = l.get("form") or "?"
    pos = l.get("partOfSpeech") or "—"
    tr = l.get("translations", {}).get("tr") or l.get("literalMeaning") or "—"
    print(f"  {i:4d}. {form:20s} [{pos:12s}] → {tr[:40]}")
