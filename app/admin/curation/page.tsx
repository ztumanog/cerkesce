"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Theme, Card, Badge, Heading, Text, Flex, Box, Button, Separator, Grid } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

type Counts = { roots: number; families: number; concepts: number; lexemes: number };

export default function CurationIndexPage() {
  const [counts, setCounts] = useState<Counts>({ roots: 0, families: 0, concepts: 0, lexemes: 0 });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          fetch("/data/linguistic/roots.json").then((r) => r.json()).catch(() => []),
          fetch("/data/linguistic/word_families.json").then((r) => r.json()).catch(() => []),
          fetch("/data/linguistic/concepts.json").then((r) => r.json()).catch(() => []),
          fetch("/data/linguistic/lexemes.json").then((r) => r.json()).catch(() => []),
        ]);
        setCounts({
          roots: Array.isArray(r1) ? r1.length : r1.roots?.length || 0,
          families: Array.isArray(r2) ? r2.length : r2.families?.length || 0,
          concepts: Array.isArray(r3) ? r3.length : r3.concepts?.length || 0,
          lexemes: Array.isArray(r4) ? r4.length : r4.lexemes?.length || 0,
        });
      } catch (e) {
        setMsg((e as Error).message);
      }
    }
    load();
  }, []);

  return (
    <Theme accentColor="violet" radius="large" appearance="light">
      <Box className="min-h-screen bg-[var(--gray-2)] p-6">
        <Box className="max-w-[1280px] mx-auto">
          {/* Header */}
          <Card size="3" mb="6">
            <Flex justify="between" align="center" wrap="wrap" gap="4">
              <Box>
                <Flex gap="2" align="center">
                  <Heading size="8">Kürasyon Yönetim Paneli</Heading>
                  <Badge color="violet" variant="soft" size="2">
                    /admin/curation
                  </Badge>
                </Flex>
                <Text size="3" color="gray" mt="2" as="div">
                  Çerkesçe Sözlük • Kök, Aile, Kavram ve Kelime Kürasyon Modülleri
                </Text>
              </Box>
              <Flex gap="2" align="center" wrap="wrap">
                <Link href="/yonetim" style={{ textDecoration: "none" }}>
                  <Button color="gray" variant="soft" size="2">
                    ← Yönetim Sayfası
                  </Button>
                </Link>
                <Link href="/sozluk/family/WF-UNCLEAR" style={{ textDecoration: "none" }}>
                  <Button color="amber" variant="solid" size="2">
                    ⚠️ WF-UNCLEAR Kürasyon
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Card>

          {/* HIZLI KÜRASYON BANNER */}
          <Card mb="6" style={{ background: "#fffbe5", borderColor: "#f59e0b" }}>
            <Flex justify="between" align="center" wrap="wrap" gap="3">
              <Flex gap="3" align="center" wrap="wrap">
                <Badge color="amber" size="3" variant="solid">
                  ⚠️ Sahipsiz Kelimeler
                </Badge>
                <Text size="2" weight="bold" style={{ color: "#78350f" }}>
                  WF-UNCLEAR ailesindeki kelimeleri süzün ve arayüz üzerinden toplu olarak hedef ailelere aktarın.
                </Text>
              </Flex>
              <Link href="/sozluk/family/WF-UNCLEAR" style={{ textDecoration: "none" }}>
                <Button size="2" color="amber" variant="solid" className="cursor-pointer">
                  Hızlı Kürasyon Modülünü Aç →
                </Button>
              </Link>
            </Flex>
          </Card>

          {/* Kürasyon Modülleri */}
          <Flex align="center" gap="2" mb="4">
            <Heading size="6">📚 Modüller</Heading>
            <Badge variant="soft">Kök → Aile → Kavram → Kelime</Badge>
          </Flex>
          <Grid columns={{ initial: "1", sm: "2", lg: "4" }} gap="4" mb="6">
            <Link href="/admin/curation/roots" style={{ textDecoration: "none" }}>
              <Card
                className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                style={{ background: "#ecfdf5", borderColor: "#10b981" }}
              >
                <Flex justify="between">
                  <Badge color="green" size="2">
                    🌱 KÖKLER
                  </Badge>
                  <Text size="1" color="gray">
                    Root
                  </Text>
                </Flex>
                <Heading size="8" mt="3" style={{ color: "#059669" }}>
                  {counts.roots || "—"}
                </Heading>
                <Text size="2" weight="bold" mt="1">
                  Kök / Root
                </Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>
                  roots.json • Kök düzeyinde eşleşme ve hiyerarşi
                </Text>
                <Button size="1" variant="soft" color="green" mt="3" className="w-full">
                  → Aç
                </Button>
              </Card>
            </Link>

            <Link href="/admin/curation/family" style={{ textDecoration: "none" }}>
              <Card
                className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                style={{ background: "#eff6ff", borderColor: "#3b82f6" }}
              >
                <Flex justify="between">
                  <Badge color="blue" size="2">
                    👨‍👩‍👧‍👦 AİLELER
                  </Badge>
                  <Text size="1" color="gray">
                    Word Family
                  </Text>
                </Flex>
                <Heading size="8" mt="3" style={{ color: "#2563eb" }}>
                  {counts.families || "—"}
                </Heading>
                <Text size="2" weight="bold" mt="1">
                  Aile / Word Family
                </Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>
                  word_families.json • Concept & Lexeme Bağlantıları
                </Text>
                <Button size="1" variant="soft" color="blue" mt="3" className="w-full">
                  → Aç
                </Button>
              </Card>
            </Link>

            <Link href="/admin/curation/concepts" style={{ textDecoration: "none" }}>
              <Card
                className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                style={{ background: "#f5f3ff", borderColor: "#8b5cf6" }}
              >
                <Flex justify="between">
                  <Badge color="violet" size="2">
                    💡 KAVRAMLAR
                  </Badge>
                  <Text size="1" color="gray">
                    Concept
                  </Text>
                </Flex>
                <Heading size="8" mt="3" style={{ color: "#7c3aed" }}>
                  {counts.concepts || "—"}
                </Heading>
                <Text size="2" weight="bold" mt="1">
                  Kavram / Concept
                </Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>
                  concepts.json • Semantik haritalama ve 6 dil
                </Text>
                <Button size="1" variant="soft" color="violet" mt="3" className="w-full">
                  → Aç
                </Button>
              </Card>
            </Link>

            <Link href="/admin/curation/single" style={{ textDecoration: "none" }}>
              <Card
                className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                style={{ background: "#fff7ed", borderColor: "#fb923c" }}
              >
                <Flex justify="between">
                  <Badge color="orange" size="2">
                    📖 KELİMELER
                  </Badge>
                  <Text size="1" color="gray">
                    Lexeme
                  </Text>
                </Flex>
                <Heading size="8" mt="3" style={{ color: "#ea580c" }}>
                  {counts.lexemes || "—"}
                </Heading>
                <Text size="2" weight="bold" mt="1">
                  Kelime / Lexeme
                </Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>
                  lexemes.json • Tekil ve toplu kelime düzenleme
                </Text>
                <Button size="1" variant="soft" color="orange" mt="3" className="w-full">
                  → Aç
                </Button>
              </Card>
            </Link>
          </Grid>

          <Separator size="4" my="6" />

          {/* Ek Araçlar */}
          <Grid columns={{ initial: "1", lg: "2" }} gap="4">
            <Card>
              <Heading size="4">Kürasyon Araçları</Heading>
              <Flex direction="column" gap="3" mt="4">
                <Link href="/sozluk/family/WF-UNCLEAR">
                  <Button size="2" variant="solid" color="amber" className="w-full">
                    ⚠️ Toplu WF-UNCLEAR Kürasyon Modülü
                  </Button>
                </Link>
                <Link href="/admin/curation/csv">
                  <Button size="2" variant="soft" className="w-full">
                    📄 CSV Export / Import
                  </Button>
                </Link>
                <Link href="/admin/curation/bulk">
                  <Button size="2" variant="soft" className="w-full">
                    ⚡ Bulk (Toplu) Düzenle
                  </Button>
                </Link>
              </Flex>
            </Card>
            <Card>
              <Heading size="4">Veri Özet Bilgisi</Heading>
              <Box mt="3" style={{ fontSize: 13, lineHeight: 1.9 }}>
                <Flex justify="between">
                  <Text>roots.json</Text>
                  <Badge variant="soft">{counts.roots} kök</Badge>
                </Flex>
                <Flex justify="between">
                  <Text>word_families.json</Text>
                  <Badge variant="soft">{counts.families} aile</Badge>
                </Flex>
                <Flex justify="between">
                  <Text>concepts.json</Text>
                  <Badge variant="soft">{counts.concepts} kavram</Badge>
                </Flex>
                <Flex justify="between">
                  <Text>lexemes.json</Text>
                  <Badge variant="soft">{counts.lexemes} kelime</Badge>
                </Flex>
                {msg && (
                  <Text size="1" color="red" mt="2">
                    {msg}
                  </Text>
                )}
              </Box>
            </Card>
          </Grid>

          <Text size="1" color="gray" as="div" mt="5" align="center">
            ÇERKESÇE SÖZLÜK • /admin/curation
          </Text>
        </Box>
      </Box>
    </Theme>
  );
}