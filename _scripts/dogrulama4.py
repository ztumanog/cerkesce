import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

lemma_gruplari = {}
for l in lex:
    lemma_id = l.get("lemmaId")
    if lemma_id:
        if lemma_id not in lemma_gruplari:
            lemma_gruplari[lemma_id] = []
        lemma_gruplari[lemma_id].append(l)

print("=== HOMONIM LEMMA GRUPLARI ===")
for lemma_id, uyeler in lemma_gruplari.items():
    print(f"\n{lemma_id}:")
    for u in uyeler:
        print(f"  - {u['id']}: {u['form']} ({u.get('literalMeaning', '?')})")
