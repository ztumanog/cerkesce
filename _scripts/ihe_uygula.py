import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# DOĞRU normalize: TÜM palochka'ları 0x4c0'a (büyük Ӏ) çevir
def normalize(text):
    if not text:
        return ""
    text = text.replace("\u04cf", "\u04c0")  # küçük ӏ → büyük Ӏ
    text = text.replace("\u04e0", "\u04c0")  # yanlış Ӏ → doğru Ӏ
    text = text.replace("\u0406", "\u04c0")  # Ukraynaca І → palochka
    text = text.replace("I", "\u04c0")
    text = text.replace("l", "\u04c0")
    text = text.replace("1", "\u04c0")
    return text.strip()

IHE = {
    "Ӏэ":              ("HAND", "HAND_BODY", "İnsan & Beden"),
    "Ӏэпэ":            ("FINGER", "FINGER_BODY", "İnsan & Beden"),
    "Ӏэгу":            ("PALM", "PALM_BODY", "İnsan & Beden"),
    "Ӏэпщэ":           ("WRIST", "WRIST_BODY", "İnsan & Beden"),
    "Ӏэблэ":           ("ARM", "ARM_SHOULDER", "İnsan & Beden"),
    "Ӏэпхъуамбэ":      ("FINGER", "FINGER_HAND", "İnsan & Beden"),
    "Ӏэщхьэ":          ("SLEEVE", "SLEEVE_CLOTH", "İnsan & Beden"),
    "Ӏэгъуэпэ":        ("ELBOW", "ELBOW_JOINT", "İnsan & Beden"),
    "Ӏэлъэ":           ("GLOVE", "GLOVE_CLOTHING", "Eşya & Takı"),
    "Ӏэлъын":          ("RING", "RING_JEWELRY", "Eşya & Takı"),
    "Ӏэпщэхъу":        ("BRACELET", "JEWELRY", "Eşya & Takı"),
    "Ӏэпхъуалъэ":      ("THIMBLE", "SEWING_TOOL", "Eşya & Takı"),
    "Ӏэжь":            ("HANDLE", "HANDLE_TOOL", "Eşya & Araç"),
    "Ӏэнэ":            ("TABLE", "TABLE_FURNITURE", "Eşya & Mutfak"),
    "Ӏэщэ":            ("WEAPON", "WEAPON_ARM", "Eşya & Savaş"),
    "Ӏэмэпсымэ":       ("TOOL", "EQUIPMENT_TOOL", "Eşya & Araç"),
    "Ӏыгъын":          ("HOLD", "HOLD_ACTION", "Eylem & Fiziksel"),
    "Ӏэтын":           ("RAISE", "RAISE_HAND", "Eylem & Fiziksel"),
    "ӀэплӀэ":          ("EMBRACE", "EMBRACE_ARM", "Eylem & Fiziksel"),
    "Ӏэгуауэ":         ("APPLAUSE", "APPLAUSE_HAND", "Kültür & Etkileşim"),
    "ӀэщӀэгъэхун":     ("INVOLUNTARY", "ACCIDENTAL_DROP", "Eylem & Gramer"),
    "ӀэщӀэукӀын":      ("INVOLUNTARY", "ACCIDENTAL_KILL", "Eylem & Gramer"),
    "ӀэщӀэщӀын":       ("INVOLUNTARY", "ACCIDENTAL_ACTION", "Eylem & Gramer"),
    "Ӏэрытх":          ("MANUSCRIPT", "HANDWRITING", "Eylem & Yazı"),
    "Ӏэрысэ":          ("TAME", "DOMESTICATED", "Nitelik & Doğa"),
    "ӀэкӀуэлъакӀуэ":   ("SKILLFUL", "HANDY_PERSON", "Nitelik & Beceri"),
    "ӀэщӀагъэ":        ("CRAFT", "CRAFT_TRADE", "Toplum & Meslek"),
    "Ӏэуж":            ("TRACE", "HAND_TRACE", "Kültür & Beden"),
    "Ӏэмал":           ("MEANS", "METHOD_OPTION", "Düşünce & Soyut"),
}

IHE_NORM = {normalize(k): v for k, v in IHE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("Ӏэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in IHE_NORM:
        concept, sub, family = IHE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "Ӏэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("Ӏэ") and not l.get("subConceptId")]
print(f"Ӏэ- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 Ӏэ- KATEGORİSİ TAM BİTTİ!")
