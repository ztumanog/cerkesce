import json
from pathlib import Path

# Lehçe varyantları (KBD vs ADY)
VARIANTS = {
    "вакъэ": {"adyghe": "цуакъэ", "kabardian": "вакъэ"},
    "вагъуэ": {"adyghe": "жъуагъуэ", "kabardian": "вагъуэ"},
    "мафӀэ": {"adyghe": "машӀу", "kabardian": "мафӀэ"},
    "фыз": {"adyghe": "шъуз", "kabardian": "фыз"},
    "завэ": {"adyghe": "зажъуэ", "kabardian": "завэ"},
    "тху": {"adyghe": "тфы", "kabardian": "тху"},
    # Fiiller
    "сщӀэ": {"adyghe": "сшӀэ", "kabardian": "сщӀэ"},
    "сщӀаркъым": {"adyghe": "сшӀэрап", "kabardian": "сщӀаркъым"},
}

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in VARIANTS:
        l["dialectVariants"] = VARIANTS[form]
        guncellenen += 1

print(f"dialectVariants güncellenen: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK Kaydedildi")
