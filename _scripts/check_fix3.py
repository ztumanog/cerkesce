import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Kontrol 1: гущӀэгъу kaç tane kaldı?
sayi = sum(1 for l in lex if l.get("form") == "гущӀэгъу" and l.get("conceptId") == "COMPASSION")
print(f"гущӀэгъу (COMPASSION): {sayi} (1 olmali)")

# Kontrol 2: гухэлъ conceptIds
for l in lex:
    if l.get("form") == "гухэлъ":
        print(f"гухэлъ conceptIds: {l.get('conceptIds', 'YOK')}")
        print(f"гухэлъ notes: {l.get('notes', 'YOK')[:60]}")

# Kontrol 3: пагагъ seeAlso
for l in lex:
    if l.get("form") == "пагагъ":
        print(f"пагагъ seeAlso: {l.get('seeAlso', 'YOK')}, isVariant: {l.get('isVariant', 'YOK')}")

# Kontrol 4: Toplam EMOTION
emotion_sayisi = sum(1 for l in lex if l.get("conceptId") in {
    "ANGER","COMPASSION","GRIEF","HOPE","JOY","LOVE","FEAR",
    "DOUBT","SUSPICION","BOREDOM","ANXIETY","PEACE","INDIFFERENCE",
    "DISGUST","DISLIKE","LOYALTY","SHAME","RESENTMENT","PRIDE",
    "LAUGH","FEARLESS","CALM","RESPECT","DISGUSTING"
})
print(f"\nToplam EMOTION: {emotion_sayisi} (onceki: 88, simdi ~87 olmali)")
