# ADR-ROOT-001: Root-Centric Linguistic Dataset

**Durum:** KABUL EDILDI (Faz C-4 ile veriyle desteklendi)
**Tarih:** 2026-09-28
**Guncelleme:** 2026-09-29
**Karar Veren:** Mimar
**Kapsam:** SADECE VERI KATMANI - Runtime degismez

---

## Baglam

- kabardian_roots_database.json (~1500 kok)
- Kuipers, Phoneme and Morpheme in Kabardian (1960)
- Colarusso, A Grammar of the Kabardian Language (1992)

Ampirik Kanit (Adyghe Web Corpus, 2026-09-28):

| Kok | Lemma | Siklik | Deyim |
|---|---|---|---|
| gu | 47 | 52.291 | 218 |
| shhye | ~30 | ~15.000 | 130 |
| ne | ~25 | ~10.000 | 111 |
| 1e | ~15 | ~5.000 | 52 |

---

## Karar

Yeni bir veri katmani eklenir. Runtime'a dokunulmaz.

Root -> Morpheme -> WordFamily -> Lexeme

Konum: src/domain/linguistic/

### Ilkeler

1. Root != Concept
2. Root -> Concept Space
3. Concept -> Root (ters uretim YOK)
4. Root = Semantic Generator
5. SemanticRelations: veri olarak toplanir, runtime'a sokulmaz
6. TranslationGroup korunur

---

## Gerekce

Akademik:
- Kuipers (1960): Kabardeyce tek koklu morfemlerden olusur
- Colarusso (1992): Graduated abstractness

Ampirik:
gu (kalp) -> guf1e (sevinc)
          -> guge (umut)
          -> gubzh (ofke)
          -> gubzyge (zeka)
          -> guetynyge (sadakat)

Diyalekt:
sh1o (Adigece) <-> f1e (Kabardeyce)

---

## Uygulama Plani

### Faz A: Karar
- [x] ADR-ROOT-001
- [x] RESTORED.md
- [x] ROADMAP.md

### Faz B: Tipler
- [x] Root.ts, Morpheme.ts, WordFamily.ts, Lexeme.ts, SemanticRelation.ts
- [x] tsc --noEmit temiz

### Faz C: Veri
- [x] roots.json (32 kok)
- [x] morphemes.json (45 morfem)
- [x] lexemes.json (90 lexeme)
- [x] semantic_relations.json (70 iliski)

### Faz D: Korpus
- [x] gu, shhye, ne, 1e

---

## Kabul Kriterleri

- [x] 10+ kok semasi (32 kok)
- [x] 20+ morfem eslesmesi (45 morfem)
- [x] 5+ Compound (70 semantic relation)
- [x] tsc --noEmit temiz
- [x] Runtime'a import YOK
- [x] 220/220 PASS korunuyor

**6/6 KRITER TAMAMLANDI** ✅

---

## Referanslar

- Kuipers, A.H. (1960). Phoneme and Morpheme in Kabardian
- Colarusso, J. (1992). A Grammar of the Kabardian Language
- Adyghe Web Corpus: https://adyghe.web-corpora.net
- ADR-0015-TRANSLATIONENTRY_CANONICAL_IDENTITY.md

---

## Sonraki ADR

ADR-ROOT-002: Linguistic Dataset -> Runtime Entegrasyonu
(DRAFT asamasina bile alinmayacak)

---

## Kabul Kriteri #6: Runtime Isolation Test

**Eklenme Tarihi:** 2026-09-28
**Ekleyen:** Mimar

### Aciklama

Linguistic Dataset Layer, asagidaki runtime bilesenleri tarafindan
import EDILMEMELIDIR:

- DiscoveryFacade
- ConceptRegistry
- KnowledgeRanker
- ContextClusterer
- GraphTraversal
- QuerySemanticMapper

### Kontrol

Get-ChildItem "src" -Recurse -Filter "*.ts" |
    Where-Object { .FullName -notlike "*\linguistic\*" } |
    Select-String "from.*linguistic" -List

### Beklenen Sonuc

Bos cikti.

### Durum

[x] Runtime katmanindan linguistic/* import edilmiyor
[x] tsc --noEmit temiz
[x] 220/220 PASS korunuyor

### Dogrulama Tarihi

2026-09-29

---

## Faz C-4 Sonucu

**Tarih:** 2026-09-29
**Durum:** ✅ MIMAR ONAYLI

Mimar karari:
> "Faz C-4 kabul edilmistir. 32 Root, 90 Lexeme, 45 Morpheme, 70 Semantic Relation,
> 220/220 PASS seviyesi artik kucuk bir deney degil, anlamli bir dil veri altyapisidir."

### Onemli Basari

- ✅ Runtime izolasyonu korundu
- ✅ Linguistic Dataset Layer buyudu
- ✅ Hicbir motor etkilenmedi

---

**Imza:** Gelistirme Ekibi
**Tarih:** 2026-09-29