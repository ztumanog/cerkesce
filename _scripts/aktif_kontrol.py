import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Sadece aktif ve korpus kanitli olanlar
aktif = [l for l in lex if l.get("status") != "rare" and (l.get("corpusFrequency") or 0) > 0]
print(f"Aktif + korpus kanitli: {len(aktif)}")
print(f"Toplam: {len(lex)}")
print(f"Oran: {len(aktif)/len(lex)*100:.1f}%")
