import fs from 'fs';
import path from 'path';
import { Flex, Text, Heading, Badge, Card, Button, Box, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolveDialectVariantDisplay } from '@/lib/linguistic/dialectVariantsHelper';
import { generateNounDeclension } from '@/lib/linguistic/declensionGenerator';
import { generateVerbConjugation } from '@/lib/linguistic/verbConjugationGenerator';

function loadLexemes() {
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
  const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return Array.isArray(raw) ? raw : raw.lexemes ?? [];
}

export default async function LexemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const list = loadLexemes();
  const lex = list.find((l: any) => l.id === decodedId);
  if (!lex) notFound();

  const translations = lex.translations || {};
  const variants = resolveDialectVariantDisplay({
    form: lex.form,
    dialect: lex.dialect,
    dialectVariants: lex.dialectVariants,
  });

  const posLower = String(lex.partOfSpeech || '').toLowerCase();
  const isVerb = posLower.includes('verb') || posLower.includes('глагол') || (String(lex.form || '').endsWith('н') && String(lex.form || '').length >= 3 && !posLower.includes('noun'));
  const isNoun = !isVerb && (!posLower || posLower.includes('noun') || posLower.includes('щыӀэцӀэ'));
  const declension = isNoun ? generateNounDeclension(lex.form) : null;
  const verbConjugation = isVerb ? generateVerbConjugation(lex.form) : null;

  // Iliskili birlesik kelimeler ve ayni kok/aile uyeleri
  const relatedLexemes = list
    .filter((item: any) => {
      if (item.id === lex.id || !item.form) return false;
      if (lex.wordFamilyId && item.wordFamilyId === lex.wordFamilyId) return true;
      if (Array.isArray(lex.rootIds) && lex.rootIds.length > 0 && Array.isArray(item.rootIds)) {
        return item.rootIds.some((r: string) => lex.rootIds.includes(r));
      }
      return false;
    })
    .slice(0, 8);

  return (
    <Flex direction="column" gap="4" style={{ maxWidth: 780, margin: '0 auto', padding: 24 }}>
      <Flex align="center" justify="between">
        <Link href="/sozluk" style={{ color: '#6d28d9', textDecoration: 'none', fontWeight: 500 }}>
          ← Sözlüğe dön
        </Link>
        {lex.dialect && (
          <Badge color="indigo" variant="soft">
            {lex.dialect === 'western' ? 'Баты (Адыгабзэ)' : 'Догу (Къэбэрдей-Шэрджэсыбзэ)'}
          </Badge>
        )}
      </Flex>

      {/* Madde Basligi + IPA */}
      <Box>
        <Flex align="baseline" gap="3" wrap="wrap">
          <Heading size="9">{lex.form}</Heading>
          {lex.ipa && (
            <Text size="4" color="gray" style={{ fontFamily: 'monospace' }}>
              IPA [{lex.ipa}]
            </Text>
          )}
        </Flex>
        <Flex gap="2" wrap="wrap" mt="2">
          {lex.partOfSpeech && <Badge color="crimson" variant="surface">{lex.partOfSpeech}</Badge>}
          {lex.rootIds?.map((r: string) => <Badge key={r} color="violet">{r}</Badge>)}
          {lex.wordFamilyId && <Badge color="green">{lex.wordFamilyId}</Badge>}
          {lex.conceptId && (
            <Link href={`/kavram/${String(lex.conceptId).toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <Badge color="amber" style={{ cursor: 'pointer' }}>🏷️ {lex.conceptId}</Badge>
            </Link>
          )}
        </Flex>
      </Box>

      {/* Morfolojik Kok & Anlam Karti */}
      <Card>
        <Flex direction="column" gap="2">
          {lex.derivation?.components?.length > 0 && (
            <Text>
              <b>ПСАЛЪЭ ЛЪАБЖЬЭ (Kök &amp; Ekler):</b>{' '}
              <span style={{ fontFamily: 'monospace' }}>{lex.derivation.components.join(' + ')}</span>
            </Text>
          )}
          {translations.tr && <Text><b>TÜRKÇE (МЫХЬЭНЭ):</b> {translations.tr}</Text>}
          {translations.en && <Text><b>İNGİLİZCE (ИНДЖЫЛЫБЗЭ):</b> {translations.en}</Text>}
          {translations.ru && <Text><b>RUSÇA (УРЫСЫБЗЭ):</b> {translations.ru}</Text>}
          {lex.literalMeaning && <Text><b>KELİME ANLAMI (LITERAL):</b> {lex.literalMeaning}</Text>}
        </Flex>
      </Card>

      {/* Diyalekt Karsiliklari & Sozluk Varyantlari */}
      {variants && (
        <Card>
          <Flex direction="column" gap="3">
            <Flex align="center" justify="between">
              <Heading size="3">Diyalekt Karşılıkları &amp; Sözlük Varyantları</Heading>
              <Badge color="indigo" variant="soft">Huvaj &amp; AIG Doğrulamalı</Badge>
            </Flex>
            <Flex gap="3" wrap="wrap">
              <Box style={{ flex: '1 1 260px', padding: 12, borderRadius: 8, background: 'var(--amber-2)' }}>
                <Text size="1" color="amber" weight="bold">BATI ÇERKESÇESİ (ADÎĞECE)</Text>
                <Flex align="center" gap="2" mt="1" wrap="wrap">
                  <Text size="5" weight="bold">{variants.adyghePrimary}</Text>
                  <Badge size="1" color="amber" variant="surface">Huvaj / Akademik</Badge>
                </Flex>
                {variants.adygheAlternatives.map((alt) => (
                  <Flex key={alt.form} align="center" gap="2" mt="1">
                    <Text size="2" color="gray">Alternatif: <b>{alt.form}</b></Text>
                    <Badge size="1" color="gray" variant="soft">{alt.sourceLabel}</Badge>
                  </Flex>
                ))}
              </Box>

              <Box style={{ flex: '1 1 260px', padding: 12, borderRadius: 8, background: 'var(--blue-2)' }}>
                <Text size="1" color="blue" weight="bold">DOĞU ÇERKESÇESİ (KABARDEYCE)</Text>
                <Flex align="center" gap="2" mt="1" wrap="wrap">
                  <Text size="5" weight="bold">{variants.kabardianPrimary}</Text>
                  <Badge size="1" color="blue" variant="surface">Standart</Badge>
                </Flex>
                {variants.kabardianAlternatives.map((alt) => (
                  <Flex key={alt.form} align="center" gap="2" mt="1">
                    <Text size="2" color="gray">Alternatif: <b>{alt.form}</b></Text>
                    <Badge size="1" color="gray" variant="soft">{alt.sourceLabel}</Badge>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </Flex>
        </Card>
      )}

      {/* Fiil Cekim Tablosu (Глагол зэхъуэкӀыкӀэ) */}
      {verbConjugation && (
        <Card>
          <Flex direction="column" gap="2">
            <Flex align="center" justify="between" wrap="wrap" gap="2">
              <Heading size="3">Глагол зэхъуэкӀыкӀэ (Fiil Çekim Tablosu)</Heading>
              <Flex gap="2" align="center">
                <Badge color="indigo" variant="soft">Kök: {verbConjugation.root}</Badge>
                <Badge color="gray" variant="soft">Mastar: {verbConjugation.infinitive}</Badge>
              </Flex>
            </Flex>
            <Table.Root size="1" variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Şahıs</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Şimdiki Zaman</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Geçmiş Zaman</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Gelecek Zaman</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Olumsuz (-къым)</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {verbConjugation.rows.map((row) => (
                  <Table.Row key={row.personCode}>
                    <Table.RowHeaderCell>
                      <Text weight="bold" size="2">{row.pronounCircassian}</Text>
                      <Text as="div" size="1" color="gray">{row.personLabelTr}</Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>{row.present}</Table.Cell>
                    <Table.Cell><b>{row.past}</b></Table.Cell>
                    <Table.Cell>{row.future}</Table.Cell>
                    <Table.Cell><Text color="gray">{row.negative}</Text></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Flex>
        </Card>
      )}

      {/* Isim Cekim Tablosu (Склоненэ) */}
      {declension && (
        <Card>
          <Flex direction="column" gap="2">
            <Flex align="center" justify="between">
              <Heading size="3">Склоненэ (İsim Çekim Tablosu)</Heading>
              <Badge color="gray" variant="soft">Закъуэ / Куэд Бжыгъэ</Badge>
            </Flex>
            <Table.Root size="1" variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Hal</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Tekil Belirtisiz</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Tekil Belirtili (-р/-м)</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Çoğul Belirtisiz</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Çoğul Belirtili (-хэ-)</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {declension.map((row) => (
                  <Table.Row key={row.caseNameCircassian}>
                    <Table.RowHeaderCell>
                      <Text weight="bold" size="2">{row.caseNameCircassian}</Text>
                      <Text as="div" size="1" color="gray">{row.caseNameTr}</Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>{row.singularIndefinite}</Table.Cell>
                    <Table.Cell><b>{row.singularDefinite}</b></Table.Cell>
                    <Table.Cell>{row.pluralIndefinite}</Table.Cell>
                    <Table.Cell><b>{row.pluralDefinite}</b></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Flex>
        </Card>
      )}

      {/* Ornek Cumleler (Щапхъэхэр) */}
      {lex.examples?.length > 0 && (
        <Card>
          <Heading size="3" mb="2">Щапхъэхэр (Örnek Cümleler)</Heading>
          <Flex direction="column" gap="2">
            {lex.examples.map((ex: any, i: number) => (
              <Text key={i} as="p" size="2">
                • {typeof ex === 'string' ? ex : ex.text || ''}
              </Text>
            ))}
          </Flex>
        </Card>
      )}

      {/* Iliskili Kelimeler & Aile Uyeleri (Псалъафэ зэпыщӀахэр) */}
      {relatedLexemes.length > 0 && (
        <Card>
          <Heading size="3" mb="2">Псалъафэ зэпыщӀахэр (İlişkili Kelimeler &amp; Aile Üyeleri)</Heading>
          <Flex gap="2" wrap="wrap">
            {relatedLexemes.map((rel: any) => (
              <Link key={rel.id} href={`/lexeme/${encodeURIComponent(rel.id)}`} style={{ textDecoration: 'none' }}>
                <Badge size="2" color="purple" variant="soft" style={{ cursor: 'pointer' }}>
                  {rel.form}{rel.translations?.tr ? ` — ${rel.translations.tr}` : ''}
                </Badge>
              </Link>
            ))}
          </Flex>
        </Card>
      )}

      <Button variant="outline">♡ Favorilere ekle</Button>
    </Flex>
  );
}