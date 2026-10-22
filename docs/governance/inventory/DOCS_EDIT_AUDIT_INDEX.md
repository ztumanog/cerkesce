# Dokümantasyon Düzenleme Denetimi — Ana Rapor
**Kapsam:** `E:\projeler\Cerkesce\docs` (305 belge)
**Durum:** Denetim tamamlandı — **uygulama için onay bekliyor**. Bu aşamada hiçbir mevcut belge değiştirilmedi.
**Yöntem:** Tamamen otomatik, kanıt toplayan salt-okuma taraması (`raw/*.csv`) + bölüm raporları. Her bulgu dosya yolu ve satır numarasıyla kanıtlıdır.
---
### 1. Yönetici özeti
| Ölçüt | Değer |
|---|---|
| Belge sayısı | 305 (1'i ikili: `archive/STABILIZASYON_OPERASYONU_v1.0.png`) |
| Metin dosyası | 305 (PNG hariç) |
| Toplam boyut / satır | 3,62 MB / 63.196 satır |
| Toplam bulgu | **662** |
| — Biçim (BICIM) | 329 |
| — Dil (DIL, ağırlıklı diakritik) | 170 |
| — Terminoloji (TERMINOLOJI) | 140 |
| — İçerik (IÇERIK) | 17 |
| — Organizasyon (ORGANIZASYON) | 5 |
| — Bağlantı (LINK) | 1 |
| Birebir mükerrer dosya grubu | 8 grup / 18 dosya |
| Kodlama hasarı (mojibake / U+FFFD) | 4 dosya / 2 dosya |
| Depo geneli göreli bağlantı | 10 (1'i kırık) |
**En kritik üç sorun**
1. **Kodlama hasarı:** 4 belgede mojibake (`â€”`, `ÑˆÑ`, `Ğ±Ğ·Ñ` gibi), 2 belgede geri döndürülemez `U+FFFD` kaybı. `governance/status/PROJECT_STATUS.md` içindeki homonim tablosu (`ÑˆÑ` = şı, `Ğ±Ğ·Ñ` = бзэ) ve `Phase 2 â€” ...` başlıkları bunun kanıtı.
2. **Tek doğru durum ile çelişen belgeler:** `governance/status/PHASES.md` ve `PROJECT_STATUS.md` "Faz 1–15 CLOSED/COMPLETED, son güncelleme 2026-10-03" derken `governance/README.md` hâlâ "Phase 3 Completed / Current Phase Phase 4 PREPARATION / 09/18/2026" diyor. Depo kökündeki `AGENTS.md` ise "Faz 5 COMPLETED (2026-09-29), 231/231 PASS" diyor.
3. **Yedek/mükerrer yığılması:** `architecture/adr/` altında 1 kanonik `ADR_INDEX.md` + **8 adet** `.bak[-tarih]` kopyası; 8 grup birebir mükerrer dosya; 14 yedek uzantılı dosya; `PROJECT_STATUS.md` içinde kendi "Faz Özeti (Tek Gerçek)" bloğu **iki kez** tekrarlanıyor.
---
## 2. Bölüm raporları
| # | Bölüm | İçerik |
|---|---|---|
| — | [01-ENVANTER.md](./edit-audit/01-ENVANTER.md) | Dosya/klasör envanteri, boyut, tarih, kodlama/satır sonu anomalileri |
| — | [02-BICIM-BULGULARI.md](./edit-audit/02-BICIM-BULGULARI.md) | 329 biçim bulgusu, tür bazında toplam ve dosya listesi |
| — | [03-TERMINOLOJI-VE-DIL.md](./edit-audit/03-TERMINOLOJI-VE-DIL.md) | Terim envanteri, çakışan terim çiftleri, diakritik/yazım bulguları |
| — | [04-MUKERRER-VE-ORGANIZASYON.md](./edit-audit/04-MUKERRER-VE-ORGANIZASYON.md) | Mükerrer kümeler, belge içi tekrar blokları, adlandırma anomalileri |
| — | [05-IÇERIK-CELISKILERI.md](./edit-audit/05-IÇERIK-CELISKILERI.md) | Faz durumu iddiaları, test sayıları, güncelleme tarihleri |
| — | [06-BAGLANTILAR.md](./edit-audit/06-BAGLANTILAR.md) | Göreli bağlantılar, kırık bağlantı, çapraz referans durumu |
| — | `raw/` | Ham kanıt: `inventory.csv`, `issues.csv`, `naming.csv`, `headings.csv`, `links.csv`, `status-claims.csv`, `term-variants.csv`, `duplicate-exact.txt`, `duplicate-near.txt`, `adr-index-check.txt` |
| — | `tools/` | Denetimi yeniden üreten betikler: `DocsAudit.ps1`, `DocsDigest.ps1` |
---
## 3. Biçimsel tutarlılık (329 bulgu / 248 dosya)
| Bulgu türü | Dosya | Otomatik düzeltilebilir | Önerilen kural |
|---|---|---|---|
| Karışık satır sonu (CRLF+LF) | 150 | Evet | **LF tek biçim** |
| Dosya sonunda yeni satır yok | 56 | Evet | Sona tek LF |
| Satır sonu boşluğu | 36 | Evet | Satır sonu boşlukları silinir |
| UTF-8 BOM var | 29 | Evet | BOM'suz UTF-8 |
| H1 yok / birden fazla H1 | 36 | Kısmen (yapısal karar) | Belge başına tek H1 |
| Birden fazla tarih biçimi | 21 | Kısmen | Görünür tarihler `YYYY-AA-GG` |
| Kod bloğunda dil etiketi yok | 16 | Kısmen | `text`/`json`/`bash` etiketi |
| Kapatılmamış kod bloğu | 2 | Evet | Kapanış ` ``` ` eklenir |
| Uzun satır (>400 karakter) | 4 | Kısmen | Kod/tablo dışında kaydırma |
| Tek başına CR satır sonu | 1 | Evet | LF'e çevrilir |
| Tablo ayraç satırı bozuk | 1 | Evet | `\|---\|` satırı eklenir |
| Mojibake izi | 4 | **Hayır — elle** | Bayt düzeyinde onarım |
| U+FFFD değiştirme karakteri | 2 | **Hayır — elle** | Kayıp karakterlerin kaynaktan tamamlanması |
Öne çıkanlar:
- **Kodlama hasarı:** `archive/DECISIONS_yedek_2026-10-02_2157.md`, `governance/constitution/CONSTITUTION.md`, `governance/status/PROJECT_STATUS.md`, `governance/status/PROJECT_STATUS.md.bak`.
- **Kayıp karakter:** `architecture/ProjeYolHaritası.md`, `reports/FAZ_C3_TAMAMLAMA_RAPORU.md` (bu iki dosyada metin onarımı gerekiyor).
- **Kapatılmamış kod bloğu:** `architecture/adr/ADR-0007-TRANSLATIONREPOSITORY_CONTRACT.md` (ikincisi de `03`/`02` listesinde).
---
## 4. Dil ve terminoloji (310 bulgu)
### 4.1 Diakritik eksikliği (DIL — 170 bulgu, en yaygın sorun)
Belgelerin bir bölümünde Türkçe sözcükler diakritiksiz yazılmış; aynı belge içinde iki yazım birlikte kullanılıyor:
| Yanlış | Doğru | Örnek kaynak |
|---|---|---|
| `Sayilari` | `Sayıları` | `governance/status/PROJECT_STATUS.md:88` |
| `Asagidaki` | `Aşağıdaki` | `PROJECT_STATUS.md:101` |
| `baglanmaz`, `degil` | `bağlanmaz`, `değil` | `PROJECT_STATUS.md:80-81` |
| `Kapanis` | `Kapanış` | `PROJECT_STATUS.md:47` |
Tespit edilen kalıpların tam listesi `03-TERMINOLOJI-VE-DIL.md` içinde dosya bazındadır.
### 4.2 Terim envanteri ve çakışmalar (TERMINOLOJI — 140 bulgu)
| Kavram | Kanonik kullanım | Çakışan kullanım | Çakışan dosya |
|---|---|---|---|
| Faz | `Faz` (822) / `Phase` (830) | `FAZ` (130) / `PHASE` (77) | 30+ (ör. `governance/status/PROJECT_STATUS.md`, `PHASES.md`, `FAZ_*_DENETIM.md`) |
| Durum etiketi | `COMPLETED` (221) | `TAMAMLANDI` (143) + `CLOSED` | 40+ |
| ADR numarası | `ADR-####` (979) | `ADR_####` (93) | 15 (ör. `ADR_0001`…`ADR_0014`) |
| Çerkesçe | `Çerkesçe` (73) | `Circassian` (18) | 7 |
| Kabardey | `Kabardian` (41) | `Kabardey` (19) | 15 |
| Korpus | `Corpus` (83) | `Korpus` (9) | 7 |
| Doküman | `doküman` (5) | `dokümantasyon` (3) | 3 |
Not: Türkçe kod terimleri (`ÇeviriGirdisi`, `ÇeviriGrubu`, `KelimeAilesi`) **hiç kullanılmıyor**; kod terimleri tutarlı biçimde İngilizce (`TranslationEntry`, `TranslationGroup`, `WordFamily`). Bu bir sorun değil, kanonik terim sözlüğüne yazılacak bir karardır.
---
## 5. Organizasyon ve mükerrerlik
### 5.1 Birebir aynı içerikli gruplar (SHA-256)
| Grup | Dosyalar | Öneri |
|---|---|---|
| 1 | `archive/DUPLICATE_PROJECT_SUMMARY.md` = `archive/PROJECT_ROADMAP.md - Çerkesçe Sözlük Teknik Dokümantasyonu.md` | İki ada da gerek yok: tek kanonik ad |
| 2 | `architecture/TECHNICAL_ARCHITECTURE_GUIDE.md` = `archive/DUPLICATE_ProjeYolHaritası.md` | Arşiv kopyası |
| 3 | `architecture/ADR DASBOARD.md` = `architecture/adr/ADR DASBOARD` (uzantısız) | Tek kanonik: `ADR DASBOARD.md` |
| 4 | `references/README.md` = `references/kumakhov-1989/README.md` | Alt klasör README'si gereksiz |
| 5 | `architecture/adr/ADR-0016-Phase3-7-Dondurma-SUPERSEDED.md` = `archive/ADR-0016_super_kopya.md` | Arşiv kopyası |
| 6 | `phases/phase-2/FAZ2_KAPANIS_DUYURUSU.md` = `phases/phase-2/PHASE_2_COMPLETION_REPORT.md` | Aynı belge iki adla |
| 7 | `architecture/adr/ADR_INDEX.md.bak` = `…bak-20261005-051043` | Yedek yığını |
| 8 | 4 × `ADR_INDEX.md.bak-20261005-0511xx` | Yedek yığını |
Ek olarak **9 dosyalık ADR_INDEX kümesi** (`ADR_INDEX.md` + 8 yedek) aynı içerik kökünden türemiş; ilk 1200 karakteri aynı.
### 5.2 Belge içinde tekrar eden bloklar (kopyala-yapıştır artığı)
| Dosya | Tekrar | Başlangıç satırları |
|---|---|---|
| `governance/status/PROJECT_STATUS.md` | 2 | 6, 27 — "Faz Özeti (Tek Gerçek)" tablosu iki kez |
| `meta/MEMO.md` | 4 blok | 88/130, 93/135, 100/142, 109/151 |
| `morphology/MORPHOLOGY_SCOPE.md` | 3 blok | 20/151, 27/158, 108/239 |
| `morphology/MORPHOLOGY_ENGINE_CHARTER.md` | 1 blok | 159, 211 |
| `phases/phase-5/P5-001-CORPUS_AUDIT.md` | 2 blok | 85/110, 90/115 |
| `architecture/adr/ADR_INDEX.md.bak[-20261005-051043]` | 1 blok | 150, 162 |
### 5.3 Adlandırma anomalileri (66 kayıt)
| Anomali | Adet | Örnek |
|---|---|---|
| Adında boşluk | 14 | `archive/PHASE 3 EXECUTION PLAN - Yürütme Planı.md`, `architecture/adr/ADR DASBOARD` |
| Yedek/eskimiş uzantı | 14 | `*.md.bak`, `*.md.deprecated`, 8 × `ADR_INDEX.md.bak-*` |
| Adında Türkçe karakter | 11 | `architecture/ProjeYolHaritası.md`, `archive/TAŞIMA-RAPORU-*.txt` |
| Adında tarih damgası | 8 | `ADR_INDEX.md.bak-20261005-053155` |
| Uzantısız dosya | 1 | `architecture/adr/ADR DASBOARD` |
| Aynı ad, farklı klasör | 4 ad | `README.md` ×4, `FUTURE_CAPABILITIES.md` ×2, `PHASE_TIMELINE_RECONCILIATION.md` ×2, `ADR DASBOARD.md` ×2 |
---
## 6. İçerik çelişkileri ve bayat bilgi
| Konu | Kanonik kaynak | Çelişen kaynak |
|---|---|---|
| Faz durumu | `governance/status/PHASES.md`, `PROJECT_STATUS.md`: **1–15 CLOSED/COMPLETED**, son güncelleme 2026-10-03 | `governance/README.md`: "Phase 3 Completed / Phase 4 PREPARATION / 09/18/2026"; depo kökü `AGENTS.md`: "Faz 5 COMPLETED / 2026-09-29" |
| Test sayısı | `PROJECT_STATUS.md`: 659/659 + 87/87 = **746/746** | `governance/README.md`: **193/193**; kök `AGENTS.md`: **231/231** |
| Durum etiketi | `CLOSED` / `COMPLETED` | `TAMAMLANDI` (143 geçiş), karma kullanım |
| Faz adı | `PHASE 6 = API Gateway` (ADR-GOV-003) | Bazı belgelerde kimlik/analitik ekseni farklı adlandırılmış |
Test sayıları depoda 62/62'den 1010/1010'a kadar 20+ farklı değer alıyor. Kronolojik raporlarda bu normaldir; sorun, **eski sayının güncel durum olarak sunulduğu** belgelerdir (`governance/README.md` gibi).
**Kapsam dışı ama raporlanan:** `E:\projeler\Cerkesce\AGENTS.md` (depo kökü) `docs/` dışında kaldığı için denetim kapsamı dışındadır; ancak kanonik durumla çeliştiği için ayrıca güncellenmesi gerekir.
---
## 7. Bağlantılar ve çapraz referanslar
- Depo genelinde yalnızca **10** göreli bağlantı var; **299** dosyaya hiçbir belgeden bağlantı verilmiyor.
- **Tek kırık bağlantı:** `archive/PROJECT_STATUS_arsiv_2026-09-24.md` → `architecture/adr/ADR-P2-011-FILTER_FLOW_AUDIT.md` (dosya `archive/` altına taşındığı için hedef `../architecture/adr/...` olmalıydı).
- Bağlantı kuran tek belgeler `architecture/adr/ADR DASBOARD.md` ve `architecture/adr/README.md`.
---
## 8. Karar bekleyen konular (onayınız gerekiyor)
| # | Karar | Önerilen varsayılan |
|---|---|---|
| K1 | Satır sonu biçimi | **LF** (150 dosya düzeltilir) |
| K2 | UTF-8 BOM | **Kaldır** (29 dosya) |
| K3 | Faz yazımı | Gövde metni **Faz**; dosya adı/başlık kimliği `PHASE_*` korunur |
| K4 | Durum etiketi | Tablo/sertifikasyonda **COMPLETED/CLOSED** korunur; düz Türkçe metinde **tamamlandı** |
| K5 | ADR numarası | **`ADR-####`** kanonik; `ADR_0001`…`ADR_0014` dosyaları yeniden adlandırılır + `ADR_INDEX.md` güncellenir |
| K6 | Diakritik normalizasyonu | 170 bulgu düzeltilir; **kod blokları ve İngilizce cümleler hariç** |
| K7 | Mükerrer/yedek dosyalar | **Silinmez**; `governance/archive/2026-10-temizlik/` altına taşınır |
| K8 | Dosya adı normalizasyonu | Yalnızca arşive taşınan dosyalarda (boşluk/Türkçe karakter → kebab-case ASCII) |
| K9 | Kanonik belge adları | **Değiştirilmez** (referans riski), yalnızca `ADR DASBOARD` uzantısız kopyası silinir |
| K10 | Bayat index/belgeler | `governance/README.md` kanonik durumla güncellenir; `ADR_INDEX.md` tam listeyi içerir |
| K11 | Kodlama hasarı | 4 mojibake + 2 U+FFFD dosyası **elle** onarılır (otomatik dönüşüm kayıplı olur) |
| K12 | Belge içi tekrar blokları | Tekrarlar kaldırılır (içerik kaybı yok), en kritik: `PROJECT_STATUS.md` |
---
## 9. Önerilen uygulama planı
Uygulama, her aşaması geri alınabilir biçimde ve **yazma alanları çakışmayacak şekilde** yürütülür.
| Aşama | İş | Yöntem | Risk |
|---|---|---|---|
| **0. Yedek** | Tüm `docs/` klasörünün zip yedeği (`E:\projeler\Cerkesce\backups\docs-<tarih>.zip`) | Betik | — (git deposu yok, yedek zorunlu) |
| **A. Mekanik biçim** | LF, BOM kaldırma, son satır newline, satır sonu boşlukları, tablo ayraç, kapatılmamış kod bloğu | Betik (yalnızca mekanik, içerik metnine dokunmaz) | Düşük |
| **B. Yapısal** | H1 düzeltmeleri, kod bloğu dil etiketleri, belge içi tekrar blokları, kırık bağlantı, `governance/README.md` | Betik + hedefli elle düzenleme | Düşük |
| **C. Dil/terminoloji** | Diakritik düzeltmeleri (kod bloğu hariç), Faz/Phase ve durum etiketi normalizasyonu | Onaylı sözlükle betik + örnek doğrulama | Orta |
| **D. Temizlik/arşiv** | Mükerrer + yedek dosyaların arşive taşınması, ad normalizasyonu, `ADR_INDEX.md` güncellemesi | Betik (taşıma, silme yok) | Orta |
| **E. Doğrulama** | `DocsAudit.ps1` yeniden çalıştırılır; bulgu sayıları ve dosya listesi karşılaştırılır; önce/sonra tablosu üretilir | Betik | — |
**Kabul ölçütleri (Aşama E sonunda):**
- Karışık satır sonu: 150 → 0; BOM: 29 → 0; son satır newline eksiği: 56 → 0; satır sonu boşluğu: 36 → 0.
- Belge içi tekrar bloğu: 13 → 0; kapatılmamış kod bloğu: 2 → 0; kırık bağlantı: 1 → 0.
- Diakritik bulgusu: 170 → 0 (onaylanan sözlük kapsamında).
- Yedek/mükerrer dosya: 18 → 0 (arşive taşınmış, silinmemiş).
- Kanonik durum çelişkisi: `governance/README.md` güncellenmiş; kök `AGENTS.md` için kullanıcıya ayrı iş çıkarılmış olarak raporlanır.
---
## 10. Ortam kısıtı (raporlanması gereken bulgu)
Bu klasörde DSH'nin korumalı alt süreçleri çalışmıyor ve nedeni dosya izinleri:
- **Engelleyen nesne:** `E:\projeler\Cerkesce\docs` — eksik hak: **izin değiştirme hakkı (WRITE_DAC)**. Klasörün sahibi farklı bir Windows kurulumuna ait bir kullanıcı (`S-1-5-21-3071712457-…-1003`); oturum kullanıcısı (`S-1-5-21-3672747219-…-1001`) bu klasörde izin değiştiremiyor.
- **Belirti:** `SetNamedSecurityInfoW failed (Win32 5)` → PowerShell komutları ve paralel alt ajanlar başlatılamıyor. Dosya okuma ve yazma çalışıyor.
- **Değişen/geri alınan:** Hiçbir izin değişikliği yapılmadı (`REPAIR_REFUSED`, `FIXED=0`, `GRANTED=0`, `RESTORED=0`); geri alma komutu gerekmedi.
- **Tanılama raporu:** `E:\projeler\Cerkesce\docs-acl-backup\acl-report-5372d67e55334d2eb99f43c90af1a009.jsonl`
**Sonuç:** Bu denetim tek ajanla, her komut için tek tek onay alınarak yapıldı. Derinlik sınırı şudur: biçim/terminoloji/organizasyon **305 dosyanın tamamında** tarandı; ancak **cümle düzeyinde dil ve üslup düzeltmesi** (anlatım bozukluğu, cümle akışı) makineyle güvenilir biçimde tespit edilemez — bunun için paralel ajanlı ikinci bir geçiş gerekir.
Oturumu **tam erişime (full access)** alırsanız PowerShell ve paralel alt ajanlar çalışır; C aşamasını dosya bazında paralel ve çok daha derin yürütebilirim. Sorun devam ederse bu oturumu geri bildirim olarak gönderin; yukarıdaki rapor kaydı mekanizmayı ve kanıtı içeriyor.
---
## 11. Bu raporun sınırları
- Otomatik tarama **nesnel** olanı ölçer (kodlama, satır sonu, yapı, terim geçiş sayısı, mükerrerlik, bağlantı). Yorum gerektiren üslup düzeltmeleri kapsam dışıdır.
- `archive/` altındaki tarihsel kayıtlar da taranmıştır; bunların düzeltilmesi mi yoksa dokunulmadan bırakılması mı gerektiği **karar konusudur** (öneri: yalnızca kodlama hasarı ve mükerrerlik temizliği; tarihsel metin değiştirilmez).
- `docs/` dışındaki dosyalar (kök `AGENTS.md`, uygulama kaynak kodu) kapsam dışıdır; yalnızca çelişki tespiti amacıyla okundu.
- Bulgu sayıları `raw/issues.csv` ile birebir eşleşir; her bulgu yeniden üretilebilir (`tools/DocsAudit.ps1`).DIT_AUDIT_INDEX.md
