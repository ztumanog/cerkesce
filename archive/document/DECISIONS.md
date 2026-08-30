# Architectural Decision Records (ADR)

## ADR-0001 — Parallel Loading of Base Dictionaries

* **Tarih:** 2026-08-28
* **Durum:** Kabul Edildi
* **Karar:** İlk sistem başlatılmasında 3 temel sözlük paralel olarak yüklenir.
* **Gerekçe:** İlk etkileşim süresini (Time to Interactive - TTI) minimize etmek.
* **Etkilenen Katmanlar:** `Loader`, `Service`

---

## ADR-0002 — Batch Loading Strategy for Secondary Data

* **Tarih:** 2026-08-28
* **Durum:** Kabul Edildi
* **Karar:** Sonraki veri yüklemeleri 4'erli paketler (batch) halinde işlenir.
* **Gerekçe:** 204 MB boyutundaki veri kümesinde bellek kullanımını (RAM footprint) dengede tutmak.
* **Etkilenen Katmanlar:** `Loader`

---

## ADR-0003 — Mandatory Phase Locking

* **Tarih:** 2026-08-28
* **Durum:** Kabul Edildi
* **Karar:** Katmanlar arası bağımlılıklarda Faz Kilidi (Phase Lock) uygulanması zorunludur. Faz gereksinimleri tamamlanmadan sonraki aşamaya geçilemez.
* **Gerekçe:** Mimari tutarsızlığı ve teknik borç oluşumunu engellemek.
* **Etkilenen Katmanlar:** Tüm Sistem

---

## ADR-0004 — TranslationEntry Canonical Identity Rule

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Karar:**
  1. Kayıt kimlikleri (ID) strictly deterministik üretilir: `<sourceId>:<sourceEntryId>`
  2. Kaynak ID bulunmadığı durumlarda standart fallback formatı: `<sourceId>:<lemma>:<index>`
  3. Dinamik veya rastgele kimlik üreticileri (`randomUUID()`, `Date.now()`, `Math.random()`) kullanımı kesinlikle yasaktır.
* **Gerekçe:** Veri kümesinin yeniden yüklenebilirliğini ve farklı ortamlar arasında indeks tutarlılığını sağlamak.
* **Etkilenen Katmanlar:** `TranslationRepository`, `TranslationTable`

---

## ADR-0005 — Translation Group & Semantic Model Strategy

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Karar:**
  1. Aynı kaynak leksik kökten türeyen birden fazla hedef anlam (örn: `гугъэ` → *hope*, *expectation*, *anticipation*) ayrı `TranslationEntry` kayıtları olarak bölünmez.
  2. Bütün hedef anlamlar tek bir `TranslationGroup` altında toplanır ve aynı `TranslationEntry` içinde dizi (array) veya alt grup olarak temsil edilir.
  3. Çokanlamlılık kapsüllemesi entry düzeyinde kalır, veri şişmesine izin verilmez.
* **Gerekçe:** Anlamsal bütünlüğü korumak ve tersine arama (reverse search) işlemlerini karmaşıklaştırmamak.
* **Etkilenen Katmanlar:** `TranslationModel`, `LexicalEngine`

---

## ADR-0006 — Search & Priority Matching Rules

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Karar:** Arama motoru sorgu yanıtlarını sıralarken aşağıdaki 3 aşamalı öncelik sırasını zorunlu olarak uygular:
  - **Priority 1 (Exact Match):** Birebir leksik veya lemma eşleşmesi.
  - **Priority 2 (Orthographic Variant Match):** Diyalektik veya fonetik varyasyon eşleşmesi (örn: `ш` ↔ `щ` ses değişimleri).
  - **Priority 3 (Translation & Gloss Match):** Hedef dildeki anlam veya açıklama metinleri içerisindeki eşleşme.
* **Gerekçe:** Kullanıcılara en doğru dilbilimsel sonucu en üst sırada sunmak.
* **Etkilenen Katmanlar:** `SearchEngine`, `ReverseTranslationSearch`
# Architectural Decision Records (ADR)

| ID | Başlık | Durum | Faz | Etkilenen Katmanlar |
| :--- | :--- | :--- | :--- | :--- |
| **ADR-0001** | Parallel Loading of Base Dictionaries | Kabul Edildi | Faz 1 | Loader, Service |
| **ADR-0002** | Batch Loading Strategy for Secondary Data | Kabul Edildi | Faz 1 | Loader |
| **ADR-0003** | Mandatory Phase Locking | Kabul Edildi | Faz 1 | Tüm Sistem |
| **ADR-0004** | TranslationEntry Canonical Identity | Kabul Edildi | Faz 2 | Normalizer, Repository, Service |
| **ADR-0005** | TranslationGroup Strategy | Kabul Edildi | Faz 2 | Service, UI |
| **ADR-0006** | Cross Dictionary Matching | Kabul Edildi | Faz 2 | Normalizer, Service |
| **ADR-0007** | TranslationRepository Contract | Kabul Edildi | Faz 2 | Repository, Service |