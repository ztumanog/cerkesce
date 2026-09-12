'use client';

import React from 'react';

interface SearchBoxProps {
  aramaMetni: string;
  onAramaDegis: (val: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ aramaMetni, onAramaDegis }) => {
  return (
    <div className="w-full p-4 bg-stone-900 rounded-xl border border-stone-800">
      <input
        type="text"
        value={aramaMetni}
        onChange={(e) => onAramaDegis(e.target.value)}
        placeholder="Çerkesçe veya Türkçe kelime arayın..."
        className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
      />
    </div>
  );
};

export default SearchBox;