# ADR-GOV-016 Mockup Değerlendirme ve Tasarım Arşivi

**Tarih:** 2026-11-26
**Kaynak:** Meta AI'da üretilen "Adr Gov 016 Yonetisim" POC artefaktı (kullanıcı paylaşımlı, oturum kaydında)
**Baş Mimar kararı:** İskelet ✅ KABUL · Mimari ✅ KABUL · Veri ❌ RED · Metrikler ❌ PLACEHOLDER

---

## Kabul Edilen Tasarım Kararları (gerçek uygulamaya taşındı)

| Öğe | Uygulamadaki karşılığı |
|---|---|
| Özet kartları (sol kenar renk şeridi: yeşil/kırmızı) | `veri-sagligi/page.tsx` — sayım + bütünlük kartları |
| Doluluk progress çubukları (renk başına metrik) | `veri-sagligi/page.tsx` — WF/root/AR/concept/örnek doluluk |
| Açılır denetim grupları (sayaç + "listeyi gör") | `kok-denetimi` / `kavram-denetimi` — `<details>` satır içi genişletme |
| Uyarı renk dili (emerald/amber/rose) | Üç ekranın kart ve kenar şeritleri |
| "JSON'dan okunuyor" rozeti | Üç ekranın başlık rozeti (RULE-01'in görünür işareti) |
| Akış şeması: CLI Script → JSON Raporu → UI (salt okunur) | ADR-GOV-016 Kurallar bölümü + `scripts/report-governance.mjs` |
| Salt-okunur notu ("düzeltme butonu yok, düzeltmeler kaynak veriye aittir") | Her ekranda "Salt okunur" rozeti; derin bağlantı v1 gereksinimi, POC'ta yok |

## Red Edilenler (nedeniyle)

- **Tüm sayılar placeholder'dı** (RULE-02 ihlali): Lexeme 41.472 (canlı veri 41.472 çıktı — tesadüf, o an paralel kürasyon +10 kayıt eklemişti), Concept doluluk %86,5/5.598 boş (gerçek: %99,96/15 boş), Kırık İlişki 128 (gerçek: 0), Çakışan ID 17 (gerçek: 0), Legacy Kökler 412 (kaynaksız).
- **Metrik adı hatası:** "Boş Kökler 7.063" → doğrusu "rootId boş lexeme 7.063"; boş/üyesiz kök ayrı metrik (gerçek üyesiz kök: 5).
- **Örnek kayıt ID'leri** (`LEX-004218`, `ROOT-00112`, `REL-00084`, `ID-000317`) gerçek şemayla (`L-*`, `R-*`, `WF-*`) uyuşmuyordu.

## Not

Mockup'ın tam HTML artefaktı oturum kaydında durmaktadır; repo'ya yalnızca bu tasarım kararı özeti alındı. Ekranın çalışır hali gerçek veriyle `/admin/yonetim/veri-sagligi`, `/admin/yonetim/kok-denetimi`, `/admin/yonetim/kavram-denetimi` adreslerindedir.
