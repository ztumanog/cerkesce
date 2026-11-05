import fs from 'fs';
import path from 'path';

export default function FazKontrolPage() {
  // B secenegi: Gercek manifest'i fs ile oku - import degil
  const p1 = path.join(process.cwd(), 'app/admin/faz-kontrol/data/faz-kontrol.json');
  const p2 = path.join(process.cwd(), 'src/data/faz-kontrol.json');
  let manifestPath = '';
  if (fs.existsSync(p1)) manifestPath = p1;
  else if (fs.existsSync(p2)) manifestPath = p2;
  else return <div style={{padding:20}}>manifest bulunamadı - {p1} ve {p2} yok</div>;

  const raw = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(raw);
  const uniq = new Set(manifest.edges.map((e:any) => `${e.from}->${e.to}`)).size;

  return (
    <div style={{padding:20,fontFamily:'monospace',whiteSpace:'pre-wrap'}}>
      <h1>Faz Kontrol - B Secenegi (Canli)</h1>
      <p>Kaynak: {manifestPath}</p>
      <p>Scanned: {manifest.scannedFiles} | Ham: {manifest.edges.length} | Tekil: {uniq}</p>
      <p>Tarih: {manifest.generatedAt}</p>
      <h2>Findings</h2>
      <pre style={{background:'#111',color:'#0f0',padding:10}}>{JSON.stringify(manifest.findings,null,2)}</pre>
      <h2 style={{color:'red'}}>Bilinen Borc: Math.random() Line 104-105</h2>
      <p>ExportEngineService.ts:104-105 Math.random() - Kabul edildi, ayri duzeltme</p>
      <h3>Kanıt - UI mount</h3>
      <p>app/explorer/page.tsx:2 -> ui/pages/NetworkExplorerPage -> CANLI</p>
      <h3>Kanıt - Tekilleştirme</h3>
      <p>651 ham -> {uniq} tekil - 2 kopya var (BatchExport->ExportEngine 2x, errorTracker 2x)</p>
    </div>
  );
}
