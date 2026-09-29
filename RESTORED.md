# RESTORED RUNTIME

**Tarih:** 2026-09-29
**Durum:** 220/220 PASS

---

## Aktif Çalışan Katmanlar

### Translation Platform (Faz 2 — Resmî)
- TranslationEntry
- TranslationGroup
- /api/search
- normalizePalochka.ts

### Concept Layer (Faz 3 — Restore)
- ConceptRegistry.ts
- Concept + {tr, kbd}
- BEE, HONEY, SUGAR

### Discovery Layer (Faz 4 — Restore)
- WordFamilyConceptMap.ts
- KnowledgeRanker.ts
- displayName + displayNameTr

### UI Layer
- KelimeDetayDrawer.tsx
- жыг (Ağaç) çift dilli
- 18 kaynak kopyalama

---

## Kısmi Çalışan

- Discovery Engine
- SemanticRelations (veri toplama)

---

## Kilitli (Faz 4/5)

- Knowledge Graph Inference
- SemanticExpansionResolver
- QuerySemanticMapper

---

## Yeni: Linguistic Dataset Layer

- src/domain/linguistic/
- Runtime'dan **izole**
- Hiçbir motor buradan okumaz

---

## Kural

1. Bu bileşenler production'da çalışır
2. Yeni geliştirme için ADR onayı gerekir
3. 220/220 PASS bozulursa bu belge geçersiz

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
- Faz: C-4 tamamlandi
- Runtime'a giris: ADR-ROOT-002 ile (henuz yok)

### Veri Katmani
public/data/linguistic/
- roots.json (32 kok)
- morphemes.json (45 morfem)
- word_families.json (5 aile)
- lexemes.json (90 lexeme)
- semantic_relations.json (70 iliski)

### Kural
Bu katmandaki hicbir tip runtime'da import edilmez.
SemanticRelations veri olarak toplanir, Discovery motoruna baglanmaz.

### Faz C-3 Tamamlandi (2026-09-28)
- [x] gu koku tam veri seti
- [x] shhye koku tam
- [x] ne koku baslangic
- [x] psy koku baslangic
- [x] 10+ kok hedefi (13 kok)
- [x] 20+ morfem hedefi
- [x] 5+ compound hedefi

### Faz C-4 Tamamlandi (2026-09-29)
- [x] 32 kok hedefi
- [x] 90 lexeme hedefi
- [x] 45 morfem korundu
- [x] 70 semantic relation korundu
- [x] 220/220 PASS korundu
- [x] Mimar onayi alindi

### Faz C-5 Hedefleri
- [ ] 40+ kok
- [ ] 100+ lexeme
- [ ] 60+ morfem
- [ ] 100+ semantic relation
- [ ] псы, бзэ, псэ, пэ, дзэ aileleri

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