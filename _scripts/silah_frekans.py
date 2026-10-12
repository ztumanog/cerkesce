import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-SHE2": 17073,
    "L-ZAQUE": 1106,
    "L-FOCH": 221,
    "L-SHEZAQUEURYUE": 1,
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1
        print(f"Guncellendi: {l['id']} - {l['form']} -> {freq_map[l['id']]}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")
