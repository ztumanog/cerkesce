import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam lexeme: {len(lex)}")
print(f"768 mi? {'EVET' if len(lex) == 768 else 'HAYIR'}")
