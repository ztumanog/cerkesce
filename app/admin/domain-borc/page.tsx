"use client";
import "@radix-ui/themes/styles.css";
import {
  Theme,
  Card,
  Badge,
  Flex,
  Grid,
  Text,
  Heading,
  Box,
  Separator,
  Progress,
  Button,
  Code,
} from "@radix-ui/themes";
import { useState } from "react";
import Link from "next/link";

type Domain = {
  name: string;
  files: number;
  integratedFiles: number;
  size: string;
  biggest: string;
  color: "violet" | "crimson" | "blue" | "green" | "amber";
  target: string;
  routeHref: string;
  icon: string;
  details: string[];
};

const domains: Domain[] = [
  {
    name: "concept",
    files: 6,
    integratedFiles: 4,
    size: "58KB",
    biggest: "ConceptRegistry.ts 33KB",
    color: "violet",
    target: "/kavram/[concept] + /admin/curation",
    routeHref: "/kavram/Дуней",
    icon: "🧠",
    details: [
      "ConceptRegistry.ts 33737b",
      "MeaningGraph.ts 6448b",
      "bridge/MeaningConceptLink.ts 644b",
      "ConceptValidator.ts 2164b",
      "MeaningConceptLinker.ts 2061b",
      "MeaningGraph service 9364b",
    ],
  },
  {
    name: "linguistic",
    files: 5,
    integratedFiles: 4,
    size: "242KB",
    biggest: "ConceptRegistry.ts 231KB",
    color: "crimson",
    target: "/sozluk/converter + /explorer",
    routeHref: "/sozluk/converter",
    icon: "📚",
    details: [
      "DialectConverter.ts (ADY %91.2 / KBD %70.6)",
      "ConceptRegistry.ts 231437b",
      "InflectionHandler.ts 1836b",
      "InMemoryVectorStore.ts 1963b",
      "WiktionaryParser.ts 4498b",
    ],
  },
  {
    name: "morphology",
    files: 19,
    integratedFiles: 12,
    size: "89KB",
    biggest: "LemmaBuilderV2.ts 20KB",
    color: "blue",
    target: "/sozluk/morphology + /morphology",
    routeHref: "/sozluk/morphology",
    icon: "🔤",
    details: [
      "LemmaBuilderV2.ts 20187b",
      "MorphemeParser.ts 9316b",
      "MorphologyAnalyzer.ts 6596b",
      "NumeralDecompiler.ts 5262b",
      "PronounDecompiler.ts 4867b",
      "19 decompiler total",
    ],
  },
  {
    name: "discovery",
    files: 15,
    integratedFiles: 13,
    size: "45KB",
    biggest: "QuerySemanticMapper.ts 8.7KB",
    color: "green",
    target: "/explorer + /kavram/[concept]",
    routeHref: "/explorer",
    icon: "🔍",
    details: [
      "QuerySemanticMapper.ts 8788b",
      "WordFamilyConceptMap.ts 7237b",
      "DiscoveryFacade.ts 5336b",
      "ConceptGraphAdapter.ts",
      "CytoscapeProjectionAdapter.ts",
    ],
  },
  {
    name: "analytics",
    files: 12,
    integratedFiles: 5,
    size: "23KB",
    biggest: "CsvExporter.ts 2.7KB",
    color: "amber",
    target: "/admin/faz-kontrol + /yonetim",
    routeHref: "/admin/faz-kontrol",
    icon: "📊",
    details: [
      "CsvExporter.ts 2783b",
      "ReportGenerator.ts 2617b",
      "UsageIntelligence.ts 2363b",
      "12 exporters total",
    ],
  },
];

const roadmap = [
  { domain: "concept", label: "Faz 5 • Core", desc: "Anlam grafı ve çift yönlü lehçe eşleşmesi /kavram/[concept] UI'a bağlandı" },
  { domain: "linguistic", label: "Faz 4 • Heavy", desc: "Huvaj 4.865 kayıt + sesbilimsel kural motoru /sozluk/converter UI'a bağlandı" },
  { domain: "morphology", label: "Faz 3 • Builder", desc: "Morfoloji çözümleyici /sozluk/morphology sayfasında aktif" },
  { domain: "discovery", label: "Faz 2 • Search", desc: "DiscoveryFacade ve Cytoscape grafı /explorer üzerinde çalışıyor" },
  { domain: "analytics", label: "Faz 1 • Quick Win", desc: "Rapor ve faz kontrol metrikleri /admin/faz-kontrol panosunda" },
];

export default function DomainBorcPage() {
  const [open, setOpen] = useState<string | null>("linguistic");
  const [integrated, setIntegrated] = useState<Record<string, boolean>>({
    concept: true,
    linguistic: true,
    morphology: true,
    discovery: true,
  });
  const [toast, setToast] = useState<string | null>(null);

  const totalFiles = domains.reduce((acc, d) => acc + d.files, 0);
  const totalIntegrated = domains.reduce(
    (acc, d) => acc + (integrated[d.name] ? d.files : d.integratedFiles),
    0
  );
  const progress = Math.round((totalIntegrated / totalFiles) * 100);

  return (
    <Theme appearance="dark" accentColor="violet" grayColor="slate" scaling="100%">
      {toast && (
        <Box
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--violet-9)",
            color: "white",
            padding: "10px 18px",
            borderRadius: 999,
            zIndex: 9999,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {toast}
        </Box>
      )}
      <Box
        style={{
          minHeight: "100vh",
          background: "var(--gray-1)",
          paddingTop: "var(--safe-area-inset-top)",
          boxSizing: "border-box",
        }}
      >
        {/* Top Nav */}
        <Box
          style={{
            position: "sticky",
            top: "var(--safe-area-inset-top)",
            zIndex: 10,
            background: "rgba(15,15,17,0.8)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--gray-5)",
          }}
          p="3"
        >
          <Flex justify="between" align="center" wrap="wrap" gap="3" style={{ maxWidth: 1320, margin: "0 auto", width: "100%" }}>
            <Flex align="center" gap="3">
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "var(--violet-9)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                ₼
              </Box>
              <Flex direction="column" gap="1">
                <Text size="1" weight="bold" style={{ letterSpacing: "0.14em", color: "var(--gray-10)" }}>
                  ADMIN / DOMAIN-BORC
                </Text>
                <Heading size="5" weight="bold" style={{ letterSpacing: "-0.02em" }}>
                  Domain Entegrasyon Haritası — Canlı UI Bağlantı Durumu
                </Heading>
              </Flex>
            </Flex>
            <Flex gap="2" align="center">
              <Badge color="green" variant="soft" radius="full" size="2">
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--green-9)", display: "inline-block", marginRight: 6 }} />
                %{progress} ENTEGRE
              </Badge>
              <Badge color="gray" variant="soft" radius="full">ADR-GOV-014/015</Badge>
            </Flex>
          </Flex>
        </Box>

        <Box p={{ initial: "4", md: "6" }} style={{ maxWidth: 1320, margin: "0 auto" }}>
          {/* Stats Row */}
          <Grid columns={{ initial: "1", sm: "3" }} gap="4" mb="6">
            <Card style={{ background: "var(--gray-2)", border: "1px solid var(--gray-5)" }}>
              <Flex direction="column" gap="3" p="2">
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium" color="gray">İZLENEN DOMAIN DOSYASI</Text>
                  <Badge color="violet" variant="soft" radius="full">{totalFiles}</Badge>
                </Flex>
                <Heading size="8" weight="bold" style={{ letterSpacing: "-0.04em" }}>{totalIntegrated} / {totalFiles}</Heading>
                <Box>
                  <Flex justify="between" mb="2">
                    <Text size="1" color="gray">UI entegrasyonu</Text>
                    <Text size="1" weight="bold" color="green">{progress}%</Text>
                  </Flex>
                  <Progress value={progress} color="green" size="2" radius="full" />
                  <Text size="1" color="gray" style={{ marginTop: 8, display: "block" }}>
                    {totalFiles - totalIntegrated} dosya kalan entegrasyon kuyruğunda
                  </Text>
                </Box>
              </Flex>
            </Card>

            <Card style={{ background: "var(--gray-2)", border: "1px solid var(--gray-5)" }}>
              <Flex direction="column" gap="3" p="2">
                <Text size="2" weight="medium" color="gray">TOPLAM KOD HACMİ</Text>
                <Heading size="8" weight="bold" style={{ letterSpacing: "-0.04em" }}>457KB</Heading>
                <Flex gap="2" wrap="wrap" mt="1">
                  <Badge variant="soft" color="crimson">linguistic 242KB • %53</Badge>
                  <Badge variant="soft" color="blue">morphology 89KB</Badge>
                  <Badge variant="soft" color="violet">concept 58KB</Badge>
                </Flex>
              </Flex>
            </Card>

            <Card style={{ background: "var(--violet-2)", border: "1px solid var(--violet-6)" }}>
              <Flex direction="column" gap="2" p="2">
                <Text size="2" weight="medium" style={{ color: "var(--violet-11)" }}>MİMARİ DURUM</Text>
                <Text size="3" weight="bold" style={{ lineHeight: "1.3" }}>
                  Çekirdek domain katmanları (Discovery, Linguistic, Morphology, Concept) canlı UI rotalarına bağlandı; 215 test paketi yeşil.
                </Text>
                <Separator size="4" my="2" style={{ background: "var(--violet-6)" }} />
                <Flex gap="2">
                  <Badge color="green" variant="solid" radius="full">4/5 DOMAIN AKTİF</Badge>
                  <Badge color="amber" variant="soft" radius="full">Analytics kuyrukta</Badge>
                </Flex>
              </Flex>
            </Card>
          </Grid>

          {/* Domain Cards */}
          <Flex justify="between" align="end" mb="4" wrap="wrap" gap="2">
            <Heading size="5">Domain Kümeleri</Heading>
            <Text size="2" color="gray">5 domain kümesi • canlı rota bağlantıları ve dosya dağılımı</Text>
          </Flex>

          <Grid columns={{ initial: "1", sm: "2", lg: "5" }} gap="4" mb="8">
            {domains.map((d) => {
              const isDone = Boolean(integrated[d.name]);
              return (
                <Card
                  key={d.name}
                  style={{
                    background: "var(--gray-2)",
                    border: `1px solid var(--${d.color}-5)`,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `var(--${d.color}-9)`,
                    }}
                  />

                  <Flex direction="column" gap="3" p="1" style={{ flex: 1 }}>
                    <Flex justify="between" align="start">
                      <Flex align="center" gap="2">
                        <Box
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 12,
                            background: `var(--${d.color}-3)`,
                            border: `1px solid var(--${d.color}-6)`,
                            display: "grid",
                            placeItems: "center",
                            fontSize: 18,
                          }}
                        >
                          {d.icon}
                        </Box>
                        <Flex direction="column">
                          <Text size="3" weight="bold" style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            {d.name}
                          </Text>
                          <Text size="1" color="gray">{d.size} • {d.files} dosya</Text>
                        </Flex>
                      </Flex>
                      <Badge color={d.color} variant="soft" radius="full">
                        {isDone ? d.files : d.integratedFiles}/{d.files}
                      </Badge>
                    </Flex>

                    <Flex gap="2">
                      <Badge color={isDone ? "green" : "amber"} variant="solid" radius="full" size="1">
                        {isDone ? "UI BAĞLI ✓" : "KISMİ UI"}
                      </Badge>
                      <Badge color="gray" variant="soft" radius="full" size="1">{d.size}</Badge>
                    </Flex>

                    <Box
                      style={{
                        background: `var(--${d.color}-2)`,
                        border: `1px dashed var(--${d.color}-7)`,
                        borderRadius: 12,
                        padding: "10px 12px",
                      }}
                    >
                      <Text size="1" color="gray" weight="medium" style={{ display: "block", marginBottom: 4 }}>ANA BİLEŞEN</Text>
                      <Text size="2" weight="bold" style={{ color: `var(--${d.color}-11)` }}>{d.biggest}</Text>
                    </Box>

                    <Box>
                      <Text size="1" color="gray" weight="medium" style={{ marginBottom: 6, display: "block" }}>HEDEF ROUTE</Text>
                      <Link href={d.routeHref} style={{ textDecoration: "none" }}>
                        <Code variant="soft" color={d.color} size="2" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                          {d.target} ↗
                        </Code>
                      </Link>
                    </Box>

                    <Separator size="4" />

                    <Box>
                      <Button
                        variant="soft"
                        color={d.color}
                        size="1"
                        radius="full"
                        onClick={() => setOpen(open === d.name ? null : d.name)}
                        style={{ width: "100%", justifyContent: "space-between" }}
                      >
                        <span>Dosya detayları • {d.details.length}</span>
                        <span>{open === d.name ? "−" : "+"}</span>
                      </Button>

                      {open === d.name && (
                        <Box mt="3">
                          <Flex direction="column" gap="1">
                            {d.details.map((det) => (
                              <Flex key={det} gap="2" align="start" style={{ padding: "6px 8px", background: "var(--gray-3)", borderRadius: 8 }}>
                                <Box style={{ width: 4, height: 4, borderRadius: 999, background: `var(--${d.color}-9)`, marginTop: 6, flexShrink: 0 }} />
                                <Text size="1" style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", lineHeight: "1.4" }}>{det}</Text>
                              </Flex>
                            ))}
                          </Flex>
                        </Box>
                      )}
                    </Box>

                    <Box style={{ marginTop: "auto", paddingTop: 8 }}>
                      <Button
                        color={d.color}
                        variant={isDone ? "soft" : "solid"}
                        size="2"
                        style={{ width: "100%" }}
                        onClick={() => {
                          setIntegrated((p) => ({ ...p, [d.name]: !p[d.name] }));
                          setToast(`${d.name} ${isDone ? "kısmi duruma alındı" : "tam entegre işaretlendi ✓"}`);
                          setTimeout(() => setToast(null), 2200);
                        }}
                      >
                        {isDone ? "✓ UI Bağlı" : "Tamamlandı İşaretle →"}
                      </Button>
                    </Box>
                  </Flex>
                </Card>
              );
            })}
          </Grid>

          {/* Roadmap */}
          <Card style={{ background: "var(--gray-2)", border: "1px solid var(--gray-5)" }}>
            <Box p="4">
              <Flex justify="between" align="center" mb="1">
                <Heading size="3">Entegrasyon Yol Haritası</Heading>
                <Badge color="green" variant="soft" radius="full">4/5 Faz Tamamlandı</Badge>
              </Flex>
              <Text size="2" color="gray" mb="4" style={{ display: "block" }}>
                concept → linguistic → morphology → discovery → analytics
              </Text>

              <Flex direction="column" gap="0" style={{ position: "relative" }}>
                <Box style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 2, background: "var(--gray-6)", borderRadius: 999 }} />

                {roadmap.map((step, i) => {
                  const dom = domains.find((d) => d.name === step.domain)!;
                  const isLast = i === roadmap.length - 1;
                  return (
                    <Flex key={step.domain} gap="4" style={{ position: "relative", paddingBottom: isLast ? 0 : 28 }}>
                      <Box
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 999,
                          background: `var(--${dom.color}-9)`,
                          border: "3px solid var(--gray-2)",
                          display: "grid",
                          placeItems: "center",
                          color: "white",
                          fontWeight: 800,
                          fontSize: 12,
                          zIndex: 1,
                          flexShrink: 0,
                        }}
                      >
                        {roadmap.length - i}
                      </Box>
                      <Box style={{ flex: 1, background: "var(--gray-3)", border: `1px solid var(--${dom.color}-5)`, borderRadius: 14, padding: "12px 14px" }}>
                        <Flex justify="between" align="center" mb="1">
                          <Flex align="center" gap="2">
                            <Text size="2" weight="bold" style={{ textTransform: "uppercase" }}>{step.domain}</Text>
                            <Badge color={dom.color} variant="soft" size="1" radius="full">{dom.files} dosya</Badge>
                          </Flex>
                          <Badge variant="soft" color="gray" size="1" radius="full">{step.label}</Badge>
                        </Flex>
                        <Text size="2" color="gray" style={{ lineHeight: "1.4" }}>{step.desc}</Text>
                        <Flex gap="2" mt="3" align="center">
                          <Link href={dom.routeHref} style={{ textDecoration: "none" }}>
                            <Code variant="soft" size="1" color={dom.color}>{dom.target} ↗</Code>
                          </Link>
                          <Box style={{ flex: 1, height: 1, background: `var(--${dom.color}-5)` }} />
                          <Text size="1" color="green">{integrated[dom.name] ? "✓ Aktif" : "Kısmi"}</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          </Card>

          <Flex justify="center" mt="6" mb="2">
            <Text size="1" color="gray">app/admin/domain-borc/page.tsx • Radix Design System • %{progress} entegre</Text>
          </Flex>
        </Box>
      </Box>
    </Theme>
  );
}