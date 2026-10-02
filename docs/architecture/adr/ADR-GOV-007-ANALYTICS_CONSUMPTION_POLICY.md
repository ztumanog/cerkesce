# ADR-GOV-007: Analytics Consumption Policy

**Tarih:** 2026-10-02
**Durum:** PROPOSED
**Kategori:** Governance
**Etkilenen:** Analytics, Discovery

---

## 1. BAGLAM

Analytics katmani veri uretir.
Ama Discovery kararlarini degistirmemeli.

---

## 2. KARAR

### Analytics Katmani

**YAPABILIR:**

| # | Eylem | Aciklama |
|---|-------|----------|
| 1 | Olcmek | Metrik toplama |
| 2 | Raporlamak | Rapor uretimi |
| 3 | Disa aktarmak | Export |

**YAPAMAZ:**

| # | Eylem | Neden |
|---|-------|-------|
| 1 | Discovery karari | Runtime rolu |
| 2 | Ranking | Runtime rolu |
| 3 | Runtime davranisi | Runtime rolu |

---

## 3. GEREKCE

1. Analytics = gozlemci, karar verici degil
2. Discovery = karar verici
3. Bu ayrim korunmali
4. Runtime izolasyonu

---

## 4. SINIRLAR

### Analytics Bilesenleri

| Bilesen | Gorev |
|---------|-------|
| NetworkAnalytics | Graf analizi |
| DialectAnalytics | Diyalekt analizi |
| QuerySemanticMapper | Sorgu esleme |
| ReportGenerator | Rapor uretimi |
| CsvExporter | CSV export |
| ZipExporter | ZIP export |

**Hicbiri Runtime karari vermez.**

---

## 5. REFERANSLAR

- ADR-GOV-003-PHASE_REDEFINITION.md
- ADR-GOV-006-PHASE_8_SCOPE_DEFINITION.md

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
