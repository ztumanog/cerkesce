# ADR-ONERI-001: oneriler_literal_meaning Anlamsal Dogrulama

## Durum
Taslak. 22 Ekim 2026.

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
