import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-ANEKUESHH": 167, "L-ADEKUESHH": 11,
    "L-TYSHYPHUE": 6, "L-NYSHYPHUE": 8,
    "L-DELHXU": 102, "L-NYSE": 195,
    "L-MALHXE": 44, "L-SHYQHUANE": 1,
    "L-SHYQHUKH": 0, "L-MELHXEGHU": 0,
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
