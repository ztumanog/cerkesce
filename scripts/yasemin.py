import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def yargitay_karar_ara(kelime):
    # Chrome seçeneklerini ayarla
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-notifications")
    
    # WebDriver'ı otomatik indir ve başlat
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    try:
        # 1. Yargıtay karar arama sayfasına git
        print("Sayfa yükleniyor...")
        driver.get("https://karararama.yargitay.gov.tr/")
        
        # Sayfanın yüklenmesini bekle (en fazla 15 saniye)
        wait = WebDriverWait(driver, 15)
        
        # 2. Arama kutusunu bul ve kelimeyi yaz
        # Not: Sayfa yapısı güncellenirse id/xpath alanlarını tarayıcıdan denetleyerek güncelleyebilirsiniz.
        print(f"'{kelime}' kelimesi aranıyor...")
        arama_kutusu = wait.until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='text'] | //textarea"))
        )
        arama_kutusu.clear()
        arama_kutusu.send_keys(kelime)
        
        # 3. Ara butonunu bul ve tıkla
        ara_butonu = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Ara')] | //input[@value='Ara']"))
        )
        ara_butonu.click()
        
        print("Sonuçlar bekleniyor...")
        time.sleep(5)  # Sonuçların ve tablonun ekrana gelmesi için kısa bir bekleme
        
        # 4. Gelen sonuçları listele (Örnek: Tablo veya liste elemanları)
        # Yargıtay arama sonuçlarındaki karar başlıklarını yakalar
        sonuclar = driver.find_elements(By.XPATH, "//table//tr | //div[contains(@class, 'card')]")
        
        print(f"\nBulunan Satır/Kayıt Sayısı: {len(sonuclar)}")
        for idx, sonuc in enumerate(sonuclar[:10], start=1):  # İlk 10 sonucu ekrana basar
            print(f"\n--- Sonuç {idx} ---")
            print(sonuc.text.strip())
            
        print("\nİşlem tamamlandı. Detaylı inceleme için tarayıcı açık bırakıldı.")
        input("Tarayıcıyı kapatmak için ENTER tuşuna basın...")

    except Exception as e:
        print(f"Bir hata oluştu: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    # Aramak istediğiniz kelimeyi buraya yazın:
    ARANACAK_KELIME = "iş akdinin feshi"
    yargitay_karar_ara(ARANACAK_KELIME)