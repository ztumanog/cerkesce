import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# хьэдэгъуэдахэ'yi bul
for l in lex:
    form = l.get("form", "")
    if "хьэдэгъу" in form and "дахэ" in form:
        codepoints = " ".join(hex(ord(c)) for c in form)
        print(f"FORM: {repr(form)}")
        print(f"Codepoints: {codepoints}")
        print(f"Anlam: {l.get('literalMeaning')}")
        print()
    elif form.startswith("хьэдэгъу"):
        codepoints = " ".join(hex(ord(c)) for c in form)
        print(f"YAKIN: {repr(form)}")
        print(f"Codepoints: {codepoints}")
        print(f"Anlam: {l.get('literalMeaning')}")
        print()
