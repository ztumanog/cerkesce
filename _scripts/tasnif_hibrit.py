import json
from pathlib import Path
import re

lex_path = Path("public/data/linguistic/lexemes.json")
output_path = Path("_scripts/tasnif_sonuclari.json")

lexemes = json.loads(lex_path.read_text(encoding="utf-8"))
kalan_lexemes = [l for l in lexemes if not l.get("rootIds")]

RUSSIAN_PATTERNS = re.compile(r".*(помидор|секунд|кедр|школ|урок|совет|завод|билет|метр|генерал|класс|театр|стол|кофе|картоф|план|предмет|экзамен|урок|талант|колхоз|карт|литературэ|библие|штат|депутат|глагол|километр|шкам|чырбыш)$", re.IGNORECASE)

TURKISH_ARABIC_WORDS = {"намыс", "дерс", "кофе", "истамбыл", "анкара", "хьэбэр", "салам", "мурад", "ажал", "заман", "муса", "юсыф"}

CIRCASSIAN_ROOTS = ["гу", "нэ", "псы", "щхьэ", "лъэ", "Ӏэ", "бзэ", "унэ", "лы", "дзэ", "пщэ", "пкъы", "шъхьэ", "щабэ", "чъыг"]

NUMBERS = {"зы", "тӀу", "щы", "плӀы", "тху", "хы", "блы", "и", "бгъу", "пщӀы", "ийщӀ", "щитӀ", "щиплӀ", "щитху"}

CERKESCЕ_OZ = {
    "насып": ("HAPPINESS", "R-NASYP"),
    "щысхь": ("MERCY", "R-SHCHYSHH"),
    "таучэл": ("COURAGE", "R-TAUCHAL"),
    "уорк": ("NOBLE", "R-WORK"),
    "аныхэ": ("GRANDMOTHER", "R-ANYXA"),
    "щатэ": ("CREAM", "R-SHCHATE"),
    "жэуап": ("ANSWER", "R-ZHEUAP"),
    "хуит": ("FREE", "R-KHWIT"),
    "хуитыныгъэ": ("FREEDOM", "R-KHWITYNYGHE"),
    "мамыр": ("PEACE", "R-MAMYR"),
    "хахуэ": ("BRAVE", "R-XAXWE"),
    "хахуагъэ": ("BRAVERY", "R-XAXWAGHE"),
    "арэзыныгъэ": ("SATISFACTION", "R-AREZYNYGHE"),
    "чъыг": ("TREE", "R-CHYG"),
    "жызум": ("GRAPE", "R-ZHYZUM"),
    "толъкъун": ("WAVE", "R-TOLQUN"),
    "бзий": ("SUNLIGHT", "R-BZIY"),
    "чыцэ": ("SHRUB", "R-CHYTSE"),
    "пчъэ": ("DOOR", "R-PCHHE"),
    "пчъагъ": ("NUMBER", "R-PCHHAGH"),
    "щабэ": ("SOFT", "R-SHCHABE"),
    "онтэгъу": ("HEAVY", "R-ONTEGHU"),
    "зехьэн": ("CARRY", "R-ZEXEN"),
    "убыдын": ("TAKE", "R-UBYDYN"),
    "ухуэн": ("BUILD", "R-UXWEN"),
    "ихуэн": ("DRIVE_IN", "R-IXWEN"),
    "ихун": ("DRIVE_OUT", "R-IXUN"),
    "иувэн": ("STAND_UP", "R-IUVEN"),
    "зетын": ("DEVOTE", "R-ZETYN"),
    "ешъон": ("DRINK", "R-ESHON"),
    "уцун": ("STOP", "R-UTSUN"),
    "ушъхьагъу": ("EXCUSE", "R-USHHAGHU"),
    "тамыгъэ": ("BRAND", "R-TAMYGHE"),
    "саугъэт": ("GIFT", "R-SAUGHET"),
    "мамэ": ("MAMA", "R-MAME"),
    "сэтэней": ("MEADOWSWEET", "R-SETENEY"),
    "сэтей": ("PLAIN", "R-SETEY"),
    "пасэ": ("OLD", "R-PASE"),
    "пасэрей": ("ANCIENT", "R-PASEREY"),
    "апхуэдэу": ("LIKE_THIS", "R-APXWEDEU"),
    "апхуэдэ": ("SUCH", "R-APXWEDE"),
    "апхуэдиз": ("SO_MUCH", "R-APXWEDIZ"),
    "адрэ": ("OTHER", "R-ADRE"),
    "адрей": ("OTHER", "R-ADREY"),
    "арэзы": ("SATISFIED", "R-AREZY"),
    "яужь": ("AFTER", "R-YAUZH"),
    "тыдэ": ("WHERE_FROM", "R-TYDE"),
    "апшъэрэ": ("SUPREME", "R-APSHERE"),
    "ейуэ": ("BELONGING", "R-EYUE"),
    "ор-орэу": ("ONESELF", "R-OROREU"),
    "щабэ": ("SOFT", "R-SHCHABE"),
    "мыхьэ": ("?", "R-MYXHE"),
    "модэ": ("THERE", "R-MODE"),
    "пстэуми": ("ALL", "R-PSTEUMI"),
    "загъорэ": ("SOMETIMES", "R-ZAGHORE"),
    "рэхьат": ("COMFORT", "R-REXHAT"),
}

results = []

for l in kalan_lexemes:
    form = l.get("form", "").strip()
    pos = l.get("partOfSpeech", "")
    
    origin = "CERKESCЕ"
    derivation = "ROOT"
    root = "-"
    concept_id = "-"
    action = "EKLE"
    notes = "Çerkesçe öz kelime"

    # 1. RUSÇA ALINTI
    if RUSSIAN_PATTERNS.match(form):
        origin = "RUSÇA"
        derivation = "BORROWED"
        action = "ATLA"
        notes = "Rusça/Uluslararası alıntı"
    
    # 2. ARAPÇA/TÜRKÇE ALINTI
    elif form.lower() in TURKISH_ARABIC_WORDS:
        origin = "ARAPÇA" if form.lower() in {"намыс", "дерс", "хьэбэр", "мурад", "ажал", "муса", "юсыф"} else "TÜRKÇE"
        derivation = "BORROWED"
        action = "İNCELE"
        notes = "Doğu/Ortadoğu alıntısı, Çerkesçeleşmiş olabilir"
    
    # 3. SAYILAR
    elif form.lower() in NUMBERS:
        origin = "CERKESCЕ"
        root = "R-NUM"
        action = "EKLE"
        notes = "Sayı kökü"
    
    # 4. ÇERKESÇE ÖZ (elle)
    elif form.lower() in CERKESCЕ_OZ:
        cid, rid = CERKESCЕ_OZ[form.lower()]
        root = rid
        concept_id = cid
        action = "EKLE"
        notes = "Çerkesçe öz kelime (elle tasnif)"
    
    # 5. FONKSİYONEL
    elif len(form) <= 2 or pos in ["letter", "conjunction", "particle", "pronoun"]:
        action = "ATLA"
        notes = "İşlevsel kelime"
    
    # 6. ÇOK KELİMELİ
    elif " " in form:
        action = "İNCELE"
        notes = "Çok kelimeli ifade"
    
    results.append({
        "form": form,
        "origin": origin,
        "derivation": derivation,
        "root": root,
        "conceptId": concept_id,
        "action": action,
        "notes": notes
    })

output_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")

# İstatistik
from collections import Counter
action_counter = Counter(r["action"] for r in results)
origin_counter = Counter(r["origin"] for r in results)

print(f"Toplam tasnif: {len(results)}")
print(f"\n=== ACTION dagilimi ===")
for action, count in action_counter.most_common():
    print(f"  {action:10s} {count}")
print(f"\n=== ORIGIN dagilimi ===")
for origin, count in origin_counter.most_common():
    print(f"  {origin:15s} {count}")
