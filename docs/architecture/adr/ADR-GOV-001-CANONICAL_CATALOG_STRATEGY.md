# ADR-GOV-001: Canonical ADR Catalog Strategy

**Tarih:** 2026-09-25
**Durum:** ✅ Kabul Edildi
**Kategori:** Governance

## Karar

**Physical File Name ≠ Logical ADR Number**

### 5 Kural

1. ADR'ler geriye dönük yeniden numaralandırılmaz
2. ADR dosya adları korunur
3. Canonical ADR numarası katalog seviyesinde yönetilir
4. SUPERSEDED mekanizması tercih edilir
5. Dashboard, README, Inventory ve Summary aynı kaynaktan üretilir

## ADR Denetim Şablonu (ADR-AUDIT-v1)

### A. Kimlik
- Canonical numara benzersiz
- Physical file tanımlı

### B. Statü
- Accepted / Draft / Proposed / Superseded / Deprecated

### C. Superseded
- Status + Superseded By + Reason

### D. Kaynak Tutarlılığı
- Summary = README = Dashboard = Envanter

### E. Mapping
- Yetim dosya yok, çift canonical yok

### F. İstatistik
`Accepted + Draft + Proposed + Superseded + Deprecated = Toplam`

## Referans

- ADR-GOV-002: Historical ADR Supersession
- ADR_INDEX.md (SSOT)
