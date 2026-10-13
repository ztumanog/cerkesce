import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Fonksiyonel sonekler (Çerkesçe yapım ekleri)
suffixes = {
    "-пӀэ":   ("WF_LOCATIVE",    "LOCATIVE_NOUNS"),
    "-акӀуэ": ("WF_AGENTIVE",    "AGENTIVE_NOUNS"),
    "-кӀуэ":  ("WF_AGENTIVE",    "AGENTIVE_NOUNS"),
    "-лъэ":   ("WF_CONTAINER",   "CONTAINER_TOOLS"),
    "-лъ":    ("WF_CONTAINER",   "CONTAINER_TOOLS"),
    "-ныгъэ": ("WF_ABSTRACT",    "ABSTRACT_QUALITIES"),
    "-гъуэ":  ("WF_ABSTRACT",    "ABSTRACT_QUALITIES"),
    "-гъэ":   ("WF_ABSTRACT",    "ABSTRACT_QUALITIES"),
    "-шхуэ":  ("WF_AUGMENTATIVE","AUGMENTATIVE"),
    "-цӀыкӀу":("WF_DIMINUTIVE",  "DIMINUTIVE"),
    "-ншэ":   ("WF_PRIVATIVE",   "PRIVATIVE"),
    "-джэ":   ("WF_METAL",       "METAL_OBJECTS"),
}

guncellenen = 0
atlanan = 0
sonuc_detay = {}

# Uzun sonekten kisa soneke dogru sirala
sorted_suffixes = sorted(suffixes.items(), key=lambda x: -len(x[0]))

for l in lex:
    if l.get("rootIds"):
        atlanan += 1
        continue
    
    form = l.get("form", "")
    if not form:
        continue
    
    for suffix, (wf_id, category) in sorted_suffixes:
        if form.endswith(suffix):
            l["wordFamilyId"] = wf_id
            l["derivation"] = {
                "rootIds": [],
                "morphemeIds": [suffix.lstrip("-")],
                "rule": "suffix"
            }
            guncellenen += 1
            sonuc_detay[suffix] = sonuc_detay.get(suffix, 0) + 1
            break

print(f"Guncellenen: {guncellenen}")
print(f"Atlanan (zaten root'lu): {atlanan}")
print(f"\n=== Sonek bazli dagilim ===")
for suffix, count in sorted(sonuc_detay.items(), key=lambda x: -x[1]):
    print(f"  {suffix:10s} {count}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("\nOK")
