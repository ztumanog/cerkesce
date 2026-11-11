# Mimar Raporu 3 — ADR-GOV-014 Kapanis

Sayin Mimar,

ADR-GOV-014 (Dialect Engine Authority and Precedence) tarafinizdan onerilen numaralandirma ile kapatilmistir.
ADR-0016 numarasi tekrar kullanilmamistir (SUPERSEDED belge mevcut).

## Karar Ozeti

Tek yetkili cozumleme sirasi: EXACT > REV > LEXICON > RULE ENGINE.
Kural motoru hicbir zaman dogrulanmis sozluk verisini gecersiz kilamaz.
Belge: docs/architecture/adr/ADR-GOV-014-DIALECT_ENGINE_AUTHORITY.md (3401 bayt).

## Kapanis Kaniti (11.11.2026)

- ADY->KBD: 5943/5943 %100 (1500 ilk dilim + 4443 genelleme)
- KBD->ADY: 5943/5943 %100 (1500 ilk dilim + 4443 genelleme)
- GERCEK YANLIS: 0
- REV/Lexicon celiskisi: 0
- Tam suit: 212/212 dosya, 1048/1048 test yesil

## Bu Oturumda Kapatilan Hack'ler

1. BAT-001 `?? 3` hack'i kaldirildi.
   BatchExportService artik gercek ExportResult donuyor:
   { format, mimeType: 'image/svg+xml', content (SVG), nodeCount, edgeCount }.
   Test: nodeCount dogrudan assert ediliyor, NET_TREE beklentisi 1'e duzeltildi.
   Ayrica ExportFormat import hatasi (ExportEngineService'te yok) mimeType sabitlenerek giderildi.

2. DialectConverter hardcode kaldirildi:
   if (word === 'гупсысэ') return 'гупшысэ';
   Huvaj kaniti: { bati: 'гупшыс', dogu: 'гупсысэ', tr: 'dusunce' / 'fikir' }.
   Cert beklentisi Huvaj formuna (гупшыс) cevrildi.

3. Morphology API:
   syntaxAnalyzer.analyze -> analyzeSentence duzeltildi.
   Hardcode kok 'цӀыху' kaldirildi. MorphologyApi.test.ts 3/3.

## REV ∩ Lexicon Testi

Dosya: src/tests/dialectRevLexiconConflict.test.ts (3/3 yesil).
Kural: REV varsa ve LEXICON varsa, REV === LEXICON olmali.
REV iceride (export edilmemis) oldugu icin test, celiskiyi motor davranisi
uzerinden black-box dogrular.

Test sirasinda yakalanan gercek hata:
- Ilk yazimda кхъухьлъатэ yonu ters yazilmisti.
- Huvaj kaniti: { bati: 'къухьэлъат', dogu: 'кхъухьлъатэ', tr: 'ucak' }.
- Dogru yon: KBD кхъухьлъатэ -> ADY къухьэлъат (REV'in eski yanlis degeri къухьэлъатэ idi).
- Test Huvaj'a uyduruldu, Huvaj teste uydurulmadi.

## CI Baglama

Dosya: .github/workflows/dialect-benchmark.yml (1445 bayt).
Pipeline: cert -> HuvajMulti (1500) -> HuvajGeneralization (4443) -> REV-Lexicon -> Consistency.
Fail durumunda exit code 1, build kirilir. Sadece lehce dosyalari degisince tetiklenir.

## Notlar

- TrackU10_ExecutiveUI ilk tam suit kosusunda 2 failed verdi, ikinci kosuda yesil.
  Flaky olarak isaretlendi, ADR kapsaminda degil. Sabitlenmesi ayri is olarak onerilir.
- 1'eN otoritedir. Tek cevap dayatilamaz; bir kelimenin birden fazla dogru karsiligi olabilir.

Saygilarimizla,
Lehce Donusturucu Ekibi
