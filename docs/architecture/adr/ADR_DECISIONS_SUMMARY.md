# DECISIONS

## ADR-0001

Tarih: 2026-08-28

Karar:
İlk yüklemede 3 sözlük paralel yüklenir.

Neden:
İlk etkileşim süresini azaltmak.

Durum:
Kabul Edildi

Etkilenen Katmanlar:

- Loader
- Service

---

## ADR-0002

Tarih: 2026-08-28

Karar:
Sonraki yüklemeler 4'lü batch yapılır.

Neden:
204 MB veri kümesinde bellek kullanımını dengelemek.

Durum:
Kabul Edildi

Etkilenen Katmanlar:

- Loader

---

## ADR-0003

Tarih: 2026-08-28

Karar:
Faz kilidi zorunludur.

Neden:
Teknik borcu önlemek.

Durum:
Kabul Edildi

Etkilenen Katmanlar:

- Tüm sistem