import json
from pathlib import Path

# Wiktionary verisi
wikt = json.loads(Path("_scripts/wiktionary_veri_v2.json").read_text(encoding="utf-8"))
print(f"Wiktionary: {len(wikt)}")

# Lexemes
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# Eşleşme kontrolü (normalize ederek)
def normalize(s):
    return s.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ").strip().lower()

lex_map = {normalize(l.get("form", "")): l for l in lex}
print(f"Lexemes normalize map: {len(lex_map)}")

eslesen = 0
ornekler = []
for w in wikt[:5000]:
    form_norm = normalize(w["form"])
    if form_norm in lex_map:
        eslesen += 1
        if len(ornekler) < 5:
            ornekler.append((w["form"], lex_map[form_norm].get("form"), w.get("examples", [])[:1]))

print(f"\nİlk 5000 Wiktionary kaydından eşleşen: {eslesen}")
print("\n=== Örnek eşleşmeler ===")
for w_form, l_form, ex in ornekler:
    print(f"  {w_form} -> {l_form}: {ex}")
