import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

rare_ids = [
    "L-ADENAP1AS", "L-ANENAP1AS", "L-ANEPHYPHU",
    "L-SHYQHUKHEDZHABZ", "L-BGHUEGHU", "L-BLECH1A", "L-BLECH1YN"
]

isaretlenen = 0
for l in lex:
    if l["id"] in rare_ids:
        l["status"] = "rare"
        l["notes"] = (l.get("notes", "") + " [NADIR]").strip()
        isaretlenen += 1
        print(f"Isaretlendi: {l['id']} - {l['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nIsaretlenen: {isaretlenen}")

# Coverage tekrar hesapla (sadece active)
active = [l for l in lex if l.get("status") != "rare"]
with_corpus = sum(1 for l in active if (l.get("corpusFrequency") or 0) > 0)
print(f"Active lexeme: {len(active)}")
print(f"Korpus kanitli: {with_corpus}")
print(f"Coverage (active): {with_corpus/len(active)*100:.1f}%")
