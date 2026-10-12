import json
from pathlib import Path

# 1. Wiktioinary entries
wik = json.loads(Path("data/corpus/kbdwiktionary-entries.json").read_text(encoding="utf-8"))
wik_map = {w["word"]: w for w in wik if w.get("word")}
print(f"Wiktionary: {len(wik_map)}")

# 2. lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 3. IPA ekle
guncellenen_ipa = 0
guncellenen_pos = 0

for l in lex:
    form = l.get("form", "")
    if form in wik_map:
        wik_entry = wik_map[form]
        
        # IPA
        if not l.get("ipa") and wik_entry.get("ipa"):
            l["ipa"] = wik_entry["ipa"]
            guncellenen_ipa += 1
        
        # POS
        if not l.get("partOfSpeech") and wik_entry.get("pos"):
            l["partOfSpeech"] = wik_entry["pos"]
            guncellenen_pos += 1

print(f"\nGüncellenen IPA: {guncellenen_ipa}")
print(f"Güncellenen POS: {guncellenen_pos}")

# 4. Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Toplam: {len(lex)}")
