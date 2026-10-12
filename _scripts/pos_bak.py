import os
os.chdir(r"E:\projeler\Cerkesce")

import json

lex = json.load(open("public/data/linguistic/lexemes.json", encoding="utf-8"))
x = [l for l in lex if not l.get("partOfSpeech")]

print("POS'suz toplam:", len(x))
print("-" * 70)

for l in x[:20]:
    print(l["id"], l.get("form", "?"), (l.get("literalMeaning") or "")[:45])