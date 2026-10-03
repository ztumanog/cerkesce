import { describe, it, expect, beforeEach } from 'vitest';
import { ServiceDependencyMappingService } from '../../infra/reliability/ServiceDependencyMappingService';

describe('Sprint 15.4 - ServiceDependencyMappingService', () => {
  beforeEach(() => {
    ServiceDependencyMappingService.clear();
  });

  it('Node ve dependency ekler', () => {
    ServiceDependencyMappingService.addNode({
      id: 'api',
      name: 'API Gateway',
      type: 'api',
      status: 'healthy',
    });
    ServiceDependencyMappingService.addNode({
      id: 'db',
      name: 'Database',
      type: 'database',
      status: 'healthy',
    });
    ServiceDependencyMappingService.addDependency({
      from: 'api',
      to: 'db',
      type: 'sync',
      critical: true,
    });
    const report = ServiceDependencyMappingService.getReport();
    expect(report.nodes.length).toBe(2);
    expect(report.dependencies.length).toBe(1);
  });

  it('Servis bagimliliklarini bulur', () => {
    ServiceDependencyMappingService.addDependency({
      from: 'api',
      to: 'db',
      type: 'sync',
      critical: true,
    });
    const deps = ServiceDependencyMappingService.getDependencies('api');
    expect(deps.length).toBe(1);
  });

  it('Kritik yollari bulur', () => {
    ServiceDependencyMappingService.addDependency({
      from: 'api',
      to: 'db',
      type: 'sync',
      critical: true,
    });
    const paths = ServiceDependencyMappingService.findCriticalPaths();
    expect(paths.length).toBe(1);
    expect(paths[0]).toEqual(['api', 'db']);
  });

  it('Bos sistem warning', () => {
    const report = ServiceDependencyMappingService.getReport();
    expect(report.status).toBe('warning');
  });

  it('Critical node critical', () => {
    ServiceDependencyMappingService.addNode({
      id: 'api',
      name: 'API',
      type: 'api',
      status: 'critical',
    });
    const report = ServiceDependencyMappingService.getReport();
    expect(report.status).toBe('critical');
  });
});
