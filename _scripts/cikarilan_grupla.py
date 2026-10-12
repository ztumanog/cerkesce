import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# ANIMAL'dan çıkarılanlar: notes'unda "ANIMAL etiketinden cikarildi" olanlar
cikarilan = [l for l in lex if (l.get("notes") or "").find("ANIMAL etiketinden cikarildi") >= 0]
cikarilan.sort(key=lambda x: x.get("form", "").lower())

# Klasör
out = Path("_scripts/cikarilan_gruplar")
out.mkdir(exist_ok=True)

GRUP_BOYUT = 100
gruplar = [cikarilan[i:i+GRUP_BOYUT] for i in range(0, len(cikarilan), GRUP_BOYUT)]

for i, grup in enumerate(gruplar, 1):
    dosya = out / f"grup-{i:02d}.txt"
    with open(dosya, "w", encoding="utf-8") as f:
        f.write(f"# CIKARILAN Grup {i}/{len(gruplar)} — {len(grup)} kayit\n")
        f.write(f"# KURAL: Hayvan olan [x], olmayan [ ]\n")
        f.write(f"# Toplam cikarilan: {len(cikarilan)}\n")
        f.write("=" * 80 + "\n\n")
        for j, l in enumerate(grup, 1):
            form = l.get("form", "?")
            anlam = (l.get("literalMeaning") or "?")[:55].replace("\n", " ")
            tr = ""
            t = l.get("translations") or {}
            if isinstance(t, dict):
                tr = (t.get("tr") or "")[:25]
            kid = l.get("id", "?")
            f.write(f"[{j:3}] [ ] {form:25} | {anlam:55} | TR: {tr:25} | {kid}\n")

print(f"OK: {len(gruplar)} grup, {len(cikarilan)} kayit")
print(f"Klasor: _scripts/cikarilan_gruplar/")
