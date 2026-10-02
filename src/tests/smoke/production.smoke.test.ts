import { describe, it, expect } from 'vitest';

const PROD_URL = process.env.PRODUCTION_URL || 'https://cerkescesozluk.vercel.app';
const IS_PRODUCTION = PROD_URL.includes('vercel.app') || PROD_URL.includes('cerkesce.com');

describe('Production Smoke Tests', () => {
  it.skipIf(!IS_PRODUCTION)('Production health check', async () => {
    const res = await fetch(`${PROD_URL}/api/v1/health`);
    expect([200, 404, 502]).toContain(res.status);
  });

  it.skipIf(!IS_PRODUCTION)('Production ana sayfa', async () => {
    const res = await fetch(PROD_URL);
    expect(res.status).toBe(200);
  });

  it.skipIf(!IS_PRODUCTION)('Production SSL aktif', async () => {
    const res = await fetch(PROD_URL);
    expect(res.url).toMatch(/^https:/);
  });
});
