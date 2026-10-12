import json
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# ============================================================
# MORFOLOJİK PASAPORT — 72 HAYVAN
# Format: conceptId (üst) | subConceptId (spesifik) | rootForm (Çerkesçe kök) | taxonomyFamily
# ============================================================
HAYVANLAR = {
    # === MEMELİLER — Sığırgiller (BOVIDAE) ===
    "жэм":       ("ANIMAL", "COW",        "жэм",       "BOVIDAE"),
    "вы":        ("ANIMAL", "OX",         "вы",        "BOVIDAE"),
    "гуу":       ("ANIMAL", "BULL",       "гуу",       "BOVIDAE"),
    "шкӀэ":      ("ANIMAL", "CALF",       "шкӀэ",      "BOVIDAE"),
    "танэ":      ("ANIMAL", "YEARLING_BULL","танэ",    "BOVIDAE"),
    "мэл":       ("ANIMAL", "SHEEP",      "мэл",       "BOVIDAE"),
    "тӀы":       ("ANIMAL", "RAM",        "тӀы",       "BOVIDAE"),
    "бжэн":      ("ANIMAL", "GOAT",       "бжэн",      "BOVIDAE"),
    "ажэ":       ("ANIMAL", "HE_GOAT",    "ажэ",       "BOVIDAE"),
    "чыцӀ":      ("ANIMAL", "KID",        "чыцӀ",      "BOVIDAE"),
    "домбей":    ("ANIMAL", "BISON",      "домбей",    "BOVIDAE"),
    "бжьо":      ("ANIMAL", "ELK",        "бжьо",      "CERVIDAE"),
    "щыхь":      ("ANIMAL", "DEER",       "щыхь",      "CERVIDAE"),
    
    # === MEMELİLER — Atgiller (EQUIDAE) ===
    "шы":        ("ANIMAL", "HORSE",      "шы",        "EQUIDAE"),
    "хакӀуэ":    ("ANIMAL", "STALLION",   "хакӀуэ",    "EQUIDAE"),
    "алащэ":     ("ANIMAL", "GELDING",    "алащэ",     "EQUIDAE"),
    "адыгэш":    ("ANIMAL", "KABARDIN_HORSE","адыгэш", "EQUIDAE"),
    "елыркъэш":  ("ANIMAL", "LEGENDARY_HORSE","елыркъэш","EQUIDAE"),
    "шыгъуэ":    ("ANIMAL", "BAY_HORSE",  "шы",        "EQUIDAE"),
    "алъп":      ("ANIMAL", "MYTHICAL_HORSE","алъп",   "EQUIDAE"),
    
    # === MEMELİLER — Köpekgiller (CANIDAE) ===
    "хьэ":       ("ANIMAL", "DOG",        "хьэ",       "CANIDAE"),
    "бажэ":      ("ANIMAL", "FOX",        "бажэ",      "CANIDAE"),
    "дыгъужь":   ("ANIMAL", "WOLF",       "дыгъужь",   "CANIDAE"),
    
    # === MEMELİLER — Kedigiller (FELIDAE) ===
    "джэду":     ("ANIMAL", "CAT",        "джэду",     "FELIDAE"),
    
    # === MEMELİLER — Sansargiller (MUSTELIDAE) ===
    "ужьэ":      ("ANIMAL", "WEASEL",     "ужьэ",      "MUSTELIDAE"),
    
    # === MEMELİLER — Ayıgiller (URSIDAE) ===
    "мыщэ":      ("ANIMAL", "BEAR",       "мыщэ",      "URSIDAE"),
    
    # === MEMELİLER — Tavşangiller (LEPORIDAE) ===
    "тхьэкӀумэхуэ":("ANIMAL","RABBIT",    "тхьэкӀумэхуэ","LEPORIDAE"),
    
    # === MEMELİLER — Sıçangiller (MURIDAE) ===
    "дзыгъуэ":   ("ANIMAL", "MOUSE",      "дзыгъуэ",   "MURIDAE"),
    "дзыгъуэшхуэ":("ANIMAL","RAT",        "дзыгъуэ",   "MURIDAE"),
    "дзыгъуэнэф":("ANIMAL", "MOLE",       "дзыгъуэ",   "MURIDAE"),
    
    # === MEMELİLER — Domuzgiller (SUIDAE) ===
    "кхъуэ":     ("ANIMAL", "PIG",        "кхъуэ",     "SUIDAE"),
    
    # === MEMELİLER — Deniz memelileri (DELPHINIDAE) ===
    "хыкъуэ":    ("ANIMAL", "DOLPHIN",    "хыкъуэ",    "DELPHINIDAE"),
    
    # === KUŞLAR — Kümes kuşları (PHASIANIDAE) ===
    "джэд":      ("ANIMAL", "CHICKEN",    "джэд",      "PHASIANIDAE"),
    "адакъэ":    ("ANIMAL", "ROOSTER",    "джэд",      "PHASIANIDAE"),
    "джэджьей":  ("ANIMAL", "CHICK",      "джэд",      "PHASIANIDAE"),
    "мэзджэд":   ("ANIMAL", "PHEASANT",   "джэд",      "PHASIANIDAE"),
    "джэдынэ":   ("ANIMAL", "PARTRIDGE",  "джэд",      "PHASIANIDAE"),
    "джэдкъаз":  ("ANIMAL", "POULTRY",    "джэд",      "PHASIANIDAE"),
    "къаз":      ("ANIMAL", "GOOSE",      "къаз",      "ANATIDAE"),
    "бабыщ":     ("ANIMAL", "DUCK",       "бабыщ",     "ANATIDAE"),
    "къуалэбзу": ("ANIMAL", "SWAN",       "бзыу",      "ANATIDAE"),
    
    # === KUŞLAR — Yırtıcı kuşlar (ACCIPITRIDAE) ===
    "бгъэ":      ("ANIMAL", "EAGLE",      "бгъэ",      "ACCIPITRIDAE"),
    "къаргъэ":   ("ANIMAL", "HAWK",       "къаргъэ",   "ACCIPITRIDAE"),
    "бгъэщӀэращӀэ":("ANIMAL","FALCON",    "бгъэ",      "FALCONIDAE"),
    "бу":        ("ANIMAL", "OWL",        "бу",        "STRIGIDAE"),
    
    # === KUŞLAR — Diğer (genel) ===
    "бзыу":      ("ANIMAL", "BIRD",       "бзыу",      "AVIAN"),
    "бзыуцӀыкӀу":("ANIMAL", "SMALL_BIRD", "бзыу",      "AVIAN"),
    "къуалэ":    ("ANIMAL", "CROW",       "къуалэ",    "CORVIDAE"),
    "къандж":    ("ANIMAL", "MAGPIE",     "къандж",    "CORVIDAE"),
    "бзуущӀэ":   ("ANIMAL", "CUCKOO",     "бзыу",      "CUCULIDAE"),
    "къару":     ("ANIMAL", "CRANE",      "къару",     "GRUIDAE"),
    
    # === SÜRÜNGENLER (REPTILIA) ===
    "блэ":       ("ANIMAL", "SNAKE",      "блэ",       "REPTILIA"),
    "блэнэпцӀ":  ("ANIMAL", "SLOW_WORM",  "блэ",       "REPTILIA"),
    "блащхъуэжьей":("ANIMAL","MYTHICAL_SNAKE","блэ",   "REPTILIA"),
    "благъуэ":   ("ANIMAL", "DRAGON",     "блэ",       "MYTHICAL"),
    
    # === AMFİBİLER (AMPHIBIA) ===
    "хьэнэщӀыу": ("ANIMAL", "FROG",       "хьэнэщӀыу", "AMPHIBIA"),
    
    # === BALIKLAR (PISCES) ===
    "бдзэжьей":  ("ANIMAL", "FISH",       "бдзэжьей",  "PISCES"),
    "аргъей":    ("ANIMAL", "SALMON",     "аргъей",    "SALMONIDAE"),
    
    # === BÖCEKLER (INSECTA) ===
    "хьэнтӀрабыщ":("ANIMAL","ANT",        "хьэнтӀрабыщ","INSECTA"),
    "аргъуей":   ("ANIMAL", "MOSQUITO",   "аргъуей",   "INSECTA"),
    "бжьэ":      ("ANIMAL", "BEE",        "бжьэ",      "INSECTA"),
    
    # === ÖRÜMCEKLER (ARACHNIDA) ===
    "хьэндрабгъуэ":("ANIMAL","SPIDER",    "хьэндрабгъуэ","ARACHNIDA"),
    
    # === KOLEKTİF / ŞEMSİYE ===
    "былым":     ("ANIMAL", "LIVESTOCK",  "былым",     "COLLECTIVE"),
    "мыхъумыбз": ("ANIMAL", "HERMAPHRODITE","мыхъумыбз","QUALIFIER"),
}

# ============================================================
# UYGULAMA
# ============================================================
guncellenen = 0
bulunan_formlar = set()

for l in lex:
    form = l.get("form", "")
    if form in HAYVANLAR:
        ust, alt, kok, aile = HAYVANLAR[form]
        l["conceptId"] = ust
        l["subConceptId"] = alt
        l["rootForm"] = kok
        l["taxonomyFamily"] = aile
        guncellenen += 1
        bulunan_formlar.add(form)

# Bulunamayan formlar
bulunamayan = set(HAYVANLAR.keys()) - bulunan_formlar

# Kaydet
LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Rapor
with open("_scripts/morpho_apply_rapor.txt", "w", encoding="utf-8") as f:
    f.write("=" * 70 + "\n")
    f.write("MORFOLOJİK PASAPORT UYGULAMA RAPORU\n")
    f.write("=" * 70 + "\n\n")
    f.write(f"Güncellenen kayıt: {guncellenen}\n")
    f.write(f"Bulunamayan form:  {len(bulunamayan)}\n\n")
    
    if bulunamayan:
        f.write("BULUNAMAYAN FORMLAR:\n")
        for form in sorted(bulunamayan):
            f.write(f"  - {form}\n")
        f.write("\n")
    
    # ANIMAL altındaki tüm kayıtlar
    animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]
    f.write(f"Şimdi ANIMAL: {len(animal)} kayıt\n\n")
    
    f.write("TÜM HAYVANLAR:\n")
    f.write("-" * 70 + "\n")
    for l in sorted(animal, key=lambda x: (x.get("taxonomyFamily",""), x.get("form",""))):
        form = l.get("form", "?")
        sub = l.get("subConceptId", "?")
        fam = l.get("taxonomyFamily", "?")
        root = l.get("rootForm", "?")
        anlam = (l.get("literalMeaning") or "?")[:30]
        f.write(f"  {form:20} | {sub:20} | {fam:15} | kök: {root:15} | {anlam}\n")

print(f"OK - {guncellenen} kayit guncellendi, {len(bulunamayan)} form bulunamadi")
