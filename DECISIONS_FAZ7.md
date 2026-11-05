# DECISIONS_FAZ7
- ExportEngineService.exportSVG: Math.random kaldirildi; deterministik dairesel yerlesim (index tabanli angle, cos/sin). ExportResult zarfi korundu (format SVG, mimeType image/svg+xml, nodeCount, edgeCount).
- app/explorer/page.tsx: named import ({ NetworkExplorerPage }), "use client", relative import (../../src/ui/pages/).
- vitest.config.ts: cift globals temizlendi, eski exclude satirlari kaldirildi.
- Dogrulama: tsc 0 hata, Vitest 19/19 (ExportEngine 6, LayoutAndBatchExport 5, SvgLayoutEngine 8), npm run build yesil, /explorer canli (3 node deterministik).
- Manifest: data/faz-kontrol.json - 583 dosya, 651 ham kenar, 648 tekil.
