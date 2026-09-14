# ADR-0004: Heterojen Sözlük Verilerinin Normalizasyonu ve Tip Güvenli Gruplanması

**Status:** Kabul Edildi
**Date:** 13 Eylül 2026
**Sorumlular:** Geliştirme Takımı / Mimari Ekip

## Bağlam ve Problem Tanımı
Çerkesçe Sözlük Portal projesinde 34 farklı kaynak sözlükten gelen veriler heterojen yapıdadır:
- Bazı kaynaklarda kelime anlamları düz metin (string)
- Bazılarında nesne dizisi (array of objects)
- Bazılarında iç içe geçmiş (nested) anahtar-değer çiftleri

Doğrudan render edilmeye çalışıldığında arayüzde `[object Object]` hataları veya `undefined`/`null` kaynaklı çalışma zamanı çökmeleri yaşanmaktadır.

## Karar
### A. Güvenli Tip Dönüştürme Mimarisi (`toStringSafe`)
Tüm veri kaynaklarından gelen kelime ve anlam değerleri `toStringSafe` yardımcı fonksiyonundan geçirilerek tek tip metin yapısına dönüştürülür:
- `null`/`undefined` → `""`
- `array` → Elemanlar birleştirilir
- `object` → `text`, `val`, `meaning` alanları ayıklanır

### B. Tekil ve Gruplanmış Veri Yapısı (Cross-Dictionary Matcher)
- Sözlük verileri yüklendikten sonra arama aşamasında kelime bazlı `Map` veri yapısı kullanılarak gruplanır
- Aynı kelimeye ait farklı kaynaklardaki anlamlar `GruplanmisKelime` veri tipinde birleştirilir
- Gruplanmış veriler detay görünümü için `KelimeDetayDrawer` bileşenine aktarılır

### C. Merkezileştirilmiş Tip Tanımları
TypeScript derleme hatalarını önlemek için sözlük veri modelleri tek bir merkezde tanımlanmıştır:
- `DictionaryEntry`: Kaynak dosyadan okunan ham veya normalize edilmiş veri
- `DictionaryItem`: Normalize edilmiş tekil sözlük öğesi
- `GruplanmisKelime`: Kullanıcıya sunulmak üzere gruplanmış sözlük öğesi

## Sonuçlar
### Olumlu Etkiler
- ✅ Arayüz Kararlılığı: `[object Object]` ve `undefined` hataları tamamen engellenmiştir
- ✅ Daha İyi Kullanıcı Deneyimi: Aynı kelimenin farklı sözlüklerdeki karşılıkları tek bir kart altında gruplanır
- ✅ Tip Güvenliği: TypeScript derleme sürecinde sıfır hata (Clean Build) standardına ulaşılmıştır

### Olumsuz / Riskli Etkiler
- ⚠️ Arama Esnasında Bellek/İşlem Yükü: Kelimelerin çalışma zamanında `Map` yapısı ile gruplanması büyük veri kümelerinde performans takibini gerektirir

## Related ADRs
- ADR-0006: Cross Dictionary Matching
- ADR-0007: TranslationRepository Contract
- ADR-0009: Core Dictionary Platform
