import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Yanlis formlari duzelt
duzeltmeler = {
    "L-DESHXUEY": {"form": "дае", "literalMeaning": "ceviz agaci", "corpusFrequency": 0},
    "L-BZHYXHU": {"form": "бзииху", "literalMeaning": "ihlamur", "corpusFrequency": 0},
    "L-DEGHUNDE": {"form": "жэгундэ", "literalMeaning": "pancar", "corpusFrequency": 0},
    "L-K1EBYSTE": {"form": "къэбыстэ", "literalMeaning": "lahana", "corpusFrequency": 0},
    "L-ZANTKHE": {"form": "зэнтхъ", "literalMeaning": "yulaf", "corpusFrequency": 0},
}

for l in lex:
    if l["id"] in duzeltmeler:
        g = duzeltmeler[l["id"]]
        for k, v in g.items():
            l[k] = v
        print(f"Duzeltildi: {l['id']} -> {l['form']} ({l['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
