import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellemeler = {
    "L-TYSHYPHUE": {"form": "адэшыпхъу", "literalMeaning": "hala (baba kiz kardesi)",
                    "notes": "C-11.3: hala. Dogru form: адэшыпхъу. Abaze 2005."},
    "L-NYSHYPHUE": {"form": "анэ шыпхъу", "literalMeaning": "teyze (anne kiz kardesi)",
                    "notes": "C-11.3: teyze. Dogru form: анэ шыпхъу. Abaze 2005."},
    "L-ANEKUESHH": {"form": "анэш", "literalMeaning": "dayi (anne erkek kardesi)",
                    "notes": "C-11.3: dayi. Dogru form: анэш. Abaze 2005."},
}

guncellenen = 0
for l in lex:
    if l["id"] in guncellemeler:
        g = guncellemeler[l["id"]]
        for k, v in g.items():
            l[k] = v
        guncellenen += 1
        print(f"Guncellendi: {l['id']} -> {l['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
