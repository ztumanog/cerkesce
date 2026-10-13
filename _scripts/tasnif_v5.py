import json
import re
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
output_path = Path("_scripts/tasnif_sonuclari_v5.json")

lexemes = json.loads(lex_path.read_text(encoding="utf-8"))
kalan_lexemes = [l for l in lexemes if not l.get("rootIds")]

# --- 1. RUSÇA / ULUSLARARASI ALINTI ---
RUSSIAN_PREFIXES = re.compile(r"^(авто|агро|аэро|гидро|микро|моно|поли|радио|теле|электро|суб|про|пере|контр|анти|био|гео|зоо|кино|фото|мото)", re.IGNORECASE)
RUSSIAN_SUFFIXES = re.compile(r".*(ция|цияр|цие|циящ|тор|торщ|ст|стщ|стхэр|зм|змщ|ет|етщ|ат|атщ|пт|кт|ия|ияр|аж|ажщ|щнэ|шно)$", re.IGNORECASE)
RUSSIAN_INITIALS = re.compile(r"^(р|э|о|ф[а-яеёиоуыэюя]|ю|я[а-яеёиоуыэюя])", re.IGNORECASE)

RUSSIAN_LOANS = {
    "помидор", "картоф", "кофе", "билет", "метр", "километр", "секунд",
    "школ", "урок", "класс", "экзамен", "генерал", "солдат", "план",
    "политикэ", "партия", "революция", "совет", "депутат", "штат",
    "завод", "фабрика", "машина", "трактор", "театр", "кино", "библие",
    "литературэ", "роман", "поэма", "карт", "газет", "журнал",
    "предмет", "глагол", "талант", "колхоз", "стол", "лампа", "шкаф",
    "кедр", "шкам", "чырбыш", "содом", "лэкъум", "тифлис",
    "анкара", "истамбыл", "париж", "москва", "кавказ",
    "форма", "фонд", "факт", "ферма", "фильм", "флаг",
    "операция", "отдел", "организация", "орден", "оркестр",
    "экраныр", "эффект", "этаж", "экипаж", "эксперт",
    "роль", "рубль", "рейс", "ремонт", "район", "реформа",
    "объект", "субъект", "апрель", "календарь", "капитализм",
    "коммунист", "комитет", "комиссия", "конференция", "конгресс",
}

# --- 2. ARAPÇA ALINTI ---
ARAPCA_LOANS = {
    "намыс": "HONOR", "дерс": "LESSON", "зэман": "TIME", "ажал": "DEATH",
    "мурад": "GOAL", "хьэбэр": "NEWS", "хъыбар": "NEWS", "салам": "GREETING",
    "борч": "DEBT", "дуней": "WORLD", "дюнэй": "WORLD", "акъыл": "MIND",
    "бэлыхь": "PLAGUE", "хьэлэл": "HALAL", "хьэрэм": "HARAM", "сабыр": "PATIENCE",
    "щэч": "DOUBT", "сэбэп": "BENEFIT", "дэулет": "STATE", "насып": "HAPPINESS",
    "къулей": "WEALTH", "хьэзаб": "TORMENT", "тэммам": "EXACT", "къалэ": "CITY",
    "мухьэжир": "REFUGEE", "балыгъ": "ADULT", "саугъэт": "GIFT",
    "дин": "RELIGION", "иман": "FAITH", "муслъым": "MUSLIM",
    "тхьэ": "GOD", "илъэс": "YEAR", "мазэ": "MONTH", "махуэ": "DAY",
    "мысыр": "EGYPT", "израил": "ISRAEL", "иордан": "JORDAN",
    "юсыф": "JOSEPH", "якъуб": "JACOB", "ибрахьим": "ABRAHAM",
    "мусэ": "MOSES", "юныс": "JONAH", "дарий": "DARIUS",
    "чыристан": "CHRISTIAN", "чристэн": "CHRISTIAN",
    "заман": "TIME", "дуния": "WORLD",
    "араб": "ARAB", "фарс": "PERSIAN",
    "уэркъ": "NOBLE", "мылъку": "PROPERTY",
    "хэку": "HOMELAND", "къэрал": "STATE", "лъэпкъ": "PEOPLE",
    "тхылъ": "BOOK", "псалъэ": "WORD", "бзэ": "LANGUAGE",
    "джылэ": "BLOOD", "пкъы": "BODY",
    "мафӀэ": "FIRE", "унэ": "HOUSE",
    "бжьыхьэ": "AUTUMN", "гъатхэ": "SPRING",
    "щӀымахуэ": "WINTER", "гъэмахуэ": "SUMMER",
    "дыгъэ": "SUN", "уафэ": "SKY",
    "вагъуэ": "STAR", "уашхэ": "RAIN", "уэс": "SNOW",
    "жьы": "WIND", "пшагъуэ": "FOG", "мыл": "ICE",
    "гуфӀэ": "JOY", "гузэвэгъуэ": "ANXIETY",
    "гуауэ": "GRIEF", "гуапэ": "PLEASANT", "гуныкъуэ": "WORRY",
    "гулъытэн": "RESPECT", "гузэвэн": "WORRY",
    "гущӀэгъу": "MERCY", "гущӀыӀу": "BITTERNESS", "гуфӀыгъуэ": "JOY",
    "нэгу": "FACE", "нэпс": "TEAR", "нафэ": "CLEAR",
    "нэху": "LIGHT", "нэщхъ": "LIGHT", "нэмыс": "HONOR",
    "нэгъуэщӀ": "OTHER", "нэхъ": "MORE", "нэужь": "AFTER",
    "щхьэхуит": "FREE", "щхьэхуитыныгъэ": "FREEDOM",
    "щхьэусыгъуэ": "REASON", "щхьэщыгъуэ": "PILLOW",
}

# --- 3. FARSÇA ALINTI ---
FARSÇA_LOANS = {
    "пащтыхь": "KING", "дэрт": "GRIEF", "шэчыр": "SUGAR", "джэур": "INFIDEL",
    "душман": "ENEMY", "нэшапӀэ": "MARK", "падишах": "KING",
    "шах": "SHAH", "хан": "KHAN", "бек": "BEY", "ага": "AGA",
}

# --- 4. TÜRKÇE ALINTI ---
TURKCE_LOANS = {
    "анкара": "LOCATION", "истамбыл": "LOCATION", "топ": "BALL",
    "пастэ": "FOOD", "сату": "TRADE", "мэздан": "SQUARE",
    "ор": "ARMY", "оркъ": "OFFICER", "аскер": "SOLDIER",
    "къазакъ": "COSSACK", "хъан": "TITLE",
    "тырку": "TURK", "урыс": "RUSSIAN", "адыгэ": "CIRCASSIAN",
    "къуэш": "BROTHER", "нысэ": "DAUGHTER_IN_LAW",
}

# --- 5. ÖZ ÇERKESÇE SOMATİK & ATOMİK KÖKLER ---
CIRCASSIAN_ROOTS = ["гу", "нэ", "псы", "щхьэ", "лъэ", "Ӏэ", "бзэ", "унэ", "лы", "дзэ", "пэ", "бгъэ", "жэ", "щӀы", "пкъы", "шъхьэ", "щабэ", "чъыг", "пщэ", "псэ"]
NUMBERS = {"зы", "тӀу", "щы", "плӀы", "тху", "хы", "блы", "и", "бгъу", "пщӀы", "ийщӀ", "щитӀ", "щиплӀ", "щитху"}

results = []
counts = {"EKLE": 0, "ATLA": 0, "İNCELE": 0}
origins = {"CERKESCЕ": 0, "RUSÇA": 0, "ARAPÇA": 0, "TÜRKÇE": 0, "FARSÇA": 0}

for l in kalan_lexemes:
    form = l.get("form", "").strip()
    form_low = form.lower()
    
    origin = "CERKESCЕ"
    derivation = "ROOT"
    root = "-"
    concept_id = "-"
    action = "EKLE"
    notes = "Çerkesçe öz kelime"

    # A) Rusça / Avrupa Alıntı
    if form_low in RUSSIAN_LOANS or RUSSIAN_INITIALS.match(form_low) or RUSSIAN_PREFIXES.match(form_low) or RUSSIAN_SUFFIXES.match(form_low):
        origin = "RUSÇA"
        derivation = "BORROWED"
        action = "ATLA"
        notes = "Rusça/Avrupa alıntısı"

    # B) Arapça
    elif form_low in ARAPCA_LOANS:
        origin = "ARAPÇA"
        derivation = "BORROWED"
        action = "EKLE"
        concept_id = ARAPCA_LOANS[form_low]
        notes = f"Arapça alıntı"

    # C) Farsça
    elif form_low in FARSÇA_LOANS:
        origin = "FARSÇA"
        derivation = "BORROWED"
        action = "EKLE"
        concept_id = FARSÇA_LOANS[form_low]
        notes = f"Farsça alıntı"

    # D) Türkçe
    elif form_low in TURKCE_LOANS:
        origin = "TÜRKÇE"
        derivation = "BORROWED"
        action = "EKLE"
        concept_id = TURKCE_LOANS[form_low]
        notes = f"Türkçe alıntı"

    # E) Sayılar
    elif form_low in NUMBERS or any(form_low.startswith(n) for n in NUMBERS):
        origin = "CERKESCЕ"
        derivation = "ROOT"
        root = "R-NUM"
        action = "EKLE"
        notes = "Çerkesçe sayı kökü"

    # F) Öz Çerkesçe Kök
    else:
        matched_roots = [r for r in CIRCASSIAN_ROOTS if r in form_low]
        if matched_roots:
            root = f"R-{matched_roots[0].upper()}"
            if len(matched_roots) > 1:
                derivation = "COMPOUND"
                notes = f"Çerkesçe birleşik ({'+'.join(matched_roots)})"
            elif len(form_low) > len(matched_roots[0]):
                derivation = "SUFFIX" if form_low.startswith(matched_roots[0]) else "PREFIX"
                notes = "Çerkesçe türev"

    # G) İşlevsel
    if " " in form or (len(form) <= 2 and form_low in ["я", "а", "е", "о"]):
        action = "ATLA" if len(form) <= 2 else "İNCELE"
        notes = "İşlevsel kelime veya çok kelimeli"

    counts[action] += 1
    origins[origin] = origins.get(origin, 0) + 1

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

print("\n🎯 TASNIF V5 SONUCU:")
print("=== ACTION Dagilimi ===")
for k, v in counts.items():
    print(f"  {k:10s}: {v}")

print("\n=== ORIGIN Dagilimi ===")
for k, v in origins.items():
    print(f"  {k:10s}: {v}")
