import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hae = next((l for l in lex if l.get("form") == "хьэ"), None)
if hae:
    print("=== хьэ kaydı ===")
    print(json.dumps(hae, ensure_ascii=False, indent=2)[:2000])
