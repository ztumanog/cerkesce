import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# псэк ile başlayan tüm formları bul
print("псэк ile baslayan formlar:")
print("=" * 60)
for l in lex:
    form = l.get("form", "")
    if form.startswith("псэк") or form.startswith("псэӀ"):
        codepoints = " ".join(hex(ord(c)) for c in form)
        print(f"form: {repr(form)}")
        print(f"  codepoints: {codepoints}")
        print(f"  conceptId: {l.get('conceptId')}")
        print()
