import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# унэ kayıtlarını bul
print("=== унэ KAYITLARI ===")
for l in lex:
    if l.get("form") == "унэ":
        print(json.dumps(l, ensure_ascii=False, indent=2))
        print("---")
