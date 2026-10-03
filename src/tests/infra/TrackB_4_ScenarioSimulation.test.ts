import { describe, it, expect, beforeEach } from 'vitest';
import { ScenarioSimulationService } from '../../infra/intelligence/ScenarioSimulationService';

describe('Track B.4 - ScenarioSimulationService', () => {
  beforeEach(() => {
    ScenarioSimulationService.clear();
  });

  it('Senaryo ekler', () => {
    const s = ScenarioSimulationService.add({
      name: 'High load',
      description: '2x traffic',
      parameters: { traffic: 0.9, cpu: 0.85 },
    });
    expect(s.id).toBeDefined();
  });

  it('Simulasyon calistirir', () => {
    const s = ScenarioSimulationService.add({
      name: 'Test',
      description: 'Test',
      parameters: { cpu: 0.9, memory: 0.9 },
    });
    const result = ScenarioSimulationService.simulate(s.id);
    expect(result).toBeDefined();
    expect(result?.risk).toBe('high');
  });

  it('Dusuk risk', () => {
    const s = ScenarioSimulationService.add({
      name: 'Low',
      description: 'Low',
      parameters: { cpu: 0.3, memory: 0.2 },
    });
    const result = ScenarioSimulationService.simulate(s.id);
    expect(result?.risk).toBe('low');
  });

  it('Rapor uretir', () => {
    ScenarioSimulationService.add({
      name: 'Test',
      description: 'Test',
      parameters: { cpu: 0.5 },
    });
    const report = ScenarioSimulationService.getReport();
    expect(report.totalScenarios).toBe(1);
  });
});
