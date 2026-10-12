import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Yapay turevler
yapay = [
    "L-KUAPETXHUYME", "L-KUAPEXHIME", "L-KUAPEZADE", "L-KUAPEZEV",
    "L-KUAPEPAPC1E", "L-KUAPEPAGUE",
    "L-UNEBZHE1UP1E", "L-UNEPKHASHE", "L-UNESHHAP1E", "L-UNEPL1ANAPE",
    "L-UNESHXHE", "L-UNESHHYB", "L-UNERYXHE-UNERYK1YU", "L-UNEGUNESHCH",
    "L-UNEKHEH1E", "L-UNEK1AF1E", "L-PSEBYDE", "L-PSE1UV", "L-BZEDYDHU",
    "L-PSEK1UED", "L-PSE1UX", "L-MAF1ASHE", "L-DZELHYQHU", "L-PSELHYQHUE",
    "L-PSEGHEPSK1", "L-PSETEXHUE", "L-NEPC1YSHCH", "L-PSYBDZE",
    "L-NEBZHYTSYLE", "L-KUADZHE-NADZHE", "L-UNET1YN", "L-UNESH1YN",
    "L-UNASH1E", "L-UNEGHASH1E", "L-UNETS1EDZHEGHU",
    "L-PSYC1YQ1U", "L-UNEC1YQ1U", "L-NYBZHYC1YQ1U", "L-1UEKHUC1YQ1U",
    "L-MAF1EC1YQ1U"
]

isaretlenen = 0
for l in lex:
    if l["id"] in yapay:
        l["status"] = "synthetic"
        l["notes"] = (l.get("notes", "") + " [YAPAY TUREV - korpus kaniti yok]").strip()
        isaretlenen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Isaretlenen: {isaretlenen}")
print(f"Toplam lexeme: {len(lex)}")
