import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# DAHA ONCE KARAR VERILEN ATLA'LAR
atla_listesi = {
    # Fonksiyonel harfler
    "я", "а", "е", "о", "ы", "у", "н", "э", "п", "т", "с", "р", "х", "м", "ю", "ӏ", "ц", "б",
    # Yer adlari
    "истамбыл", "анкара", "париж", "москва", "кавказ", "тифлис",
    "израил", "мысыр", "иордан",
    # Ozel isimler
    "юсыф", "якъуб", "ибрахьим", "мусэ", "юныс", "дарий",
    "исхьакъ", "нухь",
    # Rusca alintilar
    "кедр", "секунд", "помидор", "шкам", "дохутыр", "члисэ",
    "чристэн", "чыристан", "завод", "план", "мурид", "школ",
    "урок", "класс", "экзамен", "генерал", "солдат", "билет",
    "метр", "километр", "кофе", "картоф", "театр", "кино",
    "библие", "литературэ", "роман", "поэма", "карт", "газет",
    "журнал", "предмет", "глагол", "талант", "колхоз", "стол",
    "лампа", "шкаф", "форма", "фонд", "факт", "ферма", "фильм",
    "флаг", "операция", "отдел", "организация", "орден", "оркестр",
    "эффект", "этаж", "экипаж", "эксперт", "роль", "рубль",
    "рейс", "ремонт", "район", "реформа", "объект", "субъект",
    "апрель", "календарь", "капитализм", "коммунист", "комитет",
    "комиссия", "конференция", "конгресс", "чырбыш", "содом",
    "лэкъум", "литературэ", "социалистическэ", "забастовкэ",
    "организацэ", "университет", "обстоятельств",
    # Etnonimler
    "арэп", "тырку", "урыс", "къазакъ", "адыгэ", "араб", "фарс",
    # Diger
    "-", "арти", "арэу", "истамбыл", "анкара",
}

# Filtrele: sadece ATLA olmayanlar
gercek_kalan = [l for l in kalan if l.get("form", "").lower().strip() not in atla_listesi]

print(f"Toplam kalan: {len(kalan)}")
print(f"ATLA listesindekiler: {len(kalan) - len(gercek_kalan)}")
print(f"GERCEK KALAN (ATLA'lar haric): {len(gercek_kalan)}")

# Ilk 100 gercek kalan
print(f"\n=== GERCEK KALAN 100 ===")
for i, l in enumerate(gercek_kalan[:100], 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    meaning = (l.get("literalMeaning") or "")[:35]
    print(f"  {i:3d}. {form:25s} | {pos:12s} | {meaning}")
