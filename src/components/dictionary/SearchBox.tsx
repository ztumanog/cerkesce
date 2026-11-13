'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Keyboard } from 'lucide-react';
import {
  Flex,
  Box,
  Text,
  Button,
  IconButton,
  TextField,
  Select,
  Callout,
} from '@radix-ui/themes';
import { AkilliKlavye } from '@/components/features/AkilliKlavye';
import { SmartSuggestionService } from '@/domain/discovery/services/SmartSuggestionService';
import { SmartSuggestion } from '@/domain/discovery/dto/SmartSuggestionDTO';

export interface SearchBoxProps {
  onSearch?: (query: string, mode?: string) => void;
  placeholder?: string;
  filterSlot?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  klavyeAcik?: boolean;
  setKlavyeAcik?: (v: boolean) => void;
}

export function SearchBox({
  onSearch,
  placeholder = 'Çerkesçe, Türkçe, İngilizce, Rusça veya Arapça ara...',
  filterSlot,
  inputRef: externalRef,
  klavyeAcik: externalKlavyeAcik,
  setKlavyeAcik: externalSetKlavyeAcik,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('baslayan');
  const [internalKlavyeAcik, setInternalKlavyeAcik] = useState(false);
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false);

  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef ?? internalRef;
  const klavyeAcik = externalKlavyeAcik ?? internalKlavyeAcik;
  const setKlavyeAcik = externalSetKlavyeAcik ?? setInternalKlavyeAcik;
  const serviceRef = useRef<SmartSuggestionService | null>(null);

  useEffect(() => {
    if (!serviceRef.current) serviceRef.current = new SmartSuggestionService();
    fetch('/data/linguistic/lexemes.json')
      .then((r) => r.json())
      .then((lexemes) => {
        serviceRef.current?.loadLexemes(lexemes);
        setSuggestionsLoaded(true);
      })
      .catch((e) => console.warn('SmartSuggestionService: lexemes yuklenemedi', e));
  }, []);

  useEffect(() => {
    if (!suggestionsLoaded || !serviceRef.current) {
      setSuggestions([]);
      return;
    }
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      return;
    }
    setSuggestions(serviceRef.current.suggest(trimmed, 5).suggestions);
  }, [query, suggestionsLoaded]);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSearch?.('', mode);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query, mode);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (word: string) => {
    setQuery(word);
    setSuggestions([]);
    onSearch?.(word, mode);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') setSuggestions([]);
  };

  return (
    <Flex direction="column" gap="3" width="100%">
      <Flex gap="2" align="center" width="100%">
        <Box flexGrow="1">
          <TextField.Root
            ref={inputRef}
            size="3"
            radius="large"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Sözlük arama kutusu"
          >
            <TextField.Slot side="left">
              <Search className="w-4 h-4" aria-hidden="true" />
            </TextField.Slot>
            {query && (
              <TextField.Slot side="right">
                <IconButton
                  type="button"
                  size="1"
                  variant="ghost"
                  color="gray"
                  onClick={handleClear}
                  aria-label="Aramayı temizle"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </IconButton>
              </TextField.Slot>
            )}
          </TextField.Root>
        </Box>

        <Button type="button" size="3" color="indigo" highContrast onClick={handleSearch}>
          Ara
        </Button>
      </Flex>

      {suggestions.length > 0 && (
        <Callout.Root size="1" color="amber" variant="surface" role="region" aria-label="Arama önerileri">
          <Flex direction="column" gap="2" width="100%">
            <Text size="1" weight="bold">Bunu mu demek istediniz?</Text>
            <Flex wrap="wrap" gap="2">
              {suggestions.map((s, index) => (
                <Button
                  key={`${s.word}-${index}`}
                  type="button"
                  size="1"
                  variant="soft"
                  color="amber"
                  highContrast
                  onClick={() => handleSuggestionClick(s.word)}
                  title={s.meaningTr || s.meaningEn || s.meaningRu || ''}
                >
                  <strong>{s.word}</strong>
                  {s.meaningTr && <Text size="1" color="gray">— {s.meaningTr}</Text>}
                </Button>
              ))}
            </Flex>
          </Flex>
        </Callout.Root>
      )}

      <Flex wrap="wrap" align="center" justify="between" gap="2">
        <Flex align="center" gap="2">
          <Text as="label" size="1" weight="medium" color="gray">Arama Modu:</Text>
          <Select.Root value={mode} onValueChange={setMode} size="2">
            <Select.Trigger aria-label="Arama eşleşme modu" />
            <Select.Content>
              <Select.Item value="baslayan">Başlayan</Select.Item>
              <Select.Item value="iceren">İçeren</Select.Item>
              <Select.Item value="tam">Tam Eşleşme</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex align="center" gap="2">
          {filterSlot}
          <Button
            type="button"
            size="2"
            variant={klavyeAcik ? 'solid' : 'soft'}
            color={klavyeAcik ? 'indigo' : 'gray'}
            highContrast
            aria-pressed={klavyeAcik}
            onClick={() => setKlavyeAcik(!klavyeAcik)}
          >
            <Keyboard className="w-4 h-4" aria-hidden="true" />
            {klavyeAcik ? 'Klavyeyi Kapat' : 'Çerkesçe Klavye'}
          </Button>
        </Flex>
      </Flex>

      {klavyeAcik && (
        <AkilliKlavye
          onKeyPress={(char) => setQuery((q) => q + char)}
          onBackspace={() => setQuery((q) => q.slice(0, -1))}
          onClear={() => setQuery('')}
        />
      )}
    </Flex>
  );
}

export default SearchBox;
