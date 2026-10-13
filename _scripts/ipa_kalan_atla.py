import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Kalan 5'e "null" IPA ekle (veya bos birak)
guncellenen = 0
for l in lex:
    form = l.get("form", "").strip()
    if form in ["-", "-м", "-р", "-рэ"] and not l.get("ipa"):
        l["ipa"] = None
        l["ipaSource"] = "skipped-grammatical"
        guncellenen += 1

print(f"Isaretlenen: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")

# Final durum
for alan in ["rootIds", "wordFamilyId", "conceptId", "derivation", "ipa"]:
    dolu = sum(1 for l in lex if l.get(alan))
    print(f"  {alan:20s} {dolu:6}/{len(lex)} ({100*dolu/len(lex):.1f}%)")
