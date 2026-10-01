# MORPHOLOGY_SCOPE.md

**Tarih:** 2026-10-02
**Durum:** AKTIF
**Versiyon:** v1.0

---

## 1. AMAC

Bu belge, Morphology Engine'in SINIRLARINI tanimlar.
Hangi modul hangi katmanda, hangi import yasak.

---

## 2. KATMANLAR

### Katman 1: Root (Kok)

| Parser | Gorev |
|--------|-------|
| RootClassifier | Kok siniflandirma (FREE/BOUND) |
| RootExtractor | Kok cikarma |

### Katman 2: Morpheme (Morfem)

| Parser | Gorev |
|--------|-------|
| MorphemeParser | Morfem ayristirma |
| PossessivePrefixDecompiler | Iyelik onekleri |
| NounCaseParser | Isim durum ekleri |
| NominalDerivationDecompiler | Isim turetme |
| PronounDecompiler | Zamirler |
| NumeralDecompiler | Sayilar |
| VerbDecompiler | Fiil onekleri |
| ParticipleDecompiler | Partisipler |
| AdverbDecompiler | Zarflar |
| PostpositionDecompiler | Edatlar |
| ConjunctionDecompiler | Baglaclar |
| ParticleDecompiler | Parcaciklar |

### Katman 3: Lemma

| Parser | Gorev |
|--------|-------|
| LemmaBuilder | Lemma olusturma |
| InflectionHandler | Cekim isleme |

### Katman 4: Phrase (Obek)

| Parser | Gorev |
|--------|-------|
| PhraseAnalyzer | Kelime obekleri (NP, AdjP, NumP, PossP, PP, VP, PartP, BARE) |

### Katman 5: Syntax (Cumle)

| Parser | Gorev |
|--------|-------|
| SyntaxAnalyzer | Cumle yapisi (SOV, OSV, SV, OV, ERGATIVE, AFFECTIVE, BARE) |

---

## 3. SINIR TANIMLARI

### Morphology Siniri

**Kapsam:**
- Kok
- Morfem
- Lemma
- Cekim

**Yasak:**
- Cumle yapisi
- Anlam analizi
- Baglam analizi

### Phrase Siniri

**Kapsam:**
- Kelime obekleri
- Obek basi (head)
- Obek bagimlilari

**Yasak:**
- Cumle yapisi
- Anlam analizi
- Runtime import

### Syntax Siniri

**Kapsam:**
- Cumle yapisi
- Ozne/nesne/yuklem
- Ergatif/affektif

**Yasak:**
- Anlam analizi
- Discovery
- Runtime import

---

## 4. RUNTIME YASAGI

**Morphology Engine HICBIR modulu su modulleri import ETMEZ:**

| Yasakli Modul | Neden |
|---------------|-------|
| DiscoveryFacade | Runtime katmani |
| KnowledgeRanker | Runtime katmani |
| SemanticRetrieval | Runtime katmani |
| Search Runtime | Runtime katmani |

**Kanit:** (asagidaki komutla dogrulanir)
```powershell
Get-ChildItem ".\src\domain\morphology" -Filter "*.ts" |
  Select-String -Pattern "Discovery|KnowledgeRanker|SemanticRetrieval|Search Runtime"

PowerShell'de **backtick (`)** escape karakteridir. Yani komut bozuluyor.

## Çözüm: MORPHOLOGY_SCOPE.md'yi Basitleştir

MORPHOLOGY_SCOPE.md'nin içindeki **kod bloğunu** kaldıralım — çünkü PowerShell'de sorun çıkarıyor.

### Yeni MORPHOLOGY_SCOPE.md (Backtick'siz)

```powershell
Set-Location "E:\projeler\Cerkesce"

$scope = @'
# MORPHOLOGY_SCOPE.md

**Tarih:** 2026-10-02
**Durum:** AKTIF
**Versiyon:** v1.0

---

## 1. AMAC

Bu belge, Morphology Engine'in SINIRLARINI tanimlar.
Hangi modul hangi katmanda, hangi import yasak.

---

## 2. KATMANLAR

### Katman 1: Root (Kok)

| Parser | Gorev |
|--------|-------|
| RootClassifier | Kok siniflandirma (FREE/BOUND) |
| RootExtractor | Kok cikarma |

### Katman 2: Morpheme (Morfem)

| Parser | Gorev |
|--------|-------|
| MorphemeParser | Morfem ayristirma |
| PossessivePrefixDecompiler | Iyelik onekleri |
| NounCaseParser | Isim durum ekleri |
| NominalDerivationDecompiler | Isim turetme |
| PronounDecompiler | Zamirler |
| NumeralDecompiler | Sayilar |
| VerbDecompiler | Fiil onekleri |
| ParticipleDecompiler | Partisipler |
| AdverbDecompiler | Zarflar |
| PostpositionDecompiler | Edatlar |
| ConjunctionDecompiler | Baglaclar |
| ParticleDecompiler | Parcaciklar |

### Katman 3: Lemma

| Parser | Gorev |
|--------|-------|
| LemmaBuilder | Lemma olusturma |
| InflectionHandler | Cekim isleme |

### Katman 4: Phrase (Obek)

| Parser | Gorev |
|--------|-------|
| PhraseAnalyzer | Kelime obekleri (NP, AdjP, NumP, PossP, PP, VP, PartP, BARE) |

### Katman 5: Syntax (Cumle)

| Parser | Gorev |
|--------|-------|
| SyntaxAnalyzer | Cumle yapisi (SOV, OSV, SV, OV, ERGATIVE, AFFECTIVE, BARE) |

---

## 3. SINIR TANIMLARI

### Morphology Siniri

**Kapsam:**
- Kok
- Morfem
- Lemma
- Cekim

**Yasak:**
- Cumle yapisi
- Anlam analizi
- Baglam analizi

### Phrase Siniri

**Kapsam:**
- Kelime obekleri
- Obek basi (head)
- Obek bagimlilari

**Yasak:**
- Cumle yapisi
- Anlam analizi
- Runtime import

### Syntax Siniri

**Kapsam:**
- Cumle yapisi
- Ozne/nesne/yuklem
- Ergatif/affektif

**Yasak:**
- Anlam analizi
- Discovery
- Runtime import

---

## 4. RUNTIME YASAGI

**Morphology Engine HICBIR modulu su modulleri import ETMEZ:**

| Yasakli Modul | Neden |
|---------------|-------|
| DiscoveryFacade | Runtime katmani |
| KnowledgeRanker | Runtime katmani |
| SemanticRetrieval | Runtime katmani |
| Search Runtime | Runtime katmani |

**Dogrulama Komutu:**

Get-ChildItem ".\src\domain\morphology" -Filter "*.ts" | Select-String -Pattern "Discovery|KnowledgeRanker|SemanticRetrieval|Search Runtime"

**Beklenen:** Hic sonuc donmemeli.

---

## 5. VERI AKISI

Token -> RootClassifier (FREE/BOUND) -> RootExtractor (kok) -> MorphemeParser (morfemler) -> LemmaBuilder (lemma) -> InflectionHandler (cekim) -> PhraseAnalyzer (obek) -> SyntaxAnalyzer (cumle) -> DUR (Runtime'a gecmez)

---

## 6. TEST DURUMU

| Katman | Parser | Test |
|--------|--------|------|
| Root | 2 | 23 |
| Morpheme | 12 | 262 |
| Lemma | 2 | 15 |
| Phrase | 1 | 24 |
| Syntax | 1 | 24 |
| TOPLAM | 18 | 599 |

---

## 7. ILKELER

| Ilke | Durum |
|------|-------|
| ADR-ROOT-001 | Korunuyor |
| Runtime Izolasyonu | Korunuyor |
| Sadece veri uretir | Evet |
| Discovery'ye baglanmaz | Evet |
| SemanticRelations runtime'da degil | Evet |

---

## 8. REFERANSLAR

- ADR-0040: Morphological Root Taxonomy
- ADR-0023: Verb Prefix Slot Grammar
- ADR-0024: Lemma Identity Rule
- ADR-0025: Dialect Naming (KBD/ADY)

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02

---

## 9. RUNTIME ISOLATION RULE (Mimar Karari)

### Tek Cumlelik Kural

Morphology Engine analiz uretir, karar uretmez.

### Yasak Importlar

- DiscoveryFacade
- KnowledgeRanker
- SemanticRetrieval
- SearchService
- SuggestionService

### Yasak Davranislar

- Vector Search
- Embedding Lookup
- Result Ranking
- Runtime Decisions

### Izin Verilen Ciktilar

- Root
- Morpheme
- Lemma
- Sense
- Phrase AST
- Syntax AST

### Dogrulama

Her yeni modul icin:

Get-ChildItem ".\src\domain\morphology" -Filter "*.ts" | Select-String -Pattern "Discovery|KnowledgeRanker|SemanticRetrieval|SearchService|SuggestionService"

Beklenen: Hic sonuc donmemeli.

### Neden Bu Kural Var?

Gecmiste 7 kez sistem coktu:

Morphology -> Discovery -> Semantic -> Morphology

Dongusel bagimlilik -> sistem kararsiz -> veri kaybi

Bu kural, sistem stabilitesi icin kritik.

### Ihlal Durumunda

1. Testler fail eder
2. Sistem kararsiz hale gelir
3. Veri kaybi riski
4. Dongusel bagimlilik olusur

**Bu kural gevsetilemez.**
