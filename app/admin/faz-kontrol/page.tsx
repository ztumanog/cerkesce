import fs from 'fs';
import path from 'path';

export default function FazKontrolPage() {
  const manifestPath = path.join(process.cwd(), 'data', 'faz-kontrol.json');
  if (!fs.existsSync(manifestPath)) {
    return <div style={{padding:20}}>manifest bulunamadi: {manifestPath}</div>;
  }
  const raw = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(raw);
  const uniq = new Set(manifest.edges.map((e:any) => `${e.from}->${e.to}`)).size;

  return (
    <div style={{padding:20,fontFamily:'monospace',whiteSpace:'pre-wrap'}}>
      <h1>Faz Kontrol - data/faz-kontrol.json</h1>
      <p>Kaynak: {manifestPath}</p>
      <p>Scanned: {manifest.scannedFiles} | Ham: {manifest.edges.length} | Tekil: {uniq}</p>
      <p>Tarih: {manifest.generatedAt}</p>
      <h2>Findings</h2>
      <pre style={{background:'#111',color:'#0f0',padding:10}}>{JSON.stringify(manifest.findings,null,2)}</pre>
      <h2 style={{color:'red'}}>Bilinen Borc: Math.random() 104-105 ExportEngineService.ts</h2>
      <p>SvgLayoutEngineService.ts 13 sadece DTO -{">"} GenericConceptNetworkDTO</p>
      <p>app/explorer/page.tsx 2 -{">"} ui/pages/NetworkExplorerPage -{">"} CANLI</p>
      <p>651 ham -{">"} {uniq} tekil - 2 kopya BatchExport ve errorTracker</p>
      <h3>SvgLayoutEngineService 8 test gecti</h3>
    </div>
  );
}
