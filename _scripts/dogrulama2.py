import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

rare = [l for l in lex if l.get("status") == "rare"]
morpheme = [l for l in lex if l.get("status") == "morpheme"]
active = [l for l in lex if l.get("status") not in ["rare", "morpheme"]]

print("=== LEXEME DAGILIMI ===")
print(f"Toplam: {len(lex)}")
print(f"Aktif: {len(active)}")
print(f"Rare: {len(rare)}")
print(f"Morpheme: {len(morpheme)}")
print(f"\n532 aktif mi? {'EVET' if len(active) == 532 else 'HAYIR'}")
