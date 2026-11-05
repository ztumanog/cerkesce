// Deterministik Layout - d3 bagimliligi yok
export type LayoutType = 'CIRCULAR' | 'GRID' | 'FORCE';
export type GraphNode = { id: string; label: string; trLabel?: string; lang: 'tr' | 'ad'; x?: number; y?: number; fx?: number | null; fy?: number | null; };
export type GraphLink = { source: string; target: string };

/** SVG render girdisi (GenericConceptNetworkDTO ile yapisal uyumlu) */
export interface SvgNetworkInput {
  nodes: { id: string; label?: string; [key: string]: any }[];
  edges: { id?: string; source: string; target: string; [key: string]: any }[];
}

/** SVG render secenekleri */
export interface SvgLayoutOptions {
  algorithm?: LayoutType;
  width?: number;
  height?: number;
}

export class SvgLayoutEngineService {
  private static _seed = 42;
  private static _seededRandom(): number {
    this._seed = (this._seed * 9301 + 49297) % 233280;
    return this._seed / 233280;
  }
  stop(): void {}
  getLayout(nodes: GraphNode[], links: GraphLink[], type: LayoutType, width: number, height: number): GraphNode[] {
    const cx = width / 2;
    const cy = height / 2;
    const count = nodes.length || 1;
    if (type === 'CIRCULAR') {
      const r = Math.min(width, height) * 0.32;
      return nodes.map((n, i) => ({
        ...n,
        x: cx + r * Math.cos((2 * Math.PI * i) / count - Math.PI/2),
        y: cy + r * Math.sin((2 * Math.PI * i) / count - Math.PI/2),
      }));
    }
    if (type === 'GRID') {
      const cols = Math.ceil(Math.sqrt(count));
      const cellW = width / (cols + 1);
      const cellH = height / (Math.ceil(count / cols) + 1);
      return nodes.map((n, i) => ({
        ...n,
        x: cellW * ((i % cols) + 1),
        y: cellH * (Math.floor(i / cols) + 1),
      }));
    }
    SvgLayoutEngineService._seed = 42;
    const out: GraphNode[] = nodes.map((n) => ({
      ...n,
      x: cx + (SvgLayoutEngineService._seededRandom() - 0.5) * width * 0.5,
      y: cy + (SvgLayoutEngineService._seededRandom() - 0.5) * height * 0.5,
    }));
    for (let iter = 0; iter < 100; iter++) {
      for (const link of links) {
        const s = out.find((x) => x.id === link.source);
        const t = out.find((x) => x.id === link.target);
        if (!s || !t || s.x === undefined || s.y === undefined || t.x === undefined || t.y === undefined) continue;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.sqrt(dx*dx+dy*dy) || 1;
        const targetDist = 140;
        const force = (dist - targetDist) * 0.02;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        s.x += fx; s.y += fy; t.x -= fx; t.y -= fy;
      }
      for (let i = 0; i < out.length; i++) {
        for (let j = i+1; j < out.length; j++) {
          const a = out[i]; const b = out[j];
          if (a.x===undefined||a.y===undefined||b.x===undefined||b.y===undefined) continue;
          const dx = b.x - a.x; const dy = b.y - a.y;
          const dist = Math.sqrt(dx*dx+dy*dy) || 1;
          if (dist < 80) {
            const push = (80-dist)*0.05;
            const fx = (dx/dist)*push; const fy = (dy/dist)*push;
            a.x-=fx; a.y-=fy; b.x+=fx; b.y+=fy;
          }
        }
      }
    }
    return out;
  }
  getSimulation(): null { return null; }

  // ===== SVG RENDER (Faz 7.0.4) =====

  private static _escapeXml(str: string): string {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private static _toBase64(str: string): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'utf-8').toString('base64');
    }
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  static render(network: SvgNetworkInput, options: SvgLayoutOptions = {}): string {
    const algorithm: LayoutType = options.algorithm || 'CIRCULAR';
    const width = options.width || 800;
    const height = options.height || 600;

    const rawNodes = network && Array.isArray(network.nodes) ? network.nodes : [];
    const rawEdges = network && Array.isArray(network.edges) ? network.edges : [];

    const nodes: GraphNode[] = rawNodes.map((n) => ({
      id: String(n.id),
      label: String(n.label !== undefined && n.label !== null ? n.label : n.id),
      trLabel: typeof n.trLabel === 'string' ? n.trLabel : undefined,
      lang: n.lang === 'tr' ? 'tr' : 'ad',
    }));

    const links: GraphLink[] = rawEdges.map((e) => ({
      source: String(e.source),
      target: String(e.target),
    }));

    const engine = new SvgLayoutEngineService();
    const positioned = engine.getLayout(nodes, links, algorithm, width, height);
    const posById: { [id: string]: GraphNode } = {};
    for (const p of positioned) posById[p.id] = p;

    const parts: string[] = [];
    parts.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '">');

    for (const link of links) {
      const a = posById[link.source];
      const b = posById[link.target];
      if (!a || !b || a.x === undefined || a.y === undefined || b.x === undefined || b.y === undefined) continue;
      parts.push('<line x1="' + a.x.toFixed(2) + '" y1="' + a.y.toFixed(2) + '" x2="' + b.x.toFixed(2) + '" y2="' + b.y.toFixed(2) + '" stroke="#cbd5e1" stroke-width="1.5" />');
    }

    for (const node of positioned) {
      const x = node.x === undefined ? 0 : node.x;
      const y = node.y === undefined ? 0 : node.y;
      parts.push('<circle cx="' + x.toFixed(2) + '" cy="' + y.toFixed(2) + '" r="18" fill="#4f46e5" />');
      parts.push('<text x="' + x.toFixed(2) + '" y="' + (y + 4).toFixed(2) + '" text-anchor="middle" font-size="12" fill="#ffffff">' + SvgLayoutEngineService._escapeXml(node.label) + '</text>');
    }

    parts.push('</svg>');
    return parts.join('\n');
  }

  static renderDataUri(network: SvgNetworkInput, options: SvgLayoutOptions = {}): string {
    const svg = SvgLayoutEngineService.render(network, options);
    return 'data:image/svg+xml;base64,' + SvgLayoutEngineService._toBase64(svg);
  }
}
export const layoutEngine = new SvgLayoutEngineService();