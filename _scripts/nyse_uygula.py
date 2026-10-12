import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04e0')
    text = text.replace('I', '\u04e0').replace('l', '\u04e0').replace('1', '\u04e0')
    return text.strip()

# === NYSE (elti/gelin) ===
NYSE = {
    "нысэ":         ("BRIDE", "BRIDE_DAUGHTER_IN_LAW", "Aile & Akrabalık"),
    "нысэгъу":      ("SISTER_IN_LAW", "SISTER_IN_LAW_FEMALE", "Aile & Akrabalık"),
    "нысэишэ":      ("MARRIAGE", "BRIDE_FETCHING_CEREMONY", "Toplum & Gelenek"),
    "нысэлъыхъу":   ("MARRIAGE", "BRIDE_SEEKING", "Toplum & Gelenek"),
    "нысэм":        ("GRAMMAR", "BRIDE_OBLIQUE", "Dil & Gramer"),
    "нысэцӀэ":      ("NAME", "BRIDE_NICKNAME", "Toplum & Gelenek"),
    "нысэщэ":       ("MARRIAGE", "BRIDE_BRINGING", "Toplum & Gelenek"),
}

NYSE_NORM = {normalize(k): v for k, v in NYSE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("нысэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in NYSE_NORM:
        concept, sub, family = NYSE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "нысэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi (нысэ-)")

# Kontrol: мэл-
mel_belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("мэл") and not l.get("subConceptId")]
print(f"мэл- Belirsiz kalan: {len(mel_belirsiz)}")
if mel_belirsiz:
    print("  İlk 10:")
    for f in mel_belirsiz[:10]:
        print(f"    - {f}")

nyse_belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("нысэ") and not l.get("subConceptId")]
print(f"нысэ- Belirsiz kalan: {len(nyse_belirsiz)}")
if nyse_belirsiz:
    for f in nyse_belirsiz[:10]:
        print(f"    - {f}")
else:
    print("🎉 нысэ- KATEGORİSİ TAM BİTTİ!")
