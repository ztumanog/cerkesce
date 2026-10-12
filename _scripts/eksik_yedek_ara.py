import json
from pathlib import Path

bak_dir = Path("public/data/linguistic")
hedef = "L-CORPUS-03462"

for bak in sorted(bak_dir.glob("lexemes.json.bak-*")):
    try:
        lex = json.loads(bak.read_text(encoding="utf-8"))
        bul = [l for l in lex if l.get("id") == hedef]
        if bul:
            print(f"BULUNDU: {bak.name}")
            print(f"  form: {bul[0].get('form')}")
            print(f"  anlam: {bul[0].get('literalMeaning', '?')[:80]}")
    except Exception as e:
        pass

print("\nTarama bitti.")
