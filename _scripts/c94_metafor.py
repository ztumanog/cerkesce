import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

sr = json.loads(Path("public/data/linguistic/semantic_relations.json").read_text(encoding="utf-8"))
vr = json.loads(Path("data/corpus/webcorpora/verification_results.json").read_text(encoding="utf-8"))

vr_map = {r.get("id", ""): r for r in vr.get("results", [])}

guncellenen = 0
isaretlenen = 0
for s in sr:
    if s.get("type") != "metaphorical":
        continue
    sid = s.get("id", "")
    if sid in vr_map:
        v = vr_map[sid]
        s["confidence"] = v.get("confidence", 0)
        s["evidence"] = {"source": "adyghe.web-corpora.net", "pages": v.get("pages", 0), "status": v.get("status", "")}
        if v.get("status") == "DOGRULANDI":
            guncellenen += 1
        else:
            s["notes"] = (s.get("notes", "") + " | C-9.1: corpus BULUNAMADI").strip(" |")
            isaretlenen += 1
    else:
        s["notes"] = (s.get("notes", "") + " | C-9.1: VR yok").strip(" |")
        isaretlenen += 1

Path("public/data/linguistic/semantic_relations.json").write_text(
    json.dumps(sr, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellenen: {guncellenen}")
print(f"Isaretlenen: {isaretlenen}")
