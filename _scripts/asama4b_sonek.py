import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

suffixes = {
    "-пӀэ":   ("WF_LOCATIVE",    "LOCATIVE_NOUNS"),
    "-акӀуэ": ("WF_AGENTIVE",    "AGENTIVE_NOUNS"),
    "-кӀуэ":  ("WF_AGENTIVE",    "AGENTIVE_NOUNS"),
    "-лъэ":   ("WF_CONTAINER",   "CONTAINER_TOOLS"),
    "-лъ":    ("WF_CONTAINER",   "CONTAINER_TOOLS"),
    "-ныгъэ": ("WF_ABSTRACT",    "ABSTRACT_QUALITIES"),
    "-гъуэ":  ("WF_ABSTRACT",    "ABSTRACT_QUALITIES"),
    "-гъэ":   ("WF_ABSTRACT",    "ABSTRACT_QUALITIES"),
    "-ншэ":   ("WF_PRIVATIVE",   "PRIVATIVE"),
}

guncellenen = 0
atlanan = 0

for l in lex:
    # Sadece wordFamilyId OLMAYANLAR
    if l.get("wordFamilyId"):
        atlanan += 1
        continue
    
    form = l.get("form", "")
    if not form:
        continue
    
    # Uzun sonekten kisa soneke
    sorted_suffixes = sorted(suffixes.items(), key=lambda x: -len(x[0]))
    
    for suffix, (wf_id, category) in sorted_suffixes:
        if form.endswith(suffix):
            l["wordFamilyId"] = wf_id
            if not l.get("derivation"):
                l["derivation"] = {
                    "rootIds": [],
                    "morphemeIds": [suffix.lstrip("-")],
                    "rule": "suffix"
                }
            guncellenen += 1
            break

print(f"Guncellenen: {guncellenen}")
print(f"Atlanan (zaten WF'li): {atlanan}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
