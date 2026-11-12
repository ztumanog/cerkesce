# Dialect Benchmark Açıklaması

**Tarih:** 2026-11-12
**Durum:** Referans
**Sınıf:** Kurumsal bilgi (alarm değil)
**Kanıt etiketi:** Kullanıcı beyanı (kod incelemesi + test çıktısı)

## Soru

Neden dialectHuvajMulti ve dialectHuvajGeneralization %100 iken,
dialectBulk (68) ADY->KBD %91.2 / KBD->ADY %70.6?

## Cevap — 3 Fark

### Fark 1: Doğrulama Yöntemi

- dialectHuvajMulti ve dialectHuvajGeneralization: Kabul kümesi (1'e N). Motor çıktısı, birden çok geçerli varyanttan biri ise doğru.
- dialectBulk: Birebir string eşitliği. Motor çıktısı = beklenen tek string olmalı.
- dialectHuvajBulk: Normalize edilmiş birebir eşitlik. norm() fonksiyonu uygulanıyor.

### Fark 2: Ölçüm Kapsamı

- Huvaj testleri: Motorun kendi lexiconuyla döngüsel tutarlılık.
- dialectBulk: Lexicon dışı bağımsız genelleme testi.

### Fark 3: Normalleştirme

- dialectBulk: Yok (ham string).
- dialectHuvajBulk: Var (norm()).
- Huvaj Multi/Generalization: Kabul kümesi (normalleştirmeden de esnek).

## Karşılaştırma Tablosu

| Test | Kapsam | Doğrulama | Normalizasyon | Skor |
|---|---|---|---|---|
| dialectHuvajMulti | 1500 Huvaj çifti | Kabul kümesi | Gerekmez | %100 |
| dialectHuvajGeneralization | 4443 Huvaj çifti | Kabul kümesi | Gerekmez | %100 |
| dialectHuvajBulk | 1500 çift | Birebir | norm() var | %99.4 / %99.0 |
| dialectBulk | 68 çift | Birebir | Yok | %91.2 / %70.6 |

## Neden dialectBulk Düşük

1. En katı doğrulama yöntemi (birebir string eşitliği)
2. Normalizasyon yok
3. En küçük ve en heterojen örneklem (68 çift)
4. Çok anlamlılık, lexeme varyantı ve yön belirsizliği gibi gerçek dilbilimsel zorluklarla yüzleşir

Bu tasarım tercihidir, bug değil. Huvaj testleri modelin kendi lexiconundaki tutarlılığını gösterir; dialectBulk gerçek genellemeyi gösterir.

## Sonuç

- Kurul kabul ölçütü 5943 (Huvaj 1'e N).
- dialectBulk referans olarak kalır.
- Skoru yükseltmek onaylanmış iş değildir.
- DialectConverter iyileştirmesi başlatılmaz.

## Değişiklik Geçmişi

- 2026-11-12: İlk oluşturma. Kod incelemesi sırasında dialectHuvajBulk'un norm() kullandığı, dialectBulk'un kullanmadığı tespit edildi. Bu, %99 vs %91 farkının ana sebebidir.
