import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-ADE": 5855, "L-ANE": 9928, "L-DADE": 159, "L-ANESHHUE": 33,
    "L-ADENAP1AS": 0, "L-ANENAP1AS": 0,
    "L-ANEDELHXU": 10, "L-ANEPHYPHU": 0, "L-ANEKYLHXU": 6,
    "L-SHYQHU": 285, "L-SHYQHUSHCHALE": 4, "L-SHYQHUKHEDZHABZ": 0,
    "L-BZHYH'E": 152, "L-SHCHYMAKHUE": 186,
    "L-BZYW": 478, "L-SHHXHUE2": 671, "L-SHHXHUANT1E": 98,
    "L-SHCHA": 37539, "L-SHCHALE2": 1659, "L-SHHXHE2": 14659,
    "L-AQYL": 1887, "L-BGHUE": 978, "L-BGHUEGHU": 0,
    "L-SHCHYGU": 260, "L-SHYPQE": 227, "L-SHHXHEL": 127,
    "L-SHTEN": 584, "L-SHTENYGHE": 35,
    "L-BLECH1A": 0, "L-BLECH1YN": 0, "L-DAME": 424,
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
