# Architectural Decision Records (ADR)

| ID | Başlık | Durum | Faz | Etkilenen Katmanlar |
| :--- | :--- | :--- | :--- | :--- |
| **ADR-0001** | Parallel Loading of Base Dictionaries | Kabul Edildi | Faz 1 | Loader, Service |
| **ADR-0002** | Batch Loading Strategy for Secondary Data | Kabul Edildi | Faz 1 | Loader |
| **ADR-0003** | Mandatory Phase Locking | Kabul Edildi | Faz 1 | Tüm Sistem |
| **ADR-0004** | TranslationEntry Canonical Identity | Kabul Edildi | Faz 2 | Normalizer, Repository, Service |
| **ADR-0005** | TranslationGroup Strategy | Kabul Edildi | Faz 2 | Service, UI |
| **ADR-0006** | Morphology-Aware Cross Dictionary Matching Strategy | Kabul Edildi | Faz 2 | Normalizer, Matching Engine, Service |
| **ADR-0007** | TranslationRepository Contract | Kabul Edildi | Faz 2 | Repository, Service |

---

## ADR-0001 — Parallel Loading of Base Dictionaries

* **Tarih:** 2026-08-28
* **Durum:** Kabul Edildi
* **Faz:** Faz 1
* **Karar:** İlk sistem başlatılmasında 3 temel sözlük paralel olarak yüklenir.
* **Gerekçe:** İlk etkileşim süresini (Time to Interactive - TTI) minimize etmek.
* **Etkilenen Katmanlar:** `Loader`, `Service`

---

## ADR-0002 — Batch Loading Strategy for Secondary Data

* **Tarih:** 2026-08-28
* **Durum:** Kabul Edildi
* **Faz:** Faz 1
* **Karar:** Sonraki veri yüklemeleri 4'erli paketler (batch) halinde işlenir.
* **Gerekçe:** 204 MB boyutundaki veri kümesinde bellek kullanımını (RAM footprint) dengede tutmak.
* **Etkilenen Katmanlar:** `Loader`

---

## ADR-0003 — Mandatory Phase Locking

* **Tarih:** 2026-08-28
* **Durum:** Kabul Edildi
* **Faz:** Faz 1
* **Karar:** Katmanlar arası bağımlılıklarda Faz Kilidi (Phase Lock) uygulanması zorunludur. Faz gereksinimleri tamamlanmadan sonraki aşamaya geçilemez.
* **Gerekçe:** Mimari tutarsızlığı ve teknik borç oluşumunu engellemek.
* **Etkilenen Katmanlar:** Tüm Sistem

---

## ADR-0004 — TranslationEntry Canonical Identity Rule

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Faz:** Faz 2 (Translation Platform)
* **Karar:**
  1. Kayıt kimlikleri (ID) strictly deterministik üretilir: `<sourceId>:<sourceEntryId>`
  2. Kaynak ID bulunmadığı durumlarda standart fallback formatı: `<sourceId>:<lemma>:<index>`
  3. Dinamik veya rastgele kimlik üreticileri (`randomUUID()`, `Date.now()`, `Math.random()`) kullanımı kesinlikle yasaktır.
* **Gerekçe:** Veri kümesinin yeniden yüklenebilirliğini ve farklı ortamlar arasında indeks tutarlılığını sağlamak.
* **Etkilenen Katmanlar:** `Normalizer`, `Repository`, `Service`

---

## ADR-0005 — Translation Group & Semantic Model Strategy

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Faz:** Faz 2 (Translation Platform)
* **Karar:**
  1. Aynı kaynak leksik kökten türeyen birden fazla hedef anlam (örn: `гугъэ` → *hope*, *expectation*, *anticipation*) ayrı `TranslationEntry` kayıtları olarak bölünmez.
  2. Bütün hedef anlamlar tek bir `TranslationGroup` altında toplanır ve aynı `TranslationEntry` içinde dizi (array) veya alt grup olarak temsil edilir.
  3. Çokanlamlılık kapsüllemesi entry düzeyinde kalır, veri şişmesine izin verilmez.
* **Gerekçe:** Anlamsal bütünlüğü korumak ve tersine arama (reverse search) işlemlerini karmaşıklaştırmamak.
* **Etkilenen Katmanlar:** `Service`, `UI`

---

## ADR-0006 — Morphology-Aware Cross Dictionary Matching Strategy

* **Tarih:** 2026-08-31
* **Durum:** Kabul Edildi
* **Faz:** Faz 2 (Translation Platform)
* **Karar:**
  1. **Morfoloji-Duyarlı Eşleştirme Kısıtı:** Çapraz sözlük eşleştirme işlemleri yalnızca morfolojik segmentasyonu yapılmış girdiler üzerinde yürütülür. Ham metin üzerinde doğrudan karakter değişimi (`direct string replacement`) kesinlikle yasaktır.
  2. **Veri Kaynağı ve Kural Kategorizasyonu:** Diyalekt kuralları `circassian_dialect_rules.json` dosyasından yüklenir; `phonological_rules` (yalnızca leksikal köke), `grammatical_rules` (önek ve morfolojik sınırlara) ve `syntactic_rules` (sözcük sonrası gerçekleşmelere) olmak üzere ayrıştırılır.
  3. **Zorunlu İşlem Hattı (Pipeline):** Eşleştirme motoru sırasıyla şu adımları izler: Morfolojik Segmentasyon → Önek Tespiti → Yön/Konum Öneki Tespiti → Kök Yalıtımı → Kök Fonolojik Kuralları → Dilbilgisel/Önek Kuralları → Anlam Eşleştirmesi.
  4. **Eşleştirme Hiyerarşisi:**
     - **Priority 1 (Exact Match):** Morfolojik işlem gerektirmeyen birebir eşleşme.
     - **Priority 2 (Morphology-Aware Dialect Variant Match):** Segmentasyonu yapılmış ve kurallarla doğrulanmış diyalekt varyantı eşleşmesi.
     - **Priority 3 (Translation Match):** Hedef dildeki anlam veya açıklama örtüşmesi.
* **Gerekçe:** Ham metin düzeyinde karakter değiştirmenin yarattığı yanlış pozitif (`false-positive explosion`) patlamasını ve dilbilgisel öneklerin (örn: `фэ-` ↔ `фӀэ-`) fonolojik kök dönüşümleriyle çakışmasını engellemek.
* **Etkilenen Katmanlar:** `Normalizer`, `Matching Engine`, `Service`

---

## ADR-0007 — TranslationRepository Contract

* **Tarih:** 2026-08-31
* **Durum:** Kabul Edildi
* **Faz:** Faz 2 (Translation Platform)
* **Karar:**
  1. Sözlük veri erişim katmanı soyut bir `ITranslationRepository` arayüzü (contract) üzerinden yürütülür.
  2. **Repository Boundary Rules:** Repository katmanı yalnızca saf veri depolama, getirme ve doğrudan alt dize araması (`Storage + Query`) yapar. `TranslationGroup` sentezleme, morfolojik eşleştirme ve diyalekt dönüşüm kuralları Repository katmanına yazılamaz; bu işlemler `Service` katmanında yürütülür.
  3. **Katman Bağımsızlığı:** `TranslationRepository` üst katmanları (`Service`, `UI`, `Hook` vb.) kesinlikle içe aktaramaz (`import` edemez).
* **Gerekçe:** Veri katmanı esnekliğini korumak, katman bağımlılıklarını yalıtmak ve servislerin veri depolama detaylarından bağımsız çalışmasını sağlamak.
* **Etkilenen Katmanlar:** `Repository`, `Service`
User Query
      ↓
QuerySemanticMapper
      ↓
GraphTraversalService
      ↓
KnowledgeRanker
      ↓
ContextClusterer
      ↓
DiscoveryAssembler
      ↓
DiscoveryResultDTO
      ↓
DiscoveryFacade