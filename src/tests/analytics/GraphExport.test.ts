/**
 * GraphExport - kavram-agi export butonlarının dönüştürücü testi.
 *
 * toExportNetwork: CytoscapeElementData -> GenericConceptNetworkDTO eşlemesi ve
 * ExportEngineService üzerinden SVG/JSON üretiminin uçtan uca çalıştığını doğrular.
 * (PNG bilinçli olarak test edilmez: exportPNG hâlâ 1x1 stub döndürür.)
 */

import { describe, it, expect } from "vitest";
import { toExportNetwork } from "../../ui/components/discovery/GraphExport";
import { ExportEngineService } from "../../domain/analytics/services/ExportEngineService";
import type { CytoscapeElementData } from "../../ui/components/discovery/ConceptGraphCanvas";

const sample: CytoscapeElementData = {
  nodes: [
    { data: { id: "SEA", label: "Sea [SEA]", nodeType: "ROOT" } },
    { data: { id: "хы", label: "хы (WESTERN)", nodeType: "CHILD", dialect: "WESTERN" } },
    { data: { id: "SEED-SEA-0" } }, // label yok -> id'ye düşmeli
  ],
  edges: [
    { data: { source: "SEA", target: "хы", relationType: "CHILD" } },
    { data: { source: "SEA", target: "SEED-SEA-0" } },
  ],
};

describe("toExportNetwork", () => {
  it("düğüm ve kenarları ExportEngine DTO'suna eşler", () => {
    const net = toExportNetwork(sample);
    expect(net.nodes).toHaveLength(3);
    expect(net.edges).toHaveLength(2);
    expect(net.nodes[0]).toMatchObject({ id: "SEA", label: "Sea [SEA]" });
    expect(net.edges[0]).toMatchObject({ source: "SEA", target: "хы", relationType: "CHILD" });
  });

  it("labelsız düğüm id'ye düşer", () => {
    const net = toExportNetwork(sample);
    expect(net.nodes[2].label).toBe("SEED-SEA-0");
  });

  it("boş/undefined girişte patlamaz, boş ağ döner", () => {
    expect(toExportNetwork({ nodes: [], edges: [] })).toEqual({ nodes: [], edges: [] });
  });
});

describe("ExportEngineService uçtan uca (GraphExport kullanım senaryosu)", () => {
  const net = toExportNetwork(sample);

  it("SVG üretir: svg kök elemanı + düğüm sayısı kadar circle", () => {
    const r = ExportEngineService.exportNetwork(net, { format: "SVG", width: 1280, height: 960 });
    expect(r.format).toBe("SVG");
    expect(r.mimeType).toBe("image/svg+xml");
    expect(r.nodeCount).toBe(3);
    expect(r.edgeCount).toBe(2);
    expect(r.content).toContain("<svg");
    expect(r.content).toContain("</svg>");
    expect(r.content.match(/<circle/g)?.length).toBe(3);
  });

  it("JSON üretir: schemaVersion + network", () => {
    const r = ExportEngineService.exportNetwork(net, { format: "JSON" });
    expect(r.format).toBe("JSON");
    const parsed = JSON.parse(r.content);
    expect(parsed.schemaVersion).toBe("1.0");
    expect(parsed.network.nodes).toHaveLength(3);
  });
});
