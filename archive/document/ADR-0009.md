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
