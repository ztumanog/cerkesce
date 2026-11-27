# ADR-ROOTS-006: Wiki Kalıntısı Temizliği (Faz A + Faz B)

**Durum:** ACCEPTED (CLOSED — 571/571 kayıt, 0 kalan artık)
**Tarih:** 2026-11-26
**Kategori:** Linguistic Data Hygiene
**Onay:** Baş Mimar (2026-11-26)
**Etkilenen:** `public/data/linguistic/lexemes.json`, `scripts/validate-linguistic.mjs`

---

## Bağlam

`public/data/linguistic/lexemes.json` (`41.462` kayıt) taramasında Wiktionary kaynaklı Wiki işaretleme kalıntıları 3 ayrı risk sınıfında tespit edildi:

1. **Kategori A (`examples` — `140` kayıt):** `wikitab` tablo başlıkları/satırları (`139` kayıt + `1` bölüm başlığı `L-VERIFIED-01013`), sayfa ayırıcılar (`! !! !! нап. ...`), hücre belirteçleri (`[|Ӏ]{2}`) ve `''`.
2. **Kategori B (`examples` — `420` kayıt, `6` A∩B ortak):** `{{тхыгъэ}}`, `{{автор}}`, `{{гуэрэн}}`, `{{зэпхахэр}}` şablonları ve şablon başı `*`.
3. **Kategori C (`translations` / `senses` — `17` kayıt):** `[[...]]` / yarım Wiki bağlantıları (`16` `markup-only`) ve `{{псалъащхьэ}}` (`1` `semantic`: `L-WIKT-KBD-32631`).

---

## Karar

Risk ayrımı gereği temizlik iki fazda, otomatik anlam üretimi olmadan uygulandı:

1. **Faz A (`554` `examples` kaydı):** `translations` ve `senses` alanlarına dokunulmadan Kategori A + B kalıntıları temizlendi (`commit 0d80552`).
2. **Faz B — Markup-Only (`16` kayıt):** İnsan incelemesi sonrası yalnızca Wiki sözdizimi içeren `16` kaydın `translations`/`senses` alanları temizlendi (`commit cc809d0`).
3. **Faz B — Semantic (`L-WIKT-KBD-32631` / `хъуэкӀуэн`):** `senses[0].en` içindeki `"{{псалъащхьэ}}"` alanı, yeni anlam uydurmak yerine kaydın kendi `translations.en` değeri olan `"graze, pasture (of livestock)"` ile hizalandı (`commit c2b6325`).

---

## Sonuçlar & Doğrulama

- **Toplam Temizlenen Benzersiz Kayıt:** `571` (`554` `examples` + `17` `translations`/`senses`)
- **Temizlik Sonrası Artık Taraması (`41.462` lexeme):** `wikitab = 0`, `{{`/`}} = 0`, `[[`/`]] = 0`, `'' = 0`
- **Validator (`npm run validate:data`):** `15/15 PASS` (`41462 lexeme, 3670 root`)

---

## Kapanış Notu (Baş Mimar, 2026-11-26)

| Alan | Değer |
|---|---|
| **Amaç** | Wiki kaynaklı markup kalıntılarının lexeme veri katmanından temizlenmesi |
| **Sonuç** | `571` lexeme temizlendi (Faz A: 554 · Faz B-A: 16 · Faz B-B: 1) |
| **Kalan** | `0` |
| **Validator** | `15/15 PASS` |
| **Durum** | **CLOSED** — aktif backlog'dan çıkarıldı |

**Kanıt etiketi:** Kullanıcı beyanı (Baş Mimar kapanış kararı).

**Korunan yönetişim ilkesi:** Wiki markup temizliği, anlam üretiminden ayrı tutuldu. Sprint boyunca *markup temizliği → otomatik*, *anlam değişikliği → insan kararı* ayrımı korundu; bu ayrım gelecekteki veri hijyeni çalışmaları için emsal oluşturur.

**Kapanış sonrası açık mimari kuyruk (Baş Mimar, 2026-11-26):**

- ADR-ROOTS-007 — Legacy conceptIds yaşam döngüsü
- ADR-ROOTS-008 — `472` wordFamily'siz root denetimi
- Apazhev eksik yönlendirmeler
- Hakunov botanik
- KMOKSY kuş adları
