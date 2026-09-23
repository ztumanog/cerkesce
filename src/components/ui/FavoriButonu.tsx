'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface FavoriButonuProps {
  favoriMi: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: number;
}

export function FavoriButonu({
  favoriMi,
  onClick,
  size = 18,
}: FavoriButonuProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={favoriMi ? 'Favoriden çıkar' : 'Favoriye ekle'}
      className={`p-1.5 rounded-full transition-all active:scale-90 ${
        favoriMi
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-zinc-400 hover:text-yellow-500'
      }`}
    >
      <Star
        size={size}
        fill={favoriMi ? 'currentColor' : 'none'}
        strokeWidth={favoriMi ? 0 : 2}
      />
    </button>
  );
}

export default FavoriButonu;