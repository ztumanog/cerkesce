import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0

# 1. Meslek eki -акӀуэ: кІуэн kökünü çıkar
for l in lex:
    form = l.get("form", "")
    if form.endswith("акӀуэ") or form.endswith("акӏуэ"):
        root_ids = l.get("rootIds", [])
        if "R-KWA" in root_ids:
            root_ids.remove("R-KWA")
            l["rootIds"] = root_ids
            guncellenen += 1

# 2. Soyut sonek -гъуэ: шыгъу (tuz) kökünü çıkar
for l in lex:
    form = l.get("form", "")
    if form.endswith("гъуэ") and "шыгъу" not in form:
        root_ids = l.get("rootIds", [])
        if "R-SHYGHW" in root_ids:
            root_ids.remove("R-SHYGHW")
            l["rootIds"] = root_ids
            guncellenen += 1

# 3. Soyut sonek -гъэ: дагъэ (yağ) kökünü çıkar
for l in lex:
    form = l.get("form", "")
    if form.endswith("гъэ") and not form.endswith("дагъэ"):
        root_ids = l.get("rootIds", [])
        if "R-DAGHA" in root_ids:
            root_ids.remove("R-DAGHA")
            l["rootIds"] = root_ids
            guncellenen += 1

# 4. -гъэ ile biten ama дагъэ olmayan kelimelerde R-DAGHA'yı çıkar
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if "R-DAGHA" in root_ids and form != "дагъэ":
        root_ids.remove("R-DAGHA")
        l["rootIds"] = root_ids
        guncellenen += 1

# 5. R-QWASH (kardeş) yanlış pozitifleri
for l in lex:
    form = l.get("form", "")
    if form in ["быркъуэшыркъуэ"]:
        root_ids = l.get("rootIds", [])
        if "R-QWASH" in root_ids:
            root_ids.remove("R-QWASH")
            l["rootIds"] = root_ids
            guncellenen += 1

# 6. R-WAS (kar/çam) alıntıları
for l in lex:
    form = l.get("form", "")
    if form in ["осыет", "осетин"]:
        root_ids = l.get("rootIds", [])
        if "R-WAS" in root_ids:
            root_ids.remove("R-WAS")
            l["rootIds"] = root_ids
            guncellenen += 1

# 7. R-CHET (tavuk) alıntıları
for l in lex:
    form = l.get("form", "")
    if form in ["хьэрычэт", "берычэт", "чэтэн"]:
        root_ids = l.get("rootIds", [])
        if "R-CHET" in root_ids:
            root_ids.remove("R-CHET")
            l["rootIds"] = root_ids
            guncellenen += 1

print(f"Güncellenen kelime: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
