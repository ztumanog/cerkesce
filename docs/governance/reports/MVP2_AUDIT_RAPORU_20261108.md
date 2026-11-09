\# MVP-2 Audit Raporu - Latin Arama



\- Tarih: 08.11.2026

\- Tur: Teknik Denetim (Karar Degil)

\- Durum: Audit tamamlandi / Kod baslamadi



Bu rapor karar dosyasi degildir. Bulgular denetim ciktisidir.



\## Faz Durumu



\- MVP-1: Tamamlandi

\- MVP-1.1: Tamamlandi

\- MVP-2 Audit: Tamamlandi

\- MVP-2 Kod: Baslamadi

\- MVP-2: Mimar onayi bekliyor



\## Bolum 1 - Dosyalar



\### kiril\_latin\_cevir.py



Migration, arama degil.

lexemes.json icindeki wordFamilyId alanlarini ceviren tasima scripti.

Digraf yok.

Bilgi kaybi var: sert ve yumusak isaret siliniyor.

Y harfi cakismasi var.

Dosyayi calistirinca lexemes.json uzerine yaziyor.



\### ters\_translit\_hizli.py



Kirik ID teshisi, arama degil.

word\_families icindeki kirik ID leri bulmak icin yazilmis.

TERS listesi var: gh, 1e, 1 gibi karsiliklar var.

Kesme isareti siliniyor, palochka sayilmiyor.

Uclu harf gruplari yok.

Turkce klavye harfleri yok.



\### kiril\_to\_latin.py



Test yamasi, sistem degil.

6 satir. Tek isi test dosyasindaki palochkayi I yapmak.

Sistem degil.



\### kiril\_ipa\_haritasi.py



IPA haritasi.

PDF ten cikarilmis kesin harita.

Aramada kullanilamaz, kullanici IPA yazmiyor.

Ama tek dogru ilke burada: Cift harfler uzun once taranmali.



\## Bolum 2 - Standart Eksikligi



word\_form\_mapping transliterasyon sistemi degil.

Ortada transliterasyon sistemi yok.



Fiili standart yok. 3 ayri yazim catisiyor:

\- Migration: palochka -> I, H -> KH

\- Teshis: g -> gh, e -> 1e, palochka -> 1

\- IPA: farkli ses isaretleri



Kullanici gu yazarsa ne olacagi hicbir dosyada tanimli degil.



\## Bolum 3 - Cakismalar



\- kh -> h mi, k mi?

\- h -> h mi, hy mi?

\- c -> c mi, ch mi?

\- kesme -> silinsin mi, palochka mi olsun?

\- 1 -> palochka mi, rakam mi?

\- y -> y mi, i mi?

\- e -> e mi, e mi?

\- sh -> s mi, ss mi?



Ilke: En uzun eslesme once taranacak.



\## Bolum 4 - Onerilen Secenek C



Kullaniciya soyle yaz dayatilmiyor.

normalize katmani coklu yazimi kabul edip tek Kiril e cevirecek.



\- gu = gu

\- g = gh, g

\- ghu = ghu, gu

\- k = q, kh

\- palochka = kesme, 1, I

\- s = sh, s

\- ch = ch, c

\- i = i, y



Akis: kullanici -> gu -> normalize -> gu -> api/search

Yeni route yok: api/search-latin acilmayacak.



\## Bolum 5 - Acik Kararlar



\### KARAR 15 (Henuz Uygulanmayacak)



Latin arama icin Coklu yazimi kabul et yaklasimi tercih edilecek.



Ornek:

s = sh = s

ch = ch = c

palochka = kesme = 1 = I



Ancak kodlama baslamadan once g, k, h, hy, palochka, i icin test tablosu hazirlanacak.

Test tablosu hazirlanmadan MVP-2 kodu baslamayacak.



Bekleyen onaylar:

\- Secenek C onaylanacak mi?

\- kh / h / c cakismalari icin test tablosunu kim hazirlayacak?

\- normalize katmani api/search icinde mi, ayri modulde mi?

\- 1 rakami palochka mi, ID parcasi mi?



\## Ek - Inceleme Yontemi



Dosyalar PowerShell ile bulundu.

Icerik Thonny ile salt-okunur okundu.

kiril\_latin\_cevir.py calistirilmadi, calistirilsa lexemes.json uzerine yazardi.

Veri degistirilmedi.



\## Test Tablosu - KARAR 15 Oncesi



Bu tablo kod baslamadan once doldurulacak.

Mimar onayi olmadan kod yazilmayacak.



Harf 1 - g

\- Yazim 1: gh

\- Yazim 2: g harfi

\- Soru: gh mi, g mi?

\- Karar: Bos



Harf 2 - k

\- Yazim 1: q

\- Yazim 2: kh

\- Soru: kh, h mi, k mi?

\- Karar: Bos



Harf 3 - h

\- Yazim 1: h

\- Yazim 2: hy

\- Soru: h tek basina h mi, hy mi?

\- Karar: Bos



Harf 4 - hy

\- Yazim 1: hy

\- Yazim 2: h

\- Soru: hy ayri harf mi?

\- Karar: Bos



Harf 5 - palochka

\- Yazim 1: kesme

\- Yazim 2: 1

\- Yazim 3: I

\- Soru: hepsi kabul edilsin mi?

\- Karar: Bos



Harf 6 - i

\- Yazim 1: i

\- Yazim 2: y

\- Soru: y, i mi, y mi?

\- Karar: Bos



Not: En uzun eslesme once taranacak.

