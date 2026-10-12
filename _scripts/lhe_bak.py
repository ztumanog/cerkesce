import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

for l in lex:
    form = l.get("form", "")
    if normalize(form).startswith("лъ") and not normalize(form).startswith("лъэ"):
        concept = l.get("conceptId") or ""
        sub = l.get("subConceptId") or ""
        if concept in ("BELIRSIZ", "-", "", "COLOR") or sub in ("-", ""):
            print(f"FORM: {repr(form)}")
            print(f"CPS:  {' '.join(hex(ord(c)) for c in form)}")
            print(f"Anlam: {l.get('literalMeaning')}")
            print(f"conceptId: {l.get('conceptId')}")
