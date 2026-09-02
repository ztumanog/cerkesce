'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SozlukEkrani from '@/components/dictionary/SozlukEkrani';
import rawDicts from '@/data/dictionaries.json';
import rawWords from '@/data/dictionaryData.json';

export default function HomePage() {
  const totalWords = (rawWords as any[]).length;
  const totalDicts = (rawDicts as any[]).length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between">
      <div>
        <Header
          totalWords={totalWords}
          activeSourcesCount={totalDicts}
        />
        <main className="max-w-7xl mx-auto p-4 md:p-6">
          <SozlukEkrani />
        </main>
      </div>
      <Footer totalSources={totalDicts} />
    </div>
  );
}