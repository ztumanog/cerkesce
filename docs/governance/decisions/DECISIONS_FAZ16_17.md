# FAZ 16-17 KARARLARI

**Tarih:** 2026-11-05
**Karar veren:** Mimar
**Durum:** Onaylandı

---

## KARAR 1 — 255 Bitki tr Doldurma (Faz 16B)

**Karar:** 255 L-BITKI-* lexeme'inin `translations.tr` alanı doldurulacak.

**Yöntem:**
- Sözlük tarama (26, 27, 28, 29, 31 numaralı Türkçe sözlükler)
- Fuzzy match (Latince OCR hatalarını tolere etmek için)
- Manuel tamamlama (sözlükte bulunmayanlar için Latince → Türkçe)

**Sonuç:** 255 bitki tr'ye yazıldı. Commit: `62b3a45`

**Kanıt:** `git show --stat HEAD` → `lexemes.json | 256 ++--`

---

## KARAR 2 — L-FYN conceptId Düzeltmesi (Faz 16B)

**Karar:** `L-FYN` (фын = çürümek) lexeme'inde `conceptId: "L-FYN"` → `"DECAY"` olarak değiştirilecek.

**Gerekçe:**
- `L-FYN` UPPER_SNAKE değil (tire içeriyor)
- Invariant I9 ihlali
- `DECAY` doğru concept (фын = çürümek fiili)

**Sonuç:** Invariant 0 ihlal. Aynı commit'te (`62b3a45`).

---

## KARAR 3 — Backup/Snapshot .gitignore Düzeni (Faz 17B)

**Karar:** `.backups/` ve `backups/` klasörleri `.gitignore`'a eklenecek.

**Gerekçe:**
- 3.9 GB backup repo'ya girmemeli
- `storage/snapshots/` zaten ignore'da
- `.backups/` ve `backups/` eksikti

**Sonuç:** `.gitignore` güncellendi. Commit: `80be4f4`

---

## KARAR 4 — Faz 17A: Salt Okunur Envanter

**Karar:** Faz 17A'da hiçbir dosya taşınmayacak, silinmeyecek, yeniden üretilmeyecek. Sadece envanter çıkarılacak.

**Gerekçe:**
- `concept_mapping.json`'un varlığı doğrulanmadan işlem yapılamaz
- `ConceptRegistry.ts`'in 8 aktif import'u var
- Üretim zinciri doğrulanmadan migration yapılamaz

**Sonuç:** Envanter tamamlandı. Hiçbir dosya değiştirilmedi.

---

## KARAR 5 — concept_mapping.json Karma Şema (Kritik Bulgu)

**Karar:** `concept_mapping.json` **korunacak**. Üzerine yazılmayacak. Şema değiştirilmeyecek.

**Bulgu:**
- Toplam: 525 kayıt
- String (ULID): 516
- Nesne: 9 (`HAIL`, `HEY_OH`, `PARTICLE_SEQ`, `COMPANION`, `EAR`, `LONG`, `OLD`, `OX`, `THIEF`)

**Risk:**
- `concept_registry_uret.py` karma şemayı işlemiyor
- 9 nesne kaydı için bozuk TypeScript üretir
- Mevcut `concept/ConceptRegistry.ts`'i siler

**Karar:** `concept_registry_uret.py` **çalıştırılmayacak**.



### KARAR 5a — 9 Nesne Kaydının Şeması (Detay)

9 nesne kaydının tam şeması:

| Kavram | id | name | nameTr | category | notes |
|--------|-----|------|--------|----------|-------|
| HAIL | HAIL | Dolu (yağış) | Dolu (yağış) | weather | уэ (dolu) — L-UE için. R-UE-HAIL köküne bağlı. |
| HEY_OH | HEY_OH | Ünlem (vay/ooo) | Ünlem (vay/ooo) | interjection | уэ (ünlem) — L-UE-INTJ için. R-UE-INTJ köküne bağlı. |
| PARTICLE_SEQ | PARTICLE_SEQ | Partikül (ise/derken) | Partikül (ise/derken) | grammar | уэ (partikül) — L-UE-PART için. R-UE-PART köküne bağlı. |
| COMPANION | COMPANION | Yoldaş | Yoldaş | social | — |
| EAR | EAR | Kulak | Kulak | body | — |
| LONG | LONG | Uzun | Uzun | adjective | — |
| OLD | OLD | Eski/Yaşlı | Eski/Yaşlı | adjective | — |
| OX | OX | Öküz | Öküz | animal | — |
| THIEF | THIEF | Hırsız | Hırsız | social | — |

**Kritik:**
- `HAIL`, `HEY_OH`, `PARTICLE_SEQ` → `уэ` (UE) köküne ait, homonym
- `notes` alanı kök bağlantısını gösteriyor ama doğrulanmadı
- `concept_registry_uret.py` bu şemayı işlemiyor

**Karar:** Bu 9 kayıt **korunacak**, şema değiştirilmeyecek.

---

## KARAR 6 — İki ConceptRegistry.ts (Faz 17A Bulgusu)

**Karar:** İki `ConceptRegistry.ts` farklı amaçlar için korunacak.

| Dosya | Durum | Karar |
|-------|-------|-------|
| `src/domain/concept/ConceptRegistry.ts` (32.9 KB) | 8 import | **KORU** |
| `src/domain/linguistic/ConceptRegistry.ts` (226 KB) | `AUTO_GENERATED`, tüketici yok | **KORU** (Faz 17B'de incele) |

**Gerekçe:**
- `concept/` aktif kullanımda
- `linguistic/` tüketicisi görünmedi ama **kullanılmadığı kanıtlanmadı**
- Arşivleme kararı için ek doğrulama gerekli

---

## KARAR 7 — Faz 17B: Salt Okunur Doğrulama (Devam)

**Karar:** Faz 17B'de aşağıdaki işler **salt okunur** olarak yapılacak:

1. `ConceptRegistry.ts` Git evrimi
2. `concept_registry_uret.py` geçmişi
3. 9 nesne kaydının tam şeması
4. 8 import'un ne beklediği
5. `linguistic/ConceptRegistry.ts` tüketici analizi
6. `getConceptDisplayName` varyant haritası

**Kural:** Hiçbir dosya değiştirilmeyecek, taşınmayacak, silinmeyecek.

---

## KARAR 8 — Faz 17 Öncelik Sırası

**Karar:** Faz 17'de öncelik sırası:

| # | İş | Öncelik |
|---|-----|---------|
| 17A | Salt okunur envanter | ✅ Tamamlandı |
| 17B | Bağımlılık haritası + risk analizi | ⏳ Devam |
| 17C | Backup arşivleme (3.9 GB → `_arsiv/`) | ⏳ |
| 17D | `_scripts/` temizliği | ⏳ |
| 17E | Raporları `_raporlar/` altına taşı | ⏳ |
| 17F | `concept_mapping.json` audit (Faz 18) | ⏳ |

**Kural:** Audit ✅ → Karar ✅ → Migration ❌

---

## KARAR 9 — "Önce Audit, Sonra Migration" İlkesi

**Karar:** Tüm veri değişikliklerinde önce audit, sonra karar, en son migration yapılacak.

**Gerekçe:**
- Faz 17A'da `concept_mapping.json`'un karma şeması ancak audit ile ortaya çıktı
- Erken migration veri kaybına yol açabilirdi
- Bu ilke, Faz 16B'de de uygulandı (255 bitki tr önce sözlükten doğrulandı)

**Sonuç:** Bu ilke, tüm Faz 17 ve sonrası için geçerli.

---

## KARAR 10 — Kalan 72 L-AUTO-* Bitki (Faz 17 sonrası)

**Karar:** 72 L-AUTO-* bitki için tr doldurma, Faz 17 sonrasına ertelenecek.

**Gerekçe:**
- Bu bitkiler sözlüklerde var ama anlam boş
- Latince adları var (`en`)
- Viki taraması sonuç vermedi
- Faz 17 (temizlik) öncelikli

**Sonuç:** Faz 18'de ele alınacak.



## KARAR 11 — Faz 17B: Production vs Yerel Farkları (Kritik Bulgu)

**Karar:** Production ile yerel arasındaki farklar **belgelenecek**, düzeltme **Faz 18'e** bırakılacak.

### Bulgular

**A) roots.json — Production vs Yerel:**
- Production: 525 kayıt
- Yerel: 918 kayıt
- Yerelde var, prod'da YOK: **429** 🚨
- Prod'da var, yerelde YOK: **36** 🚨

**B) Kiril Kimlikler:**
- `roots.id`: 1 Kiril (`R-ALTEС`)
- `wf.lexemeIds`: **2522 Kiril** (`CEFR-AILE-АДЭ` gibi)

**C) Referans Bütünlüğü:**
- `wf.rootIds → roots.id`: **291 yetim** 🚨
- `roots.wordFamily.id → wf.id`: **31 yetim**
- `lexemes.rootIds → roots.id`: 0 yetim ✅
- `lexemes.wordFamilyId → wf.id`: 0 yetim ✅

**D) wf.lexemeIds Ön Ek:**
- `L`: 11236
- `KAV`: **2340** 🚨
- Diğer: HUV6 (60), HUV2 (33), CEFR (23), HUV3 (20), LEX (8)

**E) lexemes.json Alan Doluluk:**
- `conceptId`: %25 (7249/28410)
- `wordFamilyId`: %51
- `rootIds`: %55
- Diğer alanlar %90+

### Risk

| # | Bulgu | Risk |
|---|-------|------|
| 1 | Production'da 429 kök eksik | 🔴 Yüksek (deploy eksik) |
| 2 | `wf.rootIds`'te 291 yetim | 🔴 Yüksek (bozuk referans) |
| 3 | `KAV-` ön eki 2340 kez | 🟡 Orta (kavram ID'leri) |
| 4 | `wf.lexemeIds`'te 2522 Kiril | 🟡 Orta (CEFR verisi) |
| 5 | Production'da 36 fazla kök | 🟡 Orta (versiyon farkı) |

### Karar

- Bu bulgular **belgelendi**, düzeltme **Faz 18'e** bırakıldı.
- `roots.json` production'a **deploy edilmeli** (429 eksik kök).
- `wf.rootIds` yetimleri **temizlenmeli** (291 yetim).
- `KAV-` ön ekli ID'ler **araştırılmalı** (2340 kayıt).
- Kiril ID'ler **normalize edilmeli** (2522 + 1).

**Hiçbir dosya değiştirilmedi. Salt okunur doğrulama.**

---



## KARAR 12 — Faz 17B: Adım 3 Sonuçları (Kritik Veri Bütünlüğü)

**Karar:** Adım 3 bulguları belgelendi, düzeltme Faz 18'e bırakıldı. Salt okunur doğrulama tamamlandı.

### Bulgular

**1) Deploy Kaynağı Belirsiz:**
- Production: 525 kök
- Yerel: 918 kök
- `.backups/reset-sonrasi`: 835 kök
- **Hiçbiri production ile birebir eşleşmiyor**

**2) 291 Yetim Kök:**
- `wf.rootIds → roots.id`: 291 yetim
- Hiçbir dosyada (production, yerel, .backups) bulunamadı
- Örnek: `R-ABE`, `R-ABKHAZ`, `R-ACTION`, `R-AKT`

**3) KAV-* Kavram Sızıntısı:**
- Toplam 12.672 `KAV-*` ID
- Örnek: `KAV--И` (form='-и', meaning='as well')
- **Kavram ID'leri lexeme ID'si olarak kullanılmış**

**4) Kiril ID'ler:**
- 13.329 lexeme Kiril ID taşıyor (%47)
- Örnek: `CEFR-AILE-АДЭ`, `CEFR-DOGA-ВАГЪУЭ`
- URL slug ve alfabetik sıralama için sorun

**5) Karşılıklılık Bozuk:**
- 85 lexeme iki farklı aile gösteriyor
- 967 lexeme aile gösteriyor, aile listelemiyor
- Örnek: `WF-TKHA` → `L-CORPUS-03966` → `WF-TKHEMPE`

**6) R-ALTEC Homoglyph:**
- `R-ALTEC` (Latin C): 1 lexeme ref
- `R-ALTEС` (Kiril С): 0 ref
- İkisi de `faz15b_migration`'dan

**7) `rootIds` Tekrarı:**
- `CEFR-AILE-АДЭ`: `rootIds=['R-1E', 'R-1E']` (aynı kök iki kez)

### Risk

| # | Bulgu | Risk |
|---|-------|------|
| 1 | Production 525, deploy kaynağı belirsiz | 🔴 Yüksek |
| 2 | 291 yetim kök | 🔴 Yüksek |
| 3 | 12.672 KAV-* sızıntısı | 🔴 Yüksek |
| 4 | 13.329 Kiril ID (%47) | 🔴 Yüksek |
| 5 | 85 çift aile + 967 eksik listeleme | 🟡 Orta |
| 6 | R-ALTEC homoglyph | 🟢 Düşük |

### Karar

- **Veri bütünlüğü bozuk.** Faz 18'de temizlik gerekli.
- **Migration onaylanmadı.** Önce bu sorunlar çözülmeli.
- **Arama-öncelikli UI** kurulabilir (form %100, meaning %97, translations %99).
- **Aile/kök gezinmesi** güvenilmez (%51/%55, 291 yetim).
- **Dialect Convert** verinin %45'i var — ana ekran yapılamaz.

### Kapsama (UI İçin)

| Alan | DOLU | UI Kullanımı |
|------|------|--------------|
| form | %100 | ✅ Arama |
| translations | %99 | ✅ Arama |
| meaning | %97 | ✅ Arama |
| ipa | %98 | ✅ Detay |
| partOfSpeech | %94 | ✅ Detay |
| examples | %53 | 🟡 Detay (koşullu) |
| rootIds | %55 | 🟡 Detay (koşullu) |
| wordFamilyId | %51 | 🟡 Detay (koşullu) |
| dialectVariants | %45 | 🟡 Detay (koşullu) |

**Sonuç:** Arama-öncelikli sözlük + detay sayfasında koşullu bölümler.

---



## KARAR 13 — Faz 17B: Adım 4 Sonuçları (Kapsama Yanılgısı)

**Karar:** Önceki "kapsama iyi" değerlendirmesi **çürütüldü**. Gerçek doluluk çok daha düşük. Düzeltme Faz 18'e bırakıldı.

### Bulgular

**A) partOfSpeech — %80 "noun" Sahte:**
- `noun`: 22.837 (%80)
- `verb`: 3.120 (%10)
- `adjective`: **76** (%0) 🚨
- `None`: 1.385 (%4)
- KAV-* kayıtlarının %99'u "noun"

**B) Placeholder Bombası:**
- `wordFamilyId == 'WF-A'`: 184
- `rootIds` içinde `'R-1E'`: 1.446
- `rootIds` TAM OLARAK `['R-1E','R-1E']`: **1.409** 🚨
- `rootIds` listesi kendi içinde tekrarlı: 3.102

**C) word_families Kimlik Hijyeni:**
- Tire/altçizgi ile biten wf.id: 23
- Placeholder adlı: 3 (`WF-UNCLEAR` gibi)
- Çok kısa wf.id (≤6): 397
- lexemeIds'i boş aile: 41/1041
- `primaryMeaning='?'` veya boş kök: **437/918** (%48) 🚨
- Bu köklere yönelen lexeme ref: 2.729

**D) Ön Ek Bazında Gerçek Doluluk:**
| Ön Ek | n | rootIds | wfId | dialectVar | derivation | conceptId |
|-------|---|---------|------|------------|------------|-----------|
| L | 15113 | 79% | 80% | 82% | 69% | 40% |
| KAV | 12672 | **28%** | **18%** | **0%** | **0%** | **4%** 🚨 |
| HUV6 | 351 | 34% | 17% | 82% | 0% | 100% |

**E) translations Dil Bazında:**
- tr: 28.103 (%98)
- ru: 24.252 (%85)
- en: 23.225 (%81)
- ar: 7.032 (%24)
- **trVerified: 510 (%1)** 🚨

**F) Arama İçin:**
- Çoğul form: 477 (982 kayıt)
- **meaning TAMAMEN BÜYÜK HARF: 6.696 (%23)** 🚨

### Risk

| # | Bulgu | Risk |
|---|-------|------|
| 1 | POS %80 "noun" | 🔴 Yüksek |
| 2 | 1.409 kayıtta `rootIds=['R-1E','R-1E']` | 🔴 Yüksek |
| 3 | 437/918 kök `primaryMeaning='?'` | 🔴 Yüksek |
| 4 | KAV-* 12.672 kayıt, %99 noun | 🔴 Yüksek |
| 5 | 6.696 kayıtta meaning büyük harf | 🟡 Orta |
| 6 | trVerified sadece 510 (%1) | 🟡 Orta |
| 7 | 3.102 kayıtta rootIds tekrarlı | 🟡 Orta |
| 8 | 397 çok kısa wf.id | 🟡 Orta |

### Karar

- **Kapsama yanılgısı çürütüldü.** Önceki "form %100, meaning %97" ifadesi **anahtar varlığı** idi, **gerçek doluluk** değil.
- **Gerçek doluluk:** form %100 ✅, POS %80 sahte 🚨, conceptId %25, dialectVariants %45.
- **KAV-* 12.672 kayıt** gerçek lexeme değil (rootIds %28, wfId %18, conceptId %4).
- **trVerified sadece 510** (%1) — çeviri güvenilirliği düşük.
- **Faz 18'de veri temizliği zorunlu.**

### UI Kararı

- **Arama hâlâ güvenli** (form %100, meaning %97, translations %99).
- **POS filtreleri güvenilmez** (%80 noun).
- **Kök/aile gezinmesi güvenilmez** (437 boş kök, 291 yetim).
- **Dialect Convert verinin %45'i var** — koşullu bölüm.
- **trVerified %1** — "doğrulanmış" rozeti dikkatli kullanılmalı.

---



## KARAR 14 — Düzeltme — Alan Doluluk Oranları ve Deploy Uyarısı

**Düzeltme tarihi:** 2026-11-05
**Düzeltilen:** KARAR 12'deki iki hata

### Hata 1 — "Diğer alanlar %90+" yanlış

**Yanlış:** "conceptId %25, wordFamilyId %51, rootIds %55, diğer alanlar %90+"

**Doğru:** Adım 4'te ölçüldü:
- `partOfSpeech`: %80 "noun" (sahte)
- `meaning`: %97 (ama 6.696 kayıtta büyük harf)
- `translations.tr`: %98 (ama trVerified %1)
- `ipa`: %98
- `dialectVariants`: %45

### Hata 2 — "roots.json production'a deploy edilmeli" yanlış

**Yanlış:** "429 eksik kök var, deploy edilmeli"

**Doğru:**
| | Kayıt | Boyut | Bayt/kayıt |
|---|---:|---:|---:|
| `roots.json` (HEAD) | 918 | 675.513 B | 736 |
| `roots.yedek-20261025-012613.json` | 525 | 700.276 B | **1.334** |

**Daha az kayıt, daha büyük dosya.** Production'daki kökler kayıt başına 1.8 kat daha zengin. Deploy öncesi karşılaştırma gerekli.

**Düzeltilmiş karar:** Production deploy **ertelendi**. Önce `roots.yedek-20261025-012613.json` ile HEAD karşılaştırılmalı, hangisi alan bazında zengin, sonra karar.

---

## KARAR 15 — Latin Arama Faz 1 Dışı (Faz 2'ye Ertelendi)

**Karar:** Latin arama (`translit.ts`) Faz 1 dışında bırakılacak, Faz 2'ye ertelenecek.

**Gerekçe:**
- `form` alanı %100 Kiril
- Latin biçim veride yok
- Tek yetkili Kiril↔Latin fonksiyonu henüz üretilmedi
- Faz 1'de Kiril arama ile başlanabilir

**Faz 1 kapsamı:**
- Sunucu tarafı API (`/api/search`)
- Kiril `form` üzerinden arama
- Koşullu detay sayfası (değeri olan alanlar)
- POS rozeti YOK
- Kaynak alanı YOK
- Lehçe dönüştürücü YOK

**Faz 2 kapsamı:**
- `src/domain/translit.ts` — Kiril↔Latin tablosu
- Latin arama endeksi
- Dialect Convert ekranı

**Not:** `concept_registry_audit.json` otorite olarak kullanılmaz (uniqueLexemeConcepts=1 anomalisi). Bugünkü ölçüm: 2.594 tekil conceptId, 525 registry, %86 eksik.

---



## KARAR 16 — WF-F Ailesi Anlam Bazlı Değil, Ses Bazlı (Kritik Bulgu)

**Karar:** `WF-F` ailesi **bozuk** olarak işaretlenecek. Anlam bazlı değil, sadece "f" sesiyle başlayan kelimeleri toplamış.

### Bulgular

`WF-F` ailesi (R-F kökü):
- Toplam: 140 kayıt
- `conceptId` dolu: 23 (%16)
- `conceptId` boş: 117 (%84)

### 23 ConceptId — 18 Farklı Kavram

| ConceptId | Sayı | Yorum |
|-----------|------|-------|
| WOMAN | 3 | ❌ Alakasız |
| AGRICULTURE | 2 | ❌ |
| MARITAL_STATUS | 2 | ❌ |
| ANIMAL | 2 | ❌ |
| **DECAY** | **1** | ✅ **L-FYN doğru** |
| HORSE | 1 | ❌ |
| BEVERAGE | 1 | ❌ |
| KIYAFET | 1 | ❌ |
| ICKI_ALISKANLIGI | 1 | ❌ |
| MARRIAGE | 1 | ❌ |
| ACTION | 1 | ❌ |
| ANTONYM | 1 | ❌ |
| PROFESSION | 1 | ❌ |
| GOODNESS | 1 | ❌ |
| MILL | 1 | ❌ |
| UNKNOWN | 1 | ❌ |
| FAMILY | 1 | ❌ |
| RELATION | 1 | ❌ |

### Kanıt — Sözlükten

Çıktıda `фызыншэ` (karısı olmayan), `фызабэ` (dul kadın), `фызышэ` (düğün), `фадафэ` (içkici) gibi kelimeler var. Ama `фын` (L-FYN) sözlükte **yok** çünkü fiil.

### L-FYN İçin Kanıt

`KAV-ФЫНЫГЪЭ` (фыныгъэ) = **"decay"** — aynı kökten türemiş isim, "çürüme" anlamında. `L-FYN` → `DECAY` doğru.

### Risk

| # | Bulgu | Risk |
|---|-------|------|
| 1 | WF-F 140 kayıt, sadece 23 conceptId | 🔴 Yüksek |
| 2 | 23 conceptId, 18 farklı kavram | 🔴 Yüksek |
| 3 | R-F kökü ses bazlı, anlam bazlı değil | 🔴 Yüksek |
| 4 | 117 kayıt conceptId boş | 🟡 Orta |
| 5 | DECAY sadece 1 kayıtta (L-FYN) | ✅ Doğru |

### Karar

- `WF-F` ailesi **bozuk** olarak işaretlendi.
- `L-FYN` → `DECAY` **doğru** (KARAR 2 uyumlu).
- Diğer 22 conceptId **gözden geçirilmeli** (Faz 18'de).
- `R-F` kökü **anlam bazlı yeniden düzenlenmeli** (Faz 18'de).

---



## KARAR 18 — Ailesiz Kökler İki Farklı Grup (Kritik Bulgu)

**Karar:** 435 ailesiz kökün 258'i anlamlı ama ailesiz, 177'si anlamsız ve Latin harfli.

### Bulgular

| Grup | Sayı | Örnek | Sorun |
|------|------|-------|-------|
| primaryMeaning DOLU + ailesiz | **258** | `R-PASE` (erken), `R-ZY` (bir) | Aile eksik |
| primaryMeaning BOŞ + ailesiz | **177** | `R-1URY`, `R-AKHMAQ` | Latin harf + anlam yok |

### Grup 1 — Anlamlı Ama Ailesiz (258)

Örnekler:
- `R-PASE` (пасэ) = "erken, sabah erken, evvel, önce"
- `R-ZY` (зы) = "bir (sayı)"
- `R-UDZ` (удз) = "ot, çimen"
- `R-UZ` (уз) = "ağrı, hastalık, maraz"
- `R-GHE` (гъэ) = "yıl, yaz, sıcak mevsim"

**Bu kökler gerçek, anlamlı, ama aile tanımlanmamış.**

### Grup 2 — Anlamsız + Latin Harfli (177)

Örnekler:
- `R-1URY` (form: `1ury`) — Latin harf
- `R-1USHE` (form: `1ushe`) — Latin harf
- `R-AKHMAQ` (form: `akhmaq`) — Latin harf
- `R-AKMY` (form: `akmy`) — Latin harf
- `R-AKYL` (form: `akyl`) — Latin harf

**Bu kökler Latin harfli, primaryMeaning boş. Muhtemelen `latin-orphan-2026-10-12` kaynaklı.**

### Risk

| # | Bulgu | Risk |
|---|-------|------|
| 1 | 258 anlamlı kök ailesiz | 🔴 Yüksek |
| 2 | 177 Latin harfli kök ailesiz + anlamsız | 🔴 Yüksek |
| 3 | İki grup farklı müdahale gerektiriyor | 🟡 Orta |

### Karar

- **Grup 1 (258):** Aile tanımlanmalı (Faz 18'de).
- **Grup 2 (177):** Latin harfli, anlamsız — **silinmeli veya dönüştürülmeli** (Faz 18'de).
- Bu iki grup **ayrı ayrı** ele alınmalı.

---

---

**Karar Tarihi:** 2026-11-05
**Onay:** Mimar
**Sonraki Karar:** Faz 17B tamamlandığında

### KARAR 15 (TASLAK - Henüz Uygulanmayacak)

Tarih: 08.11.2026
Konu: MVP-2 Latin Arama - Coklu Yazimi Kabul Et

Latin arama icin Coklu yazimi kabul et yaklasimi benimsenebilir.

Ornek:
- s = sh = s
- ch = ch = c
- palochka = kesme = 1 = I
- g = gh, g

Ancak henuz uygulanmayacak.
Once test tablosu olusturulacak.
Ozellikle g, k, k, hy, h, i, palochka dugumlerindeki cakismalar netlestirilecek.

Test tablosu hazirlanmadan kod yazilmayacak.
Yeni route acilmayacak.
Mevcut 4 scriptten biri dogrudan uretime alinmayacak.

Durum: Taslak, test tablosu bekliyor.
### 7. PALOCHKA - KARAR VERILDI

Kabul: kesme, 1, I, i
Red: l
Kural: En uzun once.
Durum: Mimar onayli.
### 6. G - KARAR VERILDI
Kabul: gh, g harfi, g kesme
Kural: En uzun once. ghu once, sonra gh.
Durum: Mimar onayli.

### 5. K - KARAR VERILDI
Kabul: q, kh, k harfi
Not: kh cakismasi var, h ile test edilecek.
Durum: Mimar onayli.

### 3. HY - KARAR VERILDI
Kabul: hy, h kesme
Kural: En uzun once. hy once yakalanacak.
Durum: Mimar onayli.

### 2. H - KARAR VERILDI
Kabul: h, xh, x
Not: h tek basina h, hy ile karistirilmeyecek.
Durum: Mimar onayli.

### 1. I - KARAR VERILDI
Kabul: i harfi, y
Not: y hem i hem y olabilir, test ile netlesecek.
Durum: Mimar onayli.


## KARAR 15 - UYGULANDI (2026-11-08)
- Uygulama: src/lib/latinNormalize.ts
- Baglanti: app/api/search/route.ts - q = normalizePalochka(normalizeLatinToKiril(rawQ))
- Yeni route yok. Mevcut /api/search korundu.
- Testler gecti:
    - gu -> гу (kalp, gonul)
    - ghu -> гъу
    - psi -> псы (psı ile)
    - sh -> ш
- Not: kucuk i -> и olarak uygulandi. Buyuk I / ' / 1 -> palochka.
  Sebep: kucuk i palochka olursa tum i'li kelimeler bozuluyor.
- Durum: MVP-2 cekirdek tamam.


## KARAR 15 - PALOCHKA KESIN KARAR (2026-11-08)
- Mimar onceligi: Palochka kapanmadan Dialect Filter baslamaz.
- Sebep: Palochka arama motorunun kalbi, Dialect Filter sadece filtre.
- Karar:
    - ' -> I (palochka) KABUL
    - 1 -> I (palochka) KABUL
    - I (buyuk I) -> I (palochka) KABUL
    - i (kucuk i) -> и RED (palochka degil)
- Gerekce: kucuk i palochka olursa ki -> k + palochka olur, ama kullanici ki (ки) demek istemis olabilir. Tum i'li kelimeler bozulur.
- Test:
    - k'u -> кӀу
    - k1u -> кӀу
    - kIu -> кӀу
    - ki -> ки (palochka degil)
- Durum: Palochka kapatildi. Siradaki: гъ / къ kararlari.


## KARAR 15 - GH KESIN KARAR (2026-11-08)
- Karar:
    - gh -> гъ KABUL
    - g (Turkce) -> гъ KABUL
    - g' -> гъ KABUL
- Kural: ghu once yakalanir, sonra gh. Yoksa ghu bozulur.
- Test:
    - ghu -> гъу
    - gh -> гъ
    - gu -> гу (karismaz)
- Durum: GH kapatildi. Siradaki: къ karari.


## KARAR 15 - Q / KH KESIN KARAR (2026-11-08)
- Karar:
    - q -> къ KABUL
    - kh -> къ KABUL
    - k -> к (къ DEGIL)
- Duzeltme: Eski notta k -> къ yaziyordu, yanlis. k tek basina к olur.
- Kural: khu once yakalanir, sonra kh.
- Test:
    - q -> къ
    - khu -> къу
    - ku -> ку (karismaz)
- Durum: къ kapatildi. Siradaki: кӀ / хь / хъ / ы toplu kapanis.


## KARAR 15 - TOPLU KAPANIS (2026-11-08)
### 4. кӀ
- k' -> кӀ KABUL
- k1 -> кӀ KABUL
- kI -> кӀ KABUL
- Test: k'u -> кӀу

### 5. хь
- hy -> хь KABUL
- h' -> хь KABUL
- Kural: hy once, sonra h
- Test: hy -> хь

### 6. хъ
- xh -> хъ KABUL
- x -> хъ KABUL
- h -> х (хъ DEGIL)
- Test: xh -> хъ, h -> х

### 7. ы
- ı -> ы KABUL
- y -> й (ы DEGIL)
- Gerekce: y hem ы hem й olursa bozulur. psı zaten ı ile calisiyor.
- Test: psı -> псы, y -> й

- Durum: Test tablosu kapatildi. KARAR 15 kesinlesmeye hazir.


## KARAR 15 - UYGULANDI ve ilk surumu basariyla dogrulandi (2026-11-08)
- Palochka, GH, Q/KH, Toplu Kapanis tamamlandi.
- Kod: src/lib/latinNormalize.ts - Buyuk I palochka duzeltmesi dahil.
- Testler gecti:
    - kIu -> кӀу
    - k'u -> кӀу
    - k1u -> кӀу
    - ki -> ки (palochka degil)
    - gu -> гу, ghu -> гъу, psı -> псы, sh -> ш
- Durum: KARAR 15 UYGULANDI ve ilk surumu basariyla dogrulandi. Mutlak son soz degil, kullanici verisi geldikce gozden gecirilebilir.
- Siradaki: MVP-2 snapshot guncelleme, sonra Dialect Filter (MVP-2 sonrasi).


## KARAR 15 - MIMAR ONAYI (2026-11-08)
- KARAR 15 uygulanmis, dogrulanmis ve urun hattina alinmistir.
- Latin arama mevcut /api/search akisina entegre edilmistir.
- Yeni route veya paralel arama sistemi olusturulmadi.
- MVP-2 tamamlanmis kabul edilir.
- Sonraki oncelik Dialect Filter degil, once urun kullanimimin gozlemlenmesi ve MVP-2'nin kararli calistiginin dogrulanmasidir.
- Mimari hat: Kullanici -> /api/search -> normalize -> arama -> sonuc -> detay (tek hat)


## KARAR 15 - MIMAR SON ONAYI / GOZLEM FAZI (2026-11-08)
- MVP-2 kapanmis kabul edildi.
- Kanit: Kullanici beyani + testler.
- Kritik karar onaylandi: i != Ӏ, k -> к (къ degil).
- Mimari kazanim: Yeni route acilmadi, tek hat korundu.
- Gozlem karari onaylandi: cerkesce-latin-sayac / cerkesce-kiril-sayac
- Izlenecekler: Latin sorgu orani, en cok kullanilan Latin varyantlar, basarisiz aramalar, tam eslesme orani, Dialect Filter ihtiyaci.
- Dialect Filter: Beklemeli. Once Latin arama gozlemlenecek.
- Durum: MVP-1 OK, MVP-1.1 OK, MVP-2 OK, Gozlem BASLADI, Dialect BEKLIYOR, Morphology BEKLIYOR, Discovery BEKLIYOR.


## KARAR 15 - EK: j -> ж (2026-11-10)
- Gozlemden bulundu: bje -> бjе oluyordu, 0 sonuc.
- Karar: j -> ж KABUL (Turkce j = ж)
- Test: bje -> бжэ (kapi) - 21 sonuc, gecti.
