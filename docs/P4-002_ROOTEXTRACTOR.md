# P4-002: RootExtractor Kontrati

## Amac
Lexeme formundan kok (root) cikarmak.

## Girdi
- lexemeId: string
- form: string (orn: "лъэгъун")
- morphemes?: string[]

## Cikti
- lexemeId: string
- rootId: string | null
- rootForm: string | null
- confidence: number (0.0 - 1.0)
- method: 'dictionary' | 'morpheme' | 'corpus' | 'fallback'
- evidence?: string

## Kurallar
1. Once roots.json'da ara (tam eslesme)
2. Yoksa morphemes.json'dan kok morfemini cikar
3. Yoksa korpus frekansina bak
4. Hicbiri yoksa null dondur

## Hata Durumlari
| Durum | Cikti |
|-------|-------|
| Lexeme bulunamadi | rootId: null, method: 'fallback' |
| Kok belirsiz | rootId: null, confidence: 0.0 |
| Coklu kok adayi | En yuksek frekansliyi sec |

## Ornek
Girdi: { lexemeId: "L-LHEGHUN", form: "лъэгъун" }
Cikti: {
  lexemeId: "L-LHEGHUN",
  rootId: "R-LEGHUN",
  rootForm: "лъэгъу",
  confidence: 0.95,
  method: "dictionary",
  evidence: "lheghun.md"
}

## Test Kriterleri
- [ ] лъэгъун -> R-LEGHUN
- [ ] лъагъун -> R-LEGHUN
- [ ] лъагъуныгъэ -> R-LEGHUN
- [ ] шэ (sut) -> R-SHE
- [ ] шэ (mermi) -> R-SHE2
- [ ] Bilinmeyen form -> null

## Bagimliliklar
- roots.json
- morphemes.json
- lexemes.json
- corpusFrequency

## Runtime Izolasyonu
- Bu modul sadece veri uretir
- Discovery Runtime'a baglanmaz
- ADR-ROOT-001 korunur
