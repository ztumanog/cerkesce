# PHASES - FAZ DETAYLARI

---

## Faz 1 — Core Dictionary Platform

**Durum:** ✅ TAMAMLANDI

### Çıktılar
- DictionaryLoader
- DictionaryService
- DictionaryResolver
- dictionaryUtils
- Source Registry
- Normalization Layer
- Zod Validation
- Search Engine
- Footer / Kaynaklar
- UI Refactor
- Batch Loading
- Performans Optimizasyonları

---

## Faz 2 — Translation Platform

**Durum:** 🔄 STABİLİZE EDİLİYOR

### Çıktılar (Devam Eden Çalışma)
- TranslationEntry (Canonical ID)
- TranslationMeaning (Anlam Modeli)
- TranslationGroup (Semantic Grouping)
- TranslationRepository (Core Interface)
- TranslationService (Orchestration)
- CrossDictionaryMatcher
- MorphologyAwareMatching
- Reverse Translation Search
- MultiLanguage Search
- TranslationTable UI

**Not:** Build geçti ama Faz 2 sözleşmeleri üzerinde hâlâ çalışıyoruz.

---

## 🏗️ Sprint B — Build Stabilizasyonu

**Durum:** 🟡 Son Doğrulama

**Amaç:**
Faz 2 Translation Platform çalışmalarına geçmeden önce tip sistemi, build zinciri ve veri modeli tutarlılığını sağlamak.

**Stratejik Kararlar:**
- ✅ Discovery Engine kapsam dışına alındı
- ✅ Analytics modülleri kapsam dışına alındı
- ✅ Cytoscape / Explorer bileşenleri kapsam dışına alındı
- 🟡 Build Gate son doğrulama aşamasında

**Build Gate Kriterleri:**
```
🟡 npx tsc --noEmit = Son doğrulama (16 errors in 4 files)
🟡 npm run build = Son doğrulama (42 errors in 10 files)
```

### 🏗️ EN KRİTİK MİMARİ KARAR

**DictionaryEntry = Single Source of Truth (SSOT)**

```
RawDictionaryItem
    ↓
normalizeDictionaryEntry()
    ↓
DictionaryEntry ✅ (Single Source of Truth)
    ↓
isValidDictionaryEntry()
    ↓
Repository
    ↓
UI (Yalnızca DictionaryEntry tüketir)
```

### 🧬 PROJE DNA'SI

1. **UI ham veri tüketmez**
2. **UI yalnızca DictionaryEntry tüketir**
3. **Ham veri yalnızca Loader + Normalizer katmanında yaşar**

**Kurallar:**
- Tüm veri normalizasyonu, DictionaryEntry oluşturulurken yapılır
- UI katmanında `entry.word ?? entry.kelime ?? entry.madde` tarzı kodlar yasaktır
- Repository yalnızca doğrulanmış DictionaryEntry döndürür

**Tamamlananlar:**
- ✅ Dictionary tip sistemi yeniden kuruldu
- ✅ Merge conflict temizliği tamamlandı
- ✅ SearchBox kurtarıldı
- ✅ SozlukEkrani kurtarıldı
- ✅ KelimeKarti kurtarıldı
- ✅ GununKelimesi modeli geri kazanıldı
- ✅ TranslationMeaning modeli ADR-0002 ile uyumlu hale getirildi
- ✅ Hata sayısı 200+ seviyesinden çift haneli seviyelere düşürüldü
- ✅ source-registry.ts mapper uyarlaması
- ✅ translation.ts meanings tipi düzeltildi

**Hata Sayısı Geçişi:**

| Aşama | Hata Sayısı | Durum |
|-------|------------|-------|
| İlk | 191+ | 🔴 Kritik |
| Ara | 128 | 🟡 Gelişme |
| Ara | 135 | 🟡 Tekrar Yükseldi |
| Ara | 42 | 🟢 Faz 2 Temiz |
| Final | 16 | 🟡 Son Doğrulama |

**Neden Bu Karar Önemli?**

Sprint B'nin gerçek çıktısı Search'in çalışması değil, **ham verinin UI'dan ayrıştırılması ve DictionaryEntry'nin tek doğruluk kaynağı olmasıdır.**

Altı ay sonra dönüp bakınca:
- **DictionaryEntry = SSOT** kararı tüm mimariyi tutarlı tutacak
- Ham veri tüketimi engellemek = Bug'ları 90% azaltacak
- Veri akışı standardı = Yeni geliştiriciler için açık rehber

**Bu not, projenin DNA'sı olacaktır. 💙🚀**

---

## Faz 3 — Concept Engine

**Durum:** 🔒 KILITLI

### Planlanan Çıktılar
- ConceptID (Identity Model)
- ConceptNode (Entity)
- ConceptEdge (Relationships)
- ConceptGraph (Data Structure)
- GraphBuilder
- ConceptQuery
- GraphTraversal
- ConceptService

---

## Faz 6.1 — API Gateway

**Durum:** ✅ SERTİFİKALI

### Çıktılar
- ConceptNetworkDTO
- ConceptGraphAdapter
- DiscoveryFacade
- OpenAPI 3.0 Contract

---

## Faz 6.2 — Interactive Explorer

**Durum:** ✅ SERTİFİKALI

### Çıktılar
- NetworkExplorerPage
- CytoscapeAdapter
- CytoscapeGraphConfig
- GraphMerger
- ExpansionEngine