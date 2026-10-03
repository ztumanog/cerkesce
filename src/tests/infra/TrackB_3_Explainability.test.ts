import { describe, it, expect, beforeEach } from 'vitest';
import { ExplainabilityService } from '../../infra/intelligence/ExplainabilityService';

describe('Track B.3 - ExplainabilityService', () => {
  beforeEach(() => {
    ExplainabilityService.clear();
  });

  it('Karar kaydeder', () => {
    const dec = ExplainabilityService.record({
      type: 'capacity',
      outcome: 'scale_up',
      inputs: { cpu: 0.85, memory: 0.6 },
      confidence: 0.9,
    });
    expect(dec.id).toBeDefined();
  });

  it('Aciklama uretir', () => {
    const dec = ExplainabilityService.record({
      type: 'capacity',
      outcome: 'scale_up',
      inputs: { cpu: 0.85, memory: 0.6 },
      confidence: 0.9,
    });
    const explanation = ExplainabilityService.explain(dec.id);
    expect(explanation).toBeDefined();
    expect(explanation?.factors.length).toBe(2);
  });

  it('Faktorler siralanir', () => {
    const dec = ExplainabilityService.record({
      type: 'test',
      outcome: 'ok',
      inputs: { a: 0.9, b: 0.3 },
      confidence: 0.8,
    });
    const explanation = ExplainabilityService.explain(dec.id, { a: 0.8, b: 0.2 });
    expect(explanation?.factors[0].name).toBe('a');
  });

  it('Bilinmeyen karar null', () => {
    const explanation = ExplainabilityService.explain('unknown');
    expect(explanation).toBeNull();
  });
});
