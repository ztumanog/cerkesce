export class GraphMerger {
  static merge(a: any, b: any) {
    return { nodes: [...(a.nodes||[]), ...(b.nodes||[])], edges: [...(a.edges||[]), ...(b.edges||[])] };
  }
}
