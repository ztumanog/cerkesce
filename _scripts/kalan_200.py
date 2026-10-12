import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

print(f"Toplam boş: {len(bos)}")
print()
for l in bos:
    print(l.get("form"))
