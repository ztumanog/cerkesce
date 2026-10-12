import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

for l in lex:
    if l["id"] == "L-PYUDYN":
        l["corpusFrequency"] = 73
        l["notes"] = "C-11.3: ucunu koparmak (gecisli). Korpus: 73."
        print("L-PYUDYN guncellendi: 73")
    if l["id"] == "L-PYUDYN2":
        l["corpusFrequency"] = 8
        l["notes"] = "C-11.3: ucu kopmak (gecissiz). Korpus: 8 (piudash)."
        print("L-PYUDYN2 guncellendi: 8")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
