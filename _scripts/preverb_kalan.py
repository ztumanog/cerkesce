import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=== R-DA (да/дэ) kalan 20 ===")
da = [l for l in lex if "R-DA" in (l.get("rootIds") or [])]
for l in da[:20]:
    print(f"  {l.get('form', '?'):20s} rootIds={l.get('rootIds')}")

print(f"\n=== R-NA (нэ) kalan 20 ===")
na = [l for l in lex if "R-NA" in (l.get("rootIds") or [])]
for l in na[:20]:
    print(f"  {l.get('form', '?'):20s} rootIds={l.get('rootIds')}")
