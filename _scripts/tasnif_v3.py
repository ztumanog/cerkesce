import json
import re
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
output_path = Path("_scripts/tasnif_sonuclari_v3.json")

lexemes = json.loads(lex_path.read_text(encoding="utf-8"))
kalan_lexemes = [l for l in lexemes if not l.get("rootIds")]

# --- 1. RUSÇA / ULUSLARARASI ALINTI DESENLERİ ---
RUSSIAN_PREFIXES = re.compile(r"^(авто|агро|аэро|гидро|микро|моно|поли|радио|теле|электро|суб|про|пере|контр|анти|био|гео|зоо|кино|фото|аэро|мото)", re.IGNORECASE)
RUSSIAN_SUFFIXES = re.compile(r".*(ция|цияр|цие|циящ|тор|торщ|ст|стщ|стхэр|зм|змщ|ет|етщ|ат|атщ|пт|кт|ия|ияр|аж|ажщ|щнэ|шно)$", re.IGNORECASE)
RUSSIAN_INITIALS = re.compile(r"^(р|э|о|ф[а-яеёиоуыэюя]|ю|я[а-яеёиоуыэюя])", re.IGNORECASE)

# RUSÇA/AVRUPA ALINTI KELİME LİSTESİ (GENİŞLETİLMİŞ)
RUSSIAN_LOANS = {
    # Yiyecek/İçecek
    "помидор", "картоф", "кофе", "билет", "хлеб", "сахар", "чай",
    # Ölçü/Birim
    "метр", "километр", "секунд", "минут", "грамм", "литр", "тонн",
    # Kurum/Meslek
    "школ", "урок", "класс", "экзамен", "генерал", "солдат", "офицер",
    "инженер", "врач", "доктор", "профессор", "студент", "учитель",
    # Siyasi/İdari
    "план", "политикэ", "партия", "революция", "совет", "депутат",
    "штат", "район", "область", "республика", "министр", "президент",
    # Teknoloji
    "завод", "фабрика", "машина", "трактор", "телефон", "телевизор",
    "компьютер", "интернет", "радио", "телеграф",
    # Kültür
    "театр", "кино", "библие", "литературэ", "роман", "поэма",
    "карт", "газет", "журнал", "журнал", "книг",
    # Diğer
    "предмет", "глагол", "талант", "колхоз", "стол", "стул", "лампа",
    "шкаф", "кровать", "диван", "окно", "дверь", "стена", "пол",
    "кедр", "шкам", "чырбыш", "содом", "лэкъум", "тифлис",
    "анкара", "истамбыл", "париж", "москва", "кавказ",
    "план", "форма", "фонд", "факт", "ферма", "фильм", "флаг",
    "операция", "отдел", "организация", "орден", "оркестр",
    "экраныр", "эффект", "этаж", "экипаж", "эксперт",
    "роль", "рубль", "рейс", "ремонт", "район", "реформа",
    "объект", "субъект", "апрель", "календарь", "капитализм",
    "коммунист", "комитет", "комиссия", "конференция", "конгресс",
}

# --- 2. ARAPÇA / FARSÇA / TÜRKÇE ALINTI KÖKLERİ ---
ORIENTAL_LOAN_MAP = {
    # Arapça
    "намыс": "HONOR", "дерс": "LESSON", "зэман": "TIME", "ажал": "DEATH",
    "мурад": "GOAL", "хьэбэр": "NEWS", "хъыбар": "NEWS", "салам": "GREETING",
    "борч": "DEBT", "дуней": "WORLD", "дюнэй": "WORLD", "акъыл": "MIND",
    "бэлыхь": "PLAGUE", "хьэлэл": "HALAL", "хьэрэм": "HARAM", "сабыр": "PATIENCE",
    "щэч": "DOUBT", "сэбэп": "BENEFIT", "дэулет": "STATE", "насып": "HAPPINESS",
    "къулей": "WEALTH", "хьэзаб": "TORMENT", "тэммам": "EXACT", "къалэ": "CITY",
    "мухьэжир": "REFUGEE", "балыгъ": "ADULT", "саугъэт": "GIFT",
    "тхьэ": "GOD", "дин": "RELIGION", "иман": "FAITH", "муслъым": "MUSLIM",
    "кӏэлэцӏыкӏу": "CHILD", "мыл": "ICE", "мылыф": "ICE_CREAM",
    "мамэ": "MAMA", "мамэ": "MOTHER",
    # Farsça
    "пащтыхь": "KING", "дэрт": "GRIEF", "шэчыр": "SUGAR", "джэур": "INFIDEL",
    "душман": "ENEMY", "нэшапӀэ": "MARK", "падишах": "KING",
    # Türkçe / Altayik
    "анкара": "LOCATION", "истамбыл": "LOCATION", "топ": "BALL", "пастэ": "FOOD",
    "хъан": "TITLE", "сату": "TRADE", "къазакъ": "COSSACK", "мэздан": "SQUARE",
    "къуэш": "BROTHER", "къуэ": "SON", "нысэ": "DAUGHTER_IN_LAW",
    "тырку": "TURK", "урыс": "RUSSIAN", "адыгэ": "CIRCASSIAN",
}

# --- 3. ÖZ ÇERKESÇE SOMATİK & ATOMİK KÖKLER ---
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

    # A) Rusça / Avrupa Alıntı (GENİŞLETİLMİŞ)
    if form_low in RUSSIAN_LOANS or RUSSIAN_INITIALS.match(form_low) or RUSSIAN_PREFIXES.match(form_low) or RUSSIAN_SUFFIXES.match(form_low):
        origin = "RUSÇA"
        derivation = "BORROWED"
        action = "ATLA"
        notes = "Rusça/Avrupa alıntısı"

    # B) Doğu Alıntıları
    else:
        found_oriental = None
        for k in ORIENTAL_LOAN_MAP:
            if k in form_low:
                found_oriental = k
                break
                
        if found_oriental:
            concept_id = ORIENTAL_LOAN_MAP[found_oriental]
            if found_oriental in ["намыс", "дерс", "зэман", "ажал", "мурад", "хьэбэр", "хъыбар", "борч", "дуней", "акъыл", "бэлыхь", "хьэлэл", "хьэрэм", "сабыр", "щэч", "сэбэп", "дэулет", "насып", "къулей", "хьэзаб", "тэммам", "къалэ", "саугъэт", "тхьэ", "дин", "иман"]:
                origin = "ARAPÇA"
            elif found_oriental in ["пащтыхь", "дэрт", "шэчыр", "джэур", "душман", "падишах"]:
                origin = "FARSÇA"
            else:
                origin = "TÜRKÇE"
            
            derivation = "BORROWED"
            action = "EKLE"  # ← ARAPÇA/TÜRKÇE EKLE!
            notes = f"Çerkesçeleşmiş Doğulu alıntı ({found_oriental} kökü)"

        # C) Sayılar
        elif form_low in NUMBERS or any(form_low.startswith(n) for n in NUMBERS):
            origin = "CERKESCЕ"
            derivation = "ROOT"
            root = "R-NUM"
            action = "EKLE"
            notes = "Çerkesçe sayı kökü"

        # D) Öz Çerkesçe Kök
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

    # E) İşlevsel
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

print("\n🎯 TASNIF V3 SONUCU:")
print("=== ACTION Dagilimi ===")
for k, v in counts.items():
    print(f"  {k:10s}: {v}")

print("\n=== ORIGIN Dagilimi ===")
for k, v in origins.items():
    print(f"  {k:10s}: {v}")
