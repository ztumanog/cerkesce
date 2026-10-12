import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Mükerrer ID'leri bul
id_dagilim = Counter(l.get("id") for l in lex if l.get("id"))
mukerrer = {id: s for id, s in id_dagilim.items() if s > 1}

print(f"=== MÜKERRER ID: {len(mukerrer)} ===\n")
for id, s in sorted(mukerrer.items(), key=lambda x: -x[1])[:20]:
    print(f"  {id:25s} {s} kez")

# Toplam mükerrer kayıt
print(f"\nToplam mükerrer kayıt: {sum(s-1 for s in mukerrer.values())}")
