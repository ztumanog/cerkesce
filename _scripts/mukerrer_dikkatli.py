import json
from pathlib import Path
from collections import defaultdict

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Sadece TAM AYNI olanlari mukerrer say
gruplar = defaultdict(list)
for l in lex:
    form = l.get("form", "")
    cid = l.get("conceptId", "")
    anlam = l.get("literalMeaning", "")
    key = f"{form}|{cid}|{anlam}"
    gruplar[key].append(l)

silinen = 0
for key, kayitlar in gruplar.items():
    if len(kayitlar) > 1:
        en_iyi = max(kayitlar, key=lambda x: sum(1 for v in x.values() if v))
        for l in kayitlar:
            if l is not en_iyi:
                lex.remove(l)
                silinen += 1

print(f"Silinen (tam mukerrer): {silinen}")
print(f"Toplam lexeme: {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Kontrol
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]
print(f"\nщы-: {len(shchy)}")
print(f"DOLU: {len(dolu)}")
print(f"BOS: {len(bos)}")
