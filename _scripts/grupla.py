import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]
animal.sort(key=lambda x: x.get("form", "").lower())

# Klasör oluştur
out = Path("_scripts/animal_gruplar")
out.mkdir(exist_ok=True)

GRUP_BOYUT = 100
gruplar = [animal[i:i+GRUP_BOYUT] for i in range(0, len(animal), GRUP_BOYUT)]

# Her grubu ayrı dosyaya yaz
for i, grup in enumerate(gruplar, 1):
    dosya = out / f"grup-{i:02d}.txt"
    with open(dosya, "w", encoding="utf-8") as f:
        f.write(f"# ANIMAL Grup {i}/{len(gruplar)} — {len(grup)} kayıt\n")
        f.write(f"# KURAL: Hayvan olan [x], olmayan [ ]\n")
        f.write(f"# Toplam ANIMAL: {len(animal)}\n")
        f.write("=" * 70 + "\n\n")
        for j, l in enumerate(grup, 1):
            form = l.get("form", "?")
            anlam = (l.get("literalMeaning") or "?")[:60].replace("\n", " ")
            pos = l.get("partOfSpeech", "?")[:10]
            kid = l.get("id", "?")
            f.write(f"[{j:3}] [ ] {form:25} | {anlam:60} | {pos:10} | {kid}\n")

print(f"OK: {len(gruplar)} grup, {len(animal)} kayit")
print(f"Klasor: _scripts/animal_gruplar/")

# İlk grubu göster
print()
print("Ilk grubun formlari:")
for l in gruplar[0][:10]:
    print(f"  {l.get('form', '?')}")
