import json
from pathlib import Path
import re

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

kelimeler = "хьэжыгъэ,гъэпщта,Ӏубыгъуэ,шхэпс,хьэӏупс,шхэпсылэ,шхэныгу,къыпихун,къиуа,убгъуа,зыгъэхъу,хьэлӀамэцӀыртӀ,хьэлывэдэлъхьэ,хьэлэжьей"

for h in kelimeler.split(","):
    h = h.strip()
    if not h:
        continue
    bulunan = [l for l in lex if l.get("form") == h]
    if bulunan:
        l = bulunan[0]
        anlam = l.get("literalMeaning") or "?"
        # HTML temizle
        anlam = re.sub(r'<[^>]+>', '', anlam)[:60]
        print(f"VAR: {h:25s} | {anlam}")
    else:
        print(f"YOK: {h}")
