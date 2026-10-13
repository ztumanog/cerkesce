import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# Kategorize et
kategoriler = {
    "uzun_10plus": [],   # 10+ harf
    "orta_6_9": [],      # 6-9 harf
    "kisa_3_5": [],      # 3-5 harf
    "cok_kelimeli": [],  # bosluklu
    "tek_harf": [],      # 1-2 harf
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

print(f"Toplam kalan: {len(kalan)}\n")
for kat, items in kategoriler.items():
    print(f"{kat:20s}: {len(items)}")

# Her kategoriden 15 ornek
for kat, items in kategoriler.items():
    print(f"\n=== {kat.upper()} (ilk 15) ===")
    for l in items[:15]:
        form = l.get("form", "?")
        pos = l.get("partOfSpeech", "?")
        meaning = (l.get("literalMeaning") or "")[:35]
        print(f"  {form:25s} | {pos:12s} | {meaning}")
