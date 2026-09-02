export const defaultCytoscapeStyle: any[] = [
  // Genel Düğüm Stili
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'color': '#ffffff',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '12px',
      'font-weight': 'bold',
      'width': '60px',
      'height': '60px',
      'background-color': '#64748b'
    }
  },
  // Kök Düğüm (ROOT) Stili
  {
    selector: 'node[nodeType = "ROOT"]',
    style: {
      'background-color': '#1e3a8a',
      'width': '90px',
      'height': '90px',
      'font-size': '15px',
      'border-width': '3px',
      'border-color': '#60a5fa'
    }
  },
  // Derinlik Seviyesi (Depth) Stilleri
  {
    selector: 'node[depth = 1]',
    style: {
      'background-color': '#3b82f6',
      'width': '70px',
      'height': '70px'
    }
  },
  {
    selector: 'node[depth >= 2]',
    style: {
      'background-color': '#14b8a6',
      'width': '55px',
      'height': '55px'
    }
  },
  // Küme (Cluster) Özelleştirmeleri
  { selector: 'node.cluster-state', style: { 'background-color': '#9333ea' } },
  { selector: 'node.cluster-location', style: { 'background-color': '#16a34a' } },
  { selector: 'node.cluster-drink', style: { 'background-color': '#f97316' } },

  // Yönlü Kenar (Edge) Stilleri
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#94a3b8',
      'target-arrow-color': '#94a3b8',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(relationType)',
      'font-size': '10px',
      'color': '#475569',
      'text-rotation': 'autorotate',
      'text-margin-y': -8
    }
  }
];
