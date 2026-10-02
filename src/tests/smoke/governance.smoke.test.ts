import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.STAGING_URL || 'http://localhost:3001';

describe('Governance API', () => {
  it('Dashboard endpoint', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/governance/dashboard`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBeDefined();
  });

  it('Report endpoint', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/governance/report`);
    expect(res.status).toBe(200);
  });

  it('Report markdown', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/governance/report/markdown`);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Governance Report');
  });
});
