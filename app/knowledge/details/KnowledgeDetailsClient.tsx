'use client';

import { useState } from 'react';

interface AdrItem {
  id: string;
  title: string;
  file: string;
  status: string;
}

interface PhaseItem {
  num: string;
  name: string;
  status: string;
}

interface SeedData {
  adrs: AdrItem[];
  phases: PhaseItem[];
  generatedAt: string;
}

export default function KnowledgeDetailsClient({ seed }: { seed: SeedData }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AdrItem[]>(seed.adrs);

  const statusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const adrCount = seed.adrs.length;
  const phaseCount = seed.phases.length;
  const totalNodes = adrCount + phaseCount;

  const cards = [
    { title: 'ADR Search', value: adrCount, details: `${adrCount} ADR yuklendi`, status: adrCount > 0 ? 'ok' : 'warning' },
    { title: 'Knowledge Graph', value: totalNodes, details: `${adrCount} ADR, ${phaseCount} faz`, status: totalNodes > 0 ? 'ok' : 'warning' },
    { title: 'Historical Reasoning', value: phaseCount, details: `${phaseCount} faz olayi`, status: phaseCount > 0 ? 'ok' : 'warning' },
    { title: 'Traceability Matrix', value: (seed as any).traceability?.length ?? 0, details: ` baglanti`, status: ((seed as any).traceability?.length ?? 0) > 0 ? 'ok' : 'warning' },
    { title: 'Executive Memory', value: (seed as any).memory?.length ?? 0, details: ` kayit`, status: ((seed as any).memory?.length ?? 0) > 0 ? 'ok' : 'warning' },
  ];

  const handleSearch = () => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setResults(seed.adrs);
      return;
    }
    const filtered = seed.adrs.filter(adr =>
      adr.id.toLowerCase().includes(q) ||
      adr.title.toLowerCase().includes(q) ||
      adr.status.toLowerCase().includes(q)
    );
    setResults(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Knowledge Details</h1>
      <p className="text-gray-600 mb-6">Track C - Knowledge servisleri</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.title} className={`p-4 rounded-lg border-2 ${statusColor(c.status)}`}>
            <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
            <p className="text-2xl font-bold mb-1">{c.value}</p>
            <p className="text-sm opacity-75">{c.details}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border p-4">
        <h2 className="text-2xl font-bold mb-4">ADR Ara</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="ADR ara... (or. Translation, Phase 6, ADR-0016)"
            className="border p-2 rounded flex-1"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ara
          </button>
        </div>
        <div className="text-sm text-gray-500 mb-2">{results.length} sonuc</div>
        <div className="max-h-96 overflow-y-auto">
          {results.map(adr => (
            <div key={adr.id} className="p-2 border-b hover:bg-gray-50">
              <div className="font-mono text-sm text-blue-600">{adr.id}</div>
              <div className="font-semibold">{adr.title}</div>
              <div className="text-xs text-gray-500">{adr.status} — {adr.file}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        Last updated: {seed.generatedAt}
      </div>
    </div>
  );
}
