import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

for hedef in ["щыпкъэ", "щынэ", "щыблэ", "щы"]:
    bulunan = [l for l in lex if l.get("form") == hedef]
    print(f"\n{hedef}: {len(bulunan)} kayit")
    for l in bulunan[:3]:
        print(f"  ID: {l.get('id')}")
        print(f"  conceptId: {l.get('conceptId', 'YOK')}")
        print(f"  subConceptId: {l.get('subConceptId', 'YOK')}")
        print(f"  taxonomyFamily: {l.get('taxonomyFamily', 'YOK')}")
        print(f"  rootForm: {l.get('rootForm', 'YOK')}")
