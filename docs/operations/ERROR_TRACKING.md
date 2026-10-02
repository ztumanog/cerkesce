# ERROR TRACKING

**Faz:** 8.1.3
**Tarih:** 2026-10-02
**Referans:** ADR-GOV-007

## 1. Amac

Uygulamada olusan hatalari:
- Merkezi olarak yakala
- Siniflandir (severity)
- Logla
- Raporla

## 2. Bilesenler

| Bilesen | Konum | Gorev |
|---------|-------|-------|
| ErrorTracker | src/infrastructure/errors/errorTracker.ts | Hata kaydetme |
| errorHandler | src/infrastructure/api/middleware/errorHandler.ts | Express middleware |

## 3. Error Severity

| Seviye | Aciklama | Aksiyon |
|--------|----------|---------|
| low | Bilgi | Log |
| medium | Uyari | Log + Izle |
| high | Hata | Log + Alarm |
| critical | Kritik | Log + Alarm + Bildirim |

## 4. Kullanim

Manuel kayit:

    import { ErrorTracker } from '@/infrastructure/errors/errorTracker';

    ErrorTracker.track(new Error('Something failed'), {
      severity: 'high',
      code: 'PAYMENT_001',
      context: { userId: 'abc' },
    });

Express middleware:

    import { errorHandler } from '@/infrastructure/api/middleware/errorHandler';

    app.use(errorHandler);

## 5. Kisayollari

    import { ErrorTracker } from '@/infrastructure/errors';
    import { errorHandler } from '@/infrastructure/api/middleware/errorHandler';

## 6. Kisisel Veri Korumasi

ErrorTracker ASLA su verileri loglamaz:
- Kullanici sifresi
- Token / JWT
- Kredi karti
- TC kimlik

Context'e sadece ID/reference eklenir.

## 7. Depolama

- Memory: Son 100 hata (in-memory)
- Console: dev'de console.error
- Production: Sentry/OpenTelemetry (Phase 8.3)

## 8. Test

    npm test -- src/tests/infra/Phase8_1_3_ErrorTracking.test.ts

## 9. Referanslar

- ADR-GOV-007
- docs/operations/SECRET_MANAGEMENT.md

**Son Guncelleme:** 2026-10-02
