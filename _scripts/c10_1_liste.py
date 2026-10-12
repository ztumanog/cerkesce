import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# C-9.1 dogrulama raporu
rapor = json.loads(Path("data/corpus/frequency/c9_1_verification.json").read_text(encoding="utf-8"))
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
lex_map = {l["id"]: l for l in lex}

# Bulunmayanlar
bulunmayan = [s for s in rapor["sonuclar"] if s["durum"] == "YOK"]

# Liste olustur
liste = []
for s in bulunmayan:
    l = lex_map.get(s["id"], {})
    liste.append({
        "id": s["id"],
        "form": l.get("form", ""),
        "meaning": l.get("literalMeaning", ""),
        "family": l.get("wordFamilyId", ""),
        "adyghe": l.get("dialectVariants", {}).get("adyghe", l.get("form", "")),
        "kabardian": l.get("dialectVariants", {}).get("kabardian", l.get("form", ""))
    })

# Kaydet
cikti = {
    "toplam": rapor["frekanssiz"],
    "bulunmayan": len(bulunmayan),
    "liste": liste
}
Path("data/corpus/frequency/c10_1_bulunmayanlar.json").write_text(
    json.dumps(cikti, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK: {len(liste)} lexeme kaydedildi")
