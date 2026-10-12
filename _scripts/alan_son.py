import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam lexemes: {len(lex)}")

for alan in ["rootIds", "wordFamilyId", "conceptId", "examples", "ipa", "derivation"]:
    dolu = sum(1 for l in lex if l.get(alan))
    print(f"  {alan:15s} {dolu:5} / {len(lex)} ({100*dolu//len(lex)}%)")
