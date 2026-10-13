import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

print(f"\n=== Kalan 30 ===")
for l in kalan[:30]:
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    meaning = l.get("literalMeaning", "")[:40] if l.get("literalMeaning") else "-"
    print(f"  {form:25s} | {pos:15s} | {meaning}")
