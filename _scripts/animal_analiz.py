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

# Mükerrer kayıtları bul (aynı form)
form_dagilim = Counter(l.get("form") or "?" for l in animal_kayitlar)
mukerrer = {f: s for f, s in form_dagilim.items() if s > 1}
print(f"\n--- MÜKERRER KAYITLAR ({len(mukerrer)} farklı form) ---")
for f, s in sorted(mukerrer.items(), key=lambda x: -x[1])[:20]:
    print(f"  {f:20s} {s} kez")

# İlk 50 kaydı göster
print(f"\n--- İLK 50 KAYIT ---")
for i, l in enumerate(animal_kayitlar[:50], 1):
    form = l.get("form") or "?"
    pos = l.get("partOfSpeech") or "—"
    meaning = (l.get("literalMeaning") or "—")[:50]
    print(f"  {i:4d}. {form:20s} [{pos:15s}] → {meaning}")
