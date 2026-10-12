import json
from pathlib import Path
from collections import Counter

LEX_PATH = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX_PATH.read_text(encoding="utf-8"))

# Mükerrer ID'leri bul
id_dagilim = Counter(l.get("id") for l in lex if l.get("id"))
mukerrer = {id: s for id, s in id_dagilim.items() if s > 1}

# Her mükerrer ID'ye suffix ekle
sayac = Counter()
duzeltilen = 0

for l in lex:
    kid = l.get("id")
    if kid in mukerrer:
        sayac[kid] += 1
        if sayac[kid] > 1:
            # İlk kayıt aynı kalır, sonrakilere suffix ekle
            l["id"] = f"{kid}-{sayac[kid]}"
            duzeltilen += 1

LEX_PATH.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Kontrol
id_dagilim2 = Counter(l.get("id") for l in lex if l.get("id"))
mukerrer2 = {id: s for id, s in id_dagilim2.items() if s > 1}

print(f"=== MÜKERRER ID DÜZELTME ===")
print(f"Düzeltilen: {duzeltilen}")
print(f"Kalan mükerrer: {len(mukerrer2)}")
