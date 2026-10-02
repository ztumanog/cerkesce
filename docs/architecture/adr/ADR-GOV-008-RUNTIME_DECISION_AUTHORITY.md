# ADR-GOV-008: Runtime Decision Authority

**Tarih:** 2026-10-02
**Durum:** PROPOSED
**Kategori:** Governance
**Etkilenen:** Tum katmanlar

---

## 1. BAGLAM

Hangi katman ne yapar?
Bu ayrim korunmali.

---

## 2. KARAR

### Katman Sorumluluklari

| Katman | Gorev | Karar Verme |
|--------|-------|-------------|
| Morphology | Analiz uretir | HAYIR |
| Phrase | Yapilandirir | HAYIR |
| Syntax | Analiz eder | HAYIR |
| Runtime | Karar verir | EVET |

### Kural

Morphology uretir.
Phrase yapilandirir.
Syntax analiz eder.
Runtime karar verir.

Hicbir analiz katmani Runtime rolunu ustlenemez.

---

## 3. GEREKCE

1. Sorumluluk ayrimi
2. Runtime izolasyonu
3. Dongusel bagimlilik onleme
4. Sistem stabilitesi

---

## 4. SONUCLAR

### Olumlu

- Sorumluluklar net
- Runtime izolasyonu
- Sistem stabilitesi

### Olumsuz

- Kati sinirlar
- Bazi ozellikler imkansiz

---

## 5. REFERANSLAR

- ADR-GOV-003-PHASE_REDEFINITION.md
- ADR-GOV-006-PHASE_8_SCOPE_DEFINITION.md
- ADR-GOV-007-ANALYTICS_CONSUMPTION_POLICY.md

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
