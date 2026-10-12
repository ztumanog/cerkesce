import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

duzeltmeler = {
    "L-UNEK1UESHCH": {"form": "унэкъуэщ", "literalMeaning": "ayni soyadli akraba",
                      "notes": "C-11.4: dogru form."},
}

for l in lex:
    if l["id"] in duzeltmeler:
        g = duzeltmeler[l["id"]]
        for k, v in g.items():
            l[k] = v
        print(f"Duzeltildi: {l['id']} -> {l['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
