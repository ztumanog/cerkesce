import json
from pathlib import Path

LEX = Path(Path("_scripts/.lexpath").read_text(encoding="utf-8").strip())
lex = json.loads(LEX.read_text(encoding="utf-8"))

animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# Tam liste: form | anlam | id
lines = ["# ANIMAL Kategorisi — Tam Liste", f"# Toplam: {len(animal)} kayıt", ""]
lines.append(f"{'FORM':<25} | {'ANLAM':<50} | ID")
lines.append("-" * 100)

for l in sorted(animal, key=lambda x: x.get("form", "")):
    form = l.get("form", "?")
    anlam = l.get("literalMeaning") or l.get("translations", {}).get("tr") or "?"
    kid = l.get("id", "?")
    lines.append(f"{form:<25} | {anlam:<50} | {kid}")

Path("_scripts/animal_tam_liste.txt").write_text("\n".join(lines), encoding="utf-8")
print(f"✅ {len(animal)} kayıt yazıldı: _scripts/animal_tam_liste.txt")

# Ek: Sadece formlar (kısa liste)
forms = sorted(set(l.get("form", "") for l in animal if l.get("form")))
Path("_scripts/animal_formlar.txt").write_text("\n".join(forms), encoding="utf-8")
print(f"✅ {len(forms)} benzersiz form: _scripts/animal_formlar.txt")
