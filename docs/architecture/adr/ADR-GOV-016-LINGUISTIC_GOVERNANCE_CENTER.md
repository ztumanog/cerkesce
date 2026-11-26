# ADR-GOV-016: Linguistic Governance Center

**Durum:** ACCEPTED (v1 ilk çalışır sürüm — 2026-11-26)
**Tarih:** 2026-11-26
**Kategori:** Governance / Data Quality
**Onay:** Baş Mimar (2026-11-26)
**Etkilenen:** `scripts/report-governance.mjs`, `public/admin-reports/*`, `app/admin/yonetim/*`, `src/infra/governance/govReports.ts`

> **Numaralandırma notu:** Baş Mimar karar metninde bu ADR "ADR-GOV-007" olarak anıldı. `ADR-GOV-007` numarası dolu olduğundan (**Phase 8 Production Readiness**, Proposed), `ADR_NUMBERING_POLICY.md` Bölüm 4 (Çakışma Prosedürü) uyarınca sıradaki boş numara olan **ADR-GOV-016** atandı. İçerik Baş Mimar kararının kaydıdır.

---

## Bağlam

Mevcut `validate:data` (ADR-ROOTS-006 kapanışında 15/15 PASS) yalnızca **şema doğruluğu** ve **referans bütünlüğü** kontrol eder. Eksik olan katman: **anlamsal yönetişim** ve **veri kalitesi yönetişimi**.

Son 2 aylık sprintlerde yaşanan problemlerin tamamı bu katmanda çıktı:

- `conceptId` / `conceptIds` hizasızlıkları (SSOT migration; ABADZEKH, VARENETS, NEPEREH_CH vakaları)
- TR↔RU çeviri karışmaları (Sprint 3Q — `strapon`, `copy ← копейка`, `car ← towing hook` vakaları)
- Wiki kalıntıları (ADR-ROOTS-006 — 571 lexeme)
- Kök-aile açıkları (ROOT-AUGMENT-001)

Bunların çözümü bugüne kadar komut satırı döngüsüyle yürüdü: *script çalıştır → terminal oku → CSV üret → karar ver*. Oturum içi `_scripts/durum_tek.py` raporu (repo dışı geçici script) bu döngünün son örneğidir.

## Karar

**Linguistic Governance Center** kurulur: Yönetim paneli altında, veri kalitesi denetim ekranlarından oluşan kalıcı ürün. Amacı, kalite kontrolünü komut satırına ihtiyaç duymadan görünür ve tıklanabilir kılmak.

**Sol menü hedef yapısı (`/admin/yonetim` altında):**

```
📊 Yönetim
   ├─ Veri Sağlığı          (v1 — /admin/yonetim/veri-sagligi)
   ├─ Kök Denetimi          (v1 — /admin/yonetim/kok-denetimi)
   ├─ Kavram Denetimi       (v1 — /admin/yonetim/kavram-denetimi)
   ├─ Çeviri Denetimi       (v2 — /admin/yonetim/ceviri-denetimi)
   ├─ POS Denetimi          (v3)
   ├─ Lehçe Denetimi        (v3)
   ├─ Örnek Denetimi        (v4)
   ├─ Aile Denetimi         (v4)
   └─ ADR Raporları         (backlog — mevcut Karar Defteri entegrasyonu)
```

## Kurallar

| Kural | Tanım |
|---|---|
| **RULE-01** | Terminali UI'ya taşı, iş kurallarını değil: CLI denetim scriptleri JSON raporu üretir; UI bu JSON'u okur. Denetim mantığı UI'ya taşınmaz. |
| **RULE-02** | Metrik sözlüğü zorunludur: ekranda görünen her sayı, bu ADR'nin metrik sözlüğündeki yeniden üretilebilir tanımla gelir. Uydurma/placeholder sayı yasaktır (mockup değerlendirmesinde tespit edilen ihlal). |
| **RULE-03** | Zaman damgası: her rapor `generatedAt` taşır; "bugün" gibi belirsiz etiket yerine üretim anı gösterilir. |
| **RULE-04** | Rapor üreteçleri repo içinde sürümlenir: denetim ekranları tek seferlik yerel scriptlere (ör. eski `_scripts/durum_tek.py`) bağımlı olamaz. Üretici: `scripts/report-governance.mjs` (`npm run report:governance`). |
| **RULE-05** | Governance ekranlarında hardcoded metrik kullanılamaz: tüm sayılar `audit JSON → API → UI` zincirinden gelmelidir. (Baş Mimar, 2026-11-26) |
| **RULE-06** | Her metrik veri sözlüğüne bağlı açık etiket taşımalıdır: "Boş Kökler: 7063" belirsizdir; "rootId'si eksik lexeme: 7063", "Üyesiz root: 5", "Boş word family: 3240" açık tanımdır. (Baş Mimar, 2026-11-26) |
| **RULE-07** | **Metrik Kabul Kuralı** — bir metrik ancak dört şartı sağlıyorsa Governance ekranına çıkabilir: (1) tanımı var, (2) üretici script belli, (3) JSON alanı belli, (4) tekrar üretilebilir. Dört şarttan biri eksikse metrik yalnız ADR notu olabilir, ekran metriği olamaz. (Baş Mimar, 2026-11-26) |

## Acceptance Criteria (Baş Mimar, 2026-11-26)

**Mockup nihai kararı:**

| Öğe | Karar |
|---|---|
| UI İskeleti · Navigasyon · Bilgi Mimarisi | ✅ ACCEPTED |
| Placeholder veriler · sahte audit sonuçları · sahte ID formatları | ❌ REJECTED |
| Gerçek veri kaynağı | ✅ REQUIRED (RULE-05) |

**POC başarı kriteri:** Terminal çıktısı ile yönetim ekranı **aynı sayıyı** göstermelidir — fark **0**. `report:governance` terminal özeti, ekranların okuduğu JSON ile aynı veriden yazılır; bu nedenle eşitlik yapısal olarak garanti edilir. Governance ekranları tasarım ekranı değil, **denetim ekranıdır**: estetikten önce doğruluk, izlenebilirlik ve tek gerçeklik kaynağı gelir.

## Veri Modeli (JSON arayüz)

`public/admin-reports/` altında üç rapor; UI yalnızca bunları okur:

```
health.json          → { lexemes, roots, wordFamilies, duplicateIds,
                         brokenRootRefs, brokenWordFamilyRefs, posEmpty,
                         fill: { wordFamilyEmpty/FillPct, rootEmpty/FillPct,
                                 arabicEmpty/FillPct, ipaEmpty,
                                 conceptEmpty/FillPct, withExamples,
                                 exampleCoveragePct } }

roots-audit.json     → { rootIdMissing, rootIdMissingWhenRootIdsPresent,
                         rootIdMismatch, brokenRootRefs, unusedRoots,
                         orphanRoots[], rootIdMissingSamples[] }

concepts-audit.json  → { emptyConceptIds, legacyConceptIdRecords,
                         legacyConceptIdValues, conceptIdMismatch,
                         conceptFieldMismatch, wfDanglingConceptRefs,
                         wfDanglingConceptValues, örnek listeler }

translations-audit.json → { trCyrillic, trArabic, enCyrillic, enArabic,
                            ruLatinWords, trEnglishSuspect, trEqualsEn,
                            trEmpty, enEmpty, arEmpty, ruEmpty, samples }
```

## Metrik Sözlüğü

| Metrik | Tanım |
|---|---|
| `rootIdMissing` | `rootId` alanı boş olan **LEXEME** sayısı — "boş kök" **değildir** |
| `rootIdsMissing` | `rootIds` dizisi boş/eksik olan **LEXEME** sayısı |
| `unusedRoots` | Hiçbir lexeme'nin `rootId`/`rootIds` ile referans etmediği **KÖK** (üyesiz/orphan kök; kök havuzunda) |
| `unusedWordFamilies` | Hiçbir lexeme'nin `wordFamilyId`'si ile referans etmediği **WORD FAMILY** (üyesiz aile) |
| `rootIdMismatch` | `rootId != rootIds[0]` olan kayıt |
| `brokenRootRefs` | Hedefi kök havuzunda bulunmayan kök referansı |
| `emptyConceptIds` | `conceptId`'si boş lexeme |
| `legacyConceptIdRecords` | SSOT (ADR-GOV-015) öncesi `conceptIds` dizisini hâlâ taşıyan kayıt |
| `legacyConceptIdValues` | Bu dizilerdeki toplam değer sayısı |
| `conceptIdMismatch` | `conceptId != conceptIds[0]` (validator kuralıyla aynı) |
| `conceptFieldMismatch` | `concept != conceptId` — iki alan birbirini tutmuyor |
| `wfDanglingConceptRefs` | `conceptIds` içinde asılı referans taşıyan wordFamily sayısı |
| `wfDanglingConceptValues` | Asılı referansların benzersiz değer sayısı |
| `trCyrillic` | TR karşılığında Kiril karakter geçen kayıt (şüpheli — parantez içinde kaynak gösterme olabilir) |
| `trArabic` | TR karşılığında Arapça karakter geçen kayıt (şüpheli) |
| `enCyrillic` / `enArabic` | EN karşılığında Kiril / Arapça karakter geçen kayıt (şüpheli) |
| `ruLatinWords` | RU karşılığında en az 3 harfli Latin kelime geçen kayıt (şüpheli — bilimsel ad olabilir) |
| `trEnglishSuspect` | TR karşılığında sabit İngilizce fonksiyon kelimesi listesinden biri geçen kayıt (şüpheli; liste script'te sürümlüdür, Türkçe homograflar — "her" gibi — hariçtir) |
| `trEqualsEn` | TR ve EN karşılıkları büyük/küçük harf duyarsız birebir aynı olan kayıt (özel adlarda meşru olabilir) |
| `trEmpty` / `enEmpty` / `arEmpty` / `ruEmpty` | İlgili dil karşılığı boş kayıt |

> **Tanım notu (2026-11-26):** Baş Mimar oturum raporundaki "WF legacy concept 176" ve "concept uyuşmazlığı 2" değerlerinin üretim tanımı repo dışındaki `_scripts/durum_tek.py`'de olduğundan yeniden üretilemedi. Bu sözlükteki tanımlarla güncel değerler: `wfDanglingConceptRefs` **341** / `wfDanglingConceptValues` **365**; `conceptIdMismatch` **0**; `conceptFieldMismatch` **550**. Sözlükteki tanımlar otoriterdir (RULE-02/RULE-06).

### Historical Metrics (ekrana kapalı — RULE-07 gereği)

Aşağıdaki sayılar oturum kayıtlarında geçer ancak dört kabul şartını sağlamadığı için Governance ekranında **yer almaz**; yalnızca bu ADR notu olarak yaşar. Sayının yanlış olduğu iddia edilmez — kanıtı yeniden üretilemediği için ekrana çıkamaz.

| Historik değer | Durum |
|---|---|
| `Legacy WF.conceptIds = 176` | **Status:** Historical Metric · **Source:** Kullanıcı/oturum denetimi (`_scripts/durum_tek.py`, repo dışı) · **Definition:** Bilinmiyor · **Reproducible:** Hayır · **Governance UI:** Excluded |
| `Concept uyuşmazlığı = 2` | **Status:** Historical Metric · **Source:** Kullanıcı/oturum denetimi (bilinen vakalar: `L-SHHE`, `L-VERIFIED-01561`) · **Definition:** Bilinmiyor · **Reproducible:** Hayır · **Governance UI:** Excluded |

Tanımı netleşirse (hangi sorgu, hangi snapshot): sözlüğe tanımı eklenir, üreticiye işlenir, dört şart sağlanınca ekrana alınır.

## v1 Kapsamı (Baş Mimar onaylı — 2026-11-26, iki revizyon)

İlk çalışır sürüm **3 ekran** içerir (gerekçe: kavram vakaları — `conceptId`/`conceptIds`, `WF.conceptIds`, ABADZEKH, VARENETS, NEPEREH_CH — çeviri denetimini öne aldı):

1. **Veri Sağlığı** — sayım, bütünlük (mükerrer/kırık referans) ve doluluk göstergeleri
2. **Kök Denetimi** — `rootId != rootIds[0]`, kırık root referansı, `rootIdMissing`, `rootIdsMissing`, üyesiz root (tam liste), üyesiz wordFamily (tam liste) — tümü sözlük etiketleriyle (RULE-06)
3. **Kavram Denetimi** — `emptyConceptIds`, legacy kayıtlar, alan uyuşmazlıkları, WF asılı referansları

**Dalgalar:** v2 Çeviri Denetimi (**uygulandı — 2026-11-27**) · v3 POS + Lehçe Denetimi · v4 Örnek + Aile Denetimi · backlog ADR Raporları.

### v2 — Çeviri Denetimi (2026-11-27)

Dil alanlarına sızan yabancı metinler ve eksik çeviriler. Tüm göstergeler **şüpheli aday**dır: ekran insan incelemesi için liste üretir, kesin hüküm vermez (anlam değişikliği insan kararı ilkesi). Ekran: `/admin/yonetim/ceviri-denetimi`; örnek kayıtlar derin bağlantıyla kürasyona açılır.

**Derin bağlantı** (tıkla → kürasyon ekranında kayıt açılır, orada düzeltme yapılır) v1 gereksinimidir ve **uygulandı** (2026-11-27): lexeme → `/admin/curation/{id}` (EditForm'lu detay), kök → `/admin/curation/roots?root={id}`, wordFamily → `/admin/curation/roots?family={id}`. Yönetişim ekranı salt okunur kalır; RULE-07 bozulmaz — düzeltme kürasyon sürecindedir.

## Uygulama Kaydı (2026-11-26 — ilk çalışır sürüm)

| Bileşen | Dosya |
|---|---|
| Rapor üreticisi | `scripts/report-governance.mjs` → `npm run report:governance` |
| Rapor çıktıları | `public/admin-reports/{health,roots-audit,concepts-audit}.json` |
| Yükleyici | `src/infra/governance/govReports.ts` (tipli okuma, `generatedAt` biçimleme) |
| Ekranlar | `/admin/yonetim/veri-sagligi`, `/admin/yonetim/kok-denetimi`, `/admin/yonetim/kavram-denetimi` |
| Hub girişi | `/admin/yonetim` → "Veri Yönetişimi" bölümü |
| Derin bağlantı | Kök/Kavram/Çeviri Denetimi örnek listeleri → `/admin/curation/{id}`; kök → `?root=`, WF → `?family=` (roots sayfası derin bağlantı parametreleri) |
| v2 Çeviri ekranı | `/admin/yonetim/ceviri-denetimi` + `translations-audit.json` |
| Birim testi | `src/tests/governance/reportGovernance.test.ts` (8 test) |

**İlk rapor değerleri** (2026-11-26 ~17:49 UTC): lexemes **41.472**\* · roots **3.670** · WF **7.187** · WF boş **3.240** · `rootIdMissing` **7.063** · `rootIdsMissing` **7.063** (aynı küme — `rootId` boş olup `rootIds` dolu kayıt yok) · üyesiz kök **5** (`R-SHCH1YP1E`, `R-UPCH1E`, `R-PSHCH1AMP1E`, `R-TXYP`, `кхъуей`) · üyesiz wordFamily **5** · AR boş **9.050** · conceptId boş **15** · legacy kayıt **29** (80 değer) · mükerrer ID / kırık kök / kırık WF referansı **0**. `report:governance` terminal özeti bu değerleri ekranla aynı kaynaktan basar (POC başarı kriteri).

> \* Paralel kürasyon oturumu `lexemes.json`'a canlı kayıt eklemektedir; rapor her üretimde güncel sayıyı taşır (aynı gün validator 41.462 görmüştü).

**v2 ilk değerleri** (2026-11-27): TR&apos;de Kiril **79** · TR&apos;de Arapça **23** · TR İngilizce şüpheli **305** · TR == EN **382** · RU&apos;da Latin kelime **221** · EN&apos;de Kiril **45** · EN&apos;de Arapça **0** · TR/EN/RU boş **0** · AR boş **9.050**.

## Sonuçlar

- Kalite denetimi komut satırı bağımlılığından kurtulur; sprint çıktıları kalıcı ürüne dönüşür.
- Anlamsal yönetişim katmanı ölçülebilir ve izlenebilir hale gelir (ADR-ROOTS-007/008 kuyruğunun çalışma ortamını hazırlar).
- `validate:data` mevcut işlevini korur; Governance Center bunun üzerine anlamsal/kalite katmanını ekler (yerine geçmez).
- Mockup değerlendirmesi (isim: Meta AI POC): iskelet **kabul**, veri **red** — gerçek uygulama yalnızca rapordan beslenir (RULE-02). Mockup tasarım kararı arşivi: `_inceleme/adr-gov-016-mockup-notu.md`.
