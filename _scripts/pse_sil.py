import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Sadece sozlukte olmayanlari sil
silinecek = [
    "L-PSE1UX", "L-PSE1UV", "L-PSEEBLEZHYN",
    "L-PSEGHEPSK1", "L-PSETEXHUE"
]

onceki = len(lex)
lex = [l for l in lex if l["id"] not in silinecek]
silinen = onceki - len(lex)

# L-PSEBYDE'yi guncelle
for l in lex:
    if l["id"] == "L-PSEBYDE":
        l["literalMeaning"] = "dayanikli, canli"
        l["senses"] = [
            {"senseId": 1, "gloss": "resilient", "tr": "dayanıklı", "ru": "живучий"}
        ]
        l["sources"] = ["Jonty Yamisha", "Kardanov 1957"]
        l["notes"] = "C-11.3: dayanikli/canli. 7 kaynak. Korpus: 0 (normalize hatasi olabilir)."
        l["status"] = "active"
        print("L-PSEBYDE guncellendi: dayanikli")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Silinen: {silinen}")
print(f"Kalan lexeme: {len(lex)}")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
