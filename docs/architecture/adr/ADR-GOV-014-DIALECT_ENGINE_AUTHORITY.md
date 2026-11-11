# ADR-GOV-014: Dialect Engine Authority and Precedence

* **Status:** Accepted
* **Date:** 2026-11-11
* **Context:** Linguistic Governance & Dialect Transformation Engine

---

## 1. Context & Problem Statement

Çerkesçe lehçe dönüşüm sisteminde (Doğu / KBD ↔ Batı / ADY) kural tabanlı (rule-first) yaklaşım, kelime sonu ek kaymaları (-э, -ы), fonetik harf gölgelemeleri (ш vs шъ, щ vs щӀ) ve istisnai kök yapıları nedeniyle yalın kıyaslamalarda yüksek hata oranlarına yol açmaktaydı.

Huvaj lehçe veri kümesi (5,943 kelime çifti) üzerinde yapılan geniş çaplı doğrulama ve mimari iyileştirme çalışmalarında:
* Fonetik kural motorunun tek başına **otorite** olarak kullanılması reddedilmiş,
* Doğrulanmış sözlük verisi ve katı ters indeks çözümleyicilerinin kural motorundan önce çalışması gerektiği kanıtlanmıştır.

> **Kanıt Etiketi:** Kullanıcı beyanı *(5,943/5,943 Huvaj eşleşmesi ve 1,048/1,048 yeşil test sonuçları rapor özeti beyanına dayanmaktadır).*

---

## 2. Decision: Resolver-First Precedence Model

Lehçe dönüştürme motorunda (DialectConverter) tek yetkili çözümleme sırası **Resolver-First** mimarisi olarak tanımlanmıştır. Kural motoru hiçbir zaman doğrulanmış sözlük verisini geçersiz kılamaz.
[Girdi Kelime]
         │
         ▼
┌────────────────┐
│ 1. EXACT MAP   │ ──(Eşleşti)──► [Doğrudan Çıktı]
└───────┬────────┘
        │ (Eşleşmedi)
        ▼
┌────────────────┐
│ 2. REV MAP     │ ──(Eşleşti)──► [Doğrudan Çıktı]
└───────┬────────┘
        │ (Eşleşmedi)
        ▼
┌────────────────┐
│ 3. LEXICON     │ ──(Eşleşti)──► [Doğrudan Çıktı]
└───────┬────────┘
        │ (Eşleşmedi)
        ▼
┌────────────────┐
│ 4. RULE ENGINE │ ──(Fallback)─► [Tahmini Fonetik Çıktı]
└────────────────┘

>> └────────────────┘
---

## 3. Rejected Architectures

* **Rule Engine First (RULE ENGINE → LEXICON):** Fonetik kuralların sözlük verisini gölgelemesi nedeniyle reddedildi.
* **Pure Rule Engine (RULE ENGINE only):** Dil yapısındaki düzensiz istisnaları kapsayamadığı için reddedildi.

---

## 4. Governance & Integrity Rules

### 4.1. REV ∩ Lexicon Çelişki Testi
REV haritasındaki hiçbir kaydın LEXICON üzerindeki doğrulanmış veriyi gölgelemesine izin verilemez.

`	ypescript
// CI Zorunlu Doğrulama Kuralı
for (const key of Object.keys(REV)) {
  if (key in LEXICON) {
    expect(REV[key]).toBe(LEXICON[key]);
  }
}
4.2. CI/CD Benchmark & Eşik Politikası
Ölçüm Metodu: 5,943 Huvaj çiftinde 1'e N (Multi Accept) yöntemi esas alınır.

Kabul Eşiği:

ADY → KBD: 5,943 / 5,943 (%100) (Kanıt etiketi: Kullanıcı beyanı)

KBD → ADY: 5,943 / 5,943 (%100) (Kanıt etiketi: Kullanıcı beyanı)

Gerçek Yanlış (Real False Count): 0

REV ∩ Lexicon Çelişkisi: 0

CI Başarısızlık Politikası: Aksi durumda Exit Code = 1 döner ve build kırılır.
5. Standard Test Pipeline Execution Order
1. dialectConverter.test.ts          (Birim Fonetik Kurallar)
2. dialectHuvajMulti.test.ts          (1'e N Çoklu Kabul Benchmark)
3. dialectHuvajGeneralization.test.ts (Kural Kapsamı & Genelleme)
4. dialectRevLexiconConflict.test.ts  (REV ∩ Lexicon Çelişki Önleme)
6. Mimari Sonuç
Mimari Sonuç: ADR-GOV-014 ile lehçe dönüştürücüde otorite sırası kesinleşmiştir. Doğrulanmış bilgi kaynakları (EXACT, REV, LEXICON) kural motorundan üstün kabul edilir. Rule Engine artık birincil karar katmanı değil, yalnızca fallback katmanıdır. REV ∩ Lexicon çelişki testi ve benchmark CI entegrasyonu bu ilkenin teknik korumaları olarak kabul edilmiştir.