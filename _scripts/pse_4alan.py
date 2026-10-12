import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# псэ- ile başlayan
pse = [l for l in lex if l.get("form", "").startswith("псэ")]
pse.sort(key=lambda x: x.get("form", ""))

# Mimara verilecek — 4 alan için
with open("_scripts/pse_mimara_4alan.txt", "w", encoding="utf-8") as f:
    f.write(f"# псэ- KÖKÜ — MİMAR İÇİN (4 ALAN)\n")
    f.write(f"# Toplam: {len(pse)} kayıt\n")
    f.write(f"# KURAL: Her satırı doldur\n")
    f.write(f"# FORMAT: FORM | ANLAM | CONCEPT | SUB | AİLE | ROOT\n")
    f.write("=" * 140 + "\n\n")
    f.write(f"{'FORM':<25} | {'ANLAM':<45} | {'CONCEPT':<15} | {'SUB':<18} | {'AİLE':<20} | ROOT\n")
    f.write("-" * 140 + "\n")
    for l in pse:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:45]
        f.write(f"{form:<25} | {anlam:<45} | {'?':<15} | {'?':<18} | {'?':<20} | ?\n")

print(f"Toplam: {len(pse)} kayit")
print(f"OK - _scripts/pse_mimara_4alan.txt")
