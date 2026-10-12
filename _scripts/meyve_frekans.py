import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-MY1ERYSE": 451, "L-MY": 73425, "L-KHUZH": 115, "L-KUZHY": 15,
    "L-SHCHYPTS1ESHCHYDE": 8, "L-KYTS1E": 8, "L-DZHESH": 292,
    "L-SHYBZHIY": 54, "L-NASHE": 79, "L-NESHEBEGU": 14,
    "L-KHUERZHE": 0, "L-ZENDALE": 1, "L-BALIY": 18,
    "L-CHEREZ": 94, "L-FISHCHYN": 0,
    "L-ZHYGEY": 53, "L-PSEY": 1, "L-KUMBYL": 3,
    "L-MY1ERYSEY": 39, "L-KUZHAY": 2, "L-DAE": 1723, "L-BZIIXHU": 11,
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
