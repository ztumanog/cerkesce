import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=== R-NA son durum ===")
na = [l for l in lex if "R-NA" in (l.get("rootIds") or [])]
for l in na[:10]:
    print(f"  {l.get('form', '?'):20s} rootIds={l.get('rootIds')}")

print(f"\nR-NA toplam: {len(na)}")
print(f"R-DA toplam: {len([l for l in lex if 'R-DA' in (l.get('rootIds') or [])])}")

# rootIds dolu toplam
rootlu = [l for l in lex if l.get("rootIds")]
print(f"\nrootIds dolu: {len(rootlu)}")
