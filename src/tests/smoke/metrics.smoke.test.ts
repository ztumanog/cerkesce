import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.STAGING_URL || 'http://localhost:3001';

describe('Metrics', () => {
  it('Prometheus format', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/metrics`);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text.length).toBeGreaterThan(0);
  });

  it('JSON format', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/metrics/json`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toBeDefined();
  });

  it('Health metrics', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/health`);
    expect(res.status).toBe(200);
  });
});
