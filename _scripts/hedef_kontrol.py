import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hedefler = ["щысхьын", "щы", "щыкъуанэ", "щыкъухъыджэбз", "щыкъу",
            "щыкъу щӀалэ", "щыкъу хьэджэбз", "щыпкъэ", "щыкъу адэ",
            "щыблэ", "щытыну", "щытынущ", "щытыныгъ", "щытыныгъэ",
            "щытыпӏэ", "щытыр", "щытых", "щытыщт", "щытэп"]

for form in hedefler:
    bulunan = [l for l in lex if l.get("form") == form]
    if bulunan:
        l = bulunan[0]
        cid = l.get("conceptId", "YOK")
        sid = l.get("subConceptId", "YOK")
        print(f"  {form:30s} | {cid:20s} | {sid}")
    else:
        print(f"  {form:30s} | BULUNAMADI")
