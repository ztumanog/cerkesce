import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

# Kategorize et
kategoriler = {
    "uzun_10plus": [],
    "orta_6_9": [],
    "kisa_3_5": [],
    "cok_kelimeli": [],
    "tek_harf": [],
}

for l in kalan:
    form = l.get("form", "")
    if " " in form:
        kategoriler["cok_kelimeli"].append(l)
    elif len(form) <= 2:
        kategoriler["tek_harf"].append(l)
    elif len(form) <= 5:
        kategoriler["kisa_3_5"].append(l)
    elif len(form) <= 9:
        kategoriler["orta_6_9"].append(l)
    else:
        kategoriler["uzun_10plus"].append(l)

print(f"\n=== KATEGORI DAGILIMI ===")
for kat, items in kategoriler.items():
    print(f"  {kat:20s}: {len(items)}")

# Her kategoriden 20 ornek
for kat, items in kategoriler.items():
    print(f"\n=== {kat.upper()} (ilk 20) ===")
    for l in items[:20]:
        form = l.get("form", "?")
        pos = l.get("partOfSpeech", "?")
        meaning = (l.get("literalMeaning") or "")[:35]
        print(f"  {form:25s} | {pos:12s} | {meaning}")
