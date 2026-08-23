import json
import os

DATA_DIR = "./public/data"
MANIFEST_PATH = "./src/utils/dictionaries.json"

# 34 Sözlüğün Zengin Akademik Künye Haritası
KUNYE_HARITASI = {
    # Batı Çerkesçesi (Adıgece)
    "0.Ady-Ady_AIG.json": {
        "title": "Адыгабзэм изэхэф гущı1алъ (Adıgece Açıklamalı Sözlük)",
        "author": "Adıgey Sosyal Bilimler Araştırma Enstitüsü (AIG)",
        "publisher": "Maykop",
        "year": "2006",
        "dialect": "BATI"
    },
    "1.Ady-Ady_AP.json": {
        "title": "Adıgece-Rusça Sözlük",
        "author": "Prof. Dr. Mirabil L. Apaşev",
        "publisher": "Maykop",
        "year": "2008",
        "dialect": "BATI"
    },
    "2.Ady-Ara.json": {
        "title": "Adıgece-Arapça Sözlük (قاموس شركسي - عربي)",
        "author": "Dr. Adel Abdulsalam Lash",
        "publisher": "Şam/Amman",
        "year": "2013",
        "dialect": "BATI"
    },
    "3.Ady-En.json": {
        "title": "Адыгэбзэ-инджылыбзэ гущı1алъэ (Adıgece-İngilizce Sözlük)",
        "author": "Çevrim içi dijital veri tabanı",
        "dialect": "BATI"
    },
    "4.Ady-En_Adam.json": {
        "title": "Adyghe-English Dictionary",
        "author": "Adam Shagash (Şıgaje Adam)",
        "publisher": "Dijital Yayın",
        "year": "2020",
        "dialect": "BATI"
    },
    "7.Ady-Rus_Tharkaho.json": {
        "title": "Адыгейско-русский словарь (Adıgece-Rusça Sözlük)",
        "author": "Prof. Dr. Cevdet Tharkaho (Tharkaho Yoxıyt)",
        "publisher": "Maykop",
        "year": "1991",
        "dialect": "BATI"
    },
    "8.Ady-Tur_Huvaj.json": {
        "title": "Adıgece-Türkçe Sözlük",
        "author": "Fahri Huvaj",
        "publisher": "Kafkas Vakfı / KAFDAV Yayınları",
        "dialect": "BATI"
    },
    "9.En-Ady.json": {
        "title": "English-Adyghe Dictionary (İngilizce-Adıgece Sözlük)",
        "author": "Çevrim içi dijital korpus",
        "dialect": "BATI"
    },
    "10.En-Ady_Adam.json": {
        "title": "English-Adyghe Dictionary",
        "author": "Adam Shagash",
        "publisher": "Dijital Yayın",
        "year": "2020",
        "dialect": "BATI"
    },
    "23.Rus-Ady_Blaghoj.json": {
        "title": "Русско-адыгейский словарь (Rusça-Adıgece Sözlük)",
        "author": "Prof. Dr. Ramazan Blaghoj",
        "publisher": "Maykop",
        "year": "1991",
        "dialect": "BATI"
    },
    "24.Rus-Ady_UAG.json": {
        "title": "Русско-адыгейский словарь (Rusça-Adıgece Sözlük)",
        "author": "U. A. Gethanoko, X. D. Odezhdeko",
        "publisher": "Maykop",
        "year": "1960",
        "dialect": "BATI"
    },
    "25.Rus-Ady_UASP.json": {
        "title": "Русско-адыгейский школьный словарь (Rusça-Adıgece Okul Sözlüğü)",
        "publisher": "Maykop Eğitim Yayınları",
        "year": "1991",
        "dialect": "BATI"
    },
    "29.Tur-Ady_Teshu.json": {
        "title": "Türkçe-Adıgece Sözlük",
        "author": "Cevdet Tharkaho, Teshu Hasan",
        "publisher": "Maykop / Ankara",
        "year": "1991",
        "dialect": "BATI"
    },
    "30.Ady-Rus_ThreeVolumes.json": {
        "title": "Толковый словарь адыгейского языка в 3-х томах (3 Ciltlik Açıklamalı Sözlük)",
        "author": "Adıgey Sosyal Bilimler Araştırma Enstitüsü",
        "publisher": "Maykop",
        "year": "2011",
        "dialect": "BATI"
    },
    "31.Tu-Ady_Hilmi.json": {
        "title": "Türkçe-Adıgece Sözlük",
        "author": "Açumıj Hilmi",
        "publisher": "KAFDAV Yayınları",
        "year": "2013",
        "dialect": "BATI"
    },
    "33.Ady-Rus-1960.json": {
        "title": "Адыгейско-русский словарь (Adıgece-Rusça Sözlük)",
        "author": "J. A. Şıgaje (Baş Editör)",
        "publisher": "Moskova / Maykop",
        "year": "1960",
        "dialect": "BATI"
    },

    # Doğu Çerkesçesi (Kabardeyce)
    "5.Ady-Rus_Qarden.json": {
        "title": "Кабардинско-русский словарь (Kabardeyce-Rusça Sözlük)",
        "author": "Prof. Dr. Balo M. Kardanov",
        "publisher": "Moskova",
        "year": "1957",
        "dialect": "DOGU"
    },
    "6.Ady-Rus_Sherdjes.json": {
        "title": "Kabardeyce/Adıgece-Rusça Sözlük",
        "author": "Ali İ. Çerkes (Sherdjes Aliy)",
        "publisher": "Nalçik",
        "year": "1994",
        "dialect": "DOGU"
    },
    "11.En-Kbd-Jonty.json": {
        "title": "English-Kabardian Dictionary",
        "author": "Jonty Yamisha",
        "publisher": "Circassian Language Institute",
        "dialect": "DOGU"
    },
    "12.En-Kbd-Ziwar.json": {
        "title": "English-Kabardian Circassian Dictionary",
        "author": "Ziwar Gish (Zıwar Gış)",
        "publisher": "Dijital Korpus",
        "dialect": "DOGU"
    },
    "13.Kbd-Ar-Jonty.json": {
        "title": "Kabardian-Arabic Dictionary (قاموس قباردي - عربي)",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "14.Kbd-En-2-Jonty.json": {
        "title": "Kabardian-English Dictionary (Version 2)",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "15.Kbd-En-Jonty.json": {
        "title": "Kabardian-English Dictionary (Version 1)",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "16.Kbd-En-Ziwar.json": {
        "title": "Kabardian-English Dictionary",
        "author": "Ziwar Gish",
        "dialect": "DOGU"
    },
    "17.Kbd-En_Amjad.json": {
        "title": "Kabardian-English Dictionary",
        "author": "Amjad Jaimoukha (Amcad Camuha)",
        "publisher": "San Marcos",
        "year": "1997",
        "dialect": "DOGU"
    },
    "18.Kbd-Ru&En.json": {
        "title": "Kabardeyce - Rusça & İngilizce Çok Dilli Sözlük",
        "publisher": "Dijital Veri Tabanı",
        "dialect": "DOGU"
    },
    "19.Kbd-Ru-2-Jonty.json": {
        "title": "Кабардинско-русский словарь (Version 2)",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "20.Kbd-Ru-Jonty.json": {
        "title": "Кабардинско-русский словарь (Version 1)",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "21.Kbd-Tu-Jonty.json": {
        "title": "Kabardeyce-Türkçe Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "22.Ru-Kbd-Jonty.json": {
        "title": "Русско-кабардинский словарь",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "26.Tu-Kbd-Jonty.json": {
        "title": "Türkçe-Kabardeyce Sözlük",
        "author": "Jonty Yamisha",
        "dialect": "DOGU"
    },
    "27.Tur-Ady_Abaze.json": {
        "title": "Türkçe-Adıgece (Kabardeyce) Sözlük",
        "author": "İbrahim Alhas Abaze",
        "publisher": "Ankara",
        "year": "2005",
        "dialect": "DOGU"
    },
    "28.Tur-Ady_Huvaj.json": {
        "title": "Türkçe-Çerkesçe Sözlük",
        "author": "Fahri Huvaj",
        "publisher": "KAFDAV Yayınları",
        "year": "2007",
        "dialect": "DOGU"
    },
    "32.Rus-Kbd_Nalchik_2013.json": {
        "title": "Русско-кабардино-черкесский словарь для школ",
        "author": "Kabardey-Balkar Sosyal Bilimler Enstitüsü",
        "publisher": "El-Fa Yayınları, Nalçik",
        "year": "2013",
        "dialect": "DOGU"
    }
}

def process_dictionaries():
    if not os.path.exists(DATA_DIR):
        print(f"❌ Klasör bulunamadı: {DATA_DIR}")
        return

    manifest_list = []
    files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith(".json") and f not in ["dictionaries.json", "index.json"]])

    print(f"📁 {len(files)} adet sözlük işleniyor ve temizleniyor...\n")

    for file_name in files:
        file_path = os.path.join(DATA_DIR, file_name)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            # Sözlük için tanımlı künye bilgisini al
            kunye = KUNYE_HARITASI.get(file_name, {
                "title": file_name,
                "dialect": "BATI"
            })

            meta_entry = {
                "file": file_name,
                **kunye,
                "total_words": 0
            }

            cleaned_content = None

            # Durum 1: JSON kökü bir Obje ise ve içinde 'words' varsa
            if isinstance(data, dict):
                if "words" in data and isinstance(data["words"], dict):
                    meta_entry["total_words"] = len(data["words"])
                    # Sadece saf 'words' içeriğini bırakıp meta verileri temizliyoruz
                    cleaned_content = {"words": data["words"]}
                else:
                    meta_entry["total_words"] = len(data)
                    cleaned_content = data

            # Durum 2: JSON kökü bir Dizi ise
            elif isinstance(data, list):
                # Eğer ilk eleman meta bilgisi içeriyorsa onu kelime sayısından ayır
                words_list = [item for item in data if isinstance(item, dict) and ("spelling" in item or "kelime" in item or "words" in item)]
                meta_entry["total_words"] = len(words_list) if len(words_list) > 0 else len(data)
                cleaned_content = data

            manifest_list.append(meta_entry)

            # JSON dosyasını sadece temiz kelime verisi kalacak şekilde güncelle
            if cleaned_content is not None:
                with open(file_path, "w", encoding="utf-8") as f:
                    json.dump(cleaned_content, f, ensure_ascii=False, indent=2)

            print(f"✅ [{meta_entry['dialect']}] {file_name} -> {meta_entry['total_words']} kelime (Meta temizlendi)")

        except Exception as e:
            print(f"❌ Hata ({file_name}): {e}")

    # Toplu Manifest Dosyasını Oluştur (src/utils/dictionaries.json)
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest_list, f, ensure_ascii=False, indent=2)

    print(f"\n🎉 İŞLEM BAŞARIYLA COMPLETED!")
    print(f"📄 '{MANIFEST_PATH}' dosyası {len(manifest_list)} sözlük künyesiyle oluşturuldu.")
    print(f"🧹 34 JSON dosyasının üst başlık yükleri temizlendi.")

if __name__ == "__main__":
    process_dictionaries()