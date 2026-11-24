# P4 — Discovery / Concept / Dialect Temizlik Sprinti: İnceleme Raporu

**Tarih:** 2026-11-24
**Amaç:** Silme kararından önce her ölü modül için: ne iş yapıyor, canlı alternatifi ne, kullandık mı / kullanabilir miyiz, öneri.
**Yöntem:** Import taraması (app/, src/, scripts/; testler ve faz-kontrol sayfası hariç) + 2026-11-23 backend/UI kesişim taraması + bugünkü bağlantıların güncel durumu.
**Kural:** Bu rapor yalnızca incelemedir — hiçbir dosya silinmedi. Her grup ayrı onay ister.

---

## Durum tablosu (özet)

| Grup | Kapsam | Öneri |
|---|---|---|
| A | Tamamen ölü, canlı alternatifi var | **SİL** |
| B | Ölü zincirler (yalnızca ölü modüller tüketiyor) | **SİL** (zincir toplu) |
| C | Export ailesi | **2 BAĞLA + 2 SİL** |
| D | Bugün canlandı / canlı | **DOKUNMA** |

---

## A. Tamamen ölü, canlı alternatifi var (0 tüketici)

### A1. `src/domain/discovery/facades/DiscoveryFacade.ts`
- **Ne yapar:** `services/DiscoveryFacade.ts`'in eskimiş ikinci kopyası (keşif motoru facade'i).
- **Alternatif:** Canlı kopya — bugün `FileBasedConceptGraphRepository` ile kavram sayfalarına bağlandı.
- **Kullandık mı:** Hayır; hiçbir yerden import edilmiyor.
- **Öneri:** SİL.

### A2. `src/domain/concept/MeaningGraph.ts` (kök dizin)
- **Ne yapar:** Phase 3 "Concept Foundations" döneminden anlam grafiği modeli (kavram ↔ anlam düğümleri).
- **Alternatif:** Gerçek kavram ağı artık `FileBasedConceptGraphRepository` (lexemes.json aile/kök grafiğı) + `ConceptGraphAdapter` üzerinden akıyor.
- **Kullanabilir miyiz:** Hayır — veri modeli mevcut lexemes şemasıyla uyumsuz.
- **Öneri:** SİL.

### A3. `src/repository/ConceptRepository.ts`
- **Ne yapar:** Kavramları saklamak için eski repository (Phase 3).
- **Alternatif:** Kavram verisi bugün `concept-words.json` + `concept-tr.json` doğrudan okunarak (sayfalar) ve `ConceptRegistry` (InMemory repo'da) kullanılıyor.
- **Öneri:** SİL.

### A4. `src/domain/linguistic/WordFamily.ts` + `SemanticRelation.ts` (+ `linguistic/index.ts` barrel)
- **Ne yapar:** Eski kelime ailesi / anlamsal ilişki tip tanımları.
- **Alternatif:** `word_families.json` + lexemelerin `wordFamilyId`/`rootIds` alanları (canlı, curation rotaları tarafından yazılıyor).
- **Öneri:** SİL.

### A5. `src/ui/pages/` + `src/ui/components/explorer/`
- **Kapsam:** `NetworkExplorerPage.tsx` (+ `.bozuk` + 2 `.yedek` yedek dosyası!), `AnalyticsDashboardPage.tsx`, `ConceptDetailDrawer.tsx`, `NetworkExplorerToolbar.tsx`
- **Ne yapar:** Faz 6.2/7 döneminin test-sade sayfaları — `app/explorer` bunları DEĞİL kendi yerel UI'ını kullanıyor (faz-kontrol etiketi bugün düzeltildi).
- **DİKKAT — cert test etkisi:** `src/tests/ui/NetworkExplorerPage.test.ts` ve `AnalyticsDashboard.test.ts` cert suitinde çalışıyor (102 test). Sayfalar silinirse testleri de silinmeli → cert sayısı düşer, `CURRENT_TEST_BASELINE.md` güncellenir.
- **Öneri:** SİL (sayfalar + testleri + `.bozuk`/`.yedek` çöpleri). NetworkExplorer'ın canlı işlevi `/explorer` sayfasında zaten var.

---

## B. Ölü zincirler (yalnızca ölü modüller tüketiyor)

### B1. `dialect.ts` barrel zinciri
- **Kapsam:** `src/domain/dialect.ts`, `Dialect.ts`, `DialectRule.ts`, `Variant.ts`, `VariantId.ts`, `VariantRepository.ts`, `src/domain/IDialectRuleRepository.ts`, `src/repository/IDialectRuleRepository.ts`, `DialectRuleRepository.ts`, `InMemoryVariantRepository.ts`, `DialectResolver.ts`
- **Ne yapar:** Phase 2-3 döneminin lehçe kuralı/varyant deposu katmanı.
- **Alternatif (canlı):** `src/lib/dialectRules.ts` (arama sayfası), `domain/linguistic/DialectConverter` (VERIFIED_PAIRS, kavram sayfaları + converter bileşeni), `LexemeIdentity.normalizeDialect` (KBD/ADY/COMMON).
- **Tüketici analizi:** `DialectResolver`'in "tüketenleri" `MultilingualExplorer` (ölü, B3) ve `InMemoryVariantRepository` (bu zincirin kendi üyesi).
- **Kullanabilir miyiz:** Hayır — canlı lehçe hattı üç ayrı yerde kurulu.
- **Öneri:** SİL (zincir toplu — parça parça silmek kırık ara durum yaratır).

### B2. `ConceptRegistry.optimize.ts`, `bridge/MeaningConceptLink.ts`, `concept/services/` (Concept, MeaningGraph, MeaningConceptLinker), `src/services/ConceptFacade.ts`, `ConceptValidator.ts`
- **Ne yapar:** Phase 3'ün "anlam ↔ kavram köprüleme" denemeleri.
- **Alternatif:** Bu köprüyü bugün FileBased repo + QuerySemanticMapper zinciri gerçek veriyle yapıyor.
- **Tüketici analizi:** domain-borc sayfasında yalnızca İSİM olarak geçiyorlar (import yok — doğrulandı).
- **Öneri:** SİL. (**Not:** `ConceptRegistry.ts` ana dosyası KALIYOR — InMemoryConceptGraphRepository kullanıyor.)

### B3. `MultilingualExplorer` + `SearchFacade` (discovery)
- **Ne yapar:** Çok dilli keşif / arama facade'i — DiscoveryFacade'in kardeşi ama canlı yola bağlı değil.
- **Alternatif:** `app/api/search` + `DiscoveryFacade.explore` (canlı).
- **Öneri:** SİL.

### B4. `morphology.ts` barrel (tip tanımları)
- **Ne yapar:** Morfoloji tip tanımlarının eski barrel'i.
- **Alternatif:** Canlı morfoloji zinciri (`MorphologyAnalyzer` → `/api/morphology/analyze`) kendi tiplerini kullanıyor.
- **Öneri:** SİL.

### B5. `linguistic/InMemoryVectorStore.ts`, `InflectionHandler (linguistic)`, `Root.ts`, `Morpheme.ts`
- **Ne yapar:** Faz 4 öncesi tip/prototip tanımları.
- **Alternatif:** Canlı morfoloji motoru (RootExtractor, MorphemeParser, çekim işleme `DictionaryProvider` içinde).
- **Tüketici:** Yalnızca testler.
- **Öneri:** SİL (testleri birlikte).

---

## C. Export ailesi — değer kararı

### C1. `CsvExporterService` → **BAĞLA (öneri)**
- **Ne yapar:** Ağı CSV/TSV olarak dışa aktarır (düğümler/kenarlar ayrı veya birleşik).
- **Kullanabilir miyiz:** EVET — `GraphExport`'a üçüncü buton ("CSV indir"). Kontrol edildi: kavram-agi'de mevcut indirme SVG+JSON; menüde başka CSV yok → **çift buton olmaz**. Araştırmacılar için gerçek değer (Excel'de analiz).

### C2. `CanvasPngRendererService` → **BAĞLA (kullanıcı onayı var)**
- **Ne yapar:** SVG → PNG dönüşümü (client-side gerçek render; Node'da stub).
- **Kullanabilir miyiz:** EVET — #5 kapsamında "PNG indir" butonu. `GraphExport.tsx`'teki yorum bunu zaten planlıyordu.

### C3. `ZipExporterService`, `ReportGeneratorService` → SİL (öneri)
- **Ne yapar:** Toplu ZIP paketleme, Markdown ağ raporu.
- **Neden sil:** Yalnızca BatchExport (Express, emekli) senaryosuna hizmet ediyordu; tekil kullanıcı değeri düşük. CSV+SVG+JSON+PNG dörtlüsü pratik ihtiyacı karşılıyor.

### C4. `BatchExportService` + controller'lar → **DOKUNMA**
- ADR-EXPRESS-001 koruma kapsamında (cert testleri). Ayrı karar.

---

## D. DOKUNMA — bugün canlandı / canlı

| Modül | Durum |
|---|---|
| `DiscoveryFacade` (services) + `FileBasedConceptGraphRepository` | Bugün kavram sayfalarına bağlandı |
| `InMemoryConceptGraphRepository` | FileBased repo'nun kürasyon katmanı |
| `ConceptRegistry.ts` (ana) | InMemory repo kullanıyor |
| `QuerySemanticMapper` + `WordFamilyResolver` zinciri | facade'in mapper'ı — canlı |
| `LexemeIdentity`, `RootValue`, `WordFamilyId` | `lexemeStore` kullanıyor |
| `DialectConverter`, `dialectRules.ts` | Sayfalar + arama canlı |
| `FederatedGraphService` | kavram-agi'ye bağlı (bilinen no-op sınırlamasıyla) |

---

## Uygulama planı (onay sonrası)

Sprint 3 adımda, her adım ayrı commit + tam doğrulama (tsc, ana suit, cert, build):

1. **Commit 1 — A grubu:** A1-A5 (+ etkilenen cert testleri, baseline güncellemesi)
2. **Commit 2 — B grubu:** B1-B5 (+ testleri)
3. **Commit 3 — C grubu:** C1+C2 bağlama (CSV + PNG butonları), C3 silme

**Beklenen etki:** ~-1.500 satır ölü kod; cert test sayısı düşer (NetworkExplorerPage/AnalyticsDashboard testleri); baseline güncellenir.

**Riskler:** Zincir silimlerde (B1) test kırılmaları olabilir — her zincir silinmeden önce `vitest run` ile etkilenen test dosyaları tespit edilip aynı commit'te kaldırılır.
