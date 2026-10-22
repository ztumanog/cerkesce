import json, collections
from pathlib import Path
l = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
bos = [e for e in l if not e.get("conceptId")]
kavram = [e for e in l if str(e.get("conceptId") or "").startswith("KAVRAM_")]
print("toplam:", len(l), "| bos conceptId:", len(bos), "| KAVRAM_:", len(kavram))
print("dialect (bos):", collections.Counter(e.get("dialect") for e in bos).most_common(10))
print("POS (bos):", collections.Counter(e.get("partOfSpeech") for e in bos).most_common(10))
