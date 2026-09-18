export class CytoscapeProjectionAdapter {
  public static toCytoscapeFormat(network: any): any {
    // TODO: gercek Cytoscape.js formatina donusturme mantigi henuz yazilmadi.
    return { elements: { nodes: [], edges: [] } };
  }
}