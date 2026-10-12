import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Analiz edilen 20 kelime
kelimeler = [
    "зыгъэпсын", "зыщытӀэгъэжын", "гъэкӀэнтӀэн", "гъэлъэпӀэстхъэн",
    "дэгъэкӀуэсыкӀын", "зэрегъэшэн", "зэбгъурышэн", "къыдежьэн",
    "кӀуэцӀыгъэлъэдэн", "кӀэрыубэн", "щӀэшхыкӀын",
    "къызэщӀэукъубиен", "жьэхэгъэзэрыхьын", "щэнэуэн",
    "щӀакӀуэ-бащлыкъ", "страпил", "уэкъулэ",
    "щэхурыпхъуагъэ", "Ӏурыхьэгъуэ", "батыргъэнпэж"
]

print(f"=== 20 KELİME KONTROLÜ ===\n")
var = 0
yok = 0
for k in kelimeler:
    l = next((l for l in lex if l.get("form") == k), None)
    if l:
        var += 1
        print(f"  ✅ {k:30s} | id={l.get('id')} | examples={len(l.get('examples', []))}")
    else:
        yok += 1
        print(f"  ❌ {k:30s} | lexemes.json'da YOK")

print(f"\nVar: {var}, Yok: {yok}")
