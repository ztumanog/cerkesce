# MORPHOLOGY_SCOPE_FREEZE.md

**Tarih:** 2026-10-02
**Durum:** AKTIF
**Karar:** Kapsam Donduruldu

---

## 1. AMAC

Bu belge, Morphology Engine kapsamini dondurur.
Yeni parser eklenemez, mevcut parser degistirilemez.

---

## 2. DONDURULAN KAPSAM

### 18 Parser

| # | Parser | Test | Katman |
|---|--------|------|--------|
| 1 | RootClassifier | 10 | Root |
| 2 | RootExtractor | 13 | Root |
| 3 | MorphemeParser | 15 | Morpheme |
| 4 | LemmaBuilder | 10 | Lemma |
| 5 | InflectionHandler | 5 | Lemma |
| 6 | PossessivePrefixDecompiler | 15 | Morpheme |
| 7 | NounCaseParser | 23 | Morpheme |
| 8 | NominalDerivationDecompiler | 24 | Morpheme |
| 9 | PronounDecompiler | 25 | Morpheme |
| 10 | NumeralDecompiler | 30 | Morpheme |
| 11 | VerbDecompiler | 24 | Morpheme |
| 12 | ParticipleDecompiler | 24 | Morpheme |
| 13 | AdverbDecompiler | 24 | Morpheme |
| 14 | PostpositionDecompiler | 24 | Morpheme |
| 15 | ConjunctionDecompiler | 24 | Morpheme |
| 16 | ParticleDecompiler | 24 | Morpheme |
| 17 | PhraseAnalyzer | 30 | Phrase |
| 18 | SyntaxAnalyzer | 40 | Syntax |
| **TOPLAM** | | **621** | |

### 5 Katman

1. Root
2. Morpheme
3. Lemma
4. Phrase
5. Syntax

### Runtime Isolation Rule

- Morphology uretir
- Phrase yapilandirir
- Syntax analiz eder
- Runtime karar verir

---

## 3. DONDURMA KURALLARI

### Yasak

- Yeni parser eklemek
- Mevcut parser'i degistirmek
- Parser kapsamini genisletmek
- Runtime import eklemek
- Discovery import eklemek

### Izin Verilen

- Hata duzeltme
- Test ekleme
- Dokumantasyon guncelleme
- Refactoring (davranis degismeden)

### Istisna

- Mimar onayi ile yeni parser eklenebilir

---

## 4. DOGRULAMA

### Test

npm test

Beklenen: 621/621 PASS

### Runtime Izolasyonu

Get-ChildItem ".\src\domain\morphology" -Filter "*.ts" | Select-String -Pattern "Discovery|KnowledgeRanker|SemanticRetrieval"

Beklenen: Hic sonuc donmemeli.

---

## 5. NEDEN DONDURULDU?

1. 18 parser yeterli
2. 621 test PASS
3. Runtime izolasyonu korunuyor
4. Kapsam net
5. Yeni parser = risk

---

## 6. SONUC

- ✅ Morphology Engine teslim edildi
- ✅ 18 parser donduruldu
- ✅ 621 test PASS
- ✅ Runtime izolasyonu korunuyor

**Bu kapsam dondurulmustur.**

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02
