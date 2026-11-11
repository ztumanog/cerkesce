# Backlog — TrackU10_ExecutiveUI Flaky Testi

Kaynak: Mimar Raporu 3 kabulu (11.11.2026). ADR-GOV-014 kapsamı dışı, ayrı iş.

## Durum

- Test: src/tests/infra/TrackU10_ExecutiveUI.test.ts
- Failing: Widget yapısı doğru + Overall status (ilk tam suit koşusunda 2 failed).
- İkinci koşuda: yeşil (212/212 dosya, 1048/1048 test).
- Sınıf: Flaky — ikinci çalıştırmada geçiyor tipinde.

## Neden Önemli

İkinci çalıştırmada geçiyor tipindeki testler uzun vadede CI güvenilirliğini düşürür.
ADR-GOV-014 CI pipeline'ını da gölgelememesi için ayrı takip edilmeli.

## Yapılacak

- [ ] Flaky kökü bul: zaman aşımı / sıralama / paylaşılan durum / deterministik olmayan beklenti.
- [ ] Testi deterministik hale getir veya karantinaya al, CI'da flaky olarak işaretle.
- [ ] 5 ardışık tam suit koşusunda yeşil doğrula.

## Güncelleme (11.11.2026)

- [x] ADR_INDEX'e GOV-014 eklendi — validator eksik/orphan görmeyecek.
- [ ] Kalan bacak 1: git log — execSync('git log') dubious ownership hatasında bazen başarısız.
  Çözüm: git çağrısını try/catch + timeout ile sar, başarısızlıkta boş log ile devam et (zaten catch var, ama hata çıktısı gürültü yapıyor).
- [ ] Kalan bacak 2: seeded bir kez — test sırasına bağlı.
  Çözüm: getView'u saf hale getir (seed'i dışarıdan al) veya testte seeded'i sıfırla / testi izole koştur.
- [ ] Doğrulama: 5 ardışık koşuda yeşil.
