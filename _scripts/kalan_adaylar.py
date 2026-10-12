import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
bos = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

CEKIM = ["м", "р", "у", "щ", "ми", "мэ", "т", "ти", "хэ", "хэм", "хэр", "хэу",
         "къым", "тэкъым", "п", "и", "щт", "тэ", "уэ", "эп", "агъ", "агъэ"]

def cekimli(form):
    if len(form) < 5:
        return False
    for ek in CEKIM:
        if form.endswith(ek) and len(form) > len(ek) + 2:
            return True
    return False

kok = [l for l in bos if not cekimli(l.get("form", ""))]
print(f"Kalan kök/türev adayı: {len(kok)}")
print()
for l in kok:
    print(l.get("form"))
