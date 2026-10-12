import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

lcorpus = [l for l in lex if l.get("id", "").startswith("L-CORPUS")]
print(f"Toplam L-CORPUS: {len(lcorpus)}")

# ID ornekleri
print("\nIlk 5:")
for l in lcorpus[:5]:
    print(f"  {l.get('id')}")

print("\nSon 5:")
for l in lcorpus[-5:]:
    print(f"  {l.get('id')}")

# ID uzunluklari
uzunluklar = Counter(len(l.get("id", "")) for l in lcorpus)
print(f"\nID uzunluk dagilimi:")
for uz, sayi in sorted(uzunluklar.items()):
    print(f"  {uz} karakter: {sayi} kayit")

# ID prefix dagilimi
prefixler = Counter(l.get("id", "").rsplit("-", 1)[0] if "-" in l.get("id", "") else l.get("id", "") for l in lcorpus)
print(f"\nID prefix dagilimi (ilk 10):")
for p, s in sorted(prefixler.items(), key=lambda x: -x[1])[:10]:
    print(f"  {p}: {s}")
