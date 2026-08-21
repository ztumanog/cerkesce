import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="Sözlük verileri yükleniyor"
      className="w-full max-w-3xl mx-auto space-y-4 animate-pulse"
    >
      <div className="p-6 rounded-2xl bg-slate-200 dark:bg-slate-800 space-y-4">
        <div className="h-8 w-48 bg-slate-300 dark:bg-slate-700 rounded-lg" />
        <div className="h-12 w-full bg-slate-300 dark:bg-slate-700 rounded-xl" />
      </div>
      <span className="sr-only">Yükleniyor...</span>
    </div>
  );
};

export default LoadingSkeleton;