export class CytoscapeProjectionAdapter {
  static toCytoscapeFormat(network: any) {
    return {
      nodes: (network?.nodes || []).map((n: any) => ({ data: { id: n.id, ...n } })),
      edges: (network?.edges || []).map((e: any) => ({ data: { source: e.source, target: e.target, ...e } })),
    };
  }
}
