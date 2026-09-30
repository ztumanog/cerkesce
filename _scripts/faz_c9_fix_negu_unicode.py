import json
from pathlib import Path

LING = Path("public/data/linguistic")
lx_path = LING / "lexemes.json"
lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

# Doğru Kiril formları (unicode escape)
CORRECT = {
    "L-NEGU": {
        "form": "\u043d\u044d\u0433\u0443",           # нэгу
        "adyghe": "\u043d\u044d\u0433\u0443",         # нэгу
        "kabardian": "\u043d\u044d\u0433\u0443",      # нэгу
    },
    "L-NEGUM": {
        "form": "\u043d\u044d\u0433\u0443\u043c",     # нэгум
        "adyghe": "\u043d\u044d\u0433\u0443\u043c",   # нэгум
        "kabardian": "\u043d\u044d\u0433\u0443\u043c",# нэгум
    },
}

for lx in lexemes:
    if lx["id"] in CORRECT:
        fix = CORRECT[lx["id"]]
        old_form = lx["form"]
        lx["form"] = fix["form"]
        lx["dialectVariants"] = {
            "adyghe": fix["adyghe"],
            "kabardian": fix["kabardian"],
        }
        print(f"[FIX] {lx['id']}: '{old_form}' -> '{fix['form']}'")

lx_path.write_text(
    json.dumps(lexemes, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print("OK")
