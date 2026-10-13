import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# SADECE GERCEK ALINTILAR (Cerkesce'ye girmis)
# Yer isimleri, milliyet isimleri, ozel isimler HARIC
gercek_alintilar = {
    # Rusca
    "помидор": "RUSÇA", "картоф": "RUSÇA", "кофе": "RUSÇA",
    "билет": "RUSÇA", "метр": "RUSÇA", "километр": "RUSÇA",
    "секунд": "RUSÇA", "школ": "RUSÇA", "урок": "RUSÇA",
    "класс": "RUSÇA", "экзамен": "RUSÇA", "генерал": "RUSÇA",
    "солдат": "RUSÇA", "план": "RUSÇA", "политикэ": "RUSÇA",
    "партия": "RUSÇA", "революция": "RUSÇA", "совет": "RUSÇA",
    "депутат": "RUSÇA", "штат": "RUSÇA", "завод": "RUSÇA",
    "фабрика": "RUSÇA", "машина": "RUSÇA", "трактор": "RUSÇA",
    "театр": "RUSÇA", "кино": "RUSÇA", "библие": "RUSÇA",
    "литературэ": "RUSÇA", "роман": "RUSÇA", "поэма": "RUSÇA",
    "карт": "RUSÇA", "газет": "RUSÇA", "журнал": "RUSÇA",
    "предмет": "RUSÇA", "глагол": "RUSÇA", "талант": "RUSÇA",
    "колхоз": "RUSÇA", "стол": "RUSÇA", "лампа": "RUSÇA",
    "шкаф": "RUSÇA", "кедр": "RUSÇA", "чырбыш": "RUSÇA",
    "лэкъум": "RUSÇA", "форма": "RUSÇA", "фонд": "RUSÇA",
    "факт": "RUSÇA", "ферма": "RUSÇA", "фильм": "RUSÇA",
    "флаг": "RUSÇA", "операция": "RUSÇA", "отдел": "RUSÇA",
    "организация": "RUSÇA", "орден": "RUSÇA", "оркестр": "RUSÇA",
    "эффект": "RUSÇA", "этаж": "RUSÇA", "экипаж": "RUSÇA",
    "эксперт": "RUSÇA", "роль": "RUSÇA", "рубль": "RUSÇA",
    "рейс": "RUSÇA", "ремонт": "RUSÇA", "район": "RUSÇA",
    "реформа": "RUSÇA", "объект": "RUSÇA", "субъект": "RUSÇA",
    "апрель": "RUSÇA", "календарь": "RUSÇA", "капитализм": "RUSÇA",
    "коммунист": "RUSÇA", "комитет": "RUSÇA", "комиссия": "RUSÇA",
    "конференция": "RUSÇA", "конгресс": "RUSÇA", "шкам": "RUSÇA",
    # Arapca (dini, hukuki, soyut)
    "намыс": "ARAPÇA", "дерс": "ARAPÇA", "зэман": "ARAPÇA",
    "ажал": "ARAPÇA", "мурад": "ARAPÇA", "хьэбэр": "ARAPÇA",
    "хъыбар": "ARAPÇA", "салам": "ARAPÇA", "борч": "ARAPÇA",
    "дуней": "ARAPÇA", "акъыл": "ARAPÇA", "бэлыхь": "ARAPÇA",
    "хьэлэл": "ARAPÇA", "хьэрэм": "ARAPÇA", "сабыр": "ARAPÇA",
    "щэч": "ARAPÇA", "сэбэп": "ARAPÇA", "дэулет": "ARAPÇA",
    "насып": "ARAPÇA", "хьэзаб": "ARAPÇA", "тэммам": "ARAPÇA",
    "мухьэжир": "ARAPÇA", "дин": "ARAPÇA", "иман": "ARAPÇA",
    "муслъым": "ARAPÇA", "чыристан": "ARAPÇA", "чристэн": "ARAPÇA",
    "заман": "ARAPÇA", "дуния": "ARAPÇA",
    # Farsca
    "пащтыхь": "FARSÇA", "дэрт": "FARSÇA", "шэчыр": "FARSÇA",
    "душман": "FARSÇA",
    # Turkce (ticaret, gunluk)
    "сату": "TÜRKÇE", "мэздан": "TÜRKÇE", "пастэ": "TÜRKÇE",
    "аскер": "TÜRKÇE", "хамэ": "TÜRKÇE", "мылъку": "TÜRKÇE",
    "сабий": "TÜRKÇE", "тенджыз": "TÜRKÇE", "бжьэ": "TÜRKÇE",
}

# HARIC TUTULACAKLAR (yer isimleri, milliyet, ozel isim)
haric = {
    "истамбыл", "анкара", "париж", "москва", "кавказ", "тифлис",
    "тырку", "урыс", "къазакъ", "адыгэ", "араб", "фарс",
    "хъан", "ор", "оркъ", "къуэш", "нысэ", "топ", "къулей",
    "уэркъ", "балыгъ", "мыл", "дыгъэ", "жьы", "уэс", "уафэ",
    "къалэ", "тхьэ", "къуэ", "къяджи",
    "юсыф", "якъуб", "ибрахьим", "мусэ", "юныс", "дарий",
    "мысыр", "израил", "иордан",
}

print(f"Toplam alıntı (temiz): {len(gercek_alintilar)}")
print(f"Haric tutulan: {len(haric)}")

print(f"\n=== GERCEK ALINTILAR ===")
bulunan = 0
for l in kalan:
    form = l.get("form", "").lower().strip()
    if form in gercek_alintilar and form not in haric:
        origin = gercek_alintilar[form]
        kelime = l.get("form")
        anlam = (l.get("literalMeaning") or "")[:40]
        print(f"  [{origin:8s}] {kelime:25s} | {anlam}")
        bulunan += 1

print(f"\nBulunan: {bulunan}")
print(f"Kalan (alisilmamis): {len(kalan) - bulunan}")

# Kalanlari goster (ilk 60)
print(f"\n=== KALANLAR (ilk 60) ===")
kalanlar = []
for l in kalan:
    form = l.get("form", "").lower().strip()
    if form not in gercek_alintilar:
        kalanlar.append(l)

for i, l in enumerate(kalanlar[:60], 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    meaning = (l.get("literalMeaning") or "")[:40]
    print(f"  {i:3d}. {form:25s} | {pos:12s} | {meaning}")
