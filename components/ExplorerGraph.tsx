'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { layoutEngine } from '@/lib/SvgLayoutEngineService';
export default function ExplorerGraph({ nodes, links, layout, onNodeClick }: any) {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth || 800;
    const height = 500;
    svg.selectAll('*').remove();
    const g = svg.append('g');
    const positionedNodes = layoutEngine.getLayout([...nodes], [...links], layout, width, height);
    const link = g.append('g').selectAll('line').data(links).join('line').attr('stroke', '#c4b5fd').attr('stroke-width', 1.5);
    const node = g.append('g').selectAll('g').data(positionedNodes).join('g').attr('cursor', 'pointer').on('click', (_:any, d:any) => onNodeClick(d));
    node.append('circle').attr('r', (d:any) => d.id === nodes[0]?.id ? 28 : 22).attr('fill', (d:any) => d.lang === 'tr' ? '#a78bfa' : '#3b82f6').attr('stroke', '#fff').attr('stroke-width', 2);
    node.append('text').text((d:any) => d.label).attr('text-anchor', 'middle').attr('dy', 5).attr('fill', '#fff').attr('font-size', '12px').attr('font-weight', '600').style('pointer-events', 'none');
    const ticked = () => {
      link.attr('x1', (d:any) => (d.source as any).x).attr('y1', (d:any) => (d.source as any).y).attr('x2', (d:any) => (d.target as any).x).attr('y2', (d:any) => (d.target as any).y);
      node.attr('transform', (d:any) => `translate(${d.x},${d.y})`);
    }
    if (layout === 'FORCE') { layoutEngine.getSimulation()?.on('tick', ticked); } else { ticked(); }
    return () => layoutEngine.stop();
  }, [nodes, links, layout]);
  return (
    <div className="w-full border rounded-2xl bg-white p-2">
      <svg ref={svgRef} className="w-full h-[500px]" />
      <div className="text-xs text-gray-500 mt-1">{nodes.length} node - deterministik</div>
    </div>
  );
}
