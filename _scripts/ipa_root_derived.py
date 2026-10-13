import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Root -> IPA mapping (mevcut IPA'lardan)
root_ipa_map = {}
for l in lex:
    if l.get("ipa") and l.get("rootIds"):
        for rid in l["rootIds"]:
            if rid not in root_ipa_map:
                root_ipa_map[rid] = l["ipa"]

print(f"Root -> IPA mapping: {len(root_ipa_map)}")

# IPA'siz lexeme'lere root IPA'sini uygula
guncellenen = 0
atlanan = 0

for l in lex:
    if l.get("ipa"):
        continue
    
    if l.get("rootIds"):
        for rid in l["rootIds"]:
            if rid in root_ipa_map:
                l["ipa"] = root_ipa_map[rid]
                l["ipaSource"] = "root-derived"
                guncellenen += 1
                break
        else:
            atlanan += 1
    else:
        atlanan += 1

print(f"Guncellenen (root-derived): {guncellenen}")
print(f"Atlanan: {atlanan}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Yeni durum
ipa_dolu = sum(1 for l in lex if l.get("ipa"))
print(f"\nYeni IPA dolu: {ipa_dolu} ({100*ipa_dolu/len(lex):.1f}%)")
print(f"Yeni IPA bos: {len(lex) - ipa_dolu}")
