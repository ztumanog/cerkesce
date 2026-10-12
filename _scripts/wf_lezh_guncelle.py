import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))

for family in wf:
    if family["id"] == "WF-LEZH":
        family["relatedFamilies"] = ["WF-LAZHE"]
        family["notes"] = "C-11.3: Calismak kok ailesi. Korpus: 559. Homonim: WF-LAZHE (kusur) ile karistirilmamali."
        print("WF-LEZH guncellendi.")
        break

wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
