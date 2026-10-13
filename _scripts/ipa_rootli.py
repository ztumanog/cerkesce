import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
bos = [l for l in lex if not l.get("ipa")]

print(f"IPA'siz: {len(bos)}")

# Root'lu olanlar
rootli = [l for l in bos if l.get("rootIds")]
print(f"Root'lu: {len(rootli)}")

# Root'lu olanlara IPA ver
guncellenen = 0
for l in rootli:
    form = l.get("form", "")
    if not form:
        continue
    
    # Basit IPA tahmini (form'dan)
    ipa = f"/{form.lower()}/"
    l["ipa"] = ipa
    l["ipaSource"] = "form-derived"
    guncellenen += 1

print(f"Guncellenen: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Yeni durum
ipa_dolu = sum(1 for l in lex if l.get("ipa"))
print(f"\nYeni IPA dolu: {ipa_dolu} ({100*ipa_dolu/len(lex):.1f}%)")
