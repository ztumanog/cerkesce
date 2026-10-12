import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hedefler = ["щын", "щыугъ", "щычын", "щытхъугъ", "щыхъон", "щыуагъ", "щыхьан", "щыуэ"]

for h in hedefler:
    bulunan = [l for l in lex if l.get("form") == h]
    if bulunan:
        l = bulunan[0]
        # щы- ile basliyor mu?
        basliyor = l.get("form", "").startswith("щы")
        print(f"{h:15s} | starts with 'щы': {basliyor} | conceptId: {l.get('conceptId')}")
