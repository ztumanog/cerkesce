import json
import re
from pathlib import Path

DICT_FILE = Path("e:/projeler/Cerkesce/src/data/dictionaries.json")

# Özel eşlemeler (Latin → Kiril)
special_map = {
    "Shagash": ("Shagash", "Зэхуэхьэсa"),   # Adam Shagash
    "Yamisha": ("Yamisha", "ЙамыЩа"),       # Jonty Yamisha
    "Teshu": ("Teshu", "Тэшъу"),            # Teshu Hasan
    "Hilmi": ("Aşemez", "Ащэмэз"),          # Açumıj Hilmi
}

def extract_labels(author: str, year: str):
    """
    Author alanından Latin ve Kiril shortLabel üretir.
    Parantez içindeki varyantları ayırır, özel eşlemeleri uygular.
    """
    # Parantez içlerini bul
    variants = re.findall(r"\((.*?)\)", author)
    # Parantezleri temizle
    cleaned = re.sub(r"\(.*?\)", "", author)
    cleaned = cleaned.replace("Prof. Dr.", "").replace("Dr.", "").strip()
    parts = cleaned.split()
    surname = parts[-1] if parts else author

    latin, kiril = surname, surname

    # Özel eşleme varsa onu kullan
    if surname in special_map:
        latin, kiril = special_map[surname]

    # Eğer parantez içinden Kiril varyant çıkarsa onu kullan
    for v in variants:
        if re.search(r"[А-Яа-яЁё]", v):
            kiril = v.strip()
        else:
            latin = v.strip()

    return f"{latin} ({year})", f"{kiril} ({year})"

def main():
    with open(DICT_FILE, encoding="utf-8") as f:
        data = json.load(f)

    for entry in data:
        author = entry.get("author", "")
        year = entry.get("year", "")
        if not author or not year:
            continue
        shortLabel, shortLabelKiril = extract_labels(author, year)
        entry["shortLabel"] = shortLabel
        entry["shortLabelKiril"] = shortLabelKiril

    with open(DICT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("✅ dictionaries.json güncellendi: shortLabel ve shortLabelKiril eklendi.")

if __name__ == "__main__":
    main()
