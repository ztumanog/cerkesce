# ADR-ROOT-001: Root-Centric Linguistic Dataset

**Durum:** KABUL EDILDI (Faz C-5 ile veriyle desteklendi)
**Tarih:** 2026-09-28
**Guncelleme:** 2026-09-29
**Karar Veren:** Mimar
**Kapsam:** SADECE VERI KATMANI - Runtime degismez

---

## Baglam

- kabardian_roots_database.json (~1500 kok)
- Kuipers, Phoneme and Morpheme in Kabardian (1960)
- Colarusso, A Grammar of the Kabardian Language (1992)

Ampirik Kanit (Adyghe Web Corpus, 2026-09-29):

| Kok | Lemma | Siklik | Deyim |
|---|---|---|---|
| псэ | 6177 | 6177 | 80+ |
| псэун | 851 | 851 | - |
| псы | 320 | 320 | - |
| гу | 47 | 52291 | 218 |
| щхьэ | ~30 | ~15000 | 130 |
| нэ | ~25 | ~10000 | 111 |

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

## Uygulama Plani

### Faz A: Karar
- [x] ADR-ROOT-001
- [x] RESTORED.md
- [x] ROADMAP.md

### Faz B: Tipler
- [x] Root.ts, Morpheme.ts, WordFamily.ts, Lexeme.ts, SemanticRelation.ts
- [x] tsc --noEmit temiz

### Faz C: Veri
- [x] roots.json (40 kok)
- [x] morphemes.json (60 morfem)
- [x] lexemes.json (126 lexeme)
- [x] semantic_relations.json (100 iliski)

### Faz D: Korpus
- [x] gu, shhye, ne, 1e, psy, pse, bze, pe, dze

---

## Kabul Kriterleri

- [x] 10+ kok semasi (40 kok)
- [x] 20+ morfem eslesmesi (60 morfem)
- [x] 5+ Compound (100 semantic relation)
- [x] tsc --noEmit temiz
- [x] Runtime'a import YOK
- [x] 220/220 PASS korunuyor

**6/6 KRITER TAMAMLANDI**

---

## Kabul Kriteri #6: Runtime Isolation Test

### Kontrol

Get-ChildItem "src" -Recurse -Filter "*.ts" |
    Where-Object { $_.FullName -notlike "*\linguistic\*" } |
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

## Faz C-5 Sonucu

**Tarih:** 2026-09-29
**Durum:** COMPLETED

### Onemli Basari

- Runtime izolasyonu korundu
- Linguistic Dataset Layer buyudu
- Hicbir motor etkilenmedi
- R-PSE ve R-PSY ayrimi netlesti
- Korpus dogrulamasi yapildi

---

## Sonraki ADR

ADR-ROOT-002: Linguistic Dataset -> Runtime Entegrasyonu
(DRAFT asamasina bile alinmayacak)

---

**Imza:** Gelistirme Ekibi
**Tarih:** 2026-09-29
