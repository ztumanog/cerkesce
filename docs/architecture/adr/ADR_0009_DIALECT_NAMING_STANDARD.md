# ADR-0009: Dialect Naming Standard

- Status: ACCEPTED
- Date: 2026-09-17
- Layer: Domain / All

## Context
Kod tabanında ve test verilerinde lehçe tanımlarının standartlaştırılması gerekmektedir.

## Decision
- KBD = Kabardeyce
- ADY = Adığece
- DOGU = DEPRECATED
- BATI = DEPRECATED

Yeni geliştirilen hiçbir kod, fixture, repository, service, DTO ve test içerisinde DOGU veya BATI kullanılamaz; yalnızca KBD ve ADY geçerlidir.