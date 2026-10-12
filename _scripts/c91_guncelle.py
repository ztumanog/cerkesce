import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
rapor = json.loads(Path("data/corpus/frequency/c9_1_verification.json").read_text(encoding="utf-8"))

guncellenen = 0
bulunmayan = 0
for s in rapor["sonuclar"]:
    l = next((x for x in lex if x["id"] == s["id"]), None)
    if not l: continue
    if s["durum"] == "BULUNDU":
        l["corpusFrequency"] = s["t"]
        l["corpusFrequencyAdy"] = s["a"]
        l["corpusFrequencyKbd"] = s["k"]
        guncellenen += 1
    else:
        l["notes"] = (l.get("notes", "") + " | C-9.1: corpus YOK").strip(" |")
        bulunmayan += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellenen: {guncellenen}")
print(f"Isaretlenen: {bulunmayan}")
