# FAZ C-10.1 KAPANIS RAPORU

**Tarih:** 2026-09-30
**Durum:** TAMAMLANDI
**Sure:** 1 gun

## Ozet

C-10.1 Corpus Genisletme hedefleri:
- Bulunmayan 40 lexeme analiz edildi
- 14 lexeme bulundu (5 tam + 9 prefix)
- 4 yeni lexeme eklendi
- 7 turev eklendi
- 5 kavram agi genisletildi

## Metrikler

| Metrik | C-9 Sonu | C-10.1 Sonu | Delta |
|--------|----------|-------------|-------|
| Lexeme | 240 | 244 | +4 |
| Frekansli | 184 | 193 | +9 |
| Sozluk kanitli | - | +5 | +5 |
| Turev | - | +7 | +7 |
| Test | 233 | 237 | +4 |

## Bulunan Lexeme'ler (14)

### Tam Esleme (5)
- L-PSEK1UED (псэкӀуэд) KBD=5
- L-PSE1UX (псэӀух) KBD=4
- L-PSYZHY (Псыжь) KBD=22
- L-PSYXUABE (Псыхуабэ) KBD=4
- L-NEF1 (нэфӀ) KBD=294

### Prefix Esleme (9)
- L-PSEBYDE (псэбыдэ) KBD=2
- L-DZEGHUE (дзэгъуэ) KBD=2
- L-NEF1EGU (нэфӀэгу) KBD=15
- L-K1UIBLY (къуиблы) ADY=1

## Yeni Lexeme'ler (4)
- L-GUK1EGHUNSHE (гукӀэгъуншэ) - merhametsiz
- L-UZYN (узын) - acimak
- L-SHYSKHYN (щысхьын) - esirgemek
- L-SHHASYN (шъхьасын) - esirgemek

## Kavram Agi

### Merhamet
- гукӀэгъу (5 sozluk)
- гукӀэгъуншэ (4 sozluk)
- гу егъун, гу щӀэгъун, гу хущӀэузын

### Esirgemek
- щысхьын (2 sozluk)
- шъхьасын (2 sozluk)
- хъумэн, къэухъумэн, ухъумэн

## Mimar Katkisi

### Palochka Normalizasyonu
8 karakter -> U+04C0:
1, i, I, l, ӏ, ', ', `

### Prefix Aramasi
w.startswith(form) ile 9 lexeme bulundu

### Sozluk Kaniti
5 kaynak ile kavram agi genisletildi

## Commit

4d4123f Faz C-10.1: esirgemek kavram agi
5000022 Faz 6 Gate kapanis + C-10.1 analizi

## Sonuc

C-10.1 basariyla tamamlandi.
Kapsam: %28.6 -> %35
Lexeme: 240 -> 244

## Sonraki Adim

C-10.2 DialectConverter 2.0
