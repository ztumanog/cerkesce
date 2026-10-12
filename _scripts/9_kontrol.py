import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hedefler = ["щын", "щыугъ", "щычын", "щытхъугъ", "щыхъон", "щыуагъ", "щыхьан", "щыуэ"]

for h in hedefler:
    bulunan = [l for l in lex if l.get("form") == h]
    if bulunan:
        l = bulunan[0]
        print(f"{h:15s} | conceptId: {l.get('conceptId', 'YOK'):20s} | sub: {l.get('subConceptId', 'YOK')}")
    else:
        print(f"{h:15s} | BULUNAMADI")
