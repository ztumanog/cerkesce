import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellemeler = {
    "L-GUSH1UAGHO": {"form": "гуфӏэгъу", "corpusFrequency": 364, 
                     "notes": "C-11.3: sevinc. Dogru form: гуфӏэгъу. Korpus: 364."},
    "L-LEZHAK1UE": {"form": "лэжьакӏуэ", "corpusFrequency": 416,
                    "notes": "C-11.3: isci. Dogru form: лэжьакӏуэ. Korpus: 416."},
    "L-MEKHUGHUE": {"form": "мэкъуауэгъуэ", "corpusFrequency": 17,
                    "notes": "C-11.3: cuma. Dogru form: мэкъуауэгъуэ. Korpus: 17."},
    "L-UNERYXHE-UNERYK1YU": {"corpusFrequency": 3,
                             "notes": "C-11.3: ev ev dolasarak. Korpus: 3 (унэрыхьэ)."},
    "L-MEZLAPE": {"form": "мэз лъапэ", "corpusFrequency": 15,
                  "notes": "C-11.3: orman kenari. Ayri yazilir: мэз лъапэ. Korpus: 15."},
}

guncellenen = 0
for l in lex:
    if l["id"] in guncellemeler:
        g = guncellemeler[l["id"]]
        for k, v in g.items():
            l[k] = v
        guncellenen += 1
        print(f"Guncellendi: {l['id']} -> {l['form']} (korpus: {l['corpusFrequency']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
