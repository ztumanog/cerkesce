import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# R-GU'dan çıkarılacak homonym kelimeler
CIKAR = {"гущэ", "гуащэ", "гугъу", "гугъуехь"}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if form in CIKAR and "R-GU" in root_ids:
        root_ids.remove("R-GU")
        guncellenen += 1
        l["rootIds"] = root_ids

print(f"R-GU'dan çıkarılan: {guncellenen}")

# Son durum
r_gu = [l for l in lex if "R-GU" in (l.get("rootIds") or [])]
print(f"\nR-GU kalan: {len(r_gu)}")
for l in r_gu[:20]:
    print(f"  {l.get('form', '?'):25s}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi")
