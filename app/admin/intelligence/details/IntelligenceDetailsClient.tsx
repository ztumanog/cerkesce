'use client';

interface TrackBSeed {
  recommendations: any[];
  scores: any[];
  explanations: any[];
  scenarios: any[];
  decisions: any[];
  generatedAt: string;
}

export default function IntelligenceDetailsClient({ seed }: { seed: TrackBSeed }) {
  const statusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const avgScore = seed.scores.length > 0
    ? (seed.scores.reduce((s, x) => s + (x.score ?? 0), 0) / seed.scores.length).toFixed(2)
    : '0.00';

  const successRate = seed.decisions.length > 0
    ? Math.round((seed.decisions.filter(d => d.success).length / seed.decisions.length) * 100)
    : 0;

  const cards = [
    { title: 'Recommendation Tuning', value: seed.recommendations.length, details: `${seed.recommendations.length} oneri`, status: 'ok' },
    { title: 'Confidence Scoring', value: avgScore, details: `Ortalama skor`, status: 'ok' },
    { title: 'Explainability', value: seed.explanations.length, details: `${seed.explanations.length} aciklama`, status: 'ok' },
    { title: 'Scenario Simulation', value: seed.scenarios.length, details: `${seed.scenarios.length} senaryo`, status: 'ok' },
    { title: 'Decision Analytics', value: seed.decisions.length, details: `%${successRate} basari`, status: 'ok' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Intelligence Details</h1>
      <p className="text-gray-600 mb-6">Track B - Intelligence servisleri</p>
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
