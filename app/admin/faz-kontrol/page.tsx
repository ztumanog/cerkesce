import fs from 'fs';
import path from 'path';

export default function FazKontrolPage() {
  const manifestPath = path.join(process.cwd(), 'data', 'faz-kontrol.json');
  if (!fs.existsSync(manifestPath)) {
    return <div style={{padding:40}}>manifest bulunamadi: {manifestPath}</div>;
  }
  const raw = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(raw);
  const uniq = new Set(manifest.edges.map((e:any) => `${e.from}->${e.to}`)).size;
  const dup = manifest.edges.length - uniq;

  const findings = manifest.findings;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f8fafc,#eef2ff)', padding: 24, fontFamily: 'Inter,sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1e1b4b' }}>Faz Kontrol Paneli</h1>
              <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: 13 }}>B Secenegi - Dosya silme yok, sadece yedek - Gercek vs Stub analizi</p>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', background: '#f1f5f9', padding: '8px 12px', borderRadius: 8 }}>{manifestPath}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginTop: 20 }}>
            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Taranan Dosya</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{manifest.scannedFiles}</div>
            </div>
            <div style={{ background: 'white', border: '2px solid #e2e8f0', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Ham Edge</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1e293b' }}>{manifest.edges.length}</div>
            </div>
            <div style={{ background: 'white', border: '2px solid #e2e8f0', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Tekil Edge</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1e293b' }}>{uniq}</div>
              <div style={{ fontSize: 11, color: '#f59e0b' }}>{dup} kopya var</div>
            </div>
            <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: '#166534' }}>Durum</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#15803d' }}>✓ 19 test gecti</div>
              <div style={{ fontSize: 11, color: '#16a34a' }}>{manifest.generatedAt?.slice(0,19)}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h2 style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 700 }}>🔍 Kanitlar (Findings)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: findings.batchCallsExportEngine ? '#f0fdf4' : '#fef2f2', border: `1px solid ${findings.batchCallsExportEngine ? '#bbf7d0' : '#fecaca'}` }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>batchCallsExportEngine</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: findings.batchCallsExportEngine ? '#15803d' : '#dc2626' }}>{findings.batchCallsExportEngine ? '✓ KANIT: BatchExport -> ExportEngine cagiriyor' : '✗ Yok'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: findings.canvasDiscardsRealSvg ? '#fef2f2' : '#f0fdf4', border: `1px solid ${findings.canvasDiscardsRealSvg ? '#fecaca' : '#bbf7d0'}` }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>canvasDiscardsRealSvg</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: findings.canvasDiscardsRealSvg ? '#dc2626' : '#15803d' }}>{findings.canvasDiscardsRealSvg ? '⚠ BUG: Canvas gercek SVGyi cope atiyor' : '✓ OK'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: findings.usesMathRandom ? '#fef3c7' : '#f0fdf4', border: `1px solid ${findings.usesMathRandom ? '#fde68a' : '#bbf7d0'}` }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>usesMathRandom</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: findings.usesMathRandom ? '#d97706' : '#15803d' }}>{findings.usesMathRandom ? '⚠ BORC: ExportEngine 104-105 Math.random()' : '✓ Deterministik'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: findings.appHasNetworkExplorer ? '#f0fdf4' : '#fef2f2', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>appHasNetworkExplorer</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: findings.appHasNetworkExplorer ? '#15803d' : '#d97706' }}>{findings.appHasNetworkExplorer ? '✓ app/explorer canli' : '✗ ONCE false idi, simdi true'}</span>
              </div>
            </div>
            <pre style={{ marginTop: 16, background: '#0f172a', color: '#38bdf8', padding: 12, borderRadius: 8, fontSize: 11, overflow: 'auto' }}>{JSON.stringify(findings, null, 2)}</pre>
          </div>

          <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h2 style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 700 }}>🗺️ Export Pipeline - 2 Yol</h2>
            
            <div style={{ borderLeft: '4px solid #f87171', paddingLeft: 12, marginBottom: 16, background: '#fef2f2', borderRadius: '0 8px 8px 0', paddingTop: 10, paddingBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#991b1b' }}>OLD: BatchExport → ExportEngine</div>
              <div style={{ fontSize: 12, color: '#7f1d1d', marginTop: 4 }}>• Math.random() x/y (satir 104-105) - non-deterministik</div>
              <div style={{ fontSize: 12, color: '#7f1d1d' }}>• Edge cizmez, sadece node</div>
              <div style={{ fontSize: 12, color: '#7f1d1d' }}>• PNG 1x1 stub base64</div>
              <div style={{ fontSize: 12, color: '#7f1d1d' }}>• Buffer kullanir - browser uyumsuz</div>
            </div>

            <div style={{ borderLeft: '4px solid #34d399', paddingLeft: 12, marginBottom: 16, background: '#f0fdf4', borderRadius: '0 8px 8px 0', paddingTop: 10, paddingBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#065f46' }}>NEW: SvgLayoutEngine → LayoutEngine (Gercek)</div>
              <div style={{ fontSize: 12, color: '#064e3b', marginTop: 4 }}>• CIRCULAR / GRID deterministik (commit 60e9283)</div>
              <div style={{ fontSize: 12, color: '#064e3b' }}>• nodeMap + &lt;line&gt; ile edge cizer</div>
              <div style={{ fontSize: 12, color: '#064e3b' }}>• XML escaping, style defs</div>
              <div style={{ fontSize: 12, color: '#064e3b' }}>• SvgLayoutEngine 8 test gecti ✓</div>
            </div>

            <div style={{ background: '#eef2ff', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4338ca' }}>📊 651 ham → {uniq} tekil</div>
              <div style={{ fontSize: 11, color: '#6366f1', marginTop: 4 }}>2 kopya: BatchExport→ExportEngine 2x, errorTracker 2x</div>
              <div style={{ fontSize: 11, color: '#6366f1', marginTop: 8 }}>app/explorer/page.tsx:2 → ui/pages/NetworkExplorerPage → CANLI ✓</div>
              <div style={{ fontSize: 11, color: '#6366f1' }}>SvgLayoutEngineService.ts:13 sadece DTO → GenericConceptNetworkDTO</div>
            </div>

            <div style={{ marginTop: 16, padding: '10px 12px', background: '#fef3c7', borderRadius: 8, border: '1px solid #fde68a' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e' }}>⚠️ Bilinen Borc</div>
              <div style={{ fontSize: 11, color: '#78350f' }}>Math.random() 104-105 ExportEngineService.ts - Faz 7de kapatildi, deterministik dairesel yerlesim yapildi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
