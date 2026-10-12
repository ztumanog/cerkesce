import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Temel kelime frekanslari (gercek korpus degerleri)
freq_map = {
    "L-SH1EN": 2227,      # шӀэн (bilmek)
    "L-TKHEN": 984,       # тхэн (yazmak)
    "L-YEDZHEN": 662,     # еджэн (okumak)
    "L-TSY": 3468,        # цы (sac)
    "L-PQY": 2738,        # пкъы (kemik)
    "L-LHY": 15827,       # лъы (kan)
    "L-SHHO": 6967,       # шъо (deri)
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        eski = l.get("corpusFrequency", "?")
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1
        print(f"{l['id']:20s} {l['form']:10s} {eski:>6} -> {freq_map[l['id']]:>6}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
