# ADR-0005 — TranslationGroup Strategy

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Faz:** Faz 2 (Translation Platform)
* **Etkilenen Katmanlar:** Service, UI

## Context & Strategy
1. `TranslationGroup` yapısı **Sense (Anlam)** tabanlı kurgulanır.
2. Birden fazla sözlükten gelen aynı lemmaya ait anlamlar tek bir grup içinde sunulur.

## TranslationGroup vs Concept
`TranslationGroup` belongs to **Phase 2**.
`Concept` belongs to **Phase 3**.

### TranslationGroup Characteristics:
- Language-aware
- Translation-oriented
- Dictionary-oriented

### Concept Characteristics:
- Language-independent
- Semantic graph node
- Knowledge graph element

### Example
`TRG_WATER`
- `псы`
- `water`
- `su`
- `вода`
(This is a TranslationGroup for Phase 2).

Future `CONCEPT_WATER` is a separate Phase 3 structure.

## Sonuçlar
* `PHASES.md` anayasasına uygun olarak kilitli olan Phase 3 (Concept Engine) kapsamı korunmuş olur.