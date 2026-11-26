# ADR-ONERI-001: oneriler_literal_meaning Anlamsal Dogrulama

## Durum
ACCEPTED (CLOSED / ARCHIVED — 2026-11-26; 2.940/2.940 eşleşen kayıtta TR dolu, 0 eksik TR)

## Bulgu
oneriler_literal_meaning.json icinde 7.499 oneri var. guven alani "orta" olan kayitlar anlamsal olarak dogrulanmamis.

Ornek: oneriler/6164
- form: хуэӀэкӀуэлъакӀуэ
- oneri: NISANCI
- literalMeaning: NİŞANCI
- tr: USTACA / HAMARAT
- Form eslesmesi -2 kaydiyla birebir, ama anlam kaydi dogrulanmadi.

## Karar
- Bu dosya ceviri onerisi havuzudur. Uretim verisi olarak kullanilmadan once dogrulanir.
- guven "orta" kayitlar dogrulanmamis sayilir.
- Bu kayitlarin UI'da gosterilip gosterilmedigi kod incelemesiyle dogrulanmali, bu ADR'de varsayilmamali.
- 7.499 onerinin anlamsal dogrulamasi ayri bir turda yapilacak.

## Sorumlu
- Kod incelemesi (UI'da gosterim): frontend ekibi veya mimar
- Anlamsal dogrulama (7.499 oneri): sozluk uzmani veya mimar

## Kapsam disi
Yapisal ID referanslari (oneriler/6164 dahil) bu ADR'de degil. Uzman onayi olmadan degistirilmez.

## Gecmis
- oneriler/6164 ID degisikligi (bd9d00a) geri alindi (dee4784). Dosya net olarak HEAD ile ayni.
- ADR ilk kez 22c8d42 commit'inde yazildi (Tespit durumu).
- Bu revizyon Taslak durumuna gecirildi ve Sorumlu bolumu eklendi.

## Ilgili
- ADR-ROOTS-002 (WF uyelik semantigi)

## Kapanis Dogrulamasi (2026-11-26)
- Arşivlenen `_archive/public_data_eski/linguistic/oneriler_literal_meaning.json` (`7.499` öneri) üretim kodunda kullanılmıyor (`app/` ve `src/` içinde `0` referans).
- `public/data/linguistic/lexemes.json` (`41.462` kayıt) ile eşleşen `2.940` kaydın tamamında (`2.940/2.940`) Türkçe anlam zaten dolu (`0` eksik TR). Kalan `4.559` öneri ID'si güncel korpusta artık yok.
- `2.940` eşleşen kaydın dağılımı (`quarantine/adr-oneri-001-fark-raporu.md`):
  - `exact_match`: `377` (`orta: 368`, `dusuk: 9`)
  - `partial_overlap`: `163` (`orta: 156`, `dusuk: 7`)
  - `divergent`: `2.400` (`orta: 1.397`, `dusuk: 1.003`) — bu öneriler kürasyon/TR-PAKET-C2 sürecinde daha doğru karşılıklarla değiştirildiği için arşiv önerileri geri yazılmayacak.
