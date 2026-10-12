import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
sr = json.loads(Path("public/data/linguistic/semantic_relations.json").read_text(encoding="utf-8"))

dataset = []
for l in lex:
    root_ids = l.get("derivation", {}).get("rootIds", [])
    root_forms = [next((x["form"] for x in roots if x["id"] == rid), "") for rid in root_ids]
    concept = l.get("conceptId", "")
    concepts = [concept] + l.get("conceptIds", []) if concept else l.get("conceptIds", [])
    
    kayit = {
        "id": l["id"],
        "form": l.get("form", ""),
        "meaning": l.get("literalMeaning", ""),
        "concepts": concepts,
        "roots": root_forms,
        "word_family": l.get("wordFamilyId", ""),
        "dialectVariants": l.get("dialectVariants", {}),
        "corpusFrequency": l.get("corpusFrequency", 0)
    }
    dataset.append(kayit)

out = Path("public/data/linguistic/embedding_dataset.jsonl")
with out.open("w", encoding="utf-8") as f:
    for k in dataset:
        f.write(json.dumps(k, ensure_ascii=False) + "\n")

print(f"OK: {len(dataset)} kayit")
print(f"Boyut: {out.stat().st_size} byte")
