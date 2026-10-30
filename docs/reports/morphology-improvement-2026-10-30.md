# Morfoloji Katmanı İyileştirme Raporu

**Tarih:** 2026-10-30
**Commit:** `a5d8200` + bu commit

## Özet

Morfoloji katmanı %99,9 çözüme ulaştı. `wordFamilyId` toplu doldurma **geri alındı**. `ConceptRegistry` **AUTO_GENERATED** statüsünde oluşturuldu.

## Faz 9A — Concept Envanteri

- `lexemes.json`'daki **2.507 concept** frekans dağılımı çıkarıldı.
- İlk 5: `ACTION` (163), `MIND` (155), `SKIN` (125), `LOVE` (105), `EMOTION` (100).

## Faz 9B — Kategori Dağılımı

| Kategori | Sayı |
|---|---|
| Registry'de var | 0 |
| Mapping'de var | 0 |
| Hiçbirinde yok | 2.507 (%100) |

**Sonuç:** `lexemes.json` **kanonik** kaynak.

## Faz 9C-1 — ConceptRegistry Normalizasyonu

- `ConceptRegistry.ts` **2.507 concept** — `AUTO_GENERATED` statüsünde.
- Her concept için **domain** ve **frequency** eklendi.
- Domain dağılımı: EMOTION, ANATOMY, COGNITION, ACTION, PLANT, ANIMAL, COLOR, TIME, KINSHIP, DWELLING, FOOD, OTHER.

## WordFamily Durumu (Düzeltildi)

- `word_families.json` **1.018 aile** — `7065efc`'den geri alındı.
- `lexemes.json` `wordFamilyId` **14.606 dolu** — orijinal.
- `WF-LEX-*` aileleri **geri alındı**.

## Sıradaki: Faz 9C-2 — concept_mapping.json

- `canonical`, `alias`, `deprecated`, `merge_target` alanları.
- Kaynak: `_wiktionary/` sözlükleri.