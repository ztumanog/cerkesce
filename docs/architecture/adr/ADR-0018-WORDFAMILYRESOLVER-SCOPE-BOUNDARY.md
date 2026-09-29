# ADR-0018: WordFamilyResolver Scope Boundary

**Durum:** ACCEPTED
**Kabul Tarihi:** 2026-09-30
**Tarih:** 2026-09-26
**İmza:** Dipo
**İlgili ADR:** ADR-0017-WORDFAMILY-CONCEPT-MAPPING

## Bağlam

`WordFamilyResolver` servisi, `Word → Concept` eşlemesi yapmaktadır. Ancak bu servisin **sorumluluk sınırları** net değildir.

## Karar

1. `WordFamilyResolver` **yalnızca** `Word → Concept` çözümleme yapar.
   - Görev: Lexical Resolution
   - Girdi: Kelime (örn: `щхьэгу`)
   - Çıktı: ConceptID (örn: `TOP_ID`)

2. `Concept → Concept` semantic traversal **ayrı bir resolver** tarafından yürütülür.
   - Görev: Concept Traversal
   - Girdi: ConceptID (örn: `TOP_ID`)
   - Çıktı: İlişkili ConceptID'ler

3. `SemanticExpansionResolver` implementasyonu **Faz 3 (Concept Engine) kapsamındadır**
   ve Faz 3 kilidi açılana kadar ertelenmiştir.

## Sonuçlar

**Olumlu:**
- Sorumluluklar net ayrılır (SRP)
- `WordFamilyResolver` basit, hızlı ve deterministik kalır
- Faz 3 kilidi korunur

**Olumsuz:**
- Semantic traversal şu an yok
- Kavramsal keşif sınırlı

## İlgili Belgeler

- `WF-CONCEPT-MAPPING.md`
- `MASTER_ONTOLOGY_SYSTEM.md`
- `PHASES.md`
- `CONSTITUTION.md`
