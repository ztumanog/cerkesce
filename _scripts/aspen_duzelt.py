import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

for l in lex:
    if l["id"] == "L-PKHEZHABE2":
        l["form"] = "пхъэщабэ"
        l["literalMeaning"] = "titrek kavak (aspen)"
        l["notes"] = "C-11.3: titrek kavak. Dogru form: пхъэщабэ. Vikisozluk."
        print(f"Duzeltildi: L-PKHEZHABE2 -> {l['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
