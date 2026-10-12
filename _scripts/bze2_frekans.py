import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-SHABZE": 83,
    "L-BZASH1E": 84,
    "L-SHCHABZ": 42,
    "L-SHABZEPSE": 4,
    "L-SHABZEBZE": 1,
    "L-BZASH1EPSE": 0,
    "L-BZE2": 0,      # бзэ (yay) — homonim, ayrı sayılamaz
    "L-KUBZE": 0,     # кубзэ
    "L-PSHCHYNE1AKUE": 0,  # пщынэӀакъу
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        eski = l.get("corpusFrequency", 0) or 0
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1
        print(f"{l['id']:20s} {l['form']:15s} {eski:>4} -> {freq_map[l['id']]:>4}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")
