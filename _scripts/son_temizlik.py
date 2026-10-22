import json
import shutil
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
YEDEK = Path("public/data/linguistic/lexemes_backup_son.json")

# 1. Yedek al
if LEX.exists():
    shutil.copy2(LEX, YEDEK)
    print(f"✅ Yedek alındı: {YEDEK}")

# 2. Veriyi oku
lex = json.loads(LEX.read_text(encoding="utf-8"))
is_list = isinstance(lex, list)
lexemes = lex if is_list else lex.get("lexemes", [])

# 3. Doğrulanan Temiz Kelimeler (Sisteme Eklenecekler)
dogrulanan_kelimeler = [
    # Fiiller
    {"form": "ефӀыцӀэкӀын", "root": "фӀыцӀэ", "concept": "COLOR_COMPARISON", "family": "WF-PROPERTY"},
    {"form": "ефэгъуэкӀын", "root": "фагъуэ", "concept": "COLOR_COMPARISON", "family": "WF-PROPERTY"},
    {"form": "ефэжын", "root": "фэн", "concept": "DRINKING", "family": "WF-ACTION"},
    {"form": "ехуэкӀын", "root": "хун", "concept": "DRIVING", "family": "WF-MOVEMENT"},
    {"form": "ехъуэкӀын", "root": "хъуэн", "concept": "PASTURING", "family": "WF-ACTION"},
    {"form": "ехъурэхъуэкӀын", "root": "хъурей", "concept": "PASTURING", "family": "WF-ACTION"},
    {"form": "ещэбэкӀын", "root": "щэбэ", "concept": "SOFTNESS", "family": "WF-PROPERTY"},
    {"form": "ещэжын", "root": "щэн", "concept": "BETRAYAL", "family": "WF-BEHAVIOR"},
    {"form": "ехьелэкӀын", "root": "хьэлэ", "concept": "DECEPTION", "family": "WF-BEHAVIOR"},
    {"form": "ехьэулеилӀэн", "root": "улей", "concept": "TIME_WASTE", "family": "WF-TIME"},
    {"form": "жьэгъуэшхэн", "root": "жьэ+шх", "concept": "CHEWING", "family": "WF-SOMATIC"},
    {"form": "жьэдэлъын", "root": "жьэ+лъ", "concept": "POSITION_IN_MOUTH", "family": "WF-SOMATIC"},
    {"form": "жьэдэплъыхьын", "root": "жьэ+плъ", "concept": "INSPECTION", "family": "WF-SOMATIC"},
    {"form": "жьэдэпхэн", "root": "пхэн", "concept": "TYING_FASTENING", "family": "WF-SOMATIC"},
    {"form": "жьэрэжьэн", "root": "жьэ", "concept": "HEAT_GLOW", "family": "WF-ELEMENT"},
    {"form": "жьэхэӀунщӀэн", "root": "ӀунщӀэн", "concept": "IMPULSE_PUSH", "family": "WF-ACTION"},
    {"form": "жьэхэгъэкъуэн", "root": "къуэн", "concept": "LEANING", "family": "WF-ACTION"},
    {"form": "зусыгъуэджэн", "root": "джэ", "concept": "NEGLECT", "family": "WF-ATTITUDE"},
    {"form": "зэбгрыгуэшыкӀын", "root": "гуэшын", "concept": "DISTRIBUTION", "family": "WF-ACTION"},
    {"form": "зэбгрыгъэувыкӀын", "root": "увын", "concept": "PLACEMENT", "family": "WF-ACTION"},
    {"form": "зэбгрылъэсыкӀын", "root": "лъэсын", "concept": "DISPERSAL_BY_WATER", "family": "WF-EVENT"},
    {"form": "зэбгъэдэщӀыхьын", "root": "бгъэ+щӀ", "concept": "BUILDING", "family": "WF-CREATION"},
    {"form": "зэбэдзэуэн", "root": "бэдз+у", "concept": "SWATTING", "family": "WF-ACTION"},
    {"form": "зэгуэбдзэн", "root": "бдзэ", "concept": "FASTENING", "family": "WF-CRAFT"},
    {"form": "зэгуэбэтын", "root": "бэтын", "concept": "FATNESS", "family": "WF-PROPERTY"},
    {"form": "зэгуэгъэжьэн", "root": "жьэн", "concept": "WELDING", "family": "WF-CRAFT"},
    {"form": "зэгуэкӀыкӀын", "root": "кӀын", "concept": "FATNESS", "family": "WF-PROPERTY"},
    {"form": "зэгъэӀусэн", "root": "Ӏу+с", "concept": "TOUCH", "family": "WF-ACTION"},
    {"form": "зэдегупсысын", "root": "гу+псыс", "concept": "JOINT_THINKING", "family": "WF-THOUGHT"},
    {"form": "зэдэӀуэкӀын", "root": "Ӏу", "concept": "LISTENING", "family": "WF-PERCEPTION"},
    {"form": "зэдэгъуэтын", "root": "гъуэтын", "concept": "JOINT_FINDING", "family": "WF-ACTION"},
    {"form": "еуэсэн", "root": "сэн", "concept": "HABIT", "family": "WF-BEHAVIOR"},
    # İsimler / Zarflar
    {"form": "ехьэкӀыншэу", "root": "хьэкӀын", "concept": "HONESTY", "family": "WF-MANNER"},
    {"form": "гуфӀэгъуэ", "root": "гуфӀэн", "concept": "JOY_EVENT", "family": "WF-EMOTION"},
    {"form": "зэбзэгуэгъу", "root": "бзэгу", "concept": "ALLY_PARTNER", "family": "WF-HUMAN"},
    {"form": "зэгуэшэгъу", "root": "гуэшын", "concept": "PARTNER", "family": "WF-HUMAN"},
    {"form": "жьгъыжьгъыжьгъ", "root": "жьгъыжьгъыжь", "concept": "ONOMATOPOEIA", "family": "WF-SOUND"},
]

# 4. Karantinaya Alınacaklar
karantina = [
    "уэршэрылӀэн", "гуфӀэгъу", "жейн", "гугъа", "лъэпэ", "пэгу", "натэ", 
    "лъэпэгу", "нэпэгу", "ехъуэскӀэуэн", "зэблэцӀэфтын", "зэблэлъэтыкӀын", 
    "гупсэсэн", "бзэгухьин", "Ӏэрилъ", "Ӏэрмилъ", "Ӏэрисэн", "фыгъуэжы",
    "абыр", "оо/уэ", "о", "Ӏэпщо"
]

mevcut_formlar = {e.get("form") for e in lexemes}
eklenen = 0
karantina_sayisi = 0

# Temiz kelimeleri ekle
for k in dogrulanan_kelimeler:
    if k["form"] not in mevcut_formlar:
        yeni_kayit = {
            "id": f"L-VERIFIED-{k['form']}",
            "form": k["form"],
            "root": k["root"],
            "conceptId": k["concept"],
            "wordFamilyId": k["family"],
            "dialect": "Kbd",
            "status": "VERIFIED",
            "source": "Sozluk_Ara2_Manuel_Dogrulama"
        }
        lexemes.append(yeni_kayit)
        eklenen += 1

# Karantinaya al
for e in lexemes:
    if e.get("form") in karantina and e.get("status") != "UNVERIFIED_OR_SYNTHETIC":
        e["status"] = "UNVERIFIED_OR_SYNTHETIC"
        e["quarantine_reason"] = "Sözlükte yok, yönlendirmeli veya hatalı yazım."
        karantina_sayisi += 1

# Kaydet
if is_list:
    LEX.write_text(json.dumps(lexemes, ensure_ascii=False, indent=2), encoding="utf-8")
else:
    lex["lexemes"] = lexemes
    LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"\n✅ İşlem tamam!")
print(f"➕ Sisteme eklenen yeni doğrulanmış kelime: {eklenen}")
print(f"🚫 Karantinaya alınan hatalı/şüpheli kelime: {karantina_sayisi}")
