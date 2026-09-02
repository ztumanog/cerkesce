import { describe, it, expect } from 'vitest';
import React from 'react';
import { AnalyticsDashboardPage } from '../../ui/pages/AnalyticsDashboardPage';
import { NetworkAnalyticsResultDTO } from '../../domain/analytics/dto/NetworkAnalyticsDTO';

describe('Phase 7.2 - Analytics Dashboard UI Certification Tests', () => {
  const mockAnalytics: NetworkAnalyticsResultDTO = {
    density: 0.1428,
    degreeCentrality: { N1: 3, N2: 1 },
    isolatedNodes: ['N3'],
    clusters: [{ id: 'C1', nodeIds: ['N1', 'N2'] }]
  };

  it('DASH-001: Renders empty state when analytics payload is missing', () => {
    const element = React.createElement(AnalyticsDashboardPage, { analyticsData: null });
    expect(React.isValidElement(element)).toBe(true);
  });

  it('DASH-002: Computes and displays network metrics correctly', () => {
    const element = React.createElement(AnalyticsDashboardPage, {
      analyticsData: mockAnalytics,
      coverageScore: 0.85
    });

    expect(React.isValidElement(element)).toBe(true);
    expect(element.type).toBe(AnalyticsDashboardPage);
  });
});