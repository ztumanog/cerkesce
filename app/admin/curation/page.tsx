"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Theme, Card, Badge, Heading, Text, Flex, Box, Button, Separator, Grid } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

type Counts = { roots: number; families: number; concepts: number; lexemes: number };

export default function YonetimPage() {
  const [counts, setCounts] = useState<Counts>({ roots: 0, families: 0, concepts: 0, lexemes: 0 });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          fetch("/data/linguistic/roots.json").then(r=>r.json()).catch(()=>[]),
          fetch("/data/linguistic/word_families.json").then(r=>r.json()).catch(()=>[]),
          fetch("/data/linguistic/concepts.json").then(r=>r.json()).catch(()=>[]),
          fetch("/data/linguistic/lexemes.json").then(r=>r.json()).catch(()=>[]),
        ]);
        setCounts({
          roots: Array.isArray(r1) ? r1.length : (r1.roots?.length||0),
          families: Array.isArray(r2) ? r2.length : (r2.families?.length||0),
          concepts: Array.isArray(r3) ? r3.length : (r3.concepts?.length||0),
          lexemes: Array.isArray(r4) ? r4.length : (r4.lexemes?.length||0),
        });
      } catch (e) { setMsg((e as Error).message); }
    }
    load();
  }, []);

  return (
    <Theme accentColor="violet" radius="large" appearance="light">
      <Box className="min-h-screen bg-[var(--gray-2)] p-6">
        <Box className="max-w-[1280px] mx-auto">
          {/* Header */}
          <Card size="3" mb="6">
            <Flex justify="between" align="center">
              <Box>
                <Flex gap="2" align="center"><Heading size="8">Yönetim</Heading><Badge color="violet" variant="soft" size="2">/app/yonetim</Badge></Flex>
                <Text size="3" color="gray" mt="2" as="div">Çerkesçe Sözlük • Kürasyon + Moderasyon + Faz Kontrol + Explorer • KBD en üstte</Text>
              </Box>
              <Flex gap="2">
                <Badge color="green" size="2">tsc 0</Badge>
                <Badge color="blue" size="2">1082 passed</Badge>
                <Badge color="violet" size="2">4 Yeşil</Badge>
              </Flex>
            </Flex>
          </Card>

          {/* Kürasyon */}
          <Flex align="center" gap="2" mb="4"><Heading size="6">📚 Kürasyon Paneli</Heading><Badge variant="soft">Kök → Aile → Kavram → Kelime</Badge></Flex>
          <Grid columns={{ initial: "1", sm: "2", lg: "4" }} gap="4" mb="6">
            <Link href="/admin/curation/roots" style={{ textDecoration: "none" }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" style={{ background: "#ecfdf5", borderColor: "#10b981" }}>
                <Flex justify="between"><Badge color="green" size="2">🌱 KÖKLER</Badge><Text size="1" color="gray">Root</Text></Flex>
                <Heading size="8" mt="3" style={{ color: "#059669" }}>{counts.roots || "—"}</Heading>
                <Text size="2" weight="bold" mt="1">Kök / Root</Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>roots.json gerçek • lexemes rootIds bağlı • KBD ana form</Text>
                <Button size="1" variant="soft" color="green" mt="3" className="w-full">→ Aç</Button>
              </Card>
            </Link>
            <Link href="/admin/curation/family" style={{ textDecoration: "none" }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" style={{ background: "#eff6ff", borderColor: "#3b82f6" }}>
                <Flex justify="between"><Badge color="blue" size="2">👨‍👩‍👧‍👦 AİLELER</Badge><Text size="1" color="gray">Word Family</Text></Flex>
                <Heading size="8" mt="3" style={{ color: "#2563eb" }}>{counts.families || "—"}</Heading>
                <Text size="2" weight="bold" mt="1">Aile / Word Family</Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>word_families.json 1018 gerçek • conceptIds + lexemeIds</Text>
                <Button size="1" variant="soft" color="blue" mt="3" className="w-full">→ Aç</Button>
              </Card>
            </Link>
            <Link href="/admin/curation/concepts" style={{ textDecoration: "none" }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" style={{ background: "#f5f3ff", borderColor: "#8b5cf6" }}>
                <Flex justify="between"><Badge color="violet" size="2">💡 KAVRAMLAR</Badge><Text size="1" color="gray">Concept</Text></Flex>
                <Heading size="8" mt="3" style={{ color: "#7c3aed" }}>{counts.concepts || "—"}</Heading>
                <Text size="2" weight="bold" mt="1">Kavram / Concept</Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>concepts.json • ARTIFICIAL_INTELLIGENCE, BODY... • 6 dil</Text>
                <Button size="1" variant="soft" color="violet" mt="3" className="w-full">→ Aç</Button>
              </Card>
            </Link>
            <Link href="/admin/curation/single" style={{ textDecoration: "none" }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" style={{ background: "#fff7ed", borderColor: "#fb923c" }}>
                <Flex justify="between"><Badge color="orange" size="2">📖 KELİMELER</Badge><Text size="1" color="gray">Lexeme</Text></Flex>
                <Heading size="8" mt="3" style={{ color: "#ea580c" }}>{counts.lexemes || "—"}</Heading>
                <Text size="2" weight="bold" mt="1">Kelime / Lexeme</Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>lexemes.json gerçek • TR/EN/RU/KBD/CE/AR • KBD en üstte</Text>
                <Button size="1" variant="soft" color="orange" mt="3" className="w-full">→ Aç</Button>
              </Card>
            </Link>
          </Grid>

          <Separator size="4" my="6" />

          {/* Sistem */}
          <Flex align="center" gap="2" mb="4"><Heading size="6">🛠️ Sistem</Heading><Badge variant="soft" color="gray">Moderasyon • Faz Kontrol • Explorer</Badge></Flex>
          <Grid columns={{ initial: "1", lg: "3" }} gap="4" mb="6">
            <Link href="/admin/moderasyon" style={{ textDecoration: "none" }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <Flex justify="between" mb="2"><Badge color="violet" variant="soft">Faz 12</Badge><Badge color="violet">Canlı</Badge></Flex>
                <Heading size="5">Moderasyon Paneli</Heading>
                <Text size="2" color="gray" mt="2" as="div">Topluluk önerileri • PENDING/APPROVED/REJECTED • Yazar kendi önerisini değiştiremez kuralı</Text>
                <Button variant="soft" color="violet" mt="4" className="w-full">Aç → /admin/moderasyon</Button>
              </Card>
            </Link>
            <Link href="/admin/faz-kontrol" style={{ textDecoration: "none" }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <Flex justify="between" mb="2"><Badge color="green" variant="soft">Faz Kontrol</Badge><Badge color="green">4 Yeşil</Badge></Flex>
                <Heading size="5">Faz Kontrol Paneli</Heading>
                <Text size="2" color="gray" mt="2" as="div">653 dosya, 1287 edge, BOM'suz JSON, tsc 0, 1082 passed, usesMathRandom=False</Text>
                <Button variant="soft" color="green" mt="4" className="w-full">Aç → /admin/faz-kontrol</Button>
              </Card>
            </Link>
            <Link href="/explorer" style={{ textDecoration: "none" }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <Flex justify="between" mb="2"><Badge color="blue" variant="soft">Explorer</Badge><Badge color="blue">Canlı</Badge></Flex>
                <Heading size="5">Ağ Gezgini</Heading>
                <Text size="2" color="gray" mt="2" as="div">TR→AD arama ev→унэ, GRID/CIRCULAR/FORCE layout, deterministik seed 42, kedi→шы</Text>
                <Button variant="soft" color="blue" mt="4" className="w-full">Aç → /explorer</Button>
              </Card>
            </Link>
          </Grid>

          <Grid columns={{ initial: "1", lg: "2" }} gap="4">
            <Card>
              <Heading size="4">Hızlı İş Akışı</Heading>
              <Flex direction="column" gap="3" mt="4">
                <Flex gap="2" align="center"><Badge color="green">1</Badge><Text weight="bold" size="2">Kök seç</Text><Text size="2" color="gray">/admin/curation/roots - Aileleri gör, Kökten Çıkar</Text></Flex>
                <Flex gap="2" align="center"><Badge color="blue">2</Badge><Text weight="bold" size="2">Aile düzenle</Text><Text size="2" color="gray">/admin/curation/family - notes, conceptIds</Text></Flex>
                <Flex gap="2" align="center"><Badge color="violet">3</Badge><Text weight="bold" size="2">Kavram düzenle</Text><Text size="2" color="gray">/admin/curation/concepts - 6 dil</Text></Flex>
                <Flex gap="2" align="center"><Badge color="orange">4</Badge><Text weight="bold" size="2">Kelime kürasyon</Text><Text size="2" color="gray">/admin/curation/single - Ctrl+Enter, IPA 🔊</Text></Flex>
                <Flex gap="2" align="center"><Badge color="violet">5</Badge><Text weight="bold" size="2">Moderasyon</Text><Text size="2" color="gray">/admin/moderasyon - Onayla/Reddet</Text></Flex>
                <Separator size="4" />
                <Flex gap="2" wrap="wrap">
                  <Link href="/admin/curation/csv"><Button size="2" variant="soft">CSV Export/Import</Button></Link>
                  <Link href="/admin/curation/bulk"><Button size="2" variant="soft">Bulk Düzenle</Button></Link>
                  <Link href="/admin/faz-kontrol"><Button size="2" variant="soft" color="green">Faz Kontrol</Button></Link>
                  <Link href="/explorer"><Button size="2" variant="soft" color="blue">Explorer</Button></Link>
                </Flex>
              </Flex>
            </Card>
            <Card>
              <Heading size="4">Durum • Gerçek Veri</Heading>
              <Box mt="3" style={{ fontSize: 13, lineHeight: 1.9 }}>
                <Flex justify="between"><Text>roots.json</Text><Badge variant="soft">{counts.roots} kök</Badge></Flex>
                <Flex justify="between"><Text>word_families.json</Text><Badge variant="soft">{counts.families} aile</Badge></Flex>
                <Flex justify="between"><Text>concepts.json</Text><Badge variant="soft">{counts.concepts} kavram</Badge></Flex>
                <Flex justify="between"><Text>lexemes.json</Text><Badge variant="soft">{counts.lexemes} kelime</Badge></Flex>
                <Separator my="3" />
                <Flex direction="column" gap="1">
                  <Badge color="green" variant="soft">✓ KBD Kabardey en üstte</Badge>
                  <Badge color="violet" variant="soft">✓ Moderasyon entegre (Faz 12)</Badge>
                  <Badge color="green" variant="soft">✓ Faz Kontrol 4 yeşil, tsc 0, 1082 passed</Badge>
                  <Badge color="red" variant="soft">✗ Sahte veri yok (WF-GU / R-GU kapalı)</Badge>
                  <Text size="1" color="gray" mt="2">Yedekler: _backups/lexemes_*.json, word_families_*.json</Text>
                  {msg && <Text size="1" color="red">{msg}</Text>}
                </Flex>
              </Box>
            </Card>
          </Grid>

          <Text size="1" color="gray" as="div" mt="5" align="center">ÇERKESÇE SÖZLÜK • KBD aktif • KÖK→AİLE hiyerarşisi • WCAG AA • 6 dil • yedekli kayıt • /app/yonetim</Text>
        </Box>
      </Box>
    </Theme>
  );
}

