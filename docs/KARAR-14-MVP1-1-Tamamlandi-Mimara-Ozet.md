# KARAR 14 — MVP-1 / MVP-1.1 Kapatıldı, MVP-2 Sadece Audit İle Başlayacak

Tarih: 08.11.2026
Karar Veren: Sayın Mimar
Proje: Çerkesçe Sözlük (Adyghabze Psalalhe)

## 1. MVP-1 Değerlendirmesi — KAPANDI ✅

Bu artık "çalışıyor mu acaba?" seviyesinde değil.
Kabul kriterlerinin tamamı karşılandı:

- Arama API ✅
- Arama ekranı ✅
- Sonuç listesi ✅
- Detay ekranı ✅
- Tam eşleşme üstte ✅
- <500 ms hedefi ✅
- 28 MB client download yok ✅
- Boş alan render edilmiyor ✅
- Root / Family / Concept link değil, label ✅
- Favoriler ✅
- Arama geçmişi ✅
- Öneriler ✅
- Akıllı klavye ✅

MVP-1 tekrar açılmayacak.

## 2. MVP-1.1 Değerlendirmesi — KAPANDI ✅

### Doğru Karar: Öneriler

Reddedilen yol:
SearchBox → SmartSuggestionService → 28 MB istemci verisi

Seçilen yol:
/api/search → 5 sonuç → 300 ms debounce

Öneriler = arama API'sinin yan ürünü oldu.
Yeni sistem doğmadı.

### En Kritik Mimari Kazanım

Eski SearchBox import EDİLMEDİ.

Birkaç haftadır savaştığımız risk şuydu:
MVP çalışıyor → sonra eski sistem geri geliyor.
Bu olmamış.

## 3. Dondurulanlar — Onaylandı

### P1 — Frozen (Yeni özellik yok)
- QuerySemanticMapper
- KnowledgeRanker
- DiscoveryFacade
- WordFamilyResolver
- RelatedConceptResolver
- MultilingualExplorer
- ContextClusterer

### P2 — Archive Candidate (Silme kararı yok)
- analytics/services/* grubu

## 4. KARAR 14 — Yeni Mimari İlke

Yeni özellikler mümkün olduğunca mevcut MVP-1 akışına eklenecektir.

- ✅ Latin arama → mevcut /api/search
- ❌ api/search-latin
- ✅ Morfolojik analiz → mevcut detay sayfası
- ❌ ayrı morphology uygulaması
- ✅ Discovery → detay sayfasından başlayan ikinci katman
- ❌ ayrı discovery ürün hattı

## 5. MVP-2 Onayı

- ✅ Audit başlasın
- ❌ Kod yazılmasın

## 6. MVP-2 Audit Soruları

### Soru 1
word_form_mapping transliterasyon sistemi mi?
Yoksa Kiril → Concept indeksi mi?
Kesinleştirilecek.

### Soru 2
Bugünkü fiili standart ne?
- гу → gu ?
- гъу → ghu ? ğu ?
- Ӏ → ' ? 1 ? I ?

### Soru 3
Repo içinde zaten çalışan transliterasyon algoritması var mı?
Tek tek incelenecek:
- kiril_latin_cevir.py
- ters_translit_hizli.py
- kiril_to_latin.py
- kiril_ipa_haritasi.py

### Soru 4
Arama hattı nereye eklenecek?
Mimar tercihi:
kullanıcı → gu → normalize → гу → arama
Yani: API öncesi normalize katmanı. Yeni search sistemi değil.

## 7. Nihai Onay

- ✅ MVP-1 kapatıldı
- ✅ MVP-1.1 kapatıldı
- ✅ Snapshot alındı
- ✅ Yedek alındı
- ✅ Yeni servis geliştirme durduruldu
- ✅ MVP-2 yalnızca audit ile başlayacak
- ❌ Latin arama koduna henüz geçilmeyecek
- ❌ Morfoloji entegrasyonu başlamayacak
- ❌ Discovery çalışmaları açılmayacak

Proje ilk kez "çalışan sözlük" seviyesine geldi.
Bundan sonraki her özellik mevcut akışın üzerine kurulmalı,
yeni paralel sistemler oluşturmamalı.