import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hedefler = ["щын", "щыугъ", "щычын", "щытхъугъ", "щыхъон", "щыуагъ", "щыхьан", "щыуэ"]

for h in hedefler:
    bulunan = [l for l in lex if l.get("form") == h]
    print(f"{h:15s} | {len(bulunan)} kayit")
    for l in bulunan:
        print(f"  ID: {l.get('id'):20s} | conceptId: {l.get('conceptId', 'YOK')}")
