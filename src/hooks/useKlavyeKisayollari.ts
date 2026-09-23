'use client';

import { useEffect } from 'react';

interface KlavyeKisayollariProps {
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKlavyeKisayollari({
  onEscape,
  enabled = true,
}: KlavyeKisayollariProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, enabled]);
}