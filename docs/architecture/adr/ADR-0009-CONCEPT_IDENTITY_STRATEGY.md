# ADR-0020: Concept Identity Strategy

**Canonical ADR:** ADR-0020
**Physical File:** `ADR-0009-CONCEPT_IDENTITY_STRATEGY.md`
**Tarih:** 2026-09-01
**Durum:** 🟡 DRAFT (Phase 3 LOCKED)
**Kategori:** Concept Engine

> ⚠️ **NOT:** Fiziksel dosya adı `ADR-0009-...` olarak kalmıştır (Git geçmişi için).
> Canonical ADR numarası **ADR-0020**'dir. ADR-GOV-001 gereği dosya adı değiştirilmez.

---
# ADR-0009: Concept Identity Strategy

- **Status:** DRAFT (Phase 3 LOCKED)
- **Date:** 2026-09-01
- **Scope:** Phase 3 — Concept Engine

> ⚠️ **UYARI:** Bu karar Phase 3 tasarım aşaması içindir (`Phase 3 design work: ALLOWED`). Phase 3 kilitleri açılana kadar `src/` veya `app/` altında kod geliştirmesi YAPILAMAZ (`Phase 3 code generation: FORBIDDEN`).

## Context
Dilden bağımsız "evrensel kavramlar" üzerinden anlamsal bir ağ oluşturabilmek için bir kavram kimliği (Concept ID) mimarisine ihtiyaç vardır.

## Proposed Decision (Draft)
1. Dilden ve kaynak sözlükten bağımsız benzersiz `ConceptID` yapısı tanımlanacaktır.
2. `TranslationEntry` → `Concept` ilişkisinin eşleşme kuralları belirlenecektir.

