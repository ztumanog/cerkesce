# ADR-GOV-015: CANONICAL_CONCEPT_IDENTIFIER_STRATEGY

**Durum:** ACCEPTED
**Geçersiz Kıldığı Karar (Supersedes):** ADR-0009 (Canonical ADR-0020)
**Tarih:** 2026-11-12
**Kapsam:** Çerkesçe Sözlük, Morfoloji, Anlamsal Keşif (Discovery) ve Kürasyon Platformu

---

## Bağlam

Sistem genelinde kavram kimlikleri; veri tabanı (JSON veri depoları), domain katmanı,
keşif motoru (Discovery Engine), API geçitleri ve kürasyon arayüzü arasında parçalı bir
yapı oluşturuyordu. Eski mimaride rastgele 26 karakterlik ULID (`01ARZ3...`, `01M44...`)
ve ham hex özet (hash) kimlikleri kullanılıyordu.

Bu durum; okunabilirlik, hata ayıklama ve katmanlar arası tutarlılık açısından teknik
borç üretiyordu. Ayrıca `getConceptUlid(...)`, `ulidOf(...)`, `ConceptUlidMap` gibi
dönüşüm katmanları mimariyi gereksiz karmaşıklaştırıyordu.

---

## Karar

Sistem genelinde kavram kimlikleri **UPPER_SNAKE_CASE** formatında olacaktır.

**Örnek:**
- WATER
- RIVER
- APPLE_TREE
- HOPE

**Yasaklanan kimlikler (domain katmanında):**
- ULID
- UUID
- Hex hash

Kimlik doğrulama kuralı şu desene sabitlenmiştir:

/^[A-Z][A-Z0-9_]{1,63}$/

Kopyala

Kavram kimliği artık teknik bir kimlik değil, doğrudan **alan (domain) kimliğidir**.

---

## Gerekçe

- **Okunabilirlik:** `RIVER` kimliği, `01ARZ3...` yerine insan tarafından doğrudan okunabilir.
- **Sadeleşme:** Teknik kimlik çözümleme katmanları (resolver/adapter) ortadan kalkar.
- **Tutarlılık:** Discovery, Graph, Curation, API, testler ve mock veriler tek model etrafında birleşir.
- **Determinizm:** Kimlikler rastgele üretilmez; kanonik ve öngörülebilirdir.

---

## Sonuçlar

### Olumlu
- Katmanlar arası dönüşüm katmanları kaldırıldı.
- Veri okunabilirliği ve hata ayıklama belirgin biçimde güçlendi.
- Tek doğruluk kaynağı (Single Source of Truth) sağlandı.

### Riskler
- Gelecekte bir geliştiricinin `generateULID()` benzeri bir yardımcı eklemesi
  mimariyi tekrar çatallandırabilir.

**Azaltma:** `0 ULID taraması` testi korunmalı ve CI süreçlerine bağlanmalıdır.

---

## Doğrulama Kriterleri

- `npx tsc --noEmit` → 0 derleme hatası
- `vitest run` → tüm testler geçmeli
- `src/`, `app/`, `public/data/` dizinlerinde eski ULID/hex kalıntısı → 0 eşleşme
- ULID residue scan testi CI'da aktif olmalı

---

## İlgili Belgeler

- ADR-0004: Canonical Identity Model
- ADR-0008: Dialect Canonical Identifier Strategy
- ADR-LEX-002: Concept Registry Freeze
- docs/architecture/ADR_INDEX.md

---

**Karar Sahibi:** Mimari Kurul
**Mimari Onay:** ✅ ACCEPTED (2026-11-12) — CI ULID Residue Guard aktif