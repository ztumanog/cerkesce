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
    if normalize(form) == "гуэбэн":
        print(f"FORM: {form}")
        print(f"conceptId: {l.get('conceptId')}")
        print(f"subConceptId: {l.get('subConceptId')}")
        print(f"taxonomyFamily: {l.get('taxonomyFamily')}")
        print(f"rootForm: {l.get('rootForm')}")
