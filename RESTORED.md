# RESTORED RUNTIME

**Tarih:** 2026-09-29
**Durum:** 220/220 PASS

---

## Aktif Calisan Katmanlar

### Translation Platform (Faz 2)
- TranslationEntry
- TranslationGroup
- /api/search
- normalizePalochka.ts

### Concept Layer (Faz 3)
- ConceptRegistry.ts
- Concept + {tr, kbd}
- BEE, HONEY, SUGAR

### Discovery Layer (Faz 4)
- WordFamilyConceptMap.ts
- KnowledgeRanker.ts
- displayName + displayNameTr

### UI Layer
- KelimeDetayDrawer.tsx
- жыг (Agac) cift dilli
- 18 kaynak kopyalama

---

## Kismi Calisan

- Discovery Engine
- SemanticRelations (veri toplama)

---

## Kilitli (Faz 3+)

- Knowledge Graph Inference
- SemanticExpansionResolver
- QuerySemanticMapper

---

## Yeni: Linguistic Dataset Layer

- src/domain/linguistic/
- Runtime'dan izole
- Hicbir motor buradan okumaz

---

## Kural

1. Bu bilesenler production'da calisir
2. Yeni gelistirme icin ADR onayi gerekir
3. 220/220 PASS bozulursa bu belge gecersiz

---

## Research Layer (ADR-ROOT-001)

### Konum
src/domain/linguistic/

### Icerik
- Root.ts, Morpheme.ts, WordFamily.ts, Lexeme.ts, SemanticRelation.ts
- Barrel export: index.ts
- Uyari belgesi: README.md

### Durum
- Runtime bagimliligi: YOK
- Rol: Arastirma katmani (veri toplama)
- Faz: C-6 tamamlandi
- Runtime'a giris: ADR-ROOT-002 ile (henuz yok)

### Veri Katmani
public/data/linguistic/
- roots.json (45 kok)
- morphemes.json (65 morfem)
- word_families.json (11 aile)
- lexemes.json (150 lexeme)
- semantic_relations.json (127 iliski)

### Kural
Bu katmandaki hicbir tip runtime'da import edilmez.
SemanticRelations veri olarak toplanir, Discovery motoruna baglanmaz.

### Faz C-6 Tamamlandi (2026-09-29)
- [x] 45 kok hedefi
- [x] 150 lexeme hedefi
- [x] 65 morfem hedefi
- [x] 120 semantic relation hedefi (127)
- [x] 220/220 PASS korundu
- [x] Corpus evidence: 3 lexeme
- [x] Dictionary evidence: 8 lexeme
- [x] Dialect evidence: 10 lexeme

---

## Test Durumu

| Test | Sonuc |
|---|---|
| Test Files | 73 passed (73) |
| Tests | 220 passed (220) |
| tsc --noEmit | Temiz |

---

**Imza:** Gelistirme Ekibi
**Tarih:** 2026-09-29
