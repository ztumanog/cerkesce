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

type Domain = {
  name: string;
  files: number;
  size: string;
  biggest: string;
  color: "violet" | "crimson" | "blue" | "green" | "amber";
  target: string;
  icon: string;
  details: string[];
};

const domains: Domain[] = [
  {
    name: "concept",
    files: 6,
    size: "58KB",
    biggest: "ConceptRegistry.ts 33KB",
    color: "violet",
    target: "/admin/curation/concepts",
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
    size: "242KB",
    biggest: "ConceptRegistry.ts 231KB",
    color: "crimson",
    target: "/admin/curation/bulk + /explorer",
    icon: "📚",
    details: [
      "ConceptRegistry.ts 231437b HUGE",
      "InflectionHandler.ts 1836b",
      "InMemoryVectorStore.ts 1963b",
      "SemanticRelation.ts 2038b",
      "WiktionaryParser.ts 4498b",
    ],
  },
  {
    name: "morphology",
    files: 19,
    size: "89KB",
    biggest: "LemmaBuilderV2.ts 20KB",
    color: "blue",
    target: "/admin/curation/single/[id]",
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
    size: "45KB",
    biggest: "QuerySemanticMapper.ts 8.7KB",
    color: "green",
    target: "/explorer",
    icon: "🔍",
    details: [
      "QuerySemanticMapper.ts 8788b",
      "WordFamilyConceptMap.ts 7237b",
      "DiscoveryFacade.ts 5336b",
      "LexemeConceptLookupAdapter.ts 4008b",
      "15 services total",
    ],
  },
  {
    name: "analytics",
    files: 12,
    size: "23KB",
    biggest: "CsvExporter.ts 2.7KB",
    color: "amber",
    target: "/admin/faz-kontrol + /yonetim",
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
  { domain: "concept", label: "Faz 5 • Core", desc: "Anlam grafı UI'a bağlanacak" },
  { domain: "linguistic", label: "Faz 4 • Heavy", desc: "231KB Registry parçalanacak" },
  { domain: "morphology", label: "Faz 3 • Builder", desc: "19 decompiler tek editörde" },
  { domain: "discovery", label: "Faz 2 • Search", desc: "Explorer'a semantic katman" },
  { domain: "analytics", label: "Faz 1 • Quick Win", desc: "Export'lar yönetim paneline" },
];

export default function DomainBorcPage() {
  const [open, setOpen] = useState<string | null>("concept");
  const [progress] = useState(0);
  const [integrated, setIntegrated] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [totalProgress, setTotalProgress] = useState(0);

  return (
    <Theme
      appearance="dark"
      accentColor="violet"
      grayColor="slate"
      
      scaling="100%"
    >
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
                  Domain Borç Haritası — UI'da Yetim 70 Dosya
                </Heading>
              </Flex>
            </Flex>
            <Flex gap="2" align="center">
              <Badge color="red" variant="soft" radius="full" size="2">
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--red-9)", display: "inline-block", marginRight: 6 }} />
                LIVE DEBT
              </Badge>
              <Badge color="gray" variant="soft" radius="full">radix-ui/themes v3</Badge>
            </Flex>
          </Flex>
        </Box>

        <Box p={{ initial: "4", md: "6" }} style={{ maxWidth: 1320, margin: "0 auto" }}>
          {/* Stats Row */}
          <Grid columns={{ initial: "1", sm: "3" }} gap="4" mb="6">
            <Card style={{ background: "var(--gray-2)", border: "1px solid var(--gray-5)" }}>
              <Flex direction="column" gap="3" p="2">
                <Flex justify="between" align="center">
                  <Text size="2" weight="medium" color="gray">TOPLAM DOSYA</Text>
                  <Badge color="violet" variant="soft" radius="full">70</Badge>
                </Flex>
                <Heading size="8" weight="bold" style={{ letterSpacing: "-0.04em" }}>70</Heading>
                <Box>
                  <Flex justify="between" mb="2">
                    <Text size="1" color="gray">UI entegrasyonu</Text>
                    <Text size="1" weight="bold" color="red">{progress}%</Text>
                  </Flex>
                  <Progress value={progress} color="red" size="2" radius="full" />
                  <Text size="1" color="gray" style={{ marginTop: 8, display: "block" }}>0% UI integrated • tamamı yetim</Text>
                </Box>
              </Flex>
            </Card>

            <Card style={{ background: "var(--gray-2)", border: "1px solid var(--gray-5)" }}>
              <Flex direction="column" gap="3" p="2">
                <Text size="2" weight="medium" color="gray">TOPLAM BOYUT</Text>
                <Heading size="8" weight="bold" style={{ letterSpacing: "-0.04em" }}>460KB</Heading>
                <Flex gap="2" wrap="wrap" mt="1">
                  <Badge variant="soft" color="crimson">linguistic 242KB • %52</Badge>
                  <Badge variant="soft" color="blue">morphology 89KB</Badge>
                  <Badge variant="soft" color="violet">concept 58KB</Badge>
                </Flex>
              </Flex>
            </Card>

            <Card style={{ background: "var(--violet-2)", border: "1px solid var(--violet-6)" }}>
              <Flex direction="column" gap="2" p="2">
                <Text size="2" weight="medium" style={{ color: "var(--violet-11)" }}>KRİTİK UYARI</Text>
                <Text size="3" weight="bold" style={{ lineHeight: "1.3" }}>
                  70 domain dosyası hiçbir admin route'una bağlı değil. Curation, Explorer ve Yönetim panellerinde ölü kod olarak bekliyor.
                </Text>
                <Separator size="4" my="2" style={{ background: "var(--violet-6)" }} />
                <Flex gap="2">
                  <Badge color="red" variant="solid" radius="full">0 UI • YETİM</Badge>
                  <Badge color="amber" variant="soft" radius="full">5 domain izole</Badge>
                </Flex>
              </Flex>
            </Card>
          </Grid>

          {/* Domain Cards */}
          <Flex justify="between" align="end" mb="4" wrap="wrap" gap="2">
            <Heading size="5">Domain Kümeleri</Heading>
            <Text size="2" color="gray">5 izole küme • her biri kendi hedef route'unu bekliyor • badge renk = borç yoğunluğu</Text>
          </Flex>

          <Grid columns={{ initial: "1", sm: "2", lg: "5" }} gap="4" mb="8">
            {domains.map((d) => (
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
                {/* top accent */}
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
                    <Badge color={d.color} variant="soft" radius="full">{d.files} dosya</Badge>
                  </Flex>

                  <Flex gap="2">
                    <Badge color="red" variant="solid" radius="full" size="1">0 UI • YETİM</Badge>
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
                    <Text size="1" color="gray" weight="medium" style={{ display: "block", marginBottom: 4 }}>EN BÜYÜK DOSYA</Text>
                    <Text size="2" weight="bold" style={{ color: `var(--${d.color}-11)` }}>{d.biggest}</Text>
                  </Box>

                  <Box>
                    <Text size="1" color="gray" weight="medium" style={{ marginBottom: 6, display: "block" }}>HEDEF ROUTE</Text>
                    <Code variant="soft" color={d.color} size="2" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                      {d.target}
                    </Code>
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
                      <Box mt="3" style={{ animation: "fadeIn 0.2s" }}>
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
                      variant="solid"
                      
                      size="2"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setIntegrated((p) => ({ ...p, [d.name]: !p[d.name] }));
                        setToast(`${d.name} ${integrated[d.name] ? "geri alındı" : "entegre ediliyor"} • ${d.files} dosya`);
                        setTotalProgress((v) => Math.min(100, v + 7));
                        setTimeout(() => setToast(null), 2200);
                      }}
                    >
                      {integrated[d.name] ? "✓ Entegre Edildi" : "Entegre Et →"}
                    </Button>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Grid>

          {/* Graph + Roadmap */}
          <Grid columns={{ initial: "1", lg: "2" }} gap="5">
            {/* Dependency Graph */}
            <Card  style={{ background: "var(--gray-2)", border: "1px solid var(--gray-5)" }}>
              <Box p="4">
                <Flex justify="between" align="center" mb="4">
                  <Heading size="3">Bağımlılık Grafiği</Heading>
                  <Badge variant="soft" color="gray" radius="full">orphan → target</Badge>
                </Flex>

                <Grid columns="2" gap="4">
                  <Flex direction="column" gap="3">
                    <Text size="1" weight="bold" color="gray" style={{ letterSpacing: "0.12em" }}>YETİM DOMAINLER (70)</Text>
                    {domains.map((d) => (
                      <Flex key={d.name} align="center" gap="2" style={{ background: "var(--gray-3)", borderRadius: 12, padding: "10px 12px", border: `1px solid var(--${d.color}-4)` }}>
                        <Box style={{ width: 8, height: 8, borderRadius: 999, background: `var(--${d.color}-9)` }} />
                        <Text size="2" weight="medium">{d.name}</Text>
                        <Text size="1" color="gray" style={{ marginLeft: "auto" }}>{d.files}</Text>
                      </Flex>
                    ))}
                  </Flex>

                  <Flex direction="column" gap="3" style={{ position: "relative" }}>
                    <Text size="1" weight="bold" color="gray" style={{ letterSpacing: "0.12em" }}>UI HEDEFLERİ</Text>
                    {domains.map((d) => (
                      <Box key={d.name + "-target"} style={{ position: "relative" }}>
                        {/* dashed connector */}
                        <Box
                          style={{
                            position: "absolute",
                            left: -24,
                            top: "50%",
                            width: 20,
                            height: 1,
                            borderTop: `1.5px dashed var(--${d.color}-8)`,
                            transform: "translateY(-50%)",
                          }}
                        />
                        <Box
                          style={{
                            background: `var(--${d.color}-3)`,
                            border: `1px dashed var(--${d.color}-7)`,
                            borderRadius: 12,
                            padding: "10px 12px",
                          }}
                        >
                          <Text size="1" weight="bold" style={{ color: `var(--${d.color}-11)` }}>{d.target}</Text>
                          <Text size="1" color="gray" style={{ display: "block", marginTop: 2 }}>→ bağlanmadı</Text>
                        </Box>
                      </Box>
                    ))}

                    {/* vertical dashed spine */}
                    <Box
                      style={{
                        position: "absolute",
                        left: -16,
                        top: 28,
                        bottom: 20,
                        width: 1,
                        borderLeft: "1px dashed var(--gray-7)",
                      }}
                    />
                  </Flex>
                </Grid>

                <Box mt="5" p="3" style={{ background: "var(--amber-3)", border: "1px solid var(--amber-6)", borderRadius: 12 }}>
                  <Flex gap="2" align="start">
                    <Text size="2">⚠️</Text>
                    <Text size="2" style={{ lineHeight: "1.4" }}>
                      Tüm bağlantılar <Code variant="soft" color="amber">dashed</Code> çünkü hiçbir domain henüz UI'a enjekte edilmedi. Entegrasyon sonrası solid çizgiye dönecek.
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Card>

            {/* Roadmap */}
            <Card  style={{ background: "var(--gray-2)", border: "1px solid var(--gray-5)" }}>
              <Box p="4">
                <Flex justify="between" align="center" mb="1">
                  <Heading size="3">Entegrasyon Yol Haritası</Heading>
                  <Badge color="violet" variant="soft" radius="full">reverse order</Badge>
                </Flex>
                <Text size="2" color="gray" mb="4" style={{ display: "block" }}>
                  concept → linguistic → morphology → discovery → analytics • İstenen sırayla, küçük kazanımdan çekirdeğe
                </Text>

                <Flex direction="column" gap="0" style={{ position: "relative" }}>
                  {/* timeline line */}
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
                            <Code variant="soft" size="1" color={dom.color}>{dom.target}</Code>
                            <Box style={{ flex: 1, height: 1, background: `var(--${dom.color}-5)` }} />
                            <Text size="1" color="gray">→ Entegre Et</Text>
                          </Flex>
                        </Box>
                      </Flex>
                    );
                  })}
                </Flex>

                <Separator size="4" my="5" />

                <Flex gap="3">
                  <Button
                    variant="solid"
                    color="violet"
                    
                    size="3"
                    style={{ flex: 1 }}
                    onClick={() => {
                      const all: Record<string, boolean> = {};
                      domains.forEach((dd) => (all[dd.name] = true));
                      setIntegrated(all);
                      setTotalProgress(100);
                      setToast("Tüm 70 dosya entegre kuyruğuna alındı ✓");
                      setTimeout(() => setToast(null), 2500);
                    }}
                  >
                    Tümünü Entegre Et • 70 dosya
                  </Button>
                  <Button
                    variant="soft"
                    color="gray"
                    
                    size="3"
                    onClick={() => {
                      setToast("Rapor CSV olarak hazırlandı • 460KB");
                      setTimeout(() => setToast(null), 2000);
                    }}
                  >
                    Raporu Dışa Aktar
                  </Button>
                </Flex>
              </Box>
            </Card>
          </Grid>

          {totalProgress > 0 && (
            <Box mt="4" style={{ background: "var(--gray-2)", border: "1px solid var(--violet-5)", borderRadius: 12, padding: "12px 16px" }}>
              <Flex justify="between" align="center" gap="2">
                <Text size="2" weight="bold">Entegrasyon İlerlemesi: {totalProgress}%</Text>
                <Badge color="violet" variant="soft" radius="full">{Object.values(integrated).filter(Boolean).length} / 5 domain</Badge>
              </Flex>
              <Box mt="2">
                <Progress value={totalProgress} color="violet" size="2" radius="full" />
              </Box>
            </Box>
          )}

          <Flex justify="center" mt="6" mb="2">
            <Text size="1" color="gray">app/admin/domain-borc/page.tsx • Theme appearance="dark" • Radix Design System • 0% entegre</Text>
          </Flex>
        </Box>
      </Box>

      <style>{`
        * { font-family: ui-sans-system, system-ui, -apple-system, sans-serif; }
        code, pre { font-family: ui-monospace, monospace !important; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(-4px) } to { opacity:1; transform: translateY(0) } }
      `}</style>
    </Theme>
  );
}


