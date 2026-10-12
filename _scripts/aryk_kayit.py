import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# арыкъ kaydını bul
for l in lex:
    if l.get("form") == "арыкъ":
        print(json.dumps(l, ensure_ascii=False, indent=2))
        break
else:
    print("арыкъ bulunamadı, yakın formları ara:")
    for l in lex:
        if "арыкъ" in (l.get("form") or ""):
            print(f"  {l.get('form')} → {l.get('literalMeaning')}")
