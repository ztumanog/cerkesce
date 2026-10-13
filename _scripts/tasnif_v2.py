import json
import re
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
output_path = Path("_scripts/tasnif_sonuclari_v2.json")

lexemes = json.loads(lex_path.read_text(encoding="utf-8"))
kalan_lexemes = [l for l in lexemes if not l.get("rootIds")]

# --- 1. RUSÇA / ULUSLARARASI ALINTI DESENLERİ ---
RUSSIAN_PREFIXES = re.compile(r"^(авто|агро|аэро|гидро|микро|моно|поли|радио|теле|электро|суб|про|пере|контр)", re.IGNORECASE)
RUSSIAN_SUFFIXES = re.compile(r".*(ция|цияр|цие|циящ|тор|торщ|ст|стщ|стхэр|зм|змщ|ет|етщ|ат|атщ|пт|кт|ия|ияр|аж|ажщ|щнэ|шно)$", re.IGNORECASE)
RUSSIAN_INITIALS = re.compile(r"^(р|э|о|ф[а-яеёиоуыэюя])", re.IGNORECASE)

# --- 2. ARAPÇA / FARSÇA / TÜRKÇE ALINTI KÖKLERİ ---
ORIENTAL_LOAN_MAP = {
    "намыс": "HONOR", "дерс": "LESSON", "зэман": "TIME", "ажал": "DEATH",
    "мурад": "GOAL", "хьэбэр": "NEWS", "хъыбар": "NEWS", "салам": "GREETING",
    "борч": "DEBT", "дуней": "WORLD", "дюнэй": "WORLD", "акъыл": "MIND",
    "бэлыхь": "PLAGUE", "хьэлэл": "HALAL", "хьэрэм": "HARAM", "сабыр": "PATIENCE",
    "щэч": "DOUBT", "сэбэп": "BENEFIT", "дэулет": "STATE", "насып": "HAPPINESS",
    "къулей": "WEALTH", "хьэзаб": "TORMENT", "тэммам": "EXACT", "къалэ": "CITY",
    "мухьэжир": "REFUGEE", "балыгъ": "ADULT",
    "пащтыхь": "KING", "дэрт": "GRIEF", "шэчыр": "SUGAR", "джэур": "INFIDEL",
    "душман": "ENEMY", "нэшапӀэ": "MARK",
    "анкара": "LOCATION", "истамбыл": "LOCATION", "топ": "BALL", "пастэ": "FOOD",
    "хъан": "TITLE", "сату": "TRADE", "къазакъ": "COSSACK", "мэздан": "SQUARE"
}

# --- 3. ÖZ ÇERKESÇE SOMATİK & ATOMİK KÖKLER ---
CIRCASSIAN_ROOTS = ["гу", "нэ", "псы", "щхьэ", "лъэ", "Ӏэ", "бзэ", "унэ", "лы", "дзэ", "пэ", "бгъэ", "жэ", "щӀы"]
NUMBERS = {"зы", "тӀу", "щы", "плӀы", "тху", "хы", "блы", "и", "бгъу", "пщӀы", "ийщӀ", "щитӀ"}

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

    # A) Doğu Alıntıları
    found_oriental = None
    for k in ORIENTAL_LOAN_MAP:
        if k in form_low:
            found_oriental = k
            break
            
    if found_oriental:
        concept_id = ORIENTAL_LOAN_MAP[found_oriental]
        if found_oriental in ["намыс", "дерс", "зэман", "ажал", "мурад", "хьэбэр", "хъыбар", "борч", "дуней", "акъыл", "бэлыхь", "хьэлэл", "хьэрэм", "сабыр", "щэч", "сэбэп", "дэулет", "насып", "къулей", "хьэзаб", "тэммам", "къалэ"]:
            origin = "ARAPÇA"
        elif found_oriental in ["пащтыхь", "дэрт", "шэчыр", "джэур", "душман"]:
            origin = "FARSÇA"
        else:
            origin = "TÜRKÇE"
        
        derivation = "BORROWED"
        action = "İNCELE"
        notes = f"Çerkesçeleşmiş Doğulu alıntı ({found_oriental} kökü)"

    # B) Rusça / Uluslararası
    elif RUSSIAN_INITIALS.match(form_low) or RUSSIAN_PREFIXES.match(form_low) or RUSSIAN_SUFFIXES.match(form_low):
        origin = "RUSÇA"
        derivation = "BORROWED"
        action = "ATLA"
        notes = "Fonotaktik/morfotaktik Rusça alıntısı"

    # C) Sayılar
    elif form_low in NUMBERS or any(form_low.startswith(n) for n in NUMBERS):
        origin = "CERKESCЕ"
        derivation = "ROOT"
        root = "R-NUM"
        action = "EKLE"
        notes = "Çerkesçe sayı kökü"

    # D) Öz Çerkesçe Kök (FIX: matched_roots[0])
    else:
        matched_roots = [r for r in CIRCASSIAN_ROOTS if r in form_low]
        if matched_roots:
            # FIX: matched_roots[0] kullan
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

print("\n🎯 TASNIF V2 SONUCU:")
print("=== ACTION Dagilimi ===")
for k, v in counts.items():
    print(f"  {k:10s}: {v}")

print("\n=== ORIGIN Dagilimi ===")
for k, v in origins.items():
    print(f"  {k:10s}: {v}")
