import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

for l in lex:
    form = l.get("form", "")
    if (form.startswith("лӀы") or form.startswith("лӏы") or form.startswith("лIы")) and not l.get("subConceptId"):
        print(f"FORM: {repr(form)}")
        print(f"CPS:  {' '.join(hex(ord(c)) for c in form)}")
        print(f"Anlam: {l.get('literalMeaning')}")
