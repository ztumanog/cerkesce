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



## KARAR 12 — Faz 17B: Production vs Yerel Farkları (Kritik Bulgu)

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

---

**Karar Tarihi:** 2026-11-05
**Onay:** Mimar
**Sonraki Karar:** Faz 17B tamamlandığında
