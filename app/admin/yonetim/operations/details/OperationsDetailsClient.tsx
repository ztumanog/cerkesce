'use client';

interface TrackASeed {
  alerts: any[];
  incidents: any[];
  regions: any[];
  generatedAt: string;
}

export default function OperationsDetailsClient({ seed }: { seed: TrackASeed }) {
  const statusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const cards = [
    { title: 'Alert Deduplication', value: seed.alerts.length, details: `${seed.alerts.length} uyari`, status: 'ok' },
    { title: 'Alert Cooldown', value: seed.alerts.length, details: 'Cooldown aktif', status: 'ok' },
    { title: 'Alert Aggregation', value: seed.alerts.length, details: 'Gruplama aktif', status: 'ok' },
    { title: 'Incident Correlation', value: seed.incidents.length, details: `${seed.incidents.length} olay`, status: 'ok' },
    { title: 'Capacity Scaling', value: 3, details: '3 politika', status: 'ok' },
    { title: 'Multi-Region Readiness', value: seed.regions.length, details: `${seed.regions.filter(r => r.status === 'active').length} aktif bolge`, status: 'ok' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Operations Details</h1>
      <p className="text-gray-600 mb-6">Track A - Operations servisleri</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.title} className={`p-4 rounded-lg border-2 ${statusColor(c.status)}`}>
            <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
            <p className="text-2xl font-bold mb-1">{c.value}</p>
            <p className="text-sm opacity-75">{c.details}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-sm text-gray-500">
        Last updated: {seed.generatedAt}
      </div>
    </div>
  );
}
