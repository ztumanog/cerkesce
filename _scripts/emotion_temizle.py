import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-emotion-temizle-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Kalan 10 kelimeyi EMOTION'dan temizle
TEMIZLE = [
    "гупсэсан", "гурымыхь", "гужьеяуэ", "губжьа", "гузэрыдзэ",
    "гукъыдэмыж", "гурэ", "гукӏэ", "гуакӏуэ", "гущыкӏыгъуэ",
]

temizlenen = 0
for l in lex:
    form = l.get("form", "")
    if form in TEMIZLE and l.get("conceptId") == "EMOTION":
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + " [EMOTION belirsiz temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {form}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

# Kontrol
from collections import Counter
emotion = [l for l in lex if l.get("subConceptId") == "EMOTION"]
print(f"\nEMOTION kayitlari: {len(emotion)}")
cid = Counter(l.get("conceptId") for l in emotion)
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")

kalan = [l for l in lex if l.get("conceptId") == "EMOTION"]
print(f"\nEMOTION genel kalan: {len(kalan)}")
