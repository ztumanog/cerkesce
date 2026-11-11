# MİMARA RAPOR — SON HALİ — 10 Kasım 2026

## 1. ÖZET

Bugün 3 ana iş kapandı:
1. Latin Arama — j → ж — bje → бжэ, 21 sonuç
2. Lehçe Dönüştürücü — JSON'suz saf kural motoruna geçirildi
3. Vitest — 31 / 31 geçti

Dönüştürücü artık yalnız eşleşme listesine değil, kurallara dayalı çalışan bir motora sahiptir. Ancak DialectResolver ve kural motoru arasında tek yetkili kaynak kararı henüz verilmemiştir. Bu karar gözlem ve toplu test sonuçlarından sonra alınacaktır.

## 2. LATİN ARAMA — j → ж

Bulgu: bje → 0 sonuç. Nedeni: latinNormalize.ts MAP'inde j yoktu, bje → бjе oluyordu.
Karar: KARAR 15 EK: j → ж KABUL (Türkçe j = ж)
Audit → Karar → Uygulama ilkesi bozulmadan çalıştı.
Test: bje → 21 sonuç, бжэ — kapı, бжей — Meşe ağacı, 47 ms
Gözlem: Latin 24 - Kiril 26
Dosya: src/lib/latinNormalize.ts

## 3. DİYALEKT KATMANI — BORÇ KAPATILDI

Bulgu: src/domain/dialect/ altında zaten Dialect domain modeli vardı:
Dialect, Variant, DialectRule, DialectMapper, DialectResolver, MeaningVariantLinker, ConceptVariantBridge, VariantRepository
Arama sayfası bunun dışında ikinci bir çözüm üretmeye başlamıştı. Tehlikeliydi.
Düzeltme: Yeni sistem kurulmadı, mevcut sistem bağlandı. KARAR 14 ile uyumlu.
- src/lib/dialectRules.ts — DialectMapper kuralları (ш ↔ ф, шы ↔ фы)
- AramaClient.tsx — displayForm önce dialectVariants, yoksa Mapper ile üretir

## 4. щы YANLIŞI

щы diye kelime yok. Doğrusu шы (ADY) / фы (KBD).
- dialectRules.ts'e шы ↔ фы eklendi
- dialect_pairs.json'a шы / фы çifti eklendi — 38 → 39

## 5. LEHÇE DÖNÜŞTÜRÜCÜ — JSON'SUZ SAF KURAL MOTORU

39 çift sınır değil, test / doğrulama kümesidir.
Gerçek mimari (dialect_converter-v4.py):
1. Genel Kural Motoru — шъ → щ, жъ → жь, шӀ → щӀ, шӀу → фӀ, ф → ху, -фын → -хун, ты- → ды-, шъо- → фэ-, -щт → -нщ
2. Özel Sözlük — о → уэ, тэ → дэ, цу → вы

Web'deki Sorun: Web Dönüştürücüsü sadece 39 çift + o → уэ yapıyordu. Saf kural motoru yoktu.
Çözüm:
1. src/lib/dialectConverter.ts — Python saf kural motorunun TS karşılığı, JSON okumuyor. Kod içi EXACT sözlüğü, 8 aşamalı kural motoru, ters yön convertKbdToAdy — ва → жъуа, фы → шы dahil
2. src/domain/linguistic/DialectConverter.ts JSON'suz yapıldı: pairsData importu kaldırıldı, loadPairs silindi, VERIFIED_PAIRS kod içine alındı, convertWord → convertAdyToKbd, convertWordReverse → convertKbdToAdy

## 6. VİTEST — 31 / 31

src/tests/dialectConverter.test.ts — 31 test, 7 ms, hepsi geçti.
Kapsam: ADY→KBD (13), KBD→ADY (6), İstisna (3), Fiil çekimleri (3), Kök içi о→уэ (2), Ters yön riskliler (2), Cümle (2)
Testte bulunan 4 hata düzeltildi: -агъ → -ащ eklendi, ва → жъуа eklendi, büyük harf Тэ → Дэ düzeltildi
Eski DialectRules.test.ts placeholder'dı, silindi.

## 7. MİMARIN DİKKAT ÇEKEN RİSKLERİ

⚠ 1. Rule Engine vs Domain Dialect Katmanı
Şu an iki katman var: src/lib/dialectConverter.ts ve src/domain/linguistic/DialectConverter.ts
Tek Yetkili Dönüştürücü kararı henüz verilmedi. 6 ay sonra iki sürüm ayrışmaması için bu karar gözlem ve toplu testten sonra verilecek.

⚠ 2. dialect_pairs.json Rolü
Karar dosyasına not düşüldü: dialect_pairs.json = otorite değildir = doğrulama veri setidir
39 çift, kural motorunun doğruluğunu sınamak için referans kümesidir.

## 8. ONAYLANAN SONRAKİ ADIMLAR

1. Gözlem Fazı — Devam (Aktif): Latin kullanım oranı, Kiril kullanım oranı, başarısız aramalar, en sık Latin varyantları
2. Sonraki Teknik İş — 1500 Kelimelik Toplu Lehçe Testi: Başarı artık 31 test geçti ile değil, 1500 gerçek kelimenin yüzde kaçı doğru dönüştü ile ölçülecek.
3. DialectResolver Tam Entegrasyonu — Bekliyor: Hemen bağlanmayacak. Sıra: Gözlem → Toplu test → Resolver entegrasyonu

## 9. NİHAİ MİMAR KARARI

- MVP-1 — ✅ Tamamlandı
- MVP-1.1 — ✅ Tamamlandı
- MVP-2 — ✅ Tamamlandı
- Latin Normalize — ✅ Üründe
- Dialect Rule Engine — ✅ Üründe
- Vitest — ✅ 31 / 31
- Gözlem Fazı — ⏳ Aktif
- DialectResolver Tam Entegrasyonu — ⏳ Bekliyor

## 10. KAPANIŞ

Lehçe dönüştürücü artık yalnız eşleşme listesine değil, kurallara dayalı çalışan bir motora sahiptir. Ancak DialectResolver ve kural motoru arasında tek yetkili kaynak kararı henüz verilmemiştir. Bu karar gözlem ve toplu test sonuçlarından sonra alınacaktır.

Bu haliyle rapor mimari olarak tutarlı ve gönderilebilir. ✅
