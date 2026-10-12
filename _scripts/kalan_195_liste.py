import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

print(f"Toplam boş: {len(bos)}")
print()
print("=== LISTE ===")
for l in bos:
    print(l.get("form"))

# CSV olarak da yaz
cikti = Path("_scripts/kalan_195.txt")
with open(cikti, "w", encoding="utf-8") as f:
    for l in bos:
        f.write(l.get("form") + "\n")
print(f"\nDosya: {cikti}")
