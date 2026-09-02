import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Phase 10.1 - Grafana Dashboard Specification Certification', () => {
  it('OBS-005: Validates presence and structure of Grafana dashboard JSON schema', () => {
    const dashboardPath = path.resolve(process.cwd(), 'src/infra/telemetry/dashboards/grafana-dashboard.json');
    expect(fs.existsSync(dashboardPath)).toBe(true);

    const rawData = fs.readFileSync(dashboardPath, 'utf-8');
    const schema = JSON.parse(rawData);

    expect(schema.title).toContain('Cerkesce Knowledge Graph Platform');
    expect(schema.panels).toHaveLength(2);
  });
});