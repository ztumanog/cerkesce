import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# L-CORPUS-3462'yi ara
target = next((l for l in lex if l.get("id") == "L-CORPUS-3462"), None)

if target:
    print("✅ BULUNDU:")
    print(json.dumps(target, ensure_ascii=False, indent=2))
else:
    print("❌ BULUNAMADI: L-CORPUS-3462")
    
# Etrafındaki kayıtları kontrol et
print("\n=== ETRAF KAYITLARI ===")
for i in range(3460, 3465):
    item = next((l for l in lex if l.get("id") == f"L-CORPUS-{i}"), None)
    if item:
        print(f"✅ L-CORPUS-{i}: {item.get('form')}")
    else:
        print(f"❌ L-CORPUS-{i}: EKSIK")
