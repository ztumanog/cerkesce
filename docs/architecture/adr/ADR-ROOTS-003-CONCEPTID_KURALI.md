# ADR-ROOTS-003: conceptId Semantik Hizalama, Legacy Sözleşmesi ve Validator Kilidi (v3)

**Durum:** Kabul edildi ve tamamen uygulandı (v3 — `0` uyuşmazlık validator ile kilitli)
**Tarih:** 2026-11-26
**Kapsam:** `public/data/linguistic/lexemes.json`, `scripts/validate-linguistic.mjs`, `docs/architecture/adr/ADR-ROOTS-003-CONCEPTID_KURALI.md`

---

## Bağlam

`lexemes.json` taramasında `conceptIds` dizisi bulunan **29 legacy kayıtta** `conceptId ≠ conceptIds[0]` uyuşmazlıkları tespit edildi (ilk taramada 8 uyuşmazlık: 6'sı önceki oturumda, kalan son 2 kayıt Baş Mimar kararı ile semantik inceleme sonrasında düzeltildi).

Baş Mimar Kararı ile kör `conceptId = conceptIds[0]` mekaniği **reddedildi**; anlamın `conceptIds[0]` sırasını belirlemesi gerektiğine karar verildi:

| ID | Form (`tr`) | Eski Hatalı Durum | Neden Mekanik Kural Reddedildi? |
|---|---|---|---|
| `L-SHHE` | `щэ` (*yüz*) | `conceptId: KITCHEN`, `conceptIds: ["FAT", "HUNDRED", "THREE_TIMES"]` | Kör kural `conceptId = FAT` üretecekti (*100 sayısı* anlamıyla çelişir) |
| `L-VERIFIED-01561` | `щылэ` (*ipek*) | `conceptId: COMPASSION`, `conceptIds: ["JANUARY", "SILK"]` | Kör kural `conceptId = JANUARY` üretecekti (*ipek* anlamıyla çelişir) |

---

## Karar (v3)

### 1. Öncelik Sırası ve Alan Sözleşmesi

- **Öncelik sırası:** `Anlam` → `conceptIds sırası` → `conceptId` (tersi değil).
- **Kanonik / Legacy Sözleşmesi:**
  - `Lexeme.conceptId` = **Kanonik alan** (`/kavram/[concept]` ve UI bu alanı tüketir)
  - `Lexeme.conceptIds` = **Legacy alan** *(Legacy ≠ Silinecek; mevcut 29 kayıtta korunur)*
  - `WordFamily.conceptIds` = **Legacy alan** *(Legacy ≠ Silinecek)*

### 2. Validator Kuralı ve `0` Baseline Kilidi

> **`IF conceptIds exists` (boş olmayan dizi, yalnızca 29 legacy kayıt) `THEN conceptId === conceptIds[0]`**

- Kural tüm `41.462` kayıt için `conceptIds` zorunluluğu getirmez; yalnızca `conceptIds` alanı dolu olan kayıtları denetler.
- `scripts/validate-linguistic.mjs` dosyasına `conceptId != conceptIds[0] (conceptIds varsa)` kontrolü eklendi ve **`limit <= 0`** olarak kilitlendi.

### 3. Uygulanan Semantik Düzeltmeler

**Önceki 6 kayıt:**
`L-FE` (`SKIN`), `L-K1YH` (`LONG`), `L-DYGHU` (`THIEF`), `L-FO` (`HONEY`), `L-MAF1EGU` (`TRAIN`), `L-GUKHELH` (`HOPE`).

**Son 2 semantik düzeltme (`d854f02`):**

| ID | Form (`tr`) | Önceki (`conceptId` / `conceptIds`) | Yeni (`conceptId` / `conceptIds`) |
|---|---|---|---|
| `L-SHHE` | `щэ` (*yüz*) | `KITCHEN` / `["FAT", "HUNDRED", "THREE_TIMES"]` | **`HUNDRED`** / `["HUNDRED", "FAT", "THREE_TIMES"]` |
| `L-VERIFIED-01561` | `щылэ` (*ipek*) | `COMPASSION` / `["JANUARY", "SILK"]` | **`SILK`** / `["SILK", "JANUARY"]` |

### 4. ROOTS-004 (`conceptIds` Backfill) Hakkında

`/kavram/[concept]` ve UI bileşenleri doğrudan `l.conceptId` üzerinden çalıştığı ve `conceptIds` tüketmediği için `conceptIds` backfill işlemi öncelik kaybetmiş ve dondurulmuştur (`⏸ Ertelendi`).

---

## Uygulama Durumu

| Adım | Durum |
|---|---|
| İlk 6 uyuşmazlık düzeltmesi | ✅ Uygulandı |
| Son 2 semantik hizalama (`L-SHHE`, `L-VERIFIED-01561`) (`d854f02`) | ✅ Uygulandı |
| `scripts/validate-linguistic.mjs` kuralı ve `0` baseline kilidi | ✅ Eklendi (`conceptId != conceptIds[0]`) |
| `npm run validate:data` (`41462 lexeme, 3670 root`) | ✅ `15/15 PASS` (`0` hata) |

---

## Wiki Kalıntısı Ölçüm Metodolojisi (`7` vs `139` vs `420` / `553`)

Önceki raporlardaki `7` ve `139` sayıları arasındaki fark, farklı alanların ve farklı markup desenlerinin taranmasından kaynaklanmaktadır (`lexemes.json`, `41.462` kayıt üzerinde doğrulanmış ölçüm):

| Kapsam / Desen | Kayıt Sayısı | Açıklama ve Örnekler |
|---|---:|---|
| Çeviri alanları: `[[...]]` / `{{...}}` (`translations.ru`, `translations.en`) | **7** | `6` `translations.ru` wikilink (`[[хыхьэн]]`, `[[къэщӀын]`) + `1` `translations.en` `{{...}}` *(ek olarak `8` kayıtta `''` tırnak, `0` HTML etiketi)* |
| `examples` içinde `wikitab` (`{Ӏ cӀass="wikitabӀe"`) / `''` | **139** | Önceki envanterde anılan `139` sayısıdır; `wikitab` ve `''` kümeleri **birebir aynı 139 kayıttan** oluşur |
| `examples` içinde `{{...}}` kaynak şablonları | **420** | `{{автор...}}`, `{{тхыгъэ...}}` benzeri Wikitext kaynak künyeleri (`6` tanesi `139` kümesiyle kesişir) |
| **`examples` toplam benzersiz birleşim** | **553** | `(420 ∪ 139)` — `139` tablo kalıntısı + `420` şablon künyesinin birleşimi (`senses` içinde ayrıca `13` kayıt) |

- **Sonuç:** Wiki kalıntısı temizliği ayrı bir iş paketi olan **ADR-ROOTS-006** kapsamında tek metodoloji altında planlanmalıdır (`tr`/`meaning` çekirdek alanlarında `[[`/`{{`/`<tag>`/URL kalıntısı `0`'dır).

---

## Kapsam Dışı (İlgili ADR'ler)

1. **ADR-ROOTS-004:** `conceptIds` backfill (UI tüketmediği için donduruldu).
2. **ADR-ROOTS-006:** `examples` (`553` kayıt) + `translations.{ru,en}` (`7` wikilink/şablon) + `senses` (`13` kayıt) Wiki kalıntısı temizliği.

---

## İlgili

- `docs/architecture/adr/ADR-ROOTS-001-DANGLING_ROOT_CLEANUP.md`
- `docs/architecture/adr/ADR-ROOTS-002-WF_UYELIK_SEMANTIGI.md`
- `scripts/validate-linguistic.mjs`
- `public/data/linguistic/lexemes.json` (`d854f02`)
