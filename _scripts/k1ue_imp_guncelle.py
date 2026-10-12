import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

for l in lex:
    if l["id"] == "L-K1UE-IMP":
        l["ipa"] = "/kʹʷɐ/"
        l["notes"] = "C-11.3: git! emir kipi. кӀуэн fiilinden. Deyimler: кӀуэ пэтми, КӀуэ сытми. Korpus: 18203."
        print("L-K1UE-IMP guncellendi: кӀуэ (git!)")
        break

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
