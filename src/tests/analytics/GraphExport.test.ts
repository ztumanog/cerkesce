/**
 * GraphExport - kavram-agi export butonlarının dönüştürücü testi.
 *
 * toExportNetwork: CytoscapeElementData -> GenericConceptNetworkDTO eşlemesi ve
 * ExportEngineService üzerinden SVG/JSON üretiminin uçtan uca çalıştığını doğrular.
 * (PNG bilinçli olarak test edilmez: exportPNG hâlâ 1x1 stub döndürür.)
 */

import { describe, it, expect } from "vitest";
import { toExportNetwork } from "../../ui/components/discovery/GraphExport";
import { optimizeGraphDataForViewport } from "../../ui/components/discovery/graphExportUtils";
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

describe("optimizeGraphDataForViewport - LargeGraphOptimizerService bağlantısı", () => {
  const bigGraph: CytoscapeElementData = {
    nodes: Array.from({ length: 80 }, (_, i) => ({
      data: { id: `N${i}`, label: `Düğüm ${i}`, nodeType: i === 0 ? "ROOT" : "CHILD" },
    })),
    edges: Array.from({ length: 79 }, (_, i) => ({
      // Yıldız topolojisi: N0 merkez, diğerleri onunla bağlı (yüksek derece)
      data: { source: "N0", target: `N${i + 1}`, relationType: "CHILD" },
    })),
  };

  it("eşik altında: veri dokunulmaz, pruned null", () => {
    const small: CytoscapeElementData = {
      nodes: [{ data: { id: "A" } }, { data: { id: "B" } }],
      edges: [{ data: { source: "A", target: "B" } }],
    };
    const r = optimizeGraphDataForViewport(small, 60);
    expect(r.data).toBe(small);
    expect(r.pruned).toBeNull();
  });

  it("eşik üstünde: en yüksek dereceli düğümler kalır, zengin veri korunur", () => {
    const r = optimizeGraphDataForViewport(bigGraph, 10);
    expect(r.pruned).toEqual({ visible: 10, total: 80 });
    expect(r.data.nodes).toHaveLength(10);
    // Merkez düğüm (N0, 79 bağ) asla atılmamalı
    expect(r.data.nodes.some((n) => String(n.data.id) === "N0")).toBe(true);
    // nodeType gibi zengin alanlar korunmalı
    const root = r.data.nodes.find((n) => String(n.data.id) === "N0");
    expect(root?.data.nodeType).toBe("ROOT");
    // Kenarlar yalnızca görünür düğümler arasında
    const ids = new Set(r.data.nodes.map((n) => String(n.data.id)));
    expect(r.data.edges.every((e) => ids.has(String(e.data.source)) && ids.has(String(e.data.target)))).toBe(true);
  });
});
