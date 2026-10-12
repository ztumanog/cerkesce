import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

total = len(lex)
with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
without_corpus = total - with_corpus

print(f"=== CORPUS COVERAGE ===")
print(f"Toplam lexeme: {total}")
print(f"Korpus kaniti olan: {with_corpus}")
print(f"Korpus kaniti olmayan: {without_corpus}")
print(f"Coverage: {with_corpus/total*100:.1f}%")

# Frekansi 0 olanlar
print(f"\n=== FREKANSI 0 OLANLAR ===")
for l in lex:
    if (l.get("corpusFrequency") or 0) == 0:
        print(f"{l['id']:25s} {l['form']:20s} {l.get('literalMeaning', '?')}")
