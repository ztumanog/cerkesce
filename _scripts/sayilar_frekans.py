import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-ZY": 76362, "L-T1U": 3366, "L-SHCHY": 64367, "L-PL1Y": 439,
    "L-TKHU": 1177, "L-KHY2": 25349, "L-BLY": 892, "L-I": 976619,
    "L-BGHU": 3542, "L-PSHCH1Y": 1405,
    "L-T1OSHCH": 212, "L-SHCHESHCH": 91, "L-PL1YSHCH": 109,
    "L-TKHUSHCH": 39, "L-KHYSHCH": 80, "L-BLYSHCH": 45,
    "L-ISHCH": 3992, "L-BGHUSHCH": 35,
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
