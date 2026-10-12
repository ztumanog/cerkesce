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

# тхьэ- TAM LİSTE (Mimar onaylı)
THLE = {
    # Tanrı & İnanç
    "тхьэ":              ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэлӏыкӏо":        ("PROPHET", "GOD_MESSENGER", "Tanrı & İnanç"),
    "тхьэлӏыкӏом":       ("PROPHET", "GOD_MESSENGER", "Tanrı & İnanç"),
    "тхьэлӏыкӏоу":       ("PROPHET", "GOD_MESSENGER", "Tanrı & İnanç"),
    "тхьэм":             ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэми":            ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэмрэ":           ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэнапэ":          ("ICON", "ICON_RELIGIOUS", "Tanrı & İnanç"),
    "тхьэнапэхэм":       ("ICON", "ICON_RELIGIOUS", "Tanrı & İnanç"),
    "тхьэншэ":           ("GODLESS", "GOD_NONE", "Tanrı & İnanç"),
    "тхьэпэлъытэ":       ("GODLIKE", "GOD_LIKE", "Tanrı & İnanç"),
    "тхьэр":             ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэращ":           ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэри":            ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэу":             ("GOD", "GOD_INVOCATION", "Tanrı & İnanç"),
    "тхьэуэ":            ("GOD", "GOD_INVOCATION", "Tanrı & İnanç"),
    "тхьэхулъэху":       ("BLESSING", "PRAYER_BLESSING", "Tanrı & İnanç"),
    "тхьэхэм":           ("GOD", "GOD_PLURAL", "Tanrı & İnanç"),
    "тхьэхэр":           ("GOD", "GOD_PLURAL", "Tanrı & İnanç"),
    "тхьэшхуэ":          ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    "тхьэшхуэм":         ("GOD", "GOD_SUPREME", "Tanrı & İnanç"),
    
    # Dua & Yemin
    "тхьэгъэпсэу":       ("BLESSING", "PRAYER_BLESSING", "Dua & Yemin"),
    "тхьэгъэпцӀ":        ("OATH", "OATH_FALSE", "Dua & Yemin"),
    "тхьэгъэпцӀыгъэ":    ("OATH", "OATH_FALSE", "Dua & Yemin"),
    "тхьэдауэ":          ("OATH", "OATH_DISPUTE", "Dua & Yemin"),
    "тхьэлъанэ":         ("OATH", "OATH_TAKING", "Dua & Yemin"),
    "тхьэлъэӀупэ":       ("PRAYER", "PRAYER_REQUEST", "Dua & Yemin"),
    "тхьэлъэӀу":         ("PRAYER", "PRAYER_REQUEST", "Dua & Yemin"),
    "тхьэлъэӀум":        ("PRAYER", "PRAYER_REQUEST", "Dua & Yemin"),
    "тхьэлъэӀупӀэ":      ("PLACE", "PRAYER_PLACE", "Dua & Yemin"),
    "тхьэлъэӀур":        ("PRAYER", "PRAYER_REQUEST", "Dua & Yemin"),
    "тхьэмкӀэ":          ("OATH", "OATH_NAME", "Dua & Yemin"),
    "тхьэмщӀыгъу":       ("BLESSING", "PRAYER_BLESSING", "Dua & Yemin"),
    "тхьэрыӀуапӀэ":      ("OATH", "OATH_PLACE", "Dua & Yemin"),
    "тхьэрыӀо":          ("OATH", "OATH_TAKING", "Dua & Yemin"),
    "тхьэрыӀуэ":         ("OATH", "OATH_TAKING", "Dua & Yemin"),
    
    # Baş & Kafa
    "тхьэкӀумагуэ":      ("EAR", "EAR_DEAF", "Baş & Kafa"),
    "тхьэкӀумакӀэ":      ("EAR", "EAR_LOBE", "Baş & Kafa"),
    "тхьэкӀумапэ":       ("EAR", "EAR_PART", "Baş & Kafa"),
    "тхьэкӀумафӀэ":      ("EAR", "EAR_STATE", "Baş & Kafa"),
    "тхьэкӀумэ":         ("EAR", "EAR_BODY", "Baş & Kafa"),
    "тхьэкӀумэкӀыхь":    ("EAR", "EAR_LONG", "Baş & Kafa"),
    "тхьэкӀумэӀупс":     ("EAR", "EAR_WAX", "Baş & Kafa"),
    "тхьэкӏумэм":        ("EAR", "EAR_BODY", "Baş & Kafa"),
    "тхьэкӏумэр":        ("EAR", "EAR_BODY", "Baş & Kafa"),
    "тхьэкӏумэхэр":      ("EAR", "EAR_BODY", "Baş & Kafa"),
    
    # Hayvanlar & Kuşlar
    "тхьэкӀумэхуэ":      ("RABBIT", "ANIMAL_RABBIT", "Hayvanlar & Kuşlar"),
    "тхьэкӏумэкӏыхьым":  ("RABBIT", "ANIMAL_RABBIT", "Hayvanlar & Kuşlar"),
    "тхьэкӏумэкӏыхьыр":  ("RABBIT", "ANIMAL_RABBIT", "Hayvanlar & Kuşlar"),
    "тхьэрыкъуэ":        ("PIGEON", "BIRD_PIGEON", "Hayvanlar & Kuşlar"),
    "тхьэӀкумэчӀыхь":    ("RABBIT", "ANIMAL_RABBIT", "Hayvanlar & Kuşlar"),
    
    # Zaman & Takvim
    "тхьэмафэм":         ("WEEK", "TIME_WEEK", "Zaman & Takvim"),
    "тхьэмахуэ":         ("WEEK", "TIME_WEEK", "Zaman & Takvim"),
    "тхьэмахуэкӏэ":      ("WEEK", "TIME_WEEK", "Zaman & Takvim"),
    "тхьэмахуэм":        ("WEEK", "TIME_WEEK", "Zaman & Takvim"),
    "тхьэмахуэр":        ("WEEK", "TIME_WEEK", "Zaman & Takvim"),
    
    # Bitki & Doğa
    "тхьэкӏэ":           ("LEAF", "LEAF_PART", "Bitki & Doğa"),
    "тхьэмпищ":          ("LEAF", "LEAF_PLANT", "Bitki & Doğa"),
    "тхьэмпэ":           ("LEAF", "LEAF_PLANT", "Bitki & Doğa"),
    "тхьэмпэхэр":        ("LEAF", "LEAF_PLANT", "Bitki & Doğa"),
    "тхьэпэ":            ("LEAF", "LEAF_PLANT", "Bitki & Doğa"),
    "тхьэрыкъуэф":       ("PLANT", "PLANT_HERB", "Bitki & Doğa"),
    
    # Eşya & Araçlar
    "тхьэгъу":           ("RING", "OBJECT_RING", "Eşya & Araçlar"),
    "тхьэгъуш":          ("RING", "OBJECT_RING", "Eşya & Araçlar"),
    
    # Toplum & Liderlik
    "тхьэмадэ":          ("LEADER", "LEADER_ELDER", "Toplum & Liderlik"),
    "тхьэмадэм":         ("LEADER", "LEADER_ELDER", "Toplum & Liderlik"),
    "тхьэмадэр":         ("LEADER", "LEADER_ELDER", "Toplum & Liderlik"),
    "тхьэматэ":          ("LEADER", "LEADER_ELDER", "Toplum & Liderlik"),
    "тхьэматэм":         ("LEADER", "LEADER_ELDER", "Toplum & Liderlik"),
    "тхьэмэтэ":          ("LEADER", "LEADER_ELDER", "Toplum & Liderlik"),
    
    # Kutsal & Mitoloji
    "тхьэгурымагъуэ":    ("MYTHOLOGY", "DEITY_HEARTH", "Kutsal & Mitoloji"),
    "тхьэгъэгурым":      ("DEITY", "DEITY_HEARTH", "Kutsal & Mitoloji"),
    "тхьэгъэлэдж":       ("DEITY", "DEITY_AGRICULTURE", "Kutsal & Mitoloji"),
    "тхьэшхуэудж":       ("DANCE", "DANCE_RELIGIOUS", "Kutsal & Mitoloji"),
    "тхьэӏухуд":         ("MYTHOLOGY", "DEITY_NYMPH", "Kutsal & Mitoloji"),
    
    # Duygu & Durum
    "тхьэмыщкӀабэ":      ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӀапӀэ":     ("POOR", "POOR_PLACE", "Duygu & Durum"),
    "тхьэмыщкӀафэ":      ("POOR", "POOR_LOOK", "Duygu & Durum"),
    "тхьэмыщкӏагъэ":     ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏагъэм":    ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏагъэр":    ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏэ":        ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏэм":       ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏэр":       ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏэу":       ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏэхэм":     ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэмыщкӏэхэр":     ("POOR", "POOR_STATE", "Duygu & Durum"),
    "тхьэусыха":         ("COMPLAINT", "COMPLAINT_GRIEF", "Duygu & Durum"),
    "тхьэусыхажэн":      ("COMPLAINT", "COMPLAINT_GRIEF", "Duygu & Durum"),
    "тхьэусыхалэ":       ("COMPLAINT", "COMPLAINT_GRIEF", "Duygu & Durum"),
    "тхьэусыхан":        ("COMPLAINT", "COMPLAINT_GRIEF", "Duygu & Durum"),
    "тхьэусыхафэ":       ("COMPLAINT", "COMPLAINT_GRIEF", "Duygu & Durum"),
    "тхьэусыхэ":         ("COMPLAINT", "COMPLAINT_GRIEF", "Duygu & Durum"),
    "тхьэусыхэн":        ("COMPLAINT", "COMPLAINT_GRIEF", "Duygu & Durum"),
    
    # Organ & Vücut
    "тхьэмбыл":          ("LUNG", "LUNG_ORGAN", "Organ & Vücut"),
    "тхьэмбылым":        ("LUNG", "LUNG_ORGAN", "Organ & Vücut"),
    "тхьэмбылыфэ":       ("LUNG", "LUNG_MEMBRANE", "Organ & Vücut"),
    
    # Sağlık & Hastalık
    "тхьэмбылей":        ("DISEASE", "DISEASE_LUNG", "Sağlık & Hastalık"),
    
    # Yiyecek & Mutfak
    "тхьэв":             ("DOUGH", "FOOD_DOUGH", "Yiyecek & Mutfak"),
    "тхьэвым":           ("DOUGH", "FOOD_DOUGH", "Yiyecek & Mutfak"),
    "тхьэвыр":           ("DOUGH", "FOOD_DOUGH", "Yiyecek & Mutfak"),
    
    # Eylem & Hareket
    "тхьэкъун":          ("CONFISCATE", "CONFISCATE_TAKE", "Eylem & Hareket"),
    "тхьэкъуэн":         ("DAMAGE", "DAMAGE_IMP", "Eylem & Hareket"),
    "тхьэлэн":           ("KILL", "KILL_STRANGLE", "Eylem & Hareket"),
    "тхьэщӏын":          ("WASH", "WASH_CLEAN", "Eylem & Hareket"),
    
    # Tarım & Hayvancılık
    "тхьэбзэ":           ("MARK", "EAR_MARK", "Tarım & Hayvancılık"),
    "тхьэбзэгъуджэ":     ("UNMARKED", "EAR_MARK", "Tarım & Hayvancılık"),
}

THLE_NORM = {normalize(k): v for k, v in THLE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("тхьэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in THLE_NORM:
        concept, sub, family = THLE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "тхьэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("тхьэ") and not l.get("subConceptId")]
print(f"тхьэ- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 тхьэ- KATEGORİSİ TAM BİTTİ!")
