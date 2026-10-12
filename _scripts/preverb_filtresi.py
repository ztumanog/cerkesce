import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# нэ ve дэ preverb kökleri
PREVERB_ROOTS = {"нэ": "R-NA", "дэ": "R-DA"}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if not root_ids:
        continue

    for pv_form, pv_root in PREVERB_ROOTS.items():
        if pv_root in root_ids:
            # Tam eşleşme değilse ve kelime başında değilse çıkar
            if form != pv_form and not form.startswith(pv_form):
                root_ids.remove(pv_root)
                guncellenen += 1
            # Kelime başındaysa ve başka kök de varsa (compound), çıkar
            elif form.startswith(pv_form) and len(form) > len(pv_form) and len(root_ids) > 1:
                root_ids.remove(pv_root)
                guncellenen += 1

    l["rootIds"] = root_ids

print(f"Güncellenen: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Kaydedildi")
