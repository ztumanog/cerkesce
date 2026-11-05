import * as d3 from 'd3';
export type LayoutType = 'CIRCULAR' | 'GRID' | 'FORCE';
export type GraphNode = { id: string; label: string; lang: 'tr' | 'ad' | 'ru'; x?: number; y?: number; fx?: number | null; fy?: number | null; }
export type GraphLink = { source: string; target: string; }
export class SvgLayoutEngineService {
  private simulation: any = null;
  stop() { if (this.simulation) { this.simulation.stop(); this.simulation = null; } }
  getLayout(nodes: any[], links: any[], type: LayoutType, width: number, height: number) {
    this.stop();
    if (type === 'CIRCULAR') {
      const r = Math.min(width, height) * 0.35;
      return nodes.map((n, i) => ({ ...n, x: width/2 + r*Math.cos((2*Math.PI*i)/nodes.length - Math.PI/2), y: height/2 + r*Math.sin((2*Math.PI*i)/nodes.length - Math.PI/2) }));
    }
    if (type === 'GRID') {
      const cols = Math.ceil(Math.sqrt(nodes.length));
      return nodes.map((n, i) => ({ ...n, x: (i % cols)*160+100, y: Math.floor(i/cols)*120+100 }));
    }
    this.simulation = d3.forceSimulation(nodes).randomSource(d3.randomLcg(42))
      .force('link', d3.forceLink(links).id((d:any)=>d.id).distance(120).strength(0.8))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width/2, height/2))
      .force('collide', d3.forceCollide().radius(60)).alphaDecay(0.02);
    return nodes;
  }
  getSimulation(){ return this.simulation; }
}
export const layoutEngine = new SvgLayoutEngineService();
