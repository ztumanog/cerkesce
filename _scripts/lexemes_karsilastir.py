import json
from pathlib import Path

for dosya in ["public/data/linguistic/lexemes.json", "public/data/linguistic/lexemes-yeni.json"]:
    p = Path(dosya)
    if not p.exists():
        print(f"{dosya}: YOK")
        continue
    lex = json.loads(p.read_text(encoding="utf-8"))
    shchy = [l for l in lex if l.get("form", "").startswith("щы")]
    dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
    bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

    print(f"\n{dosya}:")
    print(f"  Toplam lexeme: {len(lex)}")
    print(f"  щы-: {len(shchy)}")
    print(f"  DOLU: {len(dolu)}")
    print(f"  BOS: {len(bos)}")
