import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Verileri yukle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
wf = json.loads(Path("public/data/linguistic/word_families.json").read_text(encoding="utf-8"))
sr = json.loads(Path("public/data/linguistic/semantic_relations.json").read_text(encoding="utf-8"))

# Embedding dataset olustur
dataset = []
for l in lex:
    if l.get("status") == "rare" or l.get("status") == "morpheme":
        continue
    
    # Lexeme'in tum iliskilerini topla
    lexeme_id = l["id"]
    root_ids = l.get("derivation", {}).get("rootIds", [])
    wf_id = l.get("wordFamilyId")
    concept_id = l.get("conceptId")
    
    # Semantic relations
    related = []
    for r in sr:
        if r.get("source") == root_ids[0] if root_ids else None:
            related.append({
                "target": r.get("target"),
                "type": r.get("type"),
                "confidence": r.get("confidence")
            })
    
    dataset.append({
        "lexemeId": lexeme_id,
        "form": l.get("form"),
        "literalMeaning": l.get("literalMeaning"),
        "rootIds": root_ids,
        "wordFamilyId": wf_id,
        "conceptId": concept_id,
        "corpusFrequency": l.get("corpusFrequency", 0),
        "semanticRelations": related,
        "dialectVariants": l.get("dialectVariants", {})
    })

# Kaydet
out_path = Path("public/data/linguistic/embedding_dataset.json")
out_path.write_text(json.dumps(dataset, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"Embedding dataset olusturuldu: {len(dataset)} kayit")
print(f"Dosya: {out_path}")
