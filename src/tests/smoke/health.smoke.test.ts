import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.STAGING_URL || 'http://localhost:3001';

describe('Health Checks', () => {
  it('Full health', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/health`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('ok');
  });

  it('Detailed health', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/health/detailed`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.checks).toBeDefined();
  });

  it('Liveness probe', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/health/live`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('ok');
  });

  it('Readiness probe', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/health/ready`);
    expect([200, 503]).toContain(res.status);
  });
});
