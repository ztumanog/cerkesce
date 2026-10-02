import { describe, it, expect } from 'vitest';

const STAGING_URL = process.env.STAGING_URL || 'http://localhost:3001';

describe('Staging Smoke Tests', () => {
  it('Express health check', async () => {
    const res = await fetch(`${STAGING_URL}/api/v1/health`);
    expect(res.status).toBe(200);
  });

  it('API root bilgisi', async () => {
    const res = await fetch(`${STAGING_URL}/`);
    expect(res.status).toBe(200);
  });

  it('Search endpoint erisilebilir', async () => {
    const res = await fetch(`${STAGING_URL}/api/v1/search?q=test`);
    expect([200, 404]).toContain(res.status);
  });
});
