# -*- coding: utf-8 -*-
import json
from pathlib import Path
from collections import defaultdict

BASE = Path("public/data/linguistic")
roots = json.loads((BASE/"roots.json").read_text(encoding="utf-8"))
lexemes = json.loads((BASE/"lexemes.json").read_text(encoding="utf-8"))

# form -> tanimli kok id'leri
form_map = defaultdict(list)
for r in roots:
    if isinstance(r, dict) and r.get("form"):
        form_map[r["form"]].append(r["id"])

root_ids = {r.get("id") for r in roots if isinstance(r, dict)}
EKSIK = """R-BEG_1 R-BG_2 R-BG_3 R-BLY R-BZHA2 R-BZIIKHU R-CHYGAE R-DA R-DAE R-DI
R-DU R-DY R-DYD R-DZY R-GUASCHA R-ISHCHI R-IUKH R-IUS R-IUSH R-IUSHCH R-IUT R-IUV
R-KIEY R-KUO R-KU_1 R-LE R-NA R-NY R-PASEU R-PSE_1 R-PSE_2 R-PSI R-PSO R-SHCHABZ
R-SHCHISHCH R-SHU R-TIU R-TSE R-TSU R-UE R-VA""".split()

# kirik id -> hangi lexeme'lerin derivation'inda geciyor + form
kirik_form = {}
for e in lexemes:
    d = e.get("derivation") or {}
    for rid in d.get("rootIds", []):
        if rid in EKSIK:
            kirik_form.setdefault(rid, e.get("form", "?"))

print("kirik_id | lexeme_form | ayni_formda_tanimli_kokler")
for k in sorted(EKSIK):
    f = kirik_form.get(k, "?")
    print(f"{k} | {f} | {form_map.get(f, 'YOK')}")
