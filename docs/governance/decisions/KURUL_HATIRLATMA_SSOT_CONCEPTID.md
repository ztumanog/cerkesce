# KURUL HATIRLATMA: SSOT ConceptID Birlestirmesi

Durum: ACIK
Oncelik: Dusuk-Orta
Tarih: 2026-11-12
Bagimlilik: ADR-GOV-015 (Canonical Concept Identifier Strategy)

## Konu

ConceptID.ts ve ConceptId.ts birlestirme karari bekliyor.

| Dosya | Katman | Kullanim |
| --- | --- | --- |
| src/domain/concept/value-objects/ConceptID.ts | domain/concept | Concept Engine |
| src/domain/shared/value-objects/ConceptId.ts | domain/shared | Curation / lexemeStore |

## Mevcut Risk

Davranis ayni (iki sinif da ADR-GOV-015 desenine uyuyor,
CanonicalIdentityGuard ile korunuyor, ULID/hex kalintisi 0).
Fiziksel implementasyon iki ayri yerde; risk gelecekteki
catallanma (fork) riskidir, davranis bozuklugu degildir.

## Hedef

Tek SSOT Value Object.

## Kurul Karari (2026-11-12)

1. Birlestirme YAPILMALI.
2. Ancak BUGUN yapilmamali; once Gozlem Fazi.
3. Aday SSOT: src/domain/shared/value-objects/ConceptId.ts

Gerekce: Concept Engine + Discovery + Curation + API katmanlarinin
hepsi shared VO kullanabilir. Ters yonde (domain/concept altindaki
nesnenin shared katmanlara yayilmasi) bagimlilik yonunu bozar.

## Gerekce: Neden Simdi Degil

Calisan sistemde davranisal uyumsuzluk yok:
- 214/214 test dosyasi
- 1059/1059 test
- Build yesil

Sadece mimari temizlik icin calisan sistemi hareket ettirmek
istenmiyor. Once Gozlem Fazi, sonra kontrollu migration.

## Resmi Kurul Notu

"ADR-GOV-015 teknik olarak uygulanmis olsa da, ConceptID.ts ve
ConceptId.ts ikiligi tek dogruluk kaynagi ilkesine tam olarak
uymamaktadir. Davranissal uyumsuzluk bulunmamaktadir; risk
gelecekteki catallanmadir. Bu nedenle konu acil degil ancak
takip edilmesi gereken mimari borc olarak kayda alinmistir.
SSOT birlestirme karari daha sonra kontrollu migration ile
uygulanacaktir."

## Durum Panosu

- ADR-GOV-014: TAMAMLANDI
- ADR-GOV-015: TAMAMLANDI
- SSOT ConceptId Birlesmesi: BEKLIYOR (bu kayit)
- Gozlem Fazi: AKTIF
