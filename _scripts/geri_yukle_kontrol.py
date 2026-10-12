import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
concept = sum(1 for l in lex if l.get("conceptId"))
lemma = sum(1 for l in lex if l.get("isLemma"))
print(f"Toplam: {len(lex)}")
print(f"ConceptId: {concept}")
print(f"Lemma: {lemma}")
