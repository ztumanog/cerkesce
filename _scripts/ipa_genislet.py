import json
from pathlib import Path

wikt = json.loads(Path("_scripts/wiktionary_veri_v2.json").read_text(encoding="utf-8"))
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

def normalize(s):
    return s.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ").strip().lower()

wikt_map = {}
for w in wikt:
    form_norm = normalize(w["form"])
    if form_norm not in wikt_map:
        wikt_map[form_norm] = w

guncellenen = 0
for l in lex:
    form_norm = normalize(l.get("form", ""))
    w = wikt_map.get(form_norm)
    if not w:
        continue
    if w.get("ipa") and not l.get("ipa"):
        l["ipa"] = w["ipa"]
        guncellenen += 1

print(f"Yeni ipa eklenen: {guncellenen}")
ipa_dolu = sum(1 for l in lex if l.get("ipa"))
print(f"ipa dolu: {ipa_dolu} / {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK Kaydedildi")
