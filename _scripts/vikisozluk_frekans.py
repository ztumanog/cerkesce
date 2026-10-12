import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-TYRCU": 99, "L-URYS": 416, "L-KEZHER": 12, "L-SHESHEN": 58,
    "L-ABKHAZ": 37, "L-KURZHY": 21, "L-KALMYK": 61,
    "L-BLANE": 155, "L-DYGHUZH": 147, "L-BLE": 3831, "L-KARGHE": 5, "L-ZHYNDU": 24,
    "L-DZEL": 204, "L-BZHEY": 15, "L-K1EY": 135, "L-BEREZHEY": 30,
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
