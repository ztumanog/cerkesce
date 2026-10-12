import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

freq_map = {
    "L-LEZH": 4296,
    "L-LEZHEN": 622,
    "L-LEZHYGHE": 1341,
    "L-LEZHENYM": 56,
    "L-LEZHAK1UE": 0,
    "L-LAZHE-N": 1212,
    "L-LAZHENSHE": 15,
    "L-LAZHEREY": 1,
    "L-LAZHESHKHUE": 1,
}

guncellenen = 0
for l in lex:
    if l["id"] in freq_map:
        eski = l.get("corpusFrequency", "?")
        l["corpusFrequency"] = freq_map[l["id"]]
        guncellenen += 1
        print(f"{l['id']:20s} {eski:>6} -> {freq_map[l['id']]:>6}")

wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))
for w in wf:
    if w["id"] == "WF-LEZH":
        w["productivity"]["corpusFrequency"] = 6315
        w["notes"] = "C-11.3: Calismak kok ailesi. Korpus: 6315. Homonim: WF-LAZHE (kusur) ile karistirilmamali."
        print("WF-LEZH korpus: 6315")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen lexeme: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")
