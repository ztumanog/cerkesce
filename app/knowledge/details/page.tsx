import fs from 'fs';
import path from 'path';
import KnowledgeDetailsClient from './KnowledgeDetailsClient';

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

function loadSeed(): SeedData {
  const seedPath = path.resolve('./data/knowledge-seed.json');
  if (fs.existsSync(seedPath)) {
    return JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
  }
  return { adrs: [], phases: [], generatedAt: new Date().toISOString() };
}

export default function KnowledgeDetailsPage() {
  const seed = loadSeed();
  return <KnowledgeDetailsClient seed={seed} />;
}
