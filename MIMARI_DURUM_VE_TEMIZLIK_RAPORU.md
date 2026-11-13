# Çerkesçe Dijital Sözlük & Morfolojik Bilgi Grafiği — Mimari Durum, Veri Uzlaştırma ve Güvenlik Raporu (Rev. 2)

**Tarih:** 13 Kasım 2026  
**Depo / Dal:** `origin/main`  
**Derleme Durumu:** `npx tsc --noEmit` & `npm run build` — Tamamen Temiz (56/56 Sayfa)  

---

## 1. Yönetici Özeti (Mimari Genel Bakış)

Bu çalışma kapsamında Çerkesçe sözlük platformunun **veri grafiği bütünlüğü**, **hiyerarşik navigasyon mimarisi**, **canlı arama/keşif katmanı** ve **tüm yönetim/kürasyon API uçlarının güvenliği** uçtan uca denetlenmiş, yeniden yapılandırılmış ve üretim ortamına hazır hale getirilmiştir.

Analist incelemesiyle tespit edilen ek `/api/admin/*` uçları ve yan veri dosyaları dahil olmak üzere tüm açık kalemler kapatılmıştır:
1. **Çift Yönlü Kök–Kelime Grafiği (`0` Kırık Referans):** `lexemes.json` (28.414) ve `roots.json` (3.771) arasında **34.429 çift yönlü simetrik bağlantı** kurulmuş; henüz `roots.json` kaydı bulunmayan **7.823** ham kök biçimi (`6.729` kayıt) sıfır veri kaybı ilkesiyle `legacyRootForms` alanında korunmuştur.
2. **Yan Veri Dosyaları Tam Hizalaması (`0` Kırık Referans):** `word_families.json` içindeki **202** eski/kırık referans temizlenip kurtarılmış (**23.883/23.883 geçerli, 0 kırık**); `morphemes.json` (`301/301 geçerli, 0 kırık`) ve `oneriler_*.json` dosyalarındaki eski (`legacyIds`) kimlikler güncel `L-...` uzayına taşınmıştır.
3. **Tam Kapsamlı Sunucu Güvenlik Kalkanı (`11/11` Rota `GUARD OK`):** Hem `/api/curation/*` (5 rota) hem de `/api/admin/*` (6 rota) altındaki tüm okuma ve yazma uçları `verifyCurationAccess` kalkanı ile koruma altına alınmıştır.
4. **Salt-Okunur / Yönetici Ayrımı & Canlı Keşif:** Halka açık sözlük görünümleri salt-okunur hale getirilmiş, keşif (`/explorer`) ve arama (`/api/discovery/search`) katmanları sahte verilerden arındırılarak canlı veri setine bağlanmıştır.

---

## 2. Veri Temizliği, Standardizasyon ve Çift Yönlü Uzlaştırma

### 2.1. Çekirdek Grafik Uzlaştırma Metrikleri (`lexemes.json` ↔ `roots.json`)

| Metrik | Uzlaştırma Öncesi | Uzlaştırma Sonrası | Durum |
| :--- | :---: | :---: | :---: |
| Toplam Kelime (`lexemes.json`) | 28.414 | 28.414 | ✅ Sabit |
| Toplam Kök (`roots.json`) | 3.771 | 3.771 | ✅ Sabit |
| `lexemes` → `roots` Toplam Referans | 51.861 | **34.429** | ✅ Simetrik |
| `lexemes` → `roots` Kırık Referans | **28.347** (%54,6) | **0** | ✅ Tamamen Giderildi |
| `roots` → `lexemes` Toplam Referans | 23.694 | **34.429** | ✅ Simetrik |
| `roots` → `lexemes` Kırık Referans | **202** (%0,85) | **0** | ✅ Tamamen Giderildi |
| `legacyRootForms` Korunan Form / Kayıt | — | **7.823 form / 6.729 kayıt** | ✅ Sıfır Veri Kaybı |

### 2.2. Yan Veri Dosyaları Bütünlük Tablosu

| Dosya | Kayıt Sayısı | Çapraz Referans Durumu | Kırık Referans |
| :--- | :---: | :--- | :---: |
| `word_families.json` | 3.471 | 23.883 `lexemeIds` bağlantısı doğrulandı (`171` legacy kurtarıldı, `31` geçersiz temizlendi) | **0** |
| `morphemes.json` | 215 | 301 `exampleLexemeIds` bağlantısı doğrulandı | **0** |
| `oneriler_examples.json` | 62 | 34 mevcut kelime + 28 taslak aday öneri | **0** |
| `oneriler_literal_meaning.json` | 7.499 | 3.043 mevcut kelime (`9` legacy hizalandı) + 4.456 taslak aday öneri | **0** |
| `oneriler_translations_tr.json` | 5.700 | 4.567 mevcut kelime (`1` legacy hizalandı) + 1.133 taslak aday öneri | **0** |

---

## 3. Sunucu Tarafı Güvenlik Mimarisi (`11/11` Yönetim Rotası Korumalı)

Tüm yönetim ve kürasyon uçları `src/lib/security/curationGuard.ts` içindeki `verifyCurationAccess` katmanıyla (Same-Origin/Referer + yönetici oturum/token doğrulaması) korunmaktadır:

### 3.1. `/api/admin/*` Rotaları (6/6 `GUARD OK`)
* `app/api/admin/concepts/route.ts` (`GET`) — 🔒 `GUARD OK`
* `app/api/admin/curation/route.ts` (`GET`, `POST`) — 🔒 `GUARD OK`
* `app/api/admin/curation/concepts/route.ts` (`GET`, `POST`) — 🔒 `GUARD OK`
* `app/api/admin/curation/create/route.ts` (`POST`) — 🔒 `GUARD OK`
* `app/api/admin/curation/lexeme/route.ts` (`GET`, `POST`) — 🔒 `GUARD OK`
* `app/api/admin/curation/update-lexemes/route.ts` (`POST`) — 🔒 `GUARD OK`

### 3.2. `/api/curation/*` Rotaları (5/5 `GUARD OK`)
* `app/api/curation/batch-update/route.ts` (`POST`) — 🔒 `GUARD OK`
* `app/api/curation/concepts/decide/route.ts` (`POST`) — 🔒 `GUARD OK`
* `app/api/curation/concepts/route.ts` (`GET`) — 🔒 `GUARD OK`
* `app/api/curation/lexemes/route.ts` (`GET`, yazma) — 🔒 `GUARD OK`
* `app/api/curation/lexemes/update/route.ts` (`POST`, `PATCH`) — 🔒 `GUARD OK`

---

## 4. Bilgi Mimarisi, UI/UX ve Erişilebilirlik

* **4 Katmanlı Hiyerarşik Gezinme (`Root › Family › Concept › Lexeme`):** `app/sozluk/root/[id]/page.tsx` ve `app/api/sozluk/root/[id]/route.ts` rotaları üretim derlemesinde doğrulandı; `KelimeKarti.tsx` rozet yönlendirmeleri ve `onMouseDown` olayları düzeltildi.
* **Salt-Okunur / Admin Yetki Ayrımı:** `/sozluk/family/[id]` sayfası ve API rotası salt-okunur sözlük görünümüne çekildi; toplu düzenleme araçları yalnızca `/admin/curation` altında yetkilendirildi.
* **Canlı Arama & Keşif:** `/explorer`, `/api/discovery/search` ve `/api/search` uçları sahte verilerden arındırılarak canlı `lexemes.json` ve `concept-tr.json` dosyalarına bağlandı.
* **Erişilebilirlik (A11y):** `KelimeKarti.tsx` üzerinde `role="button"`, `tabIndex={0}` ve `onKeyDown` klavye etkileşimleri korundu.

## Word Family (WF) Çift Yönlü Uzlaştırma ve Substring Temizliği
- `lexemes.json` (`wordFamilyId`) ile `word_families.json` (`lexemeIds`) arasındaki **212** çapraz/çoklu aile çakışması daha spesifik kelime ailesi lehine çözümlendi (`WF-GU`: 1.399 → 1.310).
- Kök kimliği uyuşmayan **6** hatalı üyelik ve `L-GUAVA` gibi saf substring yanlış pozitifleri temizlendi.
- **493** kelime ailesinin `productivity.totalLexemes` sayacı gerçek üye sayılarıyla eşitlenerek **%100 çift yönlü simetri (0 uyumsuzluk)** sağlandı.
