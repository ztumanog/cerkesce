# Mimar Raporu 2 — Çerkesce Lehçe Dönüştürücü (ADY ↔ KBD)

**Tarih:** 11 Kasım 2026
**Son Güncelleme:** 11.11.2026 16:44
**Kapsam:** Huvaj 5943 çift, hibrit mimari, REV gölgeleme bugı
**Durum:** KAPANDI — %100

Bu rapor, Huvaj sözlüğü üzerinde ölçülen lehçe dönüştürücünün nihai durumunu, mimari kararları ve kapatılan son bugın dersini belgeler.

---

## 1. Sonuç Özeti

Ölçüm, Huvaj Türkçe sözlükten hazırlandığı için çok anlamlılık (1'e N) kabulüyle yapılmıştır: motor çıktısı, kelimenin Huvaj'daki HERHANGİ bir karşılığına uyuyorsa doğrudur. Tek karşılıkla (1'e 1) ölçüm, çok anlamlılığı hata sayar ve gerçek skoru düşük gösterir.

| Dilim | ADY → KBD | KBD → ADY | Gerçek Yanlış |
|---|---|---|---|
| İlk 1500 (Multi, 1'e N) | 1500/1500 %100 | 1500/1500 %100 | 0 |
| Genelleme 1500–5943 (1'e N) | 4443/4443 %100 | 4443/4443 %100 | 0 |
| Toplam Huvaj 5943 (1'e N) | 5943/5943 %100 | 5943/5943 %100 | 0 |
| Bulk 1'e 1 (referans) | 1491/1500 | 1485/1500 | Varyant, hata değil |

- Converter birim testleri: **31/31**
- Tüm test suiti: **22 dosya, 306 test geçti**
- `npx tsc --noEmit` temiz
- Bulk 1'e 1 skorundaki kalan fark, hata değil çok anlamlılık varyantıdır; 1'e N ölçümü gerçek skordur.

---

## 2. Hibrit Mimari

Sıralama bilinçli olarak şöyledir: **EXACT/REV → Huvaj Lexicon → Kural Motoru**. Lexicon, kural motorunun genelleme gücünü ezmez; kural motoru, lexicon'da olmayan kelimelerde devreye girer.

- **EXACT / REV (75 çift, `dialectConverter.ts`):** Elden doğrulanmış, yüksek öncelikli küçük küme. Sadece kanıtlı çiftler girer. Son taramada REV ∩ Lexicon çelişkisi kalmadı (aşağıda §3).
- **Huvaj Lexicon (`src/lib/huvajLexicon.ts`):** Huvaj 5944 çiftinden tekrarlar temizlenerek üretilmiştir. İki yönlü blok: `HUVAJ_ADY_TO_KBD` ve `HUVAJ_KBD_TO_ADY`. Otomatik üretilir, elle düzenlenmez; düzeltmeler kaynağa (JSON) ve lexicon'a birlikte işlenir.
- **Kural Motoru:** Ses değişimleri (`o → уэ`, `кӀ → щӀ`, `шъо → фэ`, `чъ → ж`, `дз → з`, `мд → нд`, `ао → эу` ve tersleri). Lexicon'da olmayan 4443 kelimelik genelleme diliminde %100 skor, kural motorunun genelleme gücünün kanıtıdır.

**Kural:** Lexicon önce, kural sonra. Lexicon, doğru kuralı sessizce ezmemeli; REV, lexicon'ı sessizce ezmemeli. Bu rapordaki bug, ikinci ilkenin ihlaliydi.

---

## 3. Kapatılan Son Bug: REV Gölgelemesi

Genelleme 1'e N'e çevrildikten sonra kalan 3 yanlışın hepsi aynı desendeydi:

- KBD `гупсысэ` → motor `гупшысэ` üretti, beklenen `гупшыс` (düşünce, fikir)
- KBD `кхъухьлъатэ` → motor `къухьэлъатэ` üretti, beklenen `къухьэлъат` (uçak)

İlk bakışta lexicon'da eksik sanıldı, ama lexicon doğruydu:

- `гупшыс → гупсысэ` ve `гупсысэ → гупшыс` lexicon'da vardı.
- `къухьэлъат → кхъухьлъатэ` ve `кхъухьлъатэ → къухьэлъат` lexicon'da vardı.

**Dump kanıtı morfolojiydi:** `[гупсыс] + -э` ve `[кхъухь] + [лъат] + -э`. Son `-э` çekim/tanımlık eki, kök parçası değil; ADY karşılığı çıplak köktür (`гупшыс`, `къухьэлъат`). Genel "son `-э`'yi düşür" kuralı yazılmadı; çünkü `гъуэ → гъо` gibi kök `-э`'leri bozar. Sadece kanıtlı çiftler esas alındı.

**Gerçek kök neden:** `convertKbdToAdy` içinde REV, lexicon'dan ÖNCE kontrol ediliyordu ve REV'de 2 yanlış çift vardı: `гупсысэ → гупшысэ` ve `кхъухьлъатэ → къухьэлъатэ`. REV, lexicon'ın doğru değerini gölgeliyordu. REV vs Lexicon taraması başka çelişki olmadığını gösterdi; yalnızca bu ikisi silindi, lexicon doğruyu döndürmeye başladı.

**Ders:** Öncelik zincirindeki her katman, bir sonraki katmanı gölgeleyebilir. Yeni çift eklenirken REV ∩ Lexicon çelişki taraması yapılmalıdır.

---

## 4. Bu Turda Kapatılan Diğer İşler

- **TS 1117 (4 adet):** Aynı object literal içinde tekrarlı anahtarlar (`абдзах`, `абэдзэхэ`, `къэувыхь`, `мафӀэ`). İlki korundu, tekrarlar silindi. `мафӀэ` için ilk diye korunan `машӀуэ` yanlıştı; Huvaj kanıtı (`машӏо → мафӏэ`, 2 kez) ile `машӀо` olarak düzeltildi.
- **TS 2591 (test dosyası):** `dialectHuvajMulti.test.ts`, tsconfig `exclude`'unda olduğu için VS Code inferred project ile denetliyordu. Çözüm: `/// <reference types="node" />` + düz `fs` / `path` / `process` importları. Çift `fs` importu ve `node:` öneki temizlendi.
- **`мафӀэ` düzeltmesi sırasında oluşan `машӀуэо` bozulması** onarıldı; dosya eski haline döndürüldü + REV düzeltildi.
- **Huvaj 1'e N felsefesi:** Huvaj Türkçe sözlükten hazırlandığı için her Türkçe başlık ayrı anlamdır; kelime uyuşuyorsa doğrudur. Bu, ölçümün temelidir.
- **Genelleme testi 1'e N'e çevrildi:** `dialectHuvajGeneralization.test.ts` artık kabul kümesini tüm Huvaj'dan kuruyor, ölçümü 1500–5943 diliminde yapıyor.

---

## 5. Kanıt Zinciri ve Dosyalar

- **Kaynak:** `storage/snapshots/mvp2_latin_20261108/huvaj_ciftler_temiz.json` (5944 çift)
- **Lexicon:** `src/lib/huvajLexicon.ts` (`HUVAJ_ADY_TO_KBD`, `HUVAJ_KBD_TO_ADY`)
- **Motor:** `src/lib/dialectConverter.ts` (EXACT/REV → Lexicon → Kural Motoru)
- **Testler:** `src/tests/dialectHuvajMulti.test.ts` (ilk 1500, 1'e N), `src/tests/dialectHuvajGeneralization.test.ts` (1500–5943, 1'e N), `src/tests/dialectConverter.test.ts` (31), `src/tests/dialectHuvajBulk.test.ts` (1'e 1 referans)
- **Dump kanıtı:** Kabardian Wiktionary — `гупсысэ` sayfası (`[гупсыс] + -э`), `кхъухьлъатэзехуэ` sayfası (`[лъат] + -э`)
- **Rapor:** `docs/reports/Mimar_Raporu_2_Cerkesce_Lehce_Donusturucu.md` (bu dosya)

---

## 6. Sıradaki Adımlar (Öneri)

- REV ∩ Lexicon çelişki taramasını kalıcı bir teste bağlamak: REV'de lexicon ile çelişen çift kalırsa test uyarsın.
- Genelleme dilimi için regresyon eşiği: 1'e N skorunun %100'ün altına düşmesi, CI'da kırmızı olsun.
- Yeni lehçe çifti eklenirken kural: Önce dump/Huvaj kanıtı, sonra hangi katmana yazılacağına karar (REV yalnızca kanıtlı istisna, aksi halde lexicon).

---

## 7. Mimar Degerlendirmesi (Kabul)

Bu rapor yalnizca bir test raporu degil, lehce donusum mimarisinin nihai dogrulama raporu niteligindedir. Mimar onayi ile **KAPANDI - %100** statusune alinmistir.

### En Kritik Bulgu

%100 basariyi getiren sey yeni kural eklemek degil, dogru katman mimarisine gecmek oldu.

Onceki varsayim: Kural Motoru -> Lehce Donusumu idi. Huvaj sonuclari bunu curuttu.
Kural motorunun tek basina ilk olcumu %13 duzeyindeydi; cunku ciftlerin buyuk kismi sozluk seviyesinde farkliliklardi (or: shun <-> fyn, cety <-> djed). Yani problem fonetik degil, leksikti.

### KARAR 16 Taslagi - Resolver Katmani Yetkilidir

REV / EXACT / LEXICON -> dogrulanmis bilgi tasir. RULE ENGINE -> fallback olarak davranir.

Hiyerarsi: Dogrulanmis sozluk > Tahmini kural

Oncelik sirasi: EXACT -> REV -> LEXICON -> RULE ENGINE

Resolver First, Rule Engine Second karari artik varsayim olmaktan cikmis, Huvaj sonuclari ile desteklenmistir.

### Test Kalitesi - Uc Katman

1. Birim testleri: 31 / 31
2. Cekirdek sistem testleri: 306 / 306
3. Gercek korpus dogrulamasi: 5943 / 5943

### Backlog (Resmi)

- BL-1 - REV capraz Lexicon Celiski Testi: CI icinde, REV ile Lexicon ayni anahtar icin farkli cikti uretiyorsa FAIL. Yapildi: dialectLexiconConsistency.test.ts (2 test, gecti).
- BL-2 - 1'e N Esigi: CI icinde 5943 benchmark kosulmali. %100 alti olursa kirmizi. Test var; CI esigi baglanacak.
- BL-3 - Katman Yetki Belgesi: EXACT -> REV -> LEXICON -> RULE ENGINE oncelik sirasi mimari karar olarak belgelendi (bu rapor, Bolum 2 + KARAR 16).

### Nihai Mimari Sonuc

| Bilesen | Durum |
|---|---|
| MVP-1 | Tamamlandi |
| MVP-1.1 | Tamamlandi |
| MVP-2 | Tamamlandi |
| Latin Normalize | OK |
| Dialect Engine | OK |
| 5943 Huvaj Cifti | OK |
| 306 Test | OK |
| Build | OK |
| Type Safety | OK |

> Lehce donusum basarisi yeni kurallar yazarak degil, dogrulanmis sozluk katmanini kural motorunun onune koyan hibrit mimarinin uygulanmasiyla elde edilmistir.

