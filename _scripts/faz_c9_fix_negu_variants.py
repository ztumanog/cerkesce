"""
C-9.5 — L-NEGU ve L-NEGUM diyalekt varyanti ekle
"""
import json
from pathlib import Path

LING = Path("public/data/linguistic")
lx_path = LING / "lexemes.json"
lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

FIXES = {
    "L-NEGU": {
        "form": "nэгу",
        "adyghe": "nэгу",
        "kabardian": "nэгу",
        "literalMeaning": "yüz, sima",
    },
    "L-NEGUM": {
        "form": "nэгум",
        "adyghe": "nэгум",
        "kabardian": "nэгум",
        "literalMeaning": "yüzüm",
    },
}

for lx in lexemes:
    if lx["id"] in FIXES:
        fix = FIXES[lx["id"]]
        lx["dialectVariants"] = {
            "adyghe": fix["adyghe"],
            "kabardian": fix["kabardian"],
        }
        lx["literalMeaning"] = fix["literalMeaning"]
        print(f"[FIX] {lx['id']}: {fix['literalMeaning']}")

lx_path.write_text(
    json.dumps(lexemes, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print("OK")
