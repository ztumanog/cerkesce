# 3. ITranslationRepository ve Veri Erişim Katmanı Ayrışımı (ADR-0007)

* **Statü:** Kabul Edildi
* **Tarih:** Ağustos 2026
* **Yazar:** Çerkesçe Sözlük Geliştirme Ekibi

## Bağlam (Context)
Veri kaynağının (JSON, In-Memory veya DB) iş mantığına doğrudan bağlı olması, test yazmayı ve veritabanı değiştirmeyi imkansız hale getiriyordu.

## Karar (Decision)
ITranslationRepository arayüzü (getByLemma, getTranslations, everseLookup, getByGroup) tanımlanarak veri katmanı iş mantığından (TranslationService) tamamen soyutlaştırıldı.

## Sonuçlar (Consequences)
* **Olumlu:** Veri kaynağı bağımsız hale geldi, unit ve entegrasyon testleri kolaylaştı.
* **Olumsuz:** Arayüz değişikliklerinde mock ve gerçek repository sınıflarının beraber güncellenmesi gerekir.