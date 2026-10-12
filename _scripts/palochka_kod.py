import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Sorunlu formları bul
sorunlu = ["нэщӏ", "нэкӏым", "нэӏэ", "нэпитӏу", "нэӏуасэ", "нэкӏ", "нэщӏу"]

for s in sorunlu:
    for l in lex:
        if l.get("form") == s:
            form = l.get("form")
            codepoints = " ".join(hex(ord(c)) for c in form)
            print(f"FORM: {repr(form)}")
            print(f"  codepoints: {codepoints}")
            print(f"  len: {len(form)}")
            print()
            break
