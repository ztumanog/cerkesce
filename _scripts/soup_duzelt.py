import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-soup-duzelt-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# SOUP_* subConceptId'lerini SOUP_FOOD yap
sayac = 0
for l in lex:
    sub = l.get("subConceptId") or ""
    if sub.startswith("SOUP_"):
        l["subConceptId"] = "SOUP_FOOD"
        sayac += 1
        print(f"  OK: {l.get('form')} -> SOUP_FOOD")

# ayrica FOOD subConceptId'siz olanlari da duzelt
for l in lex:
    cid = l.get("conceptId") or ""
    sub = l.get("subConceptId") or ""
    if cid == "SOUP" and not sub:
        l["subConceptId"] = "SOUP_FOOD"
        sayac += 1
        print(f"  OK: {l.get('form')} -> SOUP_FOOD")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {sayac} kayit guncellendi")
