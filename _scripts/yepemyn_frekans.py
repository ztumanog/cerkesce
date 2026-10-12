import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-PEMYN": 23,
    "L-YEPEMYN": 14,
    "L-KHEPEMEN": 3,
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1
        print(f"{l['id']:20s} {l['form']:15s} -> {freq_map[l['id']]}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")

active = [l for l in lex if l.get("status") != "rare"]
with_corpus = sum(1 for l in active if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage (active): {with_corpus/len(active)*100:.1f}%")
print(f"Toplam lexeme: {len(lex)}")
