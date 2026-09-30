
"""
C-9.5 — L-NAPS (gözyaşı) diyalekt varyantı düzeltme
"""
import json
from pathlib import Path

LING = Path("public/data/linguistic")
lx_path = LING / "lexemes.json"
lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

FIXES = {
    "L-NAPS": {
        # Adyghe: nэпсы (uzun), Kabardey: nэпс (kısa)
        "form": "\u043d\u044d\u043f\u0441\u044b",           # nэпсы
        "adyghe": "\u043d\u044d\u043f\u0441\u044b",         # nэпсы
        "kabardian": "\u043d\u044d\u043f\u0441",            # nэпс
        "literalMeaning": "gözyaşı",
    },
    # L-NEPSEY: Kabardey'e ozel
    "L-NEPSEY": {
        "form": "\u043d\u044d\u043f\u0441\u0435\u0439",     # nэпсей
        "adyghe": "",                                        # Adyghe'de yok
        "kabardian": "\u043d\u044d\u043f\u0441\u0435\u0439",# nэпсей
        "literalMeaning": "gözü yaşlı",
        "notes_suffix": "KABARDEY'E OZEL. Adyghe karsiligi corpus'ta yok.",
    },
}

for lx in lexemes:
    if lx["id"] in FIXES:
        fix = FIXES[lx["id"]]
        old_form = lx["form"]
        lx["form"] = fix["form"]
        lx["dialectVariants"] = {
            "adyghe": fix["adyghe"],
            "kabardian": fix["kabardian"],
        }
        lx["literalMeaning"] = fix["literalMeaning"]
        if "notes_suffix" in fix:
            if "notes" not in lx:
                lx["notes"] = ""
            lx["notes"] += " " + fix["notes_suffix"]
        print(f"[FIX] {lx['id']}: '{old_form}' -> '{fix['form']}'")

lx_path.write_text(
    json.dumps(lexemes, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print("OK")
