import json
import re
import os

def metin_duzelt(text):
    if not isinstance(text, str):
        return text
    
    # Kelimenin BAŞINDAKİ '1' rakamlarını yakalar (örn: 1агъоу -> Ӏагъоу, 1абыр -> Ӏабыр)
    text = re.sub(r'1(?=[а-яА-Яа-эА-ЭӀӏa-zA-Z])', 'Ӏ', text)
    
    # Kelimenin SONUNDAKİ '1' rakamlarını yakalar (örn: Ӏорыш1 -> ӀорышӀ)
    text = re.sub(r'(?<=[а-яА-Яа-эА-ЭӀӏa-zA-Z])1', 'Ӏ', text)
    
    # Kelimenin ORTASINDAKİ '1' rakamlarını yakalar (örn: п1аб -> пӀаб)
    text = re.sub(r'(?<=[а-яА-Яа-эА-ЭӀӏa-zA-Z])1(?=[а-яА-Яа-эА-ЭӀӏa-zA-Z])', 'Ӏ', text)
    
    return text

def obj_tara(obj):
    if isinstance(obj, dict):
        return {k: obj_tara(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [obj_tara(elem) for elem in obj]
    elif isinstance(obj, str):
        return metin_duzelt(obj)
    return obj

def tum_jsonlari_temizle(baslangic_klasoru):
    bulunan_sayi = 0
    for kok, klasorler, dosyalar in os.walk(baslangic_klasoru):
        for dosya in dosyalar:
            # Sadece sözlük JSON verilerini tara (package.json vs. atla)
            if dosya.endswith('.json') and not dosya.endswith('package.json') and not dosya.endswith('tsconfig.json'):
                dosya_yolu = os.path.join(kok, dosya)
                
                try:
                    with open(dosya_yolu, 'r', encoding='utf-8') as f:
                        data = json.load(f)

                    temiz_data = obj_tara(data)

                    # Dosya adını ve yapısını bozmadan üzerine yaz
                    with open(dosya_yolu, 'w', encoding='utf-8') as f:
                        json.dump(temiz_data, f, ensure_ascii=False, indent=2)

                    print(f"✅ Başarıyla Temizlendi: {dosya}")
                    bulunan_sayi += 1
                except Exception as e:
                    print(f"⚠️ Atlandı ({dosya}): {e}")

    print(f"\n🚀 İŞLEM TAMAM! Toplam {bulunan_sayi} JSON dosyasındaki tüm '1'ler 'Ӏ' yapıldı.")

# Projenin ana klasörünü otomatik bulur ve tarar
proje_dizini = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tum_jsonlari_temizle(proje_dizini)