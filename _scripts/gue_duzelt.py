import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

DUZELT = {
    "гуэбэн":   ("EXHAUSTION", "OVERWORK", "Yaşam & Sağlık"),
    "гуэбэнэч": ("CLOTHING", "SHEPHERD_CLOAK", "Eşya & Takı"),
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    norm = normalize(form)
    if norm in DUZELT:
        concept, sub, family = DUZELT[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "гуэ-"
        uygulanan += 1
        print(f"OK: {form} -> {concept}/{sub}")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit duzeltildi")

belirsiz = []
for l in lex:
    form = l.get("form", "")
    if normalize(form).startswith("гуэ"):
        concept = l.get("conceptId") or ""
        sub = l.get("subConceptId") or ""
        if concept in ("BELIRSIZ", "") or sub == "-":
            belirsiz.append(form)

print(f"гуэ- BELIRSIZ kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz:
        print(f"  - {f}")
else:
    print("\n🎉 гуэ- KATEGORİSİ TAM BİTTİ!")
