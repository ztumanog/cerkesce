import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
bos = [l for l in lex if not l.get("ipa")]

print(f"IPA'siz kalan: {len(bos)}")
for i, l in enumerate(bos, 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    print(f"  {i}. {form:25s} | {pos}")
