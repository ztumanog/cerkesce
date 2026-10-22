# ADR-ROOTS-001: Dangling Root Referanslari Temizligi

## Durum
Kabul edildi. 22 Ekim 2026.

## Baglam
126 lexeme kaydi, roots.json'da artik bulunmayan 9 root ID'sine isaret ediyor.

Kirik ID'ler: R-BE, R-DEN, R-LHA, R-ME, R-NA, R-SY, R-SE, R-TEN, R-SHTE

## Dogrulama
HEAD~1'de 9 root'un tamami bos: form=null, primaryMeaning=null, source=cyr-to-lat-2026-10-12. Yani Kiril-Latin otomatik donusum artigi, sozluk degeri yok.

## Etki
R-LHA: ~110 kayit, digerleri: toplam ~16.

## Kritik bulgu
R-LHA iki turlu:
- Dogru: hel'in, tel'in, pyl'in (locative fiiller)
- Yanlis: televizor, sila, malo (fuzzy match hatasi)

## Karar
1. 9 root geri yuklenmeyecek (bos kayitlar).
2. 126 kayittan referans temizlenecek (yedek + denetim kaydi).
3. derivation alani bosalirsa silinmeyecek, rootIds=[] kalacak.
4. Ayri is (ADR-ROOTS-002): R-LHA locative fiiller icin yeni root (R-LHE), fuzzy match temizligi.

## Gerekce
Bos root'lar sozluk degeri tasimiyor. Referans butunlugu daha onemli. Locative fiillerin koku ayri is olarak korunmali.

## Uygulama
_scripts/roots_dangling_fix.py (dry-run + --apply + yedek)
