import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hedef = "L-CORPUS-03462"
bulunan = [l for l in lex if l.get("id") == hedef]

if bulunan:
    print(f"BULUNDU: {hedef}")
    print(json.dumps(bulunan[0], ensure_ascii=False, indent=2)[:500])
else:
    print(f"YOK: {hedef}")
    for i in [3461, 3463]:
        id_ = f"L-CORPUS-{i:05d}"
        bul = [l for l in lex if l.get("id") == id_]
        print(f"\n{id_}: {'VAR' if bul else 'YOK'}")
        if bul:
            print(f"  form: {bul[0].get('form')}")
