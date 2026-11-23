# curationValidate Modül Audit Raporu

**Görev:** P2 — curationValidate Audit
**Tarih:** 2026-11-23
**Denetlenen dosya:** `src/lib/curationValidate.ts`
**Referans commit'ler:** `9597a0c` (oluşturma), `8f6f7cc` (bağlanma), `ba855b7` (takip düzeltmesi)

---

## 1. Özet — Modül Ne Yapıyor?

`src/lib/curationValidate.ts`, KARAR-16 kürasyon kurallarının **tek otoritesi**dir. Hem istemci
(`app/admin/curation/single/page.tsx`) hem sunucu (`app/api/curation/bulk/route.ts`) aynı modülü
kullanır; inline regex tekrarları yazılmaz.

**Dışa açılan API (2 fonksiyon):**

| Fonksiyon | İşlev |
|---|---|
| `validateCuration(input): CurationIssue[]` | Kural ihlallerini döndürür (field, message, severity) |
| `isCurationValid(input): boolean` | error yoksa `true` (şu an hiçbir çağrı noktasında kullanılmıyor) |

**Kurallar (yalnızca girişte belirtilen alanlar denetlenir — `undefined` alan kural tetiklemez):**

| Alan | Kural | Severity |
|---|---|---|
| `root` | boş olamaz | error |
| `family` | boş olamaz | error |
| `concept` | boş olamaz | error |
| `tr` | kelime ortasında `?` yasak (`a?g?z` → hata; sondaki `Ne?`/`Kim?` serbest) | error |
| `literalMeaning` | `<<...>>` çapraz referanslar yok sayılır; kalan metinde gerçek/yarım HTML yasak | error |
| `notes` | literalMeaning ile aynı HTML kuralı | error |
| `conceptId` | boş olamaz; `allowedConcepts` verildiyse türetilmiş listede olmalı | error |

### 1.1 `validateCurationPatch` adapter'ı

**Böyle bir fonksiyon yok.** Talepte geçen isim modülde mevcut değil. Adapter rolünü
**çağrı noktaları** üstleniyor:

- **Sunucu** (`app/api/curation/bulk/route.ts:36-46`): patch'te yazılan alanı, yazılmayanları
  mevcut kayıttan alarak bir **`merged` nesnesi** kurar ve `validateCuration(merged)` çağırır.
  Denetlenen alanlar: `tr` (`patch.tr` **veya** `patch.translations.tr` üzerinden),
  `literalMeaning`, `notes`, `conceptId` (+ `allowedConcepts` mevcut kayıtlardan türetilir).
  `root` / `family` / `concept` gönderilmez → bu üç kural bulk route'ta fiilen devre dışıdır.
- **İstemci** (`app/admin/curation/single/page.tsx:196-202`): kaydet öncesi `tr`, `literalMeaning`,
  `notes`, `conceptId` (+ `allowedConcepts`) gönderir.

### 1.2 Severity tasarımı (error vs warning)

Tip `severity: "error" | "warning"` izin veriyor, ancak **modüldeki 7 kuralın hepsi `error`
basıyor; hiçbir kural `warning` üretmiyor.** "Uyarı" kavramı çağrı noktasında üretiliyor:
bulk route, ihlalin **yazılan alanda mı yoksa kayıttaki eski kirli değerde mi** olduğuna bakar
(route.ts:50-58) — yazılmayan alandaki ihlal response'ta `warnings` listesine düşer, bloklamaz.

**Değerlendirme:** İşlevsel olarak doğru ve savunulabilir bir sorumluluk ayrımı (modül kural
ihlalini raporlar; bloklama politikası bağlama kararlıdır, çünkü "eski kirli değerde bloklama"
toplu güncellemeyi kilitleyebilir). Ancak `warning` severity'si modül içinde ölü ağırlıktır —
ya ileride gerçekten kural bazlı warning eklenmeli, ya da tip `severity: "error"` olarak
daraltılıp çağrı noktasındaki ayrım korunmalıdır. `isCurationValid` de şu an hiçbir yerde
kullanılmıyor (kullanılmayan export — bkz. Bölüm 5 CI önerisi kapsamı).

---

## 2. Zaman Çizelgesi

| Tarih | Commit | Olay |
|---|---|---|
| 2026-11-14 | KARAR-16 | Kürasyonun lexemes.json'a doğrudan yazım kararı |
| **2026-11-15 22:20** | `9597a0c` | Modül oluşturuldu (56 satır, **tek dosya**). Hiçbir import eklenmedi. Commit mesajı: "ortak curationValidate dogrulama modulu" — **"ortak" olduğu şey yoktu** |
| 2026-11-15 → 11-23 | (8 gün) | Modül ölü. Bu arada curation üzerine ~10 commit yapıldı (`4af2783`, `cec1918`, `fa63a3e`, `2ea6d56`, `e34723a`, `b9ae692`, `04e1fa3`, `29bc07e`…). Bulk route **inline doğrulama** taşıdı: MID_WORD_Q regex'inin 2. yazımı + `literalMeaning.includes("<")` şeklinde zayıf HTML kuralı. **`notes` alanı hiç denetlenmiyordu; merged değer yerine yalnızca patch değeri denetleniyordu** |
| **2026-11-23 04:59** | `8f6f7cc` | Gerçek bağlanma: single sayfası (istemci) + bulk route (sunucu). KARAR-16 `conceptId`/`allowedConcepts` kuralı eklendi (40.841 kayıtta 0 boş conceptId doğrulandı). `undefined` denetlenmez semantiği getirildi (partial patch uyumu). Inline doğrulama kaldırıldı |
| 2026-11-23 05:52 | `ba855b7` | Takip düzeltmesi (AUDIT-01): yan etkiler (aile/kök senkronu) yalnızca başarılı kayıtlar için; `src/tests/curation/bulk-route.test.ts` (140 satır) eklendi |

---

## 3. Kök Neden — Neden 15 Kasım'dan 23 Kasım'a Kadar Ölü Kaldı?

1. **Bağlanma adımı ayrı bırakıldı.** `9597a0c` tek dosyalık bir commit'ti. "Modül eklendi" ile
   "modül kullanılıyor" aynı commit'te değildi; bağlanma için ayrı bir iş gerekiyordu ve o iş
   backlog'a hiç girmedi.
2. **API uyumsuzluğu — olduğu gibi takılamazdı.** İlk versiyon `root`/`family`/`concept`
   alanlarını **koşulsuz zorunlu** tutuyordu (`validateCuration({})` bile hata basardı). Tüketici
   ise kısmi patch API'siydi (`tr`, `literalMeaning`…). Modül takılsaydı her patch reddedilirdi;
   bağlamak için yeniden tasarım (`undefined` semantiği) gerekiyordu. Bu efor ertelendi.
3. **İşlevsel baskı yoktu.** Bulk route'un inline doğrulaması "çalışıyordu" — modül bağlansa da
   bağlanmasa da kullanıcı gözünde bir şey değişmiyordu. Çelişki yalnızca rapor/mesaj düzeyindeydi.
4. **Güvenlik ağı yoktu.** Modülü referans veren hiçbir test yoktu (bugün de modülün **kendi birim
   testi yok**; yalnızca `bulk-route.test.ts` dolaylı dokunuyor). TypeScript ve ESLint,
   hiçbir yerden import edilmeyen export'lu bir dosyada hata vermez.

## 4. Öğrenilen Ders

- **Yeni modül commit'i, en az bir çağrı noktasını aynı commit'te içermelidir** ("bağlama
  zorunluluğu"). Modül + çağrı noktası ayrılırsa araya 8 gün değil 8 hafta da girebilir.
- **Commit mesajı davranışı değil niyeti yazmamalı.** "ortak dogrulama modulu" mesajı, kodda
  olmayan bir ortaklığı iddia ediyordu. `8f6f7cc` bunu "gercekten baglandi" diyerek düzeltti.
- API tasarımı tüketicinin veri modeliyle (tam kayıt vs kısmi patch) baştan hizalanmalıydı;
   uyumsuzluk bağlanmayı teknik olarak da zorlaştırdı.
- Modülle gelen commit'te modülün testi de gelmeliydi; test olsaydı ölü modül 8 gün sessiz kalmazdı.

## 5. Öneri — Bağlanmamış Modül CI Kontrolü

**Araç:** `scripts/check-unused-modules.mjs` (bu audit ile birlikte eklendi, `npm run check:unused`).

**Nasıl çalışır:**

1. `src/lib`, `src/hooks`, `src/utils` altındaki tüm `.ts` dosyalarını (test ve `.d.ts` hariç) sayar.
2. `app/`, `src/`, `scripts/` içindeki tüm `... from '<specifier>'` ve `import('<specifier>')`
   satırlarını tek seferde toplar.
3. Her modül için specifier'ların **sonunda** `/lib/<ad>`, `/hooks/<ad>` … ya da `/<ad>` ile biten
   eşleşme arar (hem `@/lib/x` alias'ını hem `../../../../src/lib/x` göreceli yolunu kapsar).
4. Eşleşme yoksa modülü **"bağlanmamış"** olarak raporlar.

**Hangi durumda uyarır / hata verir:**

- Bir modülün import'u yalnızca kendi test dosyasındaysa → uyarır (test tüketicisi sayılmaz).
- Hiçbir eşleşme yoksa → listeler ve **exit 1** (CI'da build kırar). `WARN_ONLY=1` ile yerelde
  yalnızca uyarı moduna alınabilir.
- Bilinçli olarak bağlanmamış tutulacak dosyalar (entry point, gelecek çalışma) repo kökündeki
  `.unused-modules-allowlist` dosyasına satır satır yazılarak muaf tutulur.

**Bilinen sınırlar:** dizinler arası aynı basamaklı dosya adı (iki farklı `utils.ts`) yanlış-negatif
yaratabilir; dinamik `import()` yalnızca literal string biçimindeyken yakalanır. Araç "kesin kanıt" değil
"erken uyarı"dır — CI'da kırmızı gören ilk iş allowlist kararı ya da bağlanma işi olmalıdır.

**Önerilen bağlama:** CI'da `npm test` yanında `npm run check:unused`; yeni modül PR'larında
"bağlanmamış modül eklendi" kırmızısı, reviewer'a bağlanma zorunluluğunu hatırlatır.

**İlk çalıştırma sonucu (2026-11-23):** Script depoya eklendiği anda 6 bağlanmamış modül buldu
(curationValidate hariç — doğru şekilde "kullanılıyor" gördü):

- `src/lib/curation/auditLog.ts` → **BAĞLANDI (P3, 2026-11-23):** Gerçek boşluk buydu — KARAR-16'nın
  ana yazma yolu `/api/curation/bulk` route'u `audit_log.jsonl`'a hiç audit yazmıyordu. Modül de
  facto dosya formatına uyarlandı (`{timestamp, action, lexemeId, form?, diff, source?}`), bulk
  route'a alan bazlı diff ile bağlandı (`CURATION_BULK_UPDATE` action'ı), AUDIT-02 testleriyle
  doğrulandı: reddedilen kayıt audit entry üretmez.
- `src/lib/dictionaryService.ts` — eski cache servisi, kullanıcısı yok → silme kararı bekliyor
- `src/lib/dictionaryUtils.ts` — eski canonical tipler, `src/types/dictionary.ts` devraldı → silme kararı bekliyor
- `src/lib/search.ts` — eski SearchBoxProps tanımları, `SearchBox.tsx` kendi props'unu tanımlıyor → silme kararı bekliyor
- `src/lib/validations/dictionarySchema.ts` — eski veri modelinin zod şeması (curationValidate
  yorumunda "dictionarySchema'dan ayrı" diye anılır) → silme kararı bekliyor
- `src/lib/variants.ts` — Radix UI migrasyonu sonrası ölü CVA stilleri → silme kararı bekliyor

Kalan 5 modül curationValidate ile aynı sınıf hatanın adaylarıdır: ya ölü kod (silinmeli), ya da
bilinçli bekletilen çalışma (allowlist'e yazılmalı). Karar bekliyor.

**Ek öneri (bu auditin kapsamı dışında, sıradaki iş adayı):** `curationValidate` modülünün kendi
birim testi yazılmalı (MID_WORD_Q sınırları: `a?g?z` reddi / `Ne?` geçişi; `<<...>>` yok sayma;
yarım HTML `</fon`; `allowedConcepts` dışı conceptId).
