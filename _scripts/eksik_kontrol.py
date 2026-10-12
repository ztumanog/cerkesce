import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# L-CORPUS kayıtlarını listele
lcorpus = [l for l in lex if l.get("id", "").startswith("L-CORPUS")]
print(f"Toplam L-CORPUS: {len(lcorpus)}")

# ID'leri sıralı kontrol et
ids = sorted([int(l.get("id", "").replace("L-CORPUS-", "")) for l in lcorpus if l.get("id", "").startswith("L-CORPUS-")])

print(f"\nİlk 10 ID: {ids[:10]}")
print(f"Son 10 ID: {ids[-10:]}")

# Eksik ID'leri bul
for i in range(1, max(ids) + 1):
    if i not in ids:
        print(f"\n🔴 EKSIK: L-CORPUS-{i}")
