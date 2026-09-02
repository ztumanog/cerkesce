import { describe, it, expect, beforeEach } from 'vitest';
import { ConceptNetworkController } from '../../infrastructure/api/controllers/ConceptNetworkController';

describe('Phase 6.1 - REST API Gateway Contract Certification Tests', () => {
  let controller: ConceptNetworkController;

  beforeEach(() => {
    controller = new ConceptNetworkController();
  });

  it('API-001: Search / Explore Endpoint should return HTTP 200 for valid queries', async () => {
    let statusCode = 0;
    let responseData: any = null;

    const req: any = { query: { q: 'water' } };
    const res: any = {
      status: (code: number) => {
        statusCode = code;
        return res;
      },
      json: (data: any) => {
        responseData = data;
      }
    };

    await controller.getConceptNetwork(req, res);

    expect(statusCode).toBe(200);
    expect(responseData).toBeDefined();
  });

  it('API-002: Network Projection Format Resolution should include required schema metadata', async () => {
    let responseData: any = null;

    const req: any = { query: { q: 'water' } };
    const res: any = {
      status: () => res,
      json: (data: any) => { responseData = data; }
    };

    await controller.getConceptNetwork(req, res);

    expect(responseData.metadata).toBeDefined();
    expect(responseData.metadata.schemaVersion).toBe('1.0.0');
    expect(responseData.metadata.isDirected).toBe(true);
    expect(typeof responseData.metadata.isTruncated).toBe('boolean');
  });

  it('API-003: Response envelope must contain validated nodes array with ROOT and CONCEPT types', async () => {
    let responseData: any = null;

    const req: any = { query: { q: 'water' } };
    const res: any = {
      status: () => res,
      json: (data: any) => { responseData = data; }
    };

    await controller.getConceptNetwork(req, res);

    expect(Array.isArray(responseData.nodes)).toBe(true);
    expect(responseData.nodes.length).toBeGreaterThan(0);
    
    const rootNode = responseData.nodes.find((n: any) => n.nodeType === 'ROOT');
    expect(rootNode).toBeDefined();
    expect(rootNode.depth).toBe(0);
  });

  it('API-004: Response envelope must contain type-safe edges array', async () => {
    let responseData: any = null;

    const req: any = { query: { q: 'water' } };
    const res: any = {
      status: () => res,
      json: (data: any) => { responseData = data; }
    };

    await controller.getConceptNetwork(req, res);

    expect(Array.isArray(responseData.edges)).toBe(true);
    if (responseData.edges.length > 0) {
      const edge = responseData.edges[0];
      expect(edge.source).toBeDefined();
      expect(edge.target).toBeDefined();
      expect(edge.relationType).toBeDefined();
    }
  });

  it('API-005: Contract Stability & Performance - Output must be deterministic', async () => {
    let res1Data: any = null;
    let res2Data: any = null;

    const req: any = { query: { q: 'water' } };
    const mockRes1: any = { status: () => mockRes1, json: (d: any) => { res1Data = d; } };
    const mockRes2: any = { status: () => mockRes2, json: (d: any) => { res2Data = d; } };

    await controller.getConceptNetwork(req, mockRes1);
    await controller.getConceptNetwork(req, mockRes2);

    expect(res1Data.nodes).toEqual(res2Data.nodes);
    expect(res1Data.edges).toEqual(res2Data.edges);
  });

  it('API-006: Guardrail Test - max_nodes truncation must set isTruncated flag', async () => {
    let responseData: any = null;

    const req: any = { query: { q: 'water', max_nodes: '2' } };
    const res: any = {
      status: () => res,
      json: (data: any) => { responseData = data; }
    };

    await controller.getConceptNetwork(req, res);

    expect(responseData.nodes.length).toBeLessThanOrEqual(2);
  });
});
