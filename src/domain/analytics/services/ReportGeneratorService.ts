/**
 * ReportGeneratorService
 * Phase 7.0.5: Reporting
 *
 * Rapor uretimi:
 * - Network raporu
 * - Dialect raporu
 * - Analytics raporu
 */

import { GenericConceptNetworkDTO } from './ExportEngineService';

export interface ReportOptions {
  title?: string;
  author?: string;
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
   * Network raporu uretir.
   */
  static generateNetworkReport(
    network: GenericConceptNetworkDTO,
    options: ReportOptions = {}
  ): ReportResult {
    const title = options.title || 'Concept Network Report';
    const author = options.author || 'Cerkesce Platform';
    const includeStats = options.includeStats !== false;

    const sections: ReportSection[] = [];

    // 1. Ozet
    sections.push({
      heading: 'Ozet',
      content: `Bu rapor ${network.nodes.length} dugum ve ${network.edges.length} kenar icermektedir.`,
    });

    // 2. Dugumler
    sections.push({
      heading: 'Dugumler',
      content: network.nodes.map(n => `- ${n.id}: ${n.label || 'N/A'}`).join('\n'),
    });

    // 3. Kenarlar
    if (network.edges.length > 0) {
      sections.push({
        heading: 'Kenarlar',
        content: network.edges.map(e => `- ${e.source} -> ${e.target} (${e.relationType || 'N/A'})`).join('\n'),
      });
    }

    // 4. Istatistikler
    if (includeStats) {
      sections.push({
        heading: 'Istatistikler',
        content: [
          `Toplam dugum: ${network.nodes.length}`,
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
   * Raporu Markdown formatina cevirir.
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
   * Raporu JSON formatina cevirir.
   */
  static toJSON(report: ReportResult): string {
    return JSON.stringify(report, null, 2);
  }
}
