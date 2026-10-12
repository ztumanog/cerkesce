import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# Mimarın 158 kaydı — TAM LİSTE
MIMAR_TAM = {
    # Dil & İletişim
    "гущыӏэ":      ("LANGUAGE", "WORD", "Dil & İletişim"),
    "гущыӏэхэр":   ("LANGUAGE", "WORDS", "Dil & İletişim"),
    "гущыӏ":       ("LANGUAGE", "WORD", "Dil & İletişim"),
    "гущыӏэхэу":   ("LANGUAGE", "WORDS", "Dil & İletişim"),
    "гущыӏэхэм":   ("LANGUAGE", "WORDS", "Dil & İletişim"),
    "гущыӏэр":     ("LANGUAGE", "WORD", "Dil & İletişim"),
    "гущыӏэм":     ("LANGUAGE", "WORD", "Dil & İletişim"),
    "гущыӏэу":     ("LANGUAGE", "WORD", "Dil & İletişim"),
    "гущыӏэн":     ("ACTION", "SPEAK", "Dil & İletişim"),
    "гушыӏэ":      ("LANGUAGE", "JOKE", "Dil & İletişim"),
    "гущыкӏыгъуэ": ("EMOTION", "DISGUST", "Duygu & Zihin"),
    
    # Ev & Eşya
    "гущэ":        ("FURNITURE", "CRADLE", "Ev & Eşya"),
    
    # Karakter
    "гушхуэ":      ("CHARACTER", "BRAVE", "Duygu & Zihin"),
    "гуцӀыкӀу":    ("CHARACTER", "SENSITIVE", "Duygu & Zihin"),
    "гупсэсан":    ("CHARACTER", "AFFECTIONATE", "Duygu & Zihin"),
    "гушхуэныгъэ": ("CHARACTER", "COURAGE", "Duygu & Zihin"),
    "гулъэф":      ("CHARACTER", "CHARMING", "Duygu & Zihin"),
    "гушхо":       ("CHARACTER", "BRAVE", "Duygu & Zihin"),
    "гумахэ":      ("CHARACTER", "SENSITIVE", "Duygu & Zihin"),
    
    # Duygu & Zihin
    "гукӏэгъу":     ("EMOTION", "COMPASSION", "Duygu & Zihin"),
    "гухэлъ":       ("MIND", "INTENT", "Duygu & Zihin"),
    "гупсэф":       ("EMOTION", "PEACE", "Duygu & Zihin"),
    "гуэтыныгъэ":   ("EMOTION", "LOYALTY", "Duygu & Zihin"),
    "гущӀэгъуншагъэ":("EMOTION", "CRUELTY", "Duygu & Zihin"),
    "губзыгъэгъэ":  ("MIND", "INTELLIGENCE", "Duygu & Zihin"),
    "гузэвэгъуэ":   ("EMOTION", "ANXIETY", "Duygu & Zihin"),
    "гурыщхъуэ":    ("EMOTION", "SUSPICION", "Duygu & Zihin"),
    "гукъыдэж":     ("EMOTION", "MOTIVATION", "Duygu & Zihin"),
    "гугъэр":       ("EMOTION", "HOPE", "Duygu & Zihin"),
    "гупсысэм":     ("MIND", "THOUGHT", "Duygu & Zihin"),
    "гупсысэр":     ("MIND", "THOUGHT", "Duygu & Zihin"),
    "гурыхь":       ("EMOTION", "PLEASANT", "Duygu & Zihin"),
    "гупсэхугъуэ":  ("EMOTION", "PEACE", "Duygu & Zihin"),
    "гупшысэ":      ("MIND", "THOUGHT", "Duygu & Zihin"),
    "губзыгъагъэ":  ("MIND", "INTELLIGENCE", "Duygu & Zihin"),
    "губжьауэ":     ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гузэгъэгъуэ":  ("EMOTION", "RELIEF", "Duygu & Zihin"),
    "гукъао":       ("EMOTION", "GRIEF", "Duygu & Zihin"),
    "гупсэхуу":     ("EMOTION", "PEACE", "Duygu & Zihin"),
    "гулъытэншэу":  ("MIND", "INATTENTIVE", "Duygu & Zihin"),
    "гукъанэ":      ("EMOTION", "RESENTMENT", "Duygu & Zihin"),
    "гузавэу":      ("EMOTION", "ANXIETY", "Duygu & Zihin"),
    "гукъинэ":      ("MIND", "MEMORY", "Duygu & Zihin"),
    "гупсэ":        ("EMOTION", "BELOVED", "Duygu & Zihin"),
    "гупсэфэу":     ("EMOTION", "PEACE", "Duygu & Zihin"),
    "гурымыхь":     ("EMOTION", "UNPLEASANT", "Duygu & Zihin"),
    "гужьеяуэ":     ("EMOTION", "PANIC", "Duygu & Zihin"),
    "губжьа":       ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гужьгъэжь":    ("EMOTION", "MALICE", "Duygu & Zihin"),
    "гузэрыдзэ":    ("EMOTION", "AGITATION", "Duygu & Zihin"),
    "губзыгъэу":    ("MIND", "INTELLIGENCE", "Duygu & Zihin"),
    "гукъау":       ("EMOTION", "GRIEF", "Duygu & Zihin"),
    "гузавэ":       ("EMOTION", "ANXIETY", "Duygu & Zihin"),
    "гужьеигъуэ":   ("EMOTION", "TERROR", "Duygu & Zihin"),
    "гухахъо":      ("EMOTION", "JOY", "Duygu & Zihin"),
    "губжын":       ("ACTION", "ANGER_VERB", "Duygu & Zihin"),
    "гукъинэж":     ("MIND", "MEMORY", "Duygu & Zihin"),
    "гукъыдэжыншэ": ("EMOTION", "APATHY", "Duygu & Zihin"),
    "гурылъ":       ("EMOTION", "DESIRE", "Duygu & Zihin"),
    "гурыхуэ":      ("MIND", "ASTUTE", "Duygu & Zihin"),
    "гулъытэншэ":   ("MIND", "INATTENTIVE", "Duygu & Zihin"),
    "губжыгъэ":     ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гугъусыгъу":   ("CONDITION", "HARDSHIP", "Durum & Nitelik"),
    "гугъэн":       ("ACTION", "HOPE", "Duygu & Zihin"),
    "гумызагъэ":    ("EMOTION", "RESTLESS", "Duygu & Zihin"),
    "гупшыс":       ("MIND", "THOUGHT", "Duygu & Zihin"),
    "гукъыдэмыж":   ("EMOTION", "APATHY", "Duygu & Zihin"),
    "губзыгъ":      ("MIND", "INTELLIGENCE", "Duygu & Zihin"),
    "гунэф":        ("MIND", "BLIND", "Duygu & Zihin"),
    "губжьыныгъэ":  ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гузэжъон":     ("ACTION", "WORRY", "Duygu & Zihin"),
    "гущтэ":        ("EMOTION", "TIMID", "Duygu & Zihin"),
    "гугъэуз":      ("EMOTION", "PAINFUL", "Duygu & Zihin"),
    "гулъытэныгъ":  ("MIND", "ATTENTION", "Duygu & Zihin"),
    "гупшысэн":     ("ACTION", "THINK", "Duygu & Zihin"),
    "гурыӏуэгъуэ":  ("MIND", "CLEAR", "Duygu & Zihin"),
    "губжьыр":      ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гущӏэгъуншэ":  ("EMOTION", "CRUEL", "Duygu & Zihin"),
    "губжьым":      ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гуфӏэгъуэр":   ("EMOTION", "JOY", "Duygu & Zihin"),
    "гурэ":         ("EMOTION", "HEART", "Duygu & Zihin"),
    "гукӏэ":        ("EMOTION", "HEART", "Duygu & Zihin"),
    "гуакӏуэ":      ("EMOTION", "PLEASANT", "Duygu & Zihin"),
    "гугъэщ":       ("EMOTION", "HOPE", "Duygu & Zihin"),
    "гузэвэгъуэм":  ("EMOTION", "ANXIETY", "Duygu & Zihin"),
    "гурыӏуэгъуэу": ("MIND", "CLEAR", "Duygu & Zihin"),
    "гущӏэгъум":    ("EMOTION", "COMPASSION", "Duygu & Zihin"),
    "гукӏэгъушӏ":   ("EMOTION", "COMPASSION", "Duygu & Zihin"),
    "гушӏуагъо":    ("EMOTION", "JOY", "Duygu & Zihin"),
    "гущӏэгъур":    ("EMOTION", "COMPASSION", "Duygu & Zihin"),
    "гугъэу":       ("EMOTION", "HOPE", "Duygu & Zihin"),
    "гупсысэхэр":   ("MIND", "THOUGHTS", "Duygu & Zihin"),
    "гуфӏэгъуэм":   ("EMOTION", "JOY", "Duygu & Zihin"),
    "гупсысэкӏэ":   ("MIND", "THINKING_STYLE", "Duygu & Zihin"),
    
    # Durum & Nitelik
    "гугъу":        ("CONDITION", "DIFFICULTY", "Durum & Nitelik"),
    "гугъуехь":     ("CONDITION", "HARDSHIP", "Durum & Nitelik"),
    "гугъугъэ":     ("CONDITION", "DIFFICULTY", "Durum & Nitelik"),
    "гурыт":        ("DEGREE", "MEDIUM", "Durum & Nitelik"),
    "гугъуу":       ("CONDITION", "DIFFICULTY", "Durum & Nitelik"),
    "гуэша":        ("STATE", "DIVIDED", "Durum & Nitelik"),
    "гугъущ":       ("CONDITION", "HARD", "Durum & Nitelik"),
    
    # Doğa & Coğrafya
    "гуэл":         ("NATURE", "LAKE", "Doğa & Coğrafya"),
    "гуэлым":       ("NATURE", "LAKE", "Doğa & Coğrafya"),
    
    # Dilbilgisi
    "гум":          ("GRAMMAR", "CASE", "Dilbilgisi"),
    "гуэр":         ("PRONOUN", "INDEFINITE", "Dilbilgisi"),
    "гуэрхэр":      ("PRONOUN", "INDEFINITE", "Dilbilgisi"),
    "гуэрым":       ("PRONOUN", "INDEFINITE", "Dilbilgisi"),
    "гуэрхэм":      ("PRONOUN", "INDEFINITE", "Dilbilgisi"),
    "гуэри":        ("PRONOUN", "INDEFINITE", "Dilbilgisi"),
    
    # Din & Ahlak
    "гуэныхь":      ("RELIGION", "SIN", "İnanç & Ahlak"),
    "гуэныхьлы":    ("RELIGION", "SINNER", "İnanç & Ahlak"),
    "гунахь":       ("RELIGION", "SIN", "İnanç & Ahlak"),
    "гуэныхьхэр":   ("RELIGION", "SINS", "İnanç & Ahlak"),
    "гуэныхьым":    ("RELIGION", "SIN", "İnanç & Ahlak"),
    "гуэныхьыр":    ("RELIGION", "SIN", "İnanç & Ahlak"),
    "гуэныхьхэм":   ("RELIGION", "SINS", "İnanç & Ahlak"),
    "гуэныхьыщӏэ":  ("RELIGION", "SINNER", "İnanç & Ahlak"),
    "гуэныхьу":     ("RELIGION", "SIN", "İnanç & Ahlak"),
    
    # Topluluk
    "гуп":          ("COLLECTIVE", "GROUP", "Topluluk"),
    "гупышхуэ":     ("COLLECTIVE", "GROUP", "Topluluk"),
    "гупу":         ("COLLECTIVE", "GROUP", "Topluluk"),
    "гуп-гупу":     ("COLLECTIVE", "GROUP", "Topluluk"),
    "гуп-гупурэ":   ("COLLECTIVE", "GROUP", "Topluluk"),
    "гупым":        ("COLLECTIVE", "GROUP", "Topluluk"),
    "гупыр":        ("COLLECTIVE", "GROUP", "Topluluk"),
    
    # Mekan & Yön
    "гупэ":         ("SPACE", "FRONT", "Mekan & Yön"),
    "гупэм":        ("SPACE", "FRONT", "Mekan & Yön"),
    "гузэгу":       ("SPACE", "CENTER", "Mekan & Yön"),
    
    # Eylem
    "гуэшын":       ("ACTION", "DIVIDE", "Eylem"),
    "гуэшыныгъэ":   ("ACTION", "DIVISION", "Eylem"),
    "губгъэн":      ("ACTION", "REPROACH", "Duygu & Zihin"),
    "гуэрэн":       ("ACTION", "GATHER", "Eylem"),
    "гухьэн":       ("ACTION", "APPROACH", "Eylem"),
    "гуэдзэн":      ("ACTION", "ADD", "Eylem"),
    
    # Yapı & Yer
    "гуэщ":         ("BUILDING", "BARN", "Yapı & Yer"),
    "гуэн":         ("CONTAINER", "BARN", "Yapı & Yer"),
    
    # Tarım
    "гуэдз":        ("AGRICULTURE", "WHEAT", "Tarım"),
    "гуэдзыр":      ("AGRICULTURE", "WHEAT", "Tarım"),
    
    # Hayvan
    "гуэгуш":       ("ANIMAL", "BIRD", "Doğa & Canlılar"),
    
    # Anatomi
    "гущхьэ":       ("BODY", "HEART", "Anatomi & Duygu"),
    "гур":          ("BODY", "HEART", "Anatomi & Duygu"),
    
    # Toplum & İlişki
    "гуэдзэ":       ("ROLE", "DEPUTY", "Toplum & Rol"),
    "гуэгъу":       ("RELATION", "PAIR", "Toplum & İlişki"),
    "гус":          ("RELATION", "COMPANION", "Toplum & İlişki"),
    
    # Zaman
    "гувауэ":       ("TIME", "LATE", "Zaman"),
}

# Kök tespiti
def kok_bul(form):
    for prefix in ["гущыӏ", "гущы", "гуэныхь", "гуэдз", "гуэл", "гуэщ",
                   "гуэгуш", "гупсы", "гупшы", "губзы", "губжь",
                   "гукӏэ", "гущӏэ", "гуфӏэ", "гугъэ", "гугъу",
                   "гузэв", "гузэг", "гуры", "гулъы", "гупсэ",
                   "гужь", "гукъ", "гухэ", "гуи", "гущт", "гума",
                   "гунэ", "гуна", "гус", "гупэ", "гуп", "гум",
                   "гур", "гуэ", "гуа"]:
        if form.startswith(prefix):
            return prefix
    return "гу"

uygulanan = 0
bulunamayan = []
for l in lex:
    form = l.get("form", "")
    if form in MIMAR_TAM:
        concept, sub, family = MIMAR_TAM[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = kok_bul(form)
        uygulanan += 1

# Bulunamayanları kontrol et
mevcut = {l.get("form") for l in lex}
bulunamayan = [f for f in MIMAR_TAM if f not in mevcut]

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"OK - {uygulanan} kayit guncellendi")
if bulunamayan:
    print(f"Bulunamayan: {len(bulunamayan)}")
    for f in bulunamayan:
        print(f"  - {f}")
