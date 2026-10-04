import fs from 'fs';
import path from 'path';
import IntelligenceDetailsClient from './IntelligenceDetailsClient';

interface TrackBSeed {
  recommendations: any[];
  scores: any[];
  explanations: any[];
  scenarios: any[];
  decisions: any[];
  generatedAt: string;
}

function loadSeed(): TrackBSeed {
  const seedPath = path.resolve('./data/knowledge-seed.json');
  if (fs.existsSync(seedPath)) {
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    return seed.trackB ?? {
      recommendations: [],
      scores: [],
      explanations: [],
      scenarios: [],
      decisions: [],
      generatedAt: new Date().toISOString(),
    };
  }
  return {
    recommendations: [],
    scores: [],
    explanations: [],
    scenarios: [],
    decisions: [],
    generatedAt: new Date().toISOString(),
  };
}

export default function IntelligenceDetailsPage() {
  const seed = loadSeed();
  return <IntelligenceDetailsClient seed={seed} />;
}
