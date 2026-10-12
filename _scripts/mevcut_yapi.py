import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")

# Örnek bir kayıt
ornek = next((l for l in lex if l.get("form") == "псы"), None)
if ornek:
    print("\n=== псы kaydı ===")
    print(json.dumps(ornek, ensure_ascii=False, indent=2)[:800])

# ID formatı
ids = [l.get("id", "") for l in lex[:10]]
print(f"\nİlk 10 ID: {ids}")
