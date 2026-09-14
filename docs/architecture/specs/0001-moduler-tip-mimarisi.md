# 1. Modüler Tip Mimarisi ve Tip Tanımlarının Merkezi Yönetimi

* **Statü:** Kabul Edildi
* **Tarih:** Ağustos 2026
* **Yazar:** Çerkesçe Sözlük Geliştirme Ekibi

## Bağlam (Context)
Bileşenler (`AkilliKlavye.tsx`), özel hook'lar (`useDictionary.ts`) ve sayfalar (`page.tsx`) arasında veri tiplerinin tekrar tanımlanması tip çatışmalarına ve derleme hatalarına yol açıyordu.

## Karar (Decision)
Tüm uygulama veri yapıları (`ExtendedDictionaryItem`, `DictionaryMeta`, `ConceptRow`) tek bir merkezde, `@/types/dictionary.ts` modülü altında toplanmıştır.

## Sonuçlar (Consequences)
* **Olumlu:** Tip güvenliği %100 sağlandı, kod tekrarı engellendi, refactoring kolaylaştı.
* **Olumsuz:** Tip dosyası büyüdükçe alt modüllere (`types/models/`) bölünmesi gerekebilir.