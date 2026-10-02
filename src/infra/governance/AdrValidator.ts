import fs from 'fs';
import path from 'path';

export interface AdrValidationResult {
  totalIndexed: number;
  totalPhysical: number;
  missing: string[];
  orphaned: string[];
  duplicates: string[];
  status: 'ok' | 'warning' | 'error';
  timestamp: string;
}

export class AdrValidator {
  private static adrDir = path.resolve('./docs/architecture/adr');
  private static indexFile = path.resolve('./docs/architecture/adr/ADR_INDEX.md');

  static validate(): AdrValidationResult {
    const indexRows = this.parseIndex();
    const physical = this.getPhysicalAdrs();

    const physicalNorm = new Set(physical.map(p => p.toUpperCase()));

    // ADR_INDEX'teki her satir icin fiziksel dosya var mi?
    const missing: string[] = [];
    const indexedCanonical: string[] = [];
    for (const row of indexRows) {
      indexedCanonical.push(row.canonical);
      const physFile = row.physical.replace('.md', '').toUpperCase();
      if (!physicalNorm.has(physFile)) {
        missing.push(row.canonical);
      }
    }

    // Fiziksel dosyalar ADR_INDEX'te var mi?
    const indexedPhysical = new Set(
      indexRows.map(r => r.physical.replace('.md', '').toUpperCase())
    );
    const orphaned = physical.filter(p => !indexedPhysical.has(p.toUpperCase()));

    // Duplicate canonical
    const duplicates = indexedCanonical.filter(
      (a, i) => indexedCanonical.indexOf(a) !== i
    );

    const status = missing.length === 0 && orphaned.length === 0 && duplicates.length === 0
      ? 'ok'
      : missing.length > 3 || orphaned.length > 3
        ? 'error'
        : 'warning';

    return {
      totalIndexed: indexRows.length,
      totalPhysical: physical.length,
      missing: [...new Set(missing)],
      orphaned: [...new Set(orphaned)],
      duplicates: [...new Set(duplicates)],
      status,
      timestamp: new Date().toISOString(),
    };
  }

  private static parseIndex(): Array<{ canonical: string; physical: string }> {
    if (!fs.existsSync(this.indexFile)) return [];
    const content = fs.readFileSync(this.indexFile, 'utf-8');
    const rows: Array<{ canonical: string; physical: string }> = [];

    // | ADR-XXXX | ... | `DOSYA.md` | ...
    const regex = /\| (ADR[-_][A-Z0-9_-]+) \|[^|]*\| `([^`]+\.md)`/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      rows.push({
        canonical: match[1].trim(),
        physical: match[2].trim(),
      });
    }
    return rows;
  }

  private static getPhysicalAdrs(): string[] {
    if (!fs.existsSync(this.adrDir)) return [];
    return fs.readdirSync(this.adrDir)
      .filter(f => f.match(/^ADR[-_].*\.md$/i))
      .filter(f => !f.match(/^ADR[-_](INDEX|ENVANTER|DECISIONS|NUMBERING|DASHBOARD)/i))
      .map(f => f.replace('.md', ''));
  }
}
