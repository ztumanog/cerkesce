import { describe, it, expect } from 'vitest';

const PROD_URL = process.env.PRODUCTION_URL || 'https://cerkesce.com';
const IS_PRODUCTION = PROD_URL.startsWith('https://');

describe('Production Smoke Tests', () => {
  it('Production health check', async () => {
    const res = await fetch(`${PROD_URL}/api/v1/health`);
    expect(res.status).toBe(200);
  });

  it('Production ana sayfa', async () => {
    const res = await fetch(PROD_URL);
    expect(res.status).toBe(200);
  });

  it.skipIf(!IS_PRODUCTION)('Production SSL aktif', async () => {
    const res = await fetch(PROD_URL);
    expect(res.url).toMatch(/^https:/);
  });
});
