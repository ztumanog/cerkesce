import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=== TETE/DADE/ADE AILE ===")
for l in lex:
    lid = l.get("id", "")
    form = l.get("form", "")
    if "TETE" in lid or "DADE" in lid or "тэтэ" in form or "дадэ" in form:
        print(f"  {lid:25} {form:20} {l.get('literalMeaning','')}")
        print(f"    ADY={l.get('dialectVariants',{}).get('adyghe','')} KBD={l.get('dialectVariants',{}).get('kabardian','')}")
