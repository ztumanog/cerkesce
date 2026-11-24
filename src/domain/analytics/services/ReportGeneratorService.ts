/**
 * ReportGeneratorService
 * Phase 7.0.5: Reporting · REPORT-001: ürünleştirildi (Kavram Ağı → Rapor İndir)
 *
 * Rapor üretimi:
 * - Network raporu (Özet: kavram, düğüm/bağ sayısı, merkez kavram, izole düğüm)
 * - Markdown / JSON çıktısı
 *
 * Rapor, kendisine verilen ağ üzerinden üretilir — Kavram Ağı ekranında bu,
 * LargeGraphOptimizer budaması SONRASI ekranda görünen görünümüdür (40 bin
 * kayıtlık ham veri seti değil; REPORT-001 kuralı).
 */

import { GenericConceptNetworkDTO } from './ExportEngineService';

export interface ReportOptions {
  title?: string;
  author?: string;
  /** Raporun ait olduğu kavram (Özet bölümünde "Kavram:" satırı olarak çıkar) */
  concept?: string;
  includeStats?: boolean;
}

export interface ReportResult {
  title: string;
  author: string;
  generatedAt: string;
  sections: ReportSection[];
}

export interface ReportSection {
  heading: string;
  content: string;
}

export class ReportGeneratorService {
  /**
   * Network raporu üretir.
   */
  static generateNetworkReport(
    network: GenericConceptNetworkDTO,
    options: ReportOptions = {}
  ): ReportResult {
    const title = options.title || 'Kavram Ağı Raporu';
    const author = options.author || 'Çerkesçe Platform';
    const includeStats = options.includeStats !== false;

    // Derece hesabı: merkez kavram (en yüksek dereceli düğüm) ve izole düğümler için
    const degrees = new Map<string, number>();
    for (const n of network.nodes) degrees.set(n.id, 0);
    for (const e of network.edges) {
      if (degrees.has(e.source)) degrees.set(e.source, (degrees.get(e.source) || 0) + 1);
      if (degrees.has(e.target)) degrees.set(e.target, (degrees.get(e.target) || 0) + 1);
    }
    let merkezId: string | null = null;
    let merkezDerece = 0;
    for (const [id, derece] of degrees) {
      if (derece > merkezDerece) {
        merkezDerece = derece;
        merkezId = id;
      }
    }
    const merkezLabel = merkezId
      ? network.nodes.find(n => n.id === merkezId)?.label || merkezId
      : '—';
    const izoleDugum = [...degrees.values()].filter(d => d === 0).length;

    const sections: ReportSection[] = [];

    // 1. Özet (REPORT-001 v1 şablonu)
    const ozetSatirlari = [
      ...(options.concept ? [`Kavram: ${options.concept}`] : []),
      `Düğüm Sayısı: ${network.nodes.length}`,
      `Bağ Sayısı: ${network.edges.length}`,
      `Merkez Kavram: ${merkezLabel}`,
      `İzole Düğüm: ${izoleDugum}`,
    ];
    sections.push({ heading: 'Özet', content: ozetSatirlari.join('\n') });

    // 2. Düğümler
    sections.push({
      heading: 'Düğümler',
      content: network.nodes.map(n => `- ${n.id}: ${n.label || 'N/A'}`).join('\n'),
    });

    // 3. Kenarlar
    if (network.edges.length > 0) {
      sections.push({
        heading: 'Kenarlar',
        content: network.edges.map(e => `- ${e.source} -> ${e.target} (${e.relationType || 'N/A'})`).join('\n'),
      });
    }

    // 4. İstatistikler
    if (includeStats) {
      sections.push({
        heading: 'İstatistikler',
        content: [
          `Toplam düğüm: ${network.nodes.length}`,
          `Toplam kenar: ${network.edges.length}`,
          `Ortalama derece: ${(2 * network.edges.length / Math.max(network.nodes.length, 1)).toFixed(2)}`,
        ].join('\n'),
      });
    }

    return {
      title,
      author,
      generatedAt: new Date().toISOString(),
      sections,
    };
  }

  /**
   * Raporu Markdown formatına çevirir.
   */
  static toMarkdown(report: ReportResult): string {
    let md = `# ${report.title}\n\n`;
    md += `**Yazar:** ${report.author}\n`;
    md += `**Tarih:** ${report.generatedAt}\n\n`;

    for (const section of report.sections) {
      md += `## ${section.heading}\n\n`;
      md += `${section.content}\n\n`;
    }

    return md;
  }

  /**
   * Raporu JSON formatına çevirir.
   */
  static toJSON(report: ReportResult): string {
    return JSON.stringify(report, null, 2);
  }
}
