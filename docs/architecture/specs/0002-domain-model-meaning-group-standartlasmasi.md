# 2. Domain Modelinde Çok Dilli Meaning ve Group Name Standartlaşması

* **Statü:** Kabul Edildi
* **Tarih:** Ağustos 2026
* **Yazar:** Çerkesçe Sözlük Geliştirme Ekibi

## Bağlam (Context)
Çeviri anlamlarında hedef dil bilgisinin olmaması çok dilli altyapıyı zorlaştırıyordu. Ayrıca grup nesnelerinde 
ame ve groupName isim uyumsuzlukları vardı.

## Karar (Decision)
1. TranslationMeaning arabirimine zorunlu language: "TR" | "RU" | "EN" alanı eklendi.
2. TranslationGroup arabirimindeki alan adı groupName olarak standartlaştırıldı.

## Sonuçlar (Consequences)
* **Olumlu:** Çok dilli altyapı tip seviyesinde garantiye alındı, mock ve veritabanı veri modelleri eşitlendi.
* **Olumsuz:** Mevcut sahte (mock) verilerin tamamına language alanının eklenmesi gerekti.