import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-mukerrer-shchyn-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# щын mukerrerini temizle
shchyn = [l for l in lex if l.get("form") == "щын"]
print(f"щын: {len(shchyn)} kayit")
for l in shchyn:
    print(f"  {l.get('id')}")

# En zengin kaydi tut
if len(shchyn) > 1:
    en_iyi = max(shchyn, key=lambda x: sum(1 for v in x.values() if v))
    for l in shchyn:
        if l is not en_iyi:
            lex.remove(l)
            print(f"  Silindi: {l.get('id')}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
