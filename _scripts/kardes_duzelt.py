import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# ZADELHXUEZESHYPHU kaydini duzelt
for l in lex:
    if l["id"] == "L-ZADELHXUEZESHYPHU":
        l["form"] = "зэдэлъхуэзэшыпхъу"
        l["literalMeaning"] = "kardes (erkek+kiz, birbirinin)"
        l["notes"] = "C-11.3: kardes (erkek+kiz). зэ + дэлъху + зэ + шыпхъу. Bilesik."
        print(f"Duzeltildi: L-ZADELHXUEZESHYPHU -> {l['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
