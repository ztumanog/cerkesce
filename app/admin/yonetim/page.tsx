'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Heading, Text, Flex, Box, Grid, Separator } from '@radix-ui/themes';
import {
  ClipboardList, Scale, Lightbulb, HeartPulse, BookOpenCheck, Database,
  ShieldCheck, GitBranch, Network, Languages,
} from 'lucide-react';

/**
 * YÖNETİM MERKEZİ (/admin/yonetim) — tek merkez.
 *
 * Baş Mimar talimatı (2026-11-24): Yönetim + Kürasyon Paneli birleştirildi.
 * - Üstte: Kökler / Aileler / Kavramlar / Kelimeler kartları (eski Kürasyon
 *   Paneli'nden, sayılar aynen — istemciden /data/linguistic/*.json okunur)
 * - Ortada: Günlük Özet, Kararlar ve İşler, Öneriler, Sistem Sağlığı
 * - Altta: Kelime Önerileri İnceleme, Sözlük Kürasyonu
 *
 * Eski /admin/curation (Kürasyon Paneli ana sayfası) kaldirildi; o adres
 * buraya yönlendirilir (next.config). Alt modüller (/admin/curation/...)
 * yerli yerinde.
 *
 * Vatandaş yüzünde yalnız "Yönetim" bağlantısı var; 4 pano yalnız buradan.
 */

type Counts = { roots: number; families: number; concepts: number; lexemes: number };

const panolar = [
  {
    href: '/admin/yonetim/executive',
    title: 'Günlük Özet',
    desc: 'Bugün gelen öneriler, yapılan değişiklikler, dikkat gerektiren konular',
    icon: ClipboardList,
    bg: '#f5f3ff', border: '#8b5cf6', color: '#7c3aed',
  },
  {
    href: '/admin/yonetim/governance',
    title: 'Kararlar ve İşler',
    desc: 'Alınan kararlar (Karar Defteri), yarım kalan işler, riskler ve çözümleri',
    icon: Scale,
    bg: '#eff6ff', border: '#3b82f6', color: '#2563eb',
  },
  {
    href: '/admin/yonetim/intelligence',
    title: 'Öneriler',
    desc: 'Vatandaşın gönderdiği kelime önerileri — kabul et / reddet',
    icon: Lightbulb,
    bg: '#fffbeb', border: '#f59e0b', color: '#b45309',
  },
  {
    href: '/admin/yonetim/operations',
    title: 'Sistem Sağlığı',
    desc: 'Veri dosyaları, sistem göstergeleri, son kayıt — sorun varsa ne yapılacağı',
    icon: HeartPulse,
    bg: '#ecfdf5', border: '#10b981', color: '#059669',
  },
];

const yonetisimKartlari = [
  {
    href: '/admin/yonetim/veri-sagligi',
    title: 'Veri Sağlığı',
    desc: 'Doluluk ve bütünlük göstergeleri — JSON raporundan (ADR-GOV-016)',
    icon: ShieldCheck,
    bg: '#ecfdf5', border: '#10b981', color: '#059669',
  },
  {
    href: '/admin/yonetim/kok-denetimi',
    title: 'Kök Denetimi',
    desc: 'rootId boş lexeme, üyesiz kök, kırık referans — JSON raporundan',
    icon: GitBranch,
    bg: '#fffbeb', border: '#f59e0b', color: '#b45309',
  },
  {
    href: '/admin/yonetim/kavram-denetimi',
    title: 'Kavram Denetimi',
    desc: 'conceptId açıkları, legacy diziler, WF asılı referanslar',
    icon: Network,
    bg: '#f5f3ff', border: '#8b5cf6', color: '#7c3aed',
  },
  {
    href: '/admin/yonetim/ceviri-denetimi',
    title: 'Çeviri Denetimi',
    desc: 'Dil alanlarına sızan yabancı metinler, TR==EN, eksik çeviriler (v2)',
    icon: Languages,
    bg: '#fef2f2', border: '#f43f5e', color: '#e11d48',
  },
];

const altKartlar = [
  {
    href: '/admin/moderasyon',
    title: 'Kelime Önerileri İnceleme',
    desc: 'Önerileri onayla / reddet (moderatör)',
    icon: BookOpenCheck,
  },
  {
    href: '/admin/curation/lexemes',
    title: 'Sözlük Kürasyonu',
    desc: 'Tüm sözlük kayıtlarını listele, incele ve düzenle',
    icon: Database,
  },
];

export default function YonetimPage() {
  const [counts, setCounts] = useState<Counts>({ roots: 0, families: 0, concepts: 0, lexemes: 0 });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [r1, r2, r4] = await Promise.all([
          fetch('/data/linguistic/roots.json').then((r) => r.json()).catch(() => []),
          fetch('/data/linguistic/word_families.json').then((r) => r.json()).catch(() => []),
          fetch('/data/linguistic/lexemes.json').then((r) => r.json()).catch(() => []),
        ]);
        const lexemesList = Array.isArray(r4) ? r4 : r4.lexemes ?? [];
        const conceptIds = new Set(
          lexemesList.map((l: any) => String(l.conceptId ?? '')).filter(Boolean)
        );
        setCounts({
          roots: Array.isArray(r1) ? r1.length : r1.roots?.length ?? 0,
          families: Array.isArray(r2) ? r2.length : r2.families?.length ?? 0,
          concepts: conceptIds.size,
          lexemes: lexemesList.length,
        });
      } catch (e) {
        setMsg((e as Error).message);
      }
    }
    load();
  }, []);

  const kurasyonKartlari = [
    {
      href: '/admin/curation/roots',
      badge: '🌱 KÖKLER', en: 'Root',
      count: counts.roots, title: 'Kök / Root',
      desc: 'roots.json • Kök düzeyinde eşleşme ve hiyerarşi',
      bg: '#ecfdf5', border: '#10b981', color: '#059669',
    },
    {
      href: '/admin/curation/family',
      badge: '👨👩👧👦 AİLELER', en: 'Word Family',
      count: counts.families, title: 'Aile / Word Family',
      desc: 'word_families.json • Concept & Lexeme bağlantıları',
      bg: '#eff6ff', border: '#3b82f6', color: '#2563eb',
    },
    {
      href: '/admin/curation/concepts',
      badge: '💡 KAVRAMLAR', en: 'Concept',
      count: counts.concepts, title: 'Kavram / Concept',
      desc: 'concepts.json • Semantik haritalama ve 6 dil',
      bg: '#f5f3ff', border: '#8b5cf6', color: '#7c3aed',
    },
    {
      href: '/admin/curation/single',
      badge: '📖 KELİMELER', en: 'Lexeme',
      count: counts.lexemes, title: 'Kelime / Lexeme',
      desc: 'lexemes.json • Tekil ve toplu kelime düzenleme',
      bg: '#fff7ed', border: '#fb923c', color: '#ea580c',
    },
  ];

  return (
    <Box className="min-h-screen bg-[var(--gray-2)] p-6">
      <Box className="max-w-7xl mx-auto">
        {/* Başlık */}
        <Card size="3" mb="6">
          <Flex justify="between" align="center" wrap="wrap" gap="4">
            <Box>
              <Flex gap="2" align="center">
                <Heading size="8">Yönetim Merkezi</Heading>
                <Badge color="violet" variant="soft" size="2">/admin/yonetim</Badge>
              </Flex>
              <Text size="3" color="gray" mt="2" as="div">
                Çerkesçe Sözlük • Kürasyon modülleri ve yönetim panoları tek merkezde
              </Text>
            </Box>
          </Flex>
        </Card>

        {/* ÜST — Kürasyon modülleri (eski Kürasyon Paneli'nden, sayılar aynen) */}
        <Flex align="center" gap="2" mb="4">
          <Heading size="6">📚 Sözlük Verisi</Heading>
          <Badge variant="soft">Kök → Aile → Kavram → Kelime</Badge>
        </Flex>
        <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
          {kurasyonKartlari.map((k) => (
            <Link key={k.href} href={k.href} style={{ textDecoration: 'none' }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" style={{ background: k.bg, borderColor: k.border }}>
                <Flex justify="between">
                  <Badge color="gray" size="2">{k.badge}</Badge>
                  <Text size="1" color="gray">{k.en}</Text>
                </Flex>
                <Heading size="8" mt="3" style={{ color: k.color }}>{k.count || '—'}</Heading>
                <Text size="2" weight="bold" mt="1">{k.title}</Text>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.4 }}>{k.desc}</Text>
                <Text size="1" weight="bold" mt="3" as="div">→ Aç</Text>
              </Card>
            </Link>
          ))}
        </Grid>

        <Separator size="4" my="6" />

        {/* ORTA — Yönetim panoları */}
        <Flex align="center" gap="2" mb="4">
          <Heading size="6">🗂️ Yönetim Panoları</Heading>
          <Badge variant="soft">Sadece Yönetim içinde</Badge>
        </Flex>
        <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
          {panolar.map((p) => (
            <Link key={p.href} href={p.href} style={{ textDecoration: 'none' }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" style={{ background: p.bg, borderColor: p.border }}>
                <Flex justify="between" align="center">
                  <p.icon className="h-6 w-6" style={{ color: p.color }} aria-hidden />
                  <Text size="1" color="gray">Pano</Text>
                </Flex>
                <Heading size="4" mt="3" style={{ color: p.color }}>{p.title}</Heading>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.5 }}>{p.desc}</Text>
                <Text size="1" weight="bold" mt="3" as="div">→ Aç</Text>
              </Card>
            </Link>
          ))}
        </Grid>

        <Separator size="4" my="6" />

        {/* VERİ YÖNETİŞİMİ — ADR-GOV-016 (JSON raporu tüketen denetim ekranları) */}
        <Flex align="center" gap="2" mb="4">
          <Heading size="6">🛡️ Veri Yönetişimi</Heading>
          <Badge variant="soft">ADR-GOV-016 · JSON raporundan okur</Badge>
        </Flex>
        <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
          {yonetisimKartlari.map((p) => (
            <Link key={p.href} href={p.href} style={{ textDecoration: 'none' }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer" style={{ background: p.bg, borderColor: p.border }}>
                <Flex justify="between" align="center">
                  <p.icon className="h-6 w-6" style={{ color: p.color }} aria-hidden />
                  <Text size="1" color="gray">Salt okunur</Text>
                </Flex>
                <Heading size="4" mt="3" style={{ color: p.color }}>{p.title}</Heading>
                <Text size="1" color="gray" mt="2" as="div" style={{ lineHeight: 1.5 }}>{p.desc}</Text>
                <Text size="1" weight="bold" mt="3" as="div">→ Aç</Text>
              </Card>
            </Link>
          ))}
        </Grid>

        <Separator size="4" my="6" />

        {/* ALT — İnceleme ve kürasyon girişleri */}
        <Flex align="center" gap="2" mb="4">
          <Heading size="6">🛠️ İşler</Heading>
        </Flex>
        <Grid columns={{ initial: '1', lg: '2' }} gap="4">
          {altKartlar.map((a) => (
            <Link key={a.href} href={a.href} style={{ textDecoration: 'none' }}>
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <Flex gap="3" align="center">
                  <a.icon className="h-6 w-6 text-gray-500" aria-hidden />
                  <Box>
                    <Heading size="4">{a.title}</Heading>
                    <Text size="2" color="gray" mt="1" as="div">{a.desc}</Text>
                  </Box>
                </Flex>
              </Card>
            </Link>
          ))}
        </Grid>

        {/* Sözlük özeti (eski panelin alt bölümü) */}
        <Grid columns={{ initial: '1', lg: '2' }} gap="4" mt="6">
          <Card>
            <Heading size="4">Sözlük Özeti</Heading>
            <Heading size="8" mt="3" style={{ color: '#059669' }}>{counts.lexemes || '—'}</Heading>
            <Text size="2" weight="bold" mt="1">Sözlük Girdisi</Text>
            <Box mt="3" style={{ fontSize: 13, lineHeight: 1.9 }}>
              <Flex justify="between"><Text>Dil</Text><Badge variant="soft">4 dil</Badge></Flex>
              <Flex justify="between"><Text>Lehçe</Text><Badge variant="soft">2 lehçe</Badge></Flex>
              <Text size="1" color="gray">Adige • Kabardey</Text>
              <Flex justify="between"><Text>Kavram</Text><Badge variant="soft">{counts.concepts} kavram</Badge></Flex>
              <Flex justify="between"><Text>Kök</Text><Badge variant="soft">{counts.roots} kök</Badge></Flex>
            </Box>
          </Card>
          <Card>
            <Heading size="4">Veri Özet Bilgisi</Heading>
            <Box mt="3" style={{ fontSize: 13, lineHeight: 1.9 }}>
              <Flex justify="between"><Text>roots.json</Text><Badge variant="soft">{counts.roots} kök</Badge></Flex>
              <Flex justify="between"><Text>word_families.json</Text><Badge variant="soft">{counts.families} aile</Badge></Flex>
              <Flex justify="between"><Text>concepts</Text><Badge variant="soft">{counts.concepts} kavram</Badge></Flex>
              <Flex justify="between"><Text>lexemes.json</Text><Badge variant="soft">{counts.lexemes} kelime</Badge></Flex>
              {msg && <Text size="1" color="red" mt="2">{msg}</Text>}
            </Box>
          </Card>
        </Grid>

        <Text size="1" color="gray" as="div" mt="5" align="center">ÇERKESÇE SÖZLÜK • YÖNETİM MERKEZİ</Text>
      </Box>
    </Box>
  );
}
