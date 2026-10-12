import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Homonim lemma tanimlari
homonimler = {
    "L-SHE": "LEMMA-SHE", "L-SHE2": "LEMMA-SHE",
    "L-BZE": "LEMMA-BZE", "L-BZE2": "LEMMA-BZE",
    "L-SHHE": "LEMMA-SHHE", "L-SHCHEN": "LEMMA-SHCHEN",
}

eklenen = 0
for l in lex:
    if l["id"] in homonimler:
        l["lemmaId"] = homonimler[l["id"]]
        eklenen += 1
        print(f"Eklendi: {l['id']} -> {homonimler[l['id']]}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nLemma ID eklenen: {eklenen}")
