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

PSELH = {
    "псэлъалэ":         ("TALK", "CHATTERBOX", "Dil & Konuşma"),
    "псэлъапӀэ":        ("LOCATION", "SPEECH_PLACE", "Dil & Konuşma"),
    "псэлъафэ":         ("LANGUAGE", "DIALECT_STYLE", "Dil & Konuşma"),
    "псэлъыхъу":        ("MARRIAGE", "SUITOR", "İletişim & Evlilik"),
    "псэлъыхъугъуэ":    ("MARRIAGE", "SUITOR_PERIOD", "İletişim & Evlilik"),
    "псэлъыхъуншэ":     ("MARRIAGE", "UNSUITED", "İletişim & Evlilik"),
    "псэлъэ":           ("SPEECH", "WORD_SPEECH", "Dil & Konuşma"),
    "псэлъэгъу":        ("INTERLOCUTOR", "PARTNER", "Dil & Konuşma"),
    "псэлъэгъуей":      ("CHARACTER", "DIFFICULT_SPEAKER", "Dil & Konuşma"),
    "псэлъэкъуэн":      ("GOSSIP", "CHATTING", "Dil & Konuşma"),
    "псэлъэкӀэмыщӀэ":   ("SKILL", "INEPT_SPEAKER", "Dil & Konuşma"),
    "псэлъэкӀэ":        ("STYLE", "MANNER_SPEAK", "Dil & Konuşma"),
    "псэлъэн":          ("SPEAK", "SPEAK_ACTION", "Dil & Konuşma"),
    "псэлъэныгъэ":      ("SPEECH", "ORATORY", "Dil & Konuşma"),
    "псэлъэрей":        ("CHARACTER", "TALKATIVE", "Dil & Konuşma"),
    "псэлъэрилэ":       ("CHARACTER", "CHATTERBOX", "Dil & Konuşma"),
}

PSELH_NORM = {normalize(k): v for k, v in PSELH.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("псэлъ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in PSELH_NORM:
        concept, sub, family = PSELH_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "псэлъ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("псэлъ") and not l.get("subConceptId")]
print(f"псэлъ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 псэлъ- KATEGORİSİ TAM BİTTİ!")
