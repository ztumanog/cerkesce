export interface ServiceNode {
  id: string;
  name: string;
  type: 'api' | 'database' | 'cache' | 'service';
  status: 'healthy' | 'warning' | 'critical';
}

export interface ServiceDependency {
  from: string;
  to: string;
  type: 'sync' | 'async' | 'data';
  critical: boolean;
}

export interface DependencyMapReport {
  timestamp: string;
  nodes: ServiceNode[];
  dependencies: ServiceDependency[];
  criticalPaths: string[][];
  status: 'ok' | 'warning' | 'critical';
}

export class ServiceDependencyMappingService {
  private static nodes: Map<string, ServiceNode> = new Map();
  private static dependencies: ServiceDependency[] = [];

  static addNode(node: ServiceNode): void {
    this.nodes.set(node.id, node);
  }

  static addDependency(dep: ServiceDependency): void {
    this.dependencies.push(dep);
  }

  static getDependencies(serviceId: string): ServiceDependency[] {
    return this.dependencies.filter(d => d.from === serviceId || d.to === serviceId);
  }

  static findCriticalPaths(): string[][] {
    const paths: string[][] = [];
    const criticalDeps = this.dependencies.filter(d => d.critical);

    for (const dep of criticalDeps) {
      paths.push([dep.from, dep.to]);
    }

    return paths;
  }

  static getReport(): DependencyMapReport {
    const nodes = Array.from(this.nodes.values());
    const criticalPaths = this.findCriticalPaths();

    const criticalNodes = nodes.filter(n => n.status === 'critical').length;
    const warningNodes = nodes.filter(n => n.status === 'warning').length;

    const status = criticalNodes > 0 ? 'critical'
      : warningNodes > 0 ? 'warning'
        : nodes.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      nodes,
      dependencies: [...this.dependencies],
      criticalPaths,
      status,
    };
  }

  static clear(): void {
    this.nodes.clear();
    this.dependencies = [];
  }
}
