import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
bos = [l for l in lex if not l.get("ipa")]

print(f"IPA'siz: {len(bos)}")

guncellenen = 0
for l in bos:
    form = l.get("form", "")
    if not form or form.strip() in ["-", "-м", "-р", "-рэ"]:
        continue
    l["ipa"] = f"/{form.lower()}/"
    l["ipaSource"] = "fallback"
    guncellenen += 1

print(f"Guncellenen: {guncellenen}")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

ipa_dolu = sum(1 for l in lex if l.get("ipa"))
print(f"Yeni IPA: {ipa_dolu} ({100*ipa_dolu/len(lex):.1f}%)")
