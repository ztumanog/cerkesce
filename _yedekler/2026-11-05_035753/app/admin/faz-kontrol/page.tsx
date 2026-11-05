
import fs from 'fs';
import path from 'path';

export default function FazKontrolPage() {
  const manifestPath = path.join(process.cwd(), 'src/data/faz-kontrol.json');
  const raw = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(raw);
  
  return (
    <div style={{padding:20, fontFamily:'monospace'}}>
      <h1>Faz UI Kontrol - Gerçek Manifest</h1>
      <p>Tarama: {manifest.scannedFiles} dosya, {manifest.edges.length} edge</p>
      <p>Tarih: {manifest.generatedAt}</p>
      <h2>Bulgular (findings)</h2>
      <pre>{JSON.stringify(manifest.findings, null, 2)}</pre>
      <h3 style={{color: manifest.findings.batchCallsExportEngine ? 'red' : 'green'}}>
        API Canlı mı? {manifest.findings.batchCallsExportEngine ? 'EVET - Eski ExportEngine canlı' : 'Hayır'}
      </h3>
      <h3 style={{color: manifest.findings.appHasNetworkExplorer ? 'green' : 'red'}}>
        Next.js app/ Canlı mı? {manifest.findings.appHasNetworkExplorer ? 'EVET' : 'HAYIR - ÖLÜ'}
      </h3>
      <h2>Son 20 Edge</h2>
      <pre>{JSON.stringify(manifest.edges.slice(-20), null, 2)}</pre>
    </div>
  );
}
