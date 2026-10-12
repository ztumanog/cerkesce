import json
from pathlib import Path
from datetime import datetime

# Son yedeklerdeki DOLU sayilarini karsilastir
bak_dir = Path("public/data/linguistic")

for bak in sorted(bak_dir.glob("lexemes.json.bak-*"), key=lambda x: x.stat().st_mtime, reverse=True)[:10]:
    try:
        lex = json.loads(bak.read_text(encoding="utf-8"))
        shchy = [l for l in lex if l.get("form", "").startswith("щы")]
        dolu = [l for l in shchy if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
        print(f"{bak.name[:50]:50s} | щы-: {len(shchy):4d} | DOLU: {len(dolu):4d} | lexeme: {len(lex)}")
    except Exception as e:
        print(f"HATA {bak.name}: {e}")
