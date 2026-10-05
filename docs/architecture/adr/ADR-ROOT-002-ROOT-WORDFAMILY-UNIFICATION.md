# ADR-0024: Root + WordFamily Unification

**Durum:** ONERILDI
**Tarih:** 2026-10-04
**Ilgili ADR:** ADR-ROOT-001

## Baglam

Iki ayri dosya var:
- roots.json (65 kok)
- word_families.json (45 aile)

Sorunlar:
- 23 root'un ailesi yok
- 3 aile'nin root'u yok
- conceptIds cogunlukla bos

## Karar

1. word_families.json icerigi roots.json'a gomulecek
2. Her Root objesi kendi wordFamily'sini icerecek
3. word_families.json arsivlenecek
4. conceptIds lexemes.json'dan otomatik turetilecek
5. Root'u olmayan aileler icin minimal root olusturulacak
