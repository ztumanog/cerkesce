import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

gu = [l for l in lex if l.get("form", "").startswith("гу")]
islenen = [l for l in gu if l.get("subConceptId")]
islenmeyen = [l for l in gu if not l.get("subConceptId")]

print(f"гу- TOPLAM: {len(gu)}")
print(f"  ✅ İşlenen: {len(islenen)}")
print(f"  ❌ İşlenmeyen: {len(islenmeyen)}")
print()

if islenmeyen:
    print("İŞLENMEYENLER (ilk 50):")
    print("=" * 90)
    for l in islenmeyen[:50]:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:45]
        print(f"  {form:<28} | {anlam}")

    with open("_scripts/GU_KALAN.txt", "w", encoding="utf-8") as f:
        f.write("FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT\n")
        for l in islenmeyen:
            form = l.get("form", "?")
            anlam = (l.get("literalMeaning") or "?").replace(",", " ").replace('"', "'")[:50]
            f.write(f'{form},"{anlam}",?,?,?,гу-\n')
    print(f"\n✅ _scripts/GU_KALAN.txt ({len(islenmeyen)} kayıt)")
else:
    print("🎉 гу- TAM BİTTİ!")
