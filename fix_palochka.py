import json
import os
import re

# Sadece Kiril harflerine bitişik (öncesinde veya sonrasında Kiril harfi olan) '1' rakamlarını yakalar.
# Bu sayede HTML etiketleri (1em), tarihler (2011) veya ID değerleri BOZULMAZ.
PALOCHKA_REGEX = re.compile(r'(?<=[\u0400-\u04FF])1|1(?=[\u0400-\u04FF])')
PALOCHKA_CHAR = 'Ӏ'  # Cyrillic Palochka (U+04C0)

def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return text
    return PALOCHKA_REGEX.sub(PALOCHKA_CHAR, text)

def process_json(data):
    """JSON yapısını özyinelemeli (recursive) gezerek key ve value'ları temizler."""
    if isinstance(data, dict):
        new_dict = {}
        for key, value in data.items():
            new_key = clean_text(key)
            new_value = process_json(value)
            new_dict[new_key] = new_value
        return new_dict
    elif isinstance(data, list):
        return [process_json(item) for item in data]
    elif isinstance(data, str):
        return clean_text(data)
    else:
        return data

def fix_all_json_files(folder_path="./public/data"):
    if not os.path.exists(folder_path):
        print(f"❌ Klasör bulunamadı: {folder_path}")
        return

    json_files = [f for f in os.listdir(folder_path) if f.endswith('.json')]
    print(f"📁 Bulunan JSON dosyası sayısı: {len(json_files)}\n")

    for file_name in json_files:
        file_path = os.path.join(folder_path, file_name)
        print(f"🔄 İşleniyor: {file_name}...")

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            cleaned_data = process_json(data)

            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(cleaned_data, f, ensure_ascii=False, indent=2)

            print(f"✅ Düzeltildi: {file_name}")
        except Exception as e:
            print(f"❌ Hata oluştu ({file_name}): {e}")

    print("\n🎉 İşlem tamamlandı! Tüm '1' karakterleri 'Ӏ' (Palochka) ile güncellendi.")

if __name__ == "__main__":
    # JSON dosyalarının bulunduğu dizin
    fix_all_json_files("./public/data")