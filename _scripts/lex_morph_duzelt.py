import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Eksik morphemeIds
duzeltmeler = {
    "L-GUPSYSE": ["M-GU", "M-PSYSE"],
    "L-GURYYUEN": ["M-GU", "M-RY", "M-1UE", "M-N"],
    "L-PEPLEN": ["M-PE3", "M-PLHE", "M-N"],
    "L-1ERYSH1": ["M-1E", "M-RY", "M-SH1E"],
}

for l in lex:
    if l["id"] in duzeltmeler:
        if not l.get("derivation"):
            l["derivation"] = {}
        l["derivation"]["morphemeIds"] = duzeltmeler[l["id"]]
        print(f"Duzeltildi: {l['id']} -> {duzeltmeler[l['id']]}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
