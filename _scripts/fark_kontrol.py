import json
from pathlib import Path

wikt = json.loads(Path("_scripts/wiktionary_veri_v2.json").read_text(encoding="utf-8"))
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(s):
    return s.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ").strip().lower()

lex_forms = {normalize(l.get("form", "")) for l in lex}

# Wiktionary'de olup lexemes.json'da olmayanlar
wikt_forms = {normalize(w["form"]) for w in wikt}
fark = wikt_forms - lex_forms

print(f"Wiktionary form: {len(wikt_forms)}")
print(f"Lexemes form: {len(lex_forms)}")
print(f"Wiktionary'de olup lexemes'te olmayan: {len(fark)}")

# Örnek
print("\n=== İlk 20 fark ===")
for f in list(fark)[:20]:
    w = next((w for w in wikt if normalize(w["form"]) == f), None)
    if w:
        print(f"  {w['form']}: pos={w['partOfSpeech']}, examples={len(w['examples'])}")
