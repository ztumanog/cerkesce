import json
from pathlib import Path
import re

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

kelimeler = "хьэндырабгъуэ,хьэпӏацӏэ,хьэпцӏий,хьэшорэ,джэдынэ,бу,гуу,алащэ,джэджьей,елыркъэш"

for h in kelimeler.split(","):
    h = h.strip()
    if not h:
        continue
    bulunan = [l for l in lex if l.get("form") == h]
    if bulunan:
        l = bulunan[0]
        anlam = l.get("literalMeaning") or "?"
        anlam = re.sub(r'<[^>]+>', '', anlam)[:70]
        print(f"VAR: {h:25s} | {anlam}")
    else:
        print(f"YOK: {h}")
