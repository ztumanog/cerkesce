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

IU = {
    "ӀуапӀэ":          ("PLACE", "LOCATION", "Mekan & Yön"),
    "Ӏуатэ":           ("TELL", "SPEAK", "Kültür & Etkileşim"),
    "Ӏуащхьэбэ":       ("MANY_HILLS", "LANDFORM", "Doğa & Hayvan"),
    "Ӏубзэ":           ("SPEECH", "LANGUAGE", "Kültür & Etkileşim"),
    "Ӏубыгъуэ":        ("BITE_TIME", "EAT", "Yaşam & Sağlık"),
    "Ӏубэнэн":         ("APPROACH", "MOVEMENT", "Eylem & Fiziksel"),
    "Ӏугъуалъэ":       ("CHIMNEY", "CONTAINER", "Eşya & Araç"),
    "Ӏугъуэлъхьэн":    ("SMOKE_IN", "ACTION", "Eylem & Fiziksel"),
    "ӀугъэджэрэзыкӀын":("TURN_AWAY", "MOVEMENT", "Eylem & Fiziksel"),
    "Ӏугъэзын":        ("TURN_BACK", "MOVEMENT", "Eylem & Fiziksel"),
    "Ӏугъэзыхьын":     ("TURN_AROUND", "MOVEMENT", "Eylem & Fiziksel"),
    "ӀугъэзэщӀыкӀын":  ("REPEL", "ACTION", "Eylem & Fiziksel"),
    "ӀугъэкӀыжын":     ("REMOVE", "MOVEMENT", "Eylem & Fiziksel"),
    "Ӏугъэлъын":       ("PLACE_NEAR", "POSITION", "Eylem & Fiziksel"),
    "Ӏугъэлъэдэн":     ("MAKE_RUN", "MOVEMENT", "Eylem & Fiziksel"),
    "ӀугъэлӀыкӀын":    ("KILL_NEAR", "ACTION", "Yaşam & Sağlık"),
    "Ӏугъэплъэн":      ("MAKE_LOOK", "PERCEPTION", "Düşünce & Soyut"),
    "Ӏугъэсын":        ("SEAT_NEAR", "POSITION", "Eylem & Fiziksel"),
}

IU_NORM = {normalize(k): v for k, v in IU.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("Ӏу"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in IU_NORM:
        concept, sub, family = IU_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "Ӏу-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("Ӏу") and not l.get("subConceptId")]
print(f"Ӏу- Belirsiz kalan: {len(belirsiz)}")
