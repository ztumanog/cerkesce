import json
from pathlib import Path

# 1. Wiktionary verisi
wikt = json.loads(Path("_scripts/wiktionary_veri_v2.json").read_text(encoding="utf-8"))
print(f"Wiktionary: {len(wikt)}")

# 2. Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 3. Normalize fonksiyonu
def normalize(s):
    return s.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ").strip().lower()

# 4. Wiktionary map (normalize)
wikt_map = {}
for w in wikt:
    form_norm = normalize(w["form"])
    if form_norm not in wikt_map:
        wikt_map[form_norm] = w

print(f"Wiktionary normalize map: {len(wikt_map)}")

# 5. Lexemes'e entegre et
guncellenen = 0
for l in lex:
    form_norm = normalize(l.get("form", ""))
    w = wikt_map.get(form_norm)
    if not w:
        continue

    degisti = False

    # examples
    if w.get("examples") and not l.get("examples"):
        l["examples"] = w["examples"]
        degisti = True

    # partOfSpeech (sadece boşsa)
    if w.get("partOfSpeech") and not l.get("partOfSpeech"):
        l["partOfSpeech"] = w["partOfSpeech"]
        degisti = True

    # ipa (sadece boşsa)
    if w.get("ipa") and not l.get("ipa"):
        l["ipa"] = w["ipa"]
        degisti = True

    # meaning (sadece boşsa)
    if w.get("meaning") and not l.get("literalMeaning"):
        l["literalMeaning"] = w["meaning"]
        degisti = True

    if degisti:
        guncellenen += 1

print(f"\nGüncellenen: {guncellenen}")

# 6. İstatistikler
ex_dolu = sum(1 for l in lex if l.get("examples"))
pos_dolu = sum(1 for l in lex if l.get("partOfSpeech"))
ipa_dolu = sum(1 for l in lex if l.get("ipa"))
print(f"\n=== Son durum ===")
print(f"  examples:     {ex_dolu}")
print(f"  partOfSpeech: {pos_dolu}")
print(f"  ipa:          {ipa_dolu}")

# 7. Örnek
ornek = next((l for l in lex if l.get("form") in ["гуфӀэ", "гуфӏэ"]), None)
if ornek:
    print(f"\n=== {ornek.get('form')} ===")
    print(f"  examples: {ornek.get('examples')}")
    print(f"  partOfSpeech: {ornek.get('partOfSpeech')}")
    print(f"  ipa: {ornek.get('ipa')}")

# 8. Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi: {lex_path}")
