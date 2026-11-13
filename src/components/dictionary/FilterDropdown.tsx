'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Popover, Button, Badge, Box } from '@radix-ui/themes';
import FilterPanel, { type FilterPanelProps } from '@/components/dictionary/FilterPanel';

export interface FilterDropdownProps extends FilterPanelProps {
  activeCount?: number;
}

export function FilterDropdown({ activeCount = 0, ...panelProps }: FilterDropdownProps) {
  const [acik, setAcik] = useState(false);

  return (
    <Popover.Root open={acik} onOpenChange={setAcik}>
      <Popover.Trigger>
        <Button
          type="button"
          size="2"
          variant={acik || activeCount > 0 ? 'solid' : 'soft'}
          color={acik || activeCount > 0 ? 'jade' : 'gray'}
          highContrast
          aria-expanded={acik}
          aria-label="Filtreleri aç veya kapat"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Filtreler</span>
          {activeCount > 0 && (
            <Badge size="1" variant="solid" color="amber" highContrast>
              {activeCount}
            </Badge>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${acik ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </Button>
      </Popover.Trigger>

      <Popover.Content
        align="end"
        sideOffset={8}
        className="w-[min(92vw,640px)] max-h-[75vh] overflow-y-auto"
      >
        <Box p="1">
          <FilterPanel {...panelProps} />
        </Box>
      </Popover.Content>
    </Popover.Root>
  );
}

export default FilterDropdown;
