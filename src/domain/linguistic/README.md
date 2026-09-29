# Linguistic Dataset Layer

⚠️ **UYARI: Bu katman ARAŞTIRMA VERİSİDİR.**

## Anayasal Kural

Bu klasördeki tipler ve veriler **runtime motorları tarafından OKUNMAZ.**

Aşağıdaki bileşenler bu katmandan **import etmez**:

- `ConceptRegistry`
- `WordFamilyConceptMap`
- `KnowledgeRanker`
- `DiscoveryFacade`
- `QuerySemanticMapper`
- `SemanticExpansionResolver`

## Sebep

`ADR-ROOT-001` gereği:

Bu katman dilbilimsel **kaynak veriyi** tutar. Runtime'ın **kavramsal** katmanına ancak **ADR-ROOT-002** ile bağlanır.

## Durum

- **Faz:** Veri toplama (Faz 2.5)
- **Runtime bağımlılığı:** YOK
- **Test kapsamı:** `tsc --noEmit` yeterli

## Yapı

| Dosya | Rol |
|---|---|
| `Root.ts` | Kök tipi |
| `Morpheme.ts` | Biçimbirim tipi |
| `WordFamily.ts` | Kök ailesi |
| `Lexeme.ts` | Sözlükbirim |
| `SemanticRelation.ts` | Anlamsal ilişki (veri) |
| `index.ts` | Dışa aktarım |

## Referanslar

- `docs/decisions/ADR-ROOT-001.md`
- `RESTORED.md`
- Kuipers (1960), Colarusso (1992)

## Kural İhlali Tespiti

