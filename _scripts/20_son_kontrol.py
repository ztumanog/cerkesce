import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

kelimeler = [
    "зыгъэпсын", "зыщытӀэгъэжын", "гъэкӀэнтӀэн", "гъэлъэпӀэстхъэн",
    "дэгъэкӀуэсыкӀын", "зэрегъэшэн", "зэбгъурышэн", "къыдежьэн",
    "кӀуэцӀыгъэлъэдэн", "кӀэрыубэн", "щӀэшхыкӀын",
    "къызэщӀэубиен", "жьэхэгъэзэрыхьын", "щэнэуэн",
    "щӀакӀуэ-бащлыкъ", "страпил", "уэкъулэ",
    "щэхурыпхъуагъэ", "Ӏурыхьэгъуэ", "батыргъэнпэж"
]

print("=== 20 KELİMENİN SON DURUMU ===")
for k in kelimeler:
    l = next((l for l in lex if l.get("form") == k), None)
    if l:
        lm = (l.get("literalMeaning") or "")[:60]
        print(f"  {k:25s} | {lm}")
    else:
        print(f"  {k:25s} | ❌ BULUNAMADI")
