# ADR_NUMBERING_POLICY.md

**Tarih:** 2026-10-02
**Durum:** AKTIF
**Versiyon:** v1.0

---

## 1. AMAC

Bu belge, ADR numaralandirma politikasini tanimlar.
Numara catismasini onler, tek standart saglar.

---

## 2. NUMARALANDIRMA KURALLARI

### Format

ADR-XXXX (4 haneli)

Ornek:
- ADR-0001
- ADR-0016
- ADR-0040

### Canonical vs Physical

| Tur | Aciklama | Ornek |
|-----|----------|-------|
| Canonical | Mantiksal numara | ADR-0025 |
| Physical | Dosya adi | ADR-0025-DIALECT_NAMING.md |

**Kural:** Canonical = Physical (mumkunse)

### Numaralandirma Sirasi

1. ADR-0001 ... ADR-0099 (ilk 99)
2. ADR-0100 ... ADR-0199 (100-199)
3. ADR-0200 ... ADR-0299 (200-299)

### Govdesel ADR'ler

- ADR-GOV-001, ADR-GOV-002 ...
- ADR-P4-001, ADR-P5-001 ...
- ADR-ROOT-001

---

## 3. YASAKLAR

| Yasak | Neden |
|-------|-------|
| Ayni numarayi iki farkli ADR icin kullanmak | Catisma |
| Numarasiz ADR olusturmak | Takip edilemez |
| Physical = Canonical uyumsuzlugu | Karisiklik |

---

## 4. DUZELTME PROSEDURU

1. Catisma tespit edilir
2. ADR_INDEX.md kontrol edilir
3. Yeni numara atanir
4. Dosya adi guncellenir
5. Tum referanslar guncellenir

---

## 5. ORNEK DUZELTMELER

### ADR-0009 Catismasi (2026-10-02)

**Sorun:** ADR-0009 iki farkli ADR icin kullanilmis
- ADR-0009-A: Concept Identity
- ADR-0009-B: Dialect Naming

**Cozum:**
- ADR-0009 = Concept Identity (Draft)
- ADR-0025 = Dialect Naming (Accepted)

---

## 6. DOGRULAMA

Her ADR ekleme/guncelleme sonrasi:

1. ADR_INDEX.md kontrol
2. Physical dosya kontrol
3. Numara catismasi kontrol
4. Referans kontrol

---

## 7. REFERANSLAR

- ADR_INDEX.md (tek otorite)
- ADR-GOV-001: Catalog Strategy
- ADR-GOV-002: Supersession

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
