"""
C-9.5 — L-NEGU anlam düzeltme
==============================
C-8'de "göz içi" olarak kaydedilmiş, doğrusu "yüz, sima".
"""
import json
from pathlib import Path

LING = Path("public/data/linguistic")
lx_path = LING / "lexemes.json"
lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

for lx in lexemes:
    if lx["id"] == "L-NEGU":
        old = lx["literalMeaning"]
        lx["literalMeaning"] = "yüz, sima"
        lx["notes"] = (
            "Metonymy: nэ (göz) + гу (bölge) = gözün bölgesi → yüz. "
            "Kardanov (1957): 'область расположения глаз'. "
            "C-8'de yanlış 'göz içi' olarak kaydedilmişti."
        )
        print(f"[FIX] L-NEGU: '{old}' -> 'yüz, sima'")

lx_path.write_text(
    json.dumps(lexemes, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print("OK")
