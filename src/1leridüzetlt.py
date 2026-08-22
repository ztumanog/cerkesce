import os
import json

PUBLIC_DIR = "./public"
DATA_DIR = os.path.join(PUBLIC_DIR, "data")
DATA1_DIR = os.path.join(PUBLIC_DIR, "data1")
DICT_JSON = os.path.join(DATA_DIR, "dictionaries.json")

def index_dosyasini_duzelt():
    if not os.path.exists(DICT_JSON):
        print("❌ 'public/data/dictionaries.json' bulunamadı!")
        return

    # dictionaries.json içeriğini oku
    with open(DICT_JSON, "r", encoding="utf-8") as f:
        icerik = f.read()

    # İletilen tüm boşluk ve palochka hatalarını direkt temizle
    yeni_icerik = icerik.replace(" 10.En", "10.En") \
                        .replace(" 12.En", "12.En") \
                        .replace(" 13.Kbd", "13.Kbd") \
                        .replace(" 14.Kbd", "14.Kbd") \
                        .replace(" 15.Kbd", "15.Kbd") \
                        .replace(" 16.Kbd", "16.Kbd") \
                        .replace(" 17.Kbd", "17.Kbd") \
                        .replace(" 18.Kbd", "18.Kbd") \
                        .replace(" 19.Kbd", "19.Kbd") \
                        .replace("32.Rus-Kbd_Nalchik_20 13", "32.Rus-Kbd_Nalchik_2013") \
                        .replace("33.Ady-Rus- 1960", "33.Ady-Rus-1960") \
                        .replace("3ӏ.", "31.")

    with open(DICT_JSON, "w", encoding="utf-8") as f:
        f.write(yeni_icerik)
    
    print("✅ 'dictionaries.json' içindeki tüm bozuk dosya yolları temizlendi!")

if __name__ == "__main__":
    index_dosyasini_duzelt()