import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-ZADELHXUEZESHYPHU": 1,
    "L-DELHXU": 102,
    "L-SHYPHUE": 341,
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1
        print(f"Guncellendi: {l['id']} - {l['form']} -> {freq_map[l['id']]}")

# zedelhxu zaten var mi?
if "L-ZEDELHXU" not in {l["id"] for l in lex}:
    lex.append({
        "id": "L-ZEDELHXU", "form": "зэдэлъху",
        "literalMeaning": "kardes (birbirinin)",
        "partOfSpeech": "noun",
        "wordFamilyId": "WF-KINSHIP", "conceptId": "SIBLING",
        "corpusFrequency": 6,
        "notes": "C-11.3: kardes. Korpus: 6."
    })
    print("Eklendi: L-ZEDELHXU - зэдэлъху")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")

active = [l for l in lex if l.get("status") != "rare"]
with_corpus = sum(1 for l in active if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage (active): {with_corpus/len(active)*100:.1f}%")
