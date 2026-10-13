import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Diyalekt normalizasyon (Adige <-> Kabardey)
def normalize(s):
    replacements = [
        ("шъ", "щ"), ("жъ", "жь"), ("чъ", "ч"),
        ("кӀ", "чӀ"), ("тӀ", "щӀ"),
        ("ӏ", "Ӏ"), ("l", "ӏ")  # Latin l -> Kiril ӏ
    ]
    for old, new in replacements:
        s = s.replace(old, new)
    return s.lower()

# Root stem haritasi olustur (rootIds'li lexeme'lerden)
root_stems = {}
for l in lex:
    if l.get("rootIds") and l.get("wordFamilyId"):
        form = l.get("form", "")
        if form and len(form) >= 3:
            stem = normalize(form[:3])
            if stem not in root_stems:
                root_stems[stem] = (
                    l["rootIds"][0],
                    l["wordFamilyId"]
                )

print(f"Root stems: {len(root_stems)}")

# rootIds olmayanlar
kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

guncellenen = 0

for l in kalan:
    form = l.get("form", "")
    if not form or len(form) < 4:
        continue
    
    # Ilk 3 karakter stem
    stem = normalize(form[:3])
    
    if stem in root_stems:
        root_id, wf_id = root_stems[stem]
        l["rootIds"] = [root_id]
        l["wordFamilyId"] = wf_id
        if not l.get("derivation"):
            l["derivation"] = {
                "rootIds": [root_id],
                "morphemeIds": [],
                "rule": "compound"
            }
        guncellenen += 1

print(f"Guncellenen (fuzzy stem): {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
