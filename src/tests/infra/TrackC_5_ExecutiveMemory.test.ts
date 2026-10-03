import { describe, it, expect, beforeEach } from 'vitest';
import { ExecutiveMemoryService } from '../../infra/knowledge/ExecutiveMemoryService';

describe('Track C.5 - ExecutiveMemoryService', () => {
  beforeEach(() => {
    ExecutiveMemoryService.clear();
  });

  it('Ani kaydeder', () => {
    const entry = ExecutiveMemoryService.remember({
      type: 'decision',
      title: 'Test decision',
      content: 'We decided to scale up',
      tags: ['scale'],
      importance: 'high',
    });
    expect(entry.id).toBeDefined();
  });

  it('Recall yapar', () => {
    ExecutiveMemoryService.remember({
      type: 'lesson',
      title: 'Memory lesson',
      content: 'Memory optimization',
      tags: ['memory'],
      importance: 'medium',
    });
    const results = ExecutiveMemoryService.recall('memory');
    expect(results.length).toBe(1);
  });

  it('Top entries sirali', () => {
    ExecutiveMemoryService.remember({ type: 'decision', title: 'D1', content: 'c', tags: [], importance: 'low' });
    ExecutiveMemoryService.remember({ type: 'decision', title: 'D2', content: 'c', tags: [], importance: 'high' });
    const report = ExecutiveMemoryService.getReport();
    expect(report.topEntries[0].importance).toBe('high');
  });

  it('Bos hafiza warning', () => {
    const report = ExecutiveMemoryService.getReport();
    expect(report.status).toBe('warning');
  });
});
