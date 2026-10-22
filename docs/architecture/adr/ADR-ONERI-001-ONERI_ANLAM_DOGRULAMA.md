# ADR-ONERI-001: oneriler_literal_meaning Anlamsal Dogrulama

## Durum
Tespit. 22 Ekim 2026.

## Bulgu
`oneriler_literal_meaning.json` icinde 7.499 oneri var. `guven` alani "orta" olan kayitlar anlamsal olarak dogrulanmamis.

Ornek:
- form: хуэӀэкӀуэлъакӀуэ (usta, becerikli)
- oneri: NISANCI (sniper) - anlamsal uyumsuzluk

## Karar
- Bu dosya ceviri onerisi havuzudur, uretim verisi degil.
- guven: "orta" kayitlar dogrulanmamis sayilir.
- UI'da gosterilmez (veya guven: "yuksek" filtrelenir).
- Ayri bir tur: 7.499 onerinin anlamsal dogrulamasi.

## Kapsam disi
Bu ADR, `oneriler_literal_meaning.json`'un yapisal referanslarini (ID eslesmeleri) kapsamaz. Onlar ayri is.

## Ilgili
- ADR-ROOTS-002 (WF uyelik semantigi)
- oneriler/6164 ID degisikligi (revert edildi, anlamsal uyumsuzluk)
