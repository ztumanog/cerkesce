import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { ConceptID } from '../../../domain/concept/value-objects/ConceptID';
import { ConceptId } from '../../../domain/shared/value-objects/ConceptId';

describe('ADR-GOV-015: Canonical Concept Identity & Zero-ULID Residue Guard', () => {
  it('ConceptID ve ConceptId yalnızca harfle başlayan UPPER_SNAKE_CASE kanonik kimlikleri kabul etmelidir', () => {
    expect(ConceptID.create('WATER').getValue()).toBe('WATER');
    expect(ConceptID.create('APPLE_TREE').getValue()).toBe('APPLE_TREE');
    expect(ConceptId.create('WATER').value).toBe('WATER');

    // Eski 26 karakterlik ULID, UUID, hex ve Türkçe karakterli girdiler reddedilmelidir
    expect(() => ConceptID.create('01ARZ3NDEKTSV4RRFFQ69G5FAV')).toThrow();
    expect(() => ConceptID.create('01M44JJ719F3V5RXNAJCB9Y11X')).toThrow();
    expect(() => ConceptID.create('a1b2c3d4e5f6a7b8')).toThrow();
    expect(() => ConceptID.create('A1B2C3D4E5F6A7B8')).toThrow();
    expect(() => ConceptId.create('A1B2C3D4E5F6A7B8')).toThrow();
    expect(() => ConceptId.create('01M44JJ719F3V5RXNAJCB9Y11X')).toThrow();
    expect(() => ConceptID.create('ÖFKE')).toThrow();
  });

  it('src/, app/ ve public/data/ dizinlerinde eski 26 karakterlik ULID kalıntısı (01...) bulunmamalıdır', () => {
    const scanRoots = ['src', 'app', 'public/data'];
    const legacyUlidRegex = /\b01[0-9A-HJKMNP-TV-Z]{24}\b/g;
    const violations: Array<{ file: string; match: string }> = [];

    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
          continue;
        }
        if (!/\.(ts|tsx|json)$/.test(entry.name)) continue;
        if (
          fullPath.endsWith('CanonicalIdentityGuard.test.ts') ||
          fullPath.endsWith('ConceptID.test.ts') ||
          fullPath.endsWith('valueObjects.test.ts')
        ) {
          continue;
        }
        const content = fs.readFileSync(fullPath, 'utf8');
        const matches = content.match(legacyUlidRegex);
        if (matches) {
          violations.push({
            file: path.relative(process.cwd(), fullPath),
            match: matches[0],
          });
        }
      }
    };

    for (const root of scanRoots) {
      walk(path.resolve(process.cwd(), root));
    }

    expect(violations).toEqual([]);
  }, 30_000);

  it('üretim kodunda generateULID veya getConceptUlid yardımcı fonksiyonları bulunmamalıdır', () => {
    const forbiddenSymbols = ['generateULID', 'getConceptUlid', 'getConceptIdByUlid', 'CONCEPT_ULID_MAP', 'LEGACY_HASH_REGEX', 'TURKISH_LEAK_MAP'];
    const violations: Array<{ file: string; symbol: string }> = [];

    const walkProd = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === 'tests' || entry.name === '__tests__') continue;
          walkProd(fullPath);
          continue;
        }
        if (!/\.(ts|tsx)$/.test(entry.name)) continue;
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const sym of forbiddenSymbols) {
          if (content.includes(sym)) {
            violations.push({
              file: path.relative(process.cwd(), fullPath),
              symbol: sym,
            });
          }
        }
      }
    };

    walkProd(path.resolve(process.cwd(), 'src'));
    walkProd(path.resolve(process.cwd(), 'app'));

    expect(violations).toEqual([]);
  });
  it('hem ConceptId hem ConceptID büyük/küçük harfli hex-hash formatlarını çalışma zamanında reddetmeli ve üretim kodunda kabul deseni bulunmamalıdır', () => {
    expect(() => ConceptId.create('A1B2C3D4E5F6A7B8')).toThrow();
    expect(() => ConceptId.create('a1b2c3d4e5f6a7b8')).toThrow();
    expect(() => ConceptID.create('A1B2C3D4E5F6A7B8')).toThrow();
    expect(() => ConceptID.create('a1b2c3d4e5f6a7b8')).toThrow();

    const violations: Array<{ file: string; line: string }> = [];
    const forbiddenAcceptPattern = /LEGACY_HASH_REGEX|TURKISH_LEAK_MAP/;
    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
          if (e.name === 'tests' || e.name === '__tests__') continue;
          walk(p);
          continue;
        }
        if (!/\.(ts|tsx)$/.test(e.name)) continue;
        const content = fs.readFileSync(p, 'utf8');
        if (forbiddenAcceptPattern.test(content)) {
          violations.push({ file: path.relative(process.cwd(), p), line: 'forbidden legacy pattern' });
        }
      }
    };
    walk(path.resolve(process.cwd(), 'src'));
    walk(path.resolve(process.cwd(), 'app'));
    expect(violations).toEqual([]);
  });

  it("app/api/test altinda uretim test endpoint'i bulunmamalidir", () => {
    const dir = path.resolve(process.cwd(), "app", "api", "test");
    expect(fs.existsSync(dir)).toBe(false);
  });
});
