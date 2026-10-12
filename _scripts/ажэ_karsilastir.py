import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kayitlar = [l for l in lex if l.get("form") == "ажэ" and l.get("conceptId") == "ANIMAL"]

with open("_scripts/ажэ_karsilastir.txt", "w", encoding="utf-8") as f:
    f.write(f"ажэ KAYITLARI — {len(kayitlar)} adet\n")
    f.write("=" * 70 + "\n\n")
    for i, l in enumerate(kayitlar, 1):
        f.write(f"--- Kayit {i} ---\n")
        f.write(json.dumps(l, ensure_ascii=False, indent=2))
        f.write("\n\n")

print(f"OK - {len(kayitlar)} kayit")
