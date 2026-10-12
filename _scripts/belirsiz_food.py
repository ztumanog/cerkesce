import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

for h in ["мэлжьагъэ", "хьэгулывэ"]:
    bulunan = [l for l in lex if l.get("form") == h]
    if bulunan:
        l = bulunan[0]
        print(f"{h}:")
        for k, v in l.items():
            if v:
                print(f"  {k}: {str(v)[:80]}")
        print()
