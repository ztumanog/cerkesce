import json
from pathlib import Path
from collections import defaultdict

ROOT_IDS = ["R-BG_2","R-BG_3","R-EUE","R-PSE_1","R-PSE_2","R-EIU","R-USY","R-PASEU",
            "R-IUT","R-TIU","R-TKHU","R-IY","R-ISHCHI","R-SHCHISHCH","R-VES","R-VID",
            "R-VEK","R-VNE","R-MECH","R-PUT","R-UM","R-UKHO","R-KHOD","R-SHEYA",
            "R-BOF","R-BYM","R-TSS","R-UOY","R-UOU","R-UEI","R-UET",
            "R-SI","R-UI","R-DI","R-ZI","R-ABY","R-AR","R-ASHCH","R-SYT","R-TE","R-ZYM","R-MY",
            "R-AUE","R-AU","R-PAE","R-MES","R-MIS","R-ARI","R-ABI","R-ZHI",
            "R-LEN","R-KHUN","R-ZYN","R-SEN","R-ABKHAZ","R-UZHE"]
TARGETS = ["R-BG","R-WA","R-PSA","R-1E","R-USE","R-WUSA","R-PASE","R-1U","R-TE",
           "R-T1U","R-TXU","R-TKHU","R-YSH","R-SHCH"]

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
rt = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
root_ids = {r.get("id") for r in rt} if isinstance(rt, list) else set(rt.keys())

def rids(e):
    v = e.get("rootIds") or (e.get("derivation") or {}).get("rootIds") or []
    return v if isinstance(v, list) else []

print("== HEDEF KOKLER (roots.json) ==")
for t in TARGETS:
    print(f"{t}: {'VAR' if t in root_ids else 'YOK'}")

by = defaultdict(list)
for e in lex:
    for r in rids(e):
        if r in ROOT_IDS:
            by[r].append(e)

print("\n== HER KOK: LEXEME SAYISI VE ORNEK (ilk 5) ==")
for r in ROOT_IDS:
    es = by.get(r, [])
    print(f"\n{r}: {len(es)} lexeme")
    for e in es[:5]:
        print("  ", e.get("id"), "|", e.get("form"), "|",
              e.get("literalMeaning") or e.get("meaning"), "|",
              e.get("partOfSpeech"), "|", e.get("sourceId"), "| rootIds=", rids(e))
