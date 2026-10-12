import json
import re
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

# Hâlâ kirli olan anlamları bul
kirli = []
for l in animal:
    anlam = l.get("literalMeaning") or ""
    if re.search(r'<[^>]+>|нареч\.|частица|послелог|вводн\.|перех\.|неперех\.|мест\.|сущ\.|прил\.', anlam):
        kirli.append((l.get("form"), anlam[:80]))

print(f"=== HÂLÂ KİRLİ ANLAMLAR: {len(kirli)} kayıt ===\n")
for form, anlam in kirli[:30]:
    print(f"  {form:20s} → {anlam}")
