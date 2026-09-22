# ADR-0006 — Cross Dictionary Matching

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Faz:** Faz 2 (Translation Platform)
* **Etkilenen Katmanlar:** Normalizer, Service

## Matching Hierarchy
Çapraz sözlük eşleştirme işlemleri 3 kademeli öncelik sırasına göre yürütülür:
1. **Priority 1 (Exact Match):** `гугъэ` = `гугъэ`
2. **Priority 2 (Orthographic Variant Match):** Belgelenmiş diyalekt varyantları (Aday eşleşme).
3. **Priority 3 (Translation Match):** Hedef dil anlam örtüşmesi.

## Dialect Correspondence Sources
Dialect correspondences must ONLY be accepted when documented in a grammar, dictionary, or approved observation registry.

### Current Documented Correspondences:
- `щ ↔ ш`
- `фӀ ↔ ф`

### Approved Sources:
- ADR-005 Dialect Correspondences
- Adyghe / Kabardian dictionary comparisons
- Morphology Observation Registry (005)

## Strict Rule
Undocumented dialect transformations MUST NEVER participate in automatic matching.

## Sonuçlar
* Rastgele diyalektik dönüşümler engellenir ve yanlış eşleşme patlaması (false-positive explosion) önlenir.