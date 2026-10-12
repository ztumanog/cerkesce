import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Bulunanlar
bulunan = [
    {"id": "L-PSYZHY", "ady": 0, "kbd": 22, "toplam": 22},
    {"id": "L-PSYXUABE", "ady": 0, "kbd": 4, "toplam": 4},
    {"id": "L-NEF1", "ady": 0, "kbd": 294, "toplam": 294},
]

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0
for b in bulunan:
    l = next((x for x in lex if x["id"] == b["id"]), None)
    if l:
        l["corpusFrequency"] = b["toplam"]
        l["corpusFrequencyAdy"] = b["ady"]
        l["corpusFrequencyKbd"] = b["kbd"]
        l["notes"] = (l.get("notes", "") + f" | C-10.1: corpus bulundu (ADY={b['ady']}, KBD={b['kbd']})").strip(" |")
        guncellenen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellenen: {guncellenen}")

# Bulunmayan 37'yi isaretle
bulunmayan_ids = ["L-GUPSYSE", "L-PSEK1UED", "L-PSE1UX", ...]  # 37 tane
# (tam liste c10_1_bulunmayanlar.json'dan alinacak)
