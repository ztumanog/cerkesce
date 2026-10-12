import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# псэкӏэ (küçük palochka) kaydını bul ve güncelle
uygulanan = 0
for l in lex:
    form = l.get("form", "")
    # Normalize edilmiş form kontrolü
    norm = form.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")
    if norm == "псэкӀэ":
        l["conceptId"] = "SOUL"
        l["subConceptId"] = "WITH_SOUL"
        l["taxonomyFamily"] = "Ruh & Can"
        l["rootForm"] = "псэ-"
        if not l.get("partOfSpeech"):
            l["partOfSpeech"] = "noun"
        uygulanan += 1
        print(f"OK: {repr(form)} guncellendi (norm: {repr(norm)})")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam: {uygulanan} kayit")
