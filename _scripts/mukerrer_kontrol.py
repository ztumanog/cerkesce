from collections import Counter
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

lcorpus = [l for l in lex if l.get("id", "").startswith("L-CORPUS")]
print(f"Toplam L-CORPUS: {len(lcorpus)}")

ids = [l.get("id") for l in lcorpus]
sayac = Counter(ids)

print("\nMukerrer ID'ler (ilk 20):")
mukerrer = [(id_, sayi) for id_, sayi in sayac.items() if sayi > 1]
print(f"Toplam mukerrer ID cesidi: {len(mukerrer)}")

for id_, sayi in sorted(mukerrer, key=lambda x: -x[1])[:20]:
    print(f"  {id_}: {sayi} kez")
