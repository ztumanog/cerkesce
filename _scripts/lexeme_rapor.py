import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

toplam = len(lex)
rare = len([l for l in lex if l.get("status") == "rare"])
morpheme = len([l for l in lex if l.get("status") == "morpheme"])
active = toplam - rare - morpheme

print("=== LEXEME RAPORU ===")
print(f"Toplam: {toplam}")
print(f"Aktif: {active}")
print(f"Rare: {rare}")
print(f"Morpheme: {morpheme}")
