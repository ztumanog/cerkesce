import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=== L-CORPUS ÖRNEĞİ ===")
ornek = next(l for l in lex if l.get("id", "").startswith("L-CORPUS"))
print(json.dumps(ornek, ensure_ascii=False, indent=2)[:1200])

print("\n=== rootIds DOLU ÖRNEK (eski kayıt) ===")
eski = next((l for l in lex if l.get("rootIds")), None)
if eski:
    print(json.dumps(eski, ensure_ascii=False, indent=2)[:1200])
else:
    print("⚠️ rootIds dolu HİÇ kayıt yok")
