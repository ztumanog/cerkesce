import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")

yeni = [l for l in lex if l.get("id", "").startswith("L-CORPUS")]
print(f"Yeni (L-CORPUS): {len(yeni)}")

alanlar = ["ipa", "rootIds", "wordFamilyId", "conceptId", "conceptIds", "derivation", "partOfSpeech"]
print("\n=== Yeni kayıtlarda alan doluluk ===")
for alan in alanlar:
    dolu = sum(1 for l in yeni if l.get(alan))
    print(f"  {alan:20s} {dolu:6}/{len(yeni)} ({100*dolu/len(yeni):.1f}%)")
