import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# къуапэзадэ silinmeyecek - listeden cikar
silinecek = [
    "L-PSEK1UED", "L-MAF1ASHE", "L-BZEDYDHU", "L-DZELHYQHU",
    "L-PSELHYQHUE", "L-NEPC1YSHCH", "L-PSYBDZE",
    "L-KUAPEZEV",  # къуапэзадэ CIKARILDI
    "L-PSYC1YQ1U", "L-UNEC1YQ1U", "L-NYBZHYC1YQ1U",
    "L-1UEKHUC1YQ1U", "L-MAF1EC1YQ1U",
    "L-TSYZHY", "L-PSEFET",
    "L-KUADZHE-NADZHE", "L-UNERYUE", "L-UNEKHEH1E",
    "L-UNEGUNESHCH", "L-UNEBZHE1UP1E", "L-UNEPKHASHE",
    "L-UNESHHAP1E", "L-UNESHXHE"
]

onceki = len(lex)
lex = [l for l in lex if l["id"] not in silinecek]
silinen = onceki - len(lex)

# къуапэзадэ notunu guncelle
for l in lex:
    if l["id"] == "L-KUAPEZADE":
        l["notes"] = "C-11.3: dik aci. circassianstudies.org dogruladi."
        print("L-KUAPEZADE dogrulandi: dik aci")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nSilinen: {silinen}")
print(f"Kalan lexeme: {len(lex)}")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
