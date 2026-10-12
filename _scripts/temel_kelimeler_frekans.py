import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-PLHYZH": 542, "L-KHUZH": 468, "L-F1YC1E": 309, "L-SHHXHUE": 671,
    "L-UDZYFE": 39, "L-GHUEZHY": 148, "L-GHUABZHE": 51, "L-MORAFE": 10,
    "L-TKHEMAKHUE": 240, "L-BLYSHCHE": 22, "L-GHUBZH": 4,
    "L-BEREZHEY2": 30, "L-MEKHUAUE": 17, "L-MEKHUGHUE": 0, "L-SHEBET": 205,
    "L-MAKHUE": 3047, "L-MAZE": 622, "L-ILHES": 1972, "L-GHE": 158744,
    "L-ZHESHCH": 1291, "L-PSHCHEDDZHYZH": 287, "L-PSHCHYKHESHCH": 297,
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
