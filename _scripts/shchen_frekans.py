import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-SHCHEN": 3096,        # щэн (satmak)
    "L-SHCHEN-IMP": 20161,   # щэ (sat! emir)
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        eski = l.get("corpusFrequency", 0) or 0
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1
        print(f"{l['id']:20s} {l['form']:10s} {eski:>6} -> {freq_map[l['id']]:>6}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
