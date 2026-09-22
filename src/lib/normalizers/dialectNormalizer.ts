/**
 * @file src/lib/normalizers/dialectNormalizer.ts
 * @description ADR-P2-009: Canonical Dialect Filtering
 *
 * Farklı veri kaynakları aynı lehçeyi farklı şekillerde temsil eder:
 *   - ADY / western / Batı / Adigece  → ADY
 *   - KBD / DOGU / Kabardeyce         → KBD
 */

export type CanonicalDialect = 'ADY' | 'KBD' | 'UNKNOWN';

export function normalizeDialect(dialect?: string | null): CanonicalDialect {
  if (!dialect) return 'UNKNOWN';

  const value = String(dialect).trim().toUpperCase();

  // ADY (Batı / Adıgece)
  if (
    value === 'ADY' ||
    value === 'WESTERN' ||
    value === 'BATI' ||
    value === 'BATİ' ||
    value === 'ADIGECE' ||
    value === 'ADIGE' ||
    value === 'ADIĞECE' ||
    value === 'ADIGHE'
  ) {
    return 'ADY';
  }

  // KBD (Doğu / Kabardeyce)
  if (
    value === 'KBD' ||
    value === 'DOGU' ||
    value === 'DOĞU' ||
    value === 'KABARDEY' ||
    value === 'KABARDEYCE' ||
    value === 'KABARDIAN'
  ) {
    return 'KBD';
  }

  return 'UNKNOWN';
}

export function dialectDisplayName(canonical: CanonicalDialect): string {
  switch (canonical) {
    case 'ADY':
      return 'Batı (Adıgece)';
    case 'KBD':
      return 'Doğu (Kabardeyce)';
    default:
      return 'Bilinmiyor';
  }
}
